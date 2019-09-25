'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commands = undefined;

var _getCategories = require('./getCategories');

var _getCategories2 = _interopRequireDefault(_getCategories);

var _getChannels = require('./getChannels');

var _getChannels2 = _interopRequireDefault(_getChannels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commands = exports.commands = {
  categories: _getCategories2.default,
  channels: _getChannels2.default
};