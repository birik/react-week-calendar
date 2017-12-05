import moment from 'moment';

export function getOffset(time) {
  const midnight = moment(time).startOf('day');
  return time.diff(midnight, 'm');
}

export function getMoment(duration, numberOfUnits, offset = 0) {
  if ((duration * numberOfUnits) + offset >= 24 * 60) {
    return moment({ h: 23, m: 59 });
  }
  return moment({ h: 0, m: 0 }).add((duration * numberOfUnits) + offset, 'm');
}

export function getNumberOfCells(time, duration, isUpRound, offset = 0) {
  const midnight = moment(time).startOf('day').add(offset, 'm');
  const testTime = moment(time);
  if (testTime.format('HH:mm') === '23:59') {
    testTime.add(1, 'm');
  }
  const result = isUpRound ? Math.ceil(testTime.diff(midnight, 'm') / duration) : Math.floor(testTime.diff(midnight, 'm') / duration);
  if (result < 0) {
    return 0;
  }
  return result;
}

export function getIntervalsByDuration(duration, startTime, endTime) {
  const startIndex = getNumberOfCells(startTime, duration, false);
  const endIndex = getNumberOfCells(endTime, duration, true);
  let start = moment({ h: 0, m: 0 }).add(duration * startIndex, 'm');
  let end;
  const result = [];

  for (let i = startIndex; i < endIndex; i += 1) {
    end = start.clone().add(duration, 'm');
    const interval = {
      start,
      end,
    };
    result.push(interval);
    start = end;
  }
  let lastElement = result.pop();
  if (lastElement.end.format('HH:mm') === '00:00') {
    lastElement = {
      start: lastElement.start,
      end: moment({ hour: 23, minute: 59 }),
    };
  }
  result.push(lastElement);
  return result;
}

export function getDayIntervals(day, scaleIntervals) {
  return scaleIntervals.map((scaleInterval) => {
    const start = moment(day)
      .hour(scaleInterval.start.hour())
      .minute(scaleInterval.start.minute())
      .second(0);
    const end = moment(day)
      .hour(scaleInterval.end.hour())
      .minute(scaleInterval.end.minute())
      .second(0);
    return {
      start,
      end,
    };
  });
}

export function getIntervals(start, end) {
  const diffDays = end.diff(start, 'days');
  const result = [];

  for (let i = 0; i <= diffDays; i += 1) {
    const startInterval = moment(start).add(i, 'day');
    const endInterval = moment(start).add(i, 'day').hour(end.hour()).minute(end.minute())
      .second(0);
    result.push({
      start: startInterval,
      end: endInterval,
    });
  }

  return result;
}
