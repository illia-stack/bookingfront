import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,
  },
  preview: {
    host: true,
    allowedHosts: ['bookingfront-b9j1.onrender.com'],
  },
  base: './', // wichtig für relative Pfade auf Render
})