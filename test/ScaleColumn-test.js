import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';

import * as CalendarUtils from './../src/Utils';
import ScaleColumn from './../src/ScaleColumn';

describe('ScaleColumn', () => {
  let props;
  beforeEach(() => {
    props = {
      scaleUnit: 60,
      scaleFormat: 'HH:mm',
      scaleIntervals: CalendarUtils.getIntervalsByDuration(60, moment({ h: 0, m: 0 }), moment({ h: 23, m: 59 })),
      cellHeight: 35,
    };
  });

  it('render', () => {
    const wrapper = shallow(<ScaleColumn {...props} />);
    expect(wrapper.find('.weekCalendar__scaleCell')).to.have.length(props.scaleIntervals.length);
    expect(wrapper.find('.weekCalendar__scaleCell').at(0).text()).equal('00:00');
    expect(wrapper.find('.weekCalendar__scaleCell').at(1).text()).equal('01:00');
    expect(wrapper.find('.weekCalendar__scaleCell').everyWhere(cell => cell.prop('style').height == props.cellHeight)).equal(true);
  });

  it('should update when change cellHeight', () => {
    const wrapper = shallow(<ScaleColumn {...props} />);
    expect(wrapper.find('.weekCalendar__scaleCell').everyWhere(cell => cell.prop('style').height == props.cellHeight)).equal(true);
    const cellHeight = 10;
    const newProps = {
      ...props,
      cellHeight,
    };
    wrapper.setProps(newProps);
    expect(wrapper.find('.weekCalendar__scaleCell').everyWhere(cell => cell.prop('style').height == props.cellHeight)).equal(false);
    expect(wrapper.find('.weekCalendar__scaleCell').everyWhere(cell => cell.prop('style').height == newProps.cellHeight)).equal(true);
  });

  it('should update when change scaleUnit', () => {
    const wrapper = shallow(<ScaleColumn {...props} />);
    expect(wrapper.find('.weekCalendar__scaleCell')).to.have.length(props.scaleIntervals.length);
    expect(wrapper.find('.weekCalendar__scaleCell').at(0).text()).equal('00:00');
    const scaleUnit = 30;
    const scaleIntervals = CalendarUtils.getIntervalsByDuration(30, moment({ h: 1, m: 0 }), moment({ h: 23, m: 59 }));
    const newProps = {
      ...props,
      scaleUnit,
      scaleIntervals,
    };
    wrapper.setProps(newProps);
    expect(wrapper.find('.weekCalendar__scaleCell')).to.have.length(scaleIntervals.length);
    expect(wrapper.find('.weekCalendar__scaleCell').at(0).text()).equal('01:00');
  });
});
