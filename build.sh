#!/usr/bin/env bash

readonly currentDir=$(cd $(dirname $0); pwd)
cd ${currentDir}

node ./scripts/generate-md.js ./docs
cp -r ./docs ./demo/src/app
cd ./demo
# ng serve