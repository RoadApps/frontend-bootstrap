// AdminFlare version
var VERSION = '1.2.2';

// Source and output directories
var source_directory   = './scripts/',
    output_directory   = './html/assets/javascripts/' + VERSION + '/';

// Output
var output = [
  // Modernizr + jQuery + jQuery Migrate
  {
    minified_output_file: 'modernizr-jquery.min.js',
    files: [
      'modernizr-2.6.2.js',
      'jquery-1.9.1/jquery-1.9.1.js',
      'jquery-1.9.1/jquery-migrate-1.1.1.js'
    ]
  },

  // Bootstrap
  {
    output_file: 'bootstrap.js',
    minified_output_file: 'bootstrap.min.js',
    files: [
      'bootstrap-2.3.1/bootstrap-transition.js',
      'bootstrap-2.3.1/bootstrap-alert.js',
      'bootstrap-2.3.1/bootstrap-button.js',
      'bootstrap-2.3.1/bootstrap-carousel.js',
      'bootstrap-2.3.1/bootstrap-collapse.js',
      'bootstrap-2.3.1/bootstrap-dropdown.js',
      'bootstrap-2.3.1/bootstrap-modal.js',
      'bootstrap-2.3.1/bootstrap-tooltip.js',
      'bootstrap-2.3.1/bootstrap-popover.js',
      'bootstrap-2.3.1/bootstrap-scrollspy.js',
      'bootstrap-2.3.1/bootstrap-tab.js',
      'bootstrap-2.3.1/bootstrap-typeahead.js',
      'bootstrap-2.3.1/bootstrap-affix.js'
    ]
  },

  // AdminFlare
  {
    output_file: 'adminflare.js',
    minified_output_file: 'adminflare.min.js',
    files: [
      // Single Plugins
      'iscroll-lite.js',
      'bootstrap-colorpicker.js',
      'bootstrap-datepicker.js',
      'bootstrap-timepicker.js',
      'bootstrap-notify-1.0.0.js',
      'jquery.toggles.js',
      'bootbox-3.2.0.js',
      'bootstrap-x-clickover-1.0.0.js',
      'jquery.autosize-1.16.7.js',
      'jqBootstrapValidation-1.3.6.js',
      'jquery.easy-pie-chart-1.0.1.js',
      'jquery.sparkline-2.1.1.js',
      'prettify.min.js',

      // Wysihtml5
      'bootstrap-wysihtml5-0.0.2/wysihtml5-0.3.0.js',
      'bootstrap-wysihtml5-0.0.2/bootstrap-wysihtml5.js',
    
      // Bootstrap-editable
      'bootstrap-editable-1.4.3/bootstrap-editable.js',
      'bootstrap-editable-1.4.3/bootstrap-editable-address.js',
    
      // jQuery Flot
      'flot-0.7.0/jquery.flot.js',
      'flot-0.7.0/jquery.flot.pie.js',
      
      // Fuel UX
      'fuelux-2.3.0/util.js',
      'fuelux-2.3.0/checkbox.js',
      'fuelux-2.3.0/combobox.js',
      'fuelux-2.3.0/radio.js',
      'fuelux-2.3.0/select.js',
      'fuelux-2.3.0/spinner.js',
      'fuelux-2.3.0/search.js',
      'fuelux-2.3.0/datagrid.js',
      'fuelux-2.3.0/wizard.js',

      // AdminFlare
      'adminflare/adminflare.js',
      'adminflare/left-panel.js',
      'adminflare/simple-plot.js',

      // AdminFlare widgets
      'adminflare/widgets/tasks.js',
      'adminflare/widgets/stars-rating.js',
      'adminflare/widgets/stream.js'
    ]
  },

  // AdminFlare Demo Init
  {
    minified_output_file: 'adminflare-demo-init.min.js',
    files: [
      {
        file: 'adminflare/demo-init.js',
        replace: [
          [/#\{\{ adminflare_version \}\}/g, VERSION]
        ]
      }
    ]
  },

  // AdminFlare Demo
  {
    minified_output_file: 'adminflare-demo.min.js',
    files: [
      {
        file: 'adminflare/demo.js',
        replace: [
          [/#\{\{ stylesheets_path \}\}/g, 'assets/css']
        ]
      }
    ]
  },

  // Fuel UX Datagrid Example
  {
    minified_output_file: 'fuelux-datagrid-example.min.js',
    files: [
      'fuelux-2.3.0/datasource-example.js',
      'fuelux-2.3.0/datagrid-example.js'
    ]
  }
];



// --------------------------------------------------------------------------
// ==========================================================================

var fs   = require('fs'),
    exec = require('child_process').exec,
    path = require('path');

var streamOptions = {
  flags: 'w+',
  encoding: 'utf-8',
  mode: 0644
};

var deleteFileIfExists = function (filename) {
  if (fs.existsSync(filename)) {
      fs.unlinkSync(filename);
  }

}, createDirectoryTree = function (dirpath) {
  var parts = path.normalize(dirpath).replace(/\\/g, '/').replace(/^\.?\s*\/+\s*/, "").replace(/\s*\/+\s*$/, "").split('/');
  var result_path = '.';
  for (var i = 0; i < parts.length; i++) {
    result_path = path.join(result_path, parts[i]);
    if (parts[i] == '..') {
      continue;
    }
    if (! fs.existsSync(result_path)) {
      fs.mkdirSync(result_path);
    }
  }
  return path.normalize(result_path);

}, toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

}, streamClose = function (output_file, minified_file, output_path, minified_path) {
  var build_file         = 'build-' + (output_file || minified_file),
      output_file_path   = (output_file)   ? path.join(output_path,   output_file) : null,
      minified_file_path = (minified_file) ? path.join(minified_path, minified_file) : null;

  // Copy uncompressed file
  if (output_file_path) {
    deleteFileIfExists(output_file_path);
    fs.writeFileSync(output_file_path, fs.readFileSync(build_file, 'utf-8'));
    console.log('File "' + output_file_path + '" has been compiled successfully.');
  }
  
  // Compress file
  if (minified_file_path) {
    deleteFileIfExists(minified_file_path);
    exec('java -jar yuicompressor-2.4.7.jar ' + build_file + ' -o ' + minified_file_path,  function (error, stdout, stderr) {
      if (stderr || error) {
        console.log('Error: ' + (stderr || error));
      } else {
        fs.unlinkSync(build_file);
        console.log('File "' + minified_file_path + '" has been compiled successfully.');
      }
    });
  } else {
    fs.unlinkSync(build_file);
  }
};

if (output.length === 0) {
  console.log('No files specified to compile.');

} else {
  output.forEach(function(output_obj) {
    var output_file   = (! output_obj['output_file'])          ? null : path.basename(output_obj['output_file']),
        minified_file = (! output_obj['minified_output_file']) ? null : path.basename(output_obj['minified_output_file']);

    if ( ! output_file && ! minified_file ) {
      return;
    }

    var output_path = null, minified_path = null;

    if ( output_file ) {
      output_path = createDirectoryTree(path.dirname(path.join(output_directory, output_obj['output_file'])));
    }

    if ( minified_file ) {
      minified_path = createDirectoryTree(path.dirname(path.join(output_directory, output_obj['minified_output_file'])));
    }

    var build_file = 'build-' + (output_file || minified_file);

    deleteFileIfExists(build_file);
    (function (_output_obj, _build_file, _output_file, _minified_file, _output_path, _minified_path) {
      var file_stream = fs.createWriteStream(_build_file, streamOptions);

      file_stream.on('close', function () {
        streamClose(_output_file, _minified_file, _output_path, _minified_path);
      });

      for (var i = 0, file = _output_obj['files'][0]; i < _output_obj['files'].length; file = _output_obj['files'][++i]) {

        var filename = (toType(file) === 'object') ? file['file'] : file,
            data     = fs.readFileSync(path.normalize(path.join(source_directory, filename)), 'utf-8');
    
        if (toType(file) === 'object') {
          if (toType(file['replace']) === 'array') {
            for (var j = 0; j < file['replace'].length; j++) {
              data = data.replace(file['replace'][j][0], file['replace'][j][1]);
            }
          }
        }

        // Write data
        file_stream.write('/* ' + path.normalize(path.join(source_directory, filename)) + ' */\n\r' + data + '\n\r\n\r');
      }
      file_stream.end();

    })(output_obj, build_file, output_file, minified_file, output_path, minified_path);

  });
}