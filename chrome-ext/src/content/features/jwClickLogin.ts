import { $ } from "../utils";

export function jwClickLogin() {
  if (window.location.href.includes("https://jw.ustc.edu.cn/login")) {
    const loginBtn = $<HTMLAnchorElement>("#login-unified-wrapper");
    loginBtn?.click();
    console.log("[Refined USTC] Clicked login button");
  }
}
