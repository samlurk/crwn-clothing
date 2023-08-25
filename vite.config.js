import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: process.env.VITE_HOST || "0.0.0.0",
    port: process.env.VITE_PORT || 5173,
  },
  plugins: [react()],
});
