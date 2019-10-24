"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (params) {
  var token = params.token;
  var id = params.id,
      api_key = params.api_key;


  if (api_key) {
    var auth_url = "https://api.myspotlight.tv/token?key=" + api_key;

    return _axios2.default.post(auth_url).then(function (response) {
      if (response.data && response.data.success) {
        token = response.data.token;
        var url = "https://api.myspotlight.tv/video/play2/" + id + "?token=" + token;
        return _axios2.default.get(url);
      } else {
        throw "Could not obtain access token from Spotlight API, please check your API Key";
      }
    }).then(function (response) {
      if (response.data) {
        return handleVideoResponse(response.data, params);
      } else {
        throw "Video " + id + " not found";
      }
    }).catch(function (e) {
      return Promise.reject(e);
    });
  } else if (token) {
    var url = "https://api.myspotlight.tv/video/play2/" + id + "?token=" + token;
    return _axios2.default.get(url).then(function (response) {
      if (response.data) {
        return handleVideoResponse(response.data, params);
      } else {
        throw "Video " + id + " not found";
      }
    }).catch(function (e) {
      return Promise.reject(e);
    });
  } else {
    Promise.reject("One of either API Key in query or Access Token in local storage is required");
  }
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


  var url = cdn + "/files/company/" + company_id + "/assets/videos/" + _id + "/vod/" + _id + ".m3u8";

  var vmap_url = "https://api.myspotlight.tv/vmap/" + _id + "/" + deviceWidth + "/" + deviceHeight + "?device_type=" + platform + "&device_ifa=" + device_ifa;

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