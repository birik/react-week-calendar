import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DayColumn from './DayColumn';
import { getDayIntervals } from './Utils';

const propTypes = {
  firstDay: PropTypes.object.isRequired,
  numberOfDays: PropTypes.number.isRequired,
  scaleUnit: PropTypes.number.isRequired,
  scaleIntervals: PropTypes.array.isRequired,
  cellHeight: PropTypes.number.isRequired,
  dayCellComponent: PropTypes.func.isRequired,
  onSelectionStart: PropTypes.func.isRequired,
  onCellMouseEnter: PropTypes.func.isRequired,
};

class CalendarBody extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.scaleUnit !== this.props.scaleUnit
      || nextProps.cellHeight !== this.props.cellHeight
      || nextProps.numberOfDays !== this.props.numberOfDays
      || !nextProps.firstDay.isSame(this.props.firstDay, 'day');
  }

  render() {
    const {
      firstDay,
      numberOfDays,
      scaleUnit,
      scaleIntervals,
      cellHeight,
      dayCellComponent,
    } = this.props;

    const weekdayColumns = [];
    for (let i = 0; i < numberOfDays; i += 1) {
      const day = moment(firstDay).add(i, 'd');
      const intervals = getDayIntervals(day, scaleIntervals);
      weekdayColumns.push(<DayColumn
        key={i}
        colPos={i}
        cellHeight={cellHeight}
        dayCellComponent={dayCellComponent}
        scaleUnit={scaleUnit}
        dayIntervals={intervals}
        onSelectionStart={this.props.onSelectionStart}
        onCellMouseEnter={this.props.onCellMouseEnter}
      />);
    }

    return (
      <div className="calendarBody" >
        <div className="calendarBody__row">
          {weekdayColumns}
        </div>
      </div>
    );
  }
}

CalendarBody.propTypes = propTypes;

export default CalendarBody;
