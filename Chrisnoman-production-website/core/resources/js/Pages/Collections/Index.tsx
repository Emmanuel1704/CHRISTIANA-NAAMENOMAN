import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import SEO from '@/Components/SEO';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Maximize2, X, ShoppingBag } from 'lucide-react';
import { cn, asset } from '@/lib/utils';
import { useCart } from '@/Context/CartContext';

interface Collection {
    id: number;
    title: string;
    category: string;
    description: string;
    image_path: string;
    price: number;
    currency: string;
    stock_status: string;
}

interface Props {
    collections: Record<string, Collection[]>;
}

export default function Collections({ collections }: Props) {
    const { addToCart, convertPrice, displayCurrency } = useCart();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const categories = ['All', ...Object.keys(collections)];
    
    const allCollections = Object.values(collections).flat();
    const filteredCollections = selectedCategory === 'All' 
        ? allCollections 
        : collections[selectedCategory] || [];

    return (
        <PublicLayout>
            <SEO 
                title="Our Collections | Luxury Bridal & African Fashion" 
                description="Explore Chrisnoman Fashion's exclusive collections. From hand-crafted bridal gowns to vibrant African prints, find your perfect statement piece."
            />

            {/* Header */}
            <section className="bg-brand-cream/20 py-20">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold">Our Gallery</span>
                    <h1 className="mt-6 font-serif text-5xl font-bold">Fashion Collections</h1>
                    <p className="mt-6 mx-auto max-w-2xl text-gray-500">
                        Explore our curated selection of luxury bridal wear, corporate elegance, 
                        and contemporary African fashion.
                    </p>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="sticky top-20 z-40 bg-white/80 py-6 backdrop-blur-md border-y border-gray-100">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <div className="flex items-center space-x-2 text-brand-gold mr-4">
                            <Filter className="h-4 w-4" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Filter:</span>
                        </div>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "text-[10px] font-bold uppercase tracking-[0.2em] transition-all",
                                    selectedCategory === cat 
                                        ? "text-brand-black border-b-2 border-brand-gold pb-1" 
                                        : "text-gray-400 hover:text-brand-black"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                            {filteredCollections.length > 0 ? (
                                filteredCollections.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.6, delay: (index % 6) * 0.1, ease: [0.25, 1, 0.5, 1] }}
                                        className="group relative"
                                    >
                                        <div className="aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 relative">
                                            {/* Status Badge */}
                                            {item.stock_status === 'out_of_stock' && (
                                                <div className="absolute top-4 left-4 z-30 bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded shadow-md">
                                                    Sold Out
                                                </div>
                                            )}
                                            {item.stock_status === 'custom_only' && (
                                                <div className="absolute top-4 left-4 z-30 bg-[#DCA73A] text-brand-black text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded shadow-md">
                                                    Bespoke Only
                                                </div>
                                            )}

                                            <img 
                                                src={asset(item.image_path)} 
                                                alt={item.title} 
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Overlay */}
                                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brand-black/80 via-transparent to-transparent p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20">
                                                <button 
                                                    onClick={() => setSelectedImage(item.image_path)}
                                                    className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-brand-gold transition-colors"
                                                >
                                                    <Maximize2 className="h-4 w-4" />
                                                </button>
                                                <p className="text-[10px] uppercase tracking-widest text-brand-gold">{item.category}</p>
                                                <div className="flex items-center justify-between mt-2">
                                                    <h3 className="font-serif text-2xl font-bold text-white">{item.title}</h3>
                                                    <span className="text-sm font-bold text-brand-gold">
                                                        {displayCurrency === 'USD' ? '$' : displayCurrency === 'EUR' ? '€' : displayCurrency === 'GBP' ? '£' : 'GH₵'}
                                                        {convertPrice(item.price, item.currency || 'GHS').toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-xs text-gray-300 line-clamp-2">{item.description}</p>
                                                
                                                {item.stock_status === 'out_of_stock' ? (
                                                    <button 
                                                        disabled
                                                        className="mt-6 flex w-full items-center justify-center space-x-2 bg-gray-700 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 cursor-not-allowed"
                                                    >
                                                        <span>Sold Out</span>
                                                    </button>
                                                ) : item.stock_status === 'custom_only' ? (
                                                    <a 
                                                        href={`/book?service=Custom%20Sewing&notes=${encodeURIComponent(`Requesting custom tailoring for the design: ${item.title} (bringing my own fabric).`)}`}
                                                        className="mt-6 flex w-full items-center justify-center space-x-2 bg-[#DCA73A] py-3 text-[10px] font-bold uppercase tracking-widest text-brand-black hover:bg-white transition-all text-center"
                                                    >
                                                        <span>Request Custom Sewing / Sew Fabric</span>
                                                    </a>
                                                ) : (
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            addToCart(item);
                                                        }}
                                                        className="mt-6 flex w-full items-center justify-center space-x-2 bg-brand-gold py-3 text-[10px] font-bold uppercase tracking-widest text-brand-black hover:bg-white transition-all"
                                                    >
                                                        <ShoppingBag className="h-3 w-3" />
                                                        <span>Add to Cart</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Below Card Details for constant readability & mobile view */}
                                        <div className="mt-4 flex items-start justify-between px-1">
                                            <div>
                                                <p className="text-[9px] uppercase tracking-widest text-brand-gold">{item.category}</p>
                                                <h3 className="font-serif text-base font-bold text-brand-black dark:text-white mt-1 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                                                {item.stock_status === 'out_of_stock' && (
                                                    <span className="text-[9px] text-red-500 font-bold uppercase tracking-wider mt-1 block">Sold Out</span>
                                                )}
                                                {item.stock_status === 'custom_only' && (
                                                    <span className="text-[9px] text-[#DCA73A] font-bold uppercase tracking-wider mt-1 block">Custom Sewing Only</span>
                                                )}
                                            </div>
                                            <span className="font-bold text-brand-black dark:text-brand-gold text-sm">
                                                {displayCurrency === 'USD' ? '$' : displayCurrency === 'EUR' ? '€' : displayCurrency === 'GBP' ? '£' : 'GH₵'}
                                                {convertPrice(item.price, item.currency || 'GHS').toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center">
                                    <p className="text-gray-400 uppercase tracking-widest text-sm">No items found in this category.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 p-6 backdrop-blur-sm"
                    >
                        <button className="absolute top-10 right-10 text-white hover:text-brand-gold transition-colors">
                            <X className="h-8 w-8" />
                        </button>
                        <motion.img 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            src={asset(selectedImage)} 
                            alt="Preview" 
                            className="max-h-full max-w-full object-contain shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}
