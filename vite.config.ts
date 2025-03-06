import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: ["axios"],
  },
  build: {
    rollupOptions: {
      external: ["axios"], // Ensure axios is treated as an external dependency
    },
  },
});
