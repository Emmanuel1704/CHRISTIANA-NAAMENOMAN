import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Scissors, Ruler, CheckCircle, HelpCircle } from 'lucide-react';
import { useState } from 'react';

type MeasurementKey = 'shoulder' | 'bust' | 'waist' | 'hips' | 'none';

interface Step {
    key: MeasurementKey;
    name: string;
    desc: string;
    tip: string;
    yVal: number; // Y position for SVG highlight line
    xWidth: number; // width of SVG line
}

export default function SizeGuide() {
    const [hoveredMeasure, setHoveredMeasure] = useState<MeasurementKey>('none');
    const [selectedMeasure, setSelectedMeasure] = useState<MeasurementKey>('bust');

    const steps: Step[] = [
        {
            key: 'shoulder',
            name: 'Shoulder',
            desc: 'Measure from the outer edge of one shoulder bone across your upper back to the outer edge of the other.',
            tip: 'Keep your shoulders relaxed and stand straight. Make sure the tape is flat against your back.',
            yVal: 48,
            xWidth: 26,
        },
        {
            key: 'bust',
            name: 'Bust',
            desc: 'Measure around the fullest part of your chest, keeping the measuring tape parallel to the floor.',
            tip: 'Do not pull the tape too tight. Breathe out naturally and keep your arms relaxed at your sides.',
            yVal: 70,
            xWidth: 32,
        },
        {
            key: 'waist',
            name: 'Waist',
            desc: 'Measure around your natural waistline (the narrowest part of your torso, usually just above the navel).',
            tip: 'Wrap the tape snugly but not tightly. Avoid sucking in your stomach to ensure a comfortable fit.',
            yVal: 102,
            xWidth: 24,
        },
        {
            key: 'hips',
            name: 'Hips',
            desc: 'Measure around the fullest part of your hips and buttocks (usually 7 to 9 inches below your natural waist).',
            tip: 'Keep your feet close together and make sure the tape is level all the way around your hips.',
            yVal: 135,
            xWidth: 30,
        },
    ];

    const currentKey = hoveredMeasure !== 'none' ? hoveredMeasure : selectedMeasure;
    const currentStep = steps.find(s => s.key === currentKey) || steps[1];

    return (
        <PublicLayout>
            <Head title="Size & Measurement Guide" />

            {/* Hero Section */}
            <section className="bg-brand-black py-20 text-white dark:bg-black">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold">Precision Tailoring</span>
                    <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold">Size & Measurement Guide</h1>
                    <p className="mt-6 mx-auto max-w-2xl text-gray-400 text-sm md:text-base">
                        At Chrisnoman Fashion, custom silhouettes are made to fit your unique dimensions. Use our interactive guide to take perfect measurements for your custom dress or design.
                    </p>
                </div>
            </section>

            {/* Interactive Guide Section */}
            <section className="py-20 bg-white dark:bg-[#121212] transition-colors duration-500">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-12 lg:grid-cols-12 items-start">
                        
                        {/* Interactive SVG Mannequin (4 Cols) */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-brand-cream/20 dark:bg-brand-black/40 rounded-3xl border border-brand-gold/10 relative overflow-hidden min-h-[500px]">
                            <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
                            <h3 className="font-serif text-lg font-semibold mb-6 text-brand-black dark:text-white uppercase tracking-wider text-center">
                                Interactive Silhouette
                            </h3>
                            
                            <div className="w-full max-w-[280px] relative">
                                <svg viewBox="0 0 100 200" className="w-full h-auto text-brand-black/20 dark:text-white/10" fill="none">
                                    {/* Female Mannequin Outer Silhouette Path */}
                                    <path 
                                        d="M50,15 C54,15 56,22 56,28 C56,36 53,40 57,44 C61,48 64,56 64,68 C64,74 59,85 57,98 C55,108 55,116 56,124 C57,132 59,142 60,152 C61,162 59,180 59,186 L41,186 C41,180 39,162 40,152 C41,142 43,132 44,124 C45,116 45,108 43,98 C41,85 36,74 36,68 C36,56 39,48 43,44 C47,40 44,36 44,28 C44,22 46,15 50,15 Z" 
                                        fill="currentColor" 
                                        stroke="currentColor" 
                                        strokeWidth="1.5"
                                    />
                                    
                                    {/* Base pedestal stand to look like a fashion atelier mannequin */}
                                    <line x1="50" y1="186" x2="50" y2="198" stroke="currentColor" strokeWidth="2.5" />
                                    <path d="M42,198 L58,198" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

                                    {/* Dynamic Highlight Lines */}
                                    {steps.map((s) => {
                                        const isActive = s.key === currentKey;
                                        const xStart = 50 - (s.xWidth / 2);
                                        const xEnd = 50 + (s.xWidth / 2);
                                        return (
                                            <g key={s.key} className="cursor-pointer" onClick={() => setSelectedMeasure(s.key)} onMouseEnter={() => setHoveredMeasure(s.key)} onMouseLeave={() => setHoveredMeasure('none')}>
                                                {/* Hidden fat line for easier hover triggers */}
                                                <line 
                                                    x1={xStart} 
                                                    y1={s.yVal} 
                                                    x2={xEnd} 
                                                    y2={s.yVal} 
                                                    stroke="transparent" 
                                                    strokeWidth="10" 
                                                />
                                                {/* Glowing gold background line */}
                                                <motion.line
                                                    x1={xStart}
                                                    y1={s.yVal}
                                                    x2={xEnd}
                                                    y2={s.yVal}
                                                    stroke="#D4AF37"
                                                    strokeWidth={isActive ? 3.5 : 0}
                                                    opacity={isActive ? 0.8 : 0}
                                                    animate={{ opacity: isActive ? [0.4, 0.8, 0.4] : 0 }}
                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                />
                                                {/* Animated dashed measuring tape */}
                                                <motion.line
                                                    x1={xStart}
                                                    y1={s.yVal}
                                                    x2={xEnd}
                                                    y2={s.yVal}
                                                    stroke={isActive ? '#D4AF37' : 'currentColor'}
                                                    strokeWidth={isActive ? 2 : 1}
                                                    strokeDasharray={isActive ? '3, 2' : 'none'}
                                                    opacity={isActive ? 1 : 0.4}
                                                    animate={isActive ? { strokeDashoffset: [0, -10] } : {}}
                                                    transition={isActive ? { repeat: Infinity, duration: 1, ease: 'linear' } : {}}
                                                />
                                                {/* Category tag label on silhouette */}
                                                {isActive && (
                                                    <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                                                        <rect 
                                                            x={xEnd + 4} 
                                                            y={s.yVal - 6} 
                                                            width={26} 
                                                            height={12} 
                                                            rx={3} 
                                                            fill="#D4AF37" 
                                                        />
                                                        <text 
                                                            x={xEnd + 17} 
                                                            y={s.yVal + 2.5} 
                                                            fill="#111" 
                                                            fontSize="6" 
                                                            fontWeight="bold" 
                                                            textAnchor="middle"
                                                        >
                                                            {s.name}
                                                        </text>
                                                    </motion.g>
                                                )}
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>
                            
                            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center italic">
                                Hover or tap on the guide lines to inspect parts
                            </p>
                        </div>

                        {/* Interactive Steps & Guidance (7 Cols) */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="rounded-full bg-brand-gold/10 p-3">
                                    <Ruler className="h-5 w-5 text-brand-gold" />
                                </div>
                                <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-black dark:text-white">
                                    Measurement Instructions
                                </h2>
                            </div>

                            {/* Main Selection Buttons */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {steps.map((s) => (
                                    <button
                                        key={s.key}
                                        onClick={() => setSelectedMeasure(s.key)}
                                        className={`px-4 py-3 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                                            currentKey === s.key
                                                ? 'bg-brand-black border-brand-black text-white dark:bg-brand-gold dark:border-brand-gold dark:text-brand-black shadow-md'
                                                : 'bg-white border-gray-200 text-brand-black hover:border-brand-gold dark:bg-transparent dark:border-zinc-800 dark:text-gray-300 dark:hover:border-brand-gold'
                                        }`}
                                    >
                                        {s.name}
                                    </button>
                                ))}
                            </div>

                            {/* Detail Panel */}
                            <motion.div
                                key={currentKey}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-brand-cream/10 dark:bg-brand-black/20 border border-brand-gold/15 p-6 rounded-2xl space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-brand-gold">
                                        Measuring your {currentStep.name}
                                    </h4>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                                        Step {steps.findIndex(s => s.key === currentKey) + 1} of 4
                                    </span>
                                </div>
                                <p className="text-base text-brand-black dark:text-gray-100 leading-relaxed font-serif">
                                    {currentStep.desc}
                                </p>
                                
                                <div className="flex items-start space-x-3 bg-brand-gold/5 border border-brand-gold/10 p-4 rounded-xl">
                                    <HelpCircle className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                                    <div>
                                        <h5 className="text-xs font-bold uppercase tracking-wider text-brand-black dark:text-white">Atelier Tip:</h5>
                                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {currentStep.tip}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Extra custom sizing details */}
                            <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100 dark:border-zinc-800">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Scissors className="h-4 w-4 text-brand-gold" />
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-black dark:text-white">Bespoke Fitting</h4>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                        For bespoke couture or structured corset gowns, we recommend a physical appointment to map your exact proportions.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-brand-gold" />
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-black dark:text-white">Remote Order Support</h4>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                        Outside of Accra or Lagos? Our lead designers offer direct video guidance on WhatsApp to help you verify your measurements.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Booking Callout */}
                    <div className="mt-20 rounded-3xl bg-brand-cream/30 dark:bg-brand-black/30 border border-brand-gold/10 p-10 text-center space-y-6">
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-black dark:text-white">
                            Ready for your perfect fit?
                        </h3>
                        <p className="max-w-xl mx-auto text-sm text-gray-500 dark:text-gray-400">
                            Book a professional measurement and style consultation with Christiana Naamenoman at our design studio.
                        </p>
                        <a 
                            href={route('book')}
                            className="inline-block bg-brand-black dark:bg-brand-gold hover:bg-brand-gold hover:text-brand-black dark:text-brand-black dark:hover:bg-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all rounded-full shadow-lg hover:shadow-brand-gold/20"
                        >
                            Book Studio Session
                        </a>
                    </div>

                </div>
            </section>
        </PublicLayout>
    );
}
