'use strict'

request = require 'request'
spawn = require 'cross-spawn'
fs = require 'fs'
async = require 'async'

doWatch = ->
  fs.readFile 'watch-list.json', 'utf-8', (err, res) ->
    if not err
      watchList = JSON.parse res
      async.eachSeries watchList, (watchItem, callback) ->
        request.get watchItem.packageUrl, (err, res) ->
          if not err
            pkg = JSON.parse req.body
            if pkg.version isnt watchItem.version
              watchItem.version = pkg.version
              fs.writeFileSync 'watch-list.json', JSON.stringify(watchList), 'utf-8'
              process.chdir watchItem.dir
              spawn.sync '.', ['init-all.sh'], stdio: 'inherit'
          callback()
            
setInterval doWatch, .5 * 60 * 1000
doWatch()