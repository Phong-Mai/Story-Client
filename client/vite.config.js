import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
  server: {
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     secure: true,
    //   },
    // },
    proxy: {
      '/api': 'https://story-sever.vercel.app',
    },
    secure : true,
  },  
 
  plugins: [react()],
});
