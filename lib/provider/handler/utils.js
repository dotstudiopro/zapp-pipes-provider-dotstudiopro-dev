'use strict';

var moment = require('moment');
var axios = require('axios');
var jwt = require('jsonwebtoken');

axios.defaults.headers.post['Content-Type'] = 'application/json';

var authenticate = function authenticate(nativeBridge, api_key) {

  return new Promise(function (resolve, reject) {

    var token = JSON.parse(nativeBridge.getLocalStoreItem("token", "dotstudiopro"));
    var expires = JSON.parse(nativeBridge.getLocalStoreItem("expiry", "dotstudiopro"));
    var cdn = JSON.parse(nativeBridge.getLocalStoreItem("cdn", "dotstudiopro"));

    // if we have a token check to make sure it's not expired first
    if (token && token.length && expires && expires.length) {
      var decoded = jwt.decode(token);
      var now = moment();

      if (now > decoded.expires) {
        //need to get a new token here
        console.log("Current available token is expired, getting a new one.");
        getAccessToken(api_key, function (err, authObj) {
          if (err) reject(err);

          var token = authObj.token,
              expires = authObj.expires,
              cdn = authObj.cdn;

          nativeBridge.setLocalStoreItem("token", token, "dotstudiopro");
          nativeBridge.setLocalStoreItem("expiry", expires, "dotstudiopro");
          nativeBridge.setLocalStoreItem("cdn", cdn, "dotstudiopro");

          resolve(authObj);
        });
      } else {
        // return whatever is in session storage since it's still valid
        console.log("The current token is still valid");
        resolve({ token: token, expires: expires, cdn: cdn });
      }
    } else {
      console.log("No token in local storage, getting a new one.");
      getAccessToken(api_key, function (err, authObj) {
        if (err) reject(err);

        var token = authObj.token,
            expires = authObj.expires,
            cdn = authObj.cdn;

        nativeBridge.setLocalStoreItem("token", token, "dotstudiopro");
        nativeBridge.setLocalStoreItem("expiry", expires, "dotstudiopro");
        nativeBridge.setLocalStoreItem("cdn", cdn, "dotstudiopro");

        resolve(authObj);
      });
    }
  });
};

// Acquires an access token and company CDN value from Spotlight API
function getAccessToken(api_key, cb) {
  var returnObj = {};
  axios.post('https://api.myspotlight.tv/token?key=' + api_key).then(function (response) {
    if (response.data.success) {
      var token = response.data.token;

      returnObj.token = token;
      // decode token to save it's expiry time
      var decoded = jwt.decode(token);
      returnObj.expires = decoded.expires;
      return axios.get('https://api.myspotlight.tv/companies/analytics/config?token=' + token);
    } else {
      return cb('Cannot obtain access token from Spotlight API', null);
    }
  }).then(function (response) {
    returnObj.cdn = response.data.custom_cdn;
    return cb(null, returnObj);
  }).catch(function (error) {
    cb(error, null);
  });
}

function parseDate(date, format) {
  var event = moment(date, format);
  return event.format('YYYY-MM-DD');
}

function urlEncode(url) {
  return 'maccabi://present?linkUrl=' + encodeURIComponent(url) + '&showContext=true';
}

function sliceWrap(list) {
  var payload_size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var validator = arguments[2];

  if (payload_size > list.length) return list;
  var validatedItemId = validator ? list.findIndex(validator) : 0;
  var extraItemsLeft = Math.floor((payload_size - 1) / 2);
  var extraItemsRight = Math.ceil((payload_size - 1) / 2);
  var leftOutOfBound = extraItemsLeft > validatedItemId ? Math.abs(validatedItemId - extraItemsLeft) : 0;
  var rightOutOfBound = extraItemsRight > list.length - 1 - validatedItemId ? Math.abs(list.length - 1 - validatedItemId - extraItemsRight) : 0;
  var left = extraItemsLeft - leftOutOfBound + rightOutOfBound;
  var right = extraItemsRight - rightOutOfBound + leftOutOfBound;
  return list.slice(validatedItemId - left, validatedItemId + right + 1);
}

function compareTimes(a, b) {
  var A = moment(a, 'YYYY/MM/DD HH:mm:ss Z');
  var B = moment(b, 'YYYY/MM/DD HH:mm:ss Z');
  if (A.isSame(B)) return 0;
  return A.isBefore(B) ? -1 : 1;
}

module.exports = {
  authenticate: authenticate,
  parseDate: parseDate,
  urlEncode: urlEncode,
  sliceWrap: sliceWrap,
  compareTimes: compareTimes
};