// CheckoutPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import './CheckoutPage.css';

const CheckoutPage: React.FC = () => {
    const { cart } = useShoppingCart();
    const navigate = useNavigate();
    
    // Filter cart items that are selected for checkout
    const selectedItems = cart.filter(item => item.isChecked);

    // Calculate the total price and tax
    const totalPrice = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = totalPrice * 0.13; // 13% tax
    const finalTotal = totalPrice + tax;

    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    const handlePlaceOrder = () => {
        // Mock the order completion (you can send this data to a backend in a real scenario)
        alert('Order placed successfully!');

        // Redirect to the homepage or another page
        navigate('/');
    };

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <div className="checkout-summary">
                <h3>Order Summary</h3>
                <div className="checkout-items">
                    {selectedItems.map(item => (
                        <div key={item.id} className="checkout-item">
                            <img src={item.img} alt={item.title} />
                            <div>
                                <h4>{item.title}</h4>
                                <p>{item.author}</p>
                                <p>${item.price} x {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="checkout-price">
                    <p>Total: ${totalPrice.toFixed(2)}</p>
                    <p>Tax (13%): ${tax.toFixed(2)}</p>
                    <p>Final Total: ${finalTotal.toFixed(2)}</p>
                </div>
            </div>

            <div className="payment-form">
                <h3>Payment Information</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            maxLength={16}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input
                            type="text"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="MM/YY"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            maxLength={3}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="nameOnCard">Name on Card</label>
                        <input
                            type="text"
                            id="nameOnCard"
                            value={nameOnCard}
                            onChange={(e) => setNameOnCard(e.target.value)}
                            required
                        />
                    </div>
                </form>
            </div>

            <button onClick={handlePlaceOrder} disabled={finalTotal === 0}>
                Place Your Order
            </button>
        </div>
    );
};

export default CheckoutPage;
