/* =========================================================
 * Left-Panel.js
 * ========================================================= */

(function() {
   var LP = {
    // iScroll object
    _object: null,

    _left_panel: null,
  
    // Scrolling flag
    _scrolling: false,
  
    _dropdowns: {},

    _opened_dropdown: null,
  
    destroyScroll: function() {
      if(LP._currScroll === "v" && LP._object !== null) {
        LP._object.destroy();
        LP._object = null;
      } else if(LP._currScroll === "h") {
        $('#left-panel .active').unbind('click');
        $('#left-panel').removeClass('open');
      }
    },
  
    // Direction: v - standart vertical left nav
    //            h - horizontal mobile nav
    _setup: function(direction) {
      LP.destroyScroll();
  
      var left_panel = $('#left-panel');
      if(direction === "v") {
        left_panel.css({ height: '100%', position: 'fixed', top: 0, left: 0 });
        
        if (! LP._object) {
          // Ignore click event when the content is scrolled
          $('#left-panel a').click(function () {
            if (LP._scrolling) {
              return false;
            }
          });
        }
        LP._setupDropdowns();

        LP._object = new iScroll('left-panel-content', {
          hScroll: false,
          vScroll: true,
          onScrollMove: function() {
            LP._scrolling = true;
            LP._hideOpenedDropdowns();
          },
          onScrollEnd: function() {
            LP._scrolling = false;
          }
        });
  
      } else {
        left_panel.css({ height: '36px', position: 'relative', top: 0, left: 0 });
        LP._setupHorizontalMenu();
      }
      LP._currScroll = direction;
    },
  
    // Update dimensions
    _update: function() {
      if(String(LP._left_panel.css('z-index')) !== '1020' && LP._currScroll !== "v") {
        LP._setup('v');
      } else if(String(LP._left_panel.css('z-index')) === '1020' && LP._currScroll !== "h") {
        LP._setup('h');
      }
      if (LP._currScroll === "v" && LP._opened_dropdown !== null) {
        LP._setDropdownTopPosition(LP._opened_dropdown);
      }
    },
  
    // Setup dropdowns
    _initDropdowns: function () {
      // For each link
      $('.lp-dropdown-toggle').each(function () {
        var self = $(this),
            id   = self.attr('id');
  
        LP._dropdowns[id] = {
          toggler: self,
          menu:    $('.lp-dropdown-menu[data-dropdown-owner=' + id + ']')
        };
        LP._dropdowns[id]['width'] = LP._calculateDropdownWidth(id);

        LP._dropdowns[id].wrapper = $('<div class="lp-dropdown-wrapper" data-dropdown-owner="' + id + '" />').appendTo($('body'));
        LP._dropdowns[id].wrapper.append($('<div class="arrow" />'));
        if (LP._dropdowns[id].menu.hasClass('simple')) {
          LP._dropdowns[id].wrapper.addClass('simple');
        }
      });

      $('html').on('click.dropdown.data-api', function () {
        LP._hideOpenedDropdowns();
      });
      
      $('html').on('click', '.lp-dropdown-wrapper', function (event) {
        event.stopPropagation();
      });
  
      $('.lp-dropdown-toggle').click( function() {
        LP._hideOpenedDropdowns();
        LP._setDropdownTopPosition($(this).attr('id'));
        LP._opened_dropdown = $(this).attr('id');
        $(this).addClass('open');
        $('.lp-dropdown-wrapper[data-dropdown-owner=' + $(this).attr('id') + ']').addClass('open');
  
        return false;
      });
    },

    _setupDropdowns: function () {
      $('#lp-active').unbind('click').remove();

      var dropdown;
      for(var k in LP._dropdowns) {
        dropdown = LP._dropdowns[k];

        dropdown.wrapper.append(dropdown.menu);
        dropdown.wrapper.css({ left: $('#left-panel li').width() + 10 });

        $('a', dropdown.menu).each(function () {
          $(this).html( jQuery.data(this, 'link_html') );
        });

        dropdown.menu.css({ width: dropdown.width });
        $('.active', dropdown.menu).css({ display: 'block' });
        dropdown.wrapper.css({ width: dropdown.width });

        if (dropdown.menu.hasClass('simple')) {
          $('li, li a', dropdown.menu).css({ display: 'block', width: '100%' });
        }
      }
    },

    _setupHorizontalMenu: function () {
      var left_panel = $('#left-panel');

      var dropdown;
      for(var k in LP._dropdowns) {
        dropdown = LP._dropdowns[k];

        dropdown.toggler.parent().append(dropdown.menu);
        dropdown.toggler.removeClass('open');
        dropdown.wrapper.removeClass('open');

        dropdown.menu.css({ width: '100%' });
        dropdown.wrapper.css({ width: '100%' });

        $('.active', dropdown.menu).css({ display: 'none' });

        $('a', dropdown.menu).each(function () {
          var self = $(this);
          jQuery.data(this, 'link_html', self.html());
          self.text( dropdown.toggler.text() + ' / ' + self.text() );
        });
      }

      $('<a href="#" id="lp-active" />').prependTo(left_panel).bind('click', function() {
        if(left_panel.hasClass('open')) {
          left_panel.css({
            height: 37
          });
  
        } else {
          left_panel.css({
            height: $('#left-panel-content ul').innerHeight() + 37
          });
        }
  
        left_panel.toggleClass('open');
        return false;
      }).text(
        $(($('.active', left_panel).length == 1) ? '.active' : '.active .active', left_panel).text()
      );
    },
  
    _hideOpenedDropdowns: function () {
      $('.lp-dropdown-wrapper.open').removeClass('open');
      $('.lp-dropdown-toggle.open').removeClass('open');
      LP._opened_dropdown = null;
    },

    _calculateDropdownWidth: function(id) {
      var width = 0;
      if (LP._dropdowns[id].menu.hasClass('simple')) {
        var parent = LP._dropdowns[id].menu.parent(),
            div = $('<div id="calculateDropdownWidth" />').css({ position: 'absolute', width: 3000, left: -10000 }).appendTo('body').append(LP._dropdowns[id].menu);
        $('li a', LP._dropdowns[id].menu).each(function () {
          if (width < $(this).width()) width = $(this).width();
        });
        width += 50;
        parent.append(LP._dropdowns[id].menu);
        div.remove();
      } else {
        $('li', LP._dropdowns[id].menu).each(function () {
          width += $(this).width();
        });
      }
      return width;
    },

    _setDropdownTopPosition: function (id) {
      var d = LP._dropdowns[id];
      if (d.menu.hasClass('simple')) {
        var parent         = d.toggler.parents('li'),
            parent_top     = parent.offset().top,
            parent_height  = parent.height(),
            wrapper_height = d.wrapper.height(),
            window_height  = $(window).height(),
            scroll_top     = $(document).scrollTop();

        var wrapper_top, arrow_margin;

        if (wrapper_height > parent_height) {
          if (window_height > parent_top + wrapper_height - scroll_top) {
            wrapper_top = parent_top;
            arrow_margin = parent_height / 2 - 6;
          } else {
            wrapper_top = window_height -wrapper_height + scroll_top;
            if (wrapper_top + wrapper_height < parent_height + parent_top) {
              wrapper_top = parent_height + parent_top - wrapper_height;
            }
            arrow_margin = parent_top - wrapper_top + parent_height / 2 - 6;
          }
        } else {
          wrapper_top  = parent_top + parent_height / 2 - wrapper_height / 2;
          arrow_margin = wrapper_height / 2 - 6;
        }

        d.wrapper.css({ top: wrapper_top - scroll_top });
        $('.arrow', d.wrapper).css({ 'margin-top': arrow_margin });
      } else {
        d.wrapper.css({
          top: d.toggler.offset().top - $(document).scrollTop()
        });
      }
    }
  };
  
  $(document).ready( function () {
    // Setup dropdowns
    LP._initDropdowns();
    // Setup scrolling on menu
    LP._left_panel = $('#left-panel');
    LP._update();
  });
  $(window).resize(LP._update);
})();

