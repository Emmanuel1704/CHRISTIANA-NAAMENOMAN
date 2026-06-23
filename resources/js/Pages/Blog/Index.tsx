import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';

import { asset } from '@/lib/utils';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string;
    author: string;
    created_at: string;
}

interface Props {
    posts: Post[];
}

export default function Index({ posts }: Props) {
    return (
        <PublicLayout>
            <Head title="Fashion Blog & Styling Tips" />

            <section className="bg-brand-cream/20 py-24">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-brand-gold">The Atelier Journal</span>
                    <h1 className="mt-6 font-serif text-5xl font-bold md:text-6xl">Fashion & Elegance</h1>
                    <p className="mt-8 mx-auto max-w-2xl text-gray-500 leading-relaxed">
                        Insights from the atelier, styling guides for the modern woman, 
                        and the latest trends in contemporary African fashion.
                    </p>
                </div>
            </section>

            <section className="py-24">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post, index) => (
                            <motion.article 
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group flex flex-col"
                            >
                                <Link href={route('blog.show', post.slug)} className="overflow-hidden rounded-sm bg-gray-100">
                                    <img 
                                        src={asset(post.featured_image || '/assets/images/hero.png')} 
                                        alt={post.title} 
                                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </Link>
                                <div className="mt-8">
                                    <div className="flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                                        <span className="flex items-center space-x-2"><User className="h-3 w-3" /> <span>{post.author}</span></span>
                                        <span className="flex items-center space-x-2"><Clock className="h-3 w-3" /> <span>{new Date(post.created_at).toLocaleDateString()}</span></span>
                                    </div>
                                    <h2 className="mt-4 font-serif text-2xl font-bold leading-tight group-hover:text-brand-gold transition-colors">
                                        <Link href={route('blog.show', post.slug)}>{post.title}</Link>
                                    </h2>
                                    <p className="mt-4 text-sm leading-relaxed text-gray-500 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <Link 
                                        href={route('blog.show', post.slug)}
                                        className="mt-8 inline-flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-brand-black hover:text-brand-gold transition-colors"
                                    >
                                        <span>Read Story</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="py-20 text-center text-gray-400 uppercase tracking-widest text-sm">
                            New stories coming soon.
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
