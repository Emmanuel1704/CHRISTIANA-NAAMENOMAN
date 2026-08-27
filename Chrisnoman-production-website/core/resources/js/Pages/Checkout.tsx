import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';
import { useCart } from '@/Context/CartContext';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

import { asset } from '@/lib/utils';

export default function Checkout() {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, displayCurrency, convertPrice } = useCart();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isMomoPromptVisible, setIsMomoPromptVisible] = useState(false);
    const [momoPin, setMomoPin] = useState('');
    const [momoProcessing, setMomoProcessing] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        email: '',
        phone: '',
        address: '',
        items: cart,
        total_amount: cartTotal,
        currency: displayCurrency,
        payment_method: 'momo',
        momo_network: 'mtn',
        momo_number: '',
    });

    useEffect(() => {
        setData('items', cart);
    }, [cart]);

    useEffect(() => {
        setData('total_amount', cartTotal);
    }, [cartTotal]);

    useEffect(() => {
        setData('currency', displayCurrency);
    }, [displayCurrency]);

    const submitOrder = () => {
        post(route('orders.store'), {
            onSuccess: () => {
                setIsSuccess(true);
                clearCart();
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.payment_method === 'momo') {
            setIsMomoPromptVisible(true);
            return;
        }
        submitOrder();
    };

    const handleMomoPayment = (e: React.FormEvent) => {
        e.preventDefault();
        setMomoProcessing(true);
        setTimeout(() => {
            setMomoProcessing(false);
            setIsMomoPromptVisible(false);
            submitOrder();
        }, 2000);
    };

    if (isSuccess) {
        return (
            <PublicLayout>
                <Head title="Order Successful" />
                <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
                        <h1 className="mt-8 font-serif text-4xl font-bold">Thank You for Your Order!</h1>
                        <p className="mt-4 text-gray-500">Your order has been placed successfully. We will contact you shortly.</p>
                        <a 
                            href="/"
                            className="mt-10 inline-block bg-brand-black px-10 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-gold hover:text-brand-black transition-all"
                        >
                            Back to Home
                        </a>
                    </motion.div>
                </section>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <Head title="Checkout" />

            <section className="bg-brand-cream/20 py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <h1 className="font-serif text-5xl font-bold">Checkout</h1>
                    
                    <div className="mt-16 grid gap-16 lg:grid-cols-2">
                        {/* Cart Summary */}
                        <div className="space-y-8">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-gold">Your Selection</h2>
                            
                            <div className="divide-y divide-gray-100">
                                {cart.length > 0 ? cart.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-6 py-6">
                                        <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-sm">
                                            <img src={asset(item.image_path)} alt={item.title} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <div className="flex justify-between">
                                                <h3 className="font-serif text-lg font-bold">{item.title}</h3>
                                                <p className="font-bold text-brand-gold">
                                                    {displayCurrency === 'USD' ? '$' : displayCurrency === 'EUR' ? '€' : displayCurrency === 'GBP' ? '£' : 'GH₵'}
                                                    {(convertPrice(item.price, item.currency || 'GHS') * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </p>
                                            </div>
                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center space-x-4 border border-gray-100 rounded-lg p-1">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-brand-gold"><Minus className="h-3 w-3" /></button>
                                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-brand-gold"><Plus className="h-3 w-3" /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="py-20 text-center text-gray-400 font-medium">Your cart is empty.</div>
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="border-t border-gray-100 pt-8">
                                    <div className="flex items-center justify-between text-2xl font-bold">
                                        <span className="font-serif">Total</span>
                                        <span className="text-brand-gold">
                                            {displayCurrency === 'USD' ? '$' : displayCurrency === 'EUR' ? '€' : displayCurrency === 'GBP' ? '£' : 'GH₵'}
                                            {cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Checkout Form */}
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-gold">Shipping Information</h2>
                            <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-10 shadow-2xl rounded-sm border border-brand-gold/10">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                                    <input 
                                        required
                                        type="text" 
                                        className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors"
                                        value={data.customer_name}
                                        onChange={(e) => setData('customer_name', e.target.value)}
                                    />
                                    {errors.customer_name && <p className="text-xs text-red-500">{errors.customer_name}</p>}
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email</label>
                                        <input 
                                            required
                                            type="email" 
                                            className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone</label>
                                        <input 
                                            required
                                            type="tel" 
                                            className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />
                                        {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Delivery Address</label>
                                    <textarea 
                                        required
                                        rows={4}
                                        className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors resize-none"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                    />
                                    {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                                </div>

                                <div className="space-y-4 pt-4 border-t border-gray-100">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Payment Method</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <label className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${data.payment_method === 'momo' ? 'border-brand-gold bg-brand-gold/5 text-brand-black' : 'border-gray-100 hover:border-gray-200 text-gray-400'}`}>
                                            <input 
                                                type="radio" 
                                                name="payment_method" 
                                                value="momo" 
                                                checked={data.payment_method === 'momo'} 
                                                onChange={(e) => setData('payment_method', e.target.value)}
                                                className="sr-only"
                                            />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Mobile Money</span>
                                        </label>

                                        <label className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${data.payment_method === 'whatsapp' ? 'border-brand-gold bg-brand-gold/5 text-brand-black' : 'border-gray-100 hover:border-gray-200 text-gray-400'}`}>
                                            <input 
                                                type="radio" 
                                                name="payment_method" 
                                                value="whatsapp" 
                                                checked={data.payment_method === 'whatsapp'} 
                                                onChange={(e) => setData('payment_method', e.target.value)}
                                                className="sr-only"
                                            />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
                                        </label>

                                        <label className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all ${data.payment_method === 'cod' ? 'border-brand-gold bg-brand-gold/5 text-brand-black' : 'border-gray-100 hover:border-gray-200 text-gray-400'}`}>
                                            <input 
                                                type="radio" 
                                                name="payment_method" 
                                                value="cod" 
                                                checked={data.payment_method === 'cod'} 
                                                onChange={(e) => setData('payment_method', e.target.value)}
                                                className="sr-only"
                                            />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Cash on Del.</span>
                                        </label>
                                    </div>
                                </div>

                                {data.payment_method === 'momo' && (
                                    <div className="grid gap-6 md:grid-cols-2 bg-gray-50 p-6 rounded-lg border border-gray-100">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">MoMo Network</label>
                                            <select
                                                required
                                                className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors bg-transparent"
                                                value={data.momo_network}
                                                onChange={(e) => setData('momo_network', e.target.value)}
                                            >
                                                <option value="mtn">MTN Mobile Money</option>
                                                <option value="telecel">Telecel Cash</option>
                                                <option value="at">AT Money</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">MoMo Number</label>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="e.g. 0541234567"
                                                className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors bg-transparent"
                                                value={data.momo_number}
                                                onChange={(e) => setData('momo_number', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                <button 
                                    type="submit"
                                    disabled={processing || cart.length === 0}
                                    className="group flex w-full items-center justify-center space-x-4 bg-brand-black py-5 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-gold hover:text-brand-black transition-all disabled:opacity-50"
                                >
                                    <span>{processing ? 'Processing...' : data.payment_method === 'momo' ? 'Pay & Place Order' : 'Place Order'}</span>
                                    {!processing && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                                </button>
                                
                                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                                    {data.payment_method === 'momo' 
                                        ? 'Secured mobile money simulation prompt will be triggered upon checkout.' 
                                        : 'Details will be coordinated via your contact details after order placement.'}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* MoMo PIN Prompt Simulation Modal */}
            {isMomoPromptVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="w-full max-w-sm rounded-xl bg-gray-950 text-white shadow-2xl border border-gray-800 p-8">
                        <div className="text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">
                                <span className="font-bold text-xs uppercase">{data.momo_network}</span>
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-white uppercase tracking-wider">{data.momo_network} Pay</h3>
                            <p className="mt-2 text-xs text-gray-400">
                                Authorize payment of <span className="font-bold text-brand-gold">{displayCurrency === 'USD' ? '$' : displayCurrency === 'EUR' ? '€' : displayCurrency === 'GBP' ? '£' : 'GH₵'}{cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> to <span className="font-semibold text-white">Chrisnoman Atelier</span>.
                            </p>
                        </div>

                        <form onSubmit={handleMomoPayment} className="mt-8 space-y-6">
                            <div className="space-y-2 text-center">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Enter your 4-digit MoMo PIN</label>
                                <input
                                    required
                                    type="password"
                                    maxLength={4}
                                    pattern="\d{4}"
                                    placeholder="••••"
                                    className="mx-auto block w-32 border-b-2 border-brand-gold bg-transparent text-center text-2xl tracking-[0.5em] focus:border-brand-gold focus:outline-none focus:ring-0 text-white"
                                    value={momoPin}
                                    onChange={(e) => setMomoPin(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsMomoPromptVisible(false)}
                                    className="flex-1 rounded border border-gray-700 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:bg-gray-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={momoProcessing || momoPin.length < 4}
                                    className="flex-1 rounded bg-[#DCA73A] py-3 text-xs font-bold uppercase tracking-widest text-brand-black hover:bg-white transition-all disabled:opacity-50"
                                >
                                    {momoProcessing ? 'Authorizing...' : 'Pay Now'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
