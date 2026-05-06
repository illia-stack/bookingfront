import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  
  server: {
    host: true,
    port: 5173,
  },

  // <-- preview muss hier AUßERHALB von server stehen
  preview: {
    allowedHosts: ["bookingfront-b9j1.onrender.com"],
  },
});