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
  value: _propTypes2.default.string,
  onRemove: _propTypes2.default.func.isRequired,
  onSave: _propTypes2.default.func.isRequired,
  actionType: _propTypes2.default.string // eslint-disable-line react/no-unused-prop-types
};

var defaultProps = {
  value: ''
};

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.handleRemove = function () {
      _this.props.onRemove();
    }, _this.handleSave = function () {
      var value = _this.input.value;

      _this.props.onSave({
        value: value
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: 'renderText',
    value: function renderText() {
      var _props = this.props,
          start = _props.start,
          end = _props.end;


      if (start.isSame(end, 'day')) {
        return _react2.default.createElement(
          'span',
          null,
          start.format('Do MMM., HH:mm') + ' - ' + end.format('HH:mm')
        );
      }
      return _react2.default.createElement(
        'span',
        null,
        start.format('Do MMM.') + ' - ' + end.format('Do MMM.') + ', ' + start.format('HH:mm') + ' - ' + end.format('HH:mm')
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var value = this.props.value;

      return _react2.default.createElement(
        'div',
        { className: 'customModal' },
        _react2.default.createElement(
          'div',
          { className: 'customModal__text' },
          this.renderText()
        ),
        _react2.default.createElement('input', {
          ref: function ref(el) {
            _this2.input = el;
          },
          className: 'customModal__input',
          type: 'text',
          placeholder: 'Enter something',
          defaultValue: value
        }),
        _react2.default.createElement(
          'button',
          { className: 'customModal__button', onClick: this.handleRemove },
          'Delete'
        ),
        _react2.default.createElement(
          'button',
          { className: 'customModal__button customModal__button_float_right', onClick: this.handleSave },
          'Save'
        )
      );
    }
  }]);

  return Modal;
}(_react2.default.Component);

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
exports.default = Modal;