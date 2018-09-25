#!/usr/bin/env bash

readonly CURRENT_DIR=$(cd $(dirname $0); pwd)
readonly FILE_REAL_DIR=${CURRENT_DIR}/$(dirname $(readlink ${CURRENT_DIR}/ngpress))
readonly MD_DIR=`pwd`

echo ${CURRENT_DIR}
echo ${FILE_REAL_DIR}

cd ${FILE_REAL_DIR}
DOCS_DIR=${FILE_REAL_DIR}/../site/src/app/docs
rm -rf ${DOCS_DIR}
mkdir -p ${DOCS_DIR}

# generate module
node ${FILE_REAL_DIR}/../scripts/generate-md.js ${MD_DIR} ${DOCS_DIR}

if [[ "$1" == "dev" ]]; then
  ng serve -o
fi

if [[ "$1" == "build" ]]; then
  ng build --base-href=./ --prod
  mv ${FILE_REAL_DIR}/../dist/demo ${MD_DIR}
fi