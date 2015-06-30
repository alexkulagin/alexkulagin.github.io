/// <reference path="../dts/jquery.d.ts" />
/// <reference path="../dts/modernizr.d.ts" />
/// <reference path="utils/dispatcher.ts" />
/// <reference path="utils/fallbacks.ts" />
/// <reference path="module/splash.ts" />
define(["require", "exports", 'jquery', 'utils/dispatcher', 'utils/viewport', 'utils/fallbacks', 'module/splash'], function (require, exports, $, Dispatcher, ViewportUtils, Fallbacks, Splash) {
    var the; // context reference
    var Main = (function () {
        function Main(bool) {
            this.$win = null;
            this.$body = null;
            this.dispatcher = null;
            this.viewport = null;
            this.splashModule = null;
            console.log("new Main");
            Modernizr.videoautoplay = bool;
            Modernizr.svg || Fallbacks.svgTo("png");
            this.$win = $(window);
            this.$body = $('body');
            this.dispatcher = Dispatcher.instance;
            this.viewport = ViewportUtils.instance;
            this.dispatcher.onMobileSignal.add(this.onChangeVersion);
            this.$win.resize(this.onResizeHandler);
            this.$win.scroll(this.onScrollHandler);
            the = this;
        }
        Main.prototype.initialize = function () {
            the.splashModule = new Splash();
            this.onResizeHandler();
            this.onScrollHandler();
        };
        Main.prototype.onResizeHandler = function () {
            var m = the.viewport.isMobile;
            the.viewport.isMobile = the.viewport.screenWidth < (16 * 60);
            the.viewport.isMobile !== m && the.dispatcher.onMobileSignal.dispatch(!m);
            the.dispatcher.onResizeSignal.dispatch();
        };
        Main.prototype.onScrollHandler = function () {
            the.dispatcher.onScrollSignal.dispatch();
        };
        Main.prototype.onChangeVersion = function (isMobile) {
            isMobile ? the.$body.addClass('mobile') : the.$body.removeClass('mobile');
        };
        return Main;
    })();
    return Main;
});
//# sourceMappingURL=main.js.map