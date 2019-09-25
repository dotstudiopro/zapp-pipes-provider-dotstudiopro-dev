'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEuroleagueLivaData = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getEuroleagueLivaData = exports.getEuroleagueLivaData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(game, ex_game_id) {
    var games_response, parsedGame;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios2.default.get('http://live.euroleague.net/service.ashx?method=gamesxml&user=' + USER + '&password=' + PASSWORD);

          case 3:
            games_response = _context.sent;

            if ((0, _utils.parseXML)(games_response.data).games) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return _axios2.default.get('http://live.euroleague.net/service.ashx?method=gamesxml&user=' + USER + '&password=' + PASSWORD);

          case 7:
            games_response = _context.sent;

          case 8:
            parsedGame = (0, _utils.parseXML)(games_response.data).games.game.find(function (item) {
              return item.team1._cdata.toLowerCase().includes('maccabi') || item.team2._cdata.toLowerCase().includes('maccabi');
            });
            return _context.abrupt('return', Promise.resolve(_extends({}, game, {
              extensions: _extends({}, game.extensions, {

                currentQuarter: Math.ceil(parsedGame.minute._text.split(':')[0] / 10) <= 4 ? Math.ceil(parsedGame.minute._text.split(':')[0] / 10) : 'OT',
                currentQuarterTimeMinutes: parsedGame.minute._text.split(':')[0] % 10,
                home_team_score: parsedGame.homepts._text,
                away_team_score: parsedGame.awaypts._text
              })
            })));

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', Promise.resolve(game));

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 12]]);
  }));

  return function getEuroleagueLivaData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var USER = 'maccabi';
var PASSWORD = 'C547D7E5817A28D55DAA5AF1477DC1FA8ABC0CE3';