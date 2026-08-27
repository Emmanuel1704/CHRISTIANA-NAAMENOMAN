import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Ruler, CheckCircle, HelpCircle, Info, Sparkles, Layers, Sliders } from 'lucide-react';
import { useState, useEffect } from 'react';

type MeasurementKey = 
    | 'shoulder' | 'bust' | 'waist' | 'hips' | 'length'
    | 'underbust' | 'bust_span' | 'shoulder_to_waist' | 'chest_width'
    | 'sleeve' | 'bicep' | 'waist_to_knee' | 'none';

type CategoryKey = 'core' | 'bodice' | 'arms' | 'skirts';

interface Step {
    key: MeasurementKey;
    name: string;
    category: CategoryKey;
    desc: string;
    stepsList: string[];
    tip: string;
    yVal: number; // Y position for SVG highlight line
    xWidth: number; // width of SVG line
}

export default function SizeGuide() {
    const [hoveredMeasure, setHoveredMeasure] = useState<MeasurementKey>('none');
    const [selectedMeasure, setSelectedMeasure] = useState<MeasurementKey>('bust');
    const [activeCategory, setActiveCategory] = useState<CategoryKey>('core');
    
    // Calculator state
    const [unit, setUnit] = useState<'inch' | 'cm'>('inch');
    const [bustInput, setBustInput] = useState<number>(36);
    const [waistInput, setWaistInput] = useState<number>(28);
    const [hipsInput, setHipsInput] = useState<number>(38);
    const [underbustInput, setUnderbustInput] = useState<number>(30);
    const [shoulderInput, setShoulderInput] = useState<number>(15);
    const [lengthInput, setLengthInput] = useState<number>(56);

    // Analysis results
    const [analysis, setAnalysis] = useState<{
        size: string;
        silhouette: string;
        silhouetteDesc: string;
        mixedBust: string;
        mixedWaist: string;
        mixedHips: string;
        isMixed: boolean;
        atelierAdvice: string;
    } | null>(null);

    const categories = [
        { key: 'core', name: 'Core Proportions', desc: 'Primary measurements used to determine base pattern sizes.' },
        { key: 'bodice', name: 'Bodice & Corsetry', desc: 'Detailed front panel measurements required for structured tops & corsets.' },
        { key: 'arms', name: 'Sleeves & Arms', desc: 'Armhole and length guidelines for cap, short, and long sleeve styles.' },
        { key: 'skirts', name: 'Length & Skirts', desc: 'Hemline and vertical ratios for mermaid gowns, slits, and trains.' },
    ];

    const steps: Step[] = [
        // CORE
        {
            key: 'shoulder',
            name: 'Shoulder Width',
            category: 'core',
            desc: 'Measure the distance across your upper back between the outermost points of your shoulder bones.',
            stepsList: [
                'Locate the prominent bone at the tip of each shoulder.',
                'Hold the tape flat across the curve of the upper back.',
                'Measure from one shoulder bone tip directly to the other.'
            ],
            tip: 'Stand straight and let your shoulders drop naturally.',
            yVal: 32,
            xWidth: 26,
        },
        {
            key: 'bust',
            name: 'Bust Line',
            category: 'core',
            desc: 'Measure around the fullest point of your bust line, keeping the tape horizontal all around.',
            stepsList: [
                'Wrap the measuring tape around the fullest part of your chest (across the nipples).',
                'Pass the tape flat under your armpits and straight across your shoulder blades.',
                'Keep the tape parallel to the floor, breathing out naturally.'
            ],
            tip: 'Avoid padded bras while measuring; a light unpadded bra is ideal.',
            yVal: 58,
            xWidth: 26,
        },
        {
            key: 'waist',
            name: 'Natural Waist',
            category: 'core',
            desc: 'Measure around the narrowest part of your waist (usually 1-2 inches above your belly button).',
            stepsList: [
                'Locate your natural waist crease by bending slightly to the side.',
                'Wrap the tape flat around this line, keeping it snug but comfortable.',
                'Avoid sucking in your stomach; stand tall and breathe out.'
            ],
            tip: 'For structured corsets, this measurement determines the core compression lining fit.',
            yVal: 92,
            xWidth: 18,
        },
        {
            key: 'hips',
            name: 'Full Hips',
            category: 'core',
            desc: 'Measure around the absolute widest part of your hips and buttocks.',
            stepsList: [
                'Stand on a flat surface with your feet pressed close together.',
                'Locate the fullest part of your hips and seat (usually 7 to 9 inches below the waist).',
                'Wrap the tape level all the way around to capture the silhouette.'
            ],
            tip: 'Make sure your pockets are completely empty to ensure the tape lies perfectly flat.',
            yVal: 110,
            xWidth: 22,
        },
        {
            key: 'length',
            name: 'Hollow-to-Hem Length',
            category: 'core',
            desc: 'Measure the vertical height from the hollow base of your neck down to your desired dress hemline.',
            stepsList: [
                'Stand up straight with your feet flat and heels together.',
                'Place the start of the tape in the hollow dip between your collarbones.',
                'Let the tape hang straight down the front of your body to the floor.'
            ],
            tip: 'Always wear the heel height you plan to wear with the dress when taking this measurement.',
            yVal: 196,
            xWidth: 8,
        },
        // BODICE
        {
            key: 'underbust',
            name: 'Underbust Circumference',
            category: 'bodice',
            desc: 'Measure directly below your bust, where your bra band normally sits.',
            stepsList: [
                'Wrap the tape snugly around your ribcage directly beneath your breasts.',
                'Keep the tape parallel to the floor and breathe out naturally.'
            ],
            tip: 'Crucial for underwire cups, corset bands, and empire waistlines.',
            yVal: 68,
            xWidth: 22,
        },
        {
            key: 'bust_span',
            name: 'Bust Span (Nipple to Nipple)',
            category: 'bodice',
            desc: 'Measure the horizontal distance between the apex/points of your bust.',
            stepsList: [
                'Locate the apex (fullest point) of each breast.',
                'Measure horizontally between these two points.'
            ],
            tip: 'Ensures that cup padding, dart lines, and beaded embellishments are centered perfectly.',
            yVal: 58,
            xWidth: 10,
        },
        {
            key: 'shoulder_to_waist',
            name: 'Shoulder to Waist',
            category: 'bodice',
            desc: 'Measure vertically from the highest point of your shoulder down to your natural waistline.',
            stepsList: [
                'Place the tape at the base of your neck where the shoulder seam begins.',
                'Run the tape vertically down over the fullest point of the bust to the natural waist crease.'
            ],
            tip: 'Determines the length of the corset bodice and waist joint alignments.',
            yVal: 92,
            xWidth: 12,
        },
        {
            key: 'chest_width',
            name: 'Chest Width (Front)',
            category: 'bodice',
            desc: 'Measure across the chest from armhole crease to armhole crease above the breasts.',
            stepsList: [
                'Locate the crease of your armpits on the front chest.',
                'Measure the horizontal distance between these two creases.'
            ],
            tip: 'Prevents off-shoulder sleeves and necklines from gaping or pulling too tight.',
            yVal: 44,
            xWidth: 22,
        },
        // ARMS
        {
            key: 'sleeve',
            name: 'Sleeve Length',
            category: 'arms',
            desc: 'Measure from the top tip of your shoulder down to your desired sleeve edge.',
            stepsList: [
                'Start the tape at the shoulder bone tip.',
                'Bend your elbow slightly if measuring for a full-length sleeve to allow arm movement.',
                'Measure down to your wrist bone or desired cuff line.'
            ],
            tip: 'For short sleeves or cap sleeves, measure straight down to where you want the sleeve to end.',
            yVal: 94,
            xWidth: 4,
        },
        {
            key: 'bicep',
            name: 'Arm Girth / Bicep',
            category: 'arms',
            desc: 'Measure around the fullest part of your upper arm.',
            stepsList: [
                'Relax your arm down at your side.',
                'Wrap the measuring tape level around the widest part of your bicep muscle.'
            ],
            tip: 'Ensures sleeves fit comfortably without restricting arm bending.',
            yVal: 50,
            xWidth: 6,
        },
        // SKIRTS
        {
            key: 'waist_to_knee',
            name: 'Waist to Knee Height',
            category: 'skirts',
            desc: 'Measure vertically from your natural waist crease down to the center of your knee.',
            stepsList: [
                'Start the tape at your natural waist crease.',
                'Let the tape hang vertically down your side to the center of your kneecap.'
            ],
            tip: 'This is the key measurement for mermaid/trumpet gowns; it marks where the flare begins.',
            yVal: 156,
            xWidth: 20,
        },
    ];

    // Filter steps based on active category
    const filteredSteps = steps.filter(s => s.category === activeCategory);
    
    // Auto adjust selection if active step is not in the active category
    const currentKey = hoveredMeasure !== 'none' ? hoveredMeasure : selectedMeasure;
    const currentStep = steps.find(s => s.key === currentKey) || filteredSteps[0] || steps[1];

    // Handle conversions when toggle unit changes
    const handleUnitChange = (newUnit: 'inch' | 'cm') => {
        if (newUnit === unit) return;
        
        if (newUnit === 'cm') {
            setBustInput(Math.round(bustInput * 2.54));
            setWaistInput(Math.round(waistInput * 2.54));
            setHipsInput(Math.round(hipsInput * 2.54));
            setUnderbustInput(Math.round(underbustInput * 2.54));
            setShoulderInput(Math.round(shoulderInput * 2.54));
            setLengthInput(Math.round(lengthInput * 2.54));
        } else {
            setBustInput(Math.round(bustInput / 2.54));
            setWaistInput(Math.round(waistInput / 2.54));
            setHipsInput(Math.round(hipsInput / 2.54));
            setUnderbustInput(Math.round(underbustInput / 2.54));
            setShoulderInput(Math.round(shoulderInput / 2.54));
            setLengthInput(Math.round(lengthInput / 2.54));
        }
        setUnit(newUnit);
    };

    // Helper to get size for a specific measurement in inches
    const mapValToUkSize = (inches: number): string => {
        if (inches <= 33) return 'UK 8 (XS)';
        if (inches <= 35) return 'UK 10 (S)';
        if (inches <= 37) return 'UK 12 (M)';
        if (inches <= 39) return 'UK 14 (L)';
        if (inches <= 41) return 'UK 16 (XL)';
        if (inches <= 44) return 'UK 18 (XXL)';
        return 'Custom Bespoke';
    };

    // Calculate sizing analysis in real-time
    useEffect(() => {
        const b = unit === 'cm' ? bustInput / 2.54 : bustInput;
        const w = unit === 'cm' ? waistInput / 2.54 : waistInput;
        const h = unit === 'cm' ? hipsInput / 2.54 : hipsInput;

        // Base size maps to bust size
        const baseSize = mapValToUkSize(b);
        const bustSize = mapValToUkSize(b);
        const waistSize = mapValToUkSize(w + 8); 
        const hipsSize = mapValToUkSize(h - 4); 

        // Silhouette classifications
        let silhouette = 'Balanced Shape';
        let silhouetteDesc = 'Your bust and hip sizes are proportionally balanced.';
        let advice = 'Your measurements align nicely. Structured bodycon drapes and straight silhouettes will fit beautifully.';

        if (h - b >= 4) {
            silhouette = 'Pear Shape (Triangle)';
            silhouetteDesc = 'Your hips are significantly wider than your bust.';
            advice = 'We recommend custom tailoring to grade the pattern from a smaller bodice size into a larger skirt hip. Flared or A-line wrapper designs are highly recommended.';
        } else if (b - h >= 3) {
            silhouette = 'Apple Shape (Inverted Triangle)';
            silhouetteDesc = 'Your bust line is wider than your hip line.';
            advice = 'To support the upper bodice, we recommend custom double-boning inside the corset structures. Off-shoulder and deep V-necklines will sit elegantly.';
        } else if (b - w >= 9 && h - w >= 9) {
            silhouette = 'Hourglass Shape';
            silhouetteDesc = 'Your waist is highly defined and significantly narrower than your bust and hips.';
            advice = 'Perfect silhouette match for high-compression corsetry. We will draft custom back lacing panels to highlight your waist curves naturally.';
        } else if (h - w < 6) {
            silhouette = 'Rectangle Shape';
            silhouetteDesc = 'Your bust, waist, and hips form a straight, balanced column.';
            advice = 'We will design tailored princess seams and structured side-boning padding panels to visually carve out curves.';
        }

        // Detect if mixed sizes are needed
        const isMixed = bustSize !== waistSize || bustSize !== hipsSize;

        setAnalysis({
            size: baseSize,
            silhouette,
            silhouetteDesc,
            mixedBust: bustSize,
            mixedWaist: waistSize,
            mixedHips: hipsSize,
            isMixed,
            atelierAdvice: advice
        });
    }, [bustInput, waistInput, hipsInput, underbustInput, unit]);

    return (
        <PublicLayout>
            <Head title="Couture Size & Measurement Blueprints" />

            {/* Hero Section */}
            <section className="bg-brand-black py-20 text-white dark:bg-black relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
                </div>
                <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] font-bold">Atelier Precision Sizing</span>
                    <h1 className="mt-4 font-serif text-4xl md:text-5xl font-bold">Couture Measurement Blueprints</h1>
                    <p className="mt-6 mx-auto max-w-2xl text-gray-400 text-sm md:text-base leading-relaxed">
                        At Chrisnoman Fashion House, Christiana handcrafts luxury ladies' gowns precisely to your proportions. Avoid sizing errors by following our detailed measuring blueprints.
                    </p>
                </div>
            </section>

            {/* Interactive Guide Section */}
            <section className="py-24 bg-[#fcfcfc] dark:bg-[#121212] transition-colors duration-500 border-b border-gray-100 dark:border-zinc-900">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-16 lg:grid-cols-12 items-start">
                        
                        {/* Interactive SVG Mannequin (5 Cols) */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900/40 rounded-3xl border border-gray-150/40 dark:border-zinc-800 shadow-sm relative overflow-hidden min-h-[550px]">
                            <div className="absolute inset-0 bg-radial-glow opacity-30 pointer-events-none" />
                            <div className="text-center mb-6 z-10">
                                <h3 className="font-serif text-lg font-semibold text-brand-black dark:text-white uppercase tracking-wider">
                                    Interactive Body Map
                                </h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Select guidelines to view 3D wrapping curves</p>
                            </div>
                            
                            <div className="w-full max-w-[245px] relative z-10">
                                <svg viewBox="0 0 100 200" className="w-full h-auto text-brand-black/25 dark:text-white/15" fill="none">
                                    <defs>
                                        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                                            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                                        </radialGradient>
                                        <linearGradient id="scanline" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                                            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.25" />
                                            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                                        </linearGradient>
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

                                    {/* Futuristic scanline sweep animation */}
                                    <motion.rect
                                        width="100"
                                        height="20"
                                        fill="url(#scanline)"
                                        initial={{ y: 15 }}
                                        animate={{ y: [15, 185, 15] }}
                                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                        pointerEvents="none"
                                    />

                                    {/* Detailed Hair / Head silhouette */}
                                    <path d="M46,14 C46,9 54,9 54,14 C55,16 54,18 52,19 C50,20 48,20 46,19 Z" fill="currentColor" opacity="0.1" />
                                    <ellipse cx="50" cy="18" rx="4.5" ry="5.5" className="fill-zinc-50 dark:fill-zinc-900 stroke-zinc-300 dark:stroke-zinc-800 transition-colors" strokeWidth="0.5" />

                                    {/* Neck line */}
                                    <path d="M47,23 C47,26 46,30 43,32 M53,23 C53,26 54,30 57,32" stroke="currentColor" opacity="0.4" strokeWidth="0.6" />

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

                                    {/* Bodysuit line overlay */}
                                    <path 
                                        d="M37.5,56 C39.5,58 45.5,56 45.5,64 C45.5,74 42.5,92 42.5,96 C42.5,100 44.5,108 45.5,110 L54.5,110 C55.5,108 57.5,100 57.5,96 C57.5,92 54.5,74 54.5,64 C54.5,56 60.5,58 62.5,56 L61,92 C59.5,98 56,110 50,116 C44,110 40.5,98 39,92 Z"
                                        className="fill-[#D4AF37]/5 dark:fill-[#D4AF37]/10 stroke-[#D4AF37]/20 dark:stroke-[#D4AF37]/15"
                                        strokeWidth="0.5"
                                    />

                                    {/* Breast lines for realistic shape */}
                                    <path d="M40,56 C41,61 48,61 49,56" stroke="currentColor" opacity="0.2" fill="none" strokeWidth="0.6" />
                                    <path d="M60,56 C59,61 52,61 51,56" stroke="currentColor" opacity="0.2" fill="none" strokeWidth="0.6" />

                                    {/* Collarbone contours */}
                                    <path d="M40,32 C43,33.5 47,33.5 50,32.5 C53,33.5 57,33.5 60,32" stroke="currentColor" opacity="0.15" fill="none" strokeWidth="0.5" />

                                    {/* Belly Button detail */}
                                    <ellipse cx="50" cy="98" rx="0.6" ry="1" stroke="currentColor" opacity="0.15" fill="none" strokeWidth="0.5" />

                                    {/* Dynamic Highlight Lines */}
                                    {steps.map((s) => {
                                        const isActive = s.key === currentKey;
                                        const isVertical = s.key === 'length';

                                        const xStart = isVertical ? 50 : 50 - (s.xWidth / 2);
                                        const xEnd = isVertical ? 50 : 50 + (s.xWidth / 2);
                                        const yStart = isVertical ? 32 : s.yVal;
                                        const yEnd = s.yVal;

                                        // Horizontal wrapping curves (3D Ellipse look)
                                        const yRadius = s.xWidth / 6;

                                        // Custom logic for sleeves and diagonals
                                        const isSleeve = s.key === 'sleeve';
                                        const isBicep = s.key === 'bicep';
                                        const isWaistToKnee = s.key === 'waist_to_knee';
                                        const isSpan = s.key === 'bust_span';
                                        const isShoulderToWaist = s.key === 'shoulder_to_waist';

                                        return (
                                            <g key={s.key} className="cursor-pointer" onClick={() => setSelectedMeasure(s.key)} onMouseEnter={() => setHoveredMeasure(s.key)} onMouseLeave={() => setHoveredMeasure('none')}>
                                                {/* Fat trigger zone */}
                                                {isVertical ? (
                                                    <line x1="50" y1="32" x2="50" y2="196" stroke="transparent" strokeWidth="12" />
                                                ) : isSleeve ? (
                                                    <path d="M 35 36 L 26 64 L 34 100" stroke="transparent" fill="none" strokeWidth="12" />
                                                ) : isWaistToKnee ? (
                                                    <line x1="38" y1="92" x2="43" y2="144" stroke="transparent" strokeWidth="12" />
                                                ) : isShoulderToWaist ? (
                                                    <line x1="45" y1="32" x2="45" y2="92" stroke="transparent" strokeWidth="12" />
                                                ) : (
                                                    <ellipse cx={isBicep ? 30 : 50} cy={s.yVal} rx={s.xWidth / 2} ry={yRadius + 3} fill="transparent" />
                                                )}

                                                {/* Back Wrap-around tape (behind body) */}
                                                {!isVertical && !isSleeve && !isWaistToKnee && !isShoulderToWaist && (
                                                    <path
                                                        d={`M ${isBicep ? 30 - (s.xWidth / 2) : xStart} ${s.yVal} A ${s.xWidth / 2} ${yRadius} 0 0 1 ${isBicep ? 30 + (s.xWidth / 2) : xEnd} ${s.yVal}`}
                                                        stroke={isActive ? '#D4AF37' : 'currentColor'}
                                                        strokeWidth={isActive ? 1.5 : 0.6}
                                                        strokeDasharray="2, 3"
                                                        opacity={isActive ? 0.7 : 0.2}
                                                    />
                                                )}

                                                {/* Front tape guide paths */}
                                                {isVertical ? (
                                                    <motion.line
                                                        x1="50"
                                                        y1="32"
                                                        x2="50"
                                                        y2="196"
                                                        stroke={isActive ? '#D4AF37' : 'currentColor'}
                                                        strokeWidth={isActive ? 2 : 0.8}
                                                        strokeDasharray="4, 2"
                                                        opacity={isActive ? 1 : 0.4}
                                                        animate={isActive ? { strokeDashoffset: [0, 10] } : {}}
                                                        transition={isActive ? { repeat: Infinity, duration: 1, ease: 'linear' } : {}}
                                                    />
                                                ) : isSleeve ? (
                                                    <motion.path
                                                        d="M 35 36 L 26 64 L 34 100"
                                                        stroke={isActive ? '#D4AF37' : 'currentColor'}
                                                        strokeWidth={isActive ? 2 : 0.8}
                                                        strokeDasharray="4, 2"
                                                        fill="none"
                                                        opacity={isActive ? 1 : 0.4}
                                                        animate={isActive ? { strokeDashoffset: [0, 10] } : {}}
                                                        transition={isActive ? { repeat: Infinity, duration: 1, ease: 'linear' } : {}}
                                                    />
                                                ) : isWaistToKnee ? (
                                                    <motion.line
                                                        x1="38"
                                                        y1="92"
                                                        x2="43"
                                                        y2="144"
                                                        stroke={isActive ? '#D4AF37' : 'currentColor'}
                                                        strokeWidth={isActive ? 2 : 0.8}
                                                        strokeDasharray="4, 2"
                                                        opacity={isActive ? 1 : 0.4}
                                                        animate={isActive ? { strokeDashoffset: [0, 10] } : {}}
                                                        transition={isActive ? { repeat: Infinity, duration: 1, ease: 'linear' } : {}}
                                                    />
                                                ) : isShoulderToWaist ? (
                                                    <motion.line
                                                        x1="45"
                                                        y1="32"
                                                        x2="45"
                                                        y2="92"
                                                        stroke={isActive ? '#D4AF37' : 'currentColor'}
                                                        strokeWidth={isActive ? 2 : 0.8}
                                                        strokeDasharray="4, 2"
                                                        opacity={isActive ? 1 : 0.4}
                                                        animate={isActive ? { strokeDashoffset: [0, 10] } : {}}
                                                        transition={isActive ? { repeat: Infinity, duration: 1, ease: 'linear' } : {}}
                                                    />
                                                ) : (
                                                    <motion.path
                                                        d={`M ${isBicep ? 30 - (s.xWidth / 2) : xStart} ${s.yVal} A ${s.xWidth / 2} ${yRadius} 0 0 0 ${isBicep ? 30 + (s.xWidth / 2) : xEnd} ${s.yVal}`}
                                                        stroke={isActive ? '#D4AF37' : 'currentColor'}
                                                        strokeWidth={isActive ? 2.5 : 1}
                                                        strokeDasharray={isActive ? '4, 2' : 'none'}
                                                        opacity={isActive ? 1 : 0.5}
                                                        animate={isActive ? { strokeDashoffset: [0, -10] } : {}}
                                                        transition={isActive ? { repeat: Infinity, duration: 1, ease: 'linear' } : {}}
                                                    />
                                                )}

                                                {/* Label card tag */}
                                                {isActive && (
                                                    <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                                                        <rect 
                                                            x={isVertical ? 60 : isSleeve ? 8 : xEnd + 4} 
                                                            y={isVertical ? 100 : isSleeve ? 65 : s.yVal - 6} 
                                                            width={34} 
                                                            height={13} 
                                                            rx={3} 
                                                            fill="#111" 
                                                            stroke="#D4AF37"
                                                            strokeWidth="0.5"
                                                        />
                                                        <text 
                                                            x={isVertical ? 77 : isSleeve ? 25 : xEnd + 21} 
                                                            y={isVertical ? 108.5 : isSleeve ? 73.5 : s.yVal + 2.5} 
                                                            fill="#D4AF37" 
                                                            fontSize="5.5" 
                                                            fontWeight="bold" 
                                                            textAnchor="middle"
                                                        >
                                                            {s.name.split(' ')[0]}
                                                        </text>
                                                    </motion.g>
                                                )}
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>
                        </div>

                        {/* Step Breakdown & Sizing Details (7 Cols) */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="flex items-center space-x-3 border-b border-gray-100 dark:border-zinc-800 pb-4">
                                <div className="rounded-full bg-brand-gold/10 p-3">
                                    <Ruler className="h-5 w-5 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                        Step-by-Step Blueprints
                                    </h2>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Measuring instructions for custom fit</p>
                                </div>
                            </div>

                            {/* Category Selector Tabs */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-gray-100 dark:bg-zinc-900 p-1.5 rounded-xl border border-gray-150/10">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.key}
                                        onClick={() => {
                                            setActiveCategory(cat.key as CategoryKey);
                                            const firstOfCat = steps.find(s => s.category === cat.key);
                                            if (firstOfCat) setSelectedMeasure(firstOfCat.key);
                                        }}
                                        className={`py-3 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                                            activeCategory === cat.key
                                                ? 'bg-white dark:bg-zinc-800 text-brand-black dark:text-white shadow-sm'
                                                : 'text-gray-500 hover:text-gray-800'
                                        }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>

                            {/* Selectable Buttons under active category */}
                            <div className="flex flex-wrap gap-2">
                                {filteredSteps.map((s) => (
                                    <button
                                        key={s.key}
                                        onClick={() => setSelectedMeasure(s.key)}
                                        className={`px-4 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                                            currentKey === s.key
                                                ? 'bg-brand-black border-brand-black text-white dark:bg-brand-gold dark:border-brand-gold dark:text-brand-black shadow-md'
                                                : 'bg-white border-gray-150 text-brand-black hover:border-brand-gold dark:bg-transparent dark:border-zinc-800 dark:text-gray-300 dark:hover:border-brand-gold'
                                        }`}
                                    >
                                        {s.name}
                                    </button>
                                ))}
                            </div>

                            {/* Guideline Card */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentKey}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="bg-white dark:bg-zinc-900/30 border border-gray-150/80 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-6"
                                >
                                    <div className="flex items-center justify-between border-b border-gray-50 dark:border-zinc-850 pb-4">
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
                                            {currentStep.name} Guide
                                        </h4>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                                            Step {steps.findIndex(s => s.key === currentKey) + 1} of {steps.length}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-sm text-gray-700 dark:text-gray-255 leading-relaxed font-serif">
                                            {currentStep.desc}
                                        </p>

                                        {/* Step-by-step checklist */}
                                        <div className="space-y-3 pt-2">
                                            <span className="text-[9px] uppercase tracking-wider text-gray-455 font-bold block">How to do it:</span>
                                            {currentStep.stepsList.map((stepDesc, idx) => (
                                                <div key={idx} className="flex items-start space-x-3 text-xs text-gray-600 dark:text-gray-355">
                                                    <span className="h-5 w-5 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center font-bold text-[9px] shrink-0">
                                                        {idx + 1}
                                                    </span>
                                                    <p className="leading-relaxed">{stepDesc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-3 bg-brand-gold/5 border border-brand-gold/10 p-4 rounded-xl">
                                        <HelpCircle className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                                        <div>
                                            <h5 className="text-[10px] font-bold uppercase tracking-wider text-brand-black dark:text-white">Atelier Tip:</h5>
                                            <p className="mt-1 text-xs text-gray-505 dark:text-gray-400 leading-relaxed">
                                                {currentStep.tip}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Interactive Size Estimator Widget */}
                    <div className="mt-20 border border-gray-150/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 p-8 rounded-3xl shadow-sm">
                        <div className="max-w-xl mx-auto text-center mb-8">
                            <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">Atelier Size Estimator</span>
                            <h3 className="font-serif text-2xl font-bold mt-2 text-gray-900 dark:text-white">Estimate Your Standard Pattern Size</h3>
                            <p className="text-xs text-gray-400 mt-1">Adjust the sliders to view your live body silhouette categories and mixed size breakdowns.</p>
                        </div>

                        <div className="grid gap-12 lg:grid-cols-12 items-start">
                            
                            {/* Sliders Input Panel (7 Cols) */}
                            <div className="lg:col-span-7 space-y-8">
                                <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-4">
                                    <div className="flex items-center space-x-2">
                                        <Sliders className="h-4 w-4 text-brand-gold" />
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-black dark:text-white">Adjust Your Metrics</h4>
                                    </div>

                                    {/* Unit selector toggle */}
                                    <div className="bg-gray-100 dark:bg-zinc-900 p-1 rounded-lg flex space-x-1 border border-gray-150/10">
                                        <button 
                                            type="button"
                                            onClick={() => handleUnitChange('inch')} 
                                            className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${unit === 'inch' ? 'bg-white dark:bg-zinc-800 shadow-sm text-brand-black dark:text-white' : 'text-gray-400 hover:text-gray-700'}`}
                                        >
                                            Inches (")
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => handleUnitChange('cm')} 
                                            className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${unit === 'cm' ? 'bg-white dark:bg-zinc-800 shadow-sm text-brand-black dark:text-white' : 'text-gray-400 hover:text-gray-700'}`}
                                        >
                                            CM
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* BUST SLIDER */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] uppercase tracking-wider text-gray-450 font-bold">Bust Line (Fullest Point)</span>
                                            <span className="text-sm font-serif font-bold text-[#D4AF37]">
                                                {bustInput} {unit === 'inch' ? '"' : 'cm'}
                                            </span>
                                        </div>
                                        <input 
                                            type="range"
                                            min={unit === 'inch' ? 30 : 76}
                                            max={unit === 'inch' ? 54 : 137}
                                            value={bustInput}
                                            onChange={e => setBustInput(parseInt(e.target.value))}
                                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37] dark:bg-zinc-800"
                                        />
                                    </div>

                                    {/* WAIST SLIDER */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] uppercase tracking-wider text-gray-450 font-bold">Natural Waist (Narrowest Point)</span>
                                            <span className="text-sm font-serif font-bold text-[#D4AF37]">
                                                {waistInput} {unit === 'inch' ? '"' : 'cm'}
                                            </span>
                                        </div>
                                        <input 
                                            type="range"
                                            min={unit === 'inch' ? 22 : 55}
                                            max={unit === 'inch' ? 46 : 117}
                                            value={waistInput}
                                            onChange={e => setWaistInput(parseInt(e.target.value))}
                                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37] dark:bg-zinc-800"
                                        />
                                    </div>

                                    {/* HIPS SLIDER */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] uppercase tracking-wider text-gray-455 font-bold">Full Hips (Widest Seat Point)</span>
                                            <span className="text-sm font-serif font-bold text-[#D4AF37]">
                                                {hipsInput} {unit === 'inch' ? '"' : 'cm'}
                                            </span>
                                        </div>
                                        <input 
                                            type="range"
                                            min={unit === 'inch' ? 32 : 81}
                                            max={unit === 'inch' ? 58 : 147}
                                            value={hipsInput}
                                            onChange={e => setHipsInput(parseInt(e.target.value))}
                                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#D4AF37] dark:bg-zinc-800"
                                        />
                                    </div>

                                    {/* UNDERBUST SLIDER */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] uppercase tracking-wider text-gray-450 font-bold">Underbust (Corset Base Band)</span>
                                            <span className="text-sm font-serif font-bold text-gray-500">
                                                {underbustInput} {unit === 'inch' ? '"' : 'cm'}
                                            </span>
                                        </div>
                                        <input 
                                            type="range"
                                            min={unit === 'inch' ? 24 : 60}
                                            max={unit === 'inch' ? 48 : 122}
                                            value={underbustInput}
                                            onChange={e => setUnderbustInput(parseInt(e.target.value))}
                                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-zinc-400 dark:bg-zinc-800"
                                        />
                                    </div>

                                    {/* Optional Secondary Inputs */}
                                    <div className="grid gap-4 grid-cols-2 pt-2 border-t border-gray-100 dark:border-zinc-850">
                                        <div className="space-y-1">
                                            <label className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Shoulder Width</label>
                                            <input 
                                                type="number"
                                                className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs"
                                                value={shoulderInput}
                                                onChange={e => setShoulderInput(parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Hollow-to-Hem</label>
                                            <input 
                                                type="number"
                                                className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs"
                                                value={lengthInput}
                                                onChange={e => setLengthInput(parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Analysis Panel (5 Cols) */}
                            <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900/60 border border-gray-150/80 dark:border-zinc-800 rounded-2xl p-6 space-y-6">
                                <div className="border-b border-gray-100 dark:border-zinc-800 pb-3 flex items-center space-x-2">
                                    <Sparkles className="h-4 w-4 text-brand-gold animate-pulse" />
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-black dark:text-white">Pattern Blueprint</h4>
                                </div>

                                {analysis && (
                                    <div className="space-y-6">
                                        {/* Estimated size */}
                                        <div className="space-y-1">
                                            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Base Size Estimate</span>
                                            <div className="text-2xl font-serif font-bold text-gray-900 dark:text-white">{analysis.size}</div>
                                        </div>

                                        {/* Silhouette Badge */}
                                        <div className="bg-brand-gold/10 border border-brand-gold/20 p-3.5 rounded-xl space-y-1">
                                            <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold block">Silhouette Category:</span>
                                            <span className="text-sm font-bold text-brand-black dark:text-white">{analysis.silhouette}</span>
                                            <p className="text-[11px] text-gray-505 dark:text-gray-400 mt-1 leading-relaxed">{analysis.silhouetteDesc}</p>
                                        </div>

                                        {/* Mixed Pattern Check */}
                                        <div className="space-y-2 bg-white dark:bg-zinc-900/40 p-4 rounded-xl border border-gray-150/40 dark:border-zinc-800">
                                            <div className="flex items-center space-x-1.5 border-b border-gray-50 dark:border-zinc-850 pb-2">
                                                <Layers className="h-3.5 w-3.5 text-zinc-400" />
                                                <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Mixed Grading Breakdown</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                                                <div className="p-1 bg-gray-50 dark:bg-zinc-850 rounded">
                                                    <span className="text-[8px] text-gray-400 uppercase font-semibold">Bust</span>
                                                    <div className="text-xs font-serif font-bold text-gray-800 dark:text-gray-300 mt-0.5">{analysis.mixedBust}</div>
                                                </div>
                                                <div className="p-1 bg-gray-50 dark:bg-zinc-850 rounded">
                                                    <span className="text-[8px] text-gray-400 uppercase font-semibold">Waist</span>
                                                    <div className="text-xs font-serif font-bold text-gray-800 dark:text-gray-300 mt-0.5">{analysis.mixedWaist}</div>
                                                </div>
                                                <div className="p-1 bg-gray-50 dark:bg-zinc-850 rounded">
                                                    <span className="text-[8px] text-gray-400 uppercase font-semibold">Hips</span>
                                                    <div className="text-xs font-serif font-bold text-gray-800 dark:text-gray-300 mt-0.5">{analysis.mixedHips}</div>
                                                </div>
                                            </div>
                                            {analysis.isMixed && (
                                                <p className="text-[10px] text-brand-gold italic mt-2.5 leading-normal">
                                                    *Note: Your body blends multiple sizes. Christiana Naamenoman will custom-grade your fabric pattern between these zones for an optimal tailored look.
                                                </p>
                                            )}
                                        </div>

                                        {/* Atelier recommendation */}
                                        <div className="space-y-1.5 border-t border-gray-100 dark:border-zinc-800 pt-4">
                                            <span className="text-[9px] uppercase tracking-wider text-gray-450 font-bold block block">Tailoring Advice:</span>
                                            <p className="text-xs text-gray-505 dark:text-gray-400 leading-relaxed font-serif italic">
                                                "{analysis.atelierAdvice}"
                                            </p>
                                        </div>

                                        <div className="pt-2">
                                            <a 
                                                href={route('book') + `?notes=${encodeURIComponent(
                                                    `Estimated Pattern: ${analysis.size}. Silhouette: ${analysis.silhouette}. Details: Bust ${bustInput}${unit}, Waist ${waistInput}${unit}, Hips ${hipsInput}${unit}, Underbust ${underbustInput}${unit}, Shoulder ${shoulderInput}${unit}, Hollow-to-Hem ${lengthInput}${unit}`
                                                )}`}
                                                className="block text-center bg-brand-black text-white hover:bg-brand-gold hover:text-brand-black py-3.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-xl shadow-md hover:shadow-lg"
                                            >
                                                Book Custom Pattern Fitting
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Booking Callout */}
                    <div className="mt-20 rounded-3xl bg-brand-cream/10 dark:bg-brand-black/30 border border-brand-gold/10 p-10 text-center space-y-6">
                        <div className="flex justify-center">
                            <Info className="h-8 w-8 text-brand-gold" />
                        </div>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-black dark:text-white">
                            Need Professional Assistance?
                        </h3>
                        <p className="max-w-xl mx-auto text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            For high-fashion custom sizing or structural wedding corsets, we recommend scheduling an in-studio appointment. Christiana Naamenoman will personally take your measurements in our Accra studio.
                        </p>
                        <a 
                            href={route('book')}
                            className="inline-block bg-brand-black dark:bg-brand-gold hover:bg-brand-gold hover:text-brand-black dark:text-brand-black dark:hover:bg-white px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all rounded-full shadow-lg hover:shadow-brand-gold/20"
                        >
                            Book Studio Sizing Session
                        </a>
                    </div>

                </div>
            </section>
        </PublicLayout>
    );
}
