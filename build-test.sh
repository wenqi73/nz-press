#!/usr/bin/env bash

set -u -e -o pipefail

# document has config and languages
`pwd`/bin/nzpress build ./docs
`pwd`/bin/nzpress build ./2.x-doc --base-href=./

# simple document
mkdir docs1
echo "# Hello NzPress" > docs1/README.md
`pwd`/bin/nzpress build ./docs1
rm -rf ./docs1