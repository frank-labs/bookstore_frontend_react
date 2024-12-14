import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './bookDetail.css';

const BookDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the book ID from the URL
    const [book, setBook] = useState<any>(null); // Store the book data
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    const [error, setError] = useState<string | null>(null); // Track any errors

    // Fetch book data from the API
    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/books/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book data');
                }
                const data = await response.json();
                setBook(data); // Set the book data in the state
            } catch (err: any) {
                setError(err.message); // Set error if fetching fails
            } finally {
                setLoading(false); // Set loading to false once fetch is complete
            }
        };

        fetchBookData();
    }, [id]); // Re-run effect when `id` changes

    if (loading) {
        return <div>Loading...</div>; // Show loading message while data is being fetched
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if fetching fails
    }

    if (!book) {
        return <div>No book found.</div>; // If no book is returned, show a message
    }

    return (
        <div className="book-detail">
            <div className="book-detail__main-section">
                <div className="book-detail__image-container">
                    <img src={book.img} alt={book.title} className="book-detail__image" />
                </div>
                <div className="book-detail__info">
                    <h1 className="book-detail__title">{book.title}</h1>
                    <h2 className="book-detail__author">by {book.author}</h2>
                    <p className="book-detail__price">${book.price}</p>
                    <div className="book-detail__rating">
                        <span className="book-detail__rating-value">{book.rating} stars</span> ({book.reviews} reviews)
                    </div>

                </div>
            </div>
            <div>
                <h3>Overview</h3>
                <p className="book-detail__description">{book.description}</p>
            </div>

            {/* Similar Books Section (You can modify this as needed) */}
            <div className="book-detail__carousel">
                <h3 className="book-detail__carousel-title">Similar Books</h3>
                <div className="book-detail__carousel-items">
                    {/* Example static similar books */}
                    <div className="book-detail__carousel-item">
                        <img src={book.img} alt="book" className="book-detail__carousel-image" />
                        <p className="book-detail__carousel-text">Book 1</p>
                    </div>
                    <div className="book-detail__carousel-item">
                        <img src={book.img} alt="book" className="book-detail__carousel-image" />
                        <p className="book-detail__carousel-text">Book 2</p>
                    </div>
                    <div className="book-detail__carousel-item">
                        <img src={book.img} alt="book" className="book-detail__carousel-image" />
                        <p className="book-detail__carousel-text">Book 3</p>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="book-detail__reviews">
                <h3 className="book-detail__reviews-title">Customer Reviews</h3>
                <div className="book-detail__review">
                    <p className="book-detail__review-rating">★★★★☆</p>
                    <p className="book-detail__review-text">Great book! Highly recommend.</p>
                </div>
                <div className="book-detail__review">
                    <p className="book-detail__review-rating">★★★☆☆</p>
                    <p className="book-detail__review-text">Good, but a bit slow in some parts.</p>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
