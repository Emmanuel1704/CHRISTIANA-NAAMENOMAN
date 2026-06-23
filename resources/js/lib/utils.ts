import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function asset(path: string | null | undefined): string {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    try {
        // @ts-ignore
        const base = typeof route !== 'undefined' ? route('home') : '';
        if (base) {
            const baseSlash = base.endsWith('/') ? base : `${base}/`;
            return `${baseSlash}${cleanPath}`;
        }
    } catch (e) {
        // Ignore and fallback
    }
    const hasSubdir = window.location.pathname.startsWith('/fashion/public');
    const base = hasSubdir ? '/fashion/public/' : '/';
    return `${base}${cleanPath}`;
}
