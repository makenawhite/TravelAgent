import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../HomePage.css"; 
import axios from "axios"; 
import { destinationsData } from "./DiscoverPage"; 
import { auth } from "../config/firebase"; 
import { onAuthStateChanged } from "firebase/auth"; 


export const HomePage: React.FC = () => {
  const navigate = useNavigate(); 
  const [recommendedDestinations, setRecommendedDestinations] = useState<any[]>([]); 
  const [error, setError] = useState<string>("");
  const [region, setRegion] = useState<string>(""); 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const pollingIntervalRef = React.useRef<NodeJS.Timeout | null>(null); 
  
  const fetchRecommendations = useCallback(
    async (userId: string) => {
      try {
        const response = await axios.get("http://localhost:3001/ai-recommendations", {
          params: { userId, region }, 
        });

        const recommendations = response.data.relatedDestinations;

        
        const enrichedRecommendations = recommendations.map((rec: any) => {
          const destination = destinationsData.find((dest) => dest.id === rec.id);
          return {
            ...rec, 
            ...destination, 
          };
        });

        setRecommendedDestinations(enrichedRecommendations); 
      } catch (err: any) {
        console.error("Error fetching recommendations:", err);
        setError(err.response?.data?.error || "Failed to fetch recommendations");
      }
    },
    [region] 
  );

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); 

      if (user) {
        console.log("User is authenticated:", user.uid);
        fetchRecommendations(user.uid); 



        if (!pollingIntervalRef.current) {
          pollingIntervalRef.current = setInterval(() => {
            fetchRecommendations(user.uid);
          }, 30000); 
        }
      } else {
        console.log("User is not authenticated");
        setError("User not logged in. Please log in to see recommendations.");
      }
    });

   
    return () => {
      unsubscribe();
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [fetchRecommendations]); 

  
  const logInteraction = async (userId: string, destinationId: string, interactionType: string) => {
    try {
      const interaction = {
        userId,
        action: interactionType,
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

 

  const handleViewDestination = (destinationId: number) => {
    const user = auth.currentUser;
    if (user) {
      logInteraction(user.uid, destinationId.toString(), "viewed");
    }
    navigate(`/destination/${destinationId}`); 
  };

  
  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value); 
  };

 

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h1>Discover Your Next Adventure</h1>
        <p>Plan your dream vacation with personalized recommendations and reviews.</p>
        <button className="hero-button" onClick={() => navigate("/destinations")}>
          Start Exploring
        </button>
      </div>

      {/* Popular Destinations Section */}
      <div className="destinations">
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          {destinationsData.slice(0, 3).map((destination) => (
            <div
              key={destination.id}
              className="destination"
              onClick={() => handleViewDestination(destination.id)}
            >
              <img src={destination.image} alt={destination.name} />
              <h3>{destination.name}</h3>
              <p>{destination.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Personalized Recommendations Section */}
      <div className="recommendations">
        <h2>Destinations You May Like</h2>
        {error && <p className="error-message">{error}</p>}

        {/* Region Filter Dropdown */}
        <div>
          <label htmlFor="region">Filter by Region:</label>
          <select id="region" value={region} onChange={handleRegionChange}>
            <option value="">All Regions</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="North America">North America</option>
            {/* Add more regions as needed */}
          </select>
        </div>

        <div className="recommendations-grid">
          {recommendedDestinations.length > 0 ? (
            recommendedDestinations.map((destination) => (
              <div
                key={destination.id}
                className="recommendation-card"
                onClick={() => handleViewDestination(destination.id)}
              >
                <img src={destination.image} alt={destination.name} className="destination-image" />
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <p>Rating: ⭐ {destination.rating || "N/A"}</p>
              </div>
            ))
          ) : (
            <p>No recommendations available at the moment.</p>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews">
        <h2>What Travelers Say</h2>
        <div className="review">
          <p>"Paris was absolutely magical. The Eiffel Tower is breathtaking!"</p>
          <span>- Sarah L.</span>
        </div>
        <div className="review">
          <p>"Tokyo is a food lover's paradise. Highly recommend the sushi!"</p>
          <span>- James K.</span>
        </div>
        <div className="review">
          <p>"New York's energy is unmatched. Loved Times Square!"</p>
          <span>- Emily R.</span>
        </div>
      </div>

      {/* Call-to-Action Section */}
      {!isAuthenticated && (
        <div className="cta">
          <h2>Ready to Explore?</h2>
          <button className="cta-button" onClick={handleSignUp}>
            Sign Up Now
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
