export enum ConfigType {
  String,
  Boolean,
}

interface ConfigTypeMap {
  [ConfigType.String]: string;
  [ConfigType.Boolean]: boolean;
}

export const configMeta = {
  codeAutoFill: [ConfigType.Boolean, "自动填写验证码", false],
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
  config.codeAutoFill ??= true;
  return config;
}

export async function saveConfig() {
  await storage.set(config!);
}

loadConfig();

storage.onChanged.addListener(changes => {
  Object.assign(config!, changes);
});
