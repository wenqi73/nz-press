#!/usr/bin/env bash

readonly CURRENT_DIR=$(cd $(dirname $0); pwd)
readonly FILE_REAL_DIR=${CURRENT_DIR}/$(dirname $(readlink ${CURRENT_DIR}/nzpress))
readonly MD_DIR=`pwd`

echo ${CURRENT_DIR}
echo ${FILE_REAL_DIR}

cd ${FILE_REAL_DIR}
DOCS_DIR=${FILE_REAL_DIR}../site/src/app

for DIR in ${DOCS_DIR}/* ; do
  dir_name=$(basename "${DIR}")
  if [[ "${dir_name}" != "app.component.ts" && "${dir_name}" != "share" ]]; then
    rm -rf ${DIR}
  fi
done

# generate module
node ${FILE_REAL_DIR}/../scripts/generate-md.js ${MD_DIR} ${DOCS_DIR}

if [[ "$1" == "dev" ]]; then
  ng serve -o
fi

if [[ "$1" == "build" ]]; then
  ng build --base-href=./ --prod --output-path ${MD_DIR}/dist
fi