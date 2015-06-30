


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




//┐
//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
//│  ║                                                                                          ║
//╠──╢  PAGE APP                                                                                ║
//│  ║                                                                                          ║
//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
//┘


(function (win, doc, Modernizr, Signal, $) {

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
		var collection, l, src, to, ext;

		function run()
		{
			collection = d.getElementsByTagName('img');
			l = collection.length;

			while (l--) 
			{
				src = collection[l].getAttribute('src');
				if (src === null) continue;
				if (getExt(src) == 'svg') {
					to = src.replace('.svg', '.' + 'png');
					collection[l].setAttribute('src', to);
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
	//╠──┤  APP PROPS                                                                           │
	//│  └──────────────────────────────────────────────────────────────────────────────────────┘
	//┘

	var vW = 0, vH = 0,		// width, height
		vA = 0, vO = 0,		// aspect ratio, orientation
		dW = 0, dH = 0,		// doc width, doc height
		sX = 0, sY = 0,		// scrollX, scrollY

		isMobile,			// mobile or desktop version

		body,

		// app signals
		initializeSignal = new Signal(),
		resizeSignal = new Signal(),
		scrollSignal = new Signal(),
		mobileSignal = new Signal();



	//┐
	//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
	//╠──┤  APP INITIALIZE                                                                      │
	//│  └──────────────────────────────────────────────────────────────────────────────────────┘
	//┘

	function initialize(b)
	{
		Modernizr.videoautoplay = b; // ie 9/10/11 autoplay fix
		Modernizr.svg || svgfallback.run();

		body = $('body');

		// initialize sections
		initializeSignal.dispatch();
		initializeSignal = undefined;

		// handlers registration
		$(win).resize(onResizeHandler);
		$(win).scroll(onScrollHandler);

		mobileSignal.add(onChangeVersion);

		// update props
		onResizeHandler();
		onScrollHandler();
	}



	//┐
	//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
	//╠──┤  APP RESIZE HANDLER                                                                  │
	//│  └──────────────────────────────────────────────────────────────────────────────────────┘
	//┘

	function onResizeHandler()
	{
		vW = vp.width();
		vH = vp.height();
		vA = vp.aspect(); 
		vO = vp.orientation();

		var m = isMobile;
		isMobile = vW >= (16 * 60) ? false : true;
		isMobile !== m && mobileSignal.dispatch();

		resizeSignal.dispatch();
	}



	//┐
	//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
	//╠──┤  APP SCROLLING HANDLER                                                               │
	//│  └──────────────────────────────────────────────────────────────────────────────────────┘
	//┘

	function onScrollHandler()
	{
		sX = vp.scrollX(); 
		sY = vp.scrollY();
		
		scrollSignal.dispatch()
	}



	//┐
	//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
	//╠──┤  APP CHANGE MOBILE VERSION                                                           │
	//│  └──────────────────────────────────────────────────────────────────────────────────────┘
	//┘

	function onChangeVersion()
	{
		isMobile ? body.addClass('mobile') : body.removeClass('mobile');
	}



	//┐
	//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
	//╠──┤  SPLASH MODULE                                                                       │
	//│  └──────────────────────────────────────────────────────────────────────────────────────┘
	//┘
	
	var splash,
		videoContainer,
		coverContainer,
		splashVideo,
		splashLogo,
		splashArrow,
		splashAutoplay,

		videoWidth = 1076, 
		videoHeight = 606; 

	initializeSignal.addOnce(splashInit);

	function splashInit()
	{
		splash = $('#splash');
		videoContainer = $('#splash .video');
		coverContainer = $('#splash .cover');
		splashVideo = $('#splash video');
		splashLogo = $('#splash .logo');
		splashArrow = $('#splash .arrow');

		splashAutoplay = Modernizr.videoautoplay;
		splashAutoplay ? videoContainer.show() : coverContainer.show();

		resizeSignal.add(splashResize);
		scrollSignal.add(splashScroll);
	}


	function splashResize()
	{
		var w = vW,
			h = vH,
			o = 64;

		splash.css('height', h);

		splashAutoplay && (videoWidth / w < videoHeight / h)
			? splashVideo.css({ 'width': w + o, 'height': 'auto' })
			: splashVideo.css({ 'width': 'auto', 'height': h + o });
	}


	function splashScroll()
	{
		var lt = 0.5,	// logo top factor
			lo = 1.0,	// logo opacity factor
			ao = 4.0,	// arrow opacity factor
			op = 0.6,	// default opacity
			to = 40;	// default logo top
		
		if (sY > vH) return;

		splashLogo.css({
			'opacity': op * (1 - (sY * lo) / vH),
			'top': to / (1 - (sY * lt) / vH) + '%'
		 });

		splashArrow.css('opacity', op * (1 - (sY * ao) / vH));
	}



	//┐
	//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
	//╠──┤  STICKY MODULE                                                                       │
	//│  └──────────────────────────────────────────────────────────────────────────────────────┘
	//┘
	
	var sticky,
		stickyTint;

	initializeSignal.addOnce(stickyInit);

	function stickyInit()
	{
		sticky = $('#sticky-menu');
		stickyTint = $('#sticky-menu .tint');

		scrollSignal.add(stickyScroll);
	}

	function stickyScroll()
	{
		var min = 0.0,	// default opacity
			max = 0.6;	// final opacity

		if (sY > vH) return;

		stickyTint.css('opacity', min + (max - min) * (sY/vH));
	}



	//┐
	//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
	//╠──┤  MODAL MENU MODULE                                                                   │
	//│  └──────────────────────────────────────────────────────────────────────────────────────┘
	//┘
	
	var menu,
		menuBtn,
		isMenuOpen;

	initializeSignal.addOnce(menuInit);

	function menuInit()
	{
		menu = $('#modal-menu');
		menuBtn = $('#modal-menu .btn');
		menuBtn.click(onClickMenuBtn);

		mobileSignal.add(onChangeMobileMenu);
	}

	function onChangeMobileMenu()
	{
		!isMobile && isMenuOpen && onHideMenu();
	}

	function onClickMenuBtn()
	{
		!isMenuOpen ? onShowMenu() : onHideMenu();
	}

	function onShowMenu()
	{
		menuBtn.addClass('open');
		body.addClass('modal');
		//body.bind('touchmove', function(e){ e.preventDefault() });

		isMenuOpen = true;
	}

	function onHideMenu()
	{
		menuBtn.removeClass('open');
		body.removeClass('modal');
		//body.unbind('touchmove');

		isMenuOpen = false;
	}



	//┐
	//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
	//╠──┤  CHECK VIDEO AUTOPLAY & STARTUP APP                                                  │
	//│  └──────────────────────────────────────────────────────────────────────────────────────┘
	//┘

	$(function($) { 
		!(Modernizr.ie && Modernizr.ien)
			? Modernizr.on('videoautoplay', function(r) { initialize(r) }) 
			: initialize(true) 
	});



}(window, document, Modernizr, signals.Signal, jQuery));






