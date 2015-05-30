


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




// MINI APP
;(function(root) {

    var dts, timeout, images, scrollPosition, masthead, about, totop, totopStatus, wall, htbo, preloader,
        app = {};

    // ON INIT
    function initialize($, data) 
    {
        dts = document.all && !window.atob ? document.documentElement : document.body;
        images = data;
        totopStatus = false;
        masthead = $('#masthead');
        about = $('#about');
        totop = $('#totop');
        wall = $('#wall');
        htbo = $('html, body');
        preloader = $('#preloader');

        masthead.click(function(e) { e.preventDefault(); about.slideToggle(350) });
        totop.click(function(e) { e.preventDefault(); htbo.animate({ scrollTop: 0 }, 'slow') });

        $(root).scroll(onScrollHandler);

        onScrollHandler();
    }

    function getDocumentHeight()
    {
        var docB = document.body,
            docE = document.documentElement;

        return Math.max(
            docB.scrollHeight, docB.offsetHeight, docB.clientHeight,
            docE.scrollHeight, docE.offsetHeight, docE.clientHeight
        );
    }

    function onScrollHandler() 
    {
        scrollPosition = dts.scrollTop;
        
        if (images && images.length > 0 && getDocumentHeight() - scrollPosition < 3000) {
            timeout && clearTimeout(timeout);
            timeout = setTimeout(preloadIMG, 500);
        }

        scrollPosition > 1200 && !totopStatus && showTotop();
        scrollPosition < 1200 && totopStatus && hideTotop();
    }

    function preloadIMG() 
    {
        var img = new Image();
            img.onload = onLoadCompleteHandler;
        //  img.onerror = onLoadErrorHandler;
            img.src = images.shift();
    }

    function onLoadCompleteHandler()
    {
        var figure = $('<figure class="superImage"></figure>').append(this);
        wall.append(figure);
        figure.hide().slideDown(1000, onScrollHandler);

        if (images && images.length == 0) {
            preloader.hide(500);
        }
    }

    function showTotop() 
    {
        totop.css({top:'500px', bottom:'auto', opacity: '0'});
        totop.delay(100).animate({ top: '40px', opacity: '1' }, 200);
        totopStatus = true;
    }

    function hideTotop() 
    {
        totop.css({top:'40px', bottom:'auto', opacity: '1'});
        totop.delay(100).animate({ top: '-500px', opacity: '0' }, 300);
        totopStatus = false;
    }

    // PUBLIC METHODS
    app['initialize'] = initialize;

    // EXTERNAL ACCESS
    root['app'] = app;

}(this));



// INITIALIZE APP
jQuery && jQuery(function($) { app.initialize($, [
    "img/lll/lll-1.jpg",
    "img/lll/lll-2.jpg",
    "img/lll/lll-3.jpg",
    "img/lll/lll-4.jpg",
    "img/lll/lll-5.jpg",
    "img/lll/lll-6.jpg",
    "img/lll/lll-7.jpg",
    "img/lll/lll-8.jpg",
        
    "img/el/el-1.jpg",
    "img/el/el-2.jpg",
    "img/el/el-3.jpg",
    "img/el/el-4.jpg",
    "img/el/el-5.jpg",
    "img/el/el-6.jpg",
    "img/el/el-7.jpg",
    "img/el/el-8.jpg",
    "img/el/el-9.jpg",
    "img/el/el-10.jpg",
        
    "img/nv/nv-1.jpg",
    "img/nv/nv-2.jpg",
    "img/nv/nv-3.jpg",
    "img/nv/nv-4.jpg",
    "img/nv/nv-5.jpg",
    "img/nv/nv-6.jpg",
    "img/nv/nv-7.jpg",
        
    "img/nb/nb-1.jpg",
    "img/nb/nb-2.jpg",
    "img/nb/nb-3.jpg",
    "img/nb/nb-4.jpg",
    "img/nb/nb-5.jpg",
    "img/nb/nb-6.jpg",
    "img/nb/nb-7.jpg",
    "img/nb/nb-8.jpg",
    "img/nb/nb-9.jpg",
    "img/nb/nb-10.jpg",
    "img/nb/nb-11.jpg",
    "img/nb/nb-12.jpg",
    "img/nb/nb-13.jpg",
        
    "img/hm/hm-1.jpg",
    "img/hm/hm-2.jpg",
    "img/hm/hm-3.jpg",
    "img/hm/hm-4.jpg",
    "img/hm/hm-5.jpg",
    "img/hm/hm-6.jpg",
        
    "img/cc/cc-1.jpg",
    "img/cc/cc-2.jpg",
    "img/cc/cc-3.jpg",
    "img/cc/cc-4.jpg",
    "img/cc/cc-5.jpg"
])});


