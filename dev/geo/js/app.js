


// VIEWPORT UTILS
/*var vpu = (function(win, doc)
{
	var db = doc.body,
		de = doc.documentElement,
		dt = doc.all && !win.atob ? de : db,

		mm = win['matchMedia'] || win['msMatchMedia'],
	    mq = mm ? function(q) { return !!mm.call(win, q)['matches'] } 
	            : function() { return false },
	    getSize = function(d, i, c) { return de[c] < win[i] && mq('(min-' + d + ':' + win[i] + 'px)') ? function() { return win[i] } : function() { return de[c] } },
	
	utils = {};
	utils['getWidth'] = getSize('width', 'innerWidth', 'clientWidth');
	utils['getHeight'] = getSize('height', 'innerHeight', 'clientHeight');
	utils['getAspectRatio'] = function() { return utils.getWidth() / utils.getHeight() };
	utils['getOrientation'] = function() { return 1 < utils.getAspectRatio() ? 0 : 1 }; // ? "landscape 0" : "portrait 1"
	utils['getScrollTop'] = function() { return dt.scrollTop };
	utils['getScrollLeft'] = function() { return dt.scrollLeft };
	utils['getDocumentWidth'] = function() { return Math.max(db.scrollWidth, db.offsetWidth, db.clientWidth, de.scrollWidth, de.offsetWidth, de.clientWidth) };
	utils['getDocumentHeight'] = function() { return Math.max(db.scrollHeight, db.offsetHeight, db.clientHeight, de.scrollHeight, de.offsetHeight, de.clientHeight) };

	return utils;

}(window, document));*/




//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  PAGE APP                                                                                ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


;(function(win, doc, modernizr, $)
{

	//┐
    //│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
    //╠──┤  VIEWPORT UTILS                                                                      │
    //│  └──────────────────────────────────────────────────────────────────────────────────────┘
    //┘

	var vp = (function(w, d)
	{	
		var db = d.body,
			de = d.documentElement,
			dt = d.all && !w.atob ? de : db,

			mm = w['matchMedia'] || w['msMatchMedia'],
		    mq = mm ? function(q) { return !!mm.call(w, q)['matches'] } 
		            : function() { return false },
		    vs = function(d, i, c) { return de[c] < w[i] && mq('(min-' + d + ':' + w[i] + 'px)') ? function() { return w[i] } : function() { return de[c] } },
		
		utils = {};
		utils['width'] = vs('width', 'innerWidth', 'clientWidth');
		utils['height'] = vs('height', 'innerHeight', 'clientHeight');
		utils['aspect'] = function() { return utils.width() / utils.height() };
		utils['orientation'] = function() { return 1 < utils.aspect() ? 0 : 1 }; // ? "landscape 0" : "portrait 1"
		utils['documentWidth'] = function() { return Math.max(db.scrollWidth, db.offsetWidth, db.clientWidth, de.scrollWidth, de.offsetWidth, de.clientWidth) };
		utils['documentHeight'] = function() { return Math.max(db.scrollHeight, db.offsetHeight, db.clientHeight, de.scrollHeight, de.offsetHeight, de.clientHeight) };
		utils['scrollY'] = function() { return w.scrollY || dt.scrollTop };
		utils['scrollX'] = function() { return w.scrollX || dt.scrollLeft };

		return utils;

	}(win, doc));



	//┐
    //│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
    //╠──┤  SVG FALLBACK                                                                        │
    //│  └──────────────────────────────────────────────────────────────────────────────────────┘
    //┘

	var svgfallback = (function(d)
	{
		var images, l, src, newSrc, ext;

		function run()
		{
			images = d.getElementsByTagName('img');
			l = images.length;

			while (l--) 
			{
				src = images[l].getAttribute('src');
				if (src === null) continue;
				if (getExt(src) == 'svg') {
					newSrc = src.replace('.svg', '.' + 'png');
					images[l].setAttribute('src', newSrc);
				}	
			}
		}

		function getExt(s)
		{
			ext = s.split('.').pop();

			if (ext.indexOf("?") !== -1) {
          		ext = ext.split('?')[0];
        	}

        	return ext;
		}

		return { 'run': run };

	}(doc));



	//┐
    //│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
    //╠──┤  SPLASH                                                                              │
    //│  └──────────────────────────────────────────────────────────────────────────────────────┘
    //┘

	var splash,
		splashVideoContainer, 
		splashCoverContainer, 
		splashVideo, 
		videoWidth, 
		videoHeight, 
		splashLogo, 
		splashArrow;


	function onSplashInit()
	{
		splash = $('#splash');
		splashVideoContainer = $('#splash .video');
		splashCoverContainer = $('#splash .cover');
		splashVideo = $('#splash video');
		videoWidth = 1076;
		videoHeight = 606;

		splashLogo = $('#splash .logo');
		splashArrow = $('#splash .arrow');

		modernizr.videoautoplay ? splashVideoContainer.show() : splashCoverContainer.show();
	}


	function onSplashResize(w, h)
    {
    	modernizr.videoautoplay && (videoWidth / w < videoHeight / h)
    		? splashVideo.css({ 'width': w, 'height': 'auto' })
    		: splashVideo.css({ 'width': 'auto', 'height': h });
    }


    function onSplashScroll(s, h)
    {
    	var lt = 0.5, // logo top factor
    		lo = 1.0, // logo opacity factor
    		ao = 4.0; // arrow opacity factor

    	if (s > h) return;

    	splashLogo.css({
            'opacity': 0.6 * (1 - (s * lo) / h),
            'top': 40 / (1 - (s * lt) / h) + '%'
         });

        splashArrow.css('opacity', 0.6 * (1 - (s * ao) / h));
    }



	//┐
    //│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
    //╠──┤  STICKY MENU                                                                         │
    //│  └──────────────────────────────────────────────────────────────────────────────────────┘
    //┘

	var sticky;


	function onStickyInit()
	{
		sticky = $('#sticky');
	}


	function onStickyScroll(s, h)
	{
		if (s > h/*(h + 64)*/) {
        	sticky.addClass("fix");
        	splash.addClass("fix");
        } else {
        	sticky.removeClass("fix");
        	splash.removeClass("fix");
        }
	}



	//┐
    //│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
    //╠──┤  CHECK VIDEO AUTOPLAY & STARTUP APP                                                  │
    //│  └──────────────────────────────────────────────────────────────────────────────────────┘
    //┘

	$(function($) { modernizr.ie && modernizr.ien ? initialize(true) : modernizr.on('videoautoplay', function(r) { initialize(r) }) });



	//┐
    //│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
    //╠──┤  APP PROPS                                                                           │
    //│  └──────────────────────────────────────────────────────────────────────────────────────┘
    //┘

	var FHContainer;	// full height container



	//┐
    //│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
    //╠──┤  APP INITIALIZE                                                                      │
    //│  └──────────────────────────────────────────────────────────────────────────────────────┘
    //┘

	function initialize(bool)
	{
		modernizr.videoautoplay = bool; // ie 9/10/11 autoplay fix

		!modernizr.svg && svgfallback.run();

		FHContainer = $('#splash'); // $('#splash, #colophon') for multiple exucution

		// container
		onSplashInit();
		onStickyInit();

		// handlers
		$(win).resize(onResizeHandler);
        $(win).scroll(onScrollHandler);

        // initialize prop
		onResizeHandler();
        onScrollHandler();


        /// TEST
        btn = $('.mobile-btn');
        btn.click(function(e) { e.preventDefault(); btn.toggleClass('open') });
	}



	//┐
    //│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
    //╠──┤  RESIZE HANDLER                                                                      │
    //│  └──────────────────────────────────────────────────────────────────────────────────────┘
    //┘

	function onResizeHandler()
    {
    	var w = vp.width();
    	var h = vp.height();

    	FHContainer && FHContainer.css('height', h);

    	onSplashResize(w, h);

    	alert(w);
    }



	//┐
    //│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
    //╠──┤  SCROLLING HANDLER                                                                   │
    //│  └──────────────────────────────────────────────────────────────────────────────────────┘
    //┘

	function onScrollHandler()
    {
    	var s = vp.scrollY();
    	var h = vp.height();

        onSplashScroll(s, h);
        onStickyScroll(s, h);
    }


}(window, document, Modernizr, jQuery));




//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  OLD IOS DEVICE RESIZE FIX BUG                                                           ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


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




