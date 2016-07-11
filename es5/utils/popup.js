'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _device = require('./device');

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _bind = require('lodash/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @private
 */

var Popup = exports.Popup = function (_EventEmitter) {
  _inherits(Popup, _EventEmitter);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Popup).apply(this, arguments));
  }

  _createClass(Popup, [{
    key: 'open',
    value: function open() {
      var url = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];

      this.eventListeners = {
        loadHandler: (0, _bind2.default)(this.loadHandler, this),
        clickHandler: (0, _bind2.default)(this.clickHandler, this),
        closeHandler: (0, _bind2.default)(this.closeHandler, this)
      };

      var promise = new Promise(function (resolve, reject) {
        //   if (isTitanium()) {
        //     this.tiWebView = Titanium.UI.createWebView({
        //       width: '100%',
        //       height: '100%',
        //       url: url
        //     });
        //
        //     this.popup = Titanium.UI.createWindow({
        //       backgroundColor: 'white',
        //       barColor: '#000',
        //       title: 'Mobile Identity Connect',
        //       modal: true
        //     });
        //     this.popup.add(this.tiWebView);
        //
        //     if (isiOS()) {
        //       this.tiWin = Titanium.UI.createWindow({
        //         backgroundColor: 'white',
        //         barColor: '#e3e3e3',
        //         title: 'Mobile Identity Connect'
        //       });
        //       this.tiWin.add(this.tiWebView);
        //
        //       this.tiCloseButton = Titanium.UI.createButton({
        //         title: 'Close',
        //         style: Titanium.UI.iPhone.SystemButtonStyle.DONE
        //       });
        //       this.tiWin.setLeftNavButton(this.tiCloseButton);
        //       this.tiCloseButton.addEventListener('click', this.eventListeners.clickHandler);
        //
        //       this.popup = Titanium.UI.iOS.createNavigationWindow({
        //         backgroundColor: 'white',
        //         window: this.tiWin,
        //         modal: true
        //       });
        //     } else if (isAndroid()) {
        //       this.popup.addEventListener('androidback', this.eventListeners.closeHandler);
        //     }
        //
        //     this.tiWebView.addEventListener('load', this.eventListeners.loadHandler);
        //     this.tiWebView.addEventListener('error', this.eventListeners.loadHandler);
        //     this.popup.addEventListener('close', this.eventListeners.closeHandler);
        //     this.popup.open();
        //     resolve(this);
        //   } else if (isPhoneGap()) {
        //     this.popup = global.open(url, '_blank', 'location=yes');
        //
        //     if (this.popup) {
        //       this.popup.addEventListener('loadstart', this.eventListeners.loadHandler);
        //       this.popup.addEventListener('exit', this.eventListeners.closeHandler);
        //     } else {
        //       return reject(new Error('The popup was blocked.'));
        //     }
        //   } else {
        //     this.popup = global.open(url, '_blank', 'toolbar=no,location=no');
        //
        //     if (this.popup) {
        //       this.interval = setInterval(() => {
        //         if (this.popup.closed) {
        //           this.closeHandler();
        //         } else {
        //           try {
        //             this.loadHandler({
        //               url: this.popup.location.href
        //             });
        //           } catch (e) {
        //             // catch any errors due to cross domain issues
        //           }
        //         }
        //       }, 100);
        //     } else {
        //       return reject(new Error('The popup was blocked.'));
        //     }
        //   }
        //
        //   return resolve(this);
      });
      return promise;
    }
  }, {
    key: 'close',
    value: function close() {
      var _this2 = this;

      var promise = new Promise(function (resolve) {
        _this2.popup.close();
        resolve();
      });
      return promise;
    }
  }, {
    key: 'loadHandler',
    value: function loadHandler(event) {
      this.emit('loaded', event.url);
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler() {
      this.close();
    }
  }, {
    key: 'closeHandler',
    value: function closeHandler() {
      clearTimeout(this.interval);

      if ((0, _isFunction2.default)(this.popup.removeEventListener)) {
        this.popup.removeEventListener('close', this.eventListeners.closeHandler);
        this.popup.removeEventListener('loadstart', this.eventListeners.loadHandler);
        this.popup.removeEventListener('exit', this.eventListeners.closeHander);
      }

      if ((0, _device.isTitanium)()) {
        this.tiWebView.removeEventListener('load', this.eventListeners.loadHandler);
        this.tiWebView.removeEventListener('error', this.eventListeners.loadHandler);

        if ((0, _device.isiOS)()) {
          this.tiCloseButton.removeEventListener('click', this.eventListeners.clickHandler);
        } else if ((0, _device.isAndroid)()) {
          this.popup.close();

          if ((0, _isFunction2.default)(this.popup.removeEventListener)) {
            this.popup.removeEventListener('androidback', this.eventListeners.closeHandler);
          }
        }
      }

      this.emit('closed');
    }
  }]);

  return Popup;
}(_events.EventEmitter);