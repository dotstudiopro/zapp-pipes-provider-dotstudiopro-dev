'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapMatchBox = mapMatchBox;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEmpty(obj) {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}
function mapMatchBox(Game, ex_game_id, league_type) {
  var res = {
    type: {
      value: ''
    },
    id: Game.ID._text,
    title: Game.GameTypeTxt._text,
    summary: '',
    author: {
      name: 'maccabi'
    },
    link: {
      href: (0, _utils.urlEncode)('http://maccabi.co.il/gameZoneApp.asp?gameID=' + Game.ID._text),
      type: 'link'
    },
    media_group: [{
      type: 'team1_logo',
      media_item: [{
        src: Game.Team1Logo._text,
        key: 'image_base',
        type: 'image'
      }, {
        src: Game.Team2Logo._text,
        key: 'image_base',
        type: 'image'
      }]
    }],
    extensions: {
      status: isEmpty(Game.GamePBP) ? Game.GameStatus._text : '3',
      //date formatted string with this format "yyyy/MM/dd HH:mm:ss Z". exsample: "2018/06/26 19:45:00 +0000"
      match_date: (0, _moment2.default)('' + Game.GameDate._text + (Game.GameTime._text ? ' ' + Game.GameTime._text : ''), ['DD/MM/YYYY', 'DD/MM/YYYY HH:mm']).format('YYYY/MM/DD HH:mm:ss Z'),

      home_team_name: Game.Team1Name._cdata,
      home_team_score: Game.Team1Score._text,
      away_team_name: Game.Team2Name._cdata,
      away_team_score: Game.Team2Score._text,
      match_stadium: Game.GamePlace._cdata,
      match_round: Game.Round._text,
      match_winner: Game.HomeAway._text,
      tickets_url: Game.IsBuyTicketsActive._text === 'True' ? (0, _utils.urlEncode)(Game.GameTicketsURL._text) : '',
      currentQuarter: '',
      currentQuarterTimeMinutes: '',
      gamePBP: !isEmpty(Game.GamePBP) ? Game.GamePBP._text : '',
      ex_game_id: !isEmpty(Game.GamePBP) ? Game.GamePBP._text.split('/')[Game.GamePBP._text.split('/').length - 2] : '', //Game.ExternalID._text,
      league_type: league_type
    }
  };
  //if (!isEmpty(Game.GamePBP)) console.log(res);
  return res;
}