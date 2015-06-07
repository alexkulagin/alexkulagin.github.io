


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



// PAGE APP
;(function(win, doc, m, $)
{

	// VIEWPORT UTILS
	// ==============================================================================================

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
		utils['verticalScroll'] = function() { return dt.scrollTop };
		utils['horizontalScroll'] = function() { return dt.scrollLeft };

		return utils;

	}(win, doc));



	// SVG FALLBACKS
	// ==============================================================================================

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



	// CHECK VIDEO AUTOPLAY AND STARTUP APP
	// ==============================================================================================

	$(function($) { m.ie && m.ien ? initialize(true) : m.on('videoautoplay', function(r) { initialize(r) }) });



	// APP PROPS
	// ==============================================================================================

	var splashVideo, splashCover,
		FHContainer;



	// APP INITIALIZE
	// ==============================================================================================

	function initialize(bool)
	{
		m.videoautoplay = bool;
		
		!m.svg && svgfallback.run();

		splashVideo = $('#splash .video');
		splashCover = $('#splash .cover');
		
		bool ? splashVideo.show() : splashCover.show();

		FHContainer = $('#splash'); // $('#splash, #colophon') multiple

		$(win).resize(onResizeHandler);

		onResizeHandler();
	}



	// RESIZE HANDLER
	// ==============================================================================================

	function onResizeHandler()
    {
    	FHContainer && FHContainer.css('height', vp.height());
    }


}(window, document, Modernizr, jQuery));

