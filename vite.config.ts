import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["axios"], // Keep this
  },
  resolve: {
    alias: {
      axios: "axios", // Add this alias
    },
  },
  build: {
    rollupOptions: {
      external: [], // Remove axios from external
    },
  },
});
