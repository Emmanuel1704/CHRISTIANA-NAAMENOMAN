import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Star, Trash2 } from 'lucide-react';

interface Testimonial {
    id: number;
    customer_name: string;
    review: string;
    rating: number;
    created_at: string;
}

interface Props {
    testimonials: Testimonial[];
}

export default function Index({ testimonials }: Props) {
    const { delete: destroy, processing } = useForm();

    const deleteTestimonial = (id: number) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            destroy(route('testimonials.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-serif text-2xl font-bold leading-tight text-gray-800">Manage Testimonials</h2>}
        >
            <Head title="Testimonials" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {testimonials.length === 0 ? (
                                <p className="text-gray-500">No testimonials found. Add some from the Dashboard Quick Actions.</p>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {testimonials.map((testimonial) => (
                                        <div key={testimonial.id} className="border border-gray-100 rounded-xl p-6 bg-gray-50 shadow-sm relative">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{testimonial.customer_name}</h3>
                                                    <div className="flex mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star 
                                                                key={i} 
                                                                className={`h-4 w-4 ${i < testimonial.rating ? 'text-[#DCA73A] fill-[#DCA73A]' : 'text-gray-300'}`} 
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => deleteTestimonial(testimonial.id)}
                                                    disabled={processing}
                                                    className="text-red-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </div>
                                            <p className="text-gray-600 text-sm italic">"{testimonial.review}"</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
