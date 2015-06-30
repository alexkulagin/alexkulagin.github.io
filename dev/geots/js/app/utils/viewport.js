//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  VIEWPORT UTILS                                                                          ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘
define(["require", "exports"], function (require, exports) {
    var ViewportUtils = (function () {
        function ViewportUtils() {
            this._getScreenWidth = null;
            this._getScreenHeight = null;
            this.isMobile = false;
            if (!ViewportUtils._instance) {
                ViewportUtils._instance = this;
                console.log("new ViewportUtils");
                this.setScreenSize();
            }
        }
        Object.defineProperty(ViewportUtils, "instance", {
            get: function () {
                !ViewportUtils._instance && new ViewportUtils();
                return ViewportUtils._instance;
            },
            enumerable: true,
            configurable: true
        });
        ViewportUtils.prototype.setScreenSize = function () {
            var mm = window['matchMedia'] || window['msMatchMedia'];
            var mq = mm ? function (q) {
                return !!mm.call(window, q)['matches'];
            } : function () {
                return false;
            };
            var f = function (d, i, c) {
                return document.documentElement[c] < window[i] && mq('(min-' + d + ':' + window[i] + 'px)') ? function () {
                    return window[i];
                } : function () {
                    return document.documentElement[c];
                };
            };
            this._getScreenWidth = f('width', 'innerWidth', 'clientWidth');
            this._getScreenHeight = f('height', 'innerHeight', 'clientHeight');
        };
        Object.defineProperty(ViewportUtils.prototype, "screenWidth", {
            get: function () {
                return ViewportUtils.instance._getScreenWidth();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewportUtils.prototype, "screenHeight", {
            get: function () {
                return ViewportUtils.instance._getScreenHeight();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewportUtils.prototype, "screenAspectRatio", {
            get: function () {
                return ViewportUtils.instance.screenWidth / ViewportUtils.instance.screenHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewportUtils.prototype, "screenOrientation", {
            get: function () {
                return ViewportUtils.instance.screenAspectRatio > 1 ? 0 : 1; // ? "landscape 0" : "portrait 1"
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewportUtils.prototype, "documentWidth", {
            get: function () {
                var db = document.body, de = document.documentElement;
                return Math.max(db.scrollWidth, de.scrollWidth, db.offsetWidth, de.offsetWidth, db.clientWidth, de.clientWidth);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewportUtils.prototype, "documentHeight", {
            get: function () {
                var db = document.body, de = document.documentElement;
                return Math.max(db.scrollHeight, de.scrollHeight, db.offsetHeight, de.offsetHeight, db.clientHeight, de.clientHeight);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewportUtils.prototype, "scrollX", {
            get: function () {
                return window.pageXOffset || document.documentElement.scrollLeft;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewportUtils.prototype, "scrollY", {
            get: function () {
                return window.pageYOffset || document.documentElement.scrollTop;
            },
            enumerable: true,
            configurable: true
        });
        ViewportUtils._instance = null;
        return ViewportUtils;
    })();
    return ViewportUtils;
});
//# sourceMappingURL=viewport.js.map