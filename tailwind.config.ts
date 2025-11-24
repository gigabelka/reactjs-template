/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // CSS переменные автоматически используются через var()
                // Можно обращаться через класс bg-[var(--color-accent-500)]
                // Или использовать готовые значения для удобства
                primary: {
                    50: '#f0f4ff',
                    100: '#e0e9ff',
                    200: '#c7d7fe',
                    300: '#a5b8fc',
                    400: '#8192f8',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    800: '#3730a3',
                    900: '#312e81',
                    950: '#1e1b4b',
                },
                // Кастомные цвета приложения из CSS переменных
                accent: {
                    100: 'var(--color-accent-100)',
                    300: 'var(--color-accent-300)',
                    500: 'var(--color-accent-500)',
                    700: 'var(--color-accent-700)',
                    900: 'var(--color-accent-900)',
                    950: 'var(--color-accent-950)',
                },
                // Семантические цвета
                'app-bg': 'var(--bg-color)',
                'app-text': 'var(--primary-color)',
                'modal-bg': 'var(--modal-bg-color)',
                'modal-text': 'var(--modal-text-color)',
                'sidebar-bg': 'var(--sidebar-bg-color)',
                'sidebar-text': 'var(--sidebar-text-color)',
                'input-bg': 'var(--input-bg-color)',
                'input-text': 'var(--input-text-color)',
                'input-border': 'var(--input-border-color)',
                placeholder: 'var(--placeholder-color)',
            },
            fontFamily: {
                sans: 'var(--font-family-primary)',
            },
            fontSize: {
                xs: 'var(--font-size-xs)',
                s: 'var(--font-size-s)',
                m: 'var(--font-size-m)',
                l: 'var(--font-size-l)',
                xl: 'var(--font-size-xl)',
                xxl: 'var(--font-size-xxl)',
            },
            fontWeight: {
                regular: 'var(--font-weight-regular)',
                medium: 'var(--font-weight-medium)',
                semibold: 'var(--font-weight-semibold)',
                bold: 'var(--font-weight-bold)',
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                // Добавляем стандартные размеры для кнопок
                '10': '2.5rem', // 40px
                '6': '1.5rem', // 24px
                '5': '1.25rem', // 20px
            },
            zIndex: {
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
            },
        },
    },
    plugins: [],
};
