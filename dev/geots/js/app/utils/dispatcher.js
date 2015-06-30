/// <reference path="../../dts/signals.d.ts" />
define(["require", "exports", "signals"], function (require, exports, signals) {
    var Signal = signals.Signal;
    var Dispatcher = (function () {
        function Dispatcher() {
            this._onResizeSignal = null;
            this._onScrollSignal = null;
            this._onMobileSignal = null;
            if (!Dispatcher._instance) {
                Dispatcher._instance = this;
            }
        }
        Object.defineProperty(Dispatcher, "instance", {
            get: function () {
                !Dispatcher._instance && new Dispatcher();
                return Dispatcher._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dispatcher.prototype, "onResizeSignal", {
            get: function () {
                if (!this._onResizeSignal) {
                    this._onResizeSignal = new Signal();
                }
                return this._onResizeSignal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dispatcher.prototype, "onScrollSignal", {
            get: function () {
                if (!this._onScrollSignal) {
                    this._onScrollSignal = new Signal();
                }
                return this._onScrollSignal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dispatcher.prototype, "onMobileSignal", {
            get: function () {
                if (!this._onMobileSignal) {
                    this._onMobileSignal = new Signal();
                }
                return this._onMobileSignal;
            },
            enumerable: true,
            configurable: true
        });
        Dispatcher._instance = null;
        return Dispatcher;
    })();
    return Dispatcher;
});
//# sourceMappingURL=dispatcher.js.map