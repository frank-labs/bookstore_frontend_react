import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import './HomePage.css';

interface Book {
  id: number;
  author: string;
  bookformat: string;
  description: string;
  genre: string;
  img: string;
  isbn: string | null;
  link: string;
  pages: number;
  rating: number;
  reviews: number;
  title: string;
  price: number;
}

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch books data from API
  const fetchBooks = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/books?page=${page}`);
      const data = await response.json();
      
      setBooks(data.books); // Set books data
      setTotalPages(data.totalPages); // Set total pages for pagination
      setCurrentPage(data.currentPage); // Set the current page
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books when the component mounts or when the page changes
  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  return (
    <div className="home-page">
      <h1>Bookstore</h1>

      {/* Loading state */}
      {loading ? <p>Loading...</p> : null}

      {/* Display books */}
      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <span>{currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
