


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


// old iOS device resize fix bug
!(function(doc) {
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


// splash resizing
!(function(global) {

    var splash,
        isIE8 = document.all && !document.addEventListener,
        sh = global.screenSize.screenheight,
        rf = function() {
            splash.css("height", sh);
        }

    jQuery && jQuery(function($) {
        splash = $("#splash-container");
        $(window).resize(function(){
            rf();
        });

        isIE8 ? setTimeout(rf, 100) : rf();
    });

}(this));










