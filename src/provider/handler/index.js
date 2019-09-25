import { commands } from './commands';
import { authenticate } from './utils';

export const handler = nativeBridge => params => {
  const { type } = params;

  // acquire API key from Native Bridge appData() method
  const { pluginConfigurations } = nativeBridge.appData();
    if (pluginConfigurations) {
      let parsedPluginConfiguration;
      try {
        parsedPluginConfiguration = JSON.parse(pluginConfigurations);
        const api_key = parsedPluginConfiguration.api_key;

        return authenticate(nativeBridge, api_key)
        .then(authObj => {
          params.token = authObj.token;
          params.cdn = authObj.cdn;
          return commands[type](params)
            .then(nativeBridge.sendResponse)
            .catch(nativeBridge.throwError);
          })
        .catch(nativeBridge.throwError)

      } catch (err) {
        parsedPluginConfiguration = pluginConfigurations;
      }
    } else {
      // development environment does not have pluginConfigurations, use hard coded API key
      return authenticate(nativeBridge, "566ee6d19fef04459d959b08349d6c07b3a309a2")
      .then(authObj => {
        params.token = authObj.token;
        params.cdn = authObj.cdn;
        return commands[type](params)
          .then(nativeBridge.sendResponse)
          .catch(nativeBridge.throwError);
        })
      .catch(nativeBridge.throwError)
    }
}
