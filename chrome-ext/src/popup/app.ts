import { $app } from "refina";
import Basics from "@refina/basic-components";
import ConfigView from "./views/Config";
import "./styles.css";
import icon from "../assets/icon.svg";
import { getConfig, loadConfig } from "../shared/config";

$app.use(Basics)(_ => {
  _.$cls`flex text-xl font-bold p-2 align-bottom`;
  _.h1(_ => {
    _.$cls`inline w-[1.5em] mr-2`;
    _.img(icon);
    _.t`Refined USTC`;
  });
  if (getConfig() || _.await(() => loadConfig())) {
    _(ConfigView)();
  } else {
    _.t`加载中...`;
  }
});
