'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSegevLiveData = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getSegevLiveData = exports.getSegevLiveData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(game, ex_game_id) {
    var response, gameInfo, res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios2.default.get('http://basket.co.il/pbp/json_live/' + game.extensions.ex_game_id + '_boxscore.json');

          case 3:
            response = _context.sent;
            gameInfo = response.data.result.boxscore.gameInfo;
            res = _extends({}, game, {
              extensions: _extends({}, game.extensions, {
                currentQuarter: gameInfo.currentQuarter,
                currentQuarterTimeMinutes: gameInfo.currentQuarterTime.m,
                home_team_score: gameInfo.homeScore,
                away_team_score: gameInfo.awayScore
              })
            });
            return _context.abrupt('return', Promise.resolve(res));

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);

            console.log('error', _context.t0);
            return _context.abrupt('return', Promise.resolve(game));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 9]]);
  }));

  return function getSegevLiveData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }