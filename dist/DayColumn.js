'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  colPos: _propTypes2.default.number.isRequired,
  dayIntervals: _propTypes2.default.array.isRequired,
  cellHeight: _propTypes2.default.number.isRequired,
  dayCellComponent: _propTypes2.default.func.isRequired,
  onSelectionStart: _propTypes2.default.func.isRequired,
  onCellMouseEnter: _propTypes2.default.func.isRequired
};

var DayColumn = function (_React$Component) {
  _inherits(DayColumn, _React$Component);

  function DayColumn() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DayColumn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DayColumn.__proto__ || Object.getPrototypeOf(DayColumn)).call.apply(_ref, [this].concat(args))), _this), _this.handleMouseEnter = function (col, row) {
      return function () {
        _this.props.onCellMouseEnter(col, row);
      };
    }, _this.handleStartSelection = function (col, row) {
      return function () {
        _this.props.onSelectionStart(col, row);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DayColumn, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          cellHeight = _props.cellHeight,
          colPos = _props.colPos,
          dayIntervals = _props.dayIntervals;

      var DayCell = this.props.dayCellComponent;

      var dayCells = dayIntervals.map(function (interval, rowPos) {
        return _react2.default.createElement(
          'div',
          {
            key: rowPos,
            className: 'calendarBody__cell',
            style: { height: cellHeight },
            onMouseEnter: _this2.handleMouseEnter(colPos, rowPos)
          },
          _react2.default.createElement(DayCell, {
            colPos: colPos,
            rowPos: rowPos,
            startTime: interval.start,
            endTime: interval.end,
            cellHeight: _this2.props.cellHeight,
            startSelection: _this2.handleStartSelection(colPos, rowPos)
          })
        );
      });

      return _react2.default.createElement(
        'div',
        { className: 'calendarBody__column', 'data-colpos': colPos },
        dayCells
      );
    }
  }]);

  return DayColumn;
}(_react2.default.Component);

DayColumn.propTypes = propTypes;
exports.default = DayColumn;