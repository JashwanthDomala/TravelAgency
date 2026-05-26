import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api/serp": {
          target: "https://serpapi.com",
          changeOrigin: true,
          rewrite: (path) => {
            const query = path.replace(/^\/api\/serp/, "") || "";
            const separator = query.includes("?") ? "&" : "?";
            return `${query}${separator}api_key=${env.VITE_SERPAPI_KEY || ""}`;
          },
        },
      },
    },
  };
});
