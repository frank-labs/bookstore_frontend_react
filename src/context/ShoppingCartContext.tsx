import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
    id: string;
    title: string;
    author: string;
    price: number;
    img: string;
    quantity: number;
    isChecked: boolean; // Whether this item is selected for checkout
}

interface ShoppingCartContextProps {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    toggleItem: (id: string) => void;
    clearCart: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(undefined);

export const ShoppingCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize state from localStorage or use an empty array
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem('shoppingCart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Persist cart state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                // Update quantity if item already exists
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            }
            return [...prevCart, item];
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
    };

    const toggleItem = (id: string) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === id ? { ...item, isChecked: !item.isChecked } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <ShoppingCartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, toggleItem, clearCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext);
    if (!context) {
        throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
    }
    return context;
};
