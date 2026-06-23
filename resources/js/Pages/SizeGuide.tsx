import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Scissors, Ruler, CheckCircle } from 'lucide-react';

export default function SizeGuide() {
    const sections = [
        {
            title: 'How to Measure',
            icon: Ruler,
            steps: [
                { name: 'Bust', desc: 'Measure around the fullest part of your chest, keeping the tape level.' },
                { name: 'Waist', desc: 'Measure around your natural waistline (the narrowest part of your torso).' },
                { name: 'Hips', desc: 'Measure around the fullest part of your hips, usually about 8 inches below your waist.' },
                { name: 'Shoulder', desc: 'Measure from the edge of one shoulder across your back to the other edge.' },
            ]
        },
        {
            title: 'Custom Fitting',
            icon: Scissors,
            steps: [
                { name: 'Standard Sizing', desc: 'Our standard sizes range from UK 6 to UK 22.' },
                { name: 'Bespoke Services', desc: 'For a perfect fit, we recommend booking a measurement session at our studio.' },
                { name: 'Remote Fitting', desc: 'If you are outside Lagos, we can guide you through a virtual measurement session via WhatsApp.' },
            ]
        }
    ];

    return (
        <PublicLayout>
            <Head title="Size & Measurement Guide" />

            <section className="bg-brand-black py-24 text-white">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold">Precision & Perfection</span>
                    <h1 className="mt-6 font-serif text-5xl font-bold">Size & Measurement Guide</h1>
                    <p className="mt-8 mx-auto max-w-2xl text-gray-400">
                        At Chrisnoman Fashion, we believe the perfect fit is the foundation of elegance. 
                        Use this guide to find your size or prepare for your custom fitting.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-16 lg:grid-cols-2">
                        {sections.map((section, idx) => (
                            <motion.div 
                                key={section.title}
                                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="space-y-10"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-full bg-brand-gold/10 p-4">
                                        <section.icon className="h-6 w-6 text-brand-gold" />
                                    </div>
                                    <h2 className="font-serif text-3xl font-bold">{section.title}</h2>
                                </div>

                                <div className="space-y-8">
                                    {section.steps.map((step) => (
                                        <div key={step.name} className="flex space-x-6 border-b border-gray-50 pb-8 last:border-0">
                                            <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-brand-gold" />
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-black">{step.name}</h3>
                                                <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 rounded-2xl bg-brand-cream/30 p-12 text-center">
                        <h3 className="font-serif text-2xl font-bold">Still Unsure?</h3>
                        <p className="mt-4 text-gray-500">Book a professional measurement session at our Lagos studio.</p>
                        <a 
                            href={route('book')}
                            className="mt-8 inline-block bg-brand-black px-10 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-gold hover:text-brand-black transition-all"
                        >
                            Book Session Now
                        </a>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
