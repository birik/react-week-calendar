import React from 'react';

const customDayCell = (props) => {
  const hour = props.startTime.hour();
  if (hour < 17) {
    return (<div className="customCell customCell_10" onMouseDown={props.startSelection}>10,00$</div>);
  }

  return (<div className="customCell customCell_close">Close</div>);
}


export default customDayCell;
