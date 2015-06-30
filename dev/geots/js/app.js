/// <reference path="dts/require.d.ts" />
/// <reference path="dts/modernizr.d.ts" />
/// <reference path="app/main.ts" />
//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  CONFIGURATION DECLARATION                                                               ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘
var pathToJQuery = ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window) ? '../lib/jquery' : '../lib/jquery.old';
var pathToSignals = '../lib/signals';
require.config({
    baseUrl: './js/app',
    paths: {
        jquery: pathToJQuery,
        signals: pathToSignals
    },
    shim: {
        jquery: {
            exports: '$'
        }
    }
});
//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  APPLICATION BOOTSTRAP                                                                   ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘
require(['main', 'jquery'], function (Main, $) {
    'use strict';
    $(function () {
        // startup after async test
        var init = function (result) {
            console.log("app startup");
            var main = new Main(result);
            main.initialize();
        };
        // async test
        !(Modernizr.ieold) ? Modernizr.on('videoautoplay', function (b) {
            init(b);
        }) : init(false);
    });
});
//# sourceMappingURL=app.js.map