'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var url = 'http://www.maccabi.co.il/MaccabiServices/MaccabiServices.asmx/GetPlayers';
  return _axios2.default.get(url).then(handlePlayersResponse).catch(function (e) {
    return Promise.reject();
  });
};

function handlePlayersResponse(response) {
  var rawData = (0, _utils.parseXML)(response.data);
  var players = rawData.Players.Player.map(function (player) {
    return parsePlayer(player);
  });
  return {
    id: 'players',
    title: 'שחקנים',
    type: {
      value: 'feed'
    },
    entry: players
  };
}

function parsePlayer(player) {
  return {
    type: {
      value: 'link'
    },
    id: player.ID._text,
    title: player.Name._cdata,
    summary: player.About._cdata || '-',
    author: {
      name: player.Name._cdata
    },
    link: {
      href: (0, _utils.urlEncode)('http://maccabi.co.il/playerApp.asp?PlayerID=' + player.ID._text),
      type: 'link'
    },
    media_group: [{
      type: 'image',
      media_item: [{
        src: player.Pic._text,
        key: 'image_base',
        type: 'image'
      }]
    }]
  };
}