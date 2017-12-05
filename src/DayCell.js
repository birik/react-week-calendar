import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  startSelection: PropTypes.func.isRequired,
};


class DayCell extends React.Component {
  handleMouseDown = (e) => {
    if (e.button === 0) {
      this.props.startSelection();
    }
  }

  render() {
    return (
      <div onMouseDown={this.handleMouseDown} className="dayCell" role="presentation">
          &nbsp;
      </div>);
  }
}

DayCell.propTypes = propTypes;
export default DayCell;
