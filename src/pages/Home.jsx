import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      {/* 🌅 Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🍳 Start Your Day at Darshini Hotel</h1>
          <p className="hero-subtitle">
            Fresh, flavorful, and perfectly cooked breakfasts made just for you.
          </p>
          <div className="hero-buttons">
            <Link to="/menu" className="hero-btn">View Menu</Link>
            <Link to="/booking" className="hero-btn hero-btn-outline">Booking History</Link>
          </div>
        </div>
      </div>

      {/* ☕ Features Section */}
      <div className="features-section">
        <div className="feature-card">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
            alt="Delicious Breakfast"
            className="feature-img"
          />
          <h3>Delicious Breakfast</h3>
          <p>Handcrafted South Indian dishes and continental options to brighten your morning.</p>
        </div>

        <div className="feature-card">
          <img
            src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80"
            alt="Quick Booking"
            className="feature-img"
          />
          <h3>Quick Booking</h3>
          <p>Reserve your table in seconds with our smooth online booking system.</p>
        </div>

        <div className="feature-card">
          <img
            src="https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80"
            alt="Relaxed Ambience"
            className="feature-img"
          />
          <h3>Relaxed Ambience</h3>
          <p>Enjoy a cozy atmosphere perfect for conversations over steaming coffee.</p>
        </div>
      </div>
    </div>
  );
}





// & D:\10K_Coders\Project\backend\venv\Scripts\Activate.ps1  