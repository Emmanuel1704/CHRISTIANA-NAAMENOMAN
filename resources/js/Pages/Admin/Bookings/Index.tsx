import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Check, X, Trash, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Booking {
    id: number;
    customer_name: string;
    phone: string;
    email: string;
    service_type: string;
    appointment_date: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed';
    notes: string;
}

interface Props {
    bookings: Booking[];
}

export default function Index({ bookings }: Props) {
    const updateStatus = (id: number, status: string) => {
        router.patch(route('bookings.update', id), { status });
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
                                                    {booking.notes && <p className="mt-1 text-xs text-gray-400 max-w-xs truncate">{booking.notes}</p>}
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
            </div>
        </AuthenticatedLayout>
    );
}
