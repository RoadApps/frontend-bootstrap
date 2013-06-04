;(function($) {

  $.fn.extend({
    afStarsRating: function(options, arg) {
      if (!options || (options && typeof(options) !== 'string')) {
        options = $.extend( {}, $.afStarsRating.options, options || {} );
      }

      this.each(function() {
        var stars_rating_object = null;

        if (options && typeof(options) === 'string') {
          stars_rating_object = $.data(this, 'afStarsRating');

          if (options === 'setCurrentRating') {
            stars_rating_object.setCurrentRating(arg);
          }
          return;
        }

        $.data(this, 'afStarsRating', new $.afStarsRating($(this), options));
      });

      return;
    }
  });

  $.afStarsRating = function (_elem, _options) {
    this.options = _options;
    var self = this,
        $container = $('<ul class="widget-stars-rating" />');

    for (var i = 0; i < this.options.stars_count; i++) {
      $container.append('<li><a href="#" title="" class="icon-star"></a></li>');
    }
    _elem.append($container);

    $('.widget-stars-rating a', _elem).on('mouseenter', function () {
      $('.widget-stars-rating li', _elem).removeClass(self.options.class_active);
      $(this).parent().addClass(self.options.class_active).prevAll('li').addClass(self.options.class_active);

    }).on('mouseleave', function () {
      self.setCurrentRating(self.options.current_rating);

    }).on('click', function () {
      self.options.onSetRating(this, $(this).parent().prevAll('li').length + 1);
      return false;
    });

    this.setCurrentRating = function (rating) {
      self.options.current_rating = rating;
      if ((rating - Math.floor(rating)) > self.options.lower_limit) {
        rating = Math.ceil(rating);
      } else {
        rating = Math.floor(rating);
      }
      $('.widget-stars-rating li', _elem).removeClass(self.options.class_active).slice(0, rating).addClass(self.options.class_active);
    }
    this.setCurrentRating(this.options.current_rating);
  };

  $.afStarsRating.options = {
    stars_count: 5,
    current_rating: 0,
    class_active: 'active',
    lower_limit: 0.35,
    onSetRating: function (elem, value) {}
  };

})(jQuery);