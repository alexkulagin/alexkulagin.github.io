/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	
	
	
		// REQUIRE COMPONENT
	
		const	Controller = __webpack_require__(1);	
	
	
	
	/*
	 ╔═════════════════════════════════════════════════════════════════╗
	 ║       _                  ____            _       _              ║
	 ║      | | __ ___   ____ _/ ___|  ___ _ __(_)_ __ | |_            ║
	 ║   _  | |/ _` \ \ / / _` \___ \ / __| '__| | '_ \| __|           ║
	 ║  | |_| | (_| |\ V / (_| |___) | (__| |  | | |_) | |_            ║
	 ║   \___/ \__,_| \_/ \__,_|____/ \___|_|  |_| .__/ \__|           ║
	 ║      _                           _____    |_|    _ _    _ _     ║
	 ║     / \   __  ___   _ _ __ ___  |_   _|__   ___ | | | _(_) |_   ║
	 ║    / _ \  \ \/ / | | | '__/ _ \   | |/ _ \ / _ \| | |/ / | __|  ║
	 ║   / ___ \  >  <| |_| | | |  __/   | | (_) | (_) | |   <| | |_   ║
	 ║  /_/   \_\/_/\_\\__,_|_|  \___|   |_|\___/ \___/|_|_|\_\_|\__|  ║
	 ║                                                                 ║
	 ╚═════════════════════════════════════════════════════════════════╝
	*/
	
	
			// PRIVATE STATIC VARS
			
			var	_c = null;
			
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  ENTRY                                                                               │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			const Main = function () 
			{
				_c = new Controller();
			};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  PUBLIC                                                                              │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			Main.prototype = 
			{
				title: 'Axure JavaScript Toolkit',
				description: 'Набор инструментов для расширения возможностей прототипов Axure RP 8 с помощью простых JavaScript сценариев.',
				version: '2.0.5'
			};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  INSTANCE EXPORT                                                                     │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			window.app['instance'] = new Main();
	
	
	


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	
	
	
		// REQUIRE THIRD-PARTY LIBRARY
	
		const	_ = __webpack_require__(2),
				Backbone = __webpack_require__(3);
	
	
		// REQUIRE COMPONENT
	
		const	Router = __webpack_require__(4);
	
	
		// REQUIRE INSTANCE
	
		const	_broadcaster = __webpack_require__(5),
				_event = __webpack_require__(6),
				_root = __webpack_require__(7);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  APP CONTROLLER                                                                          ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
	
		// PRIVATE STATIC VARS
			
			var _router, _context, _contextList;
			
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  ENTRY                                                                               │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			const Controller = function () 
			{
				_context = {
					locked: false,	// блокировка текущего контекста (переход/загрузка)
					current: null,	// ссылка на текущий контекст
					next: null,		// ссылка на вызываемый контекст
					query: null,	// параметры запроса (URL)
					cache: null		// кеш с параметрами запроса
				};
	
				_router = new Router({ routes: {
					'(/)':								'home',
					'home(/)':							'home',
					'altitude/:altitudeID(/)':			'wall',
					'altitude/:altitudeID/:caseID(/)':	'case',
					'*error':							'error'
				}});
				
				_router.on('route', _change, this);
				_router.start();
			};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  PUBLIC METHODS                                                                      │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			//_.extend(Controller.prototype, Backbone.Events, {/*...*/});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  PRIVATE METHODS                                                                     │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			
			// SECTION 1
			// ---------------------------------------------------------------------------------
	
			const _change = function (to)
			{
				var arg = Array.prototype.slice.call(arguments, 1)[0],
					props = [],
					query, from;
				
				_.each(arg, function (item, index, f) {
					!(_.isNull(item) || _.isUndefined(item)) && props.push(item);
				}, this);
	
				console.log(to, props);
				
				/*from = (_context.current !== null) ? _context.current.id : null;
				query = [from, to, p];
	
				if (_.isEqual(query, _context.query)) return;
	
				if (!_context.locked) 
				{
					_context.cache = null;
					_context.locked = true;
					_context.query = query;
					_context.next = _contextList[to];
					_broadcaster.trigger([_event.ROUTE_CHANGED, _event.CONTEXT_LOCK].join(' '), query);
					_.series(_getQueue());
				} 
	
				else _context.cache = query;*/
			};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  MODULE EXPORT                                                                       │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			module.exports = Controller;
	
	
	


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = _;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = Backbone;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	
	
	
		// REQUIRE THIRD-PARTY LIBRARY
	
		const	BackboneRouter = __webpack_require__(3).Router;
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  APP ROUTER                                                                              ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  ENTRY                                                                               │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			const Router = BackboneRouter.extend(
			{
				start: function ()
				{
					Backbone.history.start({ pushState: true });
				}
			});
			
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  MODULE EXPORT                                                                       │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			module.exports = Router;
	
	
	


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	
	
	
		// REQUIRE THIRD-PARTY LIBRARY
	
		const	_ = __webpack_require__(2),
				Backbone = __webpack_require__(3);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  APP BROADCASTER                                                                         ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  ENTRY                                                                               │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			const Broadcaster = function () {};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  PUBLIC METHODS                                                                      │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			_.extend(Broadcaster.prototype, Backbone.Events, {});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  EXPORT INSTANCE                                                                     │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			module.exports = new Broadcaster();
	
	
	


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  BROADCASTER EVENTS                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  EXPORT INSTANCE                                                                     │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			module.exports = 
			{
	
				// CONTROLLER EVENTS
				
				//GOTO:						'router:goto',
				ROUTE_CHANGED:				'route:changed',
				
				CONTEXT_LOCK:				'context:lock',
				CONTEXT_UNLOCK:				'context:unlock',
				CONTEXT_UPDATE:				'context:update',
				CONTEXT_DEACTIVATE:			'context:deactivete',
				CONTEXT_CHANGED:			'context:changed',
				CONTEXT_ACTIVATE:			'context:activete',
				CONTEXT_READY:				'context:ready',
	
				
				// PRELOADER EVENTS
				
				PRELOADER_SHOW: 			'preloader:show',
				PRELOADER_HIDE: 			'preloader:hide',
				PRELOADER_COMPLETE: 		'preloader:complete'
	
	
				// WALL EVENTS
				
				
				
			};
	
	
	


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

				
	
	
		// REQUIRE THIRD-PARTY LIBRARY
	
		const	webfont = __webpack_require__(8);
	
	
		// REQUIRE COMPONENT
	
		//const	NavView = require('./NavView');
	
	
		// REQUIRE INSTANCE
	
		const	_preloader = __webpack_require__(9);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  ROOT VIEW                                                                               ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  ENTRY                                                                               │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			var RootView = function () 
			{
	
				// STYLES
		
				__webpack_require__(10);
				
	
				// WEBFONTS
	
				webfont.load({
					google: { families: ['Roboto Mono:100,100i,300,300i,400,400i,500,500i,700,700i:latin,cyrillic'] },
					classes: false, events: false
				});
				
	
				// CONTAINERS
				
				var appEl, navEl, layoutEl, fragmentEl;
	
				navEl = document.createElement("div");
				navEl.className = 'nav';
	
				layoutEl = document.createElement("div");
				layoutEl.className = 'layout';
	
				fragmentEl = document.createDocumentFragment();
				fragmentEl.appendChild(layoutEl);
				fragmentEl.appendChild(navEl);
	
				appEl = document.getElementsByClassName('app')[0];
				appEl.insertBefore(fragmentEl, appEl.firstChild);
	
				this.el = { app: appEl, nav: navEl, layout: layoutEl };
	
	
				// COMPONENTS
	
				//this.preloader = new PreloaderView();
				//this.nav = new NavView({ el: navEl });
				//window.app.instance['root'] = this
	
				/*document.addEventListener("keydown", onDown, false);
	
				function onDown(e) {
					var keyCode = e.keyCode;
						if (keyCode==49) {
							console.log("You hit the enter key.", _preloader);
							_broadcaster.trigger(_event.PRELOADER_SHOW);
						} 
						
						if (keyCode==50) {
							console.log("Oh no you didn't.", _preloader);
							_broadcaster.trigger(_event.PRELOADER_HIDE);
						}
				}*/
			};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  INSTANCE EXPORT                                                                     │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			module.exports = new RootView();
	
	
	


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = WebFont;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	
	
	
		// REQUIRE THIRD-PARTY LIBRARY
	
		const	_ = __webpack_require__(2),
				Backbone = __webpack_require__(3);
	
	
		// REQUIRE INSTANCE
	
		const	_broadcaster = __webpack_require__(5),
				_event = __webpack_require__(6);
	
	
	
	
	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  PRELOADER VIEW                                                                          ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘
	
	
			// PRIVATE STATIC VARS
			
			var	_el, _gif, _src, _hidden = false, _active = true;
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  ENTRY                                                                               │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			var PreloaderView = Backbone.View.extend(
			{
				initialize: function ()
				{
					_el = document.getElementsByClassName('app')[0].getElementsByClassName('preloader')[0];
					_gif = _el.getElementsByTagName('img')[0];
					_src = _gif.src;
	
					this.setElement(_el);
	
					this.listenTo(_broadcaster, _event.PRELOADER_SHOW, this.show);
					this.listenTo(_broadcaster, _event.PRELOADER_HIDE, this.hide);
				},
	
				show: function ()
				{
					_transitionIn();
				},
	
				hide: function ()
				{
					_transitionOut();
				},
	
				isHidden: function ()
				{
					return _hidden;
				},
	
				isActive: function ()
				{
					return _active;
				}
			});
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  PRIVATE METHODS                                                                     │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			const _transitionIn = function ()
			{
				if (_active) return;
				_active = true;
	
				_gif.setAttribute('src', _src);
				_el.className = 'preloader transition-before';
	
				setTimeout(function(){
					window.requestAnimationFrame(function () {
						_el.className = 'preloader transition-in';
						_gif.addEventListener('transitionend', _transitionInComplete);
					});
				}, 50);
			};
	
			const _transitionInComplete = function (event)
			{
				_gif.removeEventListener('transitionend', _transitionInComplete);
				_el.className = 'preloader';
				_hidden = false;
				_broadcaster.trigger(_event.PRELOADER_COMPLETE);
			};
	
			const _transitionOut = function ()
			{
				if (!_active) return;
				_active = false;
				
				_gif.addEventListener('transitionend', _transitionOutComplete);
				_el.className = 'preloader transition-out';
			};
	
			const _transitionOutComplete = function (event)
			{
				_gif.removeEventListener('transitionend', _transitionOutComplete);
				_gif.setAttribute('src', "#");
				_el.className = 'preloader hidden';
				_hidden = true;
				_broadcaster.trigger(_event.PRELOADER_COMPLETE);
			};
	
	
	
		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  MODULE EXPORT                                                                       │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘
	
			module.exports = new PreloaderView();
	
	
	


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!./app.css", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!./app.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".nav {\n  position: fixed;\n  z-index: 55555;\n}\n.nav > div {\n  position: fixed;\n}\n.layout {\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n.layer {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n}\n.layer.disable {\n  overflow-y: hidden;\n}\n.layer.scrollable {\n  overflow-y: auto;\n}\n.layer.hidden {\n  display: none;\n}\n.nav .button {\n  width: 3.2rem;\n  height: 3.2rem;\n  cursor: pointer;\n}\n.nav .button svg path {\n  fill: none;\n}\n.nav .button svg .filled {\n  fill: #232428;\n}\n.nav .button:hover svg .filled {\n  fill: #f9e58d;\n}\n.nav .button {\n  width: 3.2rem;\n  height: 3.2rem;\n  cursor: pointer;\n  text-transform: uppercase;\n  font-size: 0.75em;\n  text-decoration: underline;\n  line-height: 2em;\n  font-weight: 700;\n  color: #232428;\n}\n.nav .button svg path {\n  fill: none;\n}\n.nav .button svg .filled {\n  fill: #232428;\n}\n.nav .button:hover {\n  color: #f9e58d;\n}\n.nav .button:hover svg .filled {\n  fill: #f9e58d;\n}\n.nav .back {\n  width: 13.4rem;\n  height: 13.4rem;\n  position: fixed;\n  top: 0;\n  left: 0;\n}\n.nav .back .wrapper,\n.nav .back .button > span {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  top: 50%;\n  left: 50%;\n}\n.nav .back.hidden {\n  display: none;\n}\n.nav .plus {\n  width: 13.4rem;\n  height: 13.4rem;\n  position: fixed;\n  top: 0;\n  left: 0;\n}\n.nav .plus .wrapper {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  top: 50%;\n  left: 50%;\n}\n.nav .plus.hidden {\n  display: none;\n}\n.nav .covers {\n  width: 13.4rem;\n  height: 13.4rem;\n  position: fixed;\n  top: 50%;\n  left: 0;\n  transform: translateY(-50%);\n}\n.nav .covers .wrapper {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  top: 50%;\n  left: 50%;\n}\n.nav .covers.hidden {\n  display: none;\n}\n.nav .social {\n  width: 13.4rem;\n  height: 18.2rem;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n}\n.nav .social .wrapper {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  top: 50%;\n  left: 50%;\n}\n.nav .social .button:first-child {\n  margin-bottom: 1.6rem;\n}\n.nav .social.hidden {\n  display: none;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5sZXNzIiwibW9kdWxlL25hdi5idXR0b25zLmxlc3MiLCJtb2R1bGUvbmF2Lmxlc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JFO0VBQ0MsZUFBQTtFQUNBLGNBQUE7O0FBRUEsSUFBRTtFQUNELGVBQUE7O0FBWUY7RUFDQyxXQUFBO0VBQWEsWUFBQTtFQUNiLGtCQUFBOztBQVdEO0VBQ0MsV0FBQTtFQUFhLFlBQUE7RUFDYixrQkFBQTtFQUNBLE1BQUE7RUFBUSxPQUFBO0VBQ1IsZ0JBQUE7O0FBRUEsTUFBQztFQUNBLGtCQUFBOztBQUdELE1BQUM7RUFDQSxnQkFBQTs7QUFHRCxNQUFDO0VBQ0EsYUFBQTs7QUN0REYsSUFBSztFQUNKLGFBQUE7RUFBZSxjQUFBO0VBQ2YsZUFBQTs7QUFGRCxJQUFLLFFBSUosSUFFQztFQUFPLFVBQUE7O0FBTlQsSUFBSyxRQUlKLElBR0M7RUFBVSxhQUFBOztBQUdYLElBVkksUUFVSCxNQUNBLElBQ0M7RUFBVSxhQUFBOztBQ1piLElBQUs7RUFDSixhQUFBO0VBQWUsY0FBQTtFQUNmLGVBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsMEJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTs7QUFSRCxJQUFLLFFBVUosSUFFQztFQUFPLFVBQUE7O0FBWlQsSUFBSyxRQVVKLElBR0M7RUFBVSxhQUFBOztBQUdYLElBaEJJLFFBZ0JIO0VBSUEsY0FBQTs7QUFKRCxJQWhCSSxRQWdCSCxNQUNBLElBQ0M7RUFBVSxhQUFBOztBQWNiLElBQUs7RUFFSixjQUFBO0VBQWdCLGVBQUE7RUFDaEIsZUFBQTtFQUNBLE1BQUE7RUFBUSxPQUFBOztBQUpULElBQUssTUFNSjtBQU5ELElBQUssTUFNTSxRQUFRO0VBQ2pCLGtCQUFBO0VBQ0EsV0FBVyxxQkFBWDtFQUNBLFFBQUE7RUFBVSxTQUFBOztBQUdYLElBWkksTUFZSDtFQUNBLGFBQUE7O0FBWUYsSUFBSztFQUVKLGNBQUE7RUFBZ0IsZUFBQTtFQUNoQixlQUFBO0VBQ0EsTUFBQTtFQUFRLE9BQUE7O0FBSlQsSUFBSyxNQU1KO0VBQ0Msa0JBQUE7RUFDQSxXQUFXLHFCQUFYO0VBQ0EsUUFBQTtFQUFVLFNBQUE7O0FBR1gsSUFaSSxNQVlIO0VBQ0EsYUFBQTs7QUFZRixJQUFLO0VBRUosY0FBQTtFQUFnQixlQUFBO0VBQ2hCLGVBQUE7RUFDQSxRQUFBO0VBQVUsT0FBQTtFQUNWLFdBQVcsZ0JBQVg7O0FBTEQsSUFBSyxRQU9KO0VBQ0Msa0JBQUE7RUFDQSxXQUFXLHFCQUFYO0VBQ0EsUUFBQTtFQUFVLFNBQUE7O0FBR1gsSUFiSSxRQWFIO0VBQ0EsYUFBQTs7QUFZRixJQUFLO0VBRUosY0FBQTtFQUFnQixlQUFBO0VBQ2hCLGVBQUE7RUFDQSxTQUFBO0VBQVcsT0FBQTs7QUFKWixJQUFLLFFBTUo7RUFDQyxrQkFBQTtFQUNBLFdBQVcscUJBQVg7RUFDQSxRQUFBO0VBQVUsU0FBQTs7QUFUWixJQUFLLFFBWUosUUFBTztFQUNOLHFCQUFBOztBQUdELElBaEJJLFFBZ0JIO0VBQ0EsYUFBQSIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5cbi8v4pSQXG4vL+KUgiAg4pWU4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWXXG4vL+KUgiAg4pWRICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRXG4vL+KVoOKUgOKUgOKVoiAgTEFZT1VUIFNUWUxFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkVxuLy/ilIIgIOKVkSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkVxuLy/ilIIgIOKVmuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVnVxuLy/ilJhcblxuXG5cdC8v4pSQXG5cdC8v4pSCICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0Ly/ilaDilIDilIDilKQgIE5BViAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxuXHQvL+KUgiAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG5cdC8v4pSYXG5cblx0XHQubmF2IHsgXG5cdFx0XHRwb3NpdGlvbjogZml4ZWQ7XG5cdFx0XHR6LWluZGV4OiA1NTU1NTtcblxuXHRcdFx0JiA+IGRpdiB7XG5cdFx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHRcdH1cblx0XHR9XG5cblxuXHRcdFxuXHQvL+KUkFxuXHQvL+KUgiAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG5cdC8v4pWg4pSA4pSA4pSkICBMQVlPVVQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcblx0Ly/ilIIgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHQvL+KUmFxuXG5cdFx0LmxheW91dCB7IFxuXHRcdFx0d2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgXG5cdFx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0fVxuXG5cblx0XHRcblx0Ly/ilJBcblx0Ly/ilIIgIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuXHQvL+KVoOKUgOKUgOKUpCAgTEFZRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG5cdC8v4pSCICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcblx0Ly/ilJhcblxuXHRcdC5sYXllciB7XG5cdFx0XHR3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1xuXHRcdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdFx0dG9wOiAwOyBsZWZ0OiAwO1xuXHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblxuXHRcdFx0Ji5kaXNhYmxlIHtcblx0XHRcdFx0b3ZlcmZsb3cteTogaGlkZGVuO1xuXHRcdFx0fVxuXG5cdFx0XHQmLnNjcm9sbGFibGUge1xuXHRcdFx0XHRvdmVyZmxvdy15OiBhdXRvO1xuXHRcdFx0fVxuXG5cdFx0XHQmLmhpZGRlbiB7XG5cdFx0XHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblxuXG5cdC8v4pSQXG5cdC8v4pSCICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0Ly/ilaDilIDilIDilKQgIElNUE9SVFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxuXHQvL+KUgiAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG5cdC8v4pSYXG5cblx0XHRAaW1wb3J0IFwiLi9tb2R1bGUvbmF2LmJ1dHRvbnMubGVzc1wiO1xuXHRcdEBpbXBvcnQgXCIuL21vZHVsZS9uYXYubGVzc1wiO1xuXG5cblxuIiwiXG5cblx0XG5cdC8v4pSQXG5cdC8v4pSCICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0Ly/ilaDilIDilIDilKQgIE5BViBCVVRUT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxuXHQvL+KUgiAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG5cdC8v4pSYXG5cblx0XHQubmF2IC5idXR0b24ge1xuXHRcdFx0d2lkdGg6IDMuMnJlbTsgaGVpZ2h0OiAzLjJyZW07XG5cdFx0XHRjdXJzb3I6IHBvaW50ZXI7XG5cblx0XHRcdHN2ZyB7XG5cdFx0XHRcdFxuXHRcdFx0XHRwYXRoIHsgZmlsbDogbm9uZTsgfSBcblx0XHRcdFx0LmZpbGxlZCB7IGZpbGw6ICMyMzI0Mjg7IH1cblx0XHRcdH1cblxuXHRcdFx0Jjpob3ZlciB7XG5cdFx0XHRcdHN2ZyB7XG5cdFx0XHRcdFx0LmZpbGxlZCB7IGZpbGw6ICNmOWU1OGQ7IH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXG5cbiIsIlxuXG5cdFxuXHQvL+KUkFxuXHQvL+KUgiAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG5cdC8v4pWg4pSA4pSA4pSkICBOQVYgQlVUVE9OICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcblx0Ly/ilIIgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHQvL+KUmFxuXG5cdFx0Lm5hdiAuYnV0dG9uIHtcblx0XHRcdHdpZHRoOiAzLjJyZW07IGhlaWdodDogMy4ycmVtO1xuXHRcdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHRcdFx0dGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcblx0XHRcdGZvbnQtc2l6ZTogMC43NWVtO1xuXHRcdFx0dGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG5cdFx0XHRsaW5lLWhlaWdodDogMmVtO1xuXHRcdFx0Zm9udC13ZWlnaHQ6IDcwMDtcblx0XHRcdGNvbG9yOiAjMjMyNDI4O1xuXG5cdFx0XHRzdmcge1xuXHRcdFx0XHRcblx0XHRcdFx0cGF0aCB7IGZpbGw6IG5vbmU7IH0gXG5cdFx0XHRcdC5maWxsZWQgeyBmaWxsOiAjMjMyNDI4OyB9XG5cdFx0XHR9XG5cblx0XHRcdCY6aG92ZXIge1xuXHRcdFx0XHRzdmcge1xuXHRcdFx0XHRcdC5maWxsZWQgeyBmaWxsOiAjZjllNThkOyB9XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29sb3I6ICNmOWU1OGQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblxuXHQvL+KUkFxuXHQvL+KUgiAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG5cdC8v4pWg4pSA4pSA4pSkICBOQVYgQkFDSyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcblx0Ly/ilIIgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHQvL+KUmFxuXG5cdFx0Lm5hdiAuYmFjayB7XG5cblx0XHRcdHdpZHRoOiAxMy40cmVtOyBoZWlnaHQ6IDEzLjRyZW07XG5cdFx0XHRwb3NpdGlvbjogZml4ZWQ7XG5cdFx0XHR0b3A6IDA7IGxlZnQ6IDA7XG5cblx0XHRcdC53cmFwcGVyLCAuYnV0dG9uID4gc3BhbiB7XG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG5cdFx0XHRcdHRvcDogNTAlOyBsZWZ0OiA1MCU7XG5cdFx0XHR9XG5cblx0XHRcdCYuaGlkZGVuIHtcblx0XHRcdFx0ZGlzcGxheTogbm9uZTtcblx0XHRcdH1cblx0XHR9XG5cblxuXG5cdC8v4pSQXG5cdC8v4pSCICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0Ly/ilaDilIDilIDilKQgIE5BViBQTFVTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxuXHQvL+KUgiAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG5cdC8v4pSYXG5cblx0XHQubmF2IC5wbHVzIHtcblxuXHRcdFx0d2lkdGg6IDEzLjRyZW07IGhlaWdodDogMTMuNHJlbTtcblx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHRcdHRvcDogMDsgbGVmdDogMDtcblxuXHRcdFx0LndyYXBwZXIge1xuXHRcdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0XHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuXHRcdFx0XHR0b3A6IDUwJTsgbGVmdDogNTAlO1xuXHRcdFx0fVxuXG5cdFx0XHQmLmhpZGRlbiB7XG5cdFx0XHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cblxuXHQvL+KUkFxuXHQvL+KUgiAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG5cdC8v4pWg4pSA4pSA4pSkICBOQVYgQ09WRVJTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcblx0Ly/ilIIgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHQvL+KUmFxuXG5cdFx0Lm5hdiAuY292ZXJzIHtcblxuXHRcdFx0d2lkdGg6IDEzLjRyZW07IGhlaWdodDogMTMuNHJlbTtcblx0XHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHRcdHRvcDogNTAlOyBsZWZ0OiAwO1xuXHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuXG5cdFx0XHQud3JhcHBlciB7XG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG5cdFx0XHRcdHRvcDogNTAlOyBsZWZ0OiA1MCU7XG5cdFx0XHR9XG5cblx0XHRcdCYuaGlkZGVuIHtcblx0XHRcdFx0ZGlzcGxheTogbm9uZTtcblx0XHRcdH1cblx0XHR9XG5cblxuXG5cdC8v4pSQXG5cdC8v4pSCICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0Ly/ilaDilIDilIDilKQgIE5BViBTT0NJQUwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxuXHQvL+KUgiAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG5cdC8v4pSYXG5cblx0XHQubmF2IC5zb2NpYWwge1xuXG5cdFx0XHR3aWR0aDogMTMuNHJlbTsgaGVpZ2h0OiAxOC4ycmVtO1xuXHRcdFx0cG9zaXRpb246IGZpeGVkO1xuXHRcdFx0Ym90dG9tOiAwOyBsZWZ0OiAwO1xuXG5cdFx0XHQud3JhcHBlciB7XG5cdFx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG5cdFx0XHRcdHRvcDogNTAlOyBsZWZ0OiA1MCU7XG5cdFx0XHR9XG5cblx0XHRcdC5idXR0b246Zmlyc3QtY2hpbGQge1xuXHRcdFx0XHRtYXJnaW4tYm90dG9tOiAxLjZyZW07XG5cdFx0XHR9XG5cblx0XHRcdCYuaGlkZGVuIHtcblx0XHRcdFx0ZGlzcGxheTogbm9uZTtcblx0XHRcdH1cblx0XHR9XG5cblxuXG4iXSwiZmlsZSI6ImFwcC5jc3MiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ== */\n", ""]);
	
	// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDRiZGY1ZjMzODI3MDc4ZTZlMjMiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9jb250cm9sbGVyL0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkJhY2tib25lXCIiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlci9Sb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlci9Ccm9hZGNhc3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9jb250cm9sbGVyL0Jyb2FkY2FzdGVyRXZlbnRzLmpzIiwid2VicGFjazovLy8uL3ZpZXcvUm9vdFZpZXcuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiV2ViRm9udFwiIiwid2VicGFjazovLy8uL3ZpZXcvUHJlbG9hZGVyVmlldy5qcyIsIndlYnBhY2s6Ly8vLi4vdGVtcC9hcHAuY3NzP2VkNTkiLCJ3ZWJwYWNrOi8vLy4uL3RlbXAvYXBwLmNzcyIsIndlYnBhY2s6Ly8vL1VzZXJzL21hY21hYy9TcGFjZS9naXRodWIvZG9jLWF4dXJlLXRvb2xraXQvfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL21hY21hYy9TcGFjZS9naXRodWIvZG9jLWF4dXJlLXRvb2xraXQvfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDbkNBOztBQUVBLDRDOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUMvREE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzREFBcUQsUUFBUTs7OztBQUk3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7O0FBRUo7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSzs7QUFFQSxnQ0FBK0I7QUFDL0I7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDOUhBLG9COzs7Ozs7QUNBQSwyQjs7Ozs7Ozs7O0FDR0E7O0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsa0JBQWtCO0FBQzlDO0FBQ0EsSUFBRzs7OztBQUlIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7O0FBRUE7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0RBQXFEOzs7O0FBSXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBOzs7O0FBSUE7Ozs7Ozs7Ozs7Ozs7QUMzQ0E7O0FBRUE7OztBQUdBOztBQUVBOzs7QUFHQTs7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBLGNBQWEsd0ZBQXdGO0FBQ3JHO0FBQ0EsS0FBSTs7O0FBR0o7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGVBQWM7OztBQUdkOztBQUVBO0FBQ0EsOEJBQTZCLFlBQVk7QUFDekM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckdBLDBCOzs7Ozs7Ozs7QUNHQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOzs7O0FBSUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLEtBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNuSUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxpQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEU7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLGlDQUFnQyxvQkFBb0IsbUJBQW1CLEdBQUcsY0FBYyxvQkFBb0IsR0FBRyxXQUFXLGdCQUFnQixpQkFBaUIsdUJBQXVCLEdBQUcsVUFBVSxnQkFBZ0IsaUJBQWlCLHVCQUF1QixXQUFXLFlBQVkscUJBQXFCLEdBQUcsa0JBQWtCLHVCQUF1QixHQUFHLHFCQUFxQixxQkFBcUIsR0FBRyxpQkFBaUIsa0JBQWtCLEdBQUcsZ0JBQWdCLGtCQUFrQixtQkFBbUIsb0JBQW9CLEdBQUcseUJBQXlCLGVBQWUsR0FBRyw0QkFBNEIsa0JBQWtCLEdBQUcsa0NBQWtDLGtCQUFrQixHQUFHLGdCQUFnQixrQkFBa0IsbUJBQW1CLG9CQUFvQiw4QkFBOEIsc0JBQXNCLCtCQUErQixxQkFBcUIscUJBQXFCLG1CQUFtQixHQUFHLHlCQUF5QixlQUFlLEdBQUcsNEJBQTRCLGtCQUFrQixHQUFHLHNCQUFzQixtQkFBbUIsR0FBRyxrQ0FBa0Msa0JBQWtCLEdBQUcsY0FBYyxtQkFBbUIsb0JBQW9CLG9CQUFvQixXQUFXLFlBQVksR0FBRyxtREFBbUQsdUJBQXVCLHFDQUFxQyxhQUFhLGNBQWMsR0FBRyxxQkFBcUIsa0JBQWtCLEdBQUcsY0FBYyxtQkFBbUIsb0JBQW9CLG9CQUFvQixXQUFXLFlBQVksR0FBRyx1QkFBdUIsdUJBQXVCLHFDQUFxQyxhQUFhLGNBQWMsR0FBRyxxQkFBcUIsa0JBQWtCLEdBQUcsZ0JBQWdCLG1CQUFtQixvQkFBb0Isb0JBQW9CLGFBQWEsWUFBWSxnQ0FBZ0MsR0FBRyx5QkFBeUIsdUJBQXVCLHFDQUFxQyxhQUFhLGNBQWMsR0FBRyx1QkFBdUIsa0JBQWtCLEdBQUcsZ0JBQWdCLG1CQUFtQixvQkFBb0Isb0JBQW9CLGNBQWMsWUFBWSxHQUFHLHlCQUF5Qix1QkFBdUIscUNBQXFDLGFBQWEsY0FBYyxHQUFHLG9DQUFvQywwQkFBMEIsR0FBRyx1QkFBdUIsa0JBQWtCLEdBQUcsK0NBQStDOztBQUVwdEU7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQSx5Q0FBd0MsZ0JBQWdCO0FBQ3hELEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSxvQkFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0Isc0JBQXNCO0FBQ3RDO0FBQ0E7QUFDQSxtQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFlLG1CQUFtQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQiwyQkFBMkI7QUFDNUM7QUFDQTtBQUNBLFNBQVEsdUJBQXVCO0FBQy9CO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxrQkFBaUIsdUJBQXVCO0FBQ3hDO0FBQ0E7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0EsaUNBQWdDLHNCQUFzQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXVEO0FBQ3ZEOztBQUVBLDhCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDRiZGY1ZjMzODI3MDc4ZTZlMjMiLCJcblxuXG5cdC8vIFJFUVVJUkUgQ09NUE9ORU5UXG5cblx0Y29uc3RcdENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2NvbnRyb2xsZXIvQ29udHJvbGxlcicpO1x0XG5cblxuXG4vKlxuIOKVlOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVl1xuIOKVkSAgICAgICBfICAgICAgICAgICAgICAgICAgX19fXyAgICAgICAgICAgIF8gICAgICAgXyAgICAgICAgICAgICAg4pWRXG4g4pWRICAgICAgfCB8IF9fIF9fXyAgIF9fX18gXy8gX19ffCAgX19fIF8gX18oXylfIF9fIHwgfF8gICAgICAgICAgICDilZFcbiDilZEgICBfICB8IHwvIF9gIFxcIFxcIC8gLyBfYCBcXF9fXyBcXCAvIF9ffCAnX198IHwgJ18gXFx8IF9ffCAgICAgICAgICAg4pWRXG4g4pWRICB8IHxffCB8IChffCB8XFwgViAvIChffCB8X19fKSB8IChfX3wgfCAgfCB8IHxfKSB8IHxfICAgICAgICAgICAg4pWRXG4g4pWRICAgXFxfX18vIFxcX18sX3wgXFxfLyBcXF9fLF98X19fXy8gXFxfX198X3wgIHxffCAuX18vIFxcX198ICAgICAgICAgICDilZFcbiDilZEgICAgICBfICAgICAgICAgICAgICAgICAgICAgICAgICAgX19fX18gICAgfF98ICAgIF8gXyAgICBfIF8gICAgIOKVkVxuIOKVkSAgICAgLyBcXCAgIF9fICBfX18gICBfIF8gX18gX19fICB8XyAgIF98X18gICBfX18gfCB8IHwgXyhfKSB8XyAgIOKVkVxuIOKVkSAgICAvIF8gXFwgIFxcIFxcLyAvIHwgfCB8ICdfXy8gXyBcXCAgIHwgfC8gXyBcXCAvIF8gXFx8IHwgfC8gLyB8IF9ffCAg4pWRXG4g4pWRICAgLyBfX18gXFwgID4gIDx8IHxffCB8IHwgfCAgX18vICAgfCB8IChfKSB8IChfKSB8IHwgICA8fCB8IHxfICAg4pWRXG4g4pWRICAvXy8gICBcXF9cXC9fL1xcX1xcXFxfXyxffF98ICBcXF9fX3wgICB8X3xcXF9fXy8gXFxfX18vfF98X3xcXF9cXF98XFxfX3wgIOKVkVxuIOKVkSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRXG4g4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWdXG4qL1xuXG5cblx0XHQvLyBQUklWQVRFIFNUQVRJQyBWQVJTXG5cdFx0XG5cdFx0dmFyXHRfYyA9IG51bGw7XG5cdFx0XG5cblxuXHQvL+KUkFxuXHQvL+KUgiAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG5cdC8v4pWg4pSA4pSA4pSkICBFTlRSWSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcblx0Ly/ilIIgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHQvL+KUmFxuXG5cdFx0Y29uc3QgTWFpbiA9IGZ1bmN0aW9uICgpIFxuXHRcdHtcblx0XHRcdF9jID0gbmV3IENvbnRyb2xsZXIoKTtcblx0XHR9O1xuXG5cblxuXHQvL+KUkFxuXHQvL+KUgiAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG5cdC8v4pWg4pSA4pSA4pSkICBQVUJMSUMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcblx0Ly/ilIIgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHQvL+KUmFxuXG5cdFx0TWFpbi5wcm90b3R5cGUgPSBcblx0XHR7XG5cdFx0XHR0aXRsZTogJ0F4dXJlIEphdmFTY3JpcHQgVG9vbGtpdCcsXG5cdFx0XHRkZXNjcmlwdGlvbjogJ9Cd0LDQsdC+0YAg0LjQvdGB0YLRgNGD0LzQtdC90YLQvtCyINC00LvRjyDRgNCw0YHRiNC40YDQtdC90LjRjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC10Lkg0L/RgNC+0YLQvtGC0LjQv9C+0LIgQXh1cmUgUlAgOCDRgSDQv9C+0LzQvtGJ0YzRjiDQv9GA0L7RgdGC0YvRhSBKYXZhU2NyaXB0INGB0YbQtdC90LDRgNC40LXQsi4nLFxuXHRcdFx0dmVyc2lvbjogJzIuMC41J1xuXHRcdH07XG5cblxuXG5cdC8v4pSQXG5cdC8v4pSCICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0Ly/ilaDilIDilIDilKQgIElOU1RBTkNFIEVYUE9SVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxuXHQvL+KUgiAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG5cdC8v4pSYXG5cblx0XHR3aW5kb3cuYXBwWydpbnN0YW5jZSddID0gbmV3IE1haW4oKTtcblxuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbWFpbi5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcblxuXG5cdC8vIFJFUVVJUkUgVEhJUkQtUEFSVFkgTElCUkFSWVxuXG5cdGNvbnN0XHRfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuXHRcdFx0QmFja2JvbmUgPSByZXF1aXJlKCdiYWNrYm9uZScpO1xuXG5cblx0Ly8gUkVRVUlSRSBDT01QT05FTlRcblxuXHRjb25zdFx0Um91dGVyID0gcmVxdWlyZSgnLi9Sb3V0ZXInKTtcblxuXG5cdC8vIFJFUVVJUkUgSU5TVEFOQ0VcblxuXHRjb25zdFx0X2Jyb2FkY2FzdGVyID0gcmVxdWlyZSgnLi9Ccm9hZGNhc3RlcicpLFxuXHRcdFx0X2V2ZW50ID0gcmVxdWlyZSgnLi9Ccm9hZGNhc3RlckV2ZW50cycpLFxuXHRcdFx0X3Jvb3QgPSByZXF1aXJlKCcuLi92aWV3L1Jvb3RWaWV3Jyk7XG5cblxuXG5cbi8v4pSQXG4vL+KUgiAg4pWU4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWXXG4vL+KUgiAg4pWRICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRXG4vL+KVoOKUgOKUgOKVoiAgQVBQIENPTlRST0xMRVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkVxuLy/ilIIgIOKVkSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkVxuLy/ilIIgIOKVmuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVnVxuLy/ilJhcblxuXG5cdC8vIFBSSVZBVEUgU1RBVElDIFZBUlNcblx0XHRcblx0XHR2YXIgX3JvdXRlciwgX2NvbnRleHQsIF9jb250ZXh0TGlzdDtcblx0XHRcblxuXG5cdC8v4pSQXG5cdC8v4pSCICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0Ly/ilaDilIDilIDilKQgIEVOVFJZICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxuXHQvL+KUgiAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG5cdC8v4pSYXG5cblx0XHRjb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24gKCkgXG5cdFx0e1xuXHRcdFx0X2NvbnRleHQgPSB7XG5cdFx0XHRcdGxvY2tlZDogZmFsc2UsXHQvLyDQsdC70L7QutC40YDQvtCy0LrQsCDRgtC10LrRg9GJ0LXQs9C+INC60L7QvdGC0LXQutGB0YLQsCAo0L/QtdGA0LXRhdC+0LQv0LfQsNCz0YDRg9C30LrQsClcblx0XHRcdFx0Y3VycmVudDogbnVsbCxcdC8vINGB0YHRi9C70LrQsCDQvdCwINGC0LXQutGD0YnQuNC5INC60L7QvdGC0LXQutGB0YJcblx0XHRcdFx0bmV4dDogbnVsbCxcdFx0Ly8g0YHRgdGL0LvQutCwINC90LAg0LLRi9C30YvQstCw0LXQvNGL0Lkg0LrQvtC90YLQtdC60YHRglxuXHRcdFx0XHRxdWVyeTogbnVsbCxcdC8vINC/0LDRgNCw0LzQtdGC0YDRiyDQt9Cw0L/RgNC+0YHQsCAoVVJMKVxuXHRcdFx0XHRjYWNoZTogbnVsbFx0XHQvLyDQutC10Ygg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuCDQt9Cw0L/RgNC+0YHQsFxuXHRcdFx0fTtcblxuXHRcdFx0X3JvdXRlciA9IG5ldyBSb3V0ZXIoeyByb3V0ZXM6IHtcblx0XHRcdFx0JygvKSc6XHRcdFx0XHRcdFx0XHRcdCdob21lJyxcblx0XHRcdFx0J2hvbWUoLyknOlx0XHRcdFx0XHRcdFx0J2hvbWUnLFxuXHRcdFx0XHQnYWx0aXR1ZGUvOmFsdGl0dWRlSUQoLyknOlx0XHRcdCd3YWxsJyxcblx0XHRcdFx0J2FsdGl0dWRlLzphbHRpdHVkZUlELzpjYXNlSUQoLyknOlx0J2Nhc2UnLFxuXHRcdFx0XHQnKmVycm9yJzpcdFx0XHRcdFx0XHRcdCdlcnJvcidcblx0XHRcdH19KTtcblx0XHRcdFxuXHRcdFx0X3JvdXRlci5vbigncm91dGUnLCBfY2hhbmdlLCB0aGlzKTtcblx0XHRcdF9yb3V0ZXIuc3RhcnQoKTtcblx0XHR9O1xuXG5cblxuXHQvL+KUkFxuXHQvL+KUgiAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG5cdC8v4pWg4pSA4pSA4pSkICBQVUJMSUMgTUVUSE9EUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcblx0Ly/ilIIgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHQvL+KUmFxuXG5cdFx0Ly9fLmV4dGVuZChDb250cm9sbGVyLnByb3RvdHlwZSwgQmFja2JvbmUuRXZlbnRzLCB7LyouLi4qL30pO1xuXG5cblxuXHQvL+KUkFxuXHQvL+KUgiAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG5cdC8v4pWg4pSA4pSA4pSkICBQUklWQVRFIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcblx0Ly/ilIIgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHQvL+KUmFxuXG5cdFx0XG5cdFx0Ly8gU0VDVElPTiAxXG5cdFx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRjb25zdCBfY2hhbmdlID0gZnVuY3Rpb24gKHRvKVxuXHRcdHtcblx0XHRcdHZhciBhcmcgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpWzBdLFxuXHRcdFx0XHRwcm9wcyA9IFtdLFxuXHRcdFx0XHRxdWVyeSwgZnJvbTtcblx0XHRcdFxuXHRcdFx0Xy5lYWNoKGFyZywgZnVuY3Rpb24gKGl0ZW0sIGluZGV4LCBmKSB7XG5cdFx0XHRcdCEoXy5pc051bGwoaXRlbSkgfHwgXy5pc1VuZGVmaW5lZChpdGVtKSkgJiYgcHJvcHMucHVzaChpdGVtKTtcblx0XHRcdH0sIHRoaXMpO1xuXG5cdFx0XHRjb25zb2xlLmxvZyh0bywgcHJvcHMpO1xuXHRcdFx0XG5cdFx0XHQvKmZyb20gPSAoX2NvbnRleHQuY3VycmVudCAhPT0gbnVsbCkgPyBfY29udGV4dC5jdXJyZW50LmlkIDogbnVsbDtcblx0XHRcdHF1ZXJ5ID0gW2Zyb20sIHRvLCBwXTtcblxuXHRcdFx0aWYgKF8uaXNFcXVhbChxdWVyeSwgX2NvbnRleHQucXVlcnkpKSByZXR1cm47XG5cblx0XHRcdGlmICghX2NvbnRleHQubG9ja2VkKSBcblx0XHRcdHtcblx0XHRcdFx0X2NvbnRleHQuY2FjaGUgPSBudWxsO1xuXHRcdFx0XHRfY29udGV4dC5sb2NrZWQgPSB0cnVlO1xuXHRcdFx0XHRfY29udGV4dC5xdWVyeSA9IHF1ZXJ5O1xuXHRcdFx0XHRfY29udGV4dC5uZXh0ID0gX2NvbnRleHRMaXN0W3RvXTtcblx0XHRcdFx0X2Jyb2FkY2FzdGVyLnRyaWdnZXIoW19ldmVudC5ST1VURV9DSEFOR0VELCBfZXZlbnQuQ09OVEVYVF9MT0NLXS5qb2luKCcgJyksIHF1ZXJ5KTtcblx0XHRcdFx0Xy5zZXJpZXMoX2dldFF1ZXVlKCkpO1xuXHRcdFx0fSBcblxuXHRcdFx0ZWxzZSBfY29udGV4dC5jYWNoZSA9IHF1ZXJ5OyovXG5cdFx0fTtcblxuXG5cblx0Ly/ilJBcblx0Ly/ilIIgIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuXHQvL+KVoOKUgOKUgOKUpCAgTU9EVUxFIEVYUE9SVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG5cdC8v4pSCICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcblx0Ly/ilJhcblxuXHRcdG1vZHVsZS5leHBvcnRzID0gQ29udHJvbGxlcjtcblxuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29udHJvbGxlci9Db250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIl9cIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IEJhY2tib25lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiQmFja2JvbmVcIlxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcblxuXG5cdC8vIFJFUVVJUkUgVEhJUkQtUEFSVFkgTElCUkFSWVxuXG5cdGNvbnN0XHRCYWNrYm9uZVJvdXRlciA9IHJlcXVpcmUoJ2JhY2tib25lJykuUm91dGVyO1xuXG5cblxuXG4vL+KUkFxuLy/ilIIgIOKVlOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVl1xuLy/ilIIgIOKVkSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkVxuLy/ilaDilIDilIDilaIgIEFQUCBST1VURVIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZFcbi8v4pSCICDilZEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZFcbi8v4pSCICDilZrilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZ1cbi8v4pSYXG5cblxuXHQvL+KUkFxuXHQvL+KUgiAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG5cdC8v4pWg4pSA4pSA4pSkICBFTlRSWSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcblx0Ly/ilIIgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHQvL+KUmFxuXG5cdFx0Y29uc3QgUm91dGVyID0gQmFja2JvbmVSb3V0ZXIuZXh0ZW5kKFxuXHRcdHtcblx0XHRcdHN0YXJ0OiBmdW5jdGlvbiAoKVxuXHRcdFx0e1xuXHRcdFx0XHRCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KHsgcHVzaFN0YXRlOiB0cnVlIH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdFxuXG5cblx0Ly/ilJBcblx0Ly/ilIIgIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuXHQvL+KVoOKUgOKUgOKUpCAgTU9EVUxFIEVYUE9SVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG5cdC8v4pSCICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcblx0Ly/ilJhcblxuXHRcdG1vZHVsZS5leHBvcnRzID0gUm91dGVyO1xuXG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb250cm9sbGVyL1JvdXRlci5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcblxuXG5cdC8vIFJFUVVJUkUgVEhJUkQtUEFSVFkgTElCUkFSWVxuXG5cdGNvbnN0XHRfID0gcmVxdWlyZSgndW5kZXJzY29yZScpLFxuXHRcdFx0QmFja2JvbmUgPSByZXF1aXJlKCdiYWNrYm9uZScpO1xuXG5cblxuXG4vL+KUkFxuLy/ilIIgIOKVlOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVl1xuLy/ilIIgIOKVkSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkVxuLy/ilaDilIDilIDilaIgIEFQUCBCUk9BRENBU1RFUiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZFcbi8v4pSCICDilZEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZFcbi8v4pSCICDilZrilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZ1cbi8v4pSYXG5cblxuXHQvL+KUkFxuXHQvL+KUgiAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG5cdC8v4pWg4pSA4pSA4pSkICBFTlRSWSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcblx0Ly/ilIIgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHQvL+KUmFxuXG5cdFx0Y29uc3QgQnJvYWRjYXN0ZXIgPSBmdW5jdGlvbiAoKSB7fTtcblxuXG5cblx0Ly/ilJBcblx0Ly/ilIIgIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuXHQvL+KVoOKUgOKUgOKUpCAgUFVCTElDIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG5cdC8v4pSCICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcblx0Ly/ilJhcblxuXHRcdF8uZXh0ZW5kKEJyb2FkY2FzdGVyLnByb3RvdHlwZSwgQmFja2JvbmUuRXZlbnRzLCB7fSk7XG5cblxuXG5cdC8v4pSQXG5cdC8v4pSCICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0Ly/ilaDilIDilIDilKQgIEVYUE9SVCBJTlNUQU5DRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxuXHQvL+KUgiAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG5cdC8v4pSYXG5cblx0XHRtb2R1bGUuZXhwb3J0cyA9IG5ldyBCcm9hZGNhc3RlcigpO1xuXG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb250cm9sbGVyL0Jyb2FkY2FzdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuXG5cbi8v4pSQXG4vL+KUgiAg4pWU4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWXXG4vL+KUgiAg4pWRICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRXG4vL+KVoOKUgOKUgOKVoiAgQlJPQURDQVNURVIgRVZFTlRTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkVxuLy/ilIIgIOKVkSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkVxuLy/ilIIgIOKVmuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVnVxuLy/ilJhcblxuXG5cdC8v4pSQXG5cdC8v4pSCICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0Ly/ilaDilIDilIDilKQgIEVYUE9SVCBJTlNUQU5DRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxuXHQvL+KUgiAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG5cdC8v4pSYXG5cblx0XHRtb2R1bGUuZXhwb3J0cyA9IFxuXHRcdHtcblxuXHRcdFx0Ly8gQ09OVFJPTExFUiBFVkVOVFNcblx0XHRcdFxuXHRcdFx0Ly9HT1RPOlx0XHRcdFx0XHRcdCdyb3V0ZXI6Z290bycsXG5cdFx0XHRST1VURV9DSEFOR0VEOlx0XHRcdFx0J3JvdXRlOmNoYW5nZWQnLFxuXHRcdFx0XG5cdFx0XHRDT05URVhUX0xPQ0s6XHRcdFx0XHQnY29udGV4dDpsb2NrJyxcblx0XHRcdENPTlRFWFRfVU5MT0NLOlx0XHRcdFx0J2NvbnRleHQ6dW5sb2NrJyxcblx0XHRcdENPTlRFWFRfVVBEQVRFOlx0XHRcdFx0J2NvbnRleHQ6dXBkYXRlJyxcblx0XHRcdENPTlRFWFRfREVBQ1RJVkFURTpcdFx0XHQnY29udGV4dDpkZWFjdGl2ZXRlJyxcblx0XHRcdENPTlRFWFRfQ0hBTkdFRDpcdFx0XHQnY29udGV4dDpjaGFuZ2VkJyxcblx0XHRcdENPTlRFWFRfQUNUSVZBVEU6XHRcdFx0J2NvbnRleHQ6YWN0aXZldGUnLFxuXHRcdFx0Q09OVEVYVF9SRUFEWTpcdFx0XHRcdCdjb250ZXh0OnJlYWR5JyxcblxuXHRcdFx0XG5cdFx0XHQvLyBQUkVMT0FERVIgRVZFTlRTXG5cdFx0XHRcblx0XHRcdFBSRUxPQURFUl9TSE9XOiBcdFx0XHQncHJlbG9hZGVyOnNob3cnLFxuXHRcdFx0UFJFTE9BREVSX0hJREU6IFx0XHRcdCdwcmVsb2FkZXI6aGlkZScsXG5cdFx0XHRQUkVMT0FERVJfQ09NUExFVEU6IFx0XHQncHJlbG9hZGVyOmNvbXBsZXRlJ1xuXG5cblx0XHRcdC8vIFdBTEwgRVZFTlRTXG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0XG5cdFx0fTtcblxuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29udHJvbGxlci9Ccm9hZGNhc3RlckV2ZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcdFx0XHRcblxuXG5cdC8vIFJFUVVJUkUgVEhJUkQtUEFSVFkgTElCUkFSWVxuXG5cdGNvbnN0XHR3ZWJmb250ID0gcmVxdWlyZSgnd2ViZm9udCcpO1xuXG5cblx0Ly8gUkVRVUlSRSBDT01QT05FTlRcblxuXHQvL2NvbnN0XHROYXZWaWV3ID0gcmVxdWlyZSgnLi9OYXZWaWV3Jyk7XG5cblxuXHQvLyBSRVFVSVJFIElOU1RBTkNFXG5cblx0Y29uc3RcdF9wcmVsb2FkZXIgPSByZXF1aXJlKCcuL1ByZWxvYWRlclZpZXcnKTtcblxuXG5cblxuLy/ilJBcbi8v4pSCICDilZTilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZdcbi8v4pSCICDilZEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZFcbi8v4pWg4pSA4pSA4pWiICBST09UIFZJRVcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRXG4vL+KUgiAg4pWRICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRXG4vL+KUgiAg4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWdXG4vL+KUmFxuXG5cblx0Ly/ilJBcblx0Ly/ilIIgIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuXHQvL+KVoOKUgOKUgOKUpCAgRU5UUlkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG5cdC8v4pSCICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcblx0Ly/ilJhcblxuXHRcdHZhciBSb290VmlldyA9IGZ1bmN0aW9uICgpIFxuXHRcdHtcblxuXHRcdFx0Ly8gU1RZTEVTXG5cdFxuXHRcdFx0cmVxdWlyZSgnLi4vLi4vdGVtcC9hcHAuY3NzJyk7XG5cdFx0XHRcblxuXHRcdFx0Ly8gV0VCRk9OVFNcblxuXHRcdFx0d2ViZm9udC5sb2FkKHtcblx0XHRcdFx0Z29vZ2xlOiB7IGZhbWlsaWVzOiBbJ1JvYm90byBNb25vOjEwMCwxMDBpLDMwMCwzMDBpLDQwMCw0MDBpLDUwMCw1MDBpLDcwMCw3MDBpOmxhdGluLGN5cmlsbGljJ10gfSxcblx0XHRcdFx0Y2xhc3NlczogZmFsc2UsIGV2ZW50czogZmFsc2Vcblx0XHRcdH0pO1xuXHRcdFx0XG5cblx0XHRcdC8vIENPTlRBSU5FUlNcblx0XHRcdFxuXHRcdFx0dmFyIGFwcEVsLCBuYXZFbCwgbGF5b3V0RWwsIGZyYWdtZW50RWw7XG5cblx0XHRcdG5hdkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdG5hdkVsLmNsYXNzTmFtZSA9ICduYXYnO1xuXG5cdFx0XHRsYXlvdXRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRsYXlvdXRFbC5jbGFzc05hbWUgPSAnbGF5b3V0JztcblxuXHRcdFx0ZnJhZ21lbnRFbCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblx0XHRcdGZyYWdtZW50RWwuYXBwZW5kQ2hpbGQobGF5b3V0RWwpO1xuXHRcdFx0ZnJhZ21lbnRFbC5hcHBlbmRDaGlsZChuYXZFbCk7XG5cblx0XHRcdGFwcEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBwJylbMF07XG5cdFx0XHRhcHBFbC5pbnNlcnRCZWZvcmUoZnJhZ21lbnRFbCwgYXBwRWwuZmlyc3RDaGlsZCk7XG5cblx0XHRcdHRoaXMuZWwgPSB7IGFwcDogYXBwRWwsIG5hdjogbmF2RWwsIGxheW91dDogbGF5b3V0RWwgfTtcblxuXG5cdFx0XHQvLyBDT01QT05FTlRTXG5cblx0XHRcdC8vdGhpcy5wcmVsb2FkZXIgPSBuZXcgUHJlbG9hZGVyVmlldygpO1xuXHRcdFx0Ly90aGlzLm5hdiA9IG5ldyBOYXZWaWV3KHsgZWw6IG5hdkVsIH0pO1xuXHRcdFx0Ly93aW5kb3cuYXBwLmluc3RhbmNlWydyb290J10gPSB0aGlzXG5cblx0XHRcdC8qZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25Eb3duLCBmYWxzZSk7XG5cblx0XHRcdGZ1bmN0aW9uIG9uRG93bihlKSB7XG5cdFx0XHRcdHZhciBrZXlDb2RlID0gZS5rZXlDb2RlO1xuXHRcdFx0XHRcdGlmIChrZXlDb2RlPT00OSkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJZb3UgaGl0IHRoZSBlbnRlciBrZXkuXCIsIF9wcmVsb2FkZXIpO1xuXHRcdFx0XHRcdFx0X2Jyb2FkY2FzdGVyLnRyaWdnZXIoX2V2ZW50LlBSRUxPQURFUl9TSE9XKTtcblx0XHRcdFx0XHR9IFxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmIChrZXlDb2RlPT01MCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJPaCBubyB5b3UgZGlkbid0LlwiLCBfcHJlbG9hZGVyKTtcblx0XHRcdFx0XHRcdF9icm9hZGNhc3Rlci50cmlnZ2VyKF9ldmVudC5QUkVMT0FERVJfSElERSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0fSovXG5cdFx0fTtcblxuXG5cblx0Ly/ilJBcblx0Ly/ilIIgIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuXHQvL+KVoOKUgOKUgOKUpCAgSU5TVEFOQ0UgRVhQT1JUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG5cdC8v4pSCICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcblx0Ly/ilJhcblxuXHRcdG1vZHVsZS5leHBvcnRzID0gbmV3IFJvb3RWaWV3KCk7XG5cblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3ZpZXcvUm9vdFZpZXcuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBXZWJGb250O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiV2ViRm9udFwiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuXG5cblx0Ly8gUkVRVUlSRSBUSElSRC1QQVJUWSBMSUJSQVJZXG5cblx0Y29uc3RcdF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyksXG5cdFx0XHRCYWNrYm9uZSA9IHJlcXVpcmUoJ2JhY2tib25lJyk7XG5cblxuXHQvLyBSRVFVSVJFIElOU1RBTkNFXG5cblx0Y29uc3RcdF9icm9hZGNhc3RlciA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXIvQnJvYWRjYXN0ZXInKSxcblx0XHRcdF9ldmVudCA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXIvQnJvYWRjYXN0ZXJFdmVudHMnKTtcblxuXG5cblxuLy/ilJBcbi8v4pSCICDilZTilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZdcbi8v4pSCICDilZEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZFcbi8v4pWg4pSA4pSA4pWiICBQUkVMT0FERVIgVklFVyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRXG4vL+KUgiAg4pWRICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRXG4vL+KUgiAg4pWa4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWdXG4vL+KUmFxuXG5cblx0XHQvLyBQUklWQVRFIFNUQVRJQyBWQVJTXG5cdFx0XG5cdFx0dmFyXHRfZWwsIF9naWYsIF9zcmMsIF9oaWRkZW4gPSBmYWxzZSwgX2FjdGl2ZSA9IHRydWU7XG5cblxuXG5cdC8v4pSQXG5cdC8v4pSCICDilIzilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJBcblx0Ly/ilaDilIDilIDilKQgIEVOVFJZICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKUglxuXHQvL+KUgiAg4pSU4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSYXG5cdC8v4pSYXG5cblx0XHR2YXIgUHJlbG9hZGVyVmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKFxuXHRcdHtcblx0XHRcdGluaXRpYWxpemU6IGZ1bmN0aW9uICgpXG5cdFx0XHR7XG5cdFx0XHRcdF9lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwcCcpWzBdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ByZWxvYWRlcicpWzBdO1xuXHRcdFx0XHRfZ2lmID0gX2VsLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKVswXTtcblx0XHRcdFx0X3NyYyA9IF9naWYuc3JjO1xuXG5cdFx0XHRcdHRoaXMuc2V0RWxlbWVudChfZWwpO1xuXG5cdFx0XHRcdHRoaXMubGlzdGVuVG8oX2Jyb2FkY2FzdGVyLCBfZXZlbnQuUFJFTE9BREVSX1NIT1csIHRoaXMuc2hvdyk7XG5cdFx0XHRcdHRoaXMubGlzdGVuVG8oX2Jyb2FkY2FzdGVyLCBfZXZlbnQuUFJFTE9BREVSX0hJREUsIHRoaXMuaGlkZSk7XG5cdFx0XHR9LFxuXG5cdFx0XHRzaG93OiBmdW5jdGlvbiAoKVxuXHRcdFx0e1xuXHRcdFx0XHRfdHJhbnNpdGlvbkluKCk7XG5cdFx0XHR9LFxuXG5cdFx0XHRoaWRlOiBmdW5jdGlvbiAoKVxuXHRcdFx0e1xuXHRcdFx0XHRfdHJhbnNpdGlvbk91dCgpO1xuXHRcdFx0fSxcblxuXHRcdFx0aXNIaWRkZW46IGZ1bmN0aW9uICgpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBfaGlkZGVuO1xuXHRcdFx0fSxcblxuXHRcdFx0aXNBY3RpdmU6IGZ1bmN0aW9uICgpXG5cdFx0XHR7XG5cdFx0XHRcdHJldHVybiBfYWN0aXZlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblxuXHQvL+KUkFxuXHQvL+KUgiAg4pSM4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSQXG5cdC8v4pWg4pSA4pSA4pSkICBQUklWQVRFIE1FVEhPRFMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilIJcblx0Ly/ilIIgIOKUlOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUmFxuXHQvL+KUmFxuXG5cdFx0Y29uc3QgX3RyYW5zaXRpb25JbiA9IGZ1bmN0aW9uICgpXG5cdFx0e1xuXHRcdFx0aWYgKF9hY3RpdmUpIHJldHVybjtcblx0XHRcdF9hY3RpdmUgPSB0cnVlO1xuXG5cdFx0XHRfZ2lmLnNldEF0dHJpYnV0ZSgnc3JjJywgX3NyYyk7XG5cdFx0XHRfZWwuY2xhc3NOYW1lID0gJ3ByZWxvYWRlciB0cmFuc2l0aW9uLWJlZm9yZSc7XG5cblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0X2VsLmNsYXNzTmFtZSA9ICdwcmVsb2FkZXIgdHJhbnNpdGlvbi1pbic7XG5cdFx0XHRcdFx0X2dpZi5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX3RyYW5zaXRpb25JbkNvbXBsZXRlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9LCA1MCk7XG5cdFx0fTtcblxuXHRcdGNvbnN0IF90cmFuc2l0aW9uSW5Db21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudClcblx0XHR7XG5cdFx0XHRfZ2lmLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfdHJhbnNpdGlvbkluQ29tcGxldGUpO1xuXHRcdFx0X2VsLmNsYXNzTmFtZSA9ICdwcmVsb2FkZXInO1xuXHRcdFx0X2hpZGRlbiA9IGZhbHNlO1xuXHRcdFx0X2Jyb2FkY2FzdGVyLnRyaWdnZXIoX2V2ZW50LlBSRUxPQURFUl9DT01QTEVURSk7XG5cdFx0fTtcblxuXHRcdGNvbnN0IF90cmFuc2l0aW9uT3V0ID0gZnVuY3Rpb24gKClcblx0XHR7XG5cdFx0XHRpZiAoIV9hY3RpdmUpIHJldHVybjtcblx0XHRcdF9hY3RpdmUgPSBmYWxzZTtcblx0XHRcdFxuXHRcdFx0X2dpZi5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX3RyYW5zaXRpb25PdXRDb21wbGV0ZSk7XG5cdFx0XHRfZWwuY2xhc3NOYW1lID0gJ3ByZWxvYWRlciB0cmFuc2l0aW9uLW91dCc7XG5cdFx0fTtcblxuXHRcdGNvbnN0IF90cmFuc2l0aW9uT3V0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpXG5cdFx0e1xuXHRcdFx0X2dpZi5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX3RyYW5zaXRpb25PdXRDb21wbGV0ZSk7XG5cdFx0XHRfZ2lmLnNldEF0dHJpYnV0ZSgnc3JjJywgXCIjXCIpO1xuXHRcdFx0X2VsLmNsYXNzTmFtZSA9ICdwcmVsb2FkZXIgaGlkZGVuJztcblx0XHRcdF9oaWRkZW4gPSB0cnVlO1xuXHRcdFx0X2Jyb2FkY2FzdGVyLnRyaWdnZXIoX2V2ZW50LlBSRUxPQURFUl9DT01QTEVURSk7XG5cdFx0fTtcblxuXG5cblx0Ly/ilJBcblx0Ly/ilIIgIOKUjOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUkFxuXHQvL+KVoOKUgOKUgOKUpCAgTU9EVUxFIEVYUE9SVCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pSCXG5cdC8v4pSCICDilJTilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilJhcblx0Ly/ilJhcblxuXHRcdG1vZHVsZS5leHBvcnRzID0gbmV3IFByZWxvYWRlclZpZXcoKTtcblxuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdmlldy9QcmVsb2FkZXJWaWV3LmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9hcHAuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL2FwcC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3RlbXAvYXBwLmNzc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm5hdiB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiA1NTU1NTtcXG59XFxuLm5hdiA+IGRpdiB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxufVxcbi5sYXlvdXQge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5sYXllciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4ubGF5ZXIuZGlzYWJsZSB7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxufVxcbi5sYXllci5zY3JvbGxhYmxlIHtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxufVxcbi5sYXllci5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLm5hdiAuYnV0dG9uIHtcXG4gIHdpZHRoOiAzLjJyZW07XFxuICBoZWlnaHQ6IDMuMnJlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLm5hdiAuYnV0dG9uIHN2ZyBwYXRoIHtcXG4gIGZpbGw6IG5vbmU7XFxufVxcbi5uYXYgLmJ1dHRvbiBzdmcgLmZpbGxlZCB7XFxuICBmaWxsOiAjMjMyNDI4O1xcbn1cXG4ubmF2IC5idXR0b246aG92ZXIgc3ZnIC5maWxsZWQge1xcbiAgZmlsbDogI2Y5ZTU4ZDtcXG59XFxuLm5hdiAuYnV0dG9uIHtcXG4gIHdpZHRoOiAzLjJyZW07XFxuICBoZWlnaHQ6IDMuMnJlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBmb250LXNpemU6IDAuNzVlbTtcXG4gIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xcbiAgbGluZS1oZWlnaHQ6IDJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBjb2xvcjogIzIzMjQyODtcXG59XFxuLm5hdiAuYnV0dG9uIHN2ZyBwYXRoIHtcXG4gIGZpbGw6IG5vbmU7XFxufVxcbi5uYXYgLmJ1dHRvbiBzdmcgLmZpbGxlZCB7XFxuICBmaWxsOiAjMjMyNDI4O1xcbn1cXG4ubmF2IC5idXR0b246aG92ZXIge1xcbiAgY29sb3I6ICNmOWU1OGQ7XFxufVxcbi5uYXYgLmJ1dHRvbjpob3ZlciBzdmcgLmZpbGxlZCB7XFxuICBmaWxsOiAjZjllNThkO1xcbn1cXG4ubmF2IC5iYWNrIHtcXG4gIHdpZHRoOiAxMy40cmVtO1xcbiAgaGVpZ2h0OiAxMy40cmVtO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuLm5hdiAuYmFjayAud3JhcHBlcixcXG4ubmF2IC5iYWNrIC5idXR0b24gPiBzcGFuIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxufVxcbi5uYXYgLmJhY2suaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5uYXYgLnBsdXMge1xcbiAgd2lkdGg6IDEzLjRyZW07XFxuICBoZWlnaHQ6IDEzLjRyZW07XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG4ubmF2IC5wbHVzIC53cmFwcGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxufVxcbi5uYXYgLnBsdXMuaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcbi5uYXYgLmNvdmVycyB7XFxuICB3aWR0aDogMTMuNHJlbTtcXG4gIGhlaWdodDogMTMuNHJlbTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogMDtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG59XFxuLm5hdiAuY292ZXJzIC53cmFwcGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxufVxcbi5uYXYgLmNvdmVycy5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuLm5hdiAuc29jaWFsIHtcXG4gIHdpZHRoOiAxMy40cmVtO1xcbiAgaGVpZ2h0OiAxOC4ycmVtO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuLm5hdiAuc29jaWFsIC53cmFwcGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxufVxcbi5uYXYgLnNvY2lhbCAuYnV0dG9uOmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi1ib3R0b206IDEuNnJlbTtcXG59XFxuLm5hdiAuc29jaWFsLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1Gd2NDNXNaWE56SWl3aWJXOWtkV3hsTDI1aGRpNWlkWFIwYjI1ekxteGxjM01pTENKdGIyUjFiR1V2Ym1GMkxteGxjM01pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCYTBKRk8wVkJRME1zWlVGQlFUdEZRVU5CTEdOQlFVRTdPMEZCUlVFc1NVRkJSVHRGUVVORUxHVkJRVUU3TzBGQldVWTdSVUZEUXl4WFFVRkJPMFZCUVdFc1dVRkJRVHRGUVVOaUxHdENRVUZCT3p0QlFWZEVPMFZCUTBNc1YwRkJRVHRGUVVGaExGbEJRVUU3UlVGRFlpeHJRa0ZCUVR0RlFVTkJMRTFCUVVFN1JVRkJVU3hQUVVGQk8wVkJRMUlzWjBKQlFVRTdPMEZCUlVFc1RVRkJRenRGUVVOQkxHdENRVUZCT3p0QlFVZEVMRTFCUVVNN1JVRkRRU3huUWtGQlFUczdRVUZIUkN4TlFVRkRPMFZCUTBFc1lVRkJRVHM3UVVOMFJFWXNTVUZCU3p0RlFVTktMR0ZCUVVFN1JVRkJaU3hqUVVGQk8wVkJRMllzWlVGQlFUczdRVUZHUkN4SlFVRkxMRkZCU1Vvc1NVRkZRenRGUVVGUExGVkJRVUU3TzBGQlRsUXNTVUZCU3l4UlFVbEtMRWxCUjBNN1JVRkJWU3hoUVVGQk96dEJRVWRZTEVsQlZra3NVVUZWU0N4TlFVTkJMRWxCUTBNN1JVRkJWU3hoUVVGQk96dEJRMXBpTEVsQlFVczdSVUZEU2l4aFFVRkJPMFZCUVdVc1kwRkJRVHRGUVVObUxHVkJRVUU3UlVGRFFTeDVRa0ZCUVR0RlFVTkJMR2xDUVVGQk8wVkJRMEVzTUVKQlFVRTdSVUZEUVN4blFrRkJRVHRGUVVOQkxHZENRVUZCTzBWQlEwRXNZMEZCUVRzN1FVRlNSQ3hKUVVGTExGRkJWVW9zU1VGRlF6dEZRVUZQTEZWQlFVRTdPMEZCV2xRc1NVRkJTeXhSUVZWS0xFbEJSME03UlVGQlZTeGhRVUZCT3p0QlFVZFlMRWxCYUVKSkxGRkJaMEpJTzBWQlNVRXNZMEZCUVRzN1FVRktSQ3hKUVdoQ1NTeFJRV2RDU0N4TlFVTkJMRWxCUTBNN1JVRkJWU3hoUVVGQk96dEJRV05pTEVsQlFVczdSVUZGU2l4alFVRkJPMFZCUVdkQ0xHVkJRVUU3UlVGRGFFSXNaVUZCUVR0RlFVTkJMRTFCUVVFN1JVRkJVU3hQUVVGQk96dEJRVXBVTEVsQlFVc3NUVUZOU2p0QlFVNUVMRWxCUVVzc1RVRk5UU3hSUVVGUk8wVkJRMnBDTEd0Q1FVRkJPMFZCUTBFc1YwRkJWeXh4UWtGQldEdEZRVU5CTEZGQlFVRTdSVUZCVlN4VFFVRkJPenRCUVVkWUxFbEJXa2tzVFVGWlNEdEZRVU5CTEdGQlFVRTdPMEZCV1VZc1NVRkJTenRGUVVWS0xHTkJRVUU3UlVGQlowSXNaVUZCUVR0RlFVTm9RaXhsUVVGQk8wVkJRMEVzVFVGQlFUdEZRVUZSTEU5QlFVRTdPMEZCU2xRc1NVRkJTeXhOUVUxS08wVkJRME1zYTBKQlFVRTdSVUZEUVN4WFFVRlhMSEZDUVVGWU8wVkJRMEVzVVVGQlFUdEZRVUZWTEZOQlFVRTdPMEZCUjFnc1NVRmFTU3hOUVZsSU8wVkJRMEVzWVVGQlFUczdRVUZaUml4SlFVRkxPMFZCUlVvc1kwRkJRVHRGUVVGblFpeGxRVUZCTzBWQlEyaENMR1ZCUVVFN1JVRkRRU3hSUVVGQk8wVkJRVlVzVDBGQlFUdEZRVU5XTEZkQlFWY3NaMEpCUVZnN08wRkJURVFzU1VGQlN5eFJRVTlLTzBWQlEwTXNhMEpCUVVFN1JVRkRRU3hYUVVGWExIRkNRVUZZTzBWQlEwRXNVVUZCUVR0RlFVRlZMRk5CUVVFN08wRkJSMWdzU1VGaVNTeFJRV0ZJTzBWQlEwRXNZVUZCUVRzN1FVRlpSaXhKUVVGTE8wVkJSVW9zWTBGQlFUdEZRVUZuUWl4bFFVRkJPMFZCUTJoQ0xHVkJRVUU3UlVGRFFTeFRRVUZCTzBWQlFWY3NUMEZCUVRzN1FVRktXaXhKUVVGTExGRkJUVW83UlVGRFF5eHJRa0ZCUVR0RlFVTkJMRmRCUVZjc2NVSkJRVmc3UlVGRFFTeFJRVUZCTzBWQlFWVXNVMEZCUVRzN1FVRlVXaXhKUVVGTExGRkJXVW9zVVVGQlR6dEZRVU5PTEhGQ1FVRkJPenRCUVVkRUxFbEJhRUpKTEZGQlowSklPMFZCUTBFc1lVRkJRU0lzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWx4dVhHNWNiaTh2NHBTUVhHNHZMK0tVZ2lBZzRwV1U0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdRNHBXUTRwV1E0cFdYWEc0dkwrS1VnaUFnNHBXUklDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZzRwV1JYRzR2TCtLVm9PS1VnT0tVZ09LVm9pQWdURUZaVDFWVUlGTlVXVXhGSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lPS1ZrVnh1THkvaWxJSWdJT0tWa1NBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSU9LVmtWeHVMeS9pbElJZ0lPS1ZtdUtWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWa09LVmtPS1ZrT0tWblZ4dUx5L2lsSmhjYmx4dVhHNWNkQzh2NHBTUVhHNWNkQzh2NHBTQ0lDRGlsSXppbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSkJjYmx4MEx5L2lsYURpbElEaWxJRGlsS1FnSUU1QlZpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lPS1VnbHh1WEhRdkwrS1VnaUFnNHBTVTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTWVhHNWNkQzh2NHBTWVhHNWNibHgwWEhRdWJtRjJJSHNnWEc1Y2RGeDBYSFJ3YjNOcGRHbHZiam9nWm1sNFpXUTdYRzVjZEZ4MFhIUjZMV2x1WkdWNE9pQTFOVFUxTlR0Y2JseHVYSFJjZEZ4MEppQStJR1JwZGlCN1hHNWNkRngwWEhSY2RIQnZjMmwwYVc5dU9pQm1hWGhsWkR0Y2JseDBYSFJjZEgxY2JseDBYSFI5WEc1Y2JseHVYSFJjZEZ4dVhIUXZMK0tVa0Z4dVhIUXZMK0tVZ2lBZzRwU000cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU1FYRzVjZEM4djRwV2c0cFNBNHBTQTRwU2tJQ0JNUVZsUFZWUWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNEaWxJSmNibHgwTHkvaWxJSWdJT0tVbE9LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVbUZ4dVhIUXZMK0tVbUZ4dVhHNWNkRngwTG14aGVXOTFkQ0I3SUZ4dVhIUmNkRngwZDJsa2RHZzZJREV3TUNVN0lHaGxhV2RvZERvZ01UQXdKVHNnWEc1Y2RGeDBYSFJ3YjNOcGRHbHZiam9nY21Wc1lYUnBkbVU3WEc1Y2RGeDBmVnh1WEc1Y2JseDBYSFJjYmx4MEx5L2lsSkJjYmx4MEx5L2lsSUlnSU9LVWpPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWtGeHVYSFF2TCtLVm9PS1VnT0tVZ09LVXBDQWdURUZaUlZJZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnNHBTQ1hHNWNkQzh2NHBTQ0lDRGlsSlRpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSmhjYmx4MEx5L2lsSmhjYmx4dVhIUmNkQzVzWVhsbGNpQjdYRzVjZEZ4MFhIUjNhV1IwYURvZ01UQXdKVHNnYUdWcFoyaDBPaUF4TURBbE8xeHVYSFJjZEZ4MGNHOXphWFJwYjI0NklHRmljMjlzZFhSbE8xeHVYSFJjZEZ4MGRHOXdPaUF3T3lCc1pXWjBPaUF3TzF4dVhIUmNkRngwYjNabGNtWnNiM2M2SUdocFpHUmxianRjYmx4dVhIUmNkRngwSmk1a2FYTmhZbXhsSUh0Y2JseDBYSFJjZEZ4MGIzWmxjbVpzYjNjdGVUb2dhR2xrWkdWdU8xeHVYSFJjZEZ4MGZWeHVYRzVjZEZ4MFhIUW1Mbk5qY205c2JHRmliR1VnZTF4dVhIUmNkRngwWEhSdmRtVnlabXh2ZHkxNU9pQmhkWFJ2TzF4dVhIUmNkRngwZlZ4dVhHNWNkRngwWEhRbUxtaHBaR1JsYmlCN1hHNWNkRngwWEhSY2RHUnBjM0JzWVhrNklHNXZibVU3WEc1Y2RGeDBYSFI5WEc1Y2RGeDBmVnh1WEc1Y2JseHVYRzVjZEM4djRwU1FYRzVjZEM4djRwU0NJQ0RpbEl6aWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbEpCY2JseDBMeS9pbGFEaWxJRGlsSURpbEtRZ0lFbE5VRTlTVkZNZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJT0tVZ2x4dVhIUXZMK0tVZ2lBZzRwU1U0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU1lYRzVjZEM4djRwU1lYRzVjYmx4MFhIUkFhVzF3YjNKMElGd2lMaTl0YjJSMWJHVXZibUYyTG1KMWRIUnZibk11YkdWemMxd2lPMXh1WEhSY2RFQnBiWEJ2Y25RZ1hDSXVMMjF2WkhWc1pTOXVZWFl1YkdWemMxd2lPMXh1WEc1Y2JseHVJaXdpWEc1Y2JseDBYRzVjZEM4djRwU1FYRzVjZEM4djRwU0NJQ0RpbEl6aWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbEpCY2JseDBMeS9pbGFEaWxJRGlsSURpbEtRZ0lFNUJWaUJDVlZSVVQwNVRJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJT0tVZ2x4dVhIUXZMK0tVZ2lBZzRwU1U0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU1lYRzVjZEM4djRwU1lYRzVjYmx4MFhIUXVibUYySUM1aWRYUjBiMjRnZTF4dVhIUmNkRngwZDJsa2RHZzZJRE11TW5KbGJUc2dhR1ZwWjJoME9pQXpMakp5WlcwN1hHNWNkRngwWEhSamRYSnpiM0k2SUhCdmFXNTBaWEk3WEc1Y2JseDBYSFJjZEhOMlp5QjdYRzVjZEZ4MFhIUmNkRnh1WEhSY2RGeDBYSFJ3WVhSb0lIc2dabWxzYkRvZ2JtOXVaVHNnZlNCY2JseDBYSFJjZEZ4MExtWnBiR3hsWkNCN0lHWnBiR3c2SUNNeU16STBNamc3SUgxY2JseDBYSFJjZEgxY2JseHVYSFJjZEZ4MEpqcG9iM1psY2lCN1hHNWNkRngwWEhSY2RITjJaeUI3WEc1Y2RGeDBYSFJjZEZ4MExtWnBiR3hsWkNCN0lHWnBiR3c2SUNObU9XVTFPR1E3SUgxY2JseDBYSFJjZEZ4MGZWeHVYSFJjZEZ4MGZWeHVYSFJjZEgxY2JseHVYRzVjYmlJc0lseHVYRzVjZEZ4dVhIUXZMK0tVa0Z4dVhIUXZMK0tVZ2lBZzRwU000cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU1FYRzVjZEM4djRwV2c0cFNBNHBTQTRwU2tJQ0JPUVZZZ1FsVlVWRTlPSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNEaWxJSmNibHgwTHkvaWxJSWdJT0tVbE9LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVbUZ4dVhIUXZMK0tVbUZ4dVhHNWNkRngwTG01aGRpQXVZblYwZEc5dUlIdGNibHgwWEhSY2RIZHBaSFJvT2lBekxqSnlaVzA3SUdobGFXZG9kRG9nTXk0eWNtVnRPMXh1WEhSY2RGeDBZM1Z5YzI5eU9pQndiMmx1ZEdWeU8xeHVYSFJjZEZ4MGRHVjRkQzEwY21GdWMyWnZjbTA2SUhWd2NHVnlZMkZ6WlR0Y2JseDBYSFJjZEdadmJuUXRjMmw2WlRvZ01DNDNOV1Z0TzF4dVhIUmNkRngwZEdWNGRDMWtaV052Y21GMGFXOXVPaUIxYm1SbGNteHBibVU3WEc1Y2RGeDBYSFJzYVc1bExXaGxhV2RvZERvZ01tVnRPMXh1WEhSY2RGeDBabTl1ZEMxM1pXbG5hSFE2SURjd01EdGNibHgwWEhSY2RHTnZiRzl5T2lBak1qTXlOREk0TzF4dVhHNWNkRngwWEhSemRtY2dlMXh1WEhSY2RGeDBYSFJjYmx4MFhIUmNkRngwY0dGMGFDQjdJR1pwYkd3NklHNXZibVU3SUgwZ1hHNWNkRngwWEhSY2RDNW1hV3hzWldRZ2V5Qm1hV3hzT2lBak1qTXlOREk0T3lCOVhHNWNkRngwWEhSOVhHNWNibHgwWEhSY2RDWTZhRzkyWlhJZ2UxeHVYSFJjZEZ4MFhIUnpkbWNnZTF4dVhIUmNkRngwWEhSY2RDNW1hV3hzWldRZ2V5Qm1hV3hzT2lBalpqbGxOVGhrT3lCOVhHNWNkRngwWEhSY2RIMWNibHgwWEhSY2RGeDBZMjlzYjNJNklDTm1PV1UxT0dRN1hHNWNkRngwWEhSOVhHNWNkRngwZlZ4dVhHNWNibHh1WEhRdkwrS1VrRnh1WEhRdkwrS1VnaUFnNHBTTTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTUVhHNWNkQzh2NHBXZzRwU0E0cFNBNHBTa0lDQk9RVllnUWtGRFN5QWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0RpbElKY2JseDBMeS9pbElJZ0lPS1VsT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VtRnh1WEhRdkwrS1VtRnh1WEc1Y2RGeDBMbTVoZGlBdVltRmpheUI3WEc1Y2JseDBYSFJjZEhkcFpIUm9PaUF4TXk0MGNtVnRPeUJvWldsbmFIUTZJREV6TGpSeVpXMDdYRzVjZEZ4MFhIUndiM05wZEdsdmJqb2dabWw0WldRN1hHNWNkRngwWEhSMGIzQTZJREE3SUd4bFpuUTZJREE3WEc1Y2JseDBYSFJjZEM1M2NtRndjR1Z5TENBdVluVjBkRzl1SUQ0Z2MzQmhiaUI3WEc1Y2RGeDBYSFJjZEhCdmMybDBhVzl1T2lCaFluTnZiSFYwWlR0Y2JseDBYSFJjZEZ4MGRISmhibk5tYjNKdE9pQjBjbUZ1YzJ4aGRHVW9MVFV3SlN3Z0xUVXdKU2s3WEc1Y2RGeDBYSFJjZEhSdmNEb2dOVEFsT3lCc1pXWjBPaUExTUNVN1hHNWNkRngwWEhSOVhHNWNibHgwWEhSY2RDWXVhR2xrWkdWdUlIdGNibHgwWEhSY2RGeDBaR2x6Y0d4aGVUb2dibTl1WlR0Y2JseDBYSFJjZEgxY2JseDBYSFI5WEc1Y2JseHVYRzVjZEM4djRwU1FYRzVjZEM4djRwU0NJQ0RpbEl6aWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbEpCY2JseDBMeS9pbGFEaWxJRGlsSURpbEtRZ0lFNUJWaUJRVEZWVElDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJT0tVZ2x4dVhIUXZMK0tVZ2lBZzRwU1U0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU1lYRzVjZEM4djRwU1lYRzVjYmx4MFhIUXVibUYySUM1d2JIVnpJSHRjYmx4dVhIUmNkRngwZDJsa2RHZzZJREV6TGpSeVpXMDdJR2hsYVdkb2REb2dNVE11TkhKbGJUdGNibHgwWEhSY2RIQnZjMmwwYVc5dU9pQm1hWGhsWkR0Y2JseDBYSFJjZEhSdmNEb2dNRHNnYkdWbWREb2dNRHRjYmx4dVhIUmNkRngwTG5keVlYQndaWElnZTF4dVhIUmNkRngwWEhSd2IzTnBkR2x2YmpvZ1lXSnpiMngxZEdVN1hHNWNkRngwWEhSY2RIUnlZVzV6Wm05eWJUb2dkSEpoYm5Oc1lYUmxLQzAxTUNVc0lDMDFNQ1VwTzF4dVhIUmNkRngwWEhSMGIzQTZJRFV3SlRzZ2JHVm1kRG9nTlRBbE8xeHVYSFJjZEZ4MGZWeHVYRzVjZEZ4MFhIUW1MbWhwWkdSbGJpQjdYRzVjZEZ4MFhIUmNkR1JwYzNCc1lYazZJRzV2Ym1VN1hHNWNkRngwWEhSOVhHNWNkRngwZlZ4dVhHNWNibHh1WEhRdkwrS1VrRnh1WEhRdkwrS1VnaUFnNHBTTTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTUVhHNWNkQzh2NHBXZzRwU0E0cFNBNHBTa0lDQk9RVllnUTA5V1JWSlRJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0RpbElKY2JseDBMeS9pbElJZ0lPS1VsT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VnT0tVZ09LVWdPS1VtRnh1WEhRdkwrS1VtRnh1WEc1Y2RGeDBMbTVoZGlBdVkyOTJaWEp6SUh0Y2JseHVYSFJjZEZ4MGQybGtkR2c2SURFekxqUnlaVzA3SUdobGFXZG9kRG9nTVRNdU5ISmxiVHRjYmx4MFhIUmNkSEJ2YzJsMGFXOXVPaUJtYVhobFpEdGNibHgwWEhSY2RIUnZjRG9nTlRBbE95QnNaV1owT2lBd08xeHVYSFJjZEZ4MGRISmhibk5tYjNKdE9pQjBjbUZ1YzJ4aGRHVlpLQzAxTUNVcE8xeHVYRzVjZEZ4MFhIUXVkM0poY0hCbGNpQjdYRzVjZEZ4MFhIUmNkSEJ2YzJsMGFXOXVPaUJoWW5OdmJIVjBaVHRjYmx4MFhIUmNkRngwZEhKaGJuTm1iM0p0T2lCMGNtRnVjMnhoZEdVb0xUVXdKU3dnTFRVd0pTazdYRzVjZEZ4MFhIUmNkSFJ2Y0RvZ05UQWxPeUJzWldaME9pQTFNQ1U3WEc1Y2RGeDBYSFI5WEc1Y2JseDBYSFJjZENZdWFHbGtaR1Z1SUh0Y2JseDBYSFJjZEZ4MFpHbHpjR3hoZVRvZ2JtOXVaVHRjYmx4MFhIUmNkSDFjYmx4MFhIUjlYRzVjYmx4dVhHNWNkQzh2NHBTUVhHNWNkQzh2NHBTQ0lDRGlsSXppbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSURpbElEaWxJRGlsSkJjYmx4MEx5L2lsYURpbElEaWxJRGlsS1FnSUU1QlZpQlRUME5KUVV3Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lPS1VnbHh1WEhRdkwrS1VnaUFnNHBTVTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTQTRwU0E0cFNBNHBTWVhHNWNkQzh2NHBTWVhHNWNibHgwWEhRdWJtRjJJQzV6YjJOcFlXd2dlMXh1WEc1Y2RGeDBYSFIzYVdSMGFEb2dNVE11TkhKbGJUc2dhR1ZwWjJoME9pQXhPQzR5Y21WdE8xeHVYSFJjZEZ4MGNHOXphWFJwYjI0NklHWnBlR1ZrTzF4dVhIUmNkRngwWW05MGRHOXRPaUF3T3lCc1pXWjBPaUF3TzF4dVhHNWNkRngwWEhRdWQzSmhjSEJsY2lCN1hHNWNkRngwWEhSY2RIQnZjMmwwYVc5dU9pQmhZbk52YkhWMFpUdGNibHgwWEhSY2RGeDBkSEpoYm5ObWIzSnRPaUIwY21GdWMyeGhkR1VvTFRVd0pTd2dMVFV3SlNrN1hHNWNkRngwWEhSY2RIUnZjRG9nTlRBbE95QnNaV1owT2lBMU1DVTdYRzVjZEZ4MFhIUjlYRzVjYmx4MFhIUmNkQzVpZFhSMGIyNDZabWx5YzNRdFkyaHBiR1FnZTF4dVhIUmNkRngwWEhSdFlYSm5hVzR0WW05MGRHOXRPaUF4TGpaeVpXMDdYRzVjZEZ4MFhIUjlYRzVjYmx4MFhIUmNkQ1l1YUdsa1pHVnVJSHRjYmx4MFhIUmNkRngwWkdsemNHeGhlVG9nYm05dVpUdGNibHgwWEhSY2RIMWNibHgwWEhSOVhHNWNibHh1WEc0aVhTd2labWxzWlNJNkltRndjQzVqYzNNaUxDSnpiM1Z5WTJWU2IyOTBJam9pTDNOdmRYSmpaUzhpZlE9PSAqL1xcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC9Vc2Vycy9tYWNtYWMvU3BhY2UvZ2l0aHViL2RvYy1heHVyZS10b29sa2l0L34vY3NzLWxvYWRlciEuLi90ZW1wL2FwcC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAvVXNlcnMvbWFjbWFjL1NwYWNlL2dpdGh1Yi9kb2MtYXh1cmUtdG9vbGtpdC9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xudmFyIHN0eWxlc0luRG9tID0ge30sXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xuXHRcdHZhciBtZW1vO1xuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0cmV0dXJuIG1lbW87XG5cdFx0fTtcblx0fSxcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHNlbGYubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcblx0fSksXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuXHR9KSxcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblx0XHR9XG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xuXHRcdGlmKG5ld09iaikge1xuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuXHRcdH1cblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHRpZihzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xuXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYylcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAvVXNlcnMvbWFjbWFjL1NwYWNlL2dpdGh1Yi9kb2MtYXh1cmUtdG9vbGtpdC9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=