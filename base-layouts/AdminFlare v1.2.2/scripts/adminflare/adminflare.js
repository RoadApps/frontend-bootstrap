/* =========================================================
 * Adminflare.js
 * ========================================================= */

$(document).ready(function () {
  // Scroll on top
  $("#on-top-link").click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
  
  // Collapse/Expand functionality
  $(".box-header").each(function () {
    var box = $(this).next();
    // If next element is a box and hasn't .non-collapsible class
    if (box.hasClass('box') && ! box.hasClass('non-collapsible'))
      $(this).append('<a href="#" class="box-collapse pull-right">hide&nbsp;&nbsp;<i class="icon-caret-up"></i></a>')
             .append('<a href="#" class="box-expand pull-right" style="display: none">show&nbsp;&nbsp;<i class="icon-caret-down"></i></a>');
  });
  
  // Collapse box
  $(document).on("click", "a.box-collapse", function(){
    var self = $(this).hide(100, 'linear');
    self.parent('.box-header').next('.box').slideUp(400, function () {
      $('.box-expand', self.parent('.box-header')).show(100, 'linear');
    });
    return false;

  // Expand box
  }).on("click", "a.box-expand", function(){
    var self = $(this).hide(100, 'linear');
    self.parent('.box-header').next('.box').slideDown(400, function () {
      $('.box-collapse', self.parent('.box-header')).show(100, 'linear');
    });
    return false;
  });
});

function timeAgo(time){
  switch (typeof time) {
    case 'number': break;
    case 'string': time = +new Date(time); break;
    case 'object': if (time.constructor === Date) time = time.getTime(); break;
    default: time = +new Date();
  }
  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
      token = 'ago', list_choice = 1;
  
  if (Math.floor(seconds) === 0) {
    return 'Just now';
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0, format;
  while (format = time_formats[i++]) {
    if (seconds < format[0]) {
      if (typeof format[2] == 'string') {
        return format[list_choice];
      }
      else {
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
      }
    }
  }
  return time;
}

$(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
  self = $('.nav-button');
  if (self.hasClass('collapsed')) {
    self.removeClass('active');
  } else {
    self.addClass('active');
  }
});