'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var manifest = exports.manifest = {
  handlers: ['categories', 'channels'],
  help: {
    categories: {
      description: 'retrieves a list of available categories'
    },
    channels: {
      description: 'retrieves a list of channels in a category',
      params: {
        slug: 'category slug'
      }
    }
  }
};