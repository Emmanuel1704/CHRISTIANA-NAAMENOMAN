import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Upload, ArrowLeft, CheckCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        category: 'Casual Wear',
        description: '',
        price: '',
        image: null as File | null,
    });

    const [isDragging, setIsDragging] = useState(false);

    const categories = [
        'Casual Wear',
        'Bridal Wear',
        'African Prints',
        'Corporate Wear',
        'Occasion Dress',
    ];

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('collections.store'));
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setData('image', e.dataTransfer.files[0]);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center space-x-4">
                    <Link href={route('collections.index')} className="p-2 hover:text-brand-gold transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h2 className="font-serif text-2xl font-bold leading-tight text-gray-800">
                        Add New Design
                    </h2>
                </div>
            }
        >
            <Head title="Create Collection" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl">
                        <form onSubmit={submit} className="p-10">
                            <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                                {/* Form Fields */}
                                <div className="space-y-8">
                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Design Title</label>
                                        <input
                                            type="text"
                                            className="mt-3 block w-full border-gray-100 rounded-lg text-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] px-4 py-3 shadow-sm transition-colors"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                        />
                                        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Category</label>
                                        <select
                                            className="mt-3 block w-full border-gray-100 rounded-lg text-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] px-4 py-3 shadow-sm transition-colors"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            required
                                        >
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Description</label>
                                        <textarea
                                            rows={5}
                                            className="mt-3 block w-full border-gray-100 rounded-lg text-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] px-4 py-3 shadow-sm transition-colors resize-none"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                        />
                                        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
                                    </div>

                                    <div>
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Price (GH₵)</label>
                                        <div className="relative mt-3">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                                <span className="text-gray-500 sm:text-sm font-medium">GH₵</span>
                                            </div>
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                className="block w-full border-gray-100 rounded-lg text-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] pl-14 pr-4 py-3 shadow-sm transition-colors"
                                                value={data.price}
                                                onChange={(e) => setData('price', e.target.value)}
                                                required
                                            />
                                        </div>
                                        {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-3 h-full flex flex-col">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Upload Image</label>
                                    <div 
                                        className={`relative flex flex-1 min-h-[300px] flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
                                            isDragging 
                                                ? 'border-[#D4AF37] bg-[#D4AF37]/5' 
                                                : 'border-gray-200 bg-[#f8f9fa] hover:border-[#D4AF37]'
                                        }`}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        {data.image ? (
                                            <div className="text-center">
                                                <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                                                <p className="mt-4 text-sm font-medium text-gray-900">{data.image.name}</p>
                                                <button 
                                                    type="button"
                                                    onClick={() => setData('image', null)}
                                                    className="mt-4 px-4 py-2 rounded border border-red-100 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    Remove Image
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center pointer-events-none">
                                                <Upload className={`mx-auto h-12 w-12 transition-colors ${isDragging ? 'text-[#D4AF37]' : 'text-gray-300'}`} />
                                                <p className="mt-6 text-sm font-medium text-gray-900">Click to upload or drag & drop</p>
                                                <p className="mt-2 text-xs text-gray-500">JPG, PNG, WEBP (Max 2MB)</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            className="absolute inset-0 cursor-pointer opacity-0"
                                            onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                            required
                                        />
                                    </div>
                                    {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
                                </div>
                            </div>

                            <div className="mt-12 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-[#111] px-10 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-gray-800 transition-colors shadow-md disabled:opacity-50"
                                >
                                    {processing ? 'Publishing...' : 'Publish Design'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
