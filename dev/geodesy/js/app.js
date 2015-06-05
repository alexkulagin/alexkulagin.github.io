// SVGeezy.js 1.0
window.svgeezy=function(){return{init:function(t,i){this.avoid=t||false;this.filetype=i||"png";this.svgSupport=this.supportsSvg();if(!this.svgSupport){this.images=document.getElementsByTagName("img");this.imgL=this.images.length;this.fallbacks()}},fallbacks:function(){while(this.imgL--){if(!this.hasClass(this.images[this.imgL],this.avoid)||!this.avoid){var t=this.images[this.imgL].getAttribute("src");if(t===null){continue}if(this.getFileExt(t)=="svg"){var i=t.replace(".svg","."+this.filetype);this.images[this.imgL].setAttribute("src",i)}}}},getFileExt:function(t){var i=t.split(".").pop();if(i.indexOf("?")!==-1){i=i.split("?")[0]}return i},hasClass:function(t,i){return(" "+t.className+" ").indexOf(" "+i+" ")>-1},supportsSvg:function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")}}}();



// PAGE APP
var app = (function(root)
{

    var win, dts, docEl, $,
        scrollPosition,
        mm, mq, 
        getViewportWidth, getViewportHeight, 
        vpW, vpH, vpA, vpO,
        fullHeightContainer,
        splashMedia, splashMediaWidth, splashMediaHeight,
        splashLogo, splashArrow,

        app = {};

    function initialize(jQ)
    {

        $ = jQ;
        win = $(root);
        dts = document.all && !window.atob ? document.documentElement : document.body;
        docEl = document.documentElement;

        mm = root['matchMedia'] || root['msMatchMedia'];
        mq = mm ? function(q) { return !!mm.call(root, q)['matches'] } 
                : function() { return false };
        
        vpW = vpH = vpA = vpO = splashMediaWidth = splashMediaHeight = scrollPosition = 0;

        getViewportWidth = getViewportSize('width', 'innerWidth', 'clientWidth');
        getViewportHeight = getViewportSize('height', 'innerHeight', 'clientHeight');

        fullHeightContainer = $('#splash, #colophon');

        splashMedia = $('.splash-video video');
        splashMediaWidth = 1076;
        splashMediaHeight = 606;

        splashLogo = $('.splash-logo img');
        splashArrow = $('.splash-arrow img');

        svgeezy.init(false, 'png');

        win.resize(onResizeHandler);
        win.scroll(onScrollHandler);

        onResizeHandler();
        onScrollHandler();
    }

    function getViewportSize(d, i, c)
    {
        return docEl[c] < root[i] && mq('(min-' + d + ':' + root[i] + 'px)') 
            ? function() { return root[i] } 
            : function() { return docEl[c] };
    }

    function onResizeHandler()
    {
        vpW = getViewportWidth();
        vpH = getViewportHeight();
        vpA = vpW / vpH;
        vpO = 1 < vpA ? 0 : 1; // "landscape" : "portrait"

        /*console.log(
            "\nwidth:", vpW, 
            "\nheight:", vpH, 
            "\naspect ratio:", vpA, 
            "\norientation:", vpO == 0 ? "landscape" : "portrait"
        );*/

        fullHeightContainer && fullHeightContainer.css('height', vpH);


        if (splashMediaWidth / vpW < splashMediaHeight / vpH) {
            splashMedia.height('auto');
            splashMedia.width(vpW);
        } else {
            splashMedia.height(vpH);
            splashMedia.width('auto');
        }
    }

    function onScrollHandler()
    {
        //console.log("dispatch on scroll");
        scrollPosition = dts.scrollTop;

        if (scrollPosition < vpH) {
            splashLogo.css({
                'opacity': 0.6 * (1 - (scrollPosition * 1) / vpH),
                'top': 50 / (1 - (scrollPosition * 0.4) / vpH) + '%'
            });

            splashArrow.css('opacity', 0.6 * (1 - (scrollPosition * 4) / vpH));
        }
    }

    // PUBLIC METHODS
    app['initialize'] = initialize;

    // EXTERNAL ACCESS
    return app;

}(this));




// INITIALIZE APP
jQuery && jQuery(function(jQuery) { app.initialize(jQuery) });




// OLD IOS DEVICE RESIZE FIX BUG
;(function(doc) 
{
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



