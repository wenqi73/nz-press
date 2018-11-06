#!/usr/bin/env bash

readonly dir=`pwd`
cd docs
bash ${dir}/bin/nzpress.sh build
cd ..
mkdir docs1 && cd docs1
echo '# Hello NzPress' > README.md
bash ${dir}/bin/nzpress.sh build