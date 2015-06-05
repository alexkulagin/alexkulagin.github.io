


// OLD IOS DEVICE RESIZE FIX BUG
;(function(doc) {
    var addEvent = 'addEventListener',
        type = 'gesturestart',
        qsa = 'querySelectorAll',
        scales = [1, 1],
        meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [],
        fix = function() {
            meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
            doc.removeEventListener(type, fix, true);
        };

    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
        fix();
        scales = [.25, 1.6];
        doc[addEvent](type, fix, true);
    }

}(document));




// APP
;(function(root) {

    var app = {};



    // VIEWPORT UTILS
    var docEl = document.documentElement,
    mm = root['matchMedia'] || root['msMatchMedia'],
    mq = mm ? function(q) { return !!mm.call(root, q)['matches'] } : function() { return false },
    getScreenSize = function(d, i, c) 
    {
        return docEl[c] < root[i] && mq('(min-' + d + ':' + root[i] + 'px)') 
            ? function() { return root[i] } 
            : function() { return docEl[c] };
    };

    app['getViewportWidth'] = getScreenSize('width', 'innerWidth', 'clientWidth');
    app['getViewportHeight'] = getScreenSize('height', 'innerHeight', 'clientHeight');
    app['getViewportAspect'] = function() { return app.getViewportWidth() / app.getViewportHeight() };
    app['getViewportOrientation'] = function () { return 1 < app.getViewportAspect() ? "landscape" : "portrait" };



    // TEST
    app['isIE8'] = document.all && !document.addEventListener;

    app['isMobile'] = (function() {
        // тест не работает для моб. браузеров с вкл. опцией full version
        var is = { 
            Android: function() { return navigator.userAgent.match(/Android/i); }, 
            iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
            Windows: function() { return navigator.userAgent.match(/IEMobile/i); },
            /*Opera: function() { return navigator.userAgent.match(/Opera Mini/i); },
            BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },*/
            any: function() { return (is.Android() || is.iOS() || is.Windows() /*|| is.Opera() || is.BlackBerry()*/);} 
        };
        return is.any() ? true : false;
    }());



    // INITIALIZE & STARTUP APPLICATION
    // todo


    // EXTERNAL ACCESS
    root['app'] = app;

}(this));









// screen size
!(function(global) {
    var docEl = document.documentElement,
        mm = global['matchMedia'] || global['msMatchMedia'],
        mq = mm ? function(q) { return !!mm.call(global, q)['matches'] } : function() { return false },
        getScreenSize = function(dim, inner, client) {
            return docEl[client] < global[inner] && mq('(min-' + dim + ':' + global[inner] + 'px)') 
                ? function() { return global[inner] } 
                : function() { return docEl[client] };
        };

    global['screenSize'] = {
        'screenwidth'  : getScreenSize('width', 'innerWidth', 'clientWidth'),
        'screenheight' : getScreenSize('height', 'innerHeight', 'clientHeight')
    };

}(this));





// splash resizing
!(function(global) {

    var splash,
        isIE8 = document.all && !document.addEventListener,
        sh = global.screenSize.screenheight,
        rf = function() {
            splash.css("height", sh);


            //masthead-video
            //-------------------------------
            var ww = global.screenSize.screenwidth();
            var hh = global.screenSize.screenheight();

            var elem = $(".splash-video");

            // Get native video width and height
            var nativeWidth = 1280;
            var nativeHeight = 720;

            // Get the scale factors
            var heightScaleFactor = nativeHeight / hh;
            var widthScaleFactor = nativeWidth / ww;

            //alert(hh, ww)

            // Based on highest scale factor set width and height
            if (widthScaleFactor < heightScaleFactor) {
                elem.height('auto');
                elem.width(ww);
            } else {
                elem.height(hh);
                elem.width('auto');
            }

            //-------------------------------
        }


    // startup
    jQuery && jQuery(function($) {

        // mobile test
        var isMobile = { 
            Android: function() { return navigator.userAgent.match(/Android/i); }, 
            BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); }, 
            iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, 
            Opera: function() { return navigator.userAgent.match(/Opera Mini/i); }, 
            Windows: function() { return navigator.userAgent.match(/IEMobile/i); }, 
            any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());} 
        };

        // test mobile browser
        if (!isMobile.any() && !isIE8) {
            $(".splash-video").css("display", "block");
        }

        // test video support for iOS Android (todo)
        // AUTOPLAY && alert("video is suported");

        // resize event
        splash = $("#splash-container");
        $(window).resize(function(){
            rf();
            //alert(app.isMobile);
        });
        // manually resize at once
        isIE8 ? setTimeout(rf, 100) : rf();
    });

}(this));










