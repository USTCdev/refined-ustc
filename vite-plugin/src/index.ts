import * as fs from "fs";
import { dirname, resolve, basename } from "path";
import { Plugin, ResolvedConfig, build } from "vite";

export type ManifestV3 = chrome.runtime.ManifestV3;

export default function ChromeExt(manifest: ManifestV3): Plugin {
  // HTML files should be compiled together by Vite as MPAs
  const html = new Set(
    [
      manifest.action?.default_popup,
      manifest.options_page,
      manifest.options_ui?.page,
    ].filter(Boolean) as string[],
  );

  // JS files should be compiled separately by Vite as libraries
  const js = new Set(
    [
      manifest.background?.service_worker,
      manifest.content_scripts?.flatMap(script => script.js),
      manifest.devtools_page,
    ]
      .flat()
      .filter(Boolean) as string[],
  );

  // Other assets should be copied directly
  const assets = new Set(
    [
      manifest.action?.default_icon
        ? Object.values(manifest.action?.default_icon)
        : undefined,
      manifest.content_scripts?.flatMap(script => script.css),
    ]
      .flat()
      .filter(Boolean) as string[],
  );

  let config: ResolvedConfig;

  return {
    name: "chrome-ext",
    config() {
      return {
        build: {
          rollupOptions: {
            input: [...html],
          },
          outDir: "dist",
          emptyOutDir: true,
        },
      };
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    closeBundle() {
      // Write manifest.json
      fs.writeFileSync(
        resolve(config.build.outDir, "manifest.json"),
        JSON.stringify(manifest, null, 2),
      );

      // Copy assets
      assets.forEach(asset => {
        const targetPath = resolve(config.build.outDir, asset);
        fs.mkdirSync(dirname(targetPath), {
          recursive: true,
        });
        fs.copyFileSync(resolve(config.root, asset), targetPath);
      });

      // Compiled JS files
      Promise.all(
        [...js].map(async js => {
          try {
            js = js.replace(/\.js$/, ".ts");
            const {} = await build({
              plugins: [],
              configFile: false,
              root: config.root,
              build: {
                lib: {
                  entry: resolve(config.root, js),
                  formats: ["es"],
                  fileName: basename(js, ".ts"),
                },
                outDir: dirname(resolve(config.root, config.build.outDir, js)),
                emptyOutDir: false,
                rollupOptions: {
                  external: () => false,
                },
              },
            });
          } catch (e) {
            // Do not throw error, or the dev process will stop
            console.error(e);
          }
        }),
      );
    },
  };
}
