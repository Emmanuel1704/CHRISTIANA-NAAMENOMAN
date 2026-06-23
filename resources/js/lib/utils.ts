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
    const hasSubdir = window.location.pathname.startsWith('/fashion/public');
    const base = hasSubdir ? '/fashion/public/' : '/';
    return `${base}${cleanPath}`;
}
