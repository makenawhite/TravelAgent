
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyBCThiJ36HQDTeZ1HKCwmcX6dabKyqP4FI",
  authDomain: "senproj-484d3.firebaseapp.com",
  projectId: "senproj-484d3",
  storageBucket: "senproj-484d3.firebasestorage.app",
  messagingSenderId: "646339081372",
  appId: "1:646339081372:web:6a5e9fafa798502ced2959"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const firestore = getFirestore(app);
