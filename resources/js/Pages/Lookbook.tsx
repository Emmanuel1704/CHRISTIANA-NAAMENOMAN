import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MessageSquare, Check, Sparkles } from 'lucide-react';
import { asset } from '@/lib/utils';

interface OutfitStyle {
    id: string;
    name: string;
    description: string;
    image: string;
}

interface FabricSwatch {
    id: string;
    name: string;
    type: string;
    color: string;
    image: string;
}

export default function Lookbook() {
    const [selectedStyle, setSelectedStyle] = useState<string>('bridal');
    const [selectedFabric, setSelectedFabric] = useState<string>('kente');

    const styles: OutfitStyle[] = [
        {
            id: 'bridal',
            name: 'Bridal Couture',
            description: 'Custom luxury wedding gowns and bridal reception dresses tailored with precision.',
            image: '/assets/images/bridal.png'
        },
        {
            id: 'corset',
            name: 'Corset Gowns',
            description: 'Signature structured corsetry highlighting silhouettes with elegant hand-crafting.',
            image: '/assets/images/african.png' // Using available placeholder images
        },
        {
            id: 'african',
            name: 'Gala & African Prints',
            description: 'Premium African print styles mixed with lace, tulle, and beadwork for formal occasions.',
            image: '/assets/images/hero.png'
        },
        {
            id: 'millinery',
            name: 'Millinery & Headwear',
            description: 'Custom bespoke fascinators, hats, and traditional headbands to complement your attire.',
            image: '/assets/images/bridal.png'
        }
    ];

    const fabrics: FabricSwatch[] = [
        {
            id: 'kente',
            name: 'Handwoven Kente',
            type: 'Traditional Luxury',
            color: 'Gold, Orange, Blue weave',
            image: '/assets/images/african.png'
        },
        {
            id: 'beaded_lace',
            name: 'Beaded French Lace',
            type: 'Bridal Couture',
            color: 'Ivory / Silver embellishments',
            image: '/assets/images/bridal.png'
        },
        {
            id: 'silk_satin',
            name: 'Duchess Silk Satin',
            type: 'Minimalist Sleek',
            color: 'Champagne / Off-white',
            image: '/assets/images/hero.png'
        },
        {
            id: 'brocade',
            name: 'Metallic Brocade',
            type: 'Royal Textures',
            color: 'Rich Gold & Jacquard patterns',
            image: '/assets/images/african.png'
        },
        {
            id: 'velvet',
            name: 'Plush Stretch Velvet',
            type: 'Occasion Luxury',
            color: 'Emerald Green / Deep Wine Red',
            image: '/assets/images/hero.png'
        }
    ];

    const currentStyle = styles.find(s => s.id === selectedStyle) || styles[0];
    const currentFabric = fabrics.find(f => f.id === selectedFabric) || fabrics[0];

    const handleWhatsAppInquiry = () => {
        const phoneNumber = '233557485934'; // Lead designer WhatsApp number
        const text = encodeURIComponent(
            `Hi Chrisnoman Fashion! 👗\n\nI was browsing your Atelier Lookbook and would love to customize a style:\n\n✨ Style Choice: ${currentStyle.name}\n🧵 Fabric Choice: ${currentFabric.name} (${currentFabric.type})\n\nCould we discuss measurements, pricing, and booking a consultation? Thank you!`
        );
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    };

    return (
        <PublicLayout>
            <Head title="Interactive Lookbook & Fabric Studio" />

            {/* Header Section */}
            <section className="bg-brand-black py-20 text-white dark:bg-black">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold">Atelier Customization</span>
                    <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold">Interactive Lookbook</h1>
                    <p className="mt-6 mx-auto max-w-2xl text-gray-400 text-sm md:text-base">
                        Mix and match silhouette styles with premium luxury fabrics. Build your dream configuration and send it directly to our design workshop for custom fitting consultation.
                    </p>
                </div>
            </section>

            {/* Selector Studio */}
            <section className="py-20 bg-white dark:bg-[#121212] transition-colors duration-500">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-12 lg:grid-cols-12">
                        
                        {/* LEFT: Customizer Configurator (8 columns) */}
                        <div className="lg:col-span-7 space-y-12">
                            
                            {/* Step 1: Select Style */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-black">1</span>
                                    <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-brand-black dark:text-white">
                                        Choose Design Silhouette
                                    </h3>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {styles.map((style) => {
                                        const isSelected = selectedStyle === style.id;
                                        return (
                                            <div
                                                key={style.id}
                                                onClick={() => setSelectedStyle(style.id)}
                                                className={`group relative overflow-hidden rounded-2xl border p-4 cursor-pointer transition-all duration-300 ${
                                                    isSelected
                                                        ? 'border-brand-gold bg-brand-cream/10 dark:bg-brand-black/40 shadow-md shadow-brand-gold/5'
                                                        : 'border-gray-150 hover:border-brand-gold/60 dark:border-zinc-800'
                                                }`}
                                            >
                                                <div className="flex space-x-4 items-center">
                                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                                        <img 
                                                            src={asset(style.image)} 
                                                            alt={style.name} 
                                                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <h4 className="text-sm font-bold uppercase tracking-wider text-brand-black dark:text-white flex items-center">
                                                            {style.name}
                                                            {isSelected && <Check className="ml-2 h-4 w-4 text-brand-gold" />}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                                            {style.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Step 2: Select Fabric */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-black">2</span>
                                    <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-brand-black dark:text-white">
                                        Choose Luxury Fabric Swatch
                                    </h3>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {fabrics.map((fabric) => {
                                        const isSelected = selectedFabric === fabric.id;
                                        return (
                                            <div
                                                key={fabric.id}
                                                onClick={() => setSelectedFabric(fabric.id)}
                                                className={`group relative overflow-hidden rounded-2xl border p-4 cursor-pointer transition-all duration-300 ${
                                                    isSelected
                                                        ? 'border-brand-gold bg-brand-cream/10 dark:bg-brand-black/40 shadow-md shadow-brand-gold/5'
                                                        : 'border-gray-150 hover:border-brand-gold/60 dark:border-zinc-800'
                                                }`}
                                            >
                                                <div className="flex space-x-4 items-center">
                                                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-100 border border-gray-100 dark:border-zinc-700 relative">
                                                        <img 
                                                            src={asset(fabric.image)} 
                                                            alt={fabric.name} 
                                                            className="h-full w-full object-cover group-hover:rotate-6 group-hover:scale-110 transition-all duration-500" 
                                                        />
                                                        {/* Fabric Texture Overlays */}
                                                        <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-black dark:text-white flex items-center">
                                                                {fabric.name}
                                                                {isSelected && <Check className="ml-2 h-4 w-4 text-brand-gold" />}
                                                            </h4>
                                                        </div>
                                                        <span className="inline-block text-[9px] font-extrabold uppercase tracking-widest text-brand-gold/80 bg-brand-gold/5 px-2 py-0.5 rounded">
                                                            {fabric.type}
                                                        </span>
                                                        <p className="text-[11px] text-gray-400">
                                                            {fabric.color}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>

                        {/* RIGHT: Live Preview & WhatsApp Action Panel (4 columns) */}
                        <div className="lg:col-span-5 bg-brand-cream/20 dark:bg-brand-black/40 border border-brand-gold/15 p-8 rounded-3xl space-y-6 flex flex-col justify-between sticky top-28">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-2 text-brand-gold">
                                    <Sparkles className="h-4 w-4" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Live Custom Preview</span>
                                </div>

                                <div className="space-y-4">
                                    {/* Image combination stack */}
                                    <div className="aspect-[4/3] w-full relative overflow-hidden rounded-2xl bg-gray-150 border border-brand-gold/10">
                                        <img 
                                            src={asset(currentStyle.image)} 
                                            alt={currentStyle.name} 
                                            className="h-full w-full object-cover transition-all duration-500" 
                                        />
                                        <div className="absolute bottom-4 right-4 h-16 w-16 rounded-xl border-2 border-white overflow-hidden shadow-lg bg-gray-200">
                                            <img 
                                                src={asset(currentFabric.image)} 
                                                alt={currentFabric.name} 
                                                className="h-full w-full object-cover" 
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                                        <div className="absolute bottom-4 left-4 text-white">
                                            <p className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Selected Design</p>
                                            <h4 className="font-serif text-lg font-bold">{currentStyle.name}</h4>
                                        </div>
                                    </div>

                                    {/* Custom Description Text */}
                                    <div className="space-y-3 pt-2">
                                        <div className="border-l-2 border-brand-gold pl-4 space-y-1">
                                            <p className="text-xs uppercase tracking-wider text-gray-400">Design Model</p>
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-black dark:text-white">
                                                {currentStyle.name}
                                            </h4>
                                            <p className="text-xs text-gray-500 leading-relaxed">
                                                {currentStyle.description}
                                            </p>
                                        </div>

                                        <div className="border-l-2 border-brand-gold pl-4 space-y-1">
                                            <p className="text-xs uppercase tracking-wider text-gray-400">Selected Swatch</p>
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-black dark:text-white">
                                                {currentFabric.name}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                {currentFabric.type} &mdash; {currentFabric.color}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleWhatsAppInquiry}
                                className="w-full flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-green-600/20 text-xs uppercase tracking-widest cursor-pointer"
                            >
                                <MessageSquare className="h-4 w-4" />
                                <span>Inquire via WhatsApp</span>
                            </button>
                        </div>

                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
