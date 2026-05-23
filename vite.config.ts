import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    // 提高警告阈值，Spline 本身就大
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Spline 所有模块单独打包，不混入主 bundle
          if (id.includes('@splinetool')) return 'spline'
          // framer-motion 单独包
          if (id.includes('framer-motion')) return 'framer'
          // lucide 单独包
          if (id.includes('lucide-react')) return 'lucide'
        },
      },
    },
  },
})
