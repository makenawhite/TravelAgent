from flask import Flask, request, jsonify
import requests
import json
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import logging
from datetime import datetime
from sklearn.decomposition import TruncatedSVD
import numpy as np

# Initialize Flask app
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing (CORS) to allow requests from other domains
CORS(app)

# Initialize Firebase Admin SDK with a service account key
cred = credentials.Certificate("src/data/.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore database client
db = firestore.client()

# Load destination data from a JSON file
with open("src/data/destinations.json", "r") as f:
    destinations = json.load(f)

# Define Firestore collection names
BOOKINGS_COLLECTION = "bookings"
BEHAVIOR_COLLECTION = "userInteractions"

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Endpoint to handle trip bookings
@app.route("/book", methods=["POST"])
def book():
    """
    Processes a booking request by storing booking details in Firestore.
    """
    try:
        data = request.json
        required_fields = ["destination", "travelDate", "numberOfPeople", "name", "email"]

        # Validate that all required fields are present
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Add the booking data to Firestore
        booking_ref = db.collection(BOOKINGS_COLLECTION).add(data)
        logger.info(f"New Booking Added with ID: {booking_ref[1].id}")

        return jsonify({"message": "Booking successful!", "bookingId": booking_ref[1].id}), 200
    except Exception as e:
        logger.error(f"Error during booking: {e}")
        return jsonify({"error": "Failed to process booking"}), 500

# Endpoint to fetch user bookings based on email
@app.route("/user-bookings", methods=["GET"])
def user_bookings():
    """
    Fetches bookings for a specific user using their email address.
    """
    try:
        user_email = request.args.get("email")
        if not user_email:
            return jsonify({"error": "Email is required"}), 400

        # Query Firestore for bookings matching the email
        user_bookings = db.collection(BOOKINGS_COLLECTION).where("email", "==", user_email).stream()
        bookings_list = [doc.to_dict() for doc in user_bookings]

        return jsonify(bookings_list), 200
    except Exception as e:
        logger.error(f"Error fetching user bookings: {e}")
        return jsonify({"error": "Failed to fetch user bookings"}), 500

# Endpoint to log user interactions with destinations
@app.route("/log-behavior", methods=["POST"])
def log_behavior():
    """
    Logs user interactions (e.g., views or bookings) with destinations.
    """
    try:
        data = request.json
        logger.debug(f"Received data for logging: {data}")

        # Validate that all required fields are present
        required_fields = ["userId", "action", "destinationId", "timestamp"]
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            logger.error(f"Missing required fields: {missing_fields}")
            return jsonify({"error": f"Missing required fields: {missing_fields}"}), 400

        # Add the interaction data to Firestore
        doc_ref = db.collection(BEHAVIOR_COLLECTION).add(data)
        logger.info(f"User interaction logged in Firestore: {doc_ref[1].id}")
        return jsonify({"message": "Behavior logged successfully"}), 200
    except Exception as e:
        logger.error(f"Error logging user behavior: {e}")
        return jsonify({"error": "Failed to log interaction"}), 500

# Endpoint to generate AI-based travel recommendations
@app.route("/ai-recommendations", methods=["GET"])
def ai_recommendations():
    """
    Provides personalized travel destination recommendations using
    content-based filtering and collaborative filtering techniques.
    """
    try:
        # Fetch user ID and optional region filter from query parameters
        user_id = request.args.get("userId")
        region = request.args.get("region")
        logger.debug(f"Fetching recommendations for userId: {user_id}, region: {region}")

        if not user_id:
            return jsonify({"error": "userId is required"}), 400

        # Convert destination data to a DataFrame for analysis
        df = pd.DataFrame(destinations)
        logger.debug(f"Destination DataFrame preview: {df.head()}")

        # Validate the presence of required columns
        if "id" not in df.columns or "name" not in df.columns or "description" not in df.columns or "image" not in df.columns:
            logger.error("Invalid destination data: Missing required fields")
            return jsonify({"error": "Invalid destination data"}), 500

        # Create feature vectors using destination names and descriptions
        df["features"] = df["name"] + " " + df["description"]
        vectorizer = TfidfVectorizer()
        feature_vectors = vectorizer.fit_transform(df["features"])
        similarity_matrix = cosine_similarity(feature_vectors)

        # Fetch user interaction data from Firestore
        user_interactions = db.collection(BEHAVIOR_COLLECTION).stream()
        interaction_data = [doc.to_dict() for doc in user_interactions]

        if not interaction_data:
            logger.info("No interaction data available. Falling back to content-based recommendations.")
            return jsonify({"relatedDestinations": df.head(5).to_dict(orient="records")})

        # Convert interaction data to a DataFrame
        interaction_df = pd.DataFrame(interaction_data)

        # Ensure interaction data contains required columns
        required_columns = ["userId", "destinationId", "action"]
        missing_columns = [col for col in required_columns if col not in interaction_df.columns]
        if missing_columns:
            logger.error(f"Missing required columns in interaction data: {missing_columns}")
            return jsonify({"error": "Interaction data is incomplete"}), 500

        # Assign weights to user actions (e.g., views, bookings)
        ACTION_WEIGHTS = {"viewed": 1, "booked": 5}
        interaction_df["interaction"] = interaction_df["action"].map(ACTION_WEIGHTS)

        # Create a user-item interaction matrix
        interaction_matrix = interaction_df.pivot_table(
            index="userId", columns="destinationId", values="interaction", fill_value=0
        )

        # Perform matrix factorization for collaborative filtering
        svd = TruncatedSVD(n_components=10)
        user_factors = svd.fit_transform(interaction_matrix)
        item_factors = svd.components_

        # Generate recommendations based on collaborative filtering
        user_index = interaction_matrix.index.get_loc(user_id) if user_id in interaction_matrix.index else None
        collaborative_recommendations = []
        if user_index is not None:
            user_vector = user_factors[user_index]
            scores = np.dot(user_vector, item_factors)
            sorted_indices = np.argsort(-scores)
            collaborative_recommendations = interaction_matrix.columns[sorted_indices].tolist()

        # Combine collaborative and content-based recommendations
        recommended = set()
        for destination_id in collaborative_recommendations:
            if int(destination_id) in df["id"].values:
                recommended.add(int(destination_id))
                if len(recommended) >= 5:
                    break

        # Add region filter if provided
        if region:
            recommended = [dest for dest in recommended if df[df["id"] == dest].iloc[0].get("region", "").lower() == region.lower()]

        # Prepare final recommendations
        recommended_destinations = df[df["id"].isin(recommended)].to_dict(orient="records")
        return jsonify({"relatedDestinations": recommended_destinations[:5]})

    except Exception as e:
        logger.error(f"Error in hybrid recommendations: {e}")
        return jsonify({"error": "Failed to fetch recommendations"}), 500

# Endpoint to fetch nearby attractions using Google Places API
@app.route("/nearby-attractions", methods=["POST"])
def nearby_attractions():
    """
    Fetches nearby tourist attractions using the Google Places API
    based on latitude and longitude.
    """
    try:
        data = request.json
        latitude = data.get("latitude")
        longitude = data.get("longitude")
        radius = 5000  # Radius in meters

        if not latitude or not longitude:
            return jsonify({"error": "Missing latitude or longitude"}), 400

        # Call the Google Places API
        url = (
            f"https://maps.googleapis.com/maps/api/place/nearbysearch/json"
            f"?location={latitude},{longitude}&radius={radius}&type=tourist_attraction"
            f""
        )

        response = requests.get(url)
        attractions = response.json()
        print(attractions)

        return jsonify(attractions.get("results", []))
    except Exception as e:
        logger.error(f"Error fetching nearby attractions: {e}")
        return jsonify({"error": "Failed to fetch attractions"}), 500

# Start the Flask app
if __name__ == "__main__":
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=3001)


