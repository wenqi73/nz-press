#!/usr/bin/env bash

readonly CURRENT_DIR=$(cd $(dirname $0); pwd)
readonly FILE_REAL_DIR=${CURRENT_DIR}/$(dirname $(readlink ${CURRENT_DIR}/nzpress))
readonly MD_DIR=`pwd`

# echo ${CURRENT_DIR}
# echo ${FILE_REAL_DIR}

cd ${FILE_REAL_DIR}
APP_DIR=${FILE_REAL_DIR}../site/src/app

if [[ -f "${MD_DIR}/config.js" ]]; then
  cp ${MD_DIR}/config.js ${APP_DIR}/../assets
fi

for DIR in ${APP_DIR}/* ; do
  dir_name=$(basename "${DIR}")
  if [[ "${dir_name}" != "app.component.ts" && "${dir_name}" != "share" ]]; then
    rm -rf ${DIR}
  fi
done

# generate module
node ${FILE_REAL_DIR}/../scripts/generate-md.js ${MD_DIR} ${APP_DIR}

if [[ "$1" == "dev" ]]; then
  ng serve
fi

if [[ "$1" == "build" ]]; then
  ng build --prod --output-path ${MD_DIR}/nzpress/dist
fi