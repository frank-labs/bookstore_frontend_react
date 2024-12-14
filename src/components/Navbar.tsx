import React, { useState } from "react";
import "./Navbar.css"; // Assuming you are using this file for navbar styling
import userIcon from "../assets/react.svg"; // User profile image from assets (can be replaced with any image)
import { useAuth } from "../context/AuthContext"; 

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth(); // Access AuthContext
  const [showDropdown, setShowDropdown] = React.useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <a href="/">Home</a>
      </div>
      <div className="navbar__right">
        {/* Conditional rendering based on authentication */}
        {!isAuthenticated ? (
          <div className="navbar__auth-links">
            <a href="/signup">Signup</a>
            <a href="/login">Login</a>
          </div>
        ) : (
          <div className="navbar__profile">
            <img
              src={userIcon}
              alt="User Profile"
              className="navbar__user-icon"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="navbar__dropdown">
                <a href="/profile">Profile</a>
                <a href="/orders">My Orders</a>
                <a href="/logout" onClick={logout}>Logout</a>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
