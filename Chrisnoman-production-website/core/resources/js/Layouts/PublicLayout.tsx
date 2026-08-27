import { Link, usePage, router, useForm } from '@inertiajs/react';
import { PropsWithChildren, useState, useEffect } from 'react';
import { Menu, X, Camera as Instagram, Globe as Facebook, Send as Twitter, ShoppingBag, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/Context/CartContext';
import SEO from '@/Components/SEO';
import DarkModeToggle from '@/Components/DarkModeToggle';
import Logo from '@/Components/Logo';
import { cn } from '@/lib/utils';
import WhatsAppChatBot from '@/Components/WhatsAppChatBot';

export default function PublicLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, displayCurrency, setDisplayCurrency, convertPrice } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [subscribeSuccess, setSubscribeSuccess] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [prevCount, setPrevCount] = useState(cartCount);

    useEffect(() => {
        if (cartCount > prevCount) {
            setIsCartOpen(true);
        }
        setPrevCount(cartCount);
    }, [cartCount]);

    const { data: newsletterData, setData: setNewsletterData, post: postNewsletter, processing: newsletterProcessing, errors: newsletterErrors, reset: resetNewsletter } = useForm({
        email: '',
    });

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubscribeSuccess(false);
        postNewsletter(route('newsletter.subscribe'), {
            preserveScroll: true,
            onSuccess: () => {
                resetNewsletter('email');
                setSubscribeSuccess(true);
                setTimeout(() => setSubscribeSuccess(false), 5000);
            },
        });
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: route('home') },
        { name: 'Collections', href: route('collections') },
        { name: 'Lookbook', href: route('lookbook') },
        { name: 'Contact', href: route('contact') },
    ];

    const mobileNavLinks = [
        { name: 'Home', href: route('home') },
        { name: 'Collections', href: route('collections') },
        { name: 'Lookbook', href: route('lookbook') },
        { name: 'Gown Builder', href: route('gown-builder') },
        { name: 'Track Order', href: route('track-order') },
        { name: 'Size Guide', href: route('size-guide') },
        { name: 'Book Fitting', href: route('book') },
        { name: 'Contact', href: route('contact') },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-brand-black selection:bg-brand-gold/30 dark:bg-brand-black dark:text-white transition-colors duration-500 relative">
            <SEO />
            
            {/* Branded Loading Overlay */}
            <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: '-100%' }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black pointer-events-none"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                >
                    <Logo size="lg" variant="light" />
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.6, delay: 0.1, ease: 'circOut' }}
                        className="h-px bg-brand-gold mt-6"
                    />
                </motion.div>
            </motion.div>
            {/* Navigation */}
            <nav
                className={cn(
                    'fixed top-0 z-50 w-full transition-all duration-500',
                    scrolled 
                        ? 'bg-white/80 py-4 shadow-sm backdrop-blur-md dark:bg-brand-black/80' 
                        : 'bg-transparent py-6'
                )}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
                    <Link href={route('home')} className="group flex items-center transition-transform duration-500 hover:scale-105">
                        <Logo size="md" variant="dark" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden items-center space-x-10 md:flex">
                        <Link
                            href={route('home')}
                            className="relative group text-xs uppercase tracking-widest text-brand-black hover:text-brand-gold transition-colors dark:text-gray-300 dark:hover:text-brand-gold pb-1"
                        >
                            <span>Home</span>
                            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                        </Link>
                        <Link
                            href={route('collections')}
                            className="relative group text-xs uppercase tracking-widest text-brand-black hover:text-brand-gold transition-colors dark:text-gray-300 dark:hover:text-brand-gold pb-1"
                        >
                            <span>Collections</span>
                            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                        </Link>
                        <Link
                            href={route('lookbook')}
                            className="relative group text-xs uppercase tracking-widest text-brand-black hover:text-brand-gold transition-colors dark:text-gray-300 dark:hover:text-brand-gold pb-1"
                        >
                            <span>Lookbook</span>
                            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                        </Link>

                        {/* Atelier Services Dropdown */}
                        <div className="relative group/dropdown py-2">
                            <button className="relative group text-xs uppercase tracking-widest text-brand-black hover:text-brand-gold transition-colors dark:text-gray-300 dark:hover:text-brand-gold flex items-center space-x-1 pb-1">
                                <span>Atelier Services</span>
                                <ChevronDown className="h-3 w-3" />
                                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white dark:bg-zinc-900 border border-gray-150/40 dark:border-zinc-800 rounded-xl shadow-lg p-2 hidden group-hover/dropdown:block animate-fade-in z-50">
                                <Link href={route('gown-builder')} className="block px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-brand-gold/10 hover:text-brand-gold rounded-lg transition-colors font-medium">
                                    Gown Builder
                                </Link>
                                <Link href={route('track-order')} className="block px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-brand-gold/10 hover:text-brand-gold rounded-lg transition-colors font-medium">
                                    Track Fitting
                                </Link>
                                <Link href={route('size-guide')} className="block px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-brand-gold/10 hover:text-brand-gold rounded-lg transition-colors font-medium">
                                    Size Guide
                                </Link>
                                <Link href={route('book')} className="block px-4 py-2.5 text-xs text-gray-700 dark:text-gray-200 hover:bg-brand-gold/10 hover:text-brand-gold rounded-lg transition-colors font-medium">
                                    Book Fitting
                                </Link>
                            </div>
                        </div>

                        <Link
                            href={route('contact')}
                            className="relative group text-xs uppercase tracking-widest text-brand-black hover:text-brand-gold transition-colors dark:text-gray-300 dark:hover:text-brand-gold pb-1"
                        >
                            <span>Contact</span>
                            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                        </Link>

                        {user && (
                            <Link
                                href={route('my-wardrobe')}
                                className="relative group text-xs uppercase tracking-widest text-brand-black hover:text-brand-gold transition-colors dark:text-gray-300 dark:hover:text-brand-gold pb-1"
                            >
                                <span>My Wardrobe</span>
                                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                            </Link>
                        )}
                        <div className="flex items-center space-x-4">
                            <select
                                value={displayCurrency}
                                onChange={(e) => setDisplayCurrency(e.target.value)}
                                className="text-xs bg-transparent border-0 font-bold tracking-widest text-brand-black hover:text-brand-gold transition-colors dark:text-gray-300 focus:ring-0 focus:outline-none py-1 pl-1 pr-6 cursor-pointer"
                            >
                                <option value="GHS">GHS (₵)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                            <DarkModeToggle />
                            <button 
                                onClick={() => setIsCartOpen(true)} 
                                className="relative p-2 text-brand-black hover:text-brand-gold transition-colors dark:text-gray-300 focus:outline-none"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute left-0 top-full w-full bg-white px-6 py-10 shadow-xl md:hidden"
                        >
                            <div className="flex flex-col space-y-6">
                                {mobileNavLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-sm uppercase tracking-widest text-brand-black dark:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                {user && (
                                    <Link
                                        href={route('my-wardrobe')}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-sm uppercase tracking-widest text-brand-gold font-bold"
                                    >
                                        My Wardrobe
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content */}
            <main className="pt-20 md:pt-0">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-brand-black py-20 text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-12 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <Logo size="lg" variant="light" />
                            <p className="mt-6 max-w-sm text-sm leading-relaxed text-gray-400">
                                Elegance in every stitch. We specialize in custom ladies' wear, 
                                bridal collections, and contemporary African fashion.
                            </p>
                            <div className="mt-8 flex space-x-6">
                                <a href="https://www.instagram.com/chrisnoman_fashion" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors text-gray-400">
                                    <Instagram className="h-5 w-5" />
                                </a>
                                <a href="https://www.facebook.com/chrisnomanfashion" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors text-gray-400">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="https://www.tiktok.com/@chrisanoman_fashion" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors text-gray-400">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23 1.02 1.27 2.45 2.19 4.04 2.61v3.9c-2.3-.01-4.52-.96-6.19-2.58a8.878 8.878 0 0 1-.41-.44v7.71c-.08 1.95-.89 3.82-2.28 5.16-1.5 1.43-3.53 2.22-5.64 2.21-2.26.04-4.47-.93-5.98-2.61A9.82 9.82 0 0 1 0 13.63c-.02-2.22.86-4.35 2.41-5.91 1.49-1.57 3.61-2.48 5.84-2.51.52.01 1.04.07 1.55.18V9.32a6.009 6.009 0 0 0-1.55-.2c-1.22-.01-2.41.44-3.3 1.25-.97.87-1.49 2.13-1.42 3.42.06 1.25.66 2.4 1.63 3.19.98.78 2.24 1.15 3.48 1.01 1.19-.13 2.27-.8 2.89-1.81.38-.63.58-1.36.57-2.1V.02Z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xs uppercase tracking-[0.2em] text-brand-gold">Quick Links</h3>
                            <ul className="mt-6 space-y-4 text-sm text-gray-400">
                                {navLinks.map(link => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="hover:text-white transition-colors">{link.name}</Link>
                                    </li>
                                ))}
                                <li>
                                    <Link href={route('login')} className="hover:text-white transition-colors text-brand-gold/60">Admin Portal</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs uppercase tracking-[0.2em] text-brand-gold">Newsletter</h3>
                            <p className="mt-6 text-sm text-gray-400">Join the Chrisnoman Atelier for early access and styling tips.</p>
                            <form 
                                onSubmit={handleNewsletterSubmit}
                                className="mt-6 flex flex-col space-y-2"
                            >
                                <input 
                                    name="email"
                                    type="email" 
                                    placeholder="your@email.com"
                                    value={newsletterData.email || ''}
                                    onChange={(e) => setNewsletterData('email', e.target.value)}
                                    disabled={newsletterProcessing}
                                    className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:border-brand-gold outline-none transition-colors disabled:opacity-50"
                                    required
                                />
                                <button 
                                    type="submit"
                                    disabled={newsletterProcessing}
                                    className="bg-brand-gold py-3 text-[10px] font-bold uppercase tracking-widest text-brand-black hover:bg-white transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                    {newsletterProcessing ? 'Subscribing...' : 'Subscribe'}
                                </button>
                            </form>

                            <AnimatePresence>
                                {subscribeSuccess && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-4 flex items-center space-x-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                                    >
                                        <CheckCircle className="h-4 w-4 shrink-0" />
                                        <span>Subscribed to our journal!</span>
                                    </motion.div>
                                )}

                                {newsletterErrors.email && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="mt-4 flex items-center space-x-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                                    >
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        <span>{newsletterErrors.email}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="mt-20 border-t border-white/10 pt-8 text-center text-[10px] uppercase tracking-widest text-gray-600">
                        © {new Date().getFullYear()} Chrisnoman Fashion. All Rights Reserved.
                    </div>
                </div>
            </footer>

            {/* Interactive WhatsApp Chatbot */}
            <WhatsAppChatBot />

            {/* Cart Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        {/* Overlay backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs"
                        />
                        {/* Drawer body */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-md bg-white dark:bg-zinc-950 shadow-2xl flex flex-col border-l border-gray-100 dark:border-zinc-800"
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-850 px-6 py-5">
                                <div className="flex items-center space-x-2">
                                    <ShoppingBag className="h-5 w-5 text-brand-gold" />
                                    <span className="font-serif text-lg font-bold text-brand-black dark:text-white">Shopping Bag ({cartCount})</span>
                                </div>
                                <button 
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 text-gray-400 hover:text-brand-black dark:hover:text-white transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Drawer Items list */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                        <ShoppingBag className="h-12 w-12 text-gray-300" strokeWidth={1.5} />
                                        <p className="text-gray-400 font-medium">Your shopping bag is empty.</p>
                                        <button 
                                            onClick={() => setIsCartOpen(false)}
                                            className="text-xs font-bold uppercase tracking-widest text-[#DCA73A] border-b border-[#DCA73A] pb-0.5"
                                        >
                                            Continue Browsing
                                        </button>
                                    </div>
                                ) : (
                                    cart.map((item) => (
                                        <div key={item.id} className="flex space-x-4 border-b border-gray-50 dark:border-zinc-905 pb-6">
                                            <div className="h-20 w-16 overflow-hidden rounded bg-gray-50 shrink-0">
                                                <img src={item.image_path} alt={item.title} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-serif text-sm font-bold text-gray-900 dark:text-white truncate">{item.title}</h4>
                                                <p className="text-xs font-bold text-brand-gold mt-1">
                                                    {displayCurrency === 'USD' ? '$' : displayCurrency === 'EUR' ? '€' : displayCurrency === 'GBP' ? '£' : 'GH₵'}
                                                    {convertPrice(item.price, item.currency || 'GHS').toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </p>
                                                {/* Quantity Selector */}
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center space-x-2 border border-gray-100 dark:border-zinc-800 rounded p-1">
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="text-xs px-2 py-0.5 text-gray-400 hover:text-brand-black dark:hover:text-white"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-xs font-bold text-brand-black dark:text-white w-4 text-center">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="text-xs px-2 py-0.5 text-gray-400 hover:text-brand-black dark:hover:text-white"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button 
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-[10px] uppercase tracking-wider text-red-400 hover:text-red-600 font-bold"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Drawer Footer */}
                            {cart.length > 0 && (
                                <div className="border-t border-gray-100 dark:border-zinc-850 p-6 space-y-6">
                                    <div className="flex items-center justify-between text-base font-bold text-brand-black dark:text-white">
                                        <span>Subtotal</span>
                                        <span>
                                            {displayCurrency === 'USD' ? '$' : displayCurrency === 'EUR' ? '€' : displayCurrency === 'GBP' ? '£' : 'GH₵'}
                                            {cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                                        Shipping & payments calculated at checkout.
                                    </p>
                                    <Link 
                                        href={route('checkout')}
                                        onClick={() => setIsCartOpen(false)}
                                        className="flex w-full items-center justify-center bg-brand-black py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#DCA73A] hover:text-brand-black transition-colors"
                                    >
                                        <span>Proceed to Checkout</span>
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
