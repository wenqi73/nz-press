#!/usr/bin/env bash

readonly CURRENT_DIR=$(cd $(dirname $0); pwd)
readonly FILE_REAL_DIR=${CURRENT_DIR}/$(dirname $(readlink ${CURRENT_DIR}/nzpress))
readonly MD_DIR=`pwd`

echo ${CURRENT_DIR}
echo ${FILE_REAL_DIR}

cd ${FILE_REAL_DIR}
APP_DIR=${FILE_REAL_DIR}../site/src/app

cp ${MD_DIR}/zh.json ${APP_DIR}/../assets/i18n

for DIR in ${APP_DIR}/* ; do
  dir_name=$(basename "${DIR}")
  if [[ "${dir_name}" != "app.component.ts" && "${dir_name}" != "share" ]]; then
    rm -rf ${DIR}
  fi
done

# generate module
node ${FILE_REAL_DIR}/../scripts/generate-md.js ${MD_DIR} ${APP_DIR}

if [[ "$1" == "dev" ]]; then
  ng serve -o
fi

if [[ "$1" == "build" ]]; then
  ng build --base-href=./ --prod --output-path ${MD_DIR}/dist
fi