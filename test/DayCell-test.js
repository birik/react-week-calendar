import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';

import DayCell from './../src/DayCell';

describe('DayCell', () => {
  let props;
  beforeEach(() => {
    props = {
      startTime: moment({ h: 10, m: 0 }),
      endTime: moment({ h: 11, m: 0 }),
      startSelection: () => {},
    };
  });

  it('render', () => {
    const wrapper = shallow(<DayCell {...props} />);
    expect(wrapper.find('.dayCell')).to.have.length(1);
  });

  it('mousedown', () => {
    const startSelection = sinon.spy();
    const wrapper = shallow(<DayCell {...props} startSelection={startSelection} />);
    wrapper.simulate('mousedown', { button: 0 });
    expect(startSelection.calledOnce).equal(true);
  });
});
