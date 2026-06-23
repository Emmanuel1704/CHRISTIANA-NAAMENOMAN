import InputError from '@/Components/InputError';
import Logo from '@/Components/Logo';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { motion } from 'framer-motion';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen font-sans bg-white text-brand-black">
            <Head title="Admin Login | Chrisnoman Fashion" />

            {/* Left Column: Image & Branding */}
            <div className="relative hidden w-1/2 lg:block">
                <div className="absolute inset-0 z-10 bg-brand-black/40" />
                <img 
                    src="/storage/collections/bridal_lace_long_train.jpg" 
                    alt="Chrisnoman Bridal" 
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex flex-col items-start justify-between p-16 text-white">
                    <Link href="/">
                        <Logo size="lg" variant="light" />
                    </Link>
                    <div>
                        <h2 className="font-serif text-5xl font-bold leading-tight">
                            Atelier <br /> Management <br /> Portal.
                        </h2>
                        <p className="mt-6 max-w-sm text-lg text-gray-200">
                            Secure access to manage your collections, appointments, and client communications.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column: Login Form */}
            <div className="flex w-full flex-col justify-center px-8 sm:px-16 lg:w-1/2 xl:px-32">
                <div className="mx-auto w-full max-w-md">
                    <div className="mb-12 lg:hidden">
                        <Link href="/">
                            <Logo size="lg" variant="dark" />
                        </Link>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="font-serif text-3xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="mt-3 text-sm text-gray-500">
                            Please enter your administrative credentials to continue.
                        </p>

                        {status && (
                            <div className="mt-4 rounded bg-green-50 p-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="mt-10 space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none focus:ring-0 transition-colors"
                                    placeholder="Christiananaamenoman@gmail.com"
                                    required
                                />
                                <InputError message={errors.email} className="mt-2 text-red-500" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-black transition-colors"
                                        >
                                            Forgot?
                                        </Link>
                                    )}
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full border-b border-gray-200 py-3 text-sm focus:border-brand-gold focus:outline-none focus:ring-0 transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                                <InputError message={errors.password} className="mt-2 text-red-500" />
                            </div>

                            <div className="flex items-center">
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 checked:border-brand-gold checked:bg-brand-gold focus:ring-0"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <svg
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 h-3 w-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <span className="ml-3 text-sm text-gray-500">Remember me</span>
                                </label>
                            </div>

                            <button
                                disabled={processing}
                                className="w-full rounded bg-brand-black py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-brand-gold hover:text-brand-black disabled:opacity-50"
                            >
                                {processing ? 'Authenticating...' : 'Sign In to Dashboard'}
                            </button>
                        </form>
                        
                        <div className="mt-12 text-center text-[10px] uppercase tracking-widest text-gray-400">
                            &copy; {new Date().getFullYear()} Chrisnoman Fashion.
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
