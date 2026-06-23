import { Link, usePage, router, useForm } from '@inertiajs/react';
import { PropsWithChildren, useState, useEffect } from 'react';
import { Menu, X, Camera as Instagram, Globe as Facebook, Send as Twitter, ShoppingBag, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/Context/CartContext';
import SEO from '@/Components/SEO';
import DarkModeToggle from '@/Components/DarkModeToggle';
import Logo from '@/Components/Logo';
import { cn } from '@/lib/utils';
import WhatsAppChatBot from '@/Components/WhatsAppChatBot';

export default function PublicLayout({ children }: PropsWithChildren) {
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [subscribeSuccess, setSubscribeSuccess] = useState(false);

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
        { name: 'Book Appointment', href: route('book') },
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
                    <Link href="/" className="group flex items-center transition-transform duration-500 hover:scale-105">
                        <Logo size="md" variant="dark" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden items-center space-x-10 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-xs uppercase tracking-widest text-brand-black hover:text-brand-gold transition-colors dark:text-gray-300 dark:hover:text-brand-gold"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex items-center space-x-4">
                            <DarkModeToggle />
                            <Link href="/checkout" className="relative p-2 text-brand-black hover:text-brand-gold transition-colors dark:text-gray-300">
                                <ShoppingBag className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
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
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-sm uppercase tracking-widest text-brand-black"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
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
                                    <Link href="/login" className="hover:text-white transition-colors text-brand-gold/60">Admin Portal</Link>
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
        </div>
    );
}
