'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commands = undefined;

var _getCategories = require('./getCategories');

var _getCategories2 = _interopRequireDefault(_getCategories);

var _getChannel = require('./getChannel');

var _getChannel2 = _interopRequireDefault(_getChannel);

var _getChannels = require('./getChannels');

var _getChannels2 = _interopRequireDefault(_getChannels);

var _getVideo = require('./getVideo');

var _getVideo2 = _interopRequireDefault(_getVideo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commands = exports.commands = {
  categories: _getCategories2.default,
  channel: _getChannel2.default,
  channels: _getChannels2.default,
  video: _getVideo2.default
};