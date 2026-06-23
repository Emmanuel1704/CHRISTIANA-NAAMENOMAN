import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle, Camera as Instagram } from 'lucide-react';
import { asset } from '@/lib/utils';

interface Props {
    featuredCollections: any[];
    testimonials: any[];
}

export default function Welcome({ featuredCollections, testimonials }: Props) {
    return (
        <PublicLayout>
            <Head title="Elegance Redefined" />

            {/* Hero Section */}
            <section className="relative h-[90vh] overflow-hidden bg-brand-cream">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={asset("/assets/images/hero.png")} 
                        alt="Chrisnoman Fashion" 
                        className="h-full w-full object-cover opacity-90 transition-transform duration-10000 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 to-transparent" />
                </div>

                <div className="relative z-10 flex h-full items-center px-6 md:px-20">
                    <div className="max-w-2xl">
                        <motion.span 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-gold"
                        >
                            Handcrafted with Love
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 font-serif text-5xl font-bold leading-tight text-white md:text-7xl"
                        >
                            Elegance is the Only <br /> 
                            <span className="italic text-brand-gold">Beauty</span> That Never Fades
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 text-lg text-gray-200"
                        >
                            Discover the perfect blend of contemporary African culture and 
                            modern luxury. Tailored exclusively for you.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-10 flex flex-wrap gap-4"
                        >
                            <Link 
                                href={route('book')}
                                className="group flex items-center space-x-2 bg-brand-gold px-8 py-4 text-xs font-bold uppercase tracking-widest text-brand-black transition-all hover:bg-white"
                            >
                                <span>Book Appointment</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link 
                                href={route('collections')}
                                className="border border-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-brand-black"
                            >
                                View Collections
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Collections */}
            <section className="py-32">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold">Our Gallery</span>
                            <h2 className="mt-4 font-serif text-4xl font-bold">Latest Collections</h2>
                        </div>
                        <Link href={route('collections')} className="text-xs font-bold uppercase tracking-widest border-b border-brand-gold pb-1 hover:text-brand-gold transition-colors">
                            Explore All
                        </Link>
                    </div>

                    <div className="mt-16 grid gap-10 md:grid-cols-3">
                        {[
                            { title: 'Bridal Couture', image: '/assets/images/bridal.png', category: 'Wedding' },
                            { title: 'African Print Gala', image: '/assets/images/african.png', category: 'Modern African' },
                            { title: 'Corporate Elegance', image: '/assets/images/hero.png', category: 'Formal' },
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="group relative cursor-pointer overflow-hidden"
                            >
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img 
                                        src={asset(item.image)} 
                                        alt={item.title} 
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400">{item.category}</p>
                                        <h3 className="mt-1 font-serif text-xl font-bold group-hover:text-brand-gold transition-colors">{item.title}</h3>
                                    </div>
                                    <div className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-100 group-hover:bg-brand-gold group-hover:border-brand-gold transition-all">
                                        <ArrowRight className="h-4 w-4 group-hover:text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-brand-black py-32 text-white">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid items-center gap-20 md:grid-cols-2">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-square overflow-hidden rounded-sm">
                                <img 
                                    src={asset("/assets/images/hero.png")} 
                                    alt="Designer" 
                                    className="h-full w-full object-cover opacity-80"
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 hidden h-64 w-64 bg-brand-gold/10 p-10 md:block">
                                <div className="flex h-full flex-col justify-center border border-brand-gold/20 p-6">
                                    <span className="text-4xl font-serif font-bold text-brand-gold">10+</span>
                                    <span className="mt-2 text-[10px] uppercase tracking-widest">Years of Craftsmanship</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold">The Designer</span>
                            <h2 className="mt-6 font-serif text-4xl font-bold leading-tight md:text-5xl">
                                We Believe Fashion is <br /> an Extension of Your <span className="italic text-brand-gold">Soul</span>
                            </h2>
                            <p className="mt-8 text-lg leading-relaxed text-gray-400">
                                Chrisnoman Fashion was founded on the principle that every woman deserves 
                                to feel like royalty. Our designs merge the rich heritage of African prints 
                                with contemporary global fashion trends.
                            </p>
                            <div className="mt-12 grid gap-6 md:grid-cols-2">
                                <div className="flex items-start space-x-4">
                                    <CheckCircle className="mt-1 h-5 w-5 text-brand-gold" />
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-widest">Custom Tailoring</h4>
                                        <p className="mt-2 text-xs text-gray-500">Perfectly fitted to your measurements.</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <CheckCircle className="mt-1 h-5 w-5 text-brand-gold" />
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-widest">Premium Fabrics</h4>
                                        <p className="mt-2 text-xs text-gray-500">Only the finest silk and lace.</p>
                                    </div>
                                </div>
                            </div>
                            <Link 
                                href={route('book')}
                                className="mt-12 inline-block border-b-2 border-brand-gold pb-2 text-xs font-bold uppercase tracking-widest hover:text-brand-gold transition-colors"
                            >
                                Book a Consultation
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-40 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={asset("/assets/images/bridal.png")} alt="CTA" className="h-full w-full object-cover opacity-15" />
                </div>
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Calendar className="mx-auto h-12 w-12 text-brand-gold" />
                        <h2 className="mt-8 font-serif text-4xl font-bold md:text-6xl">Ready for Your Next <br /> Masterpiece?</h2>
                        <p className="mt-8 text-lg text-gray-500">
                            Book your appointment today for measurement and style consultation.
                        </p>
                        <div className="mt-12 flex justify-center">
                            <Link 
                                href={route('book')}
                                className="bg-brand-black px-12 py-5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-brand-gold hover:text-brand-black"
                            >
                                Schedule Now
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Instagram Grid (Mockup) */}
            <section className="py-20 border-t border-gray-100 overflow-hidden">
                <div className="mx-auto max-w-7xl px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center space-x-4 mb-10"
                    >
                        <Instagram className="h-6 w-6 text-brand-gold" />
                        <span className="text-xs font-bold uppercase tracking-widest">@chrisnoman_fashion</span>
                    </motion.div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
                        {[1, 2, 3, 4, 5, 6].map((i, index) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer"
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
