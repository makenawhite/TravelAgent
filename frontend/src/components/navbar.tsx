import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom"; 
import { auth, firestore } from "../config/firebase"; 
import { useAuthState } from "react-firebase-hooks/auth"; 
import { signOut } from "firebase/auth"; 
import { doc, getDoc } from "firebase/firestore"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"; 


export const Navbar = () => {
  const [user] = useAuthState(auth); 
  const [username, setUsername] = useState<string | null>(null); 

  
  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          
          const userDoc = await getDoc(doc(firestore, "users", user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data()?.username || null); 
          } else {
            console.error("No user document found!"); 
          }
        } catch (err) {
          console.error("Error fetching username:", err); 
        }
      }
    };

    fetchUsername(); 
  }, [user]); 

  
  const signUserOut = async () => {
    await signOut(auth); 
  };

  return (
    <div className="navbar">
      {/* Navigation Links */}
      <div className="links">
        <Link to="/">Home</Link> 
        <Link to="/destinations">Discover</Link> 
        <Link to="/book">Book a Trip</Link> 
        {!user && <Link to="/signup">Sign Up</Link>} 
        {!user && <Link to="/login">Login</Link>} 
        <Link to="/my-trips">My Trips</Link> 
      </div>

      {/* User Information and Logout Button */}
      <div className="user">
        {user && (
          <>
            {/* Display the username or a fallback if not available */}
            <p style={{ color: "#FFFFFF" }}>
              Welcome, {username || user.displayName || "User"}!
            </p>
            {/* User icon */}
            <FontAwesomeIcon icon={faUserCircle} size="2x" color="#FFFFFF" />
            {/* Logout button */}
            <button
              onClick={signUserOut} 
              style={{ backgroundColor: "blue", color: "white" }}
            >
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  );
};
