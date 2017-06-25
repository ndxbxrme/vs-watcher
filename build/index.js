(function() {
  'use strict';
  var doWatch, fs, request, spawn;

  request = require('request');

  spawn = require('cross-spawn');

  fs = require('fs');

  doWatch = function() {
    return fs.readFile('watch-list.json', 'utf-8', function(err, res) {
      var watchList;
      if (!err) {
        watchList = JSON.parse(res);
        return console.log(watchList);
      }
    });

    /*
    request.get 'https://raw.githubusercontent.com/ndxbxrme/vs-agency/master/package.json', (err, req) ->
      if not err
        pkg = JSON.parse req.body
        console.log pkg.version
        process.chdir '/build'
        result = spawn.sync 'ls', [], stdio: 'inherit'
        console.log 'done'
     */
  };

  setInterval(doWatch, .5 * 60 * 1000);

  doWatch();

}).call(this);

//# sourceMappingURL=index.js.map
