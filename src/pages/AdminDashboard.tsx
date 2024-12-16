import React, { useState } from 'react';
import './AdminDashboard.css';  
import ManageUsers from './ManageUsers'; 
import ManageBooks from './ManageBooks'; 

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'users' | 'books'>('users');

  const handleTabChange = (tab: 'users' | 'books') => {
    setSelectedTab(tab);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-body">
        {/* Sidebar Navigation Panel */}
        <div className="sidebar">
          <ul>
            <li onClick={() => handleTabChange('users')}>Manage Users</li>
            <li onClick={() => handleTabChange('books')}>Manage Books</li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          {selectedTab === 'users' && <ManageUsers />}
          {selectedTab === 'books' && <ManageBooks />}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
