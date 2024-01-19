import { loadConfig } from "../shared/config";
import { execute } from "./features";

async function main() {
  console.log("[Refined USTC] Content script loaded");

  const config = await loadConfig();

  console.log("[Refined USTC] Config loaded:", config);

  window.addEventListener("load", () => {
    execute(config);
  });
}

main();
