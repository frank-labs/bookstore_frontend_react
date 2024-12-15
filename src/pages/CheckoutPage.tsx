// CheckoutPage.tsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';
import './CheckoutPage.css';

const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const { cart } = useShoppingCart();
    const navigate = useNavigate();
    // Check if we are doing a "Buy Now" checkout
    const book = location.state?.book;
    // Filter cart items that are selected for checkout
    const selectedItems = cart.filter(item => item.isChecked);

    // Determine the items to be checked out
    const itemsToCheckout = book ? [book] : selectedItems;
    // Calculate the total price and tax
    const totalPrice = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = totalPrice * 0.13; // 13% tax
    const grandTotal  = totalPrice + tax;

    const handlePlaceOrder = () => {
        // Mock payment processing
        console.log('Order placed:', itemsToCheckout);
        alert('Order placed successfully!');
        navigate('/');
      };
    
      return (
        <div className="checkout-page">
          <h1>Checkout</h1>
          <div className="checkout-items">
            {itemsToCheckout.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.img} alt={item.title} />
                <div>
                  <h2>{item.title}</h2>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
    
          <div className="checkout-summary">
            <h2>Price Summary</h2>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p>Tax (13%): ${tax.toFixed(2)}</p>
            <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
          </div>
    
          <div className="checkout-form">
            <h2>Payment Information</h2>
            <form>
              <label>
                Credit Card Number:
                <input type="text" placeholder="Enter card number" />
              </label>
              <label>
                Expiration Date:
                <input type="text" placeholder="MM/YY" />
              </label>
              <label>
                CVV:
                <input type="text" placeholder="CVV" />
              </label>
            </form>
          </div>
    
          <button onClick={handlePlaceOrder}>Place Your Order</button>
        </div>
      );
    };
    
    export default CheckoutPage;