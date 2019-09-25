'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var handleResponse = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(response, c_type, num_of_items, game_list) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = c_type.join(', ');
            _context2.next = 3;
            return getEventTypeById(c_type);

          case 3:
            _context2.t1 = _context2.sent;
            _context2.t2 = {
              value: 'match_box'
            };
            _context2.t3 = num_of_items === '0' ? response.filter(function (item) {
              return item.extensions.status == 3;
            }) : game_list === '0' ? getGameList(response, num_of_items) : response.slice(0, num_of_items);
            return _context2.abrupt('return', {
              id: _context2.t0,
              title: _context2.t1,
              type: _context2.t2,
              entry: _context2.t3
            });

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function handleResponse(_x2, _x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

// map through all c_types and returns sorted combined result
var responseMapper = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(url, c_types, ex_game_id, game_list) {
    var _this = this;

    var promises, response, b;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            promises = c_types.map(function () {
              var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(c_type) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return _axios2.default.get(url + '?game_list=' + game_list + '&c_type=' + c_type);

                      case 2:
                        return _context3.abrupt('return', _context3.sent);

                      case 3:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this);
              }));

              return function (_x10) {
                return _ref5.apply(this, arguments);
              };
            }());
            _context6.next = 3;
            return Promise.all(promises);

          case 3:
            response = _context6.sent;
            _context6.t0 = _lodash.flatten;
            _context6.next = 7;
            return Promise.all(response.map(function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(item) {
                var rawData, parsedData, a;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        rawData = (0, _utils.parseXML)(item.data);
                        parsedData = rawData.Games.Game ? parseData(rawData.Games.Game, ex_game_id, c_types.join(', ')) : [];
                        a = parsedData.map(function () {
                          var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(item) {
                            var liveItem;
                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                              while (1) {
                                switch (_context4.prev = _context4.next) {
                                  case 0:
                                    if (!(item.extensions.status === '3')) {
                                      _context4.next = 7;
                                      break;
                                    }

                                    _context4.next = 3;
                                    return getLiveData(item, ex_game_id);

                                  case 3:
                                    liveItem = _context4.sent;
                                    return _context4.abrupt('return', liveItem);

                                  case 7:
                                    return _context4.abrupt('return', item);

                                  case 8:
                                  case 'end':
                                    return _context4.stop();
                                }
                              }
                            }, _callee4, _this);
                          }));

                          return function (_x12) {
                            return _ref7.apply(this, arguments);
                          };
                        }());
                        _context5.next = 5;
                        return Promise.all(a);

                      case 5:
                        return _context5.abrupt('return', _context5.sent);

                      case 6:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, _this);
              }));

              return function (_x11) {
                return _ref6.apply(this, arguments);
              };
            }()));

          case 7:
            _context6.t1 = _context6.sent;
            b = (0, _context6.t0)(_context6.t1);
            return _context6.abrupt('return', b);

          case 10:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function responseMapper(_x6, _x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

var getLiveData = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(game, ex_game_id) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.t0 = game.title;
            _context7.next = _context7.t0 === 'יורוליג' ? 3 : _context7.t0 === 'ליגת ווינר-סל' ? 7 : 11;
            break;

          case 3:
            _context7.next = 5;
            return (0, _euroleagueLivaData.getEuroleagueLivaData)(game, ex_game_id);

          case 5:
            return _context7.abrupt('return', _context7.sent);

          case 7:
            _context7.next = 9;
            return (0, _segevLiveData.getSegevLiveData)(game, ex_game_id);

          case 9:
            return _context7.abrupt('return', _context7.sent);

          case 11:
            return _context7.abrupt('return', game);

          case 12:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function getLiveData(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utils = require('../utils');

var _matchBoxMapper = require('./matchBoxMapper');

var _euroleagueLivaData = require('./euroleagueLivaData');

var _segevLiveData = require('./segevLiveData');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function (_ref) {
  var _ref$c_type = _ref.c_type,
      c_type = _ref$c_type === undefined ? '0' : _ref$c_type,
      _ref$num_of_items = _ref.num_of_items,
      num_of_items = _ref$num_of_items === undefined ? '0' : _ref$num_of_items,
      _ref$game_list = _ref.game_list,
      game_list = _ref$game_list === undefined ? '0' : _ref$game_list,
      ex_game_id = _ref.ex_game_id;

  var url = 'http://www.maccabi.co.il/MaccabiServices/MaccabiServices.asmx/GetGames';
  var c_types = parseCType(c_type);
  return responseMapper(url, c_types, ex_game_id, game_list).then(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return handleResponse(res, c_types, num_of_items, game_list);

            case 2:
              return _context.abrupt('return', _context.sent);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }()).catch(function (e) {
    return Promise.reject('error connecting to maccabi api');
  });
};

function getGameList(games, num_of_items) {
  var _finishedGames = games.filter(function (item) {
    return item.extensions.status == 1;
  });
  var liveGames = games.filter(function (item) {
    return item.extensions.status == 3;
  });
  var _unfinishedGames = games.filter(function (item) {
    return item.extensions.status == 2;
  });
  var finishedGames = _finishedGames.slice(_finishedGames.length - 2, _finishedGames.length);
  var unfinishedGames = _unfinishedGames.slice(0, num_of_items - finishedGames.length - liveGames.length);
  return [].concat(_toConsumableArray(finishedGames), _toConsumableArray(liveGames), _toConsumableArray(unfinishedGames));
}

function parseCType(c_type) {
  return c_type.toString().split(',');
}

function parseData(data, ex_game_id, league_type) {
  return data.map(function (item) {
    return (0, _matchBoxMapper.mapMatchBox)(item, ex_game_id, league_type);
  });
}

function getEventTypeById(c_types) {
  if (c_types.includes('0')) return 'כל המשחקים';
  return _axios2.default.get('http://www.maccabi.co.il/MaccabiServices/MaccabiServices.asmx/GetEventsTypes').then(function (response) {
    var rawData = (0, _utils.parseXML)(response.data);
    var data = rawData.EventsTypes.Item.filter(function (item) {
      return c_types.includes(item.ID._text);
    });
    return data.map(function (item) {
      return item.Title._text;
    }).join(', ');
  });
}