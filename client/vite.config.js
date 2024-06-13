import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://story-sever.vercel.app',
        secure: true,
      },
    },
  },
  plugins: [react()],
});
