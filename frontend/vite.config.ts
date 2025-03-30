import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  // ✅ Load environment variables
  const env = loadEnv(mode, process.cwd(), "");

  // ✅ Set API Base URL with fallback for local development
  const API_BASE_URL = env.VITE_API_BASE_URL || "http://localhost:5000";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true, // ✅ Allow access from network
      proxy: {
        "/api": {
          target: API_BASE_URL, // ✅ Correct API base URL handling
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      outDir: "dist",
    },
    // ✅ Fix for React Router refresh issue
    preview: {
      host: true,
      port: 4173, // You can change this if needed
    },
  };
});
