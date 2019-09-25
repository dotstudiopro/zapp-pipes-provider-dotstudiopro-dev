'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (params) {
  var category = params.category,
      slug = params.slug,
      token = params.token;

  var url = 'https://api.myspotlight.tv/channels/US/' + category + '/' + slug + '?token=' + token;

  return _axios2.default.get(url).then(handleChannelResponse).catch(function (e) {
    return Promise.reject();
  });
};

function handleChannelResponse(response) {
  var channel = response.data.channels[0];

  // single channel could contain one or multiple videos
  if (channel.playlist && channel.playlist.length) {
    var videos = channel.playlist.map(function (video) {
      return parseVideo(video);
    });

    return {
      id: channel._id,
      title: channel.title,
      type: {
        value: 'feed'
      },
      entry: videos
    };
  } else {
    var parsedVideo = parseVideo(channel.video);
    return {
      id: channel._id,
      title: channel.title,
      type: {
        value: 'feed'
      },
      entry: parsedVideo
    };
  }
}

function parseVideo(video) {
  var _id = video._id,
      title = video.title,
      description = video.description,
      thumb = video.thumb;


  return {
    type: {
      value: 'feed'
    },
    id: _id,
    title: title,
    summary: description,
    media_group: [{
      "type": "image",
      "media_item": [{
        "type": "image",
        "key": "thumbnail",
        "src": "https://images.dotstudiopro.com/" + thumb
      }]
    }],
    content: {
      type: 'atom',
      rel: 'self',
      src: 'dotstudiopro://fetchData?type=video&id=' + _id
    }
  };
}