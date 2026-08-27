import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Sparkles, Scissors, Info, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';

type Neckline = 'sweetheart' | 'offshoulder' | 'vneck' | 'halter';
type Silhouette = 'mermaid' | 'aline' | 'ballgown' | 'pencil';
type Sleeves = 'sleeveless' | 'cap' | 'puff' | 'long';
type Fabric = 'kente' | 'brocade' | 'satin' | 'silk';

export default function GownBuilder() {
    const [neckline, setNeckline] = useState<Neckline>('sweetheart');
    const [silhouette, setSilhouette] = useState<Silhouette>('mermaid');
    const [sleeves, setSleeves] = useState<Sleeves>('sleeveless');
    const [fabric, setFabric] = useState<Fabric>('satin');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sil = params.get('silhouette');
        const fab = params.get('fabric');
        const neck = params.get('neckline');
        const slv = params.get('sleeves');

        if (sil && ['mermaid', 'aline', 'ballgown', 'pencil'].includes(sil)) {
            setSilhouette(sil as Silhouette);
        }
        if (fab && ['kente', 'brocade', 'satin', 'silk'].includes(fab)) {
            setFabric(fab as Fabric);
        }
        if (neck && ['sweetheart', 'offshoulder', 'vneck', 'halter'].includes(neck)) {
            setNeckline(neck as Neckline);
        }
        if (slv && ['sleeveless', 'cap', 'puff', 'long'].includes(slv)) {
            setSleeves(slv as Sleeves);
        }
    }, []);

    const necklines = [
        { id: 'sweetheart', name: 'Sweetheart', desc: 'Heart-shaped neckline emphasizing the bust.' },
        { id: 'offshoulder', name: 'Off-Shoulder', desc: 'Sits below the shoulders, exposing the collarbones.' },
        { id: 'vneck', name: 'Plunging V-Neck', desc: 'Dramatic dip stretching down the center chest.' },
        { id: 'halter', name: 'High Halter', desc: 'Sleek neck straps offering modern gala allure.' },
    ];

    const silhouettes = [
        { id: 'mermaid', name: 'Mermaid Contour', desc: 'Fitted through torso and thighs, dramatic flare at the knees.' },
        { id: 'aline', name: 'Classic A-Line', desc: 'Fitted bodice flowing gently out from the waist.' },
        { id: 'ballgown', name: 'Royal Ballgown', desc: 'Voluminous, dramatic flared skirt for fairy-tale wedding styles.' },
        { id: 'pencil', name: 'Pencil Wrapper', desc: 'Straight column silhouette matching local Ghanaian wrappers.' },
    ];

    const sleeveOptions = [
        { id: 'sleeveless', name: 'Sleeveless', desc: 'Clean shoulder line optimized for strapless look.' },
        { id: 'cap', name: 'Cap Sleeves', desc: 'Delicate mini sleeves covering the shoulder tips.' },
        { id: 'puff', name: 'Atelier Puff', desc: 'Voluminous gathered sleeves for dramatic posture.' },
        { id: 'long', name: 'Elegant Long', desc: 'Sleek, fitted sleeves stretching to the wrists.' },
    ];

    const fabrics = [
        { id: 'satin', name: 'Bridal Satin', desc: 'Glossy, heavy pearl-cream fabric structure.', color: 'url(#satinGrad)', hex: '#FFFDF9' },
        { id: 'kente', name: 'Royal Kente', desc: 'Vibrant gold, orange, and red geometric prints.', color: 'url(#kenteGrad)', hex: '#F59E0B' },
        { id: 'brocade', name: 'Emerald Brocade', desc: 'Deep forest green woven with metallic gold patterns.', color: 'url(#brocadeGrad)', hex: '#064E3B' },
        { id: 'silk', name: 'Liquid Silk', desc: 'Glistening metallic sapphire blue drape.', color: 'url(#silkGrad)', hex: '#1D4ED8' },
    ];

    const resetCustomizer = () => {
        setNeckline('sweetheart');
        setSilhouette('mermaid');
        setSleeves('sleeveless');
        setFabric('satin');
    };

    const getBookingUrl = () => {
        const text = `Custom Gown Draft: Neckline: ${neckline}, Silhouette: ${silhouette}, Sleeves: ${sleeves}, Fabric: ${fabric}. Sourced through Atelier Builder.`;
        return route('book') + `?notes=${encodeURIComponent(text)}&fabric_option=${encodeURIComponent(fabric === 'satin' ? 'satin' : 'custom')}`;
    };

    return (
        <PublicLayout>
            <Head title="Custom Couture Gown Builder" />

            {/* Hero Section */}
            <section className="bg-brand-black py-16 text-white dark:bg-black relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
                </div>
                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold">Interactive Design Studio</span>
                    <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold">Custom Gown Draft Builder</h1>
                    <p className="mt-4 mx-auto max-w-xl text-gray-400 text-xs md:text-sm leading-relaxed">
                        Mix, match, and visualize fabrics, necklines, and silhouettes on our interactive body map model before locking in your sizing.
                    </p>
                </div>
            </section>

            {/* Builder Workshop */}
            <section className="py-20 bg-[#fcfcfc] dark:bg-[#121212] transition-colors duration-500">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-16 lg:grid-cols-12 items-start">
                        
                        {/* Live Silhouette Mockup (5 Cols) */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900/40 rounded-3xl border border-gray-150/40 dark:border-zinc-800 shadow-sm relative overflow-hidden min-h-[560px]">
                            <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
                            <div className="text-center mb-4 z-10">
                                <h3 className="font-serif text-lg font-semibold text-brand-black dark:text-white uppercase tracking-wider">
                                    Your Custom Gown Draft
                                </h3>
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">Live visual pattern overlay</p>
                            </div>

                            <div className="w-full max-w-[245px] relative z-10">
                                <svg viewBox="0 0 100 200" className="w-full h-auto text-brand-black/25 dark:text-white/15" fill="none">
                                    <defs>
                                        {/* Fabric Gradients */}
                                        {/* Bridal Satin */}
                                        <linearGradient id="satinGrad" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor="#FFFFFF" />
                                            <stop offset="35%" stopColor="#FFFBF2" />
                                            <stop offset="70%" stopColor="#F5EFE0" />
                                            <stop offset="100%" stopColor="#E6DCBF" />
                                        </linearGradient>

                                        {/* Royal Kente (Geometric Stripe Look) */}
                                        <linearGradient id="kenteGrad" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#EF4444" />
                                            <stop offset="30%" stopColor="#F59E0B" />
                                            <stop offset="50%" stopColor="#10B981" />
                                            <stop offset="70%" stopColor="#F59E0B" />
                                            <stop offset="100%" stopColor="#3B82F6" />
                                        </linearGradient>

                                        {/* Emerald Brocade */}
                                        <linearGradient id="brocadeGrad" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor="#047857" />
                                            <stop offset="40%" stopColor="#064E3B" />
                                            <stop offset="70%" stopColor="#D4AF37" />
                                            <stop offset="100%" stopColor="#022C22" />
                                        </linearGradient>

                                        {/* Liquid Silk */}
                                        <linearGradient id="silkGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#2563EB" />
                                            <stop offset="50%" stopColor="#1D4ED8" />
                                            <stop offset="80%" stopColor="#1E3A8A" />
                                            <stop offset="100%" stopColor="#172554" />
                                        </linearGradient>

                                        {/* Human skin shading gradients */}
                                        <linearGradient id="skinLight" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#FAF6F0" />
                                            <stop offset="40%" stopColor="#F5ECE1" />
                                            <stop offset="70%" stopColor="#EBDAC6" />
                                            <stop offset="100%" stopColor="#D2B48C" />
                                        </linearGradient>
                                        <linearGradient id="skinDark" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1C1A18" />
                                            <stop offset="50%" stopColor="#282420" />
                                            <stop offset="100%" stopColor="#141312" />
                                        </linearGradient>
                                    </defs>

                                     {/* Proportional Human Body Silhouette (Torso & Legs) */}
                                     <path 
                                         d="M45,30 
                                            C42,32 38,34 38,39 
                                            C38,50 37,66 37,76 
                                            C37,84 41,92 41,96 
                                            C41,102 35,108 35,116 
                                            C35,128 39,146 39,156 
                                            C39,166 41,182 41,196 
                                            L45,196 
                                            C45,182 44.5,166 44.5,156 
                                            C44.5,146 42.5,128 42.5,116 
                                            C42.5,108 45.5,102 46.5,96 
                                            C47.5,92 47,84 47,76 
                                            C47,66 46,50 46,39 
                                            C46,34 45.5,32 45,30 Z" 
                                         fill="url(#skinLight)"
                                         className="dark:fill-[url(#skinDark)] stroke-[#D4AF37]/35 dark:stroke-[#D4AF37]/20 transition-all duration-500"
                                         strokeWidth="0.8"
                                     />
                                     <path 
                                         d="M55,30 
                                            C58,32 62,34 62,39 
                                            C62,50 63,66 63,76 
                                            C63,84 59,92 59,96 
                                            C59,102 65,108 65,116 
                                            C65,128 61,146 61,156 
                                            C61,166 59,182 59,196 
                                            L55,196 
                                            C55,182 55.5,166 55.5,156 
                                            C55.5,146 57.5,128 57.5,116 
                                            C57.5,108 54.5,102 53.5,96 
                                            C52.5,92 53,84 53,76 
                                            C53,66 54,50 54,39 
                                            C54,34 54.5,32 55,30 Z" 
                                         fill="url(#skinLight)"
                                         className="dark:fill-[url(#skinDark)] stroke-[#D4AF37]/35 dark:stroke-[#D4AF37]/20 transition-all duration-500"
                                         strokeWidth="0.8"
                                     />

                                     {/* Proportional Arms (Left & Right hanging naturally at side) */}
                                     <path 
                                         d="M37.5,39 
                                            C36,44 34.5,52 33.5,62 
                                            C32,74 31,86 31.5,96 
                                            C31.7,100 32.2,102 32.7,102 
                                            C33.2,102 33.6,100 33.8,96 
                                            C34,86 34.5,74 36,62 
                                            C37,52 38,44 38.5,39 Z"
                                         fill="url(#skinLight)"
                                         className="dark:fill-[url(#skinDark)] stroke-[#D4AF37]/35 dark:stroke-[#D4AF37]/20 transition-all duration-500"
                                         strokeWidth="0.8"
                                     />
                                     <path 
                                         d="M62.5,39 
                                            C64,44 65.5,52 66.5,62 
                                            C68,74 69,86 68.5,96 
                                            C68.3,100 67.8,102 67.3,102 
                                            C66.8,102 66.4,100 66.2,96 
                                            C66,86 65.5,74 64,62 
                                            C63,52 62,44 61.5,39 Z"
                                         fill="url(#skinLight)"
                                         className="dark:fill-[url(#skinDark)] stroke-[#D4AF37]/35 dark:stroke-[#D4AF37]/20 transition-all duration-500"
                                         strokeWidth="0.8"
                                     />
                                     <ellipse cx="50" cy="18" rx="4.5" ry="5.5" className="fill-zinc-50 dark:fill-zinc-900 stroke-zinc-300 dark:stroke-zinc-800 transition-colors" strokeWidth="0.5" />

                                    {/* 1. SKIRT / SILHOUETTE GOWN BASE OVERLAY */}
                                    {silhouette === 'mermaid' && (
                                        <motion.path 
                                            initial={{ opacity: 0, scaleY: 0.8 }} 
                                            animate={{ opacity: 1, scaleY: 1 }}
                                            d="M 40 92 Q 35 120, 38 142 Q 43 148, 26 196 L 74 196 Q 57 148, 62 142 Q 65 120, 60 92 Z" 
                                            fill={fabrics.find(f => f.id === fabric)?.color} 
                                            stroke="#D4AF37" 
                                            strokeWidth="0.6" 
                                        />
                                    )}
                                    {silhouette === 'aline' && (
                                        <motion.path 
                                            initial={{ opacity: 0, scaleY: 0.8 }} 
                                            animate={{ opacity: 1, scaleY: 1 }}
                                            d="M 40 92 L 20 196 L 80 196 L 60 92 Z" 
                                            fill={fabrics.find(f => f.id === fabric)?.color} 
                                            stroke="#D4AF37" 
                                            strokeWidth="0.6" 
                                        />
                                    )}
                                    {silhouette === 'ballgown' && (
                                        <motion.path 
                                            initial={{ opacity: 0, scaleY: 0.8 }} 
                                            animate={{ opacity: 1, scaleY: 1 }}
                                            d="M 40 92 C 12 110, 8 196, 8 196 L 92 196 C 92 196, 88 110, 60 92 Z" 
                                            fill={fabrics.find(f => f.id === fabric)?.color} 
                                            stroke="#D4AF37" 
                                            strokeWidth="0.6" 
                                        />
                                    )}
                                    {silhouette === 'pencil' && (
                                        <motion.path 
                                            initial={{ opacity: 0, scaleY: 0.8 }} 
                                            animate={{ opacity: 1, scaleY: 1 }}
                                            d="M 40 92 L 42 196 L 58 196 L 60 92 Z" 
                                            fill={fabrics.find(f => f.id === fabric)?.color} 
                                            stroke="#D4AF37" 
                                            strokeWidth="0.6" 
                                        />
                                    )}

                                    {/* 2. BODICE BASE */}
                                    <path 
                                        d="M 36 44 C 36 54, 35 74, 37 92 L 63 92 C 65 74, 64 54, 64 44 Z" 
                                        fill={fabrics.find(f => f.id === fabric)?.color} 
                                        stroke="#D4AF37" 
                                        strokeWidth="0.5" 
                                    />

                                    {/* 3. NECKLINE CUT OVERLAYS */}
                                    {neckline === 'sweetheart' && (
                                        <path 
                                            d="M 36 44 C 40 48, 45 52, 50 47 C 55 52, 60 48, 64 44 L 64 92 L 36 92 Z" 
                                            fill={fabrics.find(f => f.id === fabric)?.color} 
                                            stroke="#D4AF37" 
                                            strokeWidth="0.8" 
                                        />
                                    )}
                                    {neckline === 'offshoulder' && (
                                        <path 
                                            d="M 32 50 Q 50 53, 68 50 L 64 92 L 36 92 Z" 
                                            fill={fabrics.find(f => f.id === fabric)?.color} 
                                            stroke="#D4AF37" 
                                            strokeWidth="0.8" 
                                        />
                                    )}
                                    {neckline === 'vneck' && (
                                        <path 
                                            d="M 36 44 L 50 64 L 64 44 L 64 92 L 36 92 Z" 
                                            fill={fabrics.find(f => f.id === fabric)?.color} 
                                            stroke="#D4AF37" 
                                            strokeWidth="0.8" 
                                        />
                                    )}
                                    {neckline === 'halter' && (
                                        <g>
                                            <path d="M 46 23 L 50 35 L 54 23 M 50 35 L 50 44" stroke="#D4AF37" strokeWidth="1.2" />
                                            <path d="M 36 44 L 50 35 L 64 44 L 64 92 L 36 92 Z" fill={fabrics.find(f => f.id === fabric)?.color} stroke="#D4AF37" strokeWidth="0.8" />
                                        </g>
                                    )}

                                    {/* 4. SLEEVES OVERLAYS */}
                                    {sleeves === 'cap' && (
                                        <g>
                                            <path d="M 36 44 C 31 46, 32 50, 36 47" fill={fabrics.find(f => f.id === fabric)?.color} stroke="#D4AF37" strokeWidth="0.6" />
                                            <path d="M 64 44 C 69 46, 68 50, 64 47" fill={fabrics.find(f => f.id === fabric)?.color} stroke="#D4AF37" strokeWidth="0.6" />
                                        </g>
                                    )}
                                    {sleeves === 'puff' && (
                                        <g>
                                            <ellipse cx="33" cy="46" rx="4.5" ry="4" fill={fabrics.find(f => f.id === fabric)?.color} stroke="#D4AF37" strokeWidth="0.6" />
                                            <ellipse cx="67" cy="46" rx="4.5" ry="4" fill={fabrics.find(f => f.id === fabric)?.color} stroke="#D4AF37" strokeWidth="0.6" />
                                        </g>
                                    )}
                                    {sleeves === 'long' && (
                                        <g>
                                            <path d="M 36 44 L 28 74 L 32 106 L 29 106 L 25 74 L 33 44 Z" fill={fabrics.find(f => f.id === fabric)?.color} stroke="#D4AF37" strokeWidth="0.6" />
                                            <path d="M 64 44 L 72 74 L 68 106 L 71 106 L 75 74 L 67 44 Z" fill={fabrics.find(f => f.id === fabric)?.color} stroke="#D4AF37" strokeWidth="0.6" />
                                        </g>
                                    )}
                                </svg>
                            </div>
                        </div>

                        {/* Interactive Selection Workshop (7 Cols) */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="rounded-full bg-brand-gold/10 p-2.5">
                                        <Scissors className="h-5 w-5 text-brand-gold" />
                                    </div>
                                    <div>
                                        <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                            Tailor Your Silhouette
                                        </h2>
                                        <p className="text-xs text-gray-400 mt-0.5">Choose dress details and preview the results</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={resetCustomizer}
                                    className="p-2 border border-gray-200 dark:border-zinc-800 rounded-xl text-gray-400 hover:text-brand-gold transition-all"
                                    title="Reset Customizer"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                </button>
                            </div>

                            {/* SELECT NECKLINE */}
                            <div className="space-y-3">
                                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">1. Select Neckline Cut</span>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {necklines.map(n => (
                                        <button
                                            key={n.id}
                                            onClick={() => setNeckline(n.id as Neckline)}
                                            className={`p-4 rounded-2xl border text-left transition-all ${
                                                neckline === n.id
                                                    ? 'border-brand-gold bg-brand-gold/5 dark:bg-brand-gold/10 shadow-sm'
                                                    : 'border-gray-150 hover:border-brand-gold dark:border-zinc-800'
                                            }`}
                                        >
                                            <span className="block text-xs font-bold text-gray-800 dark:text-white">{n.name}</span>
                                            <span className="block text-[10px] text-gray-400 mt-1">{n.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* SELECT SILHOUETTE */}
                            <div className="space-y-3">
                                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">2. Select Gown Skirt Silhouette</span>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {silhouettes.map(s => (
                                        <button
                                            key={s.id}
                                            onClick={() => setSilhouette(s.id as Silhouette)}
                                            className={`p-4 rounded-2xl border text-left transition-all ${
                                                silhouette === s.id
                                                    ? 'border-brand-gold bg-brand-gold/5 dark:bg-brand-gold/10 shadow-sm'
                                                    : 'border-gray-150 hover:border-brand-gold dark:border-zinc-800'
                                            }`}
                                        >
                                            <span className="block text-xs font-bold text-gray-800 dark:text-white">{s.name}</span>
                                            <span className="block text-[10px] text-gray-400 mt-1">{s.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* SELECT SLEEVES */}
                            <div className="space-y-3">
                                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">3. Select Sleeve Length</span>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {sleeveOptions.map(s => (
                                        <button
                                            key={s.id}
                                            onClick={() => setSleeves(s.id as Sleeves)}
                                            className={`p-4 rounded-2xl border text-left transition-all ${
                                                sleeves === s.id
                                                    ? 'border-brand-gold bg-brand-gold/5 dark:bg-brand-gold/10 shadow-sm'
                                                    : 'border-gray-150 hover:border-brand-gold dark:border-zinc-800'
                                            }`}
                                        >
                                            <span className="block text-xs font-bold text-gray-800 dark:text-white">{s.name}</span>
                                            <span className="block text-[10px] text-gray-400 mt-1">{s.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* SELECT FABRIC */}
                            <div className="space-y-3">
                                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">4. Select Atelier Fabric Premium</span>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {fabrics.map(f => (
                                        <button
                                            key={f.id}
                                            onClick={() => setFabric(f.id as Fabric)}
                                            className={`p-4 rounded-2xl border text-left transition-all flex items-start space-x-3.5 ${
                                                fabric === f.id
                                                    ? 'border-brand-gold bg-brand-gold/5 dark:bg-brand-gold/10 shadow-sm'
                                                    : 'border-gray-150 hover:border-brand-gold dark:border-zinc-800'
                                            }`}
                                        >
                                            <span 
                                                className="w-8 h-8 rounded-full border border-gray-200 dark:border-zinc-700 shrink-0 mt-0.5" 
                                                style={{ background: f.hex }}
                                            />
                                            <div>
                                                <span className="block text-xs font-bold text-gray-800 dark:text-white">{f.name}</span>
                                                <span className="block text-[10px] text-gray-400 mt-1">{f.desc}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pre-fill Summary & Checkout Booking */}
                            <div className="bg-brand-black/5 dark:bg-zinc-900/60 p-6 rounded-3xl border border-brand-gold/10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
                                <div className="space-y-1.5 text-center sm:text-left">
                                    <div className="flex items-center justify-center sm:justify-start space-x-2 text-[#D4AF37]">
                                        <Sparkles className="h-4 w-4 animate-spin-slow" />
                                        <span className="text-[10px] uppercase tracking-wider font-bold">Your Customized Gown Design</span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">
                                        You designed a **{silhouette}** Gown featuring a **{neckline}** neckline and **{sleeves}** sleeves, cut from **{fabrics.find(f => f.id === fabric)?.name}**.
                                    </p>
                                </div>

                                <div className="shrink-0 w-full sm:w-auto">
                                    <a
                                        href={getBookingUrl()}
                                        className="w-full sm:w-auto text-center flex items-center justify-center space-x-2 bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-xl shadow-md"
                                    >
                                        <span>Confirm & Book Fitting</span>
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
