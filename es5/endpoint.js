'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _request = require('./requests/request');

var _errors = require('./errors');

var _network = require('./requests/network');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rpcNamespace = 'rpc' || 'rpc';

/**
 * Executes a custom command.
 */

var CustomEndpoint = function () {
  function CustomEndpoint() {
    _classCallCheck(this, CustomEndpoint);
  }

  _createClass(CustomEndpoint, null, [{
    key: 'execute',

    /**
     * Execute a custom endpoint. A promise will be returned that will be resolved
     * with the result of the command or rejected with an error.
     *
     * @param   {String}          endpoint                          Endpoint to execute.
     * @param   {Object}          [args]                            Command arguments
     * @param   {Object}          [options={}]                      Options
     * @param   {Properties}      [options.properties]              Custom properties to send with
     *                                                              the request.
     * @param   {Number}          [options.timeout]                 Timeout for the request.
     * @return  {Promise}                                           Promise
     *
     * @example
     * var promise = CustomEndpoint.execute('myCustomEndpoint').then(function(data) {
     *   ...
     * }).catch(function(error) {
     *   ...
     * });
     */
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(endpoint, args) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var request, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = (0, _assign2.default)({
                  client: _client2.default.sharedInstance()
                }, options);

                if (endpoint) {
                  _context.next = 3;
                  break;
                }

                throw new _errors.KinveyError('An endpoint is required.');

              case 3:
                if ((0, _isString2.default)(endpoint)) {
                  _context.next = 5;
                  break;
                }

                throw new _errors.KinveyError('The endpoint must be a string.');

              case 5:
                request = new _network.NetworkRequest({
                  method: _request.RequestMethod.POST,
                  authType: _request.AuthType.Default,
                  url: _url2.default.format({
                    protocol: options.client.protocol,
                    host: options.client.host,
                    pathname: '/' + rpcNamespace + '/' + options.client.appKey + '/custom/' + endpoint
                  }),
                  properties: options.properties,
                  body: args,
                  timeout: options.timeout,
                  client: options.client
                });
                _context.next = 8;
                return request.execute();

              case 8:
                response = _context.sent;
                return _context.abrupt('return', response.data);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function execute(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return execute;
    }()
  }]);

  return CustomEndpoint;
}();

exports.default = CustomEndpoint;