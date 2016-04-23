/**
 * @author Ryan Van Etten
 * @see http://ryanve.com/lab/dimensions/
 */
(function(window, document, screen) {
  jQuery(function($) {
    var docElem = document.documentElement
      , $html = $(docElem)
      , $win = $(window)
      , $doc = $(document)
      , verge = window.verge // npm: verge
      , viewportW = verge['viewportW']
      , viewportH = verge['viewportH']
      , mM = window['matchMedia'] || window['msMatchMedia']
      , $style = $('<style></style>').appendTo(document.head)
      , outputs = []
      , prev = [];

    /**
     * @link http://gist.github.com/ryanve/7924792 for a more robust method
     * @param {string} feature (e.g. "min-width")
     * @param {string=} unit
     * @param {number=} init
     * @param {number=} step
     * @return {number} the highest value that (feature:value) matches
     */
    function maxMedia(feature, unit, init, step) {
      if (typeof init != 'number') init = 0;
      if (!mM) return init;
      if (typeof unit != 'string') unit = '';
      if (typeof step != 'number') step = 1;
      while (mM.call(window, '(' + feature + ':' + (init+=step) + unit + ')')['matches']) {}
      return init-step;
    }
    
    function makeTestMq(feature, px, selector, rule) {
      return '@media (' + feature + ':' + px + 'px) { ' + selector + '{' + rule + '} }';
    }

    function update() {
      var l, i = 0, updates = [], prefix = '#output-';
      updates[1] = $win.width();
      updates[2] = updates[25] = docElem.clientWidth;
      updates[3] = window.innerWidth;
      updates[4] = window.outerWidth;
      updates[5] = $doc.width();
      updates[6] = $win.height();
      updates[7] = updates[26] = docElem.clientHeight;
      updates[8] = window.innerHeight;
      updates[9] = window.outerHeight;
      updates[10] = $doc.height();
      updates[11] = screen.width;
      updates[12] = screen.availWidth;
      updates[13] = screen.height;
      updates[14] = screen.availHeight;
      updates[15] = document.body.clientWidth;
      updates[16] = document.body.clientHeight;
      updates[17] = docElem.scrollWidth;
      updates[18] = document.body.scrollWidth;
      updates[19] = docElem.scrollHeight;
      updates[20] = document.body.scrollHeight;
      updates[21] = docElem.offsetWidth;
      updates[22] = document.body.offsetWidth;
      updates[23] = docElem.offsetHeight;
      updates[24] = document.body.offsetHeight;
      updates[27] = maxMedia('min-width', 'px');
      updates[28] = maxMedia('min-height', 'px');
      updates[29] = maxMedia('min-device-width', 'px');
      updates[30] = maxMedia('min-device-height', 'px');
      updates[31] = viewportW();
      updates[32] = viewportH();
      
      // Update changed outputs
      for (l = updates.length; i < l; i++) {
        if (i in updates && updates[i] !== prev[i]) {
          (outputs[i] = outputs[i] || $(prefix + i)).text(updates[i]);
        }
      }

      // Inject exact media queries to confirm the calculated viewport size.
      $style.text([
          makeTestMq('width', updates[27], '#output-27', 'font-weight:bold')
        , makeTestMq('height', updates[28], '#output-28', 'font-weight:bold')
        , makeTestMq('device-width', updates[29], '#output-29', 'font-weight:bold')
        , makeTestMq('device-height', updates[30], '#output-30', 'font-weight:bold')
      ].join('\n'));

      // Prepare for next update.
      prev = updates;
    }
    
    $html.removeClass('no-js').addClass('js');
    mM && $('a.match-media').attr('data-via', mM === window['matchMedia'] ? 'matchMedia' : 'msMatchMedia');
    update();
    $win.on('resize', update);
  });
}(window, document, screen));