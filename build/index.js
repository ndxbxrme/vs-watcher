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
          console.log('watching', watchItem.dir);
          return request.get(watchItem.packageUrl, function(err, res) {
            var pkg;
            if (!err) {
              pkg = JSON.parse(res.body);
              return fs.readFile(watchItem.dir + "/package.json", 'utf-8', function(err, res) {
                var localPkg;
                if (!err) {
                  localPkg = JSON.parse(res);
                  console.log("local " + localPkg.version + ", remote " + pkg.version);
                  if (pkg.version !== localPkg.version) {
                    console.log('restarting', watchItem.dir);
                    process.chdir(watchItem.dir);
                    spawn.sync("cd " + watchItem.dir + " && . init-all.sh");
                  }
                }
                return callback();
              });
            }
          });
        });
      }
    });
  };

  setInterval(doWatch, .5 * 60 * 1000);

  doWatch();

}).call(this);

//# sourceMappingURL=index.js.map
