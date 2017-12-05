import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';

import * as CalendarUtils from './../src/Utils';
import DayColumn from './../src/DayColumn';
import DayCell from './../src/DayCell';
import CalendarBody from './../src/CalendarBody';

describe('CalendarBody', () => {
  let props;
  beforeEach(() => {
    props = {
      firstDay: moment(),
      numberOfDays: 3,
      scaleUnit: 60,
      scaleIntervals: CalendarUtils.getIntervalsByDuration(60, moment({ h: 0, m: 0 }), moment({ h: 23, m: 59 })),
      cellHeight: 30,
      dayCellComponent: DayCell,
      onSelectionStart: () => {},
      onCellMouseEnter: () => {},
    };
  });

  it('render', () => {
    const wrapper = shallow(<CalendarBody {...props} />);
    expect(wrapper.find('.calendarBody')).to.have.length(1);
    expect(wrapper.find(DayColumn)).to.have.length(props.numberOfDays);
    expect(wrapper.find(DayColumn).everyWhere(comp => comp.prop('dayIntervals').length == props.scaleIntervals.length)).equal(true);
  });

  it('should update when cellHeight change', () => {
    const wrapper = shallow(<CalendarBody {...props} />);
    const newProps = {
      ...props,
      cellHeight: 10,
    };
    wrapper.setProps(newProps);
    expect(wrapper.find(DayColumn).find({ cellHeight: props.cellHeight })).to.have.length(0);
    expect(wrapper.find(DayColumn).find({ cellHeight: newProps.cellHeight })).to.have.length(newProps.numberOfDays);
  });

  it('should update when scaleUnit change', () => {
    const wrapper = shallow(<CalendarBody {...props} />);
    const newProps = {
      ...props,
      scaleUnit: 30,
    };
    wrapper.setProps(newProps);
    expect(wrapper.find(DayColumn).find({ scaleUnit: props.scaleUnit })).to.have.length(0);
    expect(wrapper.find(DayColumn).find({ scaleUnit: newProps.scaleUnit })).to.have.length(newProps.numberOfDays);
  });

  it('should update when numberOfDays change', () => {
    const wrapper = shallow(<CalendarBody {...props} />);
    expect(wrapper.find(DayColumn)).to.have.length(props.numberOfDays);
    const newProps = {
      ...props,
      numberOfDays: 5,
    };
    wrapper.setProps(newProps);
    expect(wrapper.find(DayColumn)).to.have.length(newProps.numberOfDays);
  });
});
