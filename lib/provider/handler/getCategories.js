'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var url = 'https://fb3afd02.ngrok.io/categories/US?platform=applicaster&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NDA4YWVkYTk3ZjgxNWY5NWQ3YjIzYzYiLCJleHBpcmVzIjoxNTcxODUxNzkzNzk5LCJjb250ZXh0Ijp7Im5hbWUiOiJ0ZXN0Iiwic3ViZG9tYWluIjoidGVzdCIsInJlYWRfb25seSI6ZmFsc2V9fQ.UPsQD6Oas5Muu36C3Mo1u6KIvyuaJvaGdbcEMAPYDag';
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


  return {
    type: {
      value: 'feed'
    },
    _id: _id,
    title: name,
    media_group: [],
    extensions: {},
    content: {
      type: 'atom',
      rel: 'self',
      src: 'dotstudiopro://fetchData?type=channels&slug=' + slug //formatted url to retrieve this category's channels inside the Zapp app
    }
  };
}