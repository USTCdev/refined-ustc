import { $ } from "../utils";

export function autoLogin() {
  if (window.location.href.includes("https://passport.ustc.edu.cn/login")) {
    const click = () => {
      const username = $<HTMLInputElement>("#username");
      const loginBtn = $<HTMLButtonElement>("#login");

      if (loginBtn && username?.value !== "") {
        console.log("[Refined USTC] Clicked login button");
      } else {
        setTimeout(click, 1000);
      }
    };
    click();
  }
}
