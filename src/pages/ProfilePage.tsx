import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth(); // Get the user info from AuthContext

  if (!user) {
    return <p>You are not logged in. Please log in to view your profile.</p>;
  }

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <div className="profile-info">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="profile-roles">
        <h2>Roles</h2>
        <ul>
          {user.roles && user.roles.length > 0 ? (
            user.roles.map((role, index) => <li key={index}>{role}</li>)
          ) : (
            <li>No roles assigned</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
