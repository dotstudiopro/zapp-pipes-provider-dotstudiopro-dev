'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (params) {
  var token = params.token;

  var url = 'https://api.myspotlight.tv/categories/US?platform=applicaster&token=' + token;
  return _axios2.default.get(url).then(handleCategoriesResponse).catch(function (e) {
    return Promise.reject();
  });
};

function handleCategoriesResponse(response) {
  var rawData = response.data.categories;
  var categories = rawData.map(function (category) {
    return parseCategory(category);
  });
  return {
    id: 'categories',
    title: 'Categories',
    type: {
      value: 'feed'
    },
    entry: categories
  };
}

function parseCategory(category) {
  var _id = category._id,
      name = category.name,
      slug = category.slug;


  var returnObj = {
    type: {
      value: 'feed'
    },
    id: _id,
    title: name,
    media_group: [],
    extensions: {},
    content: {
      type: 'atom',
      rel: 'self',
      src: 'dotstudiopro://fetchData?type=channels&category=' + slug //formatted url to retrieve this category's channels inside the Zapp app
    }
  };

  if (category.image && category.image.poster) {
    returnObj.media_group[0] = {
      "type": "image",
      "media_item": [{
        "type": "image",
        "key": "thumbnail",
        "src": category.image.poster
      }]
    };
  }

  return returnObj;
}