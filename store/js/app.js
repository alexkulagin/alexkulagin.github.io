jQuery(function($)
{
	var $cartHeader = $(".cart-header");
	var $cartContent = $(".cart-content");

	function onResize()
	{
		var wh = $(window).height();
		var ch = wh - $cartHeader.height();

		$cartContent.css({
			"height": ch
		});
	}

	$(window).resize(onResize); onResize();

	$('.nano').nanoScroller();

	$('.cart-tab-cell').click(function(){
		console.log("click");
		$('.cart-panel').toggleClass("current-section__favorites");
	});

});