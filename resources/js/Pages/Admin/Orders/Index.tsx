import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Banknote, Package, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    collection: {
        title: string;
    };
}

interface Order {
    id: number;
    customer_name: string;
    email: string;
    phone: string;
    address: string;
    total_amount: number;
    status: string;
    created_at: string;
    items: OrderItem[];
}

interface Props {
    orders: Order[];
}

export default function Index({ orders }: Props) {
    const [processingId, setProcessingId] = useState<number | null>(null);

    const updateStatus = (orderId: number, status: string) => {
        setProcessingId(orderId);
        router.patch(route('orders.update', orderId), { status }, {
            onFinish: () => setProcessingId(null)
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-serif text-2xl font-bold leading-tight text-gray-800">Manage Revenue & Orders</h2>}
        >
            <Head title="Orders & Revenue" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-gray-100">
                        <div className="p-8">
                            {orders.length === 0 ? (
                                <div className="text-center py-12">
                                    <Banknote className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                    <p className="text-gray-500 font-medium">No orders found yet.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm whitespace-nowrap">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] tracking-widest bg-gray-50">
                                                <th className="p-4 font-bold rounded-tl-lg">Order ID</th>
                                                <th className="p-4 font-bold">Customer</th>
                                                <th className="p-4 font-bold">Contact</th>
                                                <th className="p-4 font-bold">Total Amount</th>
                                                <th className="p-4 font-bold">Status</th>
                                                <th className="p-4 font-bold text-right rounded-tr-lg">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {orders.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="p-4 font-medium text-gray-900">#{order.id}</td>
                                                    <td className="p-4 text-gray-800 font-medium">{order.customer_name}</td>
                                                    <td className="p-4 text-gray-500">{order.phone}</td>
                                                    <td className="p-4 font-bold text-[#D4AF37]">GH₵{order.total_amount.toLocaleString()}</td>
                                                    <td className="p-4">
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {order.status === 'completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                                                            {order.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <select
                                                            className="text-xs border-gray-200 rounded-md shadow-sm focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37] focus:ring-opacity-50"
                                                            value={order.status}
                                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                                            disabled={processingId !== null}
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="processing">Processing</option>
                                                            <option value="completed">Completed</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
