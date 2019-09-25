'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = undefined;

var _commands = require('./commands');

var _utils = require('./utils');

var handler = exports.handler = function handler(nativeBridge) {
  return function (params) {
    var type = params.type;

    // acquire API key from Native Bridge appData() method

    var _nativeBridge$appData = nativeBridge.appData(),
        pluginConfigurations = _nativeBridge$appData.pluginConfigurations;

    if (pluginConfigurations) {
      var parsedPluginConfiguration = void 0;
      try {
        parsedPluginConfiguration = JSON.parse(pluginConfigurations);
        var api_key = parsedPluginConfiguration.api_key;

        return (0, _utils.authenticate)(nativeBridge, api_key).then(function (authObj) {
          params.token = authObj.token;
          params.cdn = authObj.cdn;
          return _commands.commands[type](params).then(nativeBridge.sendResponse).catch(nativeBridge.throwError);
        }).catch(nativeBridge.throwError);
      } catch (err) {
        parsedPluginConfiguration = pluginConfigurations;
      }
    } else {
      // development environment does not have pluginConfigurations, use hard coded API key
      return (0, _utils.authenticate)(nativeBridge, "566ee6d19fef04459d959b08349d6c07b3a309a2").then(function (authObj) {
        params.token = authObj.token;
        params.cdn = authObj.cdn;
        return _commands.commands[type](params).then(nativeBridge.sendResponse).catch(nativeBridge.throwError);
      }).catch(nativeBridge.throwError);
    }
  };
};