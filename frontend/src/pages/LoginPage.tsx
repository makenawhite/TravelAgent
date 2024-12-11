import { auth, provider } from "../config/firebase"; 
import { signInWithPopup, signInWithEmailAndPassword as emailSignIn } from "firebase/auth"; 
import { useNavigate } from "react-router-dom"; 
import { useState } from "react"; 


export const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider); 
      console.log("Google Sign-In Successful:", result); 
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error); 
      setError("Failed to sign in with Google.");
    } finally {
      setLoading(false); 
    }
  };

  
  const signInWithEmail = async () => {
    try {
      if (!email || !password) {
        setError("Please fill in both fields."); 
        return;
      }
      setLoading(true); 
      await emailSignIn(auth, email, password);
      console.log("Email Sign-In Successful"); 
      navigate("/"); 
    } catch (error) {
      console.error("Email Sign-In Error:", error); 
      setError("Invalid email or password."); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      {/* Header Section */}
      <h1>Login</h1>
      
      {/* Error Message Display */}
      <div style={{ marginBottom: "1rem" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {/* Email and Password Input Section */}
      <div style={{ marginBottom: "1rem" }}>
        {/* Email Input Field */}
        <input
          type="email"
          placeholder="Email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ padding: "0.5rem", width: "100%", marginBottom: "0.5rem" }}
        />
        
        {/* Password Input Field */}
        <input
          type="password"
          placeholder="Password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ padding: "0.5rem", width: "100%", marginBottom: "0.5rem" }}
        />
        
        {/* Sign-In with Email Button */}
        <button
          onClick={signInWithEmail} 
          disabled={loading} 
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
            marginBottom: "0.5rem",
          }}
        >
          {loading ? "Signing In..." : "Sign In With Email"} {/* Dynamic button text */}
        </button>
      </div>

      {/* Google Sign-In Button Section */}
      <div>
        <button
          onClick={signInWithGoogle} 
          disabled={loading} 
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4285F4",
            color: "white",
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {loading ? "Signing In..." : "Sign In With Google"} {/* Dynamic button text */}
        </button>
      </div>
    </div>
  );
};
