#!/bin/bash

git remote set-url origin "https://${GITHUB_TOKEN}@github.com/Farfetch/blackout.git"

SOURCE_BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
CONTENTS="--contents dist"

if [[ ${SOURCE_BRANCH_NAME} = main || ${SOURCE_BRANCH_NAME} = next ]]; then
    yarn release:build

    if [[ ${SOURCE_BRANCH_NAME} = next ]]; then
        PRE_ID_NAME='next'
        PRE_ID="--preid ${PRE_ID_NAME}"
        PRE_DIST_TAG="--pre-dist-tag ${PRE_ID_NAME}"
        CONVENTIONAL_PRERELEASE="--conventional-prerelease"
    fi

    npx lerna publish --conventional-commits --message "${PUBLISH_COMMIT_MESSAGE}" --no-verify-access --yes ${CONTENTS} ${PRE_ID} ${PRE_DIST_TAG} ${CONVENTIONAL_PRERELEASE}
fi