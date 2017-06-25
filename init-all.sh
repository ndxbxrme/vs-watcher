#!/bin/bash
git pull
npm install -g grunt-cli
grunt build
screen -X -S VSWATCHER quit || true
screen -S VSWATCHER node build/index.js