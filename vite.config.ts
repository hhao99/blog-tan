import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
export default defineConfig({
    server: {
        port: 3000
    },
    plugins: [
        tailwindcss(),
        tsConfigPaths(),
        tanstackStart(),
        viteReact(),
    ]
});