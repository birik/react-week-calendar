[![NPM](https://img.shields.io/npm/v/react-week-calendar.svg)](https://www.npmjs.com/package/react-week-calendar)

# react-week-calendar

A flexible week calendar implemented in [React.js](http://facebook.github.io/react/index.html). Additional dependency is [moment.js](https://momentjs.com/)

## Demo

Live demo: [http://birik.github.io/react-week-calendar/](http://birik.github.io/react-week-calendar/)

In order to run demo locally, clone the repo and run:
 ```javascript
 npm install
 npm start
 ```
 and open [`localhost:3000`](http://localhost:3000) in your browser.

 ## Installation

  ```javascript
  npm install react-week-calendar --save
  ```

  react-week-calendar in addition to react.js dependes on [moment.js](https://momentjs.com/). You need to have it in your dependencies:

  ```javascript
  npm install moment --save
  ```

  ## Usage

  You need to import the component and styles in your application as follows:

 ```javascript
import WeekCalendar from 'react-week-calendar';

import 'react-week-calendar/dist/style.less';
// or import css file
// import 'react-week-calendar/dist/style.css';
 ```


 ### Props

 | Property | Type | Default | Description
 :---|:---|:--- |:---
 | `firstDay` | momentObj | moment() | The day of the first column |
 | `numberOfDays` | number | 7 | How many days to show in calendar/ Number of columns |
 | `scaleHeaderTitle` | string | '' | The text for the top left cell |
 | `headerCellComponent` | ReactComponent | [HeaderCell](https://github.com/birik/react-week-calendar/blob/master/src/HeaderCell.js) | The react component that gets used for rendering of header cell |
 | `dayFormat` | string | 'dd., DD.MM' | formatter for the header cells  |
 | `startTime` | momentObj | moment({h: 0, m: 0}) | From which time to show calendar |
 | `endTime` | momentObj | moment({h: 23, m: 59}) | Until which time to show calendar  |
 | `scaleUnit` | number | 15 | Pulsing of the calendar in minutes |
 | `scaleFormat` | string | 'HH:mm' | formatter for the scale cells |
 | `cellHeight` | number | 25 | the height of the cell |
 | `dayCellComponent` | ReactComponent | [DayCell](https://github.com/birik/react-week-calendar/blob/master/src/DayCell.js) | The react component that gets used for rendering of calendar cell. If you want to start selection you need to call startSelection from props. |
 | `selectedIntervals` | array | [] | Array of all selected intervals. **Important** that all intervals have start and end properties as momentObj. All object is sent to EventComponent|
 | `onIntervalSelect` | func |  | Send back the array of selected intervals with start, end and all values from module|
 | `onIntervalUpdate` | func |  | Send back the new values of interval|
 | `onIntervalRemove` | func |  | |
 | `eventComponent` | ReactComponent | [Event](https://github.com/birik/react-week-calendar/blob/master/src/Event.js) | The react component that gets used for rendering of intervals |
 | `onEventClick` | func |  | |
 | `modalComponent` | ReactComponent | [Modal](https://github.com/birik/react-week-calendar/blob/master/src/Modal.js) | The react component that gets used for rendering of modal |
 | `useModal` | bool | true | If false, after selection of the intervals the modal will be not shown and intervals will send back |
 | `showModalCase` | array | ['create', 'edit'] | Cases in which to show the modal (create new interval vs. edit existing interval)
 | `eventSpacing` | number | 15 |The amount of horizontal space (in pixels) between events|

If you want to change the styles of the component, you should overwrite the less variable. For example:
 ```
@import "~react-week-calendar/dist/style.less";

@calendar-max-height: 350px;
@header-height: 35px;
@column-min-width: 200px;
@scale-width: 100px;
 ```

Check all variables and default values in [style.less](https://github.com/birik/react-week-calendar/blob/master/src/style.less)
