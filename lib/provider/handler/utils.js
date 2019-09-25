'use strict';

var moment = require('moment');
var axios = require('axios');
var jwt = require('jsonwebtoken');

// function authenticate(api_key) {

// }


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
  parseDate: parseDate,
  urlEncode: urlEncode,
  sliceWrap: sliceWrap,
  compareTimes: compareTimes
};