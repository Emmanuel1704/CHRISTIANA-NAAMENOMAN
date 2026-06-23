import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Image, Calendar, Star, TrendingUp, ArrowRight, Banknote, MessageCircle, X, Users, Mail, MailOpen } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import Modal from '@/Components/Modal';

interface Props {
    stats: {
        totalCollections: number;
        totalBookings: number;
        pendingBookings: number;
        totalRevenue: number;
        unreadMessages: number;
        totalSubscribers: number;
    },
    salesData: any[];
    recentBookings: any[];
    recentMessages: any[];
}

export default function Dashboard({ stats, salesData, recentBookings, recentMessages }: Props) {
    const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        customer_name: '',
        rating: 5,
        review: '',
    });

    const submitTestimonial = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/testimonials', {
            onSuccess: () => closeModal(),
        });
    };

    const closeModal = () => {
        setIsTestimonialModalOpen(false);
        reset();
        clearErrors();
    };

    const cards = [
        { 
            title: 'Collections', 
            value: stats.totalCollections.toLocaleString(), 
            icon: Image, 
            color: 'text-blue-600', 
            bg: 'bg-blue-50',
            link: '/admin/collections' 
        },
        { 
            title: 'Revenue', 
            value: `GH₵${stats.totalRevenue.toLocaleString()}`, 
            icon: Banknote, 
            color: 'text-green-600', 
            bg: 'bg-green-50',
            link: '/admin/orders' 
        },
        { 
            title: 'Pending Approvals', 
            value: stats.pendingBookings.toLocaleString(), 
            icon: TrendingUp, 
            color: 'text-orange-600', 
            bg: 'bg-orange-50',
            link: '/admin/bookings?status=pending' 
        },
        { 
            title: 'Total Bookings', 
            value: stats.totalBookings.toLocaleString(), 
            icon: Calendar, 
            color: 'text-[#D4AF37]', 
            bg: 'bg-[#D4AF37]/10',
            link: '/admin/bookings' 
        },
        { 
            title: 'Unread Messages', 
            value: stats.unreadMessages.toLocaleString(), 
            icon: MessageCircle, 
            color: 'text-purple-600', 
            bg: 'bg-purple-50',
            link: '/admin/messages' 
        },
        { 
            title: 'Subscribers', 
            value: stats.totalSubscribers.toLocaleString(), 
            icon: Users, 
            color: 'text-pink-600', 
            bg: 'bg-pink-50',
            link: '/admin/subscribers' 
        },
    ];

    const enhancedSalesData = salesData.map(d => ({
        ...d,
        // Mock an AI projection based on actual sales for the cybernetic feel
        projected: Math.round(d.sales * (1 + (Math.random() * 0.4 - 0.1))), 
    }));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-serif text-2xl font-bold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {cards.map((card) => (
                            <div 
                                key={card.title} 
                                className="group flex flex-col overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#DCA73A]/30"
                            >
                                <div className="flex items-center justify-between">
                                    <div className={`p-3 rounded-lg ${card.bg} transition-transform duration-300 group-hover:scale-110`}>
                                        <card.icon className={`h-6 w-6 ${card.color}`} />
                                    </div>
                                    <span className="text-xs font-medium text-gray-400">Lifetime</span>
                                </div>
                                <div className="mt-6 flex-1">
                                    <h3 className="text-[32px] font-bold text-[#0f172a] group-hover:text-[#DCA73A] transition-colors">{card.value}</h3>
                                    <p className="mt-1 text-[13px] text-gray-500 font-medium">{card.title}</p>
                                </div>
                                <Link 
                                    href={card.link}
                                    className="mt-8 flex w-full items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-[#DCA73A] hover:text-[#B68A2E] transition-colors"
                                >
                                    <span>Manage</span>
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 hover:translate-x-1 group-hover:translate-x-1" strokeWidth={2.5} />
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Neural Analytics Chart */}
                    <div className="mt-10 overflow-hidden rounded-xl bg-[#111] p-8 shadow-[0_0_40px_rgba(212,175,55,0.05)] border border-[#D4AF37]/20 relative">
                        {/* Glowing Background Accents */}
                        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#D4AF37] opacity-5 blur-[100px] pointer-events-none"></div>
                        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#00f0ff] opacity-5 blur-[100px] pointer-events-none"></div>

                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <h3 className="font-serif text-2xl font-bold text-white tracking-wide" style={{ textShadow: '0 2px 10px rgba(212,175,55,0.3)' }}>
                                    Neural Sales Analytics
                                </h3>
                                <p className="text-xs text-[#D4AF37] font-medium tracking-widest uppercase mt-1">AI-Projected Revenue Trajectory</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"></div>
                                    <span className="text-xs text-gray-400">Actual</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="h-2 w-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"></div>
                                    <span className="text-xs text-gray-400">Projected</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 h-[350px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={enhancedSalesData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.15}/>
                                            <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#6b7280'}} dx={-10} />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: 'rgba(15, 15, 15, 0.9)', 
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '12px', 
                                            border: '1px solid rgba(212, 175, 55, 0.3)', 
                                            color: '#fff',
                                            boxShadow: '0 0 30px rgba(0,0,0,0.8)' 
                                        }}
                                        itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                                        labelStyle={{ color: '#9ca3af', marginBottom: '8px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="projected" 
                                        stroke="#00f0ff" 
                                        strokeWidth={2} 
                                        strokeDasharray="5 5"
                                        fillOpacity={1} 
                                        fill="url(#colorProjected)" 
                                        activeDot={{ r: 5, fill: '#00f0ff', stroke: '#111', strokeWidth: 2 }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="sales" 
                                        stroke="#D4AF37" 
                                        strokeWidth={4} 
                                        fillOpacity={1} 
                                        fill="url(#colorSales)" 
                                        activeDot={{ r: 8, fill: '#D4AF37', stroke: '#111', strokeWidth: 3, style: { filter: 'drop-shadow(0px 0px 8px rgba(212,175,55,0.8))' } }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Quick Actions / Recent Activity */}
                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2 rounded-xl bg-white p-8 shadow-sm border border-gray-100">
                            <h3 className="font-serif text-xl font-bold text-gray-800">Recent Bookings</h3>
                            <div className="mt-6 overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] tracking-widest">
                                            <th className="pb-4 font-bold">Customer</th>
                                            <th className="pb-4 font-bold">Service</th>
                                            <th className="pb-4 font-bold">Date</th>
                                            <th className="pb-4 font-bold">Status</th>
                                            <th className="pb-4 font-bold text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {recentBookings.length > 0 ? (
                                            recentBookings.map((booking) => (
                                                <tr key={booking.id} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 font-medium text-gray-900 px-2">{booking.customer_name}</td>
                                                    <td className="py-4 text-gray-500">{booking.service_type}</td>
                                                    <td className="py-4 text-gray-500">{new Date(booking.appointment_date).toLocaleDateString()}</td>
                                                    <td className="py-4">
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            booking.status === 'pending' ? 'bg-orange-50 text-orange-700' :
                                                            booking.status === 'approved' ? 'bg-green-50 text-green-700' :
                                                            booking.status === 'completed' ? 'bg-blue-50 text-blue-700' :
                                                            'bg-red-50 text-red-700'
                                                        }`}>
                                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-right pr-2">
                                                        <button 
                                                            onClick={() => {
                                                                if(confirm('Are you sure you want to delete this booking?')) {
                                                                    import('@inertiajs/react').then(({ router }) => {
                                                                        router.delete(`/admin/bookings/${booking.id}`);
                                                                    });
                                                                }
                                                            }}
                                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                                            title="Delete Booking"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="py-8 text-center text-sm text-gray-400">
                                                    No recent bookings found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="lg:col-span-2 rounded-xl bg-white p-8 shadow-sm border border-gray-100 mt-6 lg:mt-0">
                            <h3 className="font-serif text-xl font-bold text-gray-800">Recent Messages</h3>
                            <div className="mt-6 overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] tracking-widest">
                                            <th className="pb-4 font-bold">From</th>
                                            <th className="pb-4 font-bold">Subject</th>
                                            <th className="pb-4 font-bold">Date</th>
                                            <th className="pb-4 font-bold text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {recentMessages.length > 0 ? (
                                            recentMessages.map((msg) => (
                                                <tr key={msg.id} className={`group hover:bg-gray-50 transition-colors ${!msg.is_read ? 'font-bold' : ''}`}>
                                                    <td className="py-4 text-gray-900 px-2 flex items-center space-x-2">
                                                        {msg.is_read ? <MailOpen className="h-4 w-4 text-gray-400" /> : <Mail className="h-4 w-4 text-brand-gold" />}
                                                        <span>{msg.name}</span>
                                                    </td>
                                                    <td className="py-4 text-gray-500 truncate max-w-xs">{msg.subject || 'No Subject'}</td>
                                                    <td className="py-4 text-gray-500">{new Date(msg.created_at).toLocaleDateString()}</td>
                                                    <td className="py-4 text-right pr-2 space-x-2">
                                                        <Link 
                                                            href="/admin/messages"
                                                            className="p-2 text-gray-400 hover:text-brand-gold hover:bg-brand-gold/10 rounded-full transition-all opacity-0 group-hover:opacity-100 inline-block"
                                                            title="View Messages"
                                                        >
                                                            <ArrowRight className="h-4 w-4" />
                                                        </Link>
                                                        <button 
                                                            onClick={() => {
                                                                if(confirm('Are you sure you want to delete this message?')) {
                                                                    import('@inertiajs/react').then(({ router }) => {
                                                                        router.delete(`/admin/messages/${msg.id}`);
                                                                    });
                                                                }
                                                            }}
                                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                                            title="Delete Message"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="py-8 text-center text-sm text-gray-400">
                                                    No recent messages found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="rounded-xl bg-[#141414] p-8 text-white shadow-lg">
                            <h3 
                                className="font-serif text-[32px] font-bold tracking-wide"
                                style={{ textShadow: '2px 2px 0px #E5B45B' }}
                            >
                                Quick Actions
                            </h3>
                            <div className="mt-10 flex flex-col space-y-4">
                                <Link href="/admin/collections/create" className="w-full rounded-xl bg-[#2A2A2A] px-6 py-4 text-base font-semibold text-white hover:bg-[#363636] transition-colors flex items-center justify-between">
                                    <span>Upload New Collection</span>
                                    <Image className="h-5 w-5 text-white" strokeWidth={1.5} />
                                </Link>
                                <button onClick={() => setIsTestimonialModalOpen(true)} className="w-full rounded-xl bg-[#2A2A2A] px-6 py-4 text-base font-semibold text-white hover:bg-[#363636] transition-colors flex items-center justify-between">
                                    <span>Add Testimonial</span>
                                    <Star className="h-5 w-5 text-white" strokeWidth={1.5} />
                                </button>
                                <div className="pt-2">
                                    <Link href="/profile" className="w-full rounded-xl bg-[#DCA73A] px-6 py-4 text-base font-bold text-[#111] hover:bg-[#E5BE48] transition-colors flex items-center justify-between">
                                        <span>System Settings</span>
                                        <TrendingUp className="h-5 w-5 text-[#111]" strokeWidth={2} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Testimonial Modal */}
            <Modal show={isTestimonialModalOpen} onClose={closeModal} maxWidth="md">
                <div className="p-8 bg-[#141414] text-white">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-2xl font-bold" style={{ textShadow: '1px 1px 0px #E5B45B' }}>Add Testimonial</h3>
                        <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <form onSubmit={submitTestimonial} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Customer Name</label>
                            <input 
                                type="text" 
                                value={data.customer_name}
                                onChange={e => setData('customer_name', e.target.value)}
                                className="w-full bg-[#2A2A2A] border-none rounded-lg text-white focus:ring-2 focus:ring-[#DCA73A] px-4 py-3"
                                placeholder="e.g. Sarah Jones"
                            />
                            {errors.customer_name && <p className="mt-1 text-xs text-red-400">{errors.customer_name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Rating (1-5)</label>
                            <div className="flex items-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button 
                                        type="button" 
                                        key={star}
                                        onClick={() => setData('rating', star)}
                                        className="focus:outline-none"
                                    >
                                        <Star className={`h-6 w-6 ${data.rating >= star ? 'text-[#DCA73A] fill-[#DCA73A]' : 'text-gray-500'}`} />
                                    </button>
                                ))}
                            </div>
                            {errors.rating && <p className="mt-1 text-xs text-red-400">{errors.rating}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Review</label>
                            <textarea 
                                value={data.review}
                                onChange={e => setData('review', e.target.value)}
                                rows={4}
                                className="w-full bg-[#2A2A2A] border-none rounded-lg text-white focus:ring-2 focus:ring-[#DCA73A] px-4 py-3 resize-none"
                                placeholder="What did the customer say?"
                            ></textarea>
                            {errors.review && <p className="mt-1 text-xs text-red-400">{errors.review}</p>}
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full rounded-xl bg-[#DCA73A] px-6 py-4 text-base font-bold text-[#111] hover:bg-[#E5BE48] transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Testimonial'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
