import type { Config } from "../../shared/config";
import { autoLogin } from "./autoLogin";
import { fillCode } from "./fillCode";
import { jwClickLogin } from "./jwClickLogin";
import { jwPrettify } from "./jwPrettify";
import { recClickLogin } from "./recClickLogin";

export async function execute(config: Config) {
  config.fillCode && fillCode();
  config.autoLogin && autoLogin();
  config.recClickLogin && recClickLogin();
  config.jwClickLogin && jwClickLogin();
  config.jwPrettify && jwPrettify();
}
