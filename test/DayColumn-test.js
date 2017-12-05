import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';

import * as CalendarUtils from './../src/Utils';
import DayColumn from './../src/DayColumn';
import DayCell from './../src/DayCell';

describe('DayColumn', () => {
  let props;
  beforeEach(() => {
    props = {
      colPos: 3,
      dayIntervals: CalendarUtils.getIntervalsByDuration(15, moment({ h: 0, m: 0 }), moment({ h: 23, m: 59 })),
      cellHeight: 35,
      dayCellComponent: DayCell,
      onSelectionStart: () => {},
      onCellMouseEnter: () => {},
    };
  });

  it('render', () => {
    const wrapper = mount(<DayColumn {...props} />);
    expect(wrapper.find('.calendarBody__column')).to.have.length(1);
    expect(wrapper.find(`[data-colpos=${props.colPos}]`)).to.have.length(1);
    expect(wrapper.find('.calendarBody__cell')).to.have.length(props.dayIntervals.length);
    expect(wrapper.find('.calendarBody__cell').everyWhere(cell => cell.prop('style').height === props.cellHeight)).equal(true);
    expect(wrapper.find(DayCell)).to.have.length(props.dayIntervals.length);
  });

  it('mouseenter', () => {
    const onCellMouseEnter = sinon.spy();
    const wrapper = shallow(<DayColumn {...props} onCellMouseEnter={onCellMouseEnter} />);
    wrapper.find('.calendarBody__cell').last().simulate('mouseenter');
    expect(onCellMouseEnter.calledOnce).equal(true);
    expect(onCellMouseEnter.args).deep.equals([[props.colPos, props.dayIntervals.length - 1]]);
  });

  it('mousedown', () => {
    const onSelectionStart = sinon.spy();
    const wrapper = mount(<DayColumn {...props} onSelectionStart={onSelectionStart} />);
    wrapper.find(DayCell).first().find('.dayCell').simulate('mousedown', { button: 0 });
    expect(onSelectionStart.calledOnce).equal(true);
    expect(onSelectionStart.args).deep.equals([[props.colPos, 0]]);
  });

  it('mousedown - right click', () => {
    const onSelectionStart = sinon.spy();
    const wrapper = mount(<DayColumn {...props} onSelectionStart={onSelectionStart} />);
    wrapper.find(DayCell).first().find('.dayCell').simulate('mousedown', { button: 2 });
    expect(onSelectionStart.notCalled).equal(true);
  });
});
