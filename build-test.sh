#!/usr/bin/env bash

set -u -e -o pipefail

nzpress -v
# document has config and languages
nzpress build ./docs --base-href=./

# simple document
mkdir docs1
echo "# Hello NzPress" > docs1/README.md
nzpress build ./docs1
rm -rf ./docs1