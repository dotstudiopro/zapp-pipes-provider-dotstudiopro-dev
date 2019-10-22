'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (params) {
  var id = params.id,
      token = params.token;

  var url = 'https://api.myspotlight.tv/video/play2/' + id + '?token=' + token;
  return _axios2.default.get(url).then(function (response) {
    return handleVideoResponse(response.data, params);
  }).catch(function (e) {
    return Promise.reject(e);
  });
};

function handleVideoResponse(response, params) {
  var entry = parseVideo(response, params);
  return {
    id: 'video',
    title: 'Video',
    type: {
      value: 'video'
    },
    entry: [entry]
  };
}

function parseVideo(video, params) {
  var _id = video._id,
      title = video.title,
      description = video.description,
      company_id = video.company_id;
  var cdn = params.cdn,
      deviceWidth = params.deviceWidth,
      deviceHeight = params.deviceHeight,
      platform = params.platform,
      device_ifa = params.device_ifa;


  var url = cdn + '/files/company/' + company_id + '/assets/videos/' + _id + '/vod/' + _id + '.m3u8';

  var vmap_url = 'https://api.myspotlight.tv/vmap/' + _id + '/' + deviceWidth + '/' + deviceHeight + '?device_type=' + platform + '&device_ifa=' + device_ifa;

  return {
    type: {
      value: 'video'
    },
    id: _id,
    title: title,
    summary: description,
    media_group: [{
      "type": "image",
      "media_item": [{
        "type": "image",
        "key": "image_base",
        "src": video.thumb
      }]
    }],
    "content": {
      "type": "video/hls",
      "src": url
    },
    "extensions": {
      "video_ads": vmap_url
    }
  };
}