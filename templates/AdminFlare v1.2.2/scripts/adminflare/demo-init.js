var DEMO_ADMINFLARE_VERSION = '#{{ adminflare_version }}',
    DEMO_CURRENT_LAYOUT = 'default',
    DEMO_CURRENT_THEME = 'default';

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(obj, start) {
    for (var i = (start || 0), j = this.length; i < j; i++) {
      if (this[i] === obj) { return i; }
    }
    return -1;
  }
}

var demoTestThemeName = function (theme_name) {
  if ( ! theme_name || theme_name === '' || [ 'default', 'cyan', 'green', 'orange', 'red', 'black-blue',
  'black-cyan','black-green', 'black-orange', 'black-red', 'black-pink' ].indexOf(theme_name) === -1 ) {
    return 'default';
  }
  return theme_name;

}, demoTestLayoutName = function (layout) {
  if ( ! layout || layout === '' || [ 'default', 'centered', 'fluid'].indexOf(layout) === -1 ) {
    return 'default';
  }
  return layout;

}, demoGetCookieSettings = function () {
  var i, x, y, ARRcookies = document.cookie.split(';');
  for (i=0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, '');
    if (x === 'current_theme') {
      DEMO_CURRENT_THEME = demoTestThemeName(unescape(y));
    } else if (x === 'current_layout') {
      DEMO_CURRENT_LAYOUT = demoTestLayoutName(unescape(y));
    }
  }
  return 'default';

}, demoSetCookieSettings = function () {
    document.cookie = 'current_theme=' + escape(DEMO_CURRENT_THEME);
    document.cookie = 'current_layout=' + escape(DEMO_CURRENT_LAYOUT);

}, demoCapitaliseFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);

}, demoGetColor = function (theme_name) {
  return (theme_name === 'default' || theme_name === 'black-blue')   ? 'blue'   : (
         (theme_name === 'cyan'    || theme_name === 'black-cyan')   ? 'cyan'   : (
         (theme_name === 'green'   || theme_name === 'black-green')  ? 'green'  : (
         (theme_name === 'orange'  || theme_name === 'black-orange') ? 'orange' : (
         (theme_name === 'red'     || theme_name === 'black-red')    ? 'red'    : 'pink'))));

}, demoSetBodyLayout = function () {
  var cl = document.getElementsByTagName('body')[0].getAttribute('class') || '';
  document.getElementsByTagName('body')[0].setAttribute('class', cl + ' ' + DEMO_CURRENT_LAYOUT + '-layout');

};

demoGetCookieSettings();