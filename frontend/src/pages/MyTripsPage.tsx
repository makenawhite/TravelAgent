import React, { useEffect, useState } from "react";
import { auth, firestore } from "../config/firebase"; 
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth"; 
import "../MyTripsPage.css"; 




const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]); 
  const [error, setError] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true); 

 


  useEffect(() => {
    const fetchBookings = async (userId: string) => {
      try {
        console.log("Fetching bookings for userId:", userId);

        
        const bookingsRef = collection(firestore, "bookings");
        
        const q = query(bookingsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q); 

        console.log("Query snapshot size:", querySnapshot.size);

        
        const userBookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("User bookings:", userBookings);

        setBookings(userBookings); 
      } catch (err) {
        console.error("Error fetching bookings:", err); 
        setError("Failed to fetch bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      if (user) {
        console.log("User authenticated with UID:", user.uid);
        setLoading(true); 
        fetchBookings(user.uid); 
      } else {
        console.log("No user is authenticated.");
        setError("You must be logged in to view bookings."); 
        setLoading(false); 
      }
    });

    
    return () => unsubscribe();
  }, []);

  
  const cancelBooking = async (bookingId: string) => {
    try {
      // delete the booking from firebase
      await deleteDoc(doc(firestore, "bookings", bookingId));
      // removes the canceled booking 
      setBookings(bookings.filter((booking) => booking.id !== bookingId));
      console.log("Booking canceled successfully.");
    } catch (err) {
      console.error("Error canceling booking:", err); 
      setError("Failed to cancel the booking. Please try again."); 
    }
  };

 
  if (loading) {
    return <div>Loading your bookings...</div>;
  }


  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="my-bookings">
      <h1>My Trips</h1>
      {/* Display a message if no bookings are found */}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        // display bookings in a grid 
        <div
          className={`grid-container ${
            bookings.length === 1 ? "single-item" : "" 
          }`}
        >
          {bookings.map((booking) => (
            <div key={booking.id} className="grid-item">
              <h2>{booking.destination}</h2>
              <p><strong>Travel Date:</strong> {booking.travelDate}</p>
              <p><strong>Number of People:</strong> {booking.numberOfPeople}</p>
              {/* Cancel booking button */}
              <button onClick={() => cancelBooking(booking.id)}>Cancel Booking</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
