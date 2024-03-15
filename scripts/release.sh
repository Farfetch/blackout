#!/bin/bash

# Release script which uses lerna underneath.
# Releases are only made when running in main or next branches.
# Use --no-publish option to just update package.json with
# the new version and generate the changelog. No commit or tag
# will be generated or pushed.

# The release steps are:
# 1. Call `lerna version` to generate next version for all packages, changelogs,
#    create the release commit containing those changes, create the tag and
#    push them to the remote.
# 2. Call `yarn build` to build the packages.
# 3. Call `lerna publish from-package` to publish the packages to npm. 
#    Note: There is a prepack lifecycle script on each package that will copy
#    the updated package.json to the dist folder so it can be published.

IS_NO_PUBLISH=1

if [[ "$1" == "--no-publish" || "$2" == "--no-publish" ]]; then
    IS_NO_PUBLISH=0
fi

if [[ ! IS_NO_PUBLISH ]]; then
    # Need to set the origin url with the GITHUB_TOKEN variable so lerna can push
    # the commit with the new version.
    git remote set-url origin "https://${GITHUB_TOKEN}@github.com/Farfetch/blackout.git"
fi

CURRENT_BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
CONTENTS="--contents dist"

LERNA_LOG_LEVEL='verbose'

HAS_GIT_CHANGES=`git status --porcelain`

if [[ ${CURRENT_BRANCH_NAME} = main || ${CURRENT_BRANCH_NAME} = next || ${IS_NO_PUBLISH} ]]; then
    if [[ ${CURRENT_BRANCH_NAME} = next ]]; then
        PRE_ID_NAME='next'
        PRE_ID="--preid ${PRE_ID_NAME}"
        PRE_DIST_TAG="--pre-dist-tag ${PRE_ID_NAME}"
        CONVENTIONAL_PRERELEASE="--conventional-prerelease"
    fi

    if [[ ${CURRENT_BRANCH_NAME} = main ]]; then
        # Set conventional-graduate flag so prereleases are bumped correctly
        CONVENTIONAL_GRADUATE="--conventional-graduate"

        # Set create release parameter
        CREATE_RELEASE="--create-release github"

        # If the current branch is main, we need to check if the commit
        # came from next branch. If it did not, then we will not allow
        # bumps to major version as those should only happen when
        # next branch is merged to main.

        # Get the second parent commit hash if it exists
        SECOND_PARENT_COMMIT=$(git log --pretty=%P -n 1 | awk '{print $2}')

        if [[ -n $SECOND_PARENT_COMMIT ]]; then
            # If there is a second parent commit, it means this commit is a merge commit.
            # In that case, we check if the `next` branch contains that commit.
            # This should be the case only when the merge commit was obtained from merging
            # the next branch onto the main branch.
            IS_FROM_NEXT_BRANCH=$(git branch --format "%(refname:short)" --contains "$SECOND_PARENT_COMMIT" --merge | grep -q "next" && echo "0" || echo "1")
        else
            # If there is not a second parent commit, this could mean that the main
            # branch could have been fast-forwarded to point to the same commit as
            # next, so we check for that case as well.
            IS_FROM_NEXT_BRANCH=$([[ $(git rev-parse main) = $(git rev-parse next) ]] && echo "0" || echo "1")
        fi

        # If this commit did not come from "next", then set `--force-major-bumps-into-minor`
        # flag for lerna version.
        if [[ $IS_FROM_NEXT_BRANCH -ne 0 ]]; then
            FORCE_MAJOR_BUMPS_INTO_MINOR='--force-major-bumps-into-minor'
        fi
    fi

    if [[ ${IS_NO_PUBLISH} ]]; then
        CREATE_RELEASE=''
        ADDITIONAL_ARGS='--no-git-tag-version --no-push --no-commit-hooks'
        LERNA_LOG_LEVEL='silent'
    fi

    # First, calculate the next version and generate changelog but
    # do not publish to npm as the packages need to be built only
    # after the next version is calculated because there is a babel
    # transform which will replace any imports to `version` from `package.json`
    # with the literal version obtained from the `package.json` so to
    # avoid setting the wrong version, the packages __MUST__ be built only after this step.
    npx lerna version --no-private --conventional-commits --yes --message "${PUBLISH_COMMIT_MESSAGE}" ${PRE_ID} ${CONVENTIONAL_PRERELEASE} ${FORCE_MAJOR_BUMPS_INTO_MINOR} ${CONVENTIONAL_GRADUATE} ${CREATE_RELEASE} ${ADDITIONAL_ARGS} --loglevel=${LERNA_LOG_LEVEL}

    if [[ ${IS_NO_PUBLISH} ]]; then
        scripts/git-diff-ex.sh

        echo ""
        echo "WARN: package.json and changelog files have been changed. Do not forget to discard those changes."
        echo ""

        exit 0;
    fi

    yarn build

    npx lerna publish from-package --no-verify-access --yes ${CONTENTS} ${PRE_DIST_TAG} --loglevel=silly
fi