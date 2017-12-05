import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  scaleUnit: PropTypes.number.isRequired,
  scaleFormat: PropTypes.string.isRequired,
  scaleIntervals: PropTypes.array.isRequired,
  cellHeight: PropTypes.number.isRequired,
};

class ScaleColumn extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.scaleUnit !== this.props.scaleUnit
    || nextProps.cellHeight !== this.props.cellHeight;
  }

  renderScaleCell(scaleInterval, index) {
    const {
      cellHeight,
      scaleFormat,
    } = this.props;
    return (
      <div key={index} className="weekCalendar__scaleCell" style={{ height: cellHeight, lineHeight: `${cellHeight}px` }}>
        <span>{scaleInterval.start.format(scaleFormat)}</span>
      </div>
    );
  }

  render() {
    const { scaleIntervals } = this.props;
    return (
      <div>
        {scaleIntervals.map((scaleInterval, index) => this.renderScaleCell(scaleInterval, index))}
      </div>
    );
  }
}

ScaleColumn.propTypes = propTypes;
export default ScaleColumn;
