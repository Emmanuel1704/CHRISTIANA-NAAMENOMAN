import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Check, X, Trash, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Booking {
    id: number;
    customer_name: string;
    phone: string;
    email: string;
    service_type: string;
    fabric_option: string;
    fabric_image_path: string | null;
    style_image_path: string | null;
    appointment_date: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    production_stage: string;
    notes: string;
}

interface Props {
    bookings: Booking[];
}

export default function Index({ bookings }: Props) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const updateStatus = (id: number, status: string) => {
        router.patch(route('bookings.update', id), { status });
    };

    const updateProductionStage = (id: number, stage: string) => {
        router.patch(route('bookings.update', id), { production_stage: stage });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this booking?')) {
            router.delete(route('bookings.destroy', id));
        }
    };

    const statusColors = {
        pending: 'bg-orange-50 text-orange-700',
        approved: 'bg-green-50 text-green-700',
        rejected: 'bg-red-50 text-red-700',
        completed: 'bg-blue-50 text-blue-700',
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-serif text-2xl font-bold leading-tight text-gray-800">
                    Manage Appointments
                </h2>
            }
        >
            <Head title="Manage Appointments" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl border border-gray-100">
                        <div className="p-8">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] tracking-[0.2em] font-bold">
                                            <th className="pb-4">Customer</th>
                                            <th className="pb-4">Service Details</th>
                                            <th className="pb-4">Date</th>
                                            <th className="pb-4">Status</th>
                                            <th className="pb-4">Tailoring Stage</th>
                                            <th className="pb-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {bookings.map((booking) => (
                                            <tr key={booking.id} className="group">
                                                <td className="py-6">
                                                    <div className="font-serif text-lg font-bold text-gray-900">{booking.customer_name}</div>
                                                    <div className="mt-1 flex items-center space-x-4 text-xs text-gray-400">
                                                        <span className="flex items-center space-x-1"><Phone className="h-3 w-3" /> <span>{booking.phone}</span></span>
                                                        <span className="flex items-center space-x-1"><Mail className="h-3 w-3" /> <span>{booking.email}</span></span>
                                                    </div>
                                                </td>
                                                <td className="py-6">
                                                    <div className="font-medium text-gray-700">{booking.service_type}</div>
                                                    <div className="text-[11px] text-[#D4AF37] font-semibold mt-0.5">{booking.fabric_option}</div>
                                                    {booking.notes && <p className="mt-1 text-xs text-gray-400 max-w-xs truncate" title={booking.notes}>{booking.notes}</p>}
                                                    
                                                    {/* Uploaded Material & Style Images */}
                                                    {(booking.fabric_image_path || booking.style_image_path) && (
                                                        <div className="flex items-center space-x-3 mt-3">
                                                            {booking.fabric_image_path && (
                                                                <div className="group relative h-12 w-12 rounded bg-gray-50 border border-gray-150 overflow-hidden cursor-pointer" onClick={() => setSelectedImage(booking.fabric_image_path)}>
                                                                    <img src={booking.fabric_image_path} alt="Fabric" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <span className="text-[8px] text-white font-bold tracking-wider">Fabric</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {booking.style_image_path && (
                                                                <div className="group relative h-12 w-12 rounded bg-gray-50 border border-gray-150 overflow-hidden cursor-pointer" onClick={() => setSelectedImage(booking.style_image_path)}>
                                                                    <img src={booking.style_image_path} alt="Style" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <span className="text-[8px] text-white font-bold tracking-wider">Style</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-6">
                                                    <div className="text-gray-900">{new Date(booking.appointment_date).toLocaleDateString()}</div>
                                                    <div className="text-xs text-gray-400">{new Date(booking.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                </td>
                                                <td className="py-6">
                                                    <span className={cn(
                                                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest",
                                                        statusColors[booking.status]
                                                    )}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="py-6">
                                                    <select 
                                                        value={booking.production_stage || 'pending'} 
                                                        onChange={e => updateProductionStage(booking.id, e.target.value)}
                                                        className="text-xs bg-gray-50 border border-gray-250 rounded-lg p-2 focus:border-brand-gold outline-none"
                                                    >
                                                        <option value="pending">Awaiting Approval</option>
                                                        <option value="confirmed">Confirmed Queue</option>
                                                        <option value="pattern_drafting">Pattern Drafting</option>
                                                        <option value="fitting_scheduled">Fitting Scheduled</option>
                                                        <option value="embellishing">Embellishing</option>
                                                        <option value="ready_for_pickup">Ready for Pickup</option>
                                                        <option value="completed">Completed & Delivered</option>
                                                    </select>
                                                </td>
                                                <td className="py-6 text-right">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        {booking.status === 'pending' && (
                                                            <>
                                                                <button 
                                                                    onClick={() => updateStatus(booking.id, 'approved')}
                                                                    className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                                                                    title="Approve"
                                                                >
                                                                    <Check className="h-5 w-5" />
                                                                </button>
                                                                <button 
                                                                    onClick={() => updateStatus(booking.id, 'rejected')}
                                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                                    title="Reject"
                                                                >
                                                                    <X className="h-5 w-5" />
                                                                </button>
                                                            </>
                                                        )}
                                                        {booking.status === 'approved' && (
                                                            <button 
                                                                onClick={() => updateStatus(booking.id, 'completed')}
                                                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                                title="Mark as Completed"
                                                            >
                                                                <Check className="h-5 w-5" />
                                                            </button>
                                                        )}
                                                        <button 
                                                            onClick={() => handleDelete(booking.id)}
                                                            className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {bookings.length === 0 && (
                                <div className="py-20 text-center text-gray-400 font-medium">
                                    No appointment requests yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            {/* Image Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 transition-all duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button className="absolute top-6 right-6 text-white hover:text-[#D4AF37] transition-colors">
                        <X className="h-8 w-8" />
                    </button>
                    <img 
                        src={selectedImage} 
                        alt="Enlarged design material" 
                        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg border-2 border-white/10 shadow-2xl animate-zoom-in"
                    />
                </div>
            )}
            </div>
        </AuthenticatedLayout>
    );
}
