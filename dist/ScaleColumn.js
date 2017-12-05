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
  scaleUnit: _propTypes2.default.number.isRequired,
  scaleFormat: _propTypes2.default.string.isRequired,
  scaleIntervals: _propTypes2.default.array.isRequired,
  cellHeight: _propTypes2.default.number.isRequired
};

var ScaleColumn = function (_React$Component) {
  _inherits(ScaleColumn, _React$Component);

  function ScaleColumn() {
    _classCallCheck(this, ScaleColumn);

    return _possibleConstructorReturn(this, (ScaleColumn.__proto__ || Object.getPrototypeOf(ScaleColumn)).apply(this, arguments));
  }

  _createClass(ScaleColumn, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.scaleUnit !== this.props.scaleUnit || nextProps.cellHeight !== this.props.cellHeight;
    }
  }, {
    key: 'renderScaleCell',
    value: function renderScaleCell(scaleInterval, index) {
      var _props = this.props,
          cellHeight = _props.cellHeight,
          scaleFormat = _props.scaleFormat;

      return _react2.default.createElement(
        'div',
        { key: index, className: 'weekCalendar__scaleCell', style: { height: cellHeight, lineHeight: cellHeight + 'px' } },
        _react2.default.createElement(
          'span',
          null,
          scaleInterval.start.format(scaleFormat)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var scaleIntervals = this.props.scaleIntervals;

      return _react2.default.createElement(
        'div',
        null,
        scaleIntervals.map(function (scaleInterval, index) {
          return _this2.renderScaleCell(scaleInterval, index);
        })
      );
    }
  }]);

  return ScaleColumn;
}(_react2.default.Component);

ScaleColumn.propTypes = propTypes;
exports.default = ScaleColumn;