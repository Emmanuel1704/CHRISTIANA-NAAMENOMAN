import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle, Camera as Instagram, Scissors, Ruler, Sparkles, Star, ChevronLeft, ChevronRight, Gift, X } from 'lucide-react';
import { asset } from '@/lib/utils';
import { useState } from 'react';

interface Props {
    featuredCollections: any[];
    testimonials: any[];
    settings?: Record<string, string>;
}

export default function Welcome({ featuredCollections, testimonials, settings = {} }: Props) {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [activeDesignerPhoto, setActiveDesignerPhoto] = useState(0);

    const designerPhotos = [
        settings.designer_image || '/assets/images/designer/designer_1.jpg',
        '/assets/images/designer/designer_2.jpg',
        '/assets/images/designer/designer_3.jpg',
    ];
const steps = [
        {
            number: '01',
            title: 'Select Design Style',
            desc: 'Browse our dynamic luxury collections or upload an inspiration photo from Pinterest or Instagram.',
            icon: Sparkles,
        },
        {
            number: '02',
            title: 'Choose Fabric Option',
            desc: 'Choose to bring in your own fabrics/materials to our studio, or request our team to source premium silk and lace.',
            icon: Scissors,
        },
        {
            number: '03',
            title: 'Bespoke Measurement',
            desc: 'Map your fit using our interactive online size calculator or visit our Accra studio for custom measurements.',
            icon: Ruler,
        },
        {
            number: '04',
            title: 'Mobile Money Checkout',
            desc: 'Confirm your custom styling specifications and checkout securely using instant local MoMo wallet prompts.',
            icon: Gift,
        },
    ];

    const mockReviews = [
        {
            name: 'Naa Adjeley',
            role: 'Accra Bride',
            text: 'Chrisnoman Fashion made my dream wedding gown! I brought my own raw lace, and the custom sewing was so precise. Highly recommend!',
            rating: 5,
        },
        {
            name: 'Korkor Mensah',
            role: 'Corporate Professional',
            text: 'The dynamic multi-currency display was perfect for my orders from London, and booking custom fittings was incredibly easy. Truly professional work.',
            rating: 5,
        },
        {
            name: 'Amma Boateng',
            role: 'Gala Client',
            text: 'I uploaded my Ankara design, scheduled my sizing guide online, and got a secure MoMo payment notification immediately. Seamless experience!',
            rating: 5,
        },
    ];

    const reviews = testimonials && testimonials.length > 0 ? testimonials : mockReviews;

    const handleNextReview = () => {
        setActiveTestimonial((prev) => (prev + 1) % reviews.length);
    };

    const handlePrevReview = () => {
        setActiveTestimonial((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <PublicLayout>
            <Head title="Chrisnoman Fashion — Luxury Bespoke Ladies' Wear" />

            {/* Hero Section */}
            <section className="relative h-[92vh] overflow-hidden bg-brand-cream dark:bg-black">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={asset("/assets/images/hero.png")} 
                        alt="Chrisnoman Fashion" 
                        className="h-full w-full object-cover opacity-90 transition-transform duration-10000 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 via-brand-black/40 to-transparent" />
                </div>

                <div className="relative z-10 flex h-full items-center px-6 md:px-20 max-w-7xl mx-auto">
                    <div className="max-w-3xl">
                        <motion.span 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.4em] text-brand-gold"
                        >
                            <span className="h-1.5 w-1.5 bg-brand-gold rounded-full animate-ping"></span>
                            <span>Luxury Ladies' Couture</span>
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 font-serif text-5xl font-extrabold leading-tight text-white md:text-7xl lg:text-8xl"
                        >
                            Crafting Elegance <br /> 
                            <span className="italic text-brand-gold font-normal">For Royalty</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 text-base md:text-lg text-gray-200 max-w-xl leading-relaxed"
                        >
                            Discover the perfect fusion of contemporary African fabrics and modern luxury silhouettes. Tailored uniquely to your proportions.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-10 flex flex-wrap gap-4"
                        >
                            <Link 
                                href={route('book')}
                                className="group flex items-center space-x-3 bg-brand-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-brand-black transition-all hover:bg-white shadow-lg hover:shadow-brand-gold/20"
                            >
                                <span>Book Tailoring Session</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link 
                                href={route('collections')}
                                className="border border-white/30 backdrop-blur-xs px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-brand-black"
                            >
                                View Gallery
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works (Visual Timeline) */}
            <section className="py-24 bg-white dark:bg-[#121212] transition-colors border-b border-gray-50 dark:border-zinc-900">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold">The Process</span>
                        <h2 className="mt-4 font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Bespoke Design Roadmap</h2>
                        <p className="mt-4 text-sm text-gray-500">How we turn your premium materials into masterpiece couture.</p>
                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, index) => {
                            const IconComponent = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 }}
                                    className="group relative bg-[#fcfcfc] dark:bg-zinc-900/40 border border-gray-100 dark:border-zinc-800/80 p-8 rounded-2xl hover:shadow-lg transition-all"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-lg group-hover:bg-brand-gold group-hover:text-brand-black transition-colors">
                                            <IconComponent className="h-6 w-6" />
                                        </div>
                                        <span className="text-3xl font-bold font-serif text-gray-200 dark:text-zinc-850">{step.number}</span>
                                    </div>
                                    <h3 className="mt-6 font-serif text-lg font-bold text-brand-black dark:text-white group-hover:text-brand-gold transition-colors">{step.title}</h3>
                                    <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Showcase Category Lookbook */}
            <section className="py-24 bg-[#FAF9F6] dark:bg-zinc-950">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row mb-12">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">Featured Selections</span>
                            <h2 className="mt-4 font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Shop the Lookbook</h2>
                        </div>
                        <Link href={route('collections')} className="text-xs font-bold uppercase tracking-widest border-b-2 border-brand-gold pb-1 hover:text-brand-gold transition-colors">
                            View All Categories
                        </Link>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            { title: 'Bridal Couture', image: '/assets/images/bridal.png', category: 'Wedding', link: route('collections') },
                            { title: 'African Print Gala', image: '/assets/images/african.png', category: 'Modern African', link: route('collections') },
                            { title: 'Corporate Elegance', image: '/assets/images/hero.png', category: 'Formal', link: route('collections') },
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.15 }}
                                viewport={{ once: true }}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm border border-gray-150/10"
                            >
                                <div className="aspect-[3/4] overflow-hidden relative bg-gray-150">
                                    <img 
                                        src={asset(item.image)} 
                                        alt={item.title} 
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Overlay hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                                    
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
                                        <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold">{item.category}</span>
                                        <h3 className="mt-2 font-serif text-2xl font-bold">{item.title}</h3>
                                        <Link 
                                            href={item.link}
                                            className="mt-6 flex w-fit items-center space-x-2 bg-brand-gold py-2.5 px-5 text-[10px] font-bold uppercase tracking-widest text-brand-black hover:bg-white transition-all rounded"
                                        >
                                            <span>Explore category</span>
                                            <ArrowRight className="h-3 w-3" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About the Designer (Dynamic) */}
            <section className="py-24 bg-white dark:bg-[#121212] overflow-hidden border-t border-gray-150/10">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid items-center gap-16 md:grid-cols-2">
                        {/* Designer Portrait Carousel (High Graphics) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center space-y-6"
                        >
                            {/* Primary Portrait Card */}
                            <div className="relative w-full max-w-[360px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-900 group">
                                <div className="absolute inset-0 bg-radial-glow opacity-25 pointer-events-none" />
                                
                                <AnimatePresence mode="wait">
                                    <motion.img 
                                        key={activeDesignerPhoto}
                                        src={asset(designerPhotos[activeDesignerPhoto])} 
                                        alt={settings.designer_name || 'Christiana Naamenomah'} 
                                        initial={{ opacity: 0, scale: 1.02 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="h-full w-full object-cover object-[center_12%] transition-transform duration-700"
                                    />
                                </AnimatePresence>

                                {/* Gold Accent Line */}
                                <div className="absolute inset-x-0 bottom-0 h-1.5 bg-brand-gold" />
                            </div>

                            {/* Clickable Image Gallery Selectors */}
                            <div className="flex items-center space-x-4 pt-2">
                                {designerPhotos.map((photo, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveDesignerPhoto(index)}
                                        className={`relative h-20 w-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                            activeDesignerPhoto === index 
                                                ? 'border-brand-gold scale-110 shadow-lg' 
                                                : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                                        }`}
                                    >
                                        <img 
                                            src={asset(photo)} 
                                            alt={`Preview ${index + 1}`} 
                                            className="h-full w-full object-cover object-[center_15%]"
                                        />
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Designer Biography */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <span className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold">
                                <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full"></span>
                                <span>The Creator</span>
                            </span>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
                                Meet {settings.designer_name || 'Christiana Naamenomah'}
                            </h2>
                            <p className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/5 px-3 py-1.5 rounded w-fit border border-[#D4AF37]/10">
                                Specializing Exclusively in Luxury Ladies' Wear
                            </p>
                            <p className="text-base leading-relaxed text-gray-650 dark:text-gray-300 font-serif whitespace-pre-line">
                                {settings.designer_bio || 'Christiana Naamenomah is the founder and lead designer of Chrisnoman Fashion House.'}
                            </p>
                            <div className="pt-4 flex items-center space-x-6 border-t border-gray-100 dark:border-zinc-850">
                                <div className="flex -space-x-3">
                                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={asset('/assets/images/designer/designer_1.jpg')} alt="" />
                                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={asset('/assets/images/designer/designer_2.jpg')} alt="" />
                                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={asset('/assets/images/designer/designer_3.jpg')} alt="" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-brand-black dark:text-gray-400">
                                    Custom Sewing & Corsetry Specialty
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sizing & Measurement Helper CTA (Interactive Silhouette Split) */}
            <section className="bg-brand-black py-24 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-radial-glow opacity-10 pointer-events-none" />
                <div className="mx-auto max-w-7xl px-6 relative z-10">
                    <div className="grid items-center gap-16 lg:grid-cols-12">
                        {/* Mannequin Animation Frame */}
                        <div className="lg:col-span-5 flex justify-center">
                            <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="w-full max-w-[280px] p-8 bg-zinc-900/60 border border-zinc-800 rounded-3xl relative overflow-hidden"
                            >
                                <div className="absolute inset-x-0 top-4 text-center">
                                    <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">Interactive Silhouette</span>
                                </div>
                                <svg viewBox="0 0 100 200" className="w-full h-auto text-white/5" fill="none">
                                    <path 
                                        d="M50,15 C54,15 56,22 56,28 C56,36 53,40 57,44 C61,48 64,56 64,68 C64,74 59,85 57,98 C55,108 55,116 56,124 C57,132 59,142 60,152 C61,162 59,180 59,186 L41,186 C41,180 39,162 40,152 C41,142 43,132 44,124 C45,116 45,108 43,98 C41,85 36,74 36,68 C36,56 39,48 43,44 C47,40 44,36 44,28 C44,22 46,15 50,15 Z" 
                                        fill="currentColor" 
                                        stroke="currentColor" 
                                        strokeWidth="1.5"
                                    />
                                    <motion.line x1="34" y1="70" x2="66" y2="70" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3, 2" animate={{ strokeDashoffset: [0, -10] }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} />
                                    <motion.line x1="38" y1="102" x2="62" y2="102" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3, 2" animate={{ strokeDashoffset: [0, 10] }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} />
                                </svg>
                                <div className="absolute inset-x-0 bottom-4 text-center">
                                    <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">Perfect Sizing Analysis</span>
                                </div>
                            </motion.div>
                        </div>
                        {/* CTA Text Column */}
                        <div className="lg:col-span-7 space-y-6">
                            <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold">Tailoring Precision</span>
                            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                                Never Guess Your <br /> Size Again
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                Our bespoke custom sewing platform features a precision **Interactive Sizing & Measurement Guide**. Focus on your proportions, learn the exact tailoring standards, and pre-fill your specifications directly to our design workshop.
                            </p>
                            <div className="pt-4">
                                <Link 
                                    href={route('size-guide')}
                                    className="inline-flex items-center space-x-4 bg-white hover:bg-brand-gold text-brand-black hover:text-brand-black px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg border border-white/10"
                                >
                                    <span>Open Interactive Sizing Tool</span>
                                    <Ruler className="h-4 w-4 text-brand-black" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials (Framer Motion Luxury Fade Slider) */}
            <section className="py-24 bg-white dark:bg-[#121212]">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="text-center mb-12">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold">Client Reviews</span>
                        <h2 className="mt-4 font-serif text-3xl font-bold text-brand-black dark:text-white">Voices of Christiana Naamenoman</h2>
                    </div>

                    <div className="relative bg-brand-cream/15 dark:bg-zinc-900/40 border border-brand-gold/15 p-10 md:p-14 rounded-2xl shadow-sm overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTestimonial}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-center space-x-1">
                                    {[...Array(reviews[activeTestimonial].rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 text-brand-gold fill-brand-gold" />
                                    ))}
                                </div>
                                <blockquote className="text-lg md:text-xl font-serif text-center text-gray-800 dark:text-gray-100 leading-relaxed italic">
                                    "{reviews[activeTestimonial].text}"
                                </blockquote>
                                <div className="text-center">
                                    <cite className="not-italic font-bold text-sm text-brand-black dark:text-white uppercase tracking-widest">{reviews[activeTestimonial].name}</cite>
                                    <p className="text-[10px] text-brand-gold uppercase tracking-wider mt-1">{reviews[activeTestimonial].role}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Slider controls */}
                        <div className="flex justify-center space-x-4 mt-8">
                            <button onClick={handlePrevReview} className="p-2 border border-gray-200 dark:border-zinc-800 rounded-full hover:bg-brand-gold hover:text-brand-black transition-colors">
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button onClick={handleNextReview} className="p-2 border border-gray-200 dark:border-zinc-800 rounded-full hover:bg-brand-gold hover:text-brand-black transition-colors">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Atelier Diary & Client Showcase (Feature 5) */}
            <section className="py-24 bg-white dark:bg-[#121212] transition-colors border-t border-b border-gray-50 dark:border-zinc-900">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="max-w-xl mx-auto text-center mb-16">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold">Atelier Diary</span>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold mt-3 text-gray-900 dark:text-white">Real Gowns, Real Stories</h2>
                        <p className="text-xs text-gray-400 mt-2">A visual celebration of brides and clients wearing custom Chrisnoman couture.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Showcase Item 1 */}
                        <div className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-150/40 dark:border-zinc-800 p-4 transition-all hover:shadow-md">
                            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-200">
                                <img 
                                    src={asset("/assets/images/african.png")} 
                                    alt="Client wedding custom gown" 
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                            </div>
                            <div className="mt-4 space-y-2">
                                <span className="inline-block text-[8px] font-extrabold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">
                                    Duchess Satin & Gold Kente
                                </span>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Aba's Wedding Gown</h4>
                                <blockquote className="text-xs text-gray-500 dark:text-gray-400 italic">
                                    "Christiana crafted my wedding wrapper gown exactly to my sizing blueprint. The sweetheart corset was perfect!"
                                </blockquote>
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest">&mdash; Accra Traditional Vows</p>
                            </div>
                        </div>

                        {/* Showcase Item 2 */}
                        <div className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-150/40 dark:border-zinc-800 p-4 transition-all hover:shadow-md">
                            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-200">
                                <img 
                                    src={asset("/assets/images/hero.png")} 
                                    alt="Client pageant gown" 
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                            </div>
                            <div className="mt-4 space-y-2">
                                <span className="inline-block text-[8px] font-extrabold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">
                                    Metallic Brocade & Lace
                                </span>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Selorm's Pageant Dress</h4>
                                <blockquote className="text-xs text-gray-500 dark:text-gray-400 italic">
                                    "The bicep and sleeve fittings were absolute perfection. I felt so regal on stage!"
                                </blockquote>
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest">&mdash; Ghana Beauty Pageant</p>
                            </div>
                        </div>

                        {/* Showcase Item 3 */}
                        <div className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-150/40 dark:border-zinc-800 p-4 transition-all hover:shadow-md">
                            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-200">
                                <img 
                                    src={asset("/assets/images/bridal.png")} 
                                    alt="Client gala gown" 
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                            </div>
                            <div className="mt-4 space-y-2">
                                <span className="inline-block text-[8px] font-extrabold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">
                                    Sapphire Liquid Silk
                                </span>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Elise's Graduation Wrapper</h4>
                                <blockquote className="text-xs text-gray-500 dark:text-gray-400 italic">
                                    "Using the Gown Builder online helped me co-design this plunging V-neck. It fit like a glove."
                                </blockquote>
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest">&mdash; Graduation Gala Dinner</p>
                            </div>
                        </div>

                        {/* Showcase Item 4 */}
                        <div className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-150/40 dark:border-zinc-800 p-4 transition-all hover:shadow-md">
                            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-200">
                                <img 
                                    src={asset("/assets/images/african.png")} 
                                    alt="Bridesmaids fitting gala" 
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                            </div>
                            <div className="mt-4 space-y-2">
                                <span className="inline-block text-[8px] font-extrabold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">
                                    Beaded French Lace
                                </span>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Sandra's Bridal Reception</h4>
                                <blockquote className="text-xs text-gray-500 dark:text-gray-400 italic">
                                    "My bridesmaids and I all booked sizing sessions together. The timeline updates kept us completely stress-free!"
                                </blockquote>
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest">&mdash; Vow Renewal Vibe</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-32 overflow-hidden bg-brand-cream/10 border-t border-gray-50 dark:border-zinc-900">
                <div className="absolute inset-0 z-0">
                    <img src={asset("/assets/images/bridal.png")} alt="CTA" className="h-full w-full object-cover opacity-10" />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Calendar className="mx-auto h-12 w-12 text-brand-gold" />
                        <h2 className="mt-8 font-serif text-4xl font-bold md:text-6xl text-brand-black dark:text-white leading-tight">Ready for Your Next <br /> Custom Masterpiece?</h2>
                        <p className="mt-6 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
                            Book your customized tailoring appointment today. Bring in your materials and co-design a unique fashion silhouette with our expert design team.
                        </p>
                        <div className="mt-10 flex justify-center">
                            <Link 
                                href={route('book')}
                                className="bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black px-12 py-5 text-xs font-bold uppercase tracking-widest transition-all rounded-full shadow-lg hover:shadow-brand-gold/15"
                            >
                                Schedule Studio Appointment
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Instagram Grid (Mockup) */}
            <section className="py-20 border-t border-gray-50 dark:border-zinc-900 overflow-hidden">
                <div className="mx-auto max-w-7xl px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center space-x-4 mb-10"
                    >
                        <Instagram className="h-6 w-6 text-brand-gold" />
                        <span className="text-xs font-bold uppercase tracking-widest dark:text-gray-200">@chrisnoman_fashion</span>
                    </motion.div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
                        {[1, 2, 3, 4, 5, 6].map((i, index) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer rounded-lg border border-gray-150/10"
                            >
                                <img src={asset(`/assets/images/${i % 2 === 0 ? 'bridal' : 'african'}.png`)} alt="Insta" className="h-full w-full object-cover" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
