import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Booking() {
    const [status, setStatus] = useState<'idle' | 'success'>('idle');
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        email: '',
        service: 'Custom Sewing',
        date: '',
        notes: '',
    });

    const services = [
        'Custom Sewing',
        'Bridal Collection',
        'African Prints',
        'Corporate Wear',
        'Occasion Dress',
        'Measurement Consultation',
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post(route('book.store'), {
            onSuccess: () => {
                setStatus('success');
                
                // Prepare WhatsApp Message
                const message = `Hello Chrisnoman Fashion!\n\nI would like to book an appointment:\n- Name: ${data.name}\n- Service: ${data.service}\n- Preferred Date: ${data.date}\n- Notes: ${data.notes}\n\nPhone: ${data.phone}`;
                const whatsappUrl = `https://wa.me/2348000000000?text=${encodeURIComponent(message)}`;
                
                window.open(whatsappUrl, '_blank');
            }
        });
    };

    return (
        <PublicLayout>
            <Head title="Book Appointment" />

            <section className="bg-brand-cream/30 py-20 min-h-[70vh]">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-20 lg:grid-cols-2">
                        {/* Info Column */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold">Appointments</span>
                            <h1 className="mt-6 font-serif text-5xl font-bold">Schedule Your <br /> Consultation</h1>
                            <p className="mt-8 text-lg text-gray-500 leading-relaxed">
                                We offer personalized consultations to ensure your vision comes to life. 
                                Whether it's for a bridal gown or a custom corporate outfit, 
                                we take the time to understand your style and measurements.
                            </p>

                            <div className="mt-12 space-y-8">
                                <div className="flex items-center space-x-6">
                                    <div className="flex h-12 w-12 items-center justify-center bg-brand-gold/10 rounded-full">
                                        <Send className="h-5 w-5 text-brand-gold" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-widest">Fast Response</h4>
                                        <p className="text-xs text-gray-400">We usually respond to booking requests within 2 hours.</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <div className="flex h-12 w-12 items-center justify-center bg-brand-gold/10 rounded-full">
                                        <Check className="h-5 w-5 text-brand-gold" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-widest">Perfect Fit</h4>
                                        <p className="text-xs text-gray-400">Guaranteed satisfaction with our measurement process.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form Column */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white p-10 shadow-2xl rounded-sm border border-brand-gold/10"
                        >
                            {status === 'success' ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="flex h-20 w-20 items-center justify-center bg-green-50 rounded-full mb-6">
                                        <Check className="h-10 w-10 text-green-500" />
                                    </div>
                                    <h2 className="font-serif text-3xl font-bold">Booking Sent!</h2>
                                    <p className="mt-4 text-gray-500">Redirecting you to WhatsApp to finalize details...</p>
                                    <button 
                                        onClick={() => setStatus('idle')}
                                        className="mt-10 text-xs font-bold uppercase tracking-widest border-b border-brand-gold pb-1"
                                    >
                                        Book Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                                            <input 
                                                required
                                                type="text" 
                                                placeholder="e.g. Sarah Jones"
                                                className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                            />
                                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</label>
                                            <input 
                                                required
                                                type="tel" 
                                                placeholder="+234..."
                                                className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                            />
                                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Service Type</label>
                                        <select 
                                            className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors bg-transparent"
                                            value={data.service}
                                            onChange={(e) => setData('service', e.target.value)}
                                        >
                                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Preferred Date</label>
                                        <input 
                                            required
                                            type="date" 
                                            className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                        />
                                        {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Additional Notes</label>
                                        <textarea 
                                            rows={4}
                                            placeholder="Tell us about your style or specific requirements..."
                                            className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors resize-none"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                        />
                                        {errors.notes && <p className="text-xs text-red-500 mt-1">{errors.notes}</p>}
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className={cn(
                                            "w-full bg-brand-black py-5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-brand-gold hover:text-brand-black",
                                            processing && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        {processing ? 'Processing...' : 'Confirm Appointment'}
                                    </button>

                                    <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                                        You will be redirected to WhatsApp for final confirmation.
                                    </p>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
