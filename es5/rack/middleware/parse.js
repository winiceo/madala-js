'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParseMiddleware = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _middleware = require('../middleware');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @private
 */

var ParseMiddleware = exports.ParseMiddleware = function (_KinveyMiddleware) {
  _inherits(ParseMiddleware, _KinveyMiddleware);

  function ParseMiddleware() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'Kinvey Parse Middleware' : arguments[0];

    _classCallCheck(this, ParseMiddleware);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ParseMiddleware).call(this, name));
  }

  _createClass(ParseMiddleware, [{
    key: 'handle',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(request) {
        var response, contentType;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(Object.getPrototypeOf(ParseMiddleware.prototype), 'handle', this).call(this, request);

              case 2:
                request = _context.sent;
                response = request.response;


                if (response && response.data) {
                  contentType = response.headers['content-type'] || response.headers['Content-Type'];


                  if (contentType) {
                    if (contentType.indexOf('application/json') === 0) {
                      try {
                        response.data = JSON.parse(response.data);
                      } catch (error) {
                        response.data = response.data;
                      }

                      request.response = response;
                    }
                  }
                }

                return _context.abrupt('return', request);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handle(_x2) {
        return _ref.apply(this, arguments);
      }

      return handle;
    }()
  }]);

  return ParseMiddleware;
}(_middleware.KinveyMiddleware);