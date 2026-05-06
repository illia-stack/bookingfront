// vite.config.js im frontend root
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // sehr wichtig für Render
  build: {
    outDir: 'dist',
  },
})