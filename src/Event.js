import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};


class Event extends React.PureComponent {
  render() {
    const {
      start,
      end,
      value,
    } = this.props;
    return (
      <div className="event">
        <span>{`${start.format('HH:mm')} - ${end.format('HH:mm')}`}</span>
        <br /><br />
        {value}
      </div>
    );
  }
}

Event.propTypes = propTypes;
export default Event;
