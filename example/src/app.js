import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import WeekCalendar from 'react-week-calendar';

class TestCalendar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lastUid: 2,
			selectedIntervals: [
				{
					uid: 1,
					start: moment({h: 10, m: 5}),
					end: moment({h: 12, m: 5}),
					value: "Booked by Smith"
				}
			]
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
			startTime = {moment({h: 9, m: 0})}
			endTime = {moment({h: 19, m: 30})}
			numberOfDays= {7}
			selectedIntervals = {this.state.selectedIntervals}
			onIntervalSelect = {this.handleSelect}
			onIntervalUpdate = {this.handleEventUpdate}
  		onIntervalRemove = {this.handleEventRemove}
		/>
	}
}

ReactDOM.render(
	<TestCalendar />,
	document.getElementById('app')
);
