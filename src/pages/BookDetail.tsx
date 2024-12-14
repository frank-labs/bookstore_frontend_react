import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext
import './bookDetail.css';

const BookDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useAuth(); // Access the authentication state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/books/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book data');
                }
                const data = await response.json();
                setBook(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookData();
    }, [id]);

    // Handle "Buy Now" button click
    const handleBuyNow = () => {
        if (isAuthenticated) {
            // If user is logged in, navigate to the checkout page with book info
            navigate('/checkout', { state: { book } });
        } else {
            // If not logged in, navigate to login page with redirection back to this page
            navigate('/login', { state: { redirectTo: `/book-detail/${id}` } });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!book) {
        return <div>No book found.</div>;
    }

    return (
        <div className="book-detail">
            {/* Existing Book Detail Code */}
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

                    {/* Horizontal line under rating */}
                    <hr className="book-detail__separator" />

                    {/* Row with quantity, add to cart, and favorite heart */}
                    <div className="book-detail__actions">
                        <div className="book-detail__quantity">
                            <label htmlFor="quantity">Quantity: </label>
                            <select id="quantity" defaultValue="1">
                                {[...Array(10).keys()].map(i => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                        <button className="book-detail__add-to-cart">Add to Cart</button>
                        <button className="book-detail__favorite">
                            <span role="img" aria-label="heart">❤️</span>
                        </button>
                    </div>
                    {/* Add the Buy Now button */}
                    <button className="book-detail__buy-now" onClick={handleBuyNow}>
                        Buy Now
                    </button>
                </div>
            </div>

            {/* Book description */}
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
