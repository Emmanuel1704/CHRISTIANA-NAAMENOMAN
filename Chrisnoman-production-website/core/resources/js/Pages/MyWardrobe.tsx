import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Sparkles, Scissors, Info, Trash2, Calendar, Clipboard, CheckCircle2, ChevronRight, User } from 'lucide-react';
import { useState } from 'react';

interface UserData {
    name: string;
    email: string;
    bust: number | null;
    waist: number | null;
    hips: number | null;
    underbust: number | null;
    shoulder: number | null;
    sleeve: number | null;
    length: number | null;
}

interface SavedDesign {
    id: string;
    neckline: string;
    silhouette: string;
    sleeves: string;
    fabric: string;
    created_at: string;
}

interface Booking {
    id: number;
    customer_name: string;
    service_type: string;
    fabric_option: string;
    appointment_date: string;
    status: string;
    production_stage: string;
}

interface Props {
    user: UserData;
    bookings: Booking[];
    savedDesigns: SavedDesign[];
}

export default function MyWardrobe({ user, bookings, savedDesigns }: Props) {
    const [activeTab, setActiveTab] = useState<'designs' | 'measurements' | 'bookings'>('designs');

    // Sizing Blueprint Form using Inertia useForm
    const { data, setData, patch, processing, errors } = useForm({
        bust: user.bust || 36,
        waist: user.waist || 28,
        hips: user.hips || 40,
        underbust: user.underbust || 32,
        shoulder: user.shoulder || 15,
        sleeve: user.sleeve || 22,
        length: user.length || 60,
    });

    const submitMeasurements = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('my-wardrobe.measurements'), {
            preserveScroll: true
        });
    };

    const deleteDesign = (id: string) => {
        if (confirm('Are you sure you want to remove this design from your wardrobe?')) {
            router.delete(route('my-wardrobe.designs.delete', id), {
                preserveScroll: true
            });
        }
    };

    const getBookingUrl = (design: SavedDesign) => {
        const text = `Custom Gown Draft: Neckline: ${design.neckline}, Silhouette: ${design.silhouette}, Sleeves: ${design.sleeves}, Fabric: ${design.fabric}. Saved in Client Wardrobe.`;
        return route('book') + `?notes=${encodeURIComponent(text)}&fabric_option=custom`;
    };

    const getStageLabel = (stage: string) => {
        switch (stage) {
            case 'pending': return 'Awaiting Atelier Confirmation';
            case 'confirmed': return 'Queue / Pattern Drafting';
            case 'pattern_drafting': return 'Pattern Drafting & Sourcing';
            case 'fitting_scheduled': return ' Muslin Toile Fitting';
            case 'embellishing': return ' Hand-Beading & Embellishing';
            case 'ready_for_pickup': return '📦 Garment Finished (Ready)';
            case 'completed': return '✨ Delivered';
            default: return 'Pending';
        }
    };

    return (
        <PublicLayout>
            <Head title="My Private Wardrobe Portal" />

            {/* Profile Greeting Section */}
            <section className="bg-brand-black py-16 text-white dark:bg-black relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
                </div>
                <div className="relative z-10 mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 rounded-full bg-brand-gold/10 border border-brand-gold flex items-center justify-center text-brand-gold">
                            <User className="h-8 w-8" />
                        </div>
                        <div>
                            <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">Atelier Member</span>
                            <h1 className="font-serif text-3xl font-bold">{user.name}</h1>
                            <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tab navigation */}
            <section className="border-b border-gray-100 dark:border-zinc-850 bg-white dark:bg-zinc-950 transition-colors">
                <div className="mx-auto max-w-7xl px-6 flex space-x-8">
                    {(['designs', 'measurements', 'bookings'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-5 text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 transition-all ${
                                activeTab === tab
                                    ? 'border-brand-gold text-brand-black dark:text-white'
                                    : 'border-transparent text-gray-400 hover:text-brand-black'
                            }`}
                        >
                            {tab === 'designs' ? 'Saved Designs' : tab === 'measurements' ? 'Sizing Blueprint' : 'My Fittings & Orders'}
                        </button>
                    ))}
                </div>
            </section>

            {/* Main Tabs Content */}
            <section className="py-16 bg-[#fcfcfc] dark:bg-[#121212] transition-colors min-h-[500px]">
                <div className="mx-auto max-w-7xl px-6">
                    
                    {/* TAB 1: SAVED DRAFTS */}
                    {activeTab === 'designs' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b border-gray-100 dark:border-zinc-800 pb-4">
                                <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">Your Saved Gowns</h3>
                                <a 
                                    href={route('gown-builder')}
                                    className="text-xs font-semibold text-brand-gold hover:underline flex items-center space-x-1"
                                >
                                    <span>Open Gown Builder</span>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </a>
                            </div>

                            {savedDesigns.length === 0 ? (
                                <div className="text-center py-20 bg-white dark:bg-zinc-900/40 rounded-3xl border border-gray-150/40 dark:border-zinc-800 text-gray-400">
                                    <Scissors className="h-10 w-10 mx-auto text-gray-300 mb-4" />
                                    <p className="text-xs">No saved designs found. Use the Gown Builder to design and save custom configurations!</p>
                                </div>
                            ) : (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {savedDesigns.map((design) => (
                                        <div 
                                            key={design.id}
                                            className="bg-white dark:bg-zinc-900/40 p-6 rounded-2xl border border-gray-150/40 dark:border-zinc-800 space-y-4 flex flex-col justify-between"
                                        >
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-[8px] font-extrabold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">
                                                        {design.fabric} Premium
                                                    </span>
                                                    <button 
                                                        onClick={() => deleteDesign(design.id)}
                                                        className="text-gray-300 hover:text-red-500 transition-colors"
                                                        title="Delete Design"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <h4 className="font-serif text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                                    {design.silhouette}
                                                </h4>
                                                <ul className="text-xs text-gray-500 space-y-1">
                                                    <li>• Neckline: <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{design.neckline}</span></li>
                                                    <li>• Sleeves: <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{design.sleeves}</span></li>
                                                    <li>• Fabric: <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">{design.fabric}</span></li>
                                                </ul>
                                            </div>

                                            <div className="pt-4 border-t border-gray-50 dark:border-zinc-850">
                                                <a 
                                                    href={getBookingUrl(design)}
                                                    className="w-full text-center block bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all"
                                                >
                                                    Book Fitting session
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB 2: MEASUREMENTS */}
                    {activeTab === 'measurements' && (
                        <div className="bg-white dark:bg-zinc-900/40 p-8 rounded-3xl border border-gray-150/40 dark:border-zinc-800 max-w-2xl mx-auto">
                            <div className="flex items-center space-x-3 border-b border-gray-100 dark:border-zinc-850 pb-4 mb-8">
                                <Clipboard className="h-5 w-5 text-brand-gold" />
                                <div>
                                    <h3 className="text-base font-bold text-brand-black dark:text-white uppercase tracking-wider">Your Silhouette Blueprint</h3>
                                    <p className="text-[10px] text-gray-400 mt-0.5">Keep your bodice, arm, and waist measurements up-to-date.</p>
                                </div>
                            </div>

                            <form onSubmit={submitMeasurements} className="space-y-6">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {/* BUST */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-450 flex justify-between">
                                            <span>1. Bust Circumference</span>
                                            <span className="text-brand-gold font-bold">{data.bust} in</span>
                                        </label>
                                        <input 
                                            type="range" min="30" max="60"
                                            className="w-full accent-brand-gold"
                                            value={data.bust}
                                            onChange={e => setData('bust', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    {/* WAIST */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-450 flex justify-between">
                                            <span>2. Waist Circumference</span>
                                            <span className="text-brand-gold font-bold">{data.waist} in</span>
                                        </label>
                                        <input 
                                            type="range" min="20" max="50"
                                            className="w-full accent-brand-gold"
                                            value={data.waist}
                                            onChange={e => setData('waist', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    {/* HIPS */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-450 flex justify-between">
                                            <span>3. Hip Circumference</span>
                                            <span className="text-brand-gold font-bold">{data.hips} in</span>
                                        </label>
                                        <input 
                                            type="range" min="30" max="70"
                                            className="w-full accent-brand-gold"
                                            value={data.hips}
                                            onChange={e => setData('hips', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    {/* UNDERBUST */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-450 flex justify-between">
                                            <span>4. Underbust</span>
                                            <span className="text-brand-gold font-bold">{data.underbust} in</span>
                                        </label>
                                        <input 
                                            type="range" min="26" max="55"
                                            className="w-full accent-brand-gold"
                                            value={data.underbust}
                                            onChange={e => setData('underbust', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    {/* SHOULDER */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-450 flex justify-between">
                                            <span>5. Shoulder-to-Shoulder</span>
                                            <span className="text-brand-gold font-bold">{data.shoulder} in</span>
                                        </label>
                                        <input 
                                            type="range" min="12" max="25"
                                            className="w-full accent-brand-gold"
                                            value={data.shoulder}
                                            onChange={e => setData('shoulder', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    {/* SLEEVE */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-450 flex justify-between">
                                            <span>6. Sleeve Length</span>
                                            <span className="text-brand-gold font-bold">{data.sleeve} in</span>
                                        </label>
                                        <input 
                                            type="range" min="15" max="32"
                                            className="w-full accent-brand-gold"
                                            value={data.sleeve}
                                            onChange={e => setData('sleeve', parseFloat(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md mt-6"
                                >
                                    {processing ? 'Saving Blueprint...' : 'Save Measurement Blueprint'}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* TAB 3: BOOKINGS */}
                    {activeTab === 'bookings' && (
                        <div className="space-y-6">
                            <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-4">My Fitting Appointments</h3>
                            
                            {bookings.length === 0 ? (
                                <div className="text-center py-20 bg-white dark:bg-zinc-900/40 rounded-3xl border border-gray-150/40 dark:border-zinc-800 text-gray-400">
                                    <Calendar className="h-10 w-10 mx-auto text-gray-300 mb-4" />
                                    <p className="text-xs">No active orders or fitting appointments matching your account email.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {bookings.map((booking) => (
                                        <div 
                                            key={booking.id}
                                            className="bg-white dark:bg-zinc-900/40 p-6 rounded-2xl border border-gray-150/40 dark:border-zinc-800 flex flex-col md:flex-row justify-between gap-6"
                                        >
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37]">Reference: CN-BOOK-{booking.id}</span>
                                                    <span className={`text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                                                        booking.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                                                    }`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                                <h4 className="font-serif text-lg font-bold text-gray-900 dark:text-white">
                                                    {booking.service_type} Gown Fitting
                                                </h4>
                                                <p className="text-xs text-gray-400">
                                                    Scheduled: **{new Date(booking.appointment_date).toLocaleDateString()}**
                                                </p>
                                            </div>

                                            {/* Dynamic production progress */}
                                            <div className="flex flex-col justify-center space-y-1">
                                                <span className="text-[9px] uppercase tracking-widest text-gray-450 font-bold">Tailoring Stage:</span>
                                                <div className="flex items-center space-x-2">
                                                    <CheckCircle2 className="h-4.5 w-4.5 text-brand-gold" />
                                                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                                                        {getStageLabel(booking.production_stage)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </section>
        </PublicLayout>
    );
}
