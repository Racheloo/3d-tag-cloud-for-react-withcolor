"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _tag = _interopRequireDefault(require("./tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BASEANGLE = Math.PI / 360;

var TagCloud = /*#__PURE__*/function (_React$Component) {
  _inherits(TagCloud, _React$Component);

  var _super = _createSuper(TagCloud);

  function TagCloud(props) {
    var _this;

    _classCallCheck(this, TagCloud);

    _this = _super.call(this, props);
    _this.state = {
      speed: _this.props.speed || 1,
      R: props.radius || 200,
      angleX: (props.speed || 1) * BASEANGLE,
      angleY: (props.speed || 1) * BASEANGLE,
      tags: [],
      timer: ""
    };
    return _this;
  }

  _createClass(TagCloud, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.tagName.id != this.props.tagName.id) {
        var animation = function animation() {
          _this2.rotateX();

          _this2.rotateY();

          requestAnimationFrame(animation);
        };

        requestAnimationFrame(function () {
          animation();
        });
        this.move(nextProps.tagName);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      document.addEventListener("mousemove", function (e) {
        var angleX = 2 * (e.clientX / document.body.getBoundingClientRect().width - 0.5) * _this3.state.speed * BASEANGLE;
        var angleY = 2 * (e.clientY / document.body.getBoundingClientRect().height - 0.5) * _this3.state.speed * BASEANGLE;

        _this3.setState({
          angleX: angleX,
          angleY: angleY
        });
      });

      if (this.props.tagName.length === 0) {
        return;
      }

      console.log(22);

      var animation = function animation() {
        _this3.rotateX();

        _this3.rotateY();

        requestAnimationFrame(animation);
      };

      requestAnimationFrame(function () {
        animation();
      });
      this.move(this.props.tagName);
    } // handleMouseover(e) {
    // 	const angleY = 2 * (e.clientX / document.body.getBoundingClientRect().width - 0.5) * speed * BASEANGLE;
    // 	const angleX = 2 * (e.clientY / document.body.getBoundingClientRect().height - 0.5) * speed * BASEANGLE;
    // 	this.setState({ angleX, angleY })
    // }
    // handleMouseout() {
    // 	const angleX = this.state.speed * BASEANGLE
    // 	const angleY = this.state.speed * BASEANGLE
    // 	this.setState({ angleX, angleY })
    // }

  }, {
    key: "move",
    value: function move(tagName) {
      var _this4 = this;

      var len = tagName.length;
      var tags = tagName.map(function (tag, i) {
        var angleA = Math.acos((2 * (i + 1) - 1) / len - 1);
        var angleB = angleA * Math.sqrt(len * Math.PI);
        var z = _this4.state.R * Math.cos(angleA);
        var y = _this4.state.R * Math.sin(angleA) * Math.sin(angleB);
        var x = _this4.state.R * Math.sin(angleA) * Math.cos(angleB);
        var colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#D47F00', '#00FFFF', '#D4FF55', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#7FBF55', '#a5c2d5', '#cbab4f', '#76a871', '#a56f8f', '#c12c44', '#9f7961', '#76a871', '#6f83a5', '0f4fb8', '106dcf', '#b3d74c', '#74aae3', '#5cdec6', '#3526de', '#9d65ee', '#a8b3e3', '#6bc1b7', '549ee2', '#6e98d6'];
        var num = Math.floor(Math.random() * 50);
        var tagProps = {
          x: x,
          y: y,
          z: z,
          tag: tag,
          color: colors[num]
        };
        return tagProps;
      });
      this.setState({
        tags: tags
      });
    }
  }, {
    key: "rotateX",
    value: function rotateX() {
      var cos = Math.cos(this.state.angleX),
          sin = Math.sin(this.state.angleX);
      var tags = this.state.tags.map(function (tag) {
        var y = tag.y * cos - tag.z * sin;
        var z = tag.z * cos + tag.y * sin;
        tag.y = y;
        tag.z = z;
        return tag;
      });
      this.setState({
        tags: tags
      });
    }
  }, {
    key: "rotateY",
    value: function rotateY() {
      var cos = Math.cos(this.state.angleY);
      var sin = Math.sin(this.state.angleY);
      var tags = this.state.tags.map(function (tag) {
        var x = tag.x * cos - tag.z * sin;
        var z = tag.z * cos + tag.x * sin;
        tag.x = x;
        tag.z = z;
        return tag;
      });
      this.setState({
        tags: tags
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var containerStyle = {
        width: "100%",
        heght: "100%",
        userSelect: "none"
      };
      var wrapperStyle = {
        position: "relative",
        left: "20%",
        top: "100px"
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "tag-cloud-container",
        style: containerStyle
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "cloudwrapper",
        style: wrapperStyle
      }, this.state.tags.map(function (tag, index) {
        return /*#__PURE__*/_react["default"].createElement(_tag["default"], _extends({
          key: index
        }, tag, {
          onClick: _this5.props.onClick
        }), " ");
      })));
    }
  }]);

  return TagCloud;
}(_react["default"].Component);

exports["default"] = TagCloud;