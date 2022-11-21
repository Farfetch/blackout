#!/bin/bash

git remote set-url origin "https://${GITHUB_TOKEN}@github.com/Farfetch/blackout.git"

SOURCE_BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
CONTENTS="--contents dist"

if [[ ${SOURCE_BRANCH_NAME} = main || ${SOURCE_BRANCH_NAME} = next ]]; then    
    if [[ ${SOURCE_BRANCH_NAME} = next ]]; then
        PRE_ID_NAME='next'
        PRE_ID="--preid ${PRE_ID_NAME}"
        PRE_DIST_TAG="--pre-dist-tag ${PRE_ID_NAME}"
        CONVENTIONAL_PRERELEASE="--conventional-prerelease"
    fi

    npx lerna version --conventional-commits --message "${PUBLISH_COMMIT_MESSAGE}" ${PRE_ID} ${CONVENTIONAL_PRERELEASE}

    yarn release:build

    npx lerna publish from-package --no-verify-access --yes ${CONTENTS} ${PRE_DIST_TAG} 
fi