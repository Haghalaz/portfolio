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
      '@atoms': '/src/components/atoms',
      '@molecules': '/src/components/molecules',
      '@organisms': '/src/components/organisms',
      '@pages': '/src/components/pages',
      '@utils': '/src/utils/',
      '@hooks': '/src/utils/hooks',
      '@contexts': '/src/utils/contexts',
      '@data': '/src/data',
    },
  },
});
