import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Trash, Users, Mail } from 'lucide-react';

interface Subscriber {
    id: number;
    email: string;
    created_at: string;
}

interface Props {
    subscribers: {
        data: Subscriber[];
        links: any[];
    };
}

export default function Index({ subscribers }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to remove this subscriber?')) {
            router.delete(route('subscribers.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl font-bold leading-tight text-gray-800">
                        Newsletter Subscribers
                    </h2>
                </div>
            }
        >
            <Head title="Manage Subscribers" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            
                            {subscribers.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-gray-400 uppercase text-[10px] tracking-widest bg-gray-50/50">
                                                <th className="py-4 px-6 font-bold">Email Address</th>
                                                <th className="py-4 px-6 font-bold">Date Subscribed</th>
                                                <th className="py-4 px-6 font-bold text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {subscribers.data.map((sub) => (
                                                <tr key={sub.id} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6 font-medium text-gray-900 flex items-center space-x-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 text-pink-500">
                                                            <Mail className="h-4 w-4" />
                                                        </div>
                                                        <a href={`mailto:${sub.email}`} className="hover:text-brand-gold transition-colors">
                                                            {sub.email}
                                                        </a>
                                                    </td>
                                                    <td className="py-4 px-6 text-gray-500">
                                                        {new Date(sub.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="py-4 px-6 text-right">
                                                        <button 
                                                            onClick={() => handleDelete(sub.id)}
                                                            className="inline-flex items-center justify-center rounded border border-red-100 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
                                                        >
                                                            <Trash className="mr-1 h-3 w-3" />
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="py-20 text-center">
                                    <Users className="mx-auto h-12 w-12 text-gray-200" />
                                    <h3 className="mt-4 text-sm font-medium text-gray-900">No subscribers yet</h3>
                                    <p className="mt-1 text-sm text-gray-500">When users join your newsletter, they will appear here.</p>
                                </div>
                            )}

                            {/* Pagination would go here if implemented */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
