'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var manifest = exports.manifest = {
  handlers: ['categories', 'channels', 'channel', 'video'],
  help: {
    categories: {
      description: 'retrieves a list of available categories'
    },
    channels: {
      description: 'retrieves a list of channels in a category',
      params: {
        slug: 'category slug'
      }
    },
    channel: {
      description: 'retrieves a single channel',
      params: {
        category: 'category slug',
        slug: 'channel slug'
      }
    },
    video: {
      description: 'retrieves a specific video',
      params: {
        id: 'video ID'
      }
    }
  }
};