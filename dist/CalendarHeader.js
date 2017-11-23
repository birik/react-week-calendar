'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarHeader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  firstDay: _propTypes2.default.object.isRequired,
  numberOfDays: _propTypes2.default.number.isRequired,
  headerCellComponent: _propTypes2.default.func.isRequired,
  dayFormat: _propTypes2.default.string.isRequired,
  columnDimensions: _propTypes2.default.array.isRequired
};

var CalendarHeader = exports.CalendarHeader = function (_React$Component) {
  _inherits(CalendarHeader, _React$Component);

  function CalendarHeader() {
    _classCallCheck(this, CalendarHeader);

    return _possibleConstructorReturn(this, (CalendarHeader.__proto__ || Object.getPrototypeOf(CalendarHeader)).apply(this, arguments));
  }

  _createClass(CalendarHeader, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      // for columnDimensions return new object
      return nextProps.numberOfDays !== this.props.numberOfDays || !nextProps.firstDay.isSame(this.props.firstDay, 'day') || nextProps.columnDimensions !== this.props.columnDimensions;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          firstDay = _props.firstDay,
          numberOfDays = _props.numberOfDays,
          dayFormat = _props.dayFormat,
          columnDimensions = _props.columnDimensions;


      var HeaderCell = this.props.headerCellComponent;

      if (columnDimensions.length === 0) {
        return null;
      }

      var weekdayColumns = [];
      var totalWidth = 0;

      for (var i = 0; i < numberOfDays; i += 1) {
        var date = (0, _moment2.default)(firstDay).add(i, 'd');
        var width = columnDimensions[i].width;

        totalWidth += width;
        var newCell = _react2.default.createElement(
          'div',
          { key: i, className: 'weekCalendar__headerColumn', style: { width: width } },
          _react2.default.createElement(HeaderCell, { date: date, dayFormat: dayFormat })
        );
        weekdayColumns.push(newCell);
      }

      return _react2.default.createElement(
        'div',
        { style: { width: totalWidth }, className: 'weekCalendar__headerWrapper' },
        weekdayColumns
      );
    }
  }]);

  return CalendarHeader;
}(_react2.default.Component);

CalendarHeader.propTypes = propTypes;

exports.default = CalendarHeader;