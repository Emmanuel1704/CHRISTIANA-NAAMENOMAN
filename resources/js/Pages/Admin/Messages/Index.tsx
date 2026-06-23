import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Trash, MessageCircle, MailOpen, Mail } from 'lucide-react';

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface Props {
    messages: {
        data: Message[];
        links: any[];
    };
}

export default function Index({ messages }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(route('messages.destroy', id));
        }
    };

    const toggleReadStatus = (id: number, currentStatus: boolean) => {
        router.put(route('messages.update', id), {
            is_read: !currentStatus
        }, {
            preserveScroll: true
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl font-bold leading-tight text-gray-800">
                        Customer Messages
                    </h2>
                </div>
            }
        >
            <Head title="Manage Messages" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="space-y-6">
                                {messages.data.map((msg) => (
                                    <div 
                                        key={msg.id} 
                                        className={`group relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-md ${
                                            msg.is_read ? 'bg-gray-50 border-gray-100' : 'bg-white border-brand-gold/20 shadow-sm'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-4">
                                                <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${
                                                    msg.is_read ? 'bg-gray-200 text-gray-500' : 'bg-brand-gold/10 text-brand-gold'
                                                }`}>
                                                    {msg.is_read ? <MailOpen className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-3">
                                                        <h3 className={`text-lg font-bold ${msg.is_read ? 'text-gray-700' : 'text-gray-900'}`}>
                                                            {msg.name}
                                                        </h3>
                                                        {!msg.is_read && (
                                                            <span className="rounded-full bg-brand-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-brand-black">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        <a href={`mailto:${msg.email}`} className="hover:text-brand-gold transition-colors">{msg.email}</a>
                                                        {' • '}
                                                        {new Date(msg.created_at).toLocaleString()}
                                                    </p>
                                                    {msg.subject && (
                                                        <p className="mt-2 text-sm font-semibold text-gray-700">Subject: {msg.subject}</p>
                                                    )}
                                                    <div className="mt-4 rounded-lg bg-white p-4 text-sm text-gray-600 shadow-sm border border-gray-50">
                                                        {msg.message}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-2 ml-4">
                                                <button 
                                                    onClick={() => toggleReadStatus(msg.id, msg.is_read)}
                                                    className="rounded border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
                                                >
                                                    {msg.is_read ? 'Mark Unread' : 'Mark Read'}
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="flex items-center justify-center rounded border border-red-100 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
                                                >
                                                    <Trash className="mr-1 h-3 w-3" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {messages.data.length === 0 && (
                                <div className="py-20 text-center">
                                    <MessageCircle className="mx-auto h-12 w-12 text-gray-200" />
                                    <h3 className="mt-4 text-sm font-medium text-gray-900">No messages found</h3>
                                    <p className="mt-1 text-sm text-gray-500">When customers contact you, their messages will appear here.</p>
                                </div>
                            )}

                            {/* Pagination would go here if implemented in the view */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
