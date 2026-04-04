import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves from /repository-name/
  base: '/drkapure-clinic-website/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }

          if (/[\\/]src[\\/]treatments[\\/]/.test(id)) {
            return 'treatments'
          }

          if (/[\\/]src[\\/]pages[\\/]/.test(id)) {
            return 'pages'
          }

          return undefined
        },
      },
    },
  },
})
