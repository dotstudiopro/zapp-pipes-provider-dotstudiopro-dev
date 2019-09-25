'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (params) {
  var slug = params.slug;

  var url = 'https://a1de1f86.ngrok.io/channels/US/' + slug + '?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NDA4YWVkYTk3ZjgxNWY5NWQ3YjIzYzYiLCJleHBpcmVzIjoxNTcxODUxNzkzNzk5LCJjb250ZXh0Ijp7Im5hbWUiOiJ0ZXN0Iiwic3ViZG9tYWluIjoidGVzdCIsInJlYWRfb25seSI6ZmFsc2V9fQ.UPsQD6Oas5Muu36C3Mo1u6KIvyuaJvaGdbcEMAPYDag';
  return _axios2.default.get(url).then(handleChannelsResponse).catch(function (e) {
    return Promise.reject();
  });
};

function handleChannelsResponse(response) {
  var rawData = response.data.channels;
  var channels = rawData.map(function (channel) {
    return parseChannel(channel);
  });

  return {
    id: 'channels',
    title: 'Channels',
    type: {
      value: 'feed'
    },
    entry: channels
  };
}

function parseChannel(channel) {
  var _id = channel._id,
      title = channel.title,
      slug = channel.slug;

  // console.log(_id, title, slug);

  return {
    type: {
      value: 'program'
    },
    id: _id,
    title: title,
    media_group: [{
      type: 'image',
      media_item: [{
        src: channel.spotlight_poster || channel.poster,
        key: 'image_base',
        type: 'image'
      }]
    }],
    extensions: {},
    content: {
      type: 'atom',
      rel: 'self',
      src: 'dotstudiopro://fetchData?type=channels&slug=' + slug //formatted url to retrieve this category's channels inside the Zapp app
    }
  };
}