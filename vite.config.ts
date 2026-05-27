import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

// 移除 spline 的 modulepreload 标签，防止阻塞首屏
function removeSplinePreload(): Plugin {
  return {
    name: 'remove-spline-preload',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="modulepreload"[^>]*spline[^>]*>\s*/g,
        ''
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), removeSplinePreload()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@splinetool')) return 'spline'
          if (id.includes('framer-motion')) return 'framer'
          if (id.includes('lucide-react')) return 'lucide'
        },
      },
    },
  },
})
