import { $ } from "../utils";

export function recClickLogin() {
  if (window.location.href === "https://rec.ustc.edu.cn/") {
    const loginBtn = $<HTMLAnchorElement>(".navbar-login-btn");
    loginBtn?.click();
    console.log("[Refined USTC] Clicked login button");
  } else if (
    window.location.href.includes(
      "https://recapi.ustc.edu.cn/identity/other_login",
    )
  ) {
    const loginBtn = $<HTMLButtonElement>("button.ustc_login");
    loginBtn?.click();
    console.log("[Refined USTC] Clicked login button");
  }
}
