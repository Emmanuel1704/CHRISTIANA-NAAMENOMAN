import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
    id: number;
    title: string;
    price: number;
    currency?: string;
    image_path: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: any) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    displayCurrency: string;
    setDisplayCurrency: (currency: string) => void;
    convertPrice: (price: number, fromCurrency: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const RATES: Record<string, number> = {
    GHS: 1.0,
    USD: 15.0, // 1 USD = 15.0 GHS
    EUR: 16.5, // 1 EUR = 16.5 GHS
    GBP: 19.5, // 1 GBP = 19.5 GHS
};

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [displayCurrency, setDisplayCurrencyState] = useState('GHS');

    useEffect(() => {
        const savedCart = localStorage.getItem('chrisnoman_cart');
        if (savedCart) setCart(JSON.parse(savedCart));

        const savedCurrency = localStorage.getItem('chrisnoman_currency');
        if (savedCurrency) setDisplayCurrencyState(savedCurrency);
    }, []);

    useEffect(() => {
        localStorage.setItem('chrisnoman_cart', JSON.stringify(cart));
    }, [cart]);

    const setDisplayCurrency = (currency: string) => {
        setDisplayCurrencyState(currency);
        localStorage.setItem('chrisnoman_currency', currency);
    };

    const convertPrice = (price: number, fromCurrency: string): number => {
        const from = fromCurrency?.toUpperCase() || 'GHS';
        const target = displayCurrency.toUpperCase();
        if (from === target) return price;

        // Convert to base currency (GHS)
        const priceInGHS = price * (RATES[from] || 1.0);
        // Convert to target display currency
        const converted = priceInGHS / (RATES[target] || 1.0);
        return Math.round(converted * 100) / 100;
    };

    const addToCart = (product: any) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => setCart([]);

    // Calculate total based on converted prices
    const cartTotal = cart.reduce((total, item) => {
        const convertedPrice = convertPrice(item.price, item.currency || 'GHS');
        return total + convertedPrice * item.quantity;
    }, 0);

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ 
                cart, 
                addToCart, 
                removeFromCart, 
                updateQuantity, 
                clearCart, 
                cartTotal, 
                cartCount,
                displayCurrency,
                setDisplayCurrency,
                convertPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
