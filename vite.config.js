import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true, // erlaubt externe Hosts
    allowedHosts: ['bookingfront-b9j1.onrender.com'], // dein Render-Host
    port: 4173 // optional, Standard ist 4173
  }
})