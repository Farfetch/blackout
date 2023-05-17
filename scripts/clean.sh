#!/bin/bash

lerna clean --yes
echo "Cleaning root node_modules folder..."
rimraf node_modules
echo "Finished!"