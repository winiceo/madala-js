'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkRack = exports.CacheRack = exports.KinveyRack = exports.Rack = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _middleware = require('./middleware');

var _cache = require('./middleware/cache');

var _parse = require('./middleware/parse');

var _serialize = require('./middleware/serialize');

var _http = require('./middleware/http');

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

var _es6Symbol = require('es6-symbol');

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sharedCacheRackInstance = (0, _es6Symbol2.default)();
var sharedNetworkRackInstance = (0, _es6Symbol2.default)();

/**
 * @private
 */

var Rack = exports.Rack = function (_KinveyMiddleware) {
  _inherits(Rack, _KinveyMiddleware);

  function Rack() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'Rack' : arguments[0];

    _classCallCheck(this, Rack);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rack).call(this, name));

    _this.middlewares = [];
    _this.canceled = false;
    return _this;
  }

  _createClass(Rack, [{
    key: 'getMiddleware',
    value: function getMiddleware() {
      var index = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];

      var middlewares = this.middlewares;

      if (index < -1 || index >= middlewares.length) {
        throw new Error('Index ' + index + ' is out of bounds.');
      }

      return middlewares[index];
    }
  }, {
    key: 'use',
    value: function use(middleware) {
      if (middleware) {
        if (middleware instanceof _middleware.KinveyMiddleware) {
          this.middlewares.push(middleware);
          return;
        }

        throw new Error('Unable to use the middleware. It must be an instance of Middleware.');
      }
    }
  }, {
    key: 'useBefore',
    value: function useBefore(middlewareClass, middleware) {
      if (middleware) {
        if (middleware instanceof _middleware.Middleware) {
          var middlewares = this.middlewares;
          var index = (0, _findIndex2.default)(middlewares, function (existingMiddleware) {
            return existingMiddleware instanceof middlewareClass;
          });

          if (index > -1) {
            middlewares.splice(index, 0, middleware);
            this.middlewares = middlewares;
          }

          return;
        }

        throw new Error('Unable to use the middleware. It must be an instance of Middleware.');
      }
    }
  }, {
    key: 'useAfter',
    value: function useAfter(middlewareClass, middleware) {
      if (middleware) {
        if (middleware instanceof _middleware.Middleware) {
          var middlewares = this.middlewares;
          var index = (0, _findIndex2.default)(middlewares, function (existingMiddleware) {
            return existingMiddleware instanceof middlewareClass;
          });

          if (index > -1) {
            middlewares.splice(index + 1, 0, middleware);
            this.middlewares = middlewares;
          }

          return;
        }

        throw new Error('Unable to use the middleware. It must be an instance of Middleware.');
      }
    }
  }, {
    key: 'swap',
    value: function swap(middlewareClass, middleware) {
      if (middleware) {
        if (middleware instanceof _middleware.Middleware) {
          var middlewares = this.middlewares;
          var index = (0, _findIndex2.default)(middlewares, function (existingMiddleware) {
            return existingMiddleware instanceof middlewareClass;
          });

          if (index > -1) {
            middlewares.splice(index, 1, middleware);
            this.middlewares = middlewares;
          }

          return;
        }

        throw new Error('Unable to use the middleware. It must be an instance of Middleware.');
      }
    }
  }, {
    key: 'remove',
    value: function remove(middlewareClass) {
      var middlewares = this.middlewares;
      var index = (0, _findIndex2.default)(middlewares, function (existingMiddleware) {
        return existingMiddleware instanceof middlewareClass;
      });

      if (index > -1) {
        middlewares.splice(index, 1);
        this.middlewares = middlewares;
        this.remove(middlewareClass);
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.middlewares = [];
    }
  }, {
    key: 'execute',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(request) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (request) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Request is null. Please provide a valid request.');

              case 2:
                return _context.abrupt('return', (0, _reduce2.default)(this.middlewares, function (promise, middleware) {
                  return promise.then(function (request) {
                    return middleware.handle(request);
                  });
                }, Promise.resolve(request)));

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function execute(_x3) {
        return _ref.apply(this, arguments);
      }

      return execute;
    }()
  }, {
    key: 'cancel',
    value: function cancel() {
      this.canceled = true;
    }
  }, {
    key: 'handle',
    value: function handle(request) {
      return this.execute(request);
    }
  }, {
    key: 'generateTree',
    value: function generateTree() {
      var level = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      var root = _get(Object.getPrototypeOf(Rack.prototype), 'generateTree', this).call(this, level);
      var middlewares = this.middlewares;

      middlewares.forEach(function (middleware) {
        root.nodes.push(middleware.generateTree(level + 1));
      });

      return root;
    }
  }]);

  return Rack;
}(_middleware.KinveyMiddleware);

/**
 * @private
 */


var KinveyRack = exports.KinveyRack = function (_Rack) {
  _inherits(KinveyRack, _Rack);

  function KinveyRack() {
    _classCallCheck(this, KinveyRack);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(KinveyRack).apply(this, arguments));
  }

  _createClass(KinveyRack, [{
    key: 'execute',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(request) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _get(Object.getPrototypeOf(KinveyRack.prototype), 'execute', this).call(this, request);

              case 2:
                request = _context2.sent;
                return _context2.abrupt('return', request.response);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function execute(_x5) {
        return _ref2.apply(this, arguments);
      }

      return execute;
    }()
  }]);

  return KinveyRack;
}(Rack);

/**
 * @private
 */


var CacheRack = exports.CacheRack = function (_KinveyRack) {
  _inherits(CacheRack, _KinveyRack);

  function CacheRack() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'Kinvey Cache Rack' : arguments[0];

    _classCallCheck(this, CacheRack);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(CacheRack).call(this, name));

    _this3.use(new _cache.CacheMiddleware());
    return _this3;
  }

  _createClass(CacheRack, null, [{
    key: 'sharedInstance',
    value: function sharedInstance() {
      var instance = this[sharedCacheRackInstance];

      if (!instance) {
        instance = new CacheRack();
        this[sharedCacheRackInstance] = instance;
      }

      return instance;
    }
  }]);

  return CacheRack;
}(KinveyRack);

/**
 * @private
 */


var NetworkRack = exports.NetworkRack = function (_KinveyRack2) {
  _inherits(NetworkRack, _KinveyRack2);

  function NetworkRack() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? 'Kinvey Network Rack' : arguments[0];

    _classCallCheck(this, NetworkRack);

    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(NetworkRack).call(this, name));

    _this4.use(new _serialize.SerializeMiddleware());
    _this4.use(new _http.HttpMiddleware());
    _this4.use(new _parse.ParseMiddleware());
    return _this4;
  }

  _createClass(NetworkRack, null, [{
    key: 'sharedInstance',
    value: function sharedInstance() {
      var instance = this[sharedNetworkRackInstance];

      if (!instance) {
        instance = new NetworkRack();
        this[sharedNetworkRackInstance] = instance;
      }

      return instance;
    }
  }]);

  return NetworkRack;
}(KinveyRack);