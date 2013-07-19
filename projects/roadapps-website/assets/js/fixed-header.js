/* 
Copyright 2012 DesignedByDash.com | License required for use.
*/
(function($) {
	
	var dbdFixedMenu = function(element, options, total) {

		var $mainElement = $('.fixed-header-container .navbar-inners');
		
		if($mainElement.length == 1) {
			var startPos = $mainElement.offset().top + $mainElement.outerHeight() + 5;
			var isiPad = navigator.userAgent.match(/iPad/i) != null;
	
			if($(window).width() >= 980 && !isiPad) {
				jQuery.event.add(window, "scroll", function() {
					var currentPos = $(window).scrollTop();
					var isFixed = false;
					
					if(currentPos > startPos && currentPos != 0 && $(window).width() >= 980) {
						$mainElement.addClass('fixed-header-active');
						$mainElement.find('.nav-container-outer').css('margin-top', '70px');
					} else {
						$mainElement.removeClass('fixed-header-active');
						$mainElement.find('.nav-container-outer').css('margin-top', '0');
					}
					
					
				});
			}
		}
		
		
	}
	
	$.fn.dbdfixedmenu = function() {
		var dbdFm = new dbdFixedMenu();
	}
	
})(jQuery);

jQuery(document).ready(function(e) {
    jQuery(document).dbdfixedmenu();
});