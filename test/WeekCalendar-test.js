import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';

import * as CalendarUtils from './../src/Utils';
import WeekCalendar from './../src/WeekCalendar';
import CalendarBody from './../src/CalendarBody';
import CalendarHeader from './../src/CalendarHeader';
import ScaleColumn from './../src/ScaleColumn';
import DayCell from './../src/DayCell';
import Event from './../src/Event';


describe('WeekCalendar', () => {
  let props;
  const columnDimensions = [
    { left: 0, width: 100 },
    { left: 100, width: 100 },
    { left: 200, width: 100 },
    { left: 300, width: 100 },
    { left: 400, width: 100 },
    { left: 500, width: 100 },
    { left: 600, width: 100 },
    { left: 700, width: 100 },
  ];
  beforeEach(() => {
    props = {
      firstDay: moment(),
      numberOfDays: 3,
      scaleHeaderTitle: 'Test Header',
      dayFormat: 'DD.MM',
      startTime: moment({ h: 0, m: 0 }),
      endTime: moment({ h: 23, m: 59 }),
      scaleUnit: 30,
      scaleFormat: 'HH:mm',
      cellHeight: 30,
      dayCellComponent: DayCell,
      selectedIntervals: [],
      onIntervalSelect: () => {},
      eventComponent: Event,
    };
  });

  it('render', () => {
    const wrapper = shallow(<WeekCalendar {...props} />);
    expect(wrapper.find('.weekCalendar')).to.have.length(1);
    expect(wrapper.find('.weekCalendar__scaleHeader').text()).equal(props.scaleHeaderTitle);
    expect(wrapper.find(ScaleColumn)).to.have.length(1);
    expect(wrapper.find(ScaleColumn).prop('scaleIntervals')).to.have.length(24 * 60 / props.scaleUnit);
    expect(wrapper.find(CalendarHeader)).to.have.length(1);
    expect(wrapper.find(CalendarBody)).to.have.length(1);
  });

  it('calculate column dimension', () => {
    const savedQuerySelectorAll = global.document.querySelectorAll;
    const testFunction = () => [{
      getBoundingClientRect: () => ({
        width: 100,
      }),
    }];

    global.document.querySelectorAll = testFunction;
    const wrapper = mount(<WeekCalendar {...props} />);
    global.document.querySelectorAll = savedQuerySelectorAll; // restore old function
    expect(wrapper.state('columnDimensions')[0]).to.deep.equal({ width: 100, left: 0 });
    expect(wrapper.state('columnDimensions')[props.numberOfDays - 1]).to.deep.equal({ width: 100, left: (props.numberOfDays - 1) * 100 });
  });

  it('recalculate intervals when receive new props', () => {
    const wrapper = shallow(<WeekCalendar {...props} />);
    const newProps = {
      ...props,
      scaleUnit: 60,
    };
    wrapper.setProps(newProps);
    expect(wrapper.state('scaleIntervals')).to.deep.equal(CalendarUtils.getIntervalsByDuration(newProps.scaleUnit, moment({ h: 0, m: 0 }), moment({ h: 23, m: 59 })));
  });

  it('handle scroll', () => {
    const wrapper = shallow(<WeekCalendar {...props} />);
    wrapper.find('.weekCalendar__content').simulate('scroll', {
      target: {
        scrollTop: 100,
        scrollLeft: 200,
      },
    });
    expect(wrapper.find('.weekCalendar__header').prop('style')).to.deep.equal({ left: -200 });
    expect(wrapper.find('.weekCalendar__scaleColumn').prop('style')).to.deep.equal({ top: -100 });
  });

  it('no update state on mouse enter because no selection started', () => {
    const wrapper = shallow(<WeekCalendar {...props} />);
    wrapper.setState({ columnDimensions, startSelectionPosition: null, mousePosition: null });
    wrapper.find(CalendarBody).props().onCellMouseEnter(0, 0);
    expect(wrapper.state('mousePosition')).equal(null);
  });

  it('update state on mouse enter', () => {
    const wrapper = shallow(<WeekCalendar {...props} />);
    const startPosition = {
      x: 0,
      y: 0,
    };
    wrapper.setState({ columnDimensions, startSelectionPosition: startPosition, mousePosition: startPosition });
    wrapper.find(CalendarBody).props().onCellMouseEnter(1, 1);
    expect(wrapper.state('mousePosition')).to.deep.equal({ x: 1, y: 1 });
    expect(wrapper.state('startSelectionPosition')).to.deep.equal(startPosition);
  });

  it('mouseup - right click', () => {
    const onIntervalSelect = sinon.spy();
    const wrapper = mount(<WeekCalendar {...props} onIntervalSelect={onIntervalSelect} />);
    wrapper.simulate('mouseup', { button: 2 });
    expect(onIntervalSelect.notCalled).equal(true);
  });
});
