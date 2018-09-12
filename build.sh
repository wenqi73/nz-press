#!/usr/bin/env bash

readonly currentDir=$(cd $(dirname $0); pwd)
cd ${currentDir}

if [ $# -eq 2 ]
  then
    SOURCE_DIR="$1"
    DES_DIR="$2"
    rm -rf ${DES_DIR}
    mkdir -p ${DES_DIR}

    node ./scripts/generate-md.js ${SOURCE_DIR} ${DES_DIR}
    # cp -r ${SOURCE_DIR} ${DES_DIR}
    # cd ./demo
    
else 
    echo "Need the parameters"
    echo "./build.sh [<source path>] [<destiny path>]" 
fi


# ng serve