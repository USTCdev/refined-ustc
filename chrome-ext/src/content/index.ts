import { getCode } from "./utils/getCode";
import { loadConfig } from "../shared/config";

function $<T>(selector: string) {
  return document.querySelector(selector) as T | null;
}

function fillCode() {
  const img = $<HTMLImageElement>("img.validate-img");
  const input = $<HTMLInputElement>("#validate");
  if (img && input) {
    const fill = () => {
      const code = getCode(img);
      if (code === "") return;
      input.value = code;
      console.debug("[Refined USTC] Code filled:", code);
    };
    if (img.complete) {
      fill();
    } else {
      img.addEventListener("load", fill);
    }
  }
}

async function main() {
  console.debug("[Refined USTC] Content script loaded");

  const config = await loadConfig();

  console.debug("[Refined USTC] Config loaded:", config);

  config.codeAutoFill && fillCode();

  // Do other things
}

main();
