'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (params) {
  var id = params.id,
      token = params.token,
      cdn = params.cdn;

  var url = 'https://api.myspotlight.tv/video/play2/' + id + '?token=' + token;
  return _axios2.default.get(url).then(function (response) {
    return handleVideoResponse(response.data, cdn);
  }).catch(function (e) {
    return Promise.reject();
  });
};

function handleVideoResponse(response, cdn) {
  var entry = parseVideo(response, cdn);
  return {
    id: 'video',
    title: 'Video',
    type: {
      value: 'video'
    },
    entry: [entry]
  };
}

function parseVideo(video, cdn) {
  var _id = video._id,
      title = video.title,
      description = video.description,
      company_id = video.company_id;


  var url = 'https://' + cdn + '/files/company/' + company_id + '/assets/videos/' + _id + '/vod/' + _id + '.m3u8';

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
        "key": "thumbnail",
        "src": "https://images.dotstudiopro.com/" + video.thumb
      }]
    }],
    "content": {
      "type": "video/hls",
      "src": url
    }
  };
}