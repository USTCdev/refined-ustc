import { $view, bySelf, propModel } from "refina";
import {
  Config,
  ConfigType,
  getConfig,
  configMeta,
  saveConfig,
} from "../../shared/config";

export default $view(_ => {
  const config = getConfig()!;

  _.$cls`px-2 font-semibold`;
  _.div("设置");
  _.$cls`flex flex-col`;
  _.div(_ =>
    _.for(Object.keys(config) as (keyof Config)[], bySelf, key => {
      const [type, label, hide] = configMeta[key];
      if (hide) return;
      _.$cls`flex items-center p-2 border-b border-gray-200`;
      _.div(_ => {
        switch (type) {
          case ConfigType.Boolean:
            _.label(label);
            _.$cls`ml-auto checkbox`;
            _.checkbox(propModel(config, key)) && saveConfig();
            break;
        }
      });
    }),
  );
});
