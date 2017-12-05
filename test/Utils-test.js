import { expect } from 'chai';
import moment from 'moment';

import { getIntervalsByDuration, getMoment, getNumberOfCells } from './../src/Utils';

describe('Calendar Utils', () => {
  it('getIntervalsByDuration', () => {
    const duration = 15;
    const result = getIntervalsByDuration(duration, moment({ hour: 0, minute: 0 }), moment({ hour: 23, minute: 59 }));
    expect(result.length).to.equal(24 * 60 / duration);
  });

  it('getMoment', () => {
    const result = getMoment(15, 4);
    const expectedResult = moment({ hour: 1, minute: 0 });
    expect(result.isSame(expectedResult, 'minute')).to.equal(true);
  });

  it('getMoment - 23:59', () => {
    const result = getMoment(60, 24);
    const expectedResult = moment({ hour: 23, minute: 59 });
    expect(result.isSame(expectedResult, 'minute')).to.equal(true);
  });

  it('getMoment - more than 24h', () => {
    const result = getMoment(60, 25);
    const expectedResult = moment({ hour: 23, minute: 59 });
    expect(result.isSame(expectedResult, 'minute')).to.equal(true);
  });

  it('getNumberOfCells', () => {
    const timeStamp = moment({ hour: 1, minute: 0 });
    expect(getNumberOfCells(timeStamp, 15, false)).to.equal(4);
  });

  it('getNumberOfCells with up round', () => {
    const timeStamp = moment({ hour: 1, minute: 15 });
    expect(getNumberOfCells(timeStamp, 30, true)).to.equal(3);
  });

  it('getNumberOfCells with down round', () => {
    const timeStamp = moment({ hour: 1, minute: 15 });
    expect(getNumberOfCells(timeStamp, 30, false)).to.equal(2);
  });

  it('getNumberOfCells with case 23:59', () => {
    const timeStamp = moment({ hour: 23, minute: 59 });
    const duration = 30;
    expect(getNumberOfCells(timeStamp, duration, false)).to.equal(24 * 60 / duration);
  });
});
