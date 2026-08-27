import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, CheckCircle2, X } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import { asset } from '@/lib/utils';

export default function Contact() {
    const { flash } = usePage<any>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setShowModal(true);
        }
    }, [flash]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <PublicLayout>
            <Head title="Contact Us" />

            <section className="bg-brand-cream/20 py-20">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold">Get in Touch</span>
                    <h1 className="mt-6 font-serif text-5xl font-bold">Contact Designer</h1>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-20 lg:grid-cols-2">
                        {/* Contact Details */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="font-serif text-3xl font-bold">We'd love to hear <br /> from you</h2>
                                <p className="mt-6 text-gray-500 leading-relaxed">
                                    Whether you have a question about our collections, 
                                    pricing, or want to discuss a custom design, 
                                    our team is here to help.
                                </p>
                            </div>

                            <div className="grid gap-8 sm:grid-cols-2">
                                <div className="space-y-4">
                                    <div className="flex h-12 w-12 items-center justify-center bg-brand-gold/10 rounded-full">
                                        <Phone className="h-5 w-5 text-brand-gold" />
                                    </div>
                                    <h4 className="font-bold text-xs uppercase tracking-widest">Call Us</h4>
                                    <p className="text-sm text-gray-400">0557 485 934<br/>0200 427 876</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex h-12 w-12 items-center justify-center bg-brand-gold/10 rounded-full">
                                        <Mail className="h-5 w-5 text-brand-gold" />
                                    </div>
                                    <h4 className="font-bold text-xs uppercase tracking-widest">Email</h4>
                                    <p className="text-sm text-gray-400">
                                        <a href="mailto:Christiananaamenoman@gmail.com" className="hover:text-brand-gold transition-colors">
                                            Christiananaamenoman@gmail.com
                                        </a>
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex h-12 w-12 items-center justify-center bg-brand-gold/10 rounded-full">
                                        <MapPin className="h-5 w-5 text-brand-gold" />
                                    </div>
                                    <h4 className="font-bold text-xs uppercase tracking-widest">Studio</h4>
                                    <p className="text-sm text-gray-400">Korle Nkwanta</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex h-12 w-12 items-center justify-center bg-brand-gold/10 rounded-full text-green-500">
                                        <MessageCircle className="h-5 w-5" />
                                    </div>
                                    <h4 className="font-bold text-xs uppercase tracking-widest">WhatsApp</h4>
                                    <p className="text-sm text-gray-400">0557 485 934</p>
                                </div>
                            </div>

                            {/* Map Mockup */}
                            <div className="aspect-video w-full overflow-hidden bg-gray-100 rounded-sm grayscale hover:grayscale-0 transition-all duration-700">
                                <img src={asset("/assets/images/hero.png")} alt="Map Location" className="h-full w-full object-cover opacity-50" />
                            </div>
                        </div>

                        {/* Contact Form */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-10 shadow-2xl rounded-sm border border-brand-gold/10"
                        >

                            <form onSubmit={submit} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Your Name</label>
                                    <input 
                                        type="text" 
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors"
                                    />
                                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors"
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Subject</label>
                                    <input 
                                        type="text" 
                                        value={data.subject}
                                        onChange={e => setData('subject', e.target.value)}
                                        className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors"
                                    />
                                    {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Message</label>
                                    <textarea 
                                        rows={6}
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none transition-colors resize-none"
                                    />
                                    {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
                                </div>

                                <button 
                                    disabled={processing}
                                    className="w-full bg-brand-black py-5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-brand-gold hover:text-brand-black disabled:opacity-50"
                                >
                                    {processing ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="sm">
                <div className="p-8 text-center bg-white">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 mb-6">
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-sm text-gray-500 mb-8">{flash?.success}</p>
                    <button 
                        onClick={() => setShowModal(false)}
                        className="w-full rounded-md bg-brand-gold px-4 py-3 text-sm font-bold text-white transition-all hover:bg-brand-black"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </PublicLayout>
    );
}
