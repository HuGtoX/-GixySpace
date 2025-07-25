import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      ],
      imports: ["react"],
      dts: "./auto-imports.d.ts",
      viteOptimizeDeps: true,
    }),
  ],
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:8888",
        target: "https://tools-service.netlify.app/",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
