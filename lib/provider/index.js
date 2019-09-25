'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _manifest = require('./manifest');

var _handler = require('./handler');

var _test = require('./test');

var provider = {
  name: 'dotstudiopro',
  manifest: _manifest.manifest,
  handler: _handler.handler,
  test: _test.test
};

exports.default = provider;