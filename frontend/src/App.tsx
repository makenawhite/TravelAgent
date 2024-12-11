import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { HomePage } from "./pages/HomePage";
import { DestinationsPage } from "./pages/DiscoverPage";
import { Login } from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BookingPage from "./pages/BookingPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import DestinationDetails from "./pages/DestinationDetails";
import MyBookingsPage from "./pages/MyTripsPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/my-trips" element={<MyBookingsPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
