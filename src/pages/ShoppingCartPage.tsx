import React from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { useNavigate  } from "react-router-dom";
import './ShoppingCartPage.css';

const ShoppingCartPage: React.FC = () => {
    const { cart, updateQuantity, removeFromCart, toggleItem } = useShoppingCart();
    const navigate = useNavigate();
    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            updateQuantity(id, quantity);
        }
    };
    const handleCheckout = () => {
        navigate("/checkout"); // Navigate to the checkout page
      };
    const total = cart.reduce(
        (sum, item) => (item.isChecked ? sum + item.price * item.quantity : sum),
        0
    );
    const totalPrice = cart
    .filter(item => item.isChecked) // Only count checked items
    .reduce((total, item) => total + item.price * item.quantity, 0);

const tax = totalPrice * 0.13; // 13% tax
const finalTotal = totalPrice + tax;

    return (
        <div className="shopping-cart">
            <h1>Your Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <table className="shopping-cart__table">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Book</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={item.isChecked}
                                            onChange={() => toggleItem(item.id)}
                                        />
                                    </td>
                                    <td>
                                        <div className="shopping-cart__book-info">
                                            <img src={item.img} alt={item.title} />
                                            <span>{item.title}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(item.id, parseInt(e.target.value, 10))
                                            }
                                            min="1"
                                        />
                                    </td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="cart-summary">
                <p>Total: ${totalPrice.toFixed(2)}</p>
                <p>Tax (13%): ${tax.toFixed(2)}</p>
                <p>Final Total: ${finalTotal.toFixed(2)}</p>
                <button onClick={handleCheckout} disabled={finalTotal === 0}>
                    Proceed to Checkout
                </button>
            </div>
                </>
            )}
        </div>
    );
};

export default ShoppingCartPage;
