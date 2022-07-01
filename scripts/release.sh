#!/bin/bash

git remote set-url origin "https://${GITHUB_TOKEN}@github.com/Farfetch/blackout.git"

SOURCE_BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

if [[ ${SOURCE_BRANCH_NAME} = main ]]; then
    npx lerna publish --conventional-commits --message "${PUBLISH_COMMIT_MESSAGE}" --no-verify-access --yes
else
    if [[ ${SOURCE_BRANCH_NAME} = next ]]; then
        PRE_ID=next
        CONTENTS="--contents dist"
        yarn release:build
    else
        PRE_ID=rc
    fi
    
    npx lerna publish --conventional-commits --conventional-prerelease --no-verify-access --preid ${PRE_ID} --pre-dist-tag ${PRE_ID}  --message "${PUBLISH_COMMIT_MESSAGE}"  --yes ${CONTENTS}
fi