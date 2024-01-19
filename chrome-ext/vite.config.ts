/// <reference types="chrome" />

import { defineConfig } from "vite";
import Refina from "vite-plugin-refina";
import ChromeExt from "@refined-ustc/vite-plugin-chrome-ext";

const icon = "./src/assets/icon.png";
const iconSet = {
  16: icon,
  32: icon,
  48: icon,
  128: icon,
} as const;

export default defineConfig({
  plugins: [
    Refina(),
    ChromeExt({
      manifest_version: 3,
      name: "Refined USTC",
      version: "0.0.1",
      icons: iconSet,
      action: {
        default_title: "Refined USTC",
        default_icon: iconSet,
        default_popup: "./src/popup/index.html",
      },
      content_scripts: [
        {
          matches: ["*://*.ustc.edu.cn/*"],
          js: ["./src/content/index.js"],
        },
      ],
      background: {
        service_worker: "./src/background/index.js",
      },
      permissions: ["storage"],
    }),
  ],
});
