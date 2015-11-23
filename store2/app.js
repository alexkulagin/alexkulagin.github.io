/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART BOOTSTRAP                                                                   ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘


		var cart = __webpack_require__(1),


		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  FLAPPY CART API                                                                     │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			FlappyCart = function(params) 
			{
				console.log(cart);
				console.log(("production"));
			};

			FlappyCart.prototype =
			{
				addItem: function (item)
				{
					cart.addItem(item);
				},

				getID: function ()
				{
					return cart.getID();
				}
			};

			window.FlappyCart = FlappyCart;



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘

		var	WebFont = __webpack_require__(3),
			ListManager = __webpack_require__(4),
			TintView = __webpack_require__(11),
			FloatView = __webpack_require__(14),
			PanelView = __webpack_require__(15),
			


		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  CART CONTROLLER                                                                     │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			/**
			 * - Добавляет стили и шрифты в head страницы
			 * - Создает контейнеры для компонентов
			 * - Создает в менеджере коллекцию (список)
			 * - Предоставляет публичные функции для внешнего управления корзиной
			 */

			Cart = function(params) 
			{
				var style = __webpack_require__(22);
				
				WebFont.load({
					google: {
						families: ['Montserrat:400,700', 'Montserrat Alternates:400,700']
					}
				});

				$('body').prepend(
					$(document.createElement('div')).addClass('cart-wrapper').append([
						$(document.createElement('div')).addClass('cart-panel'),
						$(document.createElement('div')).addClass('cart-tint'),
						$(document.createElement('div')).addClass('cart-float')
					])
				);

				/*$('.cart-wrapper').css({
					'font-family': '\'Montserrat\', sans-serif',
					'font-weight': '400',
					'letter-spacing': '-0.02em'
				});*/

				this.cartlist = ListManager.createCollection('cartlist');

				/*ListManager.addTo('cartlist', { id: 'f001', price: 2.23 });
				ListManager.addTo('cartlist', { id: 'f002', price: 2.34 });
				ListManager.addTo('cartlist', { id: 'f003', price: 1.10 });
				ListManager.addTo('cartlist', { id: 'f004', price: 2.10 });
				ListManager.addTo('cartlist', { id: 'f005', price: 123.34 });
				ListManager.addTo('cartlist', { id: 'f006', price: 14000.00 });
				ListManager.addTo('cartlist', { id: 'f007', price: 120999.00 });*/

				this.tint = new TintView({ el: '.cart-tint' });
				this.floatBtn = new FloatView({ el: '.cart-float' });
				this.panel = new PanelView({ el: '.cart-panel' });


				this.cartlist.fetch({ reset: true });
			};
			
			Cart.prototype =
			{
				addItem: function (item) {
					ListManager.addTo('cartlist', item);
				},

				getID: function ()
				{
					var a = [];
					ListManager.getCollection('cartlist').each(function(item) {
						a.push(item.get('id'));
					});

					return a;
				}
			};

			module.exports = new Cart();


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = WebFont;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_, Backbone) {


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘

		var	CartDispatcher = __webpack_require__(7),
			CartEvent = __webpack_require__(8),
			ListCollection = __webpack_require__(9),



		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  COLLECTION MANAGER                                                                  │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			/**
			 *	Менеджер коллекций
			 *	- добавляет элементы
			 */

			ListManager = function() 
			{
				this.listenTo(CartDispatcher, CartEvent.ITEM_ADD_TO, this.addTo);
				this.listenTo(CartDispatcher, CartEvent.ITEM_MOVE_TO, this.moveTo);
				this.listenTo(CartDispatcher, CartEvent.ITEM_REMOVE_FROM, this.removeFrom);
				this.listenTo(CartDispatcher, CartEvent.CLEAR_COLLECTION, this.clearCollection);
			};

			_.extend(ListManager.prototype, Backbone.Events,
			{
				collection: {},

				createCollection: function (id, collection, model)
				{
					var Collection = collection ? collection : ListCollection;

					if (!this.collection[id]) {
						this.collection[id] = new Collection({ id: id });
					}

					return this.collection[id];
				},

				getCollection: function (key)
				{
					return this.collection[key];
				},

				clearCollection: function (key)
				{
					if (!this.collection[key]) {
						return;
					}

					_.chain(this.collection[key].models).clone().each(function(model) {
						model.destroy();
					});
				},

				removeCollection: function (key)
				{
					this.clearCollection(key);
					this.collection[key] = null;
				},

				addTo: function (to, model)
				{
					if (!this.collection[to]) {
						return
					}

					var list = this.collection[to]
					var m = list.get(model.id);

					if (!m) {
						list.create(model);
					} else {
						m.set({ quantity:m.attributes.quantity + 1 });
						m.save();
					}
				},

				moveTo: function (from, to, id)
				{
					if (!this.collection[from] || !this.collection[to] || !id) {
						return;
					}

					var m = this.collection[from].get(id);

					if (m) {
						this.addTo(to, m.clone());
						this.removeFrom(from, m.id);
					}
				},

				removeFrom: function (from, id)
				{
					if (!this.collection[from] || !id) {
						return;
					}

					var m = this.collection[from].get(id);
						m && m.destroy();
				}
			});

			module.exports = new ListManager();


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(6)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = Backbone;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_, Backbone) {


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘


		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  CART DISPATCHER                                                                     │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			module.exports = _.extend({}, Backbone.Events);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(6)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘


		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  CART EVENTS                                                                         │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			module.exports = {
				ITEM_ADD_TO: "flappy.cart.event:cartItemAddTo",
				ITEM_MOVE_TO: "flappy.cart.event:cartItemMoveTo",
				ITEM_REMOVE_FROM: "flappy.cart.event:cartItemRemoveFrom",
				CLEAR_COLLECTION: "flappy.cart.event:cartClearCollection"
			};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone) {


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘

		var	ItemModel = __webpack_require__(10),



		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  LIST COLLECTION                                                                     │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			ListCollection = Backbone.Collection.extend(
			{
				stats: {},
				model: ItemModel,

				initialize: function (options)
				{
					this.localStorage = new Backbone.LocalStorage('flappy.cart.storage:' + options.id);
				},

				getStats: function ()
				{
					this.stats.totalQuantity = 0;
					this.stats.totalItems = 0;
					this.stats.totalCost = 0;

					this.length > 0 && this.each(function(m) {
						this.stats.totalQuantity += m.get('quantity');
						this.stats.totalCost += m.get('price') * m.get('quantity');
					}, this);

					this.stats.totalItems = this.length;

					return this.stats;
				}
			});

			module.exports = ListCollection;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Backbone) {


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘


		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  ITEM MODEL                                                                          │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			ItemModel = Backbone.Model.extend(
			{
				defaults: function () {
					return {
						id: '',
						img: '',
						url: '',
						title: '',
						price: 0,
						quantity: 1
					}
				}
			});

			module.exports = ItemModel;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘


		var Backbone = __webpack_require__(6),
			TweenMax = __webpack_require__(12),
			CartDispatcher = __webpack_require__(7),
			CartViewEvent = __webpack_require__(13),



		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  TINT VIEW                                                                           │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			TintView = Backbone.View.extend(
			{
				transition: {
					IN: { opacity: 1, display:'block', ease: Power1.easeOut, delay: 0.3 },
					OUT: { opacity: 0, display:'none' }
				},

				events: {
					'click': 'onClick'
				},

				initialize: function (options)
				{
					this.listenTo(CartDispatcher, CartViewEvent.SHOW, this.show);
					this.listenTo(CartDispatcher, CartViewEvent.SHOW_COMPLETE, this.onEnter);
					this.listenTo(CartDispatcher, CartViewEvent.HIDE, this.hide);

					TweenMax.set(this.$el, this.transition.OUT);
					this.undelegateEvents();
				},

				show: function ()
				{
					TweenMax.to(this.$el, 0.3, this.transition.IN);
				},

				onEnter: function ()
				{
					this.delegateEvents(this.events);
				},

				hide: function ()
				{
					TweenMax.to(this.$el, 0.3, this.transition.OUT);
					this.undelegateEvents();
				},

				onClick: function (event)
				{
					console.log("tint click");
					event.stopPropagation();
					CartDispatcher.trigger(CartViewEvent.HIDE);
				}
			});

			module.exports = TintView;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = TweenMax;

/***/ },
/* 13 */
/***/ function(module, exports) {

	


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘


		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  CART VIEW EVENTS                                                                    │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			module.exports = {
				SHOW: "flappy.cart.event:cartShow",
				SHOW_COMPLETE: "flappy.cart.event:cartShowComplete",
				HIDE: "flappy.cart.event:cartHide",
				HIDE_COMPLETE: "flappy.cart.event:cartHideComplete",
				SECTION_CHANGE: "flappy.cart.event:cartSectionChange",
				SECTION_CHANGED: "flappy.cart.event:cartSectionChanged"
			};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘


		var Backbone = __webpack_require__(6),
			TweenMax = __webpack_require__(12),
			CartDispatcher = __webpack_require__(7),
			CartViewEvent = __webpack_require__(13),



		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  FLOAT BUTTON VIEW                                                                   │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			FloatView = Backbone.View.extend(
			{
				transition: {
					IN: { opacity: 0.95, display:'block', y: 0, delay: 0.2, ease: Back.easeOut.config(1) },
					OUT: { opacity: 0, display:'none', y: -200, ease: Back.easeIn.config(3) }
				},

				events: {
					'click': 'onClick'
				},

				initialize: function (options)
				{
					this.listenTo(CartDispatcher, CartViewEvent.HIDE, this.show);
					this.listenTo(CartDispatcher, CartViewEvent.HIDE_COMPLETE, this.onEnter);
					this.listenTo(CartDispatcher, CartViewEvent.SHOW, this.hide);

					TweenMax.set(this.$el, this.transition.OUT);
					TweenMax.set(this.$el, { css: { top: "20px", right: "20px" }});
					this.show();
				},

				show: function ()
				{
					TweenMax.to(this.$el, 0.3, this.transition.IN);
				},

				onEnter: function ()
				{
					this.delegateEvents(this.events);
				},

				hide: function (event)
				{
					TweenMax.to(this.$el, 0.3, this.transition.OUT);
					this.undelegateEvents();
				},

				onClick: function (event)
				{
					console.log("button click");
					event.stopPropagation();
					CartDispatcher.trigger(CartViewEvent.SHOW, 'cart');
				}
			});

			module.exports = FloatView;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘


		var Backbone = __webpack_require__(6),
			TweenMax = __webpack_require__(12),
			IScroll = __webpack_require__(16),
			ListManager = __webpack_require__(4),
			CartDispatcher = __webpack_require__(7),
			CartViewEvent = __webpack_require__(13),
			HeaderView = __webpack_require__(17),
			ListView = __webpack_require__(18),



		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  PANEL TEMPLATE                                                                      │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			template = __webpack_require__(21),



		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  PANEL VIEW                                                                          │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			PanelView = Backbone.View.extend(
			{

				transition: {
					IN: { xPercent: 0, display:'block', ease: Power1.easeOut, delay: 0.3 },
					OUT: { xPercent: 100, display:'none' }
				},

				events: {
					'click': 'onClick'
				},

				initialize: function (options)
				{
					this.listenTo(CartDispatcher, CartViewEvent.SHOW, this.show);
					this.listenTo(CartDispatcher, CartViewEvent.HIDE, this.hide);

					_.extend(this.transition.IN, { onComplete:_.bind(this.onEnter, this) });
					_.extend(this.transition.OUT, { onComplete:_.bind(this.onExit, this) });
					TweenMax.set(this.$el, this.transition.OUT);
					this.undelegateEvents();

					this.$el.append(template());

					this.headerView = new HeaderView({ el: '.cart-panel-header' });
					this.listView = new ListView({ 
						el: '.cart-panel-list', 
						collection: ListManager.getCollection('cartlist') 
					});

					this.scroller = new IScroll('.cart-panel-content', {
						mouseWheel: true,
						scrollbars: true,
						fadeScrollbars: true,
						interactiveScrollbars: true,
						resizeScrollbars: true,
						shrinkScrollbars: true,
						bounce: true,
						directionLockThreshold: 5,
						bounceTime: 600,
						snapThreshold: 0.334,
						click: true,
						deceleration: 0.0006,
						probeType: 3,
						scrollbars: 'custom'
					});

					this.listView.collection.fetch({ reset: true });
				},

				show: function ()
				{
					TweenMax.to(this.$el, 0.3, this.transition.IN);
					this.scroller.scrollTo(0,0);
					this.scroller.enable();
				},

				onEnter: function ()
				{
					this.delegateEvents(this.events);
					CartDispatcher.trigger(CartViewEvent.SHOW_COMPLETE);
					this.scroller.refresh();
				},

				hide: function ()
				{
					TweenMax.to(this.$el, 0.3, this.transition.OUT);
					this.undelegateEvents();
					this.scroller.disable();
				},

				onExit: function ()
				{
					CartDispatcher.trigger(CartViewEvent.HIDE_COMPLETE);
				},

				onClick: function (event)
				{
					console.log("panel click");
					event.stopPropagation();
				}
			});

			module.exports = PanelView;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = IScroll;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($, _) {


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘


		var Backbone = __webpack_require__(6),
			TweenMax = __webpack_require__(12),
			ListManager = __webpack_require__(4),
			CartDispatcher = __webpack_require__(7),
			CartViewEvent = __webpack_require__(13),



		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  PANEL HEADER VIEW                                                                   │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			HeaderView = Backbone.View.extend(
			{
				initialize: function (options)
				{
					this.closeBTN = $('.cart-panel-close-btn');
					this.closeBTN.on('click', _.bind(this.onClick, this));

					this.cartlist = ListManager.getCollection('cartlist');

					this.listenTo(this.cartlist, 'add reset destroy', this.updateStats);
				},

				onClick: function (event)
				{
					event.stopPropagation();
					CartDispatcher.trigger(CartViewEvent.HIDE);
				},

				updateStats: function ()
				{
					var stats = this.cartlist.getStats();
					console.log(stats, this.cartlist);
					$('.cart-panel-tab-label').html(this.format(stats.totalCost, '$', ',', 2, 3));
				},

				format: function(number, currency, devider, n, x) {
					var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
					return currency + '' + number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&' + devider);
				}
			});

			module.exports = HeaderView;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(5)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘


		var Backbone = __webpack_require__(6),
			TweenMax = __webpack_require__(12),
			ListManager = __webpack_require__(4),
			CartDispatcher = __webpack_require__(7),
			CartViewEvent = __webpack_require__(13),
			ItemView = __webpack_require__(19),



		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  PANEL LIST VIEW                                                                     │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			ListView = Backbone.View.extend(
			{
				initialize: function ()
				{
					this.listenTo(this.collection, 'add', this.insertItem);
					this.listenTo(this.collection, 'reset', this.insertItems);
				},

				insertItem: function (item)
				{
					var view = new ItemView({ tagName: 'li', className: 'cart-item', model: item });
					this.$el.append(view.render().el);
				},

				insertItems: function ()
				{
					this.$el.html('');
					this.collection.each(this.insertItem, this);
				}
			});

			module.exports = ListView;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	


	//┐
	//│  ╔══════════════════════════════════════════════════════════════════════════════════════════╗
	//│  ║                                                                                          ║
	//╠──╢  FLAPPY CART MODULE                                                                      ║
	//│  ║                                                                                          ║
	//│  ╚══════════════════════════════════════════════════════════════════════════════════════════╝
	//┘


		var Backbone = __webpack_require__(6),
			ItemModel = __webpack_require__(10),
			CartDispatcher = __webpack_require__(7),
			CartViewEvent = __webpack_require__(13),
			ItemView = __webpack_require__(19),



		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  PANEL TEMPLATE                                                                      │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			template = __webpack_require__(20),



		//┐
		//│  ┌──────────────────────────────────────────────────────────────────────────────────────┐
		//╠──┤  PANEL ITEM VIEW                                                                     │
		//│  └──────────────────────────────────────────────────────────────────────────────────────┘
		//┘

			ItemView = Backbone.View.extend(
			{
				model: ItemModel,
				events: {
					'click .cart-item-trash': 'trash'
				},

				initialize: function () {
					this.listenTo(this.model, 'destroy', this.remove);
				},

				render: function () 
				{
					console.log("render");
					if (this.model.changed.id !== undefined) {
						return;
					}

					this.$el.html(template(this.model.toJSON()));

					return this;
				},

				trash: function ()
				{
					this.model.destroy();
				}
			});

			module.exports = ItemView;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<!-- <li class="cart-item"> -->\n	<div class="cart-item-img" style="background-image: url(\'' +
	((__t = (img)) == null ? '' : __t) +
	'\');"></div>\n	<div class="cart-item-block">\n		<div class="cart-item-block-wrapper">\n			<div class="cart-item-description">\n				<span>\n					<span class="cart-item-label">' +
	((__t = (title)) == null ? '' : __t) +
	'</span>\n					<span class="cart-item-price">' +
	((__t = (price)) == null ? '' : __t) +
	'</span>\n				</span>\n			</div>\n			<div class="cart-item-trash">\n				<span class="cart-item-trash-ic">\n					<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">\n						<g>\n							<g>\n								<line x1="7" y1="7" x2="25" y2="25"/>\n								<g>\n									<line x1="25" y1="7" x2="7" y2="25"/>\n								</g>\n							</g>\n						</g>\n					</svg>\n				</span>\n			</div>\n		</div>\n	</div>\n<!-- </li> -->';

	}
	return __p
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(obj) {
	obj || (obj = {});
	var __t, __p = '';
	with (obj) {
	__p += '<header class="cart-panel-header">\n	<div class="cart-panel-close-btn">\n		<span class="cart-panel-tab-ic">\n			<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">\n				<g>\n					<polyline points="14.7,25.7 5,16 14.7,6.3 	"/>\n					<line x1="5.3" y1="16" x2="27" y2="16"/>\n				</g>\n			</svg>\n		</span>\n	</div>\n	<div class="cart-panel-tab">\n		<div class="cart-panel-tab-wrapper">\n			<span class="cart-panel-tab-ic">\n				<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">\n					<g>\n						<path d="M25.4,29H6.6c-1.7,0-3-1.4-2.8-2.9l1.9-13.8C5.9,11,6.6,10,8,10h16c1.4,0,2.1,1,2.3,2.3l1.9,13.8 C28.4,27.6,27.1,29,25.4,29z"/>\n						<path d="M10.6,12.7V8.4C10.6,5.4,13,3,16,3h0c3,0,5.4,2.4,5.4,5.4v4.3"/>\n					</g>\n				</svg>\n			</span>\n			<span class="cart-panel-tab-label">$0.00</span>\n		</div>\n	</div>\n</header>\n<div class="cart-panel-content">\n	<div class="cart-panel-section">\n		<div class="cart-panel-section-wrapper">\n			<ul class="cart-panel-list"></ul>\n		</div>\n	</div>\n</div>\n<footer class="cart-panel-footer">\n	<div class="cart-panel-checkout-btn">\n		<span class="cart-panel-checkout-ic">\n			<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">\n				<g>\n					<path d="M25.4,29H6.6c-1.7,0-3-1.4-2.8-2.9l1.9-13.8C5.9,11,6.6,10,8,10h16c1.4,0,2.1,1,2.3,2.3l1.9,13.8 C28.4,27.6,27.1,29,25.4,29z"/>\n					<path d="M10.6,12.7V8.4C10.6,5.4,13,3,16,3h0c3,0,5.4,2.4,5.4,5.4v4.3"/>\n				</g>\n			</svg>\n		</span>\n		<span class="cart-panel-checkout-label">Checkout</span>\n	</div>\n</footer>';

	}
	return __p
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(23);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(25)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(24)();
	// imports


	// module
	exports.push([module.id, "html {\n  font-size: 100%;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\nbody,\ndiv,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\nth,\ntd,\narticle,\naside,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n[hidden],\ntemplate {\n  display: none;\n}\na {\n  background-color: transparent;\n}\na:active,\na:hover {\n  outline: 0;\n}\nabbr[title] {\n  border-bottom: 1px dotted;\n}\nb,\nstrong {\n  font-weight: bold;\n}\ndfn {\n  font-style: italic;\n}\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\nmark {\n  background: #ff0;\n  color: #000;\n}\nsmall {\n  font-size: 80%;\n}\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsup {\n  top: -0.5em;\n}\nsub {\n  bottom: -0.25em;\n}\nimg {\n  border: 0;\n}\nsvg:not(:root) {\n  overflow: hidden;\n}\nfigure {\n  margin: 1em 40px;\n}\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\npre {\n  overflow: auto;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n  margin: 0;\n  /* 3 */\n}\nbutton {\n  overflow: visible;\n}\nbutton,\nselect {\n  text-transform: none;\n}\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */\n}\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\ninput {\n  line-height: normal;\n}\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  box-sizing: content-box;\n  /* 2 */\n}\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\ntextarea {\n  overflow: auto;\n}\noptgroup {\n  font-weight: bold;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\ntd,\nth {\n  padding: 0;\n}\n/* 1 */\n/*img[src*=\".svg\"] { \n\t\twidth: 100%;\n\t}*/\n/* 2 */\n/*@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n\t\timg[src*=\".svg\"] {\n\t\t\twidth: 100%; \n\t\t}\n\t}*/\n/**\n\t\t * BODY COMMON STYLE\n\t\t */\nhtml,\nbody {\n  width: 100%;\n  height: 100%;\n}\nbody {\n  /*background-image: url(../img/background_001.jpg);\n\t\t\tbackground-repeat: no-repeat;\n\t\t\tbackground-size: cover;\n\t\t\tbackground-position: 50% 50%;*/\n  overflow: hidden;\n}\n/**\n\t\t * SCROLLBAR STYLE\n\t\t */\n.iScrollVerticalScrollbar {\n  position: absolute;\n  z-index: 9999;\n  width: 4px;\n  bottom: 2px;\n  top: 2px;\n  right: 2px;\n  overflow: hidden;\n}\n.iScrollVerticalScrollbar.iScrollBothScrollbars {\n  bottom: 18px;\n}\n.iScrollVerticalScrollbar .iScrollIndicator {\n  width: 100%;\n  position: absolute;\n  border-radius: 0.125em;\n  background-color: rgba(0, 0, 0, 0.4);\n}\n/*\n\t\t\tOPTIMIZATION & BASE64 (SVG)\n\t\t\t1. https://jakearchibald.github.io/svgomg/\n\t\t\t2. http://www.mobilefish.com/services/base64/base64.php\n\t\t\t3. https://www.base64encode.org/\n\t\t*/\n/*.white-outline-cart-ic {\n\t\t\tbackground-image: url('data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIxMSAtMTEgNDggNDgiPjxzdHlsZT4uc3Qwe2ZpbGw6I0ZGRkZGRjt9IC5zdDF7ZmlsbDpub25lO308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik01NC41IDI3LjhMNTIgNy43Yy0uMi0zLTIuNy01LjItNS45LTUuMmgtLjhjLS4xLTYuMS00LjctMTEtMTAuNC0xMXMtMTAuMyA0LjktMTAuNCAxMWgtLjhjLTMuMiAwLTUuNyAyLjItNS45IDUuMmwtMi4yIDIwLjJ2LjRjMCAzIDIuMyA2LjIgNS45IDYuMmgyNy4yYzMuNSAwIDUuOS0zLjEgNS45LTYuMi0uMS0uMi0uMS0uMy0uMS0uNXpNMzUtNC4yYzMuNCAwIDYuMSAzIDYuMiA2LjlIMjguOGMwLTMuOSAyLjgtNi45IDYuMi02Ljl6bTEzLjcgMzQuNEgyMS40Yy0uOSAwLTEuNy0xLjEtMS43LTIuMUwyMi4xIDhjMC0xIC44LTEuMiAxLjctMS4yaC44djEuNGMwIDEuMi45IDIuMSAyLjEgMi4xczIuMS0uOSAyLjEtMi4xVjYuOGgxMi41djEuNGMwIDEuMi45IDIuMSAyLjEgMi4xczIuMS0uOSAyLjEtMi4xVjYuOGguOGMxIDAgMS43LjQgMS43IDEuM2wyLjQgMjAuMmMwIC45LS44IDEuOS0xLjcgMS45eiIvPjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMS0xMWg0OHY0OEgxMXoiLz48L3N2Zz4=');\n\t\t}*/\n.cart-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  font-size: 16px;\n  font-family: 'Montserrat', sans-serif;\n  font-weight: 400;\n  letter-spacing: -0.02em;\n  color: #262626;\n  z-index: 100000;\n}\n.cart-tint {\n  width: 100%;\n  height: 100%;\n  display: none;\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.9);\n  z-index: 20;\n}\n.cart-float {\n  width: 2.5em;\n  height: 2.5em;\n  display: none;\n  position: fixed;\n  left: auto;\n  top: auto;\n  right: auto;\n  bottom: auto;\n  background-color: #111111;\n  cursor: pointer;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  border-radius: 50%;\n  -webkit-box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);\n  -moz-box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);\n  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);\n  z-index: 10;\n}\n.cart-panel {\n  width: 100%;\n  height: 100%;\n  min-width: 17.5em;\n  top: 0;\n  right: 0;\n  display: none;\n  position: fixed;\n  z-index: 30;\n  background-color: #f5f5f5;\n  -webkit-transition: width 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -moz-transition: width 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -ms-transition: width 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -o-transition: width 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  transition: width 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n}\n.cart-panel-header {\n  width: 100%;\n  height: 3em;\n  background-color: #ffffff;\n  opacity: 0.98;\n  position: absolute;\n  z-index: 20;\n}\n.cart-panel-close-btn {\n  width: 3em;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  cursor: pointer;\n  z-index: 20;\n}\n.cart-panel-close-btn .cart-panel-tab-ic {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translate(0.625em, -50%);\n  -moz-transform: translate(0.625em, -50%);\n  -ms-transform: translate(0.625em, -50%);\n  -o-transform: translate(0.625em, -50%);\n  transform: translate(0.625em, -50%);\n}\n.cart-panel-close-btn:hover .cart-panel-tab-ic {\n  -webkit-transform: translate(0.5em, -50%);\n  -moz-transform: translate(0.5em, -50%);\n  -ms-transform: translate(0.5em, -50%);\n  -o-transform: translate(0.5em, -50%);\n  transform: translate(0.5em, -50%);\n}\n.cart-panel-tab {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  z-index: 10;\n}\n.cart-panel-tab-wrapper {\n  width: 100%;\n  position: absolute;\n  text-align: center;\n  top: 50%;\n  white-space: nowrap;\n  -webkit-transform: translate(0, -50%);\n  -moz-transform: translate(0, -50%);\n  -ms-transform: translate(0, -50%);\n  -o-transform: translate(0, -50%);\n  transform: translate(0, -50%);\n}\n.cart-panel-tab-ic {\n  margin-right: 0.125em;\n  display: inline-block;\n  width: 0.9375em;\n  height: 0.9375em;\n  -webkit-transform: translate(0, 0.1875em);\n  -moz-transform: translate(0, 0.1875em);\n  -ms-transform: translate(0, 0.1875em);\n  -o-transform: translate(0, 0.1875em);\n  transform: translate(0, 0.1875em);\n}\n.cart-panel-tab-ic svg {\n  fill: none;\n  stroke: #111111;\n  stroke-width: 2.6;\n  stroke-linecap: round;\n  stroke-miterlimit: 4;\n}\n.cart-panel-tab-label {\n  display: inline-block;\n  color: #111111;\n  font-size: 0.875em;\n  line-height: 1em;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.cart-panel-footer {\n  position: absolute;\n  bottom: 0;\n  left: 50%;\n  z-index: 30;\n}\n.cart-panel-checkout-btn {\n  position: absolute;\n  width: 3.75em;\n  height: 3.75em;\n  background-color: #111111;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  border-radius: 50%;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-transform: translate(-50%, -5em);\n  -moz-transform: translate(-50%, -5em);\n  -ms-transform: translate(-50%, -5em);\n  -o-transform: translate(-50%, -5em);\n  transform: translate(-50%, -5em);\n  -webkit-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  -moz-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  -ms-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  -o-transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);\n  -webkit-box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);\n  -moz-box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);\n  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);\n}\n.cart-panel-checkout-btn svg {\n  fill: none;\n  stroke: #FFFFFF;\n  stroke-width: 2.6;\n  stroke-linecap: round;\n  stroke-miterlimit: 4;\n}\n.cart-panel-checkout-ic {\n  width: 1.5em;\n  height: 1.5em;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n.cart-panel-checkout-label {\n  display: none;\n}\n.cart-panel-content {\n  position: absolute;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  z-index: 10;\n}\n.cart-panel-section {\n  width: 100%;\n  position: relative;\n}\n.cart-panel-section-wrapper {\n  padding: 0.625em;\n  padding-top: 3.625em;\n  padding-bottom: 5em;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -moz-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -ms-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -o-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n}\n.cart-panel-list {\n  list-style-type: none;\n}\n.cart-item {\n  width: 100%;\n  position: relative;\n  margin-bottom: 0.625em;\n  background-color: #FFF;\n  overflow: hidden;\n  -webkit-border-radius: 20px;\n  -moz-border-radius: 20px;\n  border-radius: 20px;\n  -webkit-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -moz-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -ms-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -o-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n}\n.iScrollVerticalScrollbar {\n  margin: 0.5em 0.0625em;\n  margin-top: 3.625em;\n}\n/** CART ITEM IMG */\n.cart-item-img {\n  width: 100%;\n  padding-bottom: 100%;\n  background-repeat: no-repeat;\n  -webkit-background-size: cover;\n  -moz-background-size: cover;\n  -o-background-size: cover;\n  background-size: cover;\n  -webkit-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -moz-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -ms-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -o-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n}\n/** CART ITEM BLOCK */\n.cart-item-block-wrapper {\n  width: 100%;\n  height: 5em;\n  display: table;\n  -webkit-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -moz-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -ms-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  -o-transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n  transition: all 0.5s cubic-bezier(0.61, 0, 0.25, 0.99);\n}\n.cart-item-block-wrapper > div {\n  position: relative;\n  display: table-cell;\n}\n.cart-item-description > span {\n  position: absolute;\n  padding: 0 1.125em;\n  top: 50%;\n  -webkit-transform: translate(0, -50%);\n  -moz-transform: translate(0, -50%);\n  -ms-transform: translate(0, -50%);\n  -o-transform: translate(0, -50%);\n  transform: translate(0, -50%);\n}\n.cart-item-label {\n  line-height: 1.3em;\n  max-height: 2.6em;\n  font-size: 0.875em;\n  overflow: hidden;\n  color: #202022;\n  display: block;\n}\n.cart-item-price {\n  font-size: 0.875em;\n  color: #A8A8B2;\n  display: block;\n  margin-top: 0.125em;\n}\n.cart-item-trash {\n  width: 4em;\n  cursor: pointer;\n}\n.cart-item-trash-ic {\n  position: absolute;\n  display: inline-block;\n  width: 0.9375em;\n  height: 0.9375em;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n}\n.cart-item-trash-ic svg {\n  fill: none;\n  stroke: #BDC3C7;\n  stroke-width: 2.6;\n  stroke-linecap: round;\n  stroke-miterlimit: 4;\n}\n@media screen and (min-width: 20em) {\n  .cart-panel-header {\n    height: 3.75em;\n  }\n  .cart-panel-tab-ic {\n    margin-right: 0.25em;\n    width: 1.1875em;\n    height: 1.1875em;\n  }\n  .cart-panel-tab-label {\n    font-size: 1em;\n    line-height: 1.25em;\n  }\n  .cart-panel-section-wrapper {\n    padding-top: 4.375em;\n  }\n  .iScrollVerticalScrollbar {\n    margin-top: 4.375em;\n  }\n  .cart-item-trash-ic {\n    width: 1.5em;\n    height: 1.5em;\n  }\n}\n@media screen and (min-width: 22.5em) {\n  .cart-panel-close-btn {\n    width: 4em;\n  }\n  .cart-panel-close-btn .cart-panel-tab-ic {\n    -webkit-transform: translate(1.5625em, -50%);\n    -moz-transform: translate(1.5625em, -50%);\n    -ms-transform: translate(1.5625em, -50%);\n    -o-transform: translate(1.5625em, -50%);\n    transform: translate(1.5625em, -50%);\n  }\n  .cart-panel-close-btn:hover .cart-panel-tab-ic {\n    -webkit-transform: translate(1.375em, -50%);\n    -moz-transform: translate(1.375em, -50%);\n    -ms-transform: translate(1.375em, -50%);\n    -o-transform: translate(1.375em, -50%);\n    transform: translate(1.375em, -50%);\n  }\n  .cart-panel-section-wrapper {\n    padding: 1.5625em;\n    padding-top: 5.3125em;\n    padding-bottom: 5em;\n  }\n  .iScrollVerticalScrollbar {\n    margin-top: 5.3125em;\n  }\n  .cart-item {\n    margin-bottom: 1.5625em;\n  }\n  .cart-item-label {\n    line-height: 1.3em;\n    max-height: 2.6em;\n    font-size: 1em;\n  }\n  .cart-item-price {\n    font-size: 1em;\n  }\n}\n@media screen and (min-width: 26.25em) {\n  .cart-panel-close-btn {\n    width: 4em;\n  }\n  .cart-panel-close-btn .cart-panel-tab-ic {\n    -webkit-transform: translate(0.625em, -50%);\n    -moz-transform: translate(0.625em, -50%);\n    -ms-transform: translate(0.625em, -50%);\n    -o-transform: translate(0.625em, -50%);\n    transform: translate(0.625em, -50%);\n  }\n  .cart-panel-close-btn:hover .cart-panel-tab-ic {\n    -webkit-transform: translate(0.5em, -50%);\n    -moz-transform: translate(0.5em, -50%);\n    -ms-transform: translate(0.5em, -50%);\n    -o-transform: translate(0.5em, -50%);\n    transform: translate(0.5em, -50%);\n  }\n  .cart-panel-section-wrapper {\n    padding: 0.625em;\n    padding-top: 4.375em;\n    padding-bottom: 5.625em;\n  }\n  .iScrollVerticalScrollbar {\n    margin-top: 4.375em;\n  }\n  .cart-item {\n    height: 5em;\n    margin-bottom: 0.125em;\n    display: table;\n    -webkit-border-radius: 5px;\n    -moz-border-radius: 5px;\n    border-radius: 5px;\n    /** CART ITEM IMG */\n  }\n  .cart-item > div {\n    display: table-cell;\n  }\n  .cart-item .cart-item-img {\n    width: 5em;\n    padding: 0;\n    display: table-cell;\n  }\n  .cart-panel-checkout-btn {\n    position: absolute;\n    width: 14.375em;\n    height: 3.125em;\n    -webkit-border-radius: 1.5625em;\n    -moz-border-radius: 1.5625em;\n    border-radius: 1.5625em;\n  }\n  .cart-panel-checkout-btn .cart-panel-checkout-ic {\n    display: none;\n  }\n  .cart-panel-checkout-btn .cart-panel-checkout-label {\n    display: block;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n    -moz-transform: translate(-50%, -50%);\n    -ms-transform: translate(-50%, -50%);\n    -o-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n    color: #fff;\n    text-transform: uppercase;\n    font-size: 0.875em;\n  }\n}\n/**\n\t\t * PORTRAIT MOBILE MODE (~416px)\n\t\t */\n@media (min-width: 26.25em) and (max-height: 26em) {\n  .cart-panel-checkout-btn {\n    -webkit-transform: translate(-50%, -4.375em);\n    -moz-transform: translate(-50%, -4.375em);\n    -ms-transform: translate(-50%, -4.375em);\n    -o-transform: translate(-50%, -4.375em);\n    transform: translate(-50%, -4.375em);\n  }\n}\n@media screen and (min-width: 30em) {\n  .cart-panel-close-btn .cart-panel-tab-ic {\n    -webkit-transform: translate(1.5625em, -50%);\n    -moz-transform: translate(1.5625em, -50%);\n    -ms-transform: translate(1.5625em, -50%);\n    -o-transform: translate(1.5625em, -50%);\n    transform: translate(1.5625em, -50%);\n  }\n  .cart-panel-close-btn:hover .cart-panel-tab-ic {\n    -webkit-transform: translate(1.375em, -50%);\n    -moz-transform: translate(1.375em, -50%);\n    -ms-transform: translate(1.375em, -50%);\n    -o-transform: translate(1.375em, -50%);\n    transform: translate(1.375em, -50%);\n  }\n  .cart-panel-section-wrapper {\n    padding: 1.5625em;\n    padding-top: 5.3125em;\n    padding-bottom: 6.5625em;\n  }\n  .iScrollVerticalScrollbar {\n    margin-top: 5.3125em;\n  }\n}\n@media screen and (min-width: 34.375em) {\n  .cart-panel {\n    width: 34.375em;\n  }\n}\n@media screen and (min-width: 64em) {\n  .cart-panel {\n    width: 40em;\n  }\n  .cart-item-block-wrapper {\n    height: 7.5em;\n  }\n  .cart-item {\n    height: 7.5em;\n  }\n  .cart-item .cart-item-img {\n    width: 7.5em;\n  }\n  .cart-panel-checkout-btn {\n    -webkit-transform: translate(-50%, -6.25em);\n    -moz-transform: translate(-50%, -6.25em);\n    -ms-transform: translate(-50%, -6.25em);\n    -o-transform: translate(-50%, -6.25em);\n    transform: translate(-50%, -6.25em);\n  }\n}\n", ""]);

	// exports


/***/ },
/* 24 */
/***/ function(module, exports) {

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


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

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
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
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
		var sourceMap = obj.sourceMap;

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
		var media = obj.media;
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


/***/ }
/******/ ]);