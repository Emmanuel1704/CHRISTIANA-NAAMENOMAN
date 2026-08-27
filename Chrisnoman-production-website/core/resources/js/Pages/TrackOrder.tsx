import PublicLayout from '@/Layouts/PublicLayout';
import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Clock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Booking {
    id: number;
    customer_name: string;
    phone: string;
    email: string;
    service_type: string;
    fabric_option: string;
    appointment_date: string;
    status: string;
    production_stage: string;
    notes: string;
}

interface TrackOrderProps {
    booking: Booking | null;
    error: string | null;
    searched: boolean;
}

export default function TrackOrder({ booking, error, searched }: TrackOrderProps) {
    const [bookingId, setBookingId] = useState('');
    const [contact, setContact] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!bookingId || !contact) return;
        
        router.get(route('track-order'), {
            booking_id: bookingId,
            contact: contact
        }, {
            preserveState: true
        });
    };

    // Helper to get active step index from production stage
    const getActiveStep = (stage: string) => {
        switch (stage) {
            case 'pending': return 0;
            case 'confirmed':
            case 'pattern_drafting': return 1;
            case 'fitting_scheduled': return 2;
            case 'embellishing': return 3;
            case 'ready_for_pickup': return 4;
            case 'completed': return 5;
            default: return 0;
        }
    };

    const steps = [
        { title: 'Booking Confirmed', desc: 'Christiana Naamenoman has approved your custom sewing request.' },
        { title: 'Pattern Drafting & Sourcing', desc: 'Atelier is drafting your unique pattern and preparing fabric cuts.' },
        { title: 'First Toile Fitting', desc: 'A mock-up garment is prepared in plain muslin to drape and secure fitting lines.' },
        { title: 'Luxury Embellishment', desc: 'Tailors are applying hand-beading, corsetry bones, or gala accents.' },
        { title: 'Garment Ready', desc: 'Your finished gown is steam-pressed and ready for pickup / delivery.' }
    ];

    const activeIndex = booking ? getActiveStep(booking.production_stage) : 0;

    return (
        <PublicLayout>
            <Head title="Couture Fitting & Order Tracker" />

            {/* Hero Section */}
            <section className="bg-brand-black py-16 text-white dark:bg-black relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
                </div>
                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold">Client Order Portal</span>
                    <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold">Atelier Production Tracker</h1>
                    <p className="mt-4 mx-auto max-w-xl text-gray-400 text-xs md:text-sm leading-relaxed">
                        Enter your Booking Reference ID and phone/email to check the live tailoring progress of your custom gown.
                    </p>
                </div>
            </section>

            {/* Search and Tracker Section */}
            <section className="py-20 bg-[#fcfcfc] dark:bg-[#121212] transition-colors duration-500">
                <div className="mx-auto max-w-3xl px-6">
                    
                    {/* Search Form Card */}
                    <div className="bg-white dark:bg-zinc-900/40 p-8 rounded-3xl border border-gray-150/40 dark:border-zinc-800 shadow-xs">
                        <form onSubmit={handleSearch} className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-wider text-gray-450 font-bold">Booking ID (Reference #)</label>
                                    <input 
                                        type="number"
                                        placeholder="e.g. 12"
                                        className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-brand-gold outline-none"
                                        value={bookingId}
                                        onChange={e => setBookingId(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] uppercase tracking-wider text-gray-450 font-bold">Phone Number or Email</label>
                                    <input 
                                        type="text"
                                        placeholder="e.g. 0244123456"
                                        className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-brand-gold outline-none"
                                        value={contact}
                                        onChange={e => setContact(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            
                            <button
                                type="submit"
                                className="w-full bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-md"
                            >
                                <Search className="h-4 w-4" />
                                <span>Look Up Custom Order</span>
                            </button>
                        </form>

                        {error && (
                            <div className="mt-6 flex items-start space-x-3 bg-red-500/5 border border-red-500/20 p-4 rounded-xl text-red-500 text-xs">
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                <p className="leading-relaxed mt-0.5">{error}</p>
                            </div>
                        )}
                    </div>

                    {/* Tracker Results display */}
                    {searched && booking && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 space-y-8"
                        >
                            {/* Header Info */}
                            <div className="bg-white dark:bg-zinc-900/40 p-6 rounded-2xl border border-gray-150/40 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">Active Atelier Order:</span>
                                    <h3 className="font-serif text-lg font-bold text-gray-900 dark:text-white">
                                        For {booking.customer_name}
                                    </h3>
                                    <p className="text-xs text-gray-400">
                                        {booking.service_type} Gown ({booking.fabric_option} Fabric)
                                    </p>
                                </div>

                                <div className="flex flex-col items-start sm:items-end text-xs text-gray-500">
                                    <div className="flex items-center space-x-1.5">
                                        <Calendar className="h-4 w-4 text-brand-gold" />
                                        <span>Appt: {new Date(booking.appointment_date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5 mt-1">
                                        <Clock className="h-4 w-4 text-brand-gold" />
                                        <span>Status: <strong className="uppercase text-[10px] tracking-wider text-brand-gold">{booking.status}</strong></span>
                                    </div>
                                </div>
                            </div>

                            {/* Production Progress Timeline */}
                            <div className="bg-white dark:bg-zinc-900/40 p-8 rounded-3xl border border-gray-150/40 dark:border-zinc-800 space-y-8 relative">
                                <div className="flex items-center space-x-2 border-b border-gray-100 dark:border-zinc-850 pb-4">
                                    <Sparkles className="h-4 w-4 text-brand-gold animate-pulse" />
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-black dark:text-white">Couture Progress Timeline</h4>
                                </div>

                                <div className="relative border-l-2 border-gray-100 dark:border-zinc-800 ml-3 pl-8 space-y-8">
                                    {steps.map((step, idx) => {
                                        const isDone = idx < activeIndex;
                                        const isCurrent = idx === activeIndex;
                                        const isUpcoming = idx > activeIndex;

                                        return (
                                            <div key={idx} className="relative group">
                                                {/* Bullet Point Indicator */}
                                                <div className={`absolute -left-[41px] top-0.5 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                                    isDone 
                                                        ? 'bg-brand-gold border-brand-gold text-brand-black'
                                                        : isCurrent
                                                        ? 'bg-brand-black border-brand-gold text-brand-gold dark:bg-black'
                                                        : 'bg-white border-gray-250 text-gray-300 dark:bg-zinc-900 dark:border-zinc-800'
                                                }`}>
                                                    {isDone ? (
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                    ) : (
                                                        <span className="text-[10px] font-bold">{idx + 1}</span>
                                                    )}
                                                </div>

                                                {/* Text Info */}
                                                <div className="space-y-1">
                                                    <h5 className={`text-xs font-bold uppercase tracking-wider ${
                                                        isCurrent ? 'text-[#D4AF37]' : isUpcoming ? 'text-gray-400 dark:text-zinc-600' : 'text-gray-800 dark:text-gray-200'
                                                    }`}>
                                                        {step.title}
                                                    </h5>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
                                                        {step.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
