import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        host: '127.0.0.1',
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            // This is the crucial part for your '@' alias
            '@': '/resources/js', // Make sure this path is correct for your base alias
            // Or if you only alias for components, it might be:
            // '@/Components': '/resources/js/Components', // If you have a specific alias for Components
        },
    },
});
