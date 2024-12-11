import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { destinationsData } from "./DiscoverPage"; 
import axios from "axios"; 
import "../DestinationDetails.css"; 
import { auth } from "../config/firebase"; 






const DestinationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [attractions, setAttractions] = useState<any[]>([]); 
  const [error, setError] = useState(""); 
  const destination = destinationsData.find((dest) => dest.id === parseInt(id || "0")); 
  
  const logInteraction = async (userId: string, destinationId: string, action: string) => {
    try {
      const interaction = {
        userId,
        action,
        destinationId,
        timestamp: new Date().toISOString(), 
      };

      console.log("Logging interaction:", interaction); 
      await axios.post("http://localhost:3001/log-behavior", interaction);
      console.log("Interaction logged successfully."); 
    } catch (err) {
      console.error("Error logging interaction:", err); 
    }
  };

  




    const fetchAttractions = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.post('http://localhost:3001/nearby-attractions', { latitude, longitude });
    console.log("Response received:", response.data);
    setAttractions(response.data); 
  } catch (err) {
    console.error("Error fetching attractions:", err); 
    setError("Failed to fetch nearby attractions."); 
  }
};


  useEffect(() => {
    if (destination) {
      
      const user = auth.currentUser; 
      if (user) {
        logInteraction(user.uid, destination.id.toString(), "viewed");
      }

      
      fetchAttractions(destination.latitude, destination.longitude);
    }
  }, [destination]);

  if (!destination) {
    return <p>Destination not found.</p>;
  }

  return (
    <div className="destination-details">
      {/* Header Section */}
      <div className="details-header">
        {/* Destination Image */}
        <div className="image-container">
          <img src={destination.image} alt={destination.name} />
        </div>

        {/* Destination Details */}
        <div className="details-content">
          <h1>{destination.name}</h1>
          <p>{destination.description}</p>
          <p>
            <strong>Region:</strong> {destination.region}
          </p>
          <p>
            <strong>Rating:</strong> ⭐ {destination.rating}
          </p>
        </div>

        {/* Google Map Embed */}
        <div className="map-container">
          <iframe
            title="map"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAUFmi9dFw2fqcz2eYsPCaqLHY-Ne5RfSQ&q=${destination.latitude},${destination.longitude}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Nearby Attractions Section */}
      <div className="attractions-section">
        <h2>Things to Do Nearby</h2>
        {/* Display error message if fetching attractions fails */}
        {error && <p className="error">{error}</p>}
        {/* Display attractions if available */}
        {attractions.length > 0 ? (
          <div className="attractions-grid">
            {attractions.map((attraction, index) => (
              <div key={index} className="attraction-card">
                {/* Attraction Image */}
                <img
                  src={
                    attraction.photos
                      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${attraction.photos[0].photo_reference}&key=AIzaSyAUFmi9dFw2fqcz2eYsPCaqLHY-Ne5RfSQ`
                      : "/placeholder.webp" 
                  }
                  alt={attraction.name}
                />
                <h3>{attraction.name}</h3>
                <p>{attraction.vicinity}</p>
                {/* Link to view attraction on Google Maps */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${attraction.geometry.location.lat},${attraction.geometry.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No attractions found.</p>
        )}
      </div>

      {/* Additional Recommendations Section */}
      <div className="recommendations-section">
        <h2>Related Destinations</h2>
        <div className="related-destinations">
          {destinationsData
            .filter(
              (relatedDest) =>
                relatedDest.region === destination.region && relatedDest.id !== destination.id 
            )
            .slice(0, 3)
            .map((related) => (
              <Link to={`/destination/${related.id}`} key={related.id}>
                <div className="related-destination-card">
                  <img src={related.image} alt={related.name} />
                  <h3>{related.name}</h3>
                  <p>{related.description}</p>
                  <p>
                    <strong>Rating:</strong> ⭐ {related.rating}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
