'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var _ref$c_type = _ref.c_type,
        c_type = _ref$c_type === undefined ? '0' : _ref$c_type;

    var url = 'http://www.maccabi.co.il/MaccabiServices/MaccabiServices.asmx/GetTable?c_type=' + c_type;
    return _axios2.default.get(url).then(handlePlayersResponse).catch(function (e) {
        return Promise.reject();
    });
};

function handlePlayersResponse(response) {
    var paersedResults = (0, _utils.parseXML)(response.data).Table;
    return {
        id: paersedResults._attributes.CompID,
        title: paersedResults._attributes.Name,
        type: {
            value: "feed"
        },
        entry: parseTeams(paersedResults.Team)
    };
}

function parseTeams(teams) {
    if (!teams) return [];
    return teams.map(parseTeam);
}

function parseTeam(team) {
    return {
        type: {
            value: 'link'
        },
        id: team.TeamID._text,
        title: team.TeamShortName._cdata,
        summary: team.TeamName._cdata,
        link: {
            href: "",
            rel: "alternate",
            type: "link"
        },
        media_group: [{
            type: "image",
            media_item: [{
                src: team.TeamLogo._text,
                key: "image_base",
                type: "image"
            }]
        }],
        extensions: {
            Place: team.TableData.Place._text,
            Games: team.TableData.Games._text,
            Win: team.TableData.Win._text,
            Lose: team.TableData.Lose._text,
            Score: team.TableData.Score1._text,
            Score2: team.TableData.Score2._text,
            Diff: team.TableData.Diff._text,
            Pts: team.TableData.Pts._text
        }
    };
}