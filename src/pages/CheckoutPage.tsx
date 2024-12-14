import React from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const book = location.state?.book;

    if (!book) {
        return <div>No book selected for checkout.</div>;
    }

    return (
        <div>
            <h1>Checkout</h1>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            {/* Additional checkout functionality */}
        </div>
    );
};

export default CheckoutPage;
