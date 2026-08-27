import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CheckCircle, Upload, Save, User } from 'lucide-react';
import { useState } from 'react';

interface Props {
    settings: {
        designer_name?: string;
        designer_bio?: string;
        designer_image?: string;
    };
}

export default function Index({ settings }: Props) {
    const { flash } = usePage<any>().props;
    const [imagePreview, setImagePreview] = useState<string | null>(settings.designer_image || null);

    const { data, setData, post, processing, errors } = useForm({
        designer_name: settings.designer_name || 'Christiana Naamenomah',
        designer_bio: settings.designer_bio || '',
        designer_image: null as File | null,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('designer_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.update'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-serif text-2xl font-bold leading-tight text-gray-800">
                    Atelier Settings
                </h2>
            }
        >
            <Head title="System Settings" />

            <div className="py-12 bg-gray-50 min-h-[calc(100vh-64px)]">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg text-sm font-semibold flex items-center space-x-2 shadow-sm animate-fade-in">
                            <CheckCircle className="h-4 w-4 text-green-650" />
                            <span>{flash.success}</span>
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-100">
                        <div className="p-8 text-gray-900">
                            <div className="border-b border-gray-100 pb-6 mb-8">
                                <h3 className="font-serif text-xl font-bold text-gray-900">About the Designer</h3>
                                <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Update Christiana Naamenomah's public biography and gallery portrait</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid gap-8 md:grid-cols-3 items-start">
                                    {/* Left side: Image Upload */}
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Designer Portrait</label>
                                        <div className="relative aspect-[3/4] rounded-xl bg-gray-50 border border-gray-200 overflow-hidden flex flex-col items-center justify-center group shadow-sm">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Designer Preview" className="h-full w-full object-cover" />
                                            ) : (
                                                <User className="h-16 w-16 text-gray-300" strokeWidth={1.5} />
                                            )}
                                            
                                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-center p-4">
                                                <Upload className="h-6 w-6 text-brand-gold mb-2" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Change Photo</span>
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden" 
                                                />
                                            </label>
                                        </div>
                                        {errors.designer_image && <p className="mt-1 text-xs text-red-500">{errors.designer_image}</p>}
                                    </div>

                                    {/* Right side: Form Fields */}
                                    <div className="md:col-span-2 space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Designer Name</label>
                                            <input 
                                                required
                                                type="text"
                                                className="block w-full border-gray-200 rounded-lg text-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] px-4 py-3 shadow-sm transition-colors"
                                                value={data.designer_name}
                                                onChange={e => setData('designer_name', e.target.value)}
                                            />
                                            {errors.designer_name && <p className="mt-1 text-xs text-red-500">{errors.designer_name}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Biography & Story</label>
                                            <textarea 
                                                required
                                                rows={10}
                                                className="block w-full border-gray-200 rounded-lg text-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] px-4 py-3 shadow-sm transition-colors resize-none font-serif leading-relaxed"
                                                value={data.designer_bio}
                                                onChange={e => setData('designer_bio', e.target.value)}
                                                placeholder="Write something beautiful about the designer..."
                                            ></textarea>
                                            {errors.designer_bio && <p className="mt-1 text-xs text-red-500">{errors.designer_bio}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-50 pt-6 flex justify-end">
                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="flex items-center space-x-2 bg-brand-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-brand-gold hover:text-brand-black transition-all rounded shadow-md disabled:opacity-50"
                                    >
                                        <Save className="h-4 w-4" />
                                        <span>{processing ? 'Saving...' : 'Save Settings'}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
