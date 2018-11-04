#!/usr/bin/env bash

readonly dir=`pwd`
npm install ${dir} -g
cd docs
nzpress build