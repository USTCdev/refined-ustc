export enum ConfigType {
  String,
  Boolean,
}

interface ConfigTypeMap {
  [ConfigType.String]: string;
  [ConfigType.Boolean]: boolean;
}

export const configMeta = {
  fillCode: [ConfigType.Boolean, "自动填写验证码", false],
  autoLogin: [ConfigType.Boolean, "自动点击登录", false],
  recClickLogin: [ConfigType.Boolean, "睿客网自动点击登录", true],
  jwClickLogin: [ConfigType.Boolean, "教务系统自动点击登录", true],
  jwPrettify: [ConfigType.Boolean, "教务系统美化", false],
} satisfies Record<string, [type: ConfigType, label: string, hide: boolean]>;

export type Config = {
  [K in keyof typeof configMeta]: ConfigTypeMap[(typeof configMeta)[K][0]];
};

const storage = chrome.storage.sync;

let config: Config | undefined;

export function getConfig() {
  return config;
}

export async function loadConfig() {
  config = (await storage.get(Object.keys(configMeta))) as Config;
  fixConfig();
  return config;
}

export async function saveConfig() {
  fixConfig();
  await storage.set(config!);
}

export function fixConfig() {
  config ??= {} as Config;

  config.fillCode ??= true;
  config.autoLogin ??= true;
  config.recClickLogin ??= true;
  config.jwClickLogin ??= true;
  config.jwPrettify ??= true;

  if (config.autoLogin) {
    config.fillCode = true;
  }
}

loadConfig();

storage.onChanged.addListener(changes => {
  Object.assign(config!, changes);
});
