'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = undefined;

var _commands = require('./commands');

var handler = exports.handler = function handler(nativeBridge) {
  return function (params) {
    var type = params.type;


    if (!type || ['categories', 'channels'].indexOf(type) == -1) {
      return nativeBridge.throwError('unknown request');
    }

    return _commands.commands[type](params).then(nativeBridge.sendResponse).catch(nativeBridge.throwError);
  };
};