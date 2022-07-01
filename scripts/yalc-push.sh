#!/bin/bash

if [ ! $1 ];
then
  printf "Missing package folder name. \nIf you want to push a specific package, use the folder name as argument. \nExample: 'yarn yalc:push client'. \n"
  printf "\x1b[31mNo packages have been pushed.\x1b[0m\n";
else
  cd packages/$1
  yalc push
  cd ../..
fi
