import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { destinationsData } from "./DiscoverPage"; 
import { auth } from "../config/firebase"; 
import "../BookingPage.css"; 


const BookingPage: React.FC = () => {
  const navigate = useNavigate(); 


  const [formData, setFormData] = useState({
    destination: "", 
    travelDate: "", 
    numberOfPeople: 1, 
    name: "", 
    email: "", 
  });

  
  const [error] = useState("");

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      const currentUser = auth.currentUser; 

      
      if (!currentUser) {
        alert("You must be logged in to book a trip."); 
        return;
      }

     
      const response = await fetch("http://localhost:3001/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({
          ...formData, 
          userId: currentUser.uid, 
        }),
      });

     
      if (response.ok) {
        navigate("/confirmation"); 
      } else {
        alert("Booking failed. Please try again."); 
      }
    } catch (err) {
      console.error("Error submitting booking:", err); 
      alert("An error occurred. Please try again.");
    }
  };

  
  return (
    <div className="booking-page">
      <h1>Book Your Trip</h1>
      {/* Display error message if any */}
      {error && <p className="error">{error}</p>}

      {/* Booking form */}
      <form onSubmit={handleSubmit}>
        {/* Destination selection */}
        <div className="form-group">
          <label>Destination:</label>
          <select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          >
            <option value="">Select a destination</option>
            {/* Populate dropdown with destinations from destinationsData */}
            {destinationsData.map((destination) => (
              <option key={destination.id} value={destination.name}>
                {destination.name}
              </option>
            ))}
          </select>
        </div>

        {/* Travel date input */}
        <div className="form-group">
          <label>Travel Date:</label>
          <input
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Number of people input */}
        <div className="form-group">
          <label>Number of People:</label>
          <input
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            min="1" // Minimum value set to 1
            required
          />
        </div>

        {/* User's name input */}
        <div className="form-group">
          <label>Your Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* User's email input */}
        <div className="form-group">
          <label>Your Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="submit-button">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
