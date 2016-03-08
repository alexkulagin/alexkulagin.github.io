/*var scaleCurve = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
    var el = document.getElementsByClassName('pnl-ic')[0];

// mo.js timeline obj
var	timeline = new mojs.Timeline(),

	// tweens for the animation:

	// burst animation
	tween1 = new mojs.Burst({
		parent: el,
		duration: 1500,
		shape : 'circle',
		fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
		x: '50%',
		y: '50%',
		opacity: 0.6,
		childOptions: { 
      radius: {12:0},
			type: 'line',
			stroke: [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
			strokeWidth: 1
    },
		radius: {40:110},
		count: 6,
		isSwirl: true,
		isRunLess: true,
		easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
	});

timeline.add(tween1);
el.addEventListener('click', function() {
	timeline.start();
});*/









	'use strict';

	// taken from mo.js demos
	function isIOSSafari() {
		var userAgent;
		userAgent = window.navigator.userAgent;
		return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
	};

	// taken from mo.js demos
	function isTouch() {
		var isIETouch;
		isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
		return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
	};
	
	// taken from mo.js demos
	var isIOS = isIOSSafari(),
		clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}


function Animocon(el, options) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );

		this.checked = false;

		this.timeline = new mojs.Timeline();
		
		for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
			this.timeline.add(this.options.tweens[i]);
		}

		var self = this;
		this.el.addEventListener(clickHandler, function() {
			if( self.checked ) {
				self.options.onUnCheck();
			}
			else {
				self.options.onCheck();
				self.timeline.start();
			}
			self.checked = !self.checked;
		});
	}

	Animocon.prototype.options = {
		tweens : [
			new mojs.Burst({
				shape : 'circle',
				isRunLess: true
			})
		],
		onCheck : function() { return false; },
		onUnCheck : function() { return false; }
	};

//==============





function createHeartIc(el) {
	var el = el,
		span = el.querySelector('span'),
		svg = span.querySelector('svg'),
		opacityCurve = mojs.easing.path('M0,0 C0,87 27,100 40,100 L40,0 L100,0'),
		scaleCurve = mojs.easing.path('M0,0c0,80,39.2,100,39.2,100L40-100c0,0-0.7,106,60,106'),
		burst = new mojs.Burst({
			parent: el,
			duration: 1200,
			delay: 200,
			shape: 'circle',
			fill: '#E87171',
			x: '50%', y: '50%',
			opacity: {1:0},
			childOptions: { 
				radius: {6:0},
				type: 'line',
				stroke: '#E87171',
				strokeWidth: 2
			},
			radius: {0:32},
			count: 7,
			//isSwirl: true,
			isRunLess: true,
			easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
		}),
		heart = new Animocon(el, {
			tweens : [
				/* // ring animation
				new mojs.Transit({
					parent: el11,
					duration: 1000,
					delay: 100,
					type: 'circle',
					radius: {0: 95},
					fill: 'transparent',
					stroke: '#C0C1C3',
					strokeWidth: {50:0},
					opacity: 0.4,
					x: '50%',     
					y: '50%',
					isRunLess: true,
					easing: mojs.easing.bezier(0, 1, 0.5, 1)
				}),
				// ring animation
				new mojs.Transit({
					parent: el11,
					duration: 1800,
					delay: 300,
					type: 'circle',
					radius: {0: 80},
					fill: 'transparent',
					stroke: '#C0C1C3',
					strokeWidth: {40:0},
					opacity: 0.2,
					x: '50%',     
					y: '50%',
					isRunLess: true,
					easing: mojs.easing.bezier(0, 1, 0.5, 1)
				}), */
				// icon scale animation
				
				burst,
				
				new mojs.Tween({
					duration : 800,
					easing: mojs.easing.ease.out,
					onUpdate: function(progress) {
						var opacityProgress = opacityCurve(progress);
						span.style.opacity = opacityProgress;

						var scaleProgress = scaleCurve(progress);
						span.style.WebkitTransform = span.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';

						var colorProgress = opacityCurve(progress);
						svg.style.fill = colorProgress >= 1 ? '#E87171' : 'none';
						svg.style.stroke = colorProgress >= 1 ? '#E87171' : '#a1a8ad';
					}
				})	
			],
			onUnCheck : function() {
				svg.style.fill = 'none';
				svg.style.stroke = '#a1a8ad';
			}
		});

	return heart;
}


function createCartIc(el) {
	var el = el,
		span = el.querySelector('span'),
		svg = span.querySelector('svg'),
		body = svg.getElementsByTagName("path")[0],
		opacityCurve = mojs.easing.path('M0,0 C0,87 27,100 40,100 L40,0 L100,0'),
		scaleCurve = mojs.easing.path('M0,0c0,80,39.2,100,39.2,100L40-100c0,0-0.7,106,60,106'),
		burst = new mojs.Burst({
			parent: el,
			duration: 1200,
			delay: 200,
			shape: 'circle',
			fill: '#111111',
			x: '50%', y: '50%',
			opacity: {1:0},
			childOptions: { 
				radius: {6:2},
				type: 'line',
				stroke: '#111111',
				strokeWidth: 2
			},
			radius: {0:36},
			angle: 45,
			count: 4,
			//isSwirl: true,
			isRunLess: true,
			easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
		}),
		heart = new Animocon(el, {
			tweens : [
				/* // ring animation
				new mojs.Transit({
					parent: el11,
					duration: 1000,
					delay: 100,
					type: 'circle',
					radius: {0: 95},
					fill: 'transparent',
					stroke: '#C0C1C3',
					strokeWidth: {50:0},
					opacity: 0.4,
					x: '50%',     
					y: '50%',
					isRunLess: true,
					easing: mojs.easing.bezier(0, 1, 0.5, 1)
				}),
				// ring animation
				new mojs.Transit({
					parent: el11,
					duration: 1800,
					delay: 300,
					type: 'circle',
					radius: {0: 80},
					fill: 'transparent',
					stroke: '#C0C1C3',
					strokeWidth: {40:0},
					opacity: 0.2,
					x: '50%',     
					y: '50%',
					isRunLess: true,
					easing: mojs.easing.bezier(0, 1, 0.5, 1)
				}), */
				// icon scale animation
				
				burst,
				
				new mojs.Tween({
					duration : 800,
					easing: mojs.easing.ease.out,
					onUpdate: function(progress) {
						var opacityProgress = opacityCurve(progress);
						span.style.opacity = opacityProgress;

						var scaleProgress = scaleCurve(progress);
						span.style.WebkitTransform = span.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';

						var colorProgress = opacityCurve(progress);
						body.style.fill = colorProgress >= 1 ? '#111111' : 'none';
						svg.style.stroke = colorProgress >= 1 ? '#111111' : '#a1a8ad';
					}
				})	
			],
			onUnCheck : function() {
				body.style.fill = 'none';
				svg.style.stroke = '#a1a8ad';
			}
		});

	return heart;
}


var hearts = document.getElementsByClassName('pnl-favorites'),
	carts = document.getElementsByClassName('pnl-tocart');

for (var i=0;i<hearts.length;i++) {
	createHeartIc(hearts[i].querySelector('div'));
	createCartIc(carts[i].querySelector('div'));
}


