import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';

import CalendarHeader from './../src/CalendarHeader';
import HeaderCell from './../src/HeaderCell';

describe('CalendarHeader', () => {
  let props;
  beforeEach(() => {
    props = {
      firstDay: moment(),
      numberOfDays: 3,
      dayFormat: 'DD.MM.',
      columnDimensions: [{ width: 100 }, { width: 100 }, { width: 100 }],
      headerCellComponent: HeaderCell,
    };
  });

  it('render', () => {
    const wrapper = shallow(<CalendarHeader {...props} />);
    expect(wrapper.find('.weekCalendar__headerWrapper')).to.have.length(1);
    const sumWidth = props.columnDimensions.reduce((result, value) => result += value.width, 0);
    expect(wrapper.find('.weekCalendar__headerWrapper').prop('style').width).equal(sumWidth);

    expect(wrapper.find('.weekCalendar__headerColumn')).to.have.length(props.numberOfDays);
    expect(wrapper.find(HeaderCell).at(0).prop('date').format()).equal(moment(props.firstDay).format());
    expect(wrapper.find('.weekCalendar__headerColumn').at(0).prop('style').width).equal(props.columnDimensions[0].width);
  });

  it('should updates when change firstDay', () => {
    const wrapper = shallow(<CalendarHeader {...props} />);
    expect(wrapper.find('.weekCalendar__headerColumn')).to.have.length(props.numberOfDays);
    expect(wrapper.find(HeaderCell).at(0).prop('date').format()).equal(moment(props.firstDay).format());

    const newFirstDay = moment().add(1, 'd');
    const newProps = {
      ...props,
      firstDay: newFirstDay,
    };
    wrapper.setProps(newProps);
    expect(wrapper.find('.weekCalendar__headerColumn')).to.have.length(newProps.numberOfDays);
    expect(wrapper.find(HeaderCell).at(0).prop('date').format()).equal(moment(newProps.firstDay).format());
  });

  it('should updates when change numberOfDays', () => {
    const wrapper = shallow(<CalendarHeader {...props} />);
    expect(wrapper.find('.weekCalendar__headerColumn')).to.have.length(props.numberOfDays);

    const newProps = {
      ...props,
      numberOfDays: 2,
    };
    wrapper.setProps(newProps);
    expect(wrapper.find('.weekCalendar__headerColumn')).to.have.length(newProps.numberOfDays);
  });

  it('should updates when change column width', () => {
    const wrapper = shallow(<CalendarHeader {...props} />);
    let sumWidth = props.columnDimensions.reduce((result, value) => result += value.width, 0);
    expect(wrapper.find('.weekCalendar__headerWrapper').prop('style').width).equal(sumWidth);
    expect(wrapper.find('.weekCalendar__headerColumn').at(0).prop('style').width).equal(props.columnDimensions[0].width);

    const width = 200;
    const newProps = {
      ...props,
      columnDimensions: [{ width }, { width }, { width }],
    };
    wrapper.setProps(newProps);
    sumWidth = newProps.columnDimensions.reduce((result, value) => result += value.width, 0);
    expect(wrapper.find('.weekCalendar__headerWrapper').prop('style').width).equal(sumWidth);
    expect(wrapper.find('.weekCalendar__headerColumn').at(0).prop('style').width).equal(newProps.columnDimensions[0].width);
  });
});
