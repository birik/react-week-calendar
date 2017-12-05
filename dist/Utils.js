'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffset = getOffset;
exports.getMoment = getMoment;
exports.getNumberOfCells = getNumberOfCells;
exports.getIntervalsByDuration = getIntervalsByDuration;
exports.getDayIntervals = getDayIntervals;
exports.getIntervals = getIntervals;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOffset(time) {
  var midnight = (0, _moment2.default)(time).startOf('day');
  return time.diff(midnight, 'm');
}

function getMoment(duration, numberOfUnits) {
  var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (duration * numberOfUnits + offset >= 24 * 60) {
    return (0, _moment2.default)({ h: 23, m: 59 });
  }
  return (0, _moment2.default)({ h: 0, m: 0 }).add(duration * numberOfUnits + offset, 'm');
}

function getNumberOfCells(time, duration, isUpRound) {
  var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var midnight = (0, _moment2.default)(time).startOf('day').add(offset, 'm');
  var testTime = (0, _moment2.default)(time);
  if (testTime.format('HH:mm') === '23:59') {
    testTime.add(1, 'm');
  }
  var result = isUpRound ? Math.ceil(testTime.diff(midnight, 'm') / duration) : Math.floor(testTime.diff(midnight, 'm') / duration);
  if (result < 0) {
    return 0;
  }
  return result;
}

function getIntervalsByDuration(duration, startTime, endTime) {
  var startIndex = getNumberOfCells(startTime, duration, false);
  var endIndex = getNumberOfCells(endTime, duration, true);
  var start = (0, _moment2.default)({ h: 0, m: 0 }).add(duration * startIndex, 'm');
  var end = void 0;
  var result = [];

  for (var i = startIndex; i < endIndex; i += 1) {
    end = start.clone().add(duration, 'm');
    var interval = {
      start: start,
      end: end
    };
    result.push(interval);
    start = end;
  }
  var lastElement = result.pop();
  if (lastElement.end.format('HH:mm') === '00:00') {
    lastElement = {
      start: lastElement.start,
      end: (0, _moment2.default)({ hour: 23, minute: 59 })
    };
  }
  result.push(lastElement);
  return result;
}

function getDayIntervals(day, scaleIntervals) {
  return scaleIntervals.map(function (scaleInterval) {
    var start = (0, _moment2.default)(day).hour(scaleInterval.start.hour()).minute(scaleInterval.start.minute()).second(0);
    var end = (0, _moment2.default)(day).hour(scaleInterval.end.hour()).minute(scaleInterval.end.minute()).second(0);
    return {
      start: start,
      end: end
    };
  });
}

function getIntervals(start, end) {
  var diffDays = end.diff(start, 'days');
  var result = [];

  for (var i = 0; i <= diffDays; i += 1) {
    var startInterval = (0, _moment2.default)(start).add(i, 'day');
    var endInterval = (0, _moment2.default)(start).add(i, 'day').hour(end.hour()).minute(end.minute()).second(0);
    result.push({
      start: startInterval,
      end: endInterval
    });
  }

  return result;
}