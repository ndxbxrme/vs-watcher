(function() {
  'use strict';
  var async, doWatch, fs, request, spawn;

  request = require('request');

  spawn = require('cross-spawn');

  fs = require('fs');

  async = require('async');

  doWatch = function() {
    return fs.readFile('watch-list.json', 'utf-8', function(err, res) {
      var watchList;
      if (!err) {
        watchList = JSON.parse(res);
        return async.eachSeries(watchList, function(watchItem, callback) {
          return request.get(watchItem.packageUrl, function(err, res) {
            var pkg;
            if (!err) {
              pkg = JSON.parse(req.body);
              if (pkg.version !== watchItem.version) {
                watchItem.version = pkg.version;
                fs.writeFileSync('watch-list.json', JSON.stringify(watchList), 'utf-8');
                process.chdir(watchItem.dir);
                spawn.sync('.', ['init-all.sh'], {
                  stdio: 'inherit'
                });
              }
            }
            return callback();
          });
        });
      }
    });
  };

  setInterval(doWatch, .5 * 60 * 1000);

  doWatch();

}).call(this);

//# sourceMappingURL=index.js.map
