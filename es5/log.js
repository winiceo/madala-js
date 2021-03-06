'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Log = undefined;

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var originalFactory = _loglevel2.default.methodFactory;

_loglevel2.default.methodFactory = function methodFactory(methodName, logLevel, loggerName) {
  var rawMethod = originalFactory(methodName, logLevel, loggerName);

  return function log(message) {
    rawMethod('Kinvey: ' + message);
  };
};

_loglevel2.default.setDefaultLevel(_loglevel2.default.levels.SILENT);
exports.Log = _loglevel2.default;