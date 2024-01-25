// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',

  resolve: {
    alias: {
      '@src': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@hooks': '/src/utils/hooks',
      '@data': '/src/data',
    },
  },
});
