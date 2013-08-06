/* =========================================================
 * Simple-Plot.js
 * ========================================================= */

 (function($) {
  $.fn.simplePlot = function(graph_data, plot_options, options) {

    // Default options
    var settings = $.extend(true, {}, {
      // Radius of graph points
      pointsRadius: 4,

      // Height of container. By default it is calculated dynamically
      // when the container width changing. When the height option is
      // passed then the container height does not depend on the
      // container width.
      height: null,

      // heightRatio is used when the container height is calculated dynamically.
      // containerHeight = containerWidth * heightRatio
      heightRatio: 0.5,

      // Warning: Tooltip text is passed to a JavaScript's eval function.
      tooltipText: 'x - y'
    }, options || {});

    // Flot default options
    var plot_settings = $.extend(true, {}, {
      series: {
        shadowSize: 0
      },

      grid: {
        color: '#646464',
        borderColor: 'transparent',
        borderWidth: 20,
        hoverable: true
      },

      xaxis: {
        tickColor: 'transparent'
      },

      legend: {
        show: false
      }
    }, plot_options || {});

    // Local variables
    var data = [],
      wrapper = null,
      graph_container = null,
      current_width = null,
      plot_obj = null,
      timer = null,
      available_colors = ['#71c73e', '#77b7c5', '#d54848', '#6c42e5', '#e8e64e', '#dd56e6', '#ecad3f', '#618b9d', '#b68b68', '#36a766', '#3156be', '#00b3ff', '#646464', '#a946e8', '#9d9d9d'];

    // Clone initial data
    for(var i = 0; i < graph_data.length; i++) {
      data.push($.extend({}, graph_data[i]));
    }

    // Initialize graph
    return this.each(function() {
      $(this).wrap('<div class="graph-wrapper" />').wrap('<div class="graph-container" />');

      graph_container = $(this).parent('.graph-container');
      wrapper = graph_container.parent('.graph-wrapper');

      wrapper.prepend('<div class="graph-info" />');
      var graph_info = $('.graph-info', wrapper);

      var updateContainerSize = function () {
        var width = wrapper.innerWidth();
        if(width == current_width) return;
        var height = (settings.height === null) ? Math.ceil(width * settings.heightRatio) : settings.height;

        graph_container.css({
          width: width,
          height: height
        });
        current_width = width;

        if(plot_obj) {
          plot_obj.getPlaceholder().css({
            width: width,
            height: height
          });

          plot_obj.resize();
          plot_obj.setupGrid();
          plot_obj.draw();
        }
      }

      updateContainerSize();

      // Prepare data hash and setup labels
      if(! data.length) return;
      for(var i = 0, dataItem = data[0]; i < data.length; dataItem = data[++i]) {
        if(dataItem.color === undefined) {
          dataItem.color = available_colors.shift();
        }

        if(dataItem.filledPoints === true) {
          $.extend(true, dataItem, {
            points: {
              radius: settings.pointsRadius,
              fillColor: dataItem.color
            }
          });
          delete dataItem['filledPoints'];
        }

        graph_info.append($('<span><i style="background: ' + dataItem.color + '"></i>' + dataItem.label + '</span>'));
      }

      plot_obj = $.plot($(this), data, plot_settings);


      // Setup tooltips
      if(plot_settings.series.pie === undefined) {
        var previousPoint = null;
        $(this).bind('plothover', function(event, pos, item) {
          if(item) {
            if(previousPoint != item.dataIndex) {
              previousPoint = item.dataIndex;
              $('#tooltip').remove();
              var x = item.datapoint[0],
                  y = item.datapoint[1];
              showTooltip(item.pageX, item.pageY, eval(settings.tooltipText));
            }
          } else {
            $('#tooltip').remove();
            previousPoint = null;
          }
        });
      }
  
      
      // Setup resize event callback
      $(window).resize(function () {
        if(timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            updateContainerSize();
        }, 300);
      });
    });

    function showTooltip(x, y, contents) {
      var tooltip = $('<div id="tooltip">' + contents + '</div>').appendTo('body');
      if((x + 20 + tooltip.width()) > (wrapper.offset().left + wrapper.width())) x -= 40 + tooltip.width();
      else x += 20;
      tooltip.css({
        top: y - 16,
        left: x
      }).fadeIn();
    }
  };
})(jQuery);