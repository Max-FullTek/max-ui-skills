import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@sample-shared": fileURLToPath(new URL("../shared", import.meta.url)),
      "@source": fileURLToPath(new URL("../../skills/orange-matters/assets", import.meta.url))
    },
    dedupe: ["react", "react-dom", "lucide-react"]
  },
  server: {
    fs: {
      allow: [fileURLToPath(new URL("../..", import.meta.url))]
    }
  }
});
