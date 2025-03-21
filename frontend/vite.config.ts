import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath, URL } from 'url';

export default defineConfig(({ mode }) => {
  // Load environment variables from `.env` files
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: "dist", // Ensures correct build folder
    },
    server: {
      port: 5173, // Default Vite port
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL || "http://localhost:5000", // Use .env variable
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
