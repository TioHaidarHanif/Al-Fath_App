import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                // Main background
                'main-bg': '#FFF7E7',
                
                // Accents
                'accent-1': '#F5DF57', // Yellow
                'accent-2': '#39A0ED', // Blue
                'accent-3': '#E0971C', // Orange
                'accent-4': '#2E86BC', // Dark Blue
                'accent-5': '#06BA63', // Green
                
                // Text & highlights
                'text-primary': '#1C1C1C', // Almost black
                'text-secondary': '#D44848', // Red
                'text-highlight': '#FF5555', // Light Red
                'text-white': '#FFFFFF', // White
                
                // Additional soft colors
                'soft-1': '#E2AFDE', // Soft Pink
                'soft-2': '#8963BA', // Soft Purple
            },
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
                heading: ['"Dela Gothic One"', 'Fitzgerald', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
