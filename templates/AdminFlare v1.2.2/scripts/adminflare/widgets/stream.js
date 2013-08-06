;(function($) {
  $.fn.extend({
    afStream: function(options, arg) {
      if (!options || (options && typeof(options) !== 'string')) {
        options = $.extend( {}, $.afStream.options, options || {} );
      }

      this.each(function() {
        var stream_object = null;

        if (options && typeof(options) === 'string') {
          stream_object = $.data(this, 'afStream');

          switch (options) {
            case 'addEvent':          stream_object.addEvent(arg);          break;
            case 'updateTime':        stream_object.updateTime(true);       break;
            case 'showEvents':        stream_object.showEvents(arg);        break;
            case 'hideEvents':        stream_object.hideEvents(arg);        break;
            case 'showAllEvents':     stream_object.showAllEvents();        break;
            case 'hideAllEvents':     stream_object.hideAllEvents();        break;
            case 'clearAllEvents':    stream_object.clearAllEvents();       break;
            case 'setUpdateInterval': stream_object.setUpdateInterval(arg); break;
            case 'setShowLimit':      stream_object.setShowLimit(arg);      break;
          }
          return;
        }

        $.data(this, 'afStream', new $.afStream($(this), options));
      });

      return;
    }
  });



  $.afStream = function (_elem, _options) {
    this.options = _options;
    this._update_timer = null;
    var self = this;

    this.options._available_events = [];
    for (var event_type in this.options.event_types) {
      this.options._available_events.push(event_type);
    }
    if (typeof(this.options.show_only) !== 'array') {
      this.options.show_only = $.merge([], this.options._available_events);
    }

    _elem.append('<div class="stream-empty">No events</div>');
    if (this.options.height) {
      _elem.css({
        height: this.options.height,
        overflow: 'hidden'
      });
    }

    this.addEvent = function (event) {
      if (!event['type'] || !event['message'] || self.options._available_events.indexOf(event['type']) === -1) {
        return;
      }
      var $icon = $((event['icon']) ? event['icon'] : ((self.options.event_types[event.type].icon) ? self.options.event_types[event.type].icon : '<div />')).addClass('stream-icon'),
          $event_html = $(self.options.template.replace(
            /\#\{\{type\}\}/ig, event.type
          ).replace(
            /\#\{\{time\}\}/ig, timeAgo(event['time'] = (!event['time']) ? new Date() : event.time)
          ).replace(
            /\#\{\{caption\}\}/ig, (event['caption']) ? event.caption : self.options.event_types[event.type].caption
          ).replace(
            /\#\{\{message\}\}/ig, event.message
          )).prepend($icon);

      $('.stream-empty', _elem).hide();
      self.updateTime(true);

      if (self.options.show_only.indexOf(event['type']) === -1) {
        $event_html.css({display: 'none'});
        _elem.prepend($event_html);
      } else {
        _elem.prepend($event_html);
        $event_html.animate({opacity: 1}, {duration: 1000});
      }

      $event_html.each(function() {
        $.data(this, 'stream-time', event.time);
      });

      limitDisplayedEvents();

      if (self._update_timer) {
        clearTimeout(self._update_timer);
        self._update_timer = null;
      }
      if (self.options.update_interval) {
        self._update_timer = setTimeout(update, self.options.update_interval * 1000);
      }

      self.options.onEventAdd(_elem);
    };

    var getEventTypes = function (event_types) {
      if (typeof(event_types) === 'string') {
        event_types = event_types.replace(/\s+?/ig, "").split(',');
      } else if (typeof(event_types) !== 'array') {
        event_types = [];
      }
      for (var i = 0; i < event_types.length; i++) {
        if (self.options._available_events.indexOf(event_types[i]) === -1) {
          event_types.splice(i, 1);
        }
      }
      return event_types;
    };

    this.showEvents = function (event_types) {
      var events = getEventTypes(event_types);
      for (var i = 0; i < events.length; i++) {
        if (self.options.show_only.indexOf(events[i]) === -1) {
          self.options.show_only.push(events[i]);
          $('.stream-event-' + events[i], _elem).css({
            display: 'block'
          }).animate({
            opacity: 1
          }, {
            duration: 500
          });
        }
      }
      limitDisplayedEvents();
    };

    this.hideEvents = function (event_types) {
      var events = getEventTypes(event_types);
      for (var i = 0; i < events.length; i++) {
        if (self.options.show_only.indexOf(events[i]) !== -1) {
          self.options.show_only.splice(self.options.show_only.indexOf(events[i]), 1);
          $('.stream-event-' + events[i], _elem).animate({
            opacity: 0
          }, {
            duration: 500,
            complete: function () {
              $(this).css({display: 'none'});
            }
          });
        }
      }
      limitDisplayedEvents();
    };

    this.showAllEvents = function () {
      self.showEvents(self.options._available_events);
    };

    this.hideAllEvents = function () {
      self.hideEvents(self.options._available_events);
    };

    this.clearAllEvents = function () {
      $('.stream-event', _elem).remove();
      $('.stream-empty', _elem).show();
    };

    this.setUpdateInterval = function (value) {
      self.options.update_interval = parseInt(value, 10);
      if (self._update_timer) {
        clearTimeout(self._update_timer);
        self._update_timer = null;
      }
      if (self.options.update_interval) {
        self._update_timer = setTimeout(update, self.options.update_interval * 1000);
      }
    };

    this.setShowLimit = function (value) {
      self.options.show_limit = parseInt(value, 10);
      limitDisplayedEvents();
    };

    this.updateTime = function (_external) {
      _external = (typeof _external !== 'undefined') ? _external : false;

      $('.stream-event', _elem).each(function() {
        $('.stream-time', $(this)).text(timeAgo($.data(this, 'stream-time')));
      });
      self.options.onTimeUpdate(_elem);
      if (!_external && self.options.time_update_interval) {
        setTimeout(self.updateTime, self.options.time_update_interval * 1000);
      }
    };

    if (this.options.time_update_interval) {
      setTimeout(this.updateTime, this.options.time_update_interval * 1000);
    }

    var update = function () {
      self.options.onUpdate(_elem);
      if (self._update_timer) {
        clearTimeout(self._update_timer);
        self._update_timer = null;
      }
      if (self.options.update_interval) {
        self._update_timer = setTimeout(update, self.options.update_interval * 1000);
      }
    };

    if (this.options.update_interval) {
      this._update_timer = setTimeout(update, this.options.update_interval * 1000);
    }

    var limitDisplayedEvents = function () {
      var $els = $('.stream-event', _elem).filter(':visible');
      if ($els.length === 0) return;

      if (self.options.show_limit && $els.length > self.options.show_limit) {
        $els.slice(self.options.show_limit).remove();
      }

      if (self.options.height) {
        var $el, bottom_limit = _elem.offset().top + self.options.height;

        while (($el = $els.last()).offset().top > bottom_limit) {
          $el.remove();
        }
      }
    };
  };

  $.afStream.options = {
    update_interval: 0, // seconds // No automatic update
    time_update_interval: 10, // seconds
    height: 0,
    show_limit: 0, // Show infinite number of events
    template: '<div class="stream-event stream-event-#{{type}}"><div class="stream-time">#{{time}}</div><div class="stream-caption">#{{caption}}</div><div class="stream-message">#{{message}}</div></div>',
    event_types: {},
    show_only: 'all',
    _available_events: [],
    onUpdate: function (elem) {},
    onEventAdd: function (elem) {},
    onTimeUpdate: function (elem) {}
  };

})(jQuery);