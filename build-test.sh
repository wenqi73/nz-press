#!/usr/bin/env bash

set -u -e -o pipefail

# document has config and languages
node --max-old-space-size=3000 `pwd`/bin/nzpress build ./docs --base-href=./

# simple document
mkdir docs1
echo "# Hello NzPress" > docs1/README.md
node `pwd`/bin/nzpress build ./docs1
rm -rf ./docs1