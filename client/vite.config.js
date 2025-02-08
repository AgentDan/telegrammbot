import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
  ],
  server: {
    // port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // URL вашего сервера API
        changeOrigin: true,               // Меняет origin для запроса
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        // Опционально, если нужно переписать URL
      },
    },
  },
})
