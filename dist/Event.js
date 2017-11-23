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
  start: _propTypes2.default.object.isRequired,
  end: _propTypes2.default.object.isRequired,
  value: _propTypes2.default.string.isRequired
};

var Event = function (_React$PureComponent) {
  _inherits(Event, _React$PureComponent);

  function Event() {
    _classCallCheck(this, Event);

    return _possibleConstructorReturn(this, (Event.__proto__ || Object.getPrototypeOf(Event)).apply(this, arguments));
  }

  _createClass(Event, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          start = _props.start,
          end = _props.end,
          value = _props.value;

      return _react2.default.createElement(
        'div',
        { className: 'event' },
        _react2.default.createElement(
          'span',
          null,
          start.format('HH:mm') + ' - ' + end.format('HH:mm')
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        value
      );
    }
  }]);

  return Event;
}(_react2.default.PureComponent);

Event.propTypes = propTypes;
exports.default = Event;