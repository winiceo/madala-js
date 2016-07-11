'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserStore = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _errors = require('./errors');

var _network = require('./requests/network');

var _request = require('./requests/request');

var _datastore = require('./datastore');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable no-underscore-dangle */


var idAttribute = '_id' || '_id';
var usersNamespace = 'user' || 'user';
var rpcNamespace = 'rpc' || 'rpc';
var socialIdentityAttribute = '_socialIdentity' || '_socialIdentity';

/**
 * The UserStore class is used to find, save, update, remove, count and group users.
 */

var UserStore = exports.UserStore = function (_DataStore) {
  _inherits(UserStore, _DataStore);

  function UserStore() {
    _classCallCheck(this, UserStore);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UserStore).call(this));

    _this.disableCache();
    return _this;
  }

  /**
   * Enable cache.
   *
   * @return {DataStore}  DataStore instance.
   */


  _createClass(UserStore, [{
    key: 'enableCache',
    value: function enableCache() {}
    // Log a warning
    // throw new KinveyError('Unable to enable cache for the file store.');


    /**
     * Make the store offline.
     *
     * @return {DataStore}  DataStore instance.
     */

  }, {
    key: 'offline',
    value: function offline() {}
    // Log a warning
    // throw new KinveyError('Unable to go offline for the file store.');


    /**
     * The pathname for the store.
     *
     * @return  {string}   Pathname
     */

  }, {
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new _errors.KinveyError('Please use `User.signup()` to create a user.');

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create() {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'update',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(user) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var socialIdentity, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (user) {
                  _context2.next = 2;
                  break;
                }

                throw new _errors.KinveyError('No user was provided to be updated.');

              case 2:
                if (!(0, _isArray2.default)(user)) {
                  _context2.next = 4;
                  break;
                }

                throw new _errors.KinveyError('Only one user can be updated at one time.', user);

              case 4:
                if (user[idAttribute]) {
                  _context2.next = 6;
                  break;
                }

                throw new _errors.KinveyError('User must have an _id.');

              case 6:
                if (!options._identity) {
                  _context2.next = 28;
                  break;
                }

                socialIdentity = user[socialIdentityAttribute];

                if (!socialIdentity) {
                  _context2.next = 28;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 12;

                for (_iterator = socialIdentity[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _step$value = _slicedToArray(_step.value, 1);
                  key = _step$value[0];

                  if (socialIdentity[key] && options._identity !== key) {
                    delete socialIdentity[key];
                  }
                }
                _context2.next = 20;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2['catch'](12);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 20:
                _context2.prev = 20;
                _context2.prev = 21;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 23:
                _context2.prev = 23;

                if (!_didIteratorError) {
                  _context2.next = 26;
                  break;
                }

                throw _iteratorError;

              case 26:
                return _context2.finish(23);

              case 27:
                return _context2.finish(20);

              case 28:
                return _context2.abrupt('return', _get(Object.getPrototypeOf(UserStore.prototype), 'update', this).call(this, user, options));

              case 29:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[12, 16, 20, 28], [21,, 23, 27]]);
      }));

      function update(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: 'exists',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(username, options) {
        var config, request, response, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                config = new _request.KinveyRequestConfig({
                  method: _request.RequestMethod.POST,
                  authType: _request.AuthType.App,
                  url: _url2.default.format({
                    protocol: this.client.protocol,
                    host: this.client.host,
                    pathname: '/' + rpcNamespace + '/' + this.client.appKey + '/check-username-exists'
                  }),
                  properties: options.properties,
                  data: { username: username },
                  timeout: options.timeout,
                  client: this.client
                });
                request = new _network.NetworkRequest(config);
                _context3.next = 4;
                return request.execute();

              case 4:
                response = _context3.sent;
                data = response.data || {};
                return _context3.abrupt('return', !!data.usernameExists);

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function exists(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return exists;
    }()
  }, {
    key: 'restore',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var config, request, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                config = new _request.KinveyRequestConfig({
                  method: _request.RequestMethod.POST,
                  authType: _request.AuthType.Master,
                  url: _url2.default.format({
                    protocol: this.client.protocol,
                    host: this.client.host,
                    pathname: this.pathname + '/' + id
                  }),
                  properties: options.properties,
                  timeout: options.timeout,
                  client: this.client
                });
                request = new _network.NetworkRequest(config);
                _context4.next = 4;
                return request.execute();

              case 4:
                response = _context4.sent;
                return _context4.abrupt('return', response.data);

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function restore(_x6, _x7) {
        return _ref4.apply(this, arguments);
      }

      return restore;
    }()
  }, {
    key: 'pathname',
    get: function get() {
      return '/' + usersNamespace + '/' + this.client.appKey;
    }
  }]);

  return UserStore;
}(_datastore.DataStore);