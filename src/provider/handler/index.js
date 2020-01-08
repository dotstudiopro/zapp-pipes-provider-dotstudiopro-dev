import { commands } from "./commands";
import { authenticate, safeJsonParse, getApiKey } from "./utils";

export const handler = nativeBridge => params => {
  console.log("calling handler");
  // console.log("handler", { params, type, nativeBridge });
  const { type } = params;

  // acquire API key from Native Bridge appData() method
  const { pluginConfigurations } = nativeBridge.appData();
  // console.log("after setting config", JSON.stringify(pluginConfigurations));
  if (pluginConfigurations) {
    // console.log("with config");

    try {
      const parsedPluginConfiguration = safeJsonParse(pluginConfigurations);

      // console.log("parsedPluginConfiguration", parsedPluginConfiguration);
      const api_key = getApiKey(parsedPluginConfiguration);
      console.log("api_key", api_key);

      return authenticate(nativeBridge, api_key)
        .then(authObj => {
          console.log("authObj", authObj);
          params.token = authObj.token;
          params.cdn = authObj.cdn;
          if (params.cdn.indexOf("https://") === -1){
            params.cdn = "https://" + params.cdn;
          }

          const appData = nativeBridge.appData();
          params.deviceWidth = appData.deviceWidth;
          params.deviceHeight = appData.deviceHeight;
          params.platform = appData.platform;
          params.device_ifa = appData.advertisingIdentifier;

          console.log("Production build params:", params);

          return commands[type](params)
            .then(nativeBridge.sendResponse)
            .catch(nativeBridge.throwError);
        })
        .catch(nativeBridge.throwError);
    } catch (err) {
      parsedPluginConfiguration = pluginConfigurations;
    }
  } else {
    console.log("dev");
    // development environment does not have pluginConfigurations, use hard coded API key
    return authenticate(
      nativeBridge,
      "566ee6d19fef04459d959b08349d6c07b3a309a2"
    )
      .then(authObj => {
        params.token = authObj.token;
        params.cdn = authObj.cdn;
        if (params.cdn.indexOf("https://") === -1){
          params.cdn = "https://" + params.cdn;
        }

        // dev build also missing nativeBridge.appData() method so hardcode this too
        params.deviceWidth = "1920";
        params.deviceHeight = "1080";
        params.platform = "android";
        params.device_ifa = "38400000-8cf0-11bd-b23e-10b96e40000d";

        return commands[type](params)
          .then(nativeBridge.sendResponse)
          .catch(nativeBridge.throwError);
      })
      .catch(nativeBridge.throwError);
  }
};
