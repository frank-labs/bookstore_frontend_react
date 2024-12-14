import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import BookDetail from './pages/BookDetail';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/book-detail/:id" element={<BookDetail />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
