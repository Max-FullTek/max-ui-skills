import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@source": fileURLToPath(new URL("../source", import.meta.url))
    },
    dedupe: ["react", "react-dom", "lucide-react"]
  },
  server: {
    fs: {
      allow: [fileURLToPath(new URL("..", import.meta.url))]
    }
  }
});
