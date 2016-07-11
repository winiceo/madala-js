'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KinveyObservable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('rxjs/Observable');

var _toPromise2 = require('rxjs/operator/toPromise');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KinveyObservable = exports.KinveyObservable = function (_Observable) {
  _inherits(KinveyObservable, _Observable);

  function KinveyObservable() {
    _classCallCheck(this, KinveyObservable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(KinveyObservable).apply(this, arguments));
  }

  _createClass(KinveyObservable, [{
    key: 'toPromise',
    value: function toPromise() {
      return _toPromise2.toPromise.call(this);
    }
  }], [{
    key: 'create',
    value: function create(subscriber) {
      return new KinveyObservable(subscriber);
    }
  }]);

  return KinveyObservable;
}(_Observable2.Observable);