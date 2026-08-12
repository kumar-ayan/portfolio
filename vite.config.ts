import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React — loaded immediately, shared by everything
          'vendor-react': ['react', 'react-dom', 'scheduler'],
          // Three.js ecosystem — only loaded when LazyCanvas mounts
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // UI icons — small, loaded with main bundle
          'vendor-icons': ['react-icons', 'lucide-react'],
        },
      },
    },
  },
})
