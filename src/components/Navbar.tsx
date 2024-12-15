import React, { useState } from "react";
import "./Navbar.css"; // Assuming you are using this file for navbar styling
import userIcon from "../assets/react.svg"; // User profile image from assets (can be replaced with any image)
import { useAuth } from "../context/AuthContext"; 

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth(); // Access AuthContext
  const [showDropdown, setShowDropdown] = React.useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  // Check if user has the "ROLE_ADMIN" role
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <a href="/">Home</a>
        <a href="/cart">Cart</a>
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
                <a href="/mybook">Bought Books</a>
                <a href="/orders">My Orders</a>
                {/* Show "Admin" button only if the user has the "ROLE_ADMIN" */}
                {isAdmin && <a href="/admin">Admin</a>}
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
