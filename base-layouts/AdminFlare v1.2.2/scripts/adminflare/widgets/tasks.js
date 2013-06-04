;(function($) {

  $.fn.extend({
    afTasks: function(options) {
      if (!options || (options && typeof(options) !== 'string')) {
        options = $.extend( {}, $.afTasks._callbacks, options || {} );
      }

      this.each(function() {
        var tasks_obj = null;

        if (options && typeof(options) === 'string') {
          tasks_obj = $.data(this, 'afTasks');

          if (options === 'clearCompletedTasks') {
            tasks_obj.clearCompletedTasks(this);
          }
          return;
        }

         $.data(this, 'afTasks', new $.afTasks(this, options));
      });

      return;
    }
  });

  $.afTasks = function (_elem, _options) {
    var self = this;
    this.callbacks = _options;

    this.clearCompletedTasks = function (elem) {
      $('.completed', $(elem)).hide(200, function() {
        $(this).remove();
      });
      this.callbacks.clearCallback(elem);
    };

    $('.widget-tasks').on('click', '.task input[type=checkbox]', function (e) {
      $(this).parents('.task').toggleClass('completed');
      if ($(this).parents('.task').hasClass('completed')) {
        self.callbacks.completeCallback(_elem, e);
      } else {
        self.callbacks.cancelCallback(_elem, e);
      }
    });
  
    $('.widget-tasks').on('click', '.task a', function () {
      $('input', $(this).prev('div')).click();
      return false;
    });
  };

  $.afTasks._callbacks = {
     completeCallback: function (elem, event) {},
     cancelCallback: function (elem, event) {},
     clearCallback: function (elem) {}
  };

})(jQuery);



  
