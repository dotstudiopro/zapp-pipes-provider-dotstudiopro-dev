"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (params) {
  var token = params.token;
  var api_key = params.api_key,
      category = params.category;


  if (api_key) {
    var auth_url = "https://api.myspotlight.tv/token?key=" + api_key;
    return _axios2.default.post(auth_url).then(function (response) {
      if (response.data && response.data.success) {
        token = response.data.token;
        var url = "https://api.myspotlight.tv/channels/US/" + category + "?token=" + token;
        return _axios2.default.get(url);
      } else {
        throw "Could not obtain access token from Spotlight API, please check your API Key";
      }
    }).then(function (response) {
      var channels = response.data.channels;

      if (channels) {
        return handleChannelsResponse(channels, category);
      } else {
        throw "No channels found in category " + category;
      }
    }).catch(function (e) {
      return Promise.reject(e);
    });
  } else if (token) {
    var url = "https://api.myspotlight.tv/channels/US/" + category + "?token=" + token;
    return _axios2.default.get(url).then(function (response) {
      var channels = response.data.channels;

      if (channels) {
        return handleChannelsResponse(channels, category);
      } else {
        throw "No channels found in category " + category;
      }
    }).catch(function (e) {
      return Promise.reject(e);
    });
  } else {
    Promise.reject("One of either API Key in query or Access Token in local storage is required");
  }
};

function handleChannelsResponse(response, category) {
  var channels = [];

  response.forEach(function (channel) {
    if (channel.childchannels.length) {
      // case 1 - parent so need to get children individually
      channel.childchannels.forEach(function (child) {
        channels.push(parseChannel(child, category));
      });
    } else if (channel.playlist.length) {
      // case 2 - channel with a playlist
      channels.push(parseChannel(channel, category));
    } else if (channel.video) {
      channels.push(parseVideoChannel(channel));
    }
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

function parseChannel(channel, category) {
  var _id = channel._id,
      title = channel.title,
      slug = channel.slug;


  return {
    type: {
      value: 'feed'
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
      src: "dotstudiopro://fetchData?type=channel&category=" + category + "&slug=" + slug
    },
    link: {
      rel: 'self',
      type: 'feed',
      href: "dotstudiopro://fetchData?type=channel&category=" + category + "&slug=" + slug
    }
  };
}

function parseVideoChannel(channel) {
  var _id = channel._id,
      title = channel.title,
      description = channel.description;

  var video_id = channel.video._id;

  return {
    type: {
      value: 'program'
    },
    id: _id,
    title: title,
    summary: description,
    media_group: [{
      type: 'image',
      media_item: [{
        src: channel.spotlight_poster || channel.poster,
        key: 'image_base',
        type: 'image'
      }]
    }],
    extensions: {},
    "content": {
      "type": "video/hls",
      "src": "dotstudiopro://fetchData?type=video&id=" + video_id
    },
    link: {
      rel: "self",
      href: "dotstudiopro://fetchData?type=video&id=" + video_id
    }
  };
}