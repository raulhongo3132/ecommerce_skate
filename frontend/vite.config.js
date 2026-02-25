import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const base_path = process.env.VITE_APP_BASE_PATH || "/";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: base_path,
  build: {
    outDir: "dist",
  },
});
