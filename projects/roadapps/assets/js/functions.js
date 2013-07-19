function dbdToggleSearch() {
	
	$('.searchtop').click(function(e) {
		e.stopImmediatePropagation();
		var parentElem = $(this);
		var newWidth = 0;
		
		if(parentElem.hasClass('active')) {
			newWidth = 0;
		} else {
			newWidth = 206
		}
		
		parentElem.toggleClass('active');
		parentElem.find('input').css({
			'width': newWidth + 'px'
		});
	});
	
	$('.searchtophead').click(function(e) {
		e.stopImmediatePropagation();
	});
	
	$('.searchtop input').click(function(e) {
		e.stopImmediatePropagation();
	});
	
	$('body').click(function(e) {
		
		var elem = $('.searchtop');
		if(elem.hasClass('active')) {
			elem.toggleClass('active');
			elem.find('input').css({
				'width': '0'
			});
		}
	});
	
	jQuery('input[placeholder], textarea[placeholder]').each(function(index, element) {
		var elem = jQuery(this);
		
		elem.val(elem.attr('placeholder'));
		
		elem.bind({
			focus: function() {
				var elem = jQuery(this);
				
				if(elem.val() == elem.attr('placeholder')) {
					elem.val('');	
				}
			},
			blur: function() {
				var elem = jQuery(this);
				
				if(elem.val() == '') {
					elem.val(elem.attr('placeholder'));	
				}
			}
		});
	});
		
}

function dbdThumbnailHover() {
	
	$(document).on({
    	mouseenter: function() {
        	var $elem = $('.overlay', this);
			$elem.css('background', 'rgba(17, 146, 211, 0.65)');
			
			var overlayElem = $(this).find('.overlay-image');	
			var overlayImgHeight = overlayElem.outerHeight();
			var overlayImgWidth = overlayElem.outerWidth();
			$elem.height(overlayImgHeight + 'px');
			$elem.addClass('active');
			
			$elem.find('a.overlay-link').height(overlayImgHeight + 'px');
			
			var btnElem = $elem.find('.overlay-btn');
			var btnHeight = btnElem.outerHeight();
			var btnWidth = btnElem.outerWidth();
			
			var btnMarginTop = (overlayImgHeight - btnHeight) / 2;
			btnElem.css('margin-top', btnMarginTop + 'px');
			
			var btnMarginLeft = (overlayImgWidth - btnWidth) / 2;
			btnElem.css('margin-left', btnMarginLeft + 'px');
    	},
    	mouseleave: function() {
        	var $elem = $('.overlay', this);
			$elem.css('background', 'none');
			$elem.removeClass('active');
			
			var btnElem = $elem.find('.overlay-btn');
			btnElem.css('margin-top', '-' + (btnElem.outerHeight() + 5) + 'px');
    	}
	}, '.thumbnails li div.overlay-wrapper');
	
	$('.thumbnails li img.overlay-image').each(function() {
		var overlay = $(this).parent().siblings('div.overlay');
		var overlayImg = $(this);
		var overlayImgHeight = overlayImg.outerHeight();

		var href = overlayImg.parent().attr('href');
		
		if(href != '' && href != 'undefined') {
			var overlayText = overlayImg.data('overlaytext');
			
			if(overlayText == undefined) {
				overlayText = 'View';	
			}
			overlay.html('<a href="' + href + '" class="overlay-link"><span class="overlay-btn">' + overlayText + '</span></a>');
		}
	})
	
}

$(document).ready(function(e) {
   dbdToggleSearch(); 
   dbdThumbnailHover();
});