import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
// Import 'loadEnv' from Vite
import { defineConfig, loadEnv } from "vite"

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter ('') loads all env vars without the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true, // Listen on all network interfaces
      hmr: {
        // Use the environment variable here
        host: env.FRONTEND_ENDPOINT
      },
      // And also here
      allowedHosts: [env.FRONTEND_ENDPOINT],
    },
  }
})