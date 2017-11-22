import {expect} from 'chai';
import moment from 'moment';

import {getIntervalsByDuration, getMoment, getNumberOfCells} from './../src/Utils';

describe('Calendar Utils', () => {

  it('getIntervalsByDuration', () => {
    let duration = 15;
    let result = getIntervalsByDuration(duration, moment({hour: 0, minute: 0}), moment({hour: 23, minute: 59}));
    expect(result.length).to.equal(24 * 60 / duration);
  })

  it('getMoment', () => {
    let result = getMoment(15, 4);
    let expectedResult = moment({hour: 1, minute: 0});
    expect(result.isSame(expectedResult, 'minute')).to.equal(true);
  })

  it('getMoment - 23:59', () => {
    let result = getMoment(60, 24);
    let expectedResult = moment({hour: 23, minute: 59});
    expect(result.isSame(expectedResult, 'minute')).to.equal(true);
  })

  it('getMoment - more than 24h', () => {
    let result = getMoment(60, 25);
    let expectedResult = moment({hour: 23, minute: 59});
    expect(result.isSame(expectedResult, 'minute')).to.equal(true);
  })

  it('getNumberOfCells', () => {
    let timeStamp = moment({hour: 1, minute: 0});
    expect(getNumberOfCells(timeStamp, 15, false)).to.equal(4);
  })

  it('getNumberOfCells with up round', () => {
    let timeStamp = moment({hour: 1, minute: 15});
    expect(getNumberOfCells(timeStamp, 30, true)).to.equal(3);
  })

  it('getNumberOfCells with down round', () => {
    let timeStamp = moment({hour: 1, minute: 15});
    expect(getNumberOfCells(timeStamp, 30, false)).to.equal(2);
  })

  it('getNumberOfCells with case 23:59', () => {
    let timeStamp = moment({hour: 23, minute: 59});
    let duration = 30;
    expect(getNumberOfCells(timeStamp, duration, false)).to.equal(24 * 60 / duration);
  })

})
