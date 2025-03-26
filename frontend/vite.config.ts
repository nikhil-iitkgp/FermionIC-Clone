import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from "url";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    base: "/", // Ensure base is set correctly for SPA
    build: {
      outDir: "dist",
    },
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL || "http://localhost:5000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      port: 4173,
      strictPort: true,
    }
  };
});
