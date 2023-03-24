#!/bin/bash

if [[ ! $1 ]];
then
  echo "ERROR! No git repository argument was passed to publish the packages."
  exit 1
fi

if [[ $1 != http* ]];
then
  echo "ERROR! Git repository argument must be an http url pointing to a git repository."
  exit 1
fi

if [[ $1 == http*://github.com/Farfetch/blackout.git ]]
then
  echo "ERROR! Git repository must not be the same as origin."
  exit 1
fi

npx lerna run --concurrency 1 --stream --scope \"@farfetch/*\" release:git -- $1