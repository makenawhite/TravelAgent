import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { auth, firestore } from "../config/firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc } from "firebase/firestore"; 
import "../SignUpPage.css"; 


const SignUpPage: React.FC = () => {
  const navigate = useNavigate(); 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // no page reload on form submission

    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // get the authenticated user ob

      
      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        username, 
        email, 
      });

      // clear and success
      setMessage("Sign-up successful!");
      setUsername(""); 
      setEmail(""); 
      setPassword(""); 

      
      navigate("/");
    } catch (err: any) {
      console.error("Error during sign-up:", err.message); 
      setError(err.message); 
    }
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>

      {/* Display success message if present */}
      {message && <p className="message">{message}</p>}
      {/* Display error message if present */}
      {error && <p className="error">{error}</p>}

      {/* Sign-up form */}
      <form onSubmit={handleSubmit} className="signup-form">
        {/* Username input field */}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

        {/* Email input field */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        {/* Password input field */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
