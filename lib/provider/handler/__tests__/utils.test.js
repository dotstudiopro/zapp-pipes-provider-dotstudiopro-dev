'use strict';

var _utils = require('../utils');

describe('sliceWrap', function () {
  it('should return a list of n items wrapping a validated element', function () {
    expect((0, _utils.sliceWrap)([])).toEqual([]);
    expect((0, _utils.sliceWrap)([1])).toEqual([1]);
    expect((0, _utils.sliceWrap)([1, 2], 1)).toEqual([1]);
    expect((0, _utils.sliceWrap)([1, 2, 3], 4)).toEqual([1, 2, 3]);
    expect((0, _utils.sliceWrap)([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3]);
    expect((0, _utils.sliceWrap)([1, 2, 3, 4, 5, 6, 7], 4, function (val) {
      return val === 4;
    })).toEqual([3, 4, 5, 6]);
    expect((0, _utils.sliceWrap)([1, 2, 3, 4, 5], 1, function (val) {
      return val === 3;
    })).toEqual([3]);
    expect((0, _utils.sliceWrap)([1, 2, 3, 4, 5, 6], 3, function (val) {
      return val === 6;
    })).toEqual([4, 5, 6]);
    expect((0, _utils.sliceWrap)([1, 2, 3, 4, 5], 4, function (val) {
      return val === 4;
    })).toEqual([2, 3, 4, 5]);
    expect((0, _utils.sliceWrap)([1, 2, 3, 4, 5], 2, function (val) {
      return val === 1;
    })).toEqual([1, 2]);
  });
});

describe('compareTimes', function () {
  it("should return -1 if a is earlier then b", function () {
    expect((0, _utils.compareTimes)("2018/05/05 12:00:00 +02:00", "2018/05/06 12:00:00 +02:00")).toBe(-1);
    expect((0, _utils.compareTimes)("2018/05/05 12:00:00 +02:00", "2018/06/05 12:00:00 +02:00")).toBe(-1);
    expect((0, _utils.compareTimes)("2018/05/05 12:00:00 +02:00", "2019/05/05 12:00:00 +02:00")).toBe(-1);
    expect((0, _utils.compareTimes)("2018/05/05 12:00:00 +02:00", "2018/05/05 13:00:00 +02:00")).toBe(-1);
    expect((0, _utils.compareTimes)("2018/05/05 12:00:00 +02:00", "2018/05/05 12:01:00 +02:00")).toBe(-1);
    expect((0, _utils.compareTimes)("2018/05/05 12:00:00 +02:00", "2018/05/05 12:00:01 +02:00")).toBe(-1);
    expect((0, _utils.compareTimes)("2018/05/05 12:00:00 +02:00", "2018/05/05 12:00:00 +01:00")).toBe(-1);
  });
  it("should return 0 when times are equal", function () {
    expect((0, _utils.compareTimes)("2018/05/05 12:00:00 +02:00", "2018/05/05 12:00:00 +02:00")).toBe(0);
  });
  it("should return 1 if b is earlier then a", function () {
    expect((0, _utils.compareTimes)("2018/05/06 12:00:00 +02:00", "2018/05/05 12:00:00 +02:00")).toBe(1);
    expect((0, _utils.compareTimes)("2018/06/05 12:00:00 +02:00", "2018/05/05 12:00:00 +02:00")).toBe(1);
    expect((0, _utils.compareTimes)("2019/05/05 12:00:00 +02:00", "2018/05/05 12:00:00 +02:00")).toBe(1);
    expect((0, _utils.compareTimes)("2018/05/05 13:00:00 +02:00", "2018/05/05 12:00:00 +02:00")).toBe(1);
    expect((0, _utils.compareTimes)("2018/05/05 12:01:00 +02:00", "2018/05/05 12:00:00 +02:00")).toBe(1);
    expect((0, _utils.compareTimes)("2018/05/05 12:00:01 +02:00", "2018/05/05 12:00:00 +02:00")).toBe(1);
    expect((0, _utils.compareTimes)("2018/05/05 12:00:00 +01:00", "2018/05/05 12:00:00 +02:00")).toBe(1);
  });
});