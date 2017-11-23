import React from 'react';
import moment from 'moment';
import WeekCalendar from 'react-week-calendar';

import CustomHeaderCell from './CustomHeaderCell';
import CustomDayCell from './CustomDayCell';
import CustomModal from './CustomModal';
import CustomEvent from './CustomEvent';

import '../css/customCalendar.less'

export default class CustomCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastUid: 1,
      selectedIntervals: []
    }
  }

  handleEventRemove = (event) => {
    const {selectedIntervals} = this.state;
    const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
    if (index > -1) {
      selectedIntervals.splice(index, 1);
      this.setState({selectedIntervals});
    }

  }

  handleEventUpdate = (event) => {
    const {selectedIntervals} = this.state;
    const index = selectedIntervals.findIndex((interval) => interval.uid === event.uid);
    if (index > -1) {
      selectedIntervals[index] = event;
      this.setState({selectedIntervals});
    }
  }

  handleSelect = (newIntervals) => {
    const {lastUid, selectedIntervals} = this.state;
    const intervals = newIntervals.map( (interval, index) => {

      return {
        ...interval,
        uid: lastUid + index
      }
    });

    this.setState({
      selectedIntervals: selectedIntervals.concat(intervals),
      lastUid: lastUid + newIntervals.length
    })
  }

  render() {
    return <WeekCalendar
      startTime = {moment({h: 8, m: 0})}
      endTime = {moment({h: 21, m: 0})}
      scaleUnit ={60}
      scaleHeaderTitle="Time"
      cellHeight = {50}
      numberOfDays= {1}
      selectedIntervals = {this.state.selectedIntervals}
      onIntervalSelect = {this.handleSelect}
      onIntervalUpdate = {this.handleEventUpdate}
      onIntervalRemove = {this.handleEventRemove}
      headerCellComponent={CustomHeaderCell}
      dayCellComponent={CustomDayCell}
      modalComponent={CustomModal}
      eventComponent={CustomEvent}
    />
  }
}