import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 5173,
  },

  preview: {
    host: "0.0.0.0",
    port: process.env.PORT || 10000,
    allowedHosts: [
      "bookingfront-b9j1.onrender.com",
    ],
  },
});