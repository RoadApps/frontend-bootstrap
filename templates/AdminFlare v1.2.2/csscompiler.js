// AdminFlare version
var VERSION = '1.2.2';

// Source and output directories
var output_directory  = './html/assets/css/' + VERSION + '/';
    source_directory   = './themes/';

// Files to compile
var output = [
  // Black/Blue theme
  {
    output_file: 'black-blue/bootstrap.css',
    minified_output_file: 'black-blue/bootstrap.min.css',
    source_file: 'black-blue/bootstrap.less'
  },
  {
    output_file: 'black-blue/adminflare.css',
    minified_output_file: 'black-blue/adminflare.min.css',
    source_file: 'black-blue/adminflare.less'
  },

  // Black/Cyan theme
  {
    output_file: 'black-cyan/bootstrap.css',
    minified_output_file: 'black-cyan/bootstrap.min.css',
    source_file: 'black-cyan/bootstrap.less'
  },
  {
    output_file: 'black-cyan/adminflare.css',
    minified_output_file: 'black-cyan/adminflare.min.css',
    source_file: 'black-cyan/adminflare.less'
  },

  // Black/Green theme
  {
    output_file: 'black-green/bootstrap.css',
    minified_output_file: 'black-green/bootstrap.min.css',
    source_file: 'black-green/bootstrap.less'
  },
  {
    output_file: 'black-green/adminflare.css',
    minified_output_file: 'black-green/adminflare.min.css',
    source_file: 'black-green/adminflare.less'
  },

  // Black/Orange theme
  {
    output_file: 'black-orange/bootstrap.css',
    minified_output_file: 'black-orange/bootstrap.min.css',
    source_file: 'black-orange/bootstrap.less'
  },
  {
    output_file: 'black-orange/adminflare.css',
    minified_output_file: 'black-orange/adminflare.min.css',
    source_file: 'black-orange/adminflare.less'
  },

  // Black/Pink theme
  {
    output_file: 'black-pink/bootstrap.css',
    minified_output_file: 'black-pink/bootstrap.min.css',
    source_file: 'black-pink/bootstrap.less'
  },
  {
    output_file: 'black-pink/adminflare.css',
    minified_output_file: 'black-pink/adminflare.min.css',
    source_file: 'black-pink/adminflare.less'
  },

  // Black/Red theme
  {
    output_file: 'black-red/bootstrap.css',
    minified_output_file: 'black-red/bootstrap.min.css',
    source_file: 'black-red/bootstrap.less'
  },
  {
    output_file: 'black-red/adminflare.css',
    minified_output_file: 'black-red/adminflare.min.css',
    source_file: 'black-red/adminflare.less'
  },

  // Cyan theme
  {
    output_file: 'cyan/bootstrap.css',
    minified_output_file: 'cyan/bootstrap.min.css',
    source_file: 'cyan/bootstrap.less'
  },
  {
    output_file: 'cyan/adminflare.css',
    minified_output_file: 'cyan/adminflare.min.css',
    source_file: 'cyan/adminflare.less'
  },

  // Blue(default) theme
  {
    output_file: 'default/bootstrap.css',
    minified_output_file: 'default/bootstrap.min.css',
    source_file: 'default/bootstrap.less'
  },
  {
    output_file: 'default/adminflare.css',
    minified_output_file: 'default/adminflare.min.css',
    source_file: 'default/adminflare.less'
  },

  // Green theme
  {
    output_file: 'green/bootstrap.css',
    minified_output_file: 'green/bootstrap.min.css',
    source_file: 'green/bootstrap.less'
  },
  {
    output_file: 'green/adminflare.css',
    minified_output_file: 'green/adminflare.min.css',
    source_file: 'green/adminflare.less'
  },

  // Orange theme
  {
    output_file: 'orange/bootstrap.css',
    minified_output_file: 'orange/bootstrap.min.css',
    source_file: 'orange/bootstrap.less'
  },
  {
    output_file: 'orange/adminflare.css',
    minified_output_file: 'orange/adminflare.min.css',
    source_file: 'orange/adminflare.less'
  },

  // Red theme
  {
    output_file: 'red/bootstrap.css',
    minified_output_file: 'red/bootstrap.min.css',
    source_file: 'red/bootstrap.less'
  },
  {
    output_file: 'red/adminflare.css',
    minified_output_file: 'red/adminflare.min.css',
    source_file: 'red/adminflare.less'
  },

  // Pages
  {
    output_file: 'pages.css',
    minified_output_file: 'pages.min.css',
    source_file: 'pages.less'
  }
];

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
      deleteFileIfExists(path.join(output_path, output_file));
    }

    if ( minified_file ) {
      minified_path = createDirectoryTree(path.dirname(path.join(output_directory, output_obj['minified_output_file'])));
      deleteFileIfExists(path.join(minified_path, minified_file));
    }

    var source_file = path.normalize(path.join(source_directory, output_obj['source_file']));

    (function(_source_file, _output_file, _minified_file, _output_path, _minified_path) {
      var output_file_path   = (_output_file)   ? path.join(_output_path, _output_file) : null,
          minified_file_path = (_minified_file) ? path.join(_minified_path, _minified_file) : null;

      var compiledCallback = function (error, stdout, stderr) {
        if (stderr || error) {
          console.log('Error: ' + (stderr || error));
        } else {
          console.log('File "' + output_file_path + '" has been compiled successfully.');
          if (_minified_file) {
            exec('lessc ' + _source_file + ' > ' + minified_file_path + ' --yui-compress', minifiedCallback);
          }
        }
      };

      var minifiedCallback = function (error, stdout, stderr) {
        if (stderr || error) {
          console.log('Error: ' + (stderr || error));
        } else {
          console.log('File "' + minified_file_path + '" has been compiled successfully.');
        }
      };
  
      if (_output_file) {
        exec('lessc ' + _source_file + ' > ' + output_file_path, compiledCallback);
      } else {
        exec('lessc ' + _source_file + ' > ' + minified_file_path + ' --yui-compress', minifiedCallback);
      }
    })(source_file, output_file, minified_file, output_path, minified_path);
  });
}
