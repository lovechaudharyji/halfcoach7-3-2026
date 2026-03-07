import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('zego')) {
              return 'zego';
            }
            if (id.includes('lottie')) {
              return 'lottie';
            }
            if (id.includes('video-sdk') || id.includes('stream-io') || id.includes('daily-co') || id.includes('agora')) {
              return 'video-sdk';
            }
            return 'vendor';
          }
        }
      }
    }
  }
})
