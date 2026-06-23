import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash, ExternalLink, Image } from 'lucide-react';

interface Collection {
    id: number;
    title: string;
    category: string;
    price: number;
    image_path: string;
    created_at: string;
}

interface Props {
    collections: Collection[];
}

export default function Index({ collections }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this collection item?')) {
            router.delete(route('collections.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-serif text-2xl font-bold leading-tight text-gray-800">
                        Manage Collections
                    </h2>
                    <Link
                        href={route('collections.create')}
                        className="flex items-center space-x-2 bg-brand-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-gold hover:text-brand-black transition-all"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Add New</span>
                    </Link>
                </div>
            }
        >
            <Head title="Manage Collections" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {collections.map((item) => (
                                    <div key={item.id} className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:shadow-lg">
                                        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                                            <img 
                                                src={item.image_path} 
                                                alt={item.title} 
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                                                    {item.category}
                                                </span>
                                                <span className="text-[10px] text-gray-400">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between">
                                                <h3 className="font-serif text-lg font-bold text-gray-900">
                                                    {item.title}
                                                </h3>
                                                <span className="font-bold text-[#DCA73A]">GH₵{item.price ? item.price.toLocaleString() : '0.00'}</span>
                                            </div>
                                            <div className="mt-6 flex items-center justify-end space-x-6 border-t border-gray-50 pt-5 pb-1 pr-1">
                                                <Link 
                                                    href={route('collections.edit', item.id)}
                                                    className="text-[#DCA73A] hover:text-[#B68A2E] hover:scale-110 active:scale-90 transition-all duration-200"
                                                >
                                                    <Edit className="h-4 w-4" strokeWidth={2} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-[#9ca3af] hover:text-red-500 hover:scale-110 active:scale-90 transition-all duration-200"
                                                >
                                                    <Trash className="h-4 w-4" strokeWidth={2} />
                                                </button>
                                                <Link 
                                                    href="/collections" 
                                                    target="_blank"
                                                    className="text-[#9ca3af] hover:text-[#111] hover:scale-110 active:scale-90 transition-all duration-200"
                                                >
                                                    <ExternalLink className="h-4 w-4" strokeWidth={2} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {collections.length === 0 && (
                                <div className="py-20 text-center">
                                    <Image className="mx-auto h-12 w-12 text-gray-200" />
                                    <h3 className="mt-4 text-sm font-medium text-gray-900">No collections found</h3>
                                    <p className="mt-1 text-sm text-gray-500">Get started by adding your first fashion design.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
