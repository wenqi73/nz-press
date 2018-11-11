#!/usr/bin/env bash

readonly dir=`pwd`
node ${dir}/bin/nzpress build ./docs --base-href=./
cd ..
mkdir docs1 && cd docs1
echo '# Hello NzPress' > README.md
node ${dir}/bin/nzpress build ./