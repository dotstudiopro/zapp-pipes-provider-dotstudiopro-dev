'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var handleNewsResponse = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(response, newsType, from, to) {
    var rawData, parsedNews, newsTypeTitle;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            rawData = (0, _utils.parseXML)(response.data);
            parsedNews = parseNews(rawData.News.Item);
            _context.next = 4;
            return getNewsTitleById(newsType);

          case 4:
            newsTypeTitle = _context.sent;
            return _context.abrupt('return', {
              id: newsType,
              title: newsTypeTitle,
              type: {
                value: 'feed'
              },
              entry: parsedNews.slice(from ? from - 1 : 0, to || parsedNews.length)
            });

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function handleNewsResponse(_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (_ref) {
  var from = _ref.from,
      to = _ref.to,
      _ref$newsType = _ref.newsType,
      newsType = _ref$newsType === undefined ? "0" : _ref$newsType;

  var url = 'http://www.maccabi.co.il/MaccabiServices/MaccabiServices.asmx/GetNews';
  return _axios2.default.get(url + '?item_id=0&c_type=' + newsType).then(function (res) {
    return handleNewsResponse(res, newsType, from, to);
  }).catch(function (e) {
    return Promise.reject('error connecting to maccabi api');
  });
};

function parseNews(news) {
  return news.map(function (item) {
    return parseItem(item);
  });
}

function parseItem(item) {
  return {
    type: {
      value: 'link'
    },
    updated: (0, _utils.parseDate)(item.NewsDate._cdata, 'DD/MM/YYYY'), //should follow ISO8601 date format.
    id: item.ID._text, //String
    title: item.Title._cdata,
    summary: item.Abstract._cdata,
    author: {
      name: '' //String
    },
    link: {
      href: (0, _utils.urlEncode)(item.Link ? item.Link._text : 'http://maccabi.co.il/newsApp.asp?id=' + item.ID._text),
      type: 'link'
    },
    media_group: [{
      type: 'image',
      media_item: [{
        src: item.WebPic ? item.WebPic._text || '' : '',
        key: 'image_base',
        type: 'image'
      }]
    }]
  };
}

function getNewsTitleById(id) {
  if (id === "0") return "כל החדשות";
  try {
    return _axios2.default.get('http://www.maccabi.co.il/MaccabiServices/MaccabiServices.asmx/GetNewsTypes').then(function (res) {
      var rawData = (0, _utils.parseXML)(res.data);
      return Promise.resolve(rawData.NewsTypes.Item.find(function (item) {
        return item.ID._text == id;
      }).Title._text);
    });
  } catch (e) {
    Promise.reject('error');
  }
}