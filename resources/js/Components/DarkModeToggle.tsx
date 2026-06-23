import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', String(newMode));
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-brand-gold hover:text-white dark:bg-brand-black dark:text-brand-gold dark:hover:bg-brand-gold dark:hover:text-brand-black"
        >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    );
}
