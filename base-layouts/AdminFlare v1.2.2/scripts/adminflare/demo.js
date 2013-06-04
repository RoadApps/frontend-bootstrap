(function() {
  
  var stylesheets_path = '#{{ stylesheets_path }}/' + DEMO_ADMINFLARE_VERSION + '/';

  $(document).ready(function() {
    var updateDocs = function(theme) {
      var current_color = demoGetColor(DEMO_CURRENT_THEME),
          color         = demoGetColor(theme);

      $('#styleswitcher-buttons .btn-' + current_color).text(demoCapitaliseFirstLetter(current_color));
      var btn_code = $('#styleswitcher-buttons .btn-code');
      btn_code.next('br').remove();
      btn_code.remove();
      $('#styleswitcher-buttons .btn-' + color).text('Primary').parent().next().prepend('<code class="btn-code">btn btn-primary</code><br>');

      var progress_code = $('#styleswitcher-progress-bars .progress-code');
      progress_code.prev('br').remove();
      progress_code.remove();
      $('#styleswitcher-progress-bars .progress-' + color).parent().next().append('<br><code class="progress-code">&lt;div class="progress"&gt;...&lt;/div&gt;</code>');
    };

    var setStylesheet = function(theme) {
      theme = demoTestThemeName(theme);

      $('#bootstrap-css').attr('href', stylesheets_path + theme + '/bootstrap.min.css');
      $('#adminflare-css').attr('href', stylesheets_path + theme + '/adminflare.min.css');

      updateDocs(theme);

      DEMO_CURRENT_THEME = theme;
      demoSetCookieSettings();
    };

    var setLayout = function(layout) {
      DEMO_CURRENT_LAYOUT = demoTestLayoutName(layout);

      $('body').removeClass('default-layout').removeClass('centered-layout').removeClass('fluid-layout');
      $('body').addClass(layout + '-layout');

      $(window).resize();
      $('.wysihtml5-sandbox').css({ width: '100%' });
      $('#MyGrid').datagrid('renderData');

      demoSetCookieSettings();
    };

    var setAtiveTheme = function (theme) {
      $('#theme_switcher .themes a').removeClass('active');
      $('#theme_switcher .themes a[data-theme=' + theme + ']').addClass('active');
    };

    var setAtiveLayout = function (layout) {
      $('#theme_switcher .layouts a').removeClass('active');
      $('#theme_switcher .layouts a[data-layout=' + layout + ']').addClass('active');
    };

    var updateThemeSwitcherPosition = function() {
      var ts = $('#theme_switcher');
      ts.css({
        left: $(window).width() - (ts.hasClass('open') ? $('#theme_switcher').width() : 0)
      });
    };

    updateDocs(DEMO_CURRENT_THEME);
  
    $('<style type="text/css" />').text('                     \
  #theme_switcher {                                           \
    position: fixed;                                          \
    top: 80px;                                                \
    z-index: 2000;                                            \
    left: 100000;                                             \
  }                                                           \
  #theme_switcher .button {                                   \
    display: block;                                           \
    position: absolute;                                       \
    width: 35px;                                              \
    height: 35px;                                             \
    background: rgba(0, 0, 0, 0.75);                          \
    margin-left: -35px;                                       \
    color: #e5e5e5;                                           \
    -webkit-transition: all 0.2s;                             \
    -moz-transition: all 0.2s;                                \
    -o-transition: all 0.2s;                                  \
    transition: all 0.2s;                                     \
    -webkit-border-top-left-radius: 5px;                      \
    -moz-border-radius-topleft: 5px;                          \
    border-top-left-radius: 5px;                              \
    -webkit-border-bottom-left-radius: 5px;                   \
    -moz-border-radius-bottomleft: 5px;                       \
    border-bottom-left-radius: 5px;                           \
    outline: 0 !important;                                    \
  }                                                           \
  #theme_switcher .button:hover {                             \
    text-decoration: none;                                    \
    color: #fff;                                              \
    text-shadow: rgba(255, 255, 255, 0.6) 0 0 5px;            \
  }                                                           \
  #theme_switcher .button i {                                 \
    display: block;                                           \
    line-height: 35px;                                        \
    width: 35px;                                              \
    text-align: center;                                       \
    font-size: 18px;                                          \
  }                                                           \
  #theme_switcher .content {                                  \
    background: rgba(0, 0, 0, 0.75);                          \
    color: #fff;                                              \
    -webkit-border-bottom-left-radius: 5px;                   \
    -moz-border-radius-bottomleft: 5px;                       \
    border-bottom-left-radius: 5px;                           \
    padding: 0 5px 0 10px;                                    \
  }                                                           \
  #theme_switcher .themes, #theme_switcher .layouts {         \
    display: block;                                           \
    width: 200px;                                             \
    padding-bottom: 10px;                                     \
  }                                                           \
  #theme_switcher .themes .active {                           \
    background: rgba(0, 0, 0, 0.3);                           \
  }                                                           \
  #theme_switcher .themes div, #theme_switcher .layouts div { \
    font-size: 15px;                                          \
    font-weight: 700;                                         \
    padding: 7px 10px;                                        \
  }                                                           \
  #theme_switcher .layouts {                                  \
    padding-left: 5px;                                        \
  }                                                           \
  #theme_switcher .layouts div {                              \
    padding-left: 5px;                                        \
    padding-bottom: 10px;                                     \
  }                                                           \
  #theme_switcher .themes a {                                 \
    display: block;                                           \
    color: #fff;                                              \
    padding: 5px 10px 7px 55px;                               \
    -webkit-border-radius: 3px;                               \
    -moz-border-radius: 3px;                                  \
    border-radius: 3px;                                       \
  }                                                           \
  #theme_switcher .themes a span {                            \
    display: block;                                           \
    position: absolute;                                       \
    width: 35px;                                              \
    height: 15px;                                             \
    margin: 3px 5px 0 -45px;                                  \
  }                                                           \
  #theme_switcher .themes a.two-colors span {                 \
    margin: 3px 5px 0 -45px;                                  \
    width: 15px;                                              \
  }                                                           \
  #theme_switcher .themes a.two-colors span:last-child {      \
    margin: 3px 5px 0 -25px;                                  \
    width: 15px;                                              \
  }                                                           \
  #theme_switcher .layouts a {                                \
    display: block;                                           \
    float: left;                                              \
    margin-right: 10px;                                       \
    width: 45px;                                              \
    height: 45px;                                             \
    padding: 5px;                                             \
    -webkit-border-radius: 3px;                               \
    -moz-border-radius: 3px;                                  \
    border-radius: 3px;                                       \
    margin-bottom: 15px;                                      \
  }                                                           \
  #theme_switcher .layouts .active {                          \
    background: rgba(0, 0, 0, 0.3);                           \
  }                                                           \
  #theme_switcher .layouts a > div {                          \
    background: #888;                                         \
    width: 39px;                                              \
    height: 39px;                                             \
    padding: 3px;                                             \
    -webkit-border-radius: 2px;                               \
    -moz-border-radius: 2px;                                  \
    border-radius: 2px;                                       \
  }                                                           \
  #theme_switcher .layouts a > div > div {                    \
    display: inline-block;                                    \
    background: white;                                        \
    margin: 0;                                                \
    padding: 0;                                               \
    width: 21px;                                              \
    height: 100%;                                             \
  }                                                           \
    ').appendTo($('head'));
  
    $('body').append('<div id="theme_switcher" />');
    var theme_switcher = $('#theme_switcher');
  
    theme_switcher.append(
      '<a href="javascript:void(0)" class="button"><i class="icon-cogs"></i></a>'
    );
  
    theme_switcher.append(
      '<div class="content" />'
    );

    $('.content', theme_switcher).append(
      '<div class="layouts" />'
    );

    $('.layouts', theme_switcher).append(
      '<div>Page layout</div>'
    ).append(
      '<a href="#" data-layout="default"><div><div></div></div></a>'
    ).append(
      '<a href="#" data-layout="centered"><div style="text-align: center"><div></div></div></a>'
    ).append(
      '<a href="#" data-layout="fluid"><div><div style="width: 100%"></div></div></a>'
    );

    $('.content', theme_switcher).append(
      '<div class="themes" />'
    );
  
    $('.themes', theme_switcher).append(
      '<div>Color theme</div>'
    ).append(
      '<a href="#" data-theme="default"><span style="background: #3690e6"></span>Blue (Default)</a>'
    ).append(
      '<a href="#" data-theme="cyan"><span style="background: #43b7bc"></span>Cyan</a>'
    ).append(
      '<a href="#" data-theme="green"><span style="background: #98ba09"></span>Green</a>'
    ).append(
      '<a href="#" data-theme="orange"><span style="background: #e7912a"></span>Orange</a>'
    ).append(
      '<a href="#" data-theme="red"><span style="background: #d85837"></span>Red</a>'
    ).append(
      '<a href="#" data-theme="black-blue" class="two-colors"><span style="background: #2c2c2c"></span><span style="background: #3690e6"></span>Black/Blue</a>'
    ).append(
      '<a href="#" data-theme="black-cyan" class="two-colors"><span style="background: #2c2c2c"></span><span style="background: #43b7bc"></span>Black/Cyan</a>'
    ).append(
      '<a href="#" data-theme="black-green" class="two-colors"><span style="background: #2c2c2c"></span><span style="background: #98ba09"></span>Black/Green</a>'
    ).append(
      '<a href="#" data-theme="black-orange" class="two-colors"><span style="background: #2c2c2c"></span><span style="background: #e7912a"></span>Black/Orange</a>'
    ).append(
      '<a href="#" data-theme="black-red" class="two-colors"><span style="background: #2c2c2c"></span><span style="background: #d85837"></span>Black/Red</a>'
    ).append(
      '<a href="#" data-theme="black-pink" class="two-colors"><span style="background: #2c2c2c"></span><span style="background: #e3649a"></span>Black/Pink</a>'
    );

    setAtiveTheme(DEMO_CURRENT_THEME);
    setAtiveLayout(DEMO_CURRENT_LAYOUT);
  
    $('#theme_switcher .button').click(function() {
      var ts = $('#theme_switcher');
      ts.animate({
        left: $(window).width() - (ts.hasClass('open') ? 0 : $('#theme_switcher').width())
      });
      ts.toggleClass('open');
      $('.button i', ts).toggleClass('icon-cogs').toggleClass('icon-remove');
    });

    $('.themes a').click(function() {
      var theme = $(this).attr('data-theme');
      setAtiveTheme(theme);
      setStylesheet(theme);
      return false;
    });

    $('.layouts a').click(function() {
      var layout = $(this).attr('data-layout');
      setAtiveLayout(layout);
      setLayout(layout);
      return false;
    });
  
  
    updateThemeSwitcherPosition();
    $(window).resize(updateThemeSwitcherPosition);
  });
})();