import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, ArrowRight, RefreshCw, MessageCircle } from 'lucide-react';

interface ChatMessage {
    id: number;
    sender: 'bot' | 'user';
    text: string;
    timestamp: Date;
}

export default function WhatsAppChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [hasOpened, setHasOpened] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [lastQuery, setLastQuery] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const whatsappNumber = '233557485934';

    const quickActions = [
        { label: '👗 Bridal Gown Inquiry', text: 'How much do bridal gowns cost and how long does it take?' },
        { label: '📐 Sizing & Measurements', text: 'Where can I find the size guide and what measurements do you need?' },
        { label: '📅 Book Custom Fitting', text: 'I want to book an appointment for a custom dress fitting.' },
        { label: '📍 Studio Location & Hours', text: 'Where is your studio located and when are you open?' },
    ];

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, showOptions]);

    // Handle bot greeting sequence on first open
    useEffect(() => {
        if (isOpen && !hasOpened) {
            setHasOpened(true);
            triggerGreeting();
        }
    }, [isOpen, hasOpened]);

    const triggerGreeting = () => {
        setIsTyping(true);
        const timer1 = setTimeout(() => {
            setMessages([
                {
                    id: 1,
                    sender: 'bot',
                    text: 'Welcome to Chrisnoman Fashion House. ✨ I am your digital atelier assistant.',
                    timestamp: new Date(),
                },
            ]);
            setIsTyping(false);

            setTimeout(() => {
                setIsTyping(true);
                const timer2 = setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: 2,
                            sender: 'bot',
                            text: "You can ask me questions here on our live chat, or click the WhatsApp button to chat directly with Christiana Naamenomah! How would you like to proceed?",
                            timestamp: new Date(),
                        },
                    ]);
                    setIsTyping(false);
                    setShowOptions(true); // show the WhatsApp and AI Chat options immediately!
                }, 1000);
            }, 600);
        }, 600);
    };

    const getBotResponse = (query: string): string => {
        const text = query.toLowerCase();
        
        if (text.includes('bridal') || text.includes('wedding') || text.includes('gown') || text.includes('dress')) {
            return "Our luxury bespoke bridal gowns start from GH₵2,500.00. Each dress is custom crafted with hand-beading, premium silk tulle, and French lace. The entire process takes between 4 to 8 weeks, including fittings. 👗";
        }
        if (text.includes('price') || text.includes('cost') || text.includes('how much') || text.includes('pricing')) {
            return "Here is our base pricing list:\n• casual wrapper styles: from GH₵450\n• structured corset tops: from GH₵850\n• occasion gowns: from GH₵1,200\n• luxury bridal wear: from GH₵2,500\n\nAll garments are tailored exactly to your unique silhouette. ✨";
        }
        if (text.includes('book') || text.includes('appointment') || text.includes('fitting')) {
            return "We'd love to draft a custom pattern for you! You can book a fitting session directly on our Book page. Fitting consultations take about 30-45 minutes. 📅";
        }
        if (text.includes('size') || text.includes('measure') || text.includes('chart') || text.includes('guide')) {
            return "We tailor every garment to your custom sizing! You can view our measurement guidelines on our Size Guide page. If you already know your measurements, we can note them down directly! 📐";
        }
        if (text.includes('location') || text.includes('where') || text.includes('address') || text.includes('studio') || text.includes('open')) {
            return "Our private atelier studio is located at Korle Nkwanta. We are open Monday to Saturday, strictly by appointment, to guarantee a dedicated and personal consultation. 📍";
        }
        
        return "That sounds like a beautiful project! To give you the best bespoke answer, I can connect you directly with our design team on WhatsApp. 💖";
    };

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        setLastQuery(text);
        setShowOptions(false);

        // 1. Add User Message
        const userMsgId = Date.now();
        setMessages((prev) => [
            ...prev,
            { id: userMsgId, sender: 'user', text, timestamp: new Date() },
        ]);
        setInputValue('');

        // 2. Trigger Bot Typing & Response
        setIsTyping(true);
        setTimeout(() => {
            const botAnswer = getBotResponse(text);
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: botAnswer,
                    timestamp: new Date(),
                },
            ]);
            setIsTyping(false);

            // 3. Show follow up action options
            setTimeout(() => {
                setIsTyping(true);
                setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: Date.now() + 2,
                            sender: 'bot',
                            text: "Would you like to connect with Christiana on WhatsApp to finalize or ask another question?",
                            timestamp: new Date(),
                        },
                    ]);
                    setIsTyping(false);
                    setShowOptions(true);
                }, 800);
            }, 600);
        }, 1200);
    };

    const handleWhatsAppRedirect = () => {
        const queryText = lastQuery || "Hello! I would like to inquire about Chrisnoman designs.";
        const encodedText = encodeURIComponent(queryText);
        const url = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleAskAnotherQuestion = () => {
        setShowOptions(false);
        setIsTyping(true);
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    sender: 'bot',
                    text: "Sure! What else would you like to know? You can type a question below or choose from the list.",
                    timestamp: new Date(),
                },
            ]);
            setIsTyping(false);
        }, 800);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                        className="mb-4 flex h-[480px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-gray-150 bg-white/95 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/95"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b-2 border-brand-gold bg-brand-black px-4 py-3 text-white dark:bg-black">
                            <div className="flex items-center space-x-3">
                                {/* Logo Avatar */}
                                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-brand-black font-serif font-bold text-lg">
                                    C
                                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-brand-black bg-green-500 animate-pulse" />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-sm tracking-wide">Christiana Naamenomah</h4>
                                    <p className="text-[10px] text-gray-400">Atelier Assistant • Online</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleWhatsAppRedirect}
                                    className="p-1.5 bg-[#25D366] text-white rounded-full hover:bg-[#20ba5a] transition-all"
                                    title="Connect Directly on WhatsApp"
                                >
                                    <MessageCircle className="h-4 w-4 fill-current" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full p-1.5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-brand-cream/5 to-transparent dark:from-transparent">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs shadow-sm leading-relaxed whitespace-pre-line ${
                                            msg.sender === 'user'
                                                ? 'bg-brand-black text-white rounded-tr-none dark:bg-brand-gold dark:text-brand-black'
                                                : 'bg-gray-100 text-gray-800 rounded-tl-none dark:bg-zinc-800 dark:text-gray-200'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex space-x-1 items-center">
                                        <div className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}

                            {/* Interactive Options (WhatsApp Transition or Reset) */}
                            {showOptions && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col space-y-2 pt-2"
                                >
                                    <button
                                        onClick={handleWhatsAppRedirect}
                                        className="flex items-center justify-between w-full bg-[#25D366] text-white hover:bg-[#20ba5a] rounded-xl px-4 py-3 text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
                                    >
                                        <span>🟢 Chat on WhatsApp</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={handleAskAnotherQuestion}
                                        className="flex items-center justify-between w-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 hover:border-brand-gold hover:text-brand-black dark:hover:text-white rounded-xl px-4 py-3 text-xs font-bold transition-all shadow-sm cursor-pointer"
                                    >
                                        <span>💬 Chat with Live AI</span>
                                        <RefreshCw className="h-3.5 w-3.5" />
                                    </button>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Action Options */}
                        {messages.length >= 2 && !isTyping && !showOptions && (
                            <div className="px-4 py-2 border-t border-gray-100 dark:border-zinc-800 max-h-[130px] overflow-y-auto bg-gray-50/50 dark:bg-zinc-950/20 space-y-1.5">
                                <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold mb-1">Frequently Asked Questions:</p>
                                <div className="flex flex-col gap-1.5 pb-1">
                                    {quickActions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSendMessage(action.text)}
                                            className="text-left w-full border border-gray-200 dark:border-zinc-800 hover:border-brand-gold bg-white dark:bg-zinc-900 rounded-lg px-3 py-1.5 text-[10px] text-gray-700 dark:text-gray-300 font-medium hover:text-brand-black dark:hover:text-white transition-all shadow-sm hover:shadow-md cursor-pointer"
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage(inputValue);
                            }}
                            className="border-t border-gray-100 dark:border-zinc-800 p-3 bg-white dark:bg-zinc-900 flex items-center space-x-2"
                        >
                            <input
                                type="text"
                                placeholder={showOptions ? "Choose an option above..." : "Type a question..."}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={showOptions}
                                className="flex-1 bg-gray-50 dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold focus:ring-0 dark:text-white transition-colors disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || showOptions}
                                className="bg-brand-gold text-brand-black disabled:bg-gray-100 disabled:text-gray-400 p-2.5 rounded-xl hover:bg-brand-black hover:text-white dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 transition-all cursor-pointer shadow-sm"
                            >
                                <Send className="h-3.5 w-3.5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <div className="relative group">
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 cursor-pointer focus:outline-none"
                >
                    {/* Ping ring */}
                    {!isOpen && (
                        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping opacity-75" />
                    )}
                    
                    {isOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <MessageSquare className="h-6 w-6 fill-current" />
                    )}

                    {/* Subtle unread dot */}
                    {!isOpen && !hasOpened && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[9px] font-bold text-brand-black shadow-md animate-bounce">
                            1
                        </span>
                    )}
                </motion.button>
                {/* Floating tooltip */}
                {!isOpen && (
                    <div className="absolute right-16 top-3 bg-brand-black text-brand-gold text-[9px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-brand-gold/25">
                        Chat & WhatsApp Support
                    </div>
                )}
            </div>
        </div>
    );
}
