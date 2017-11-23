/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';

import '../../../src/style.less';
import StandardCalendar from './StandardCalendar';
import CustomCalendar from './CustomCalendar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: 'default',
    };
  }

  changeCalendar = (calendar) => {
  	this.setState({calendar});
  }


  render() {
  	const calendar = this.state.calendar;
  	let renderCalendar = null;

  	switch (calendar) {
			case 'default':
        renderCalendar = (
        	<div>
						<h3>Calendar with default components</h3>
						<StandardCalendar />
					</div>
				);
        break;
			case 'custom':
        renderCalendar = (
					<div>
						<h3>Calendar with custom components</h3>
						<CustomCalendar />
					</div>
        );
        break;
  	}

    return (
      <div>
        <ul className="nav nav-pills">
					<li role="presentation" className={calendar === 'default' ? 'active' : ''}><a role="button" onClick={this.changeCalendar.bind(this, 'default')}>With default components</a></li>
          <li role="presentation" className={calendar === 'custom' ? 'active' : ''}><a role="button" onClick={this.changeCalendar.bind(this, 'custom')}>With custom components</a></li>
        </ul>
				{renderCalendar}
      </div>

    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
