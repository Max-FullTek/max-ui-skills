import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const greenInkRoot = new URL("../../source/themes/green-ink/", import.meta.url);

const presentationOverrides = new Map([
  ["/react/components/Button/Button.module.scss", "component-overrides/components/Button/Button.theme.scss"],
  ["/react/components/Dialog/Dialog.module.scss", "component-overrides/components/Dialog/Dialog.theme.scss"],
  ["/react/components/Field/Field.module.scss", "component-overrides/components/Field/Field.theme.scss"],
  ["/react/components/Header/Header.module.scss", "component-overrides/components/Header/Header.theme.scss"],
  ["/react/components/Heading/Heading.module.scss", "component-overrides/components/Heading/Heading.theme.scss"],
  ["/react/components/ImageCard/ImageCard.module.scss", "component-overrides/components/ImageCard/ImageCard.theme.scss"],
  ["/react/components/Menubar/Menubar.module.scss", "component-overrides/components/Menubar/Menubar.theme.scss"],
  ["/react/components/ToastProvider/ToastProvider.module.scss", "component-overrides/components/ToastProvider/ToastProvider.theme.scss"],
  ["/react/components/VisionStage/VisionStage.module.scss", "component-overrides/components/VisionStage/VisionStage.theme.scss"],
  ["/react/layouts/DashboardFrame/DashboardFrame.module.scss", "component-overrides/layouts/DashboardFrame/DashboardFrame.theme.scss"]
].map(([moduleSuffix, overridePath]) => [
  moduleSuffix,
  readFileSync(new URL(overridePath, greenInkRoot), "utf8").replaceAll(
    "../../styles/media/green-ink/",
    "../../../themes/green-ink/media/"
  )
] as const));

function appendGreenInkPresentation(source: string, filename: string) {
  const normalizedFilename = filename.replaceAll("\\", "/");
  const match = [...presentationOverrides.entries()].find(([moduleSuffix]) =>
    normalizedFilename.endsWith(moduleSuffix)
  );

  return match ? `${source}\n\n/* Green Ink presentation overrides */\n${match[1]}` : source;
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@sample-shared": fileURLToPath(new URL("../shared", import.meta.url)),
      "@source": fileURLToPath(new URL("../../source", import.meta.url))
    },
    dedupe: ["react", "react-dom", "lucide-react"]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: appendGreenInkPresentation
      }
    }
  },
  server: {
    fs: {
      allow: [fileURLToPath(new URL("../..", import.meta.url))]
    }
  }
});
