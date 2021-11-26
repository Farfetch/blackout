if [ "$CI" = true ]
then
lerna exec --concurrency 1 --no-bail --stream -- tsc -p tsconfig.production.json
else
lerna exec --concurrency 1 --no-bail --stream -- tsc -p .
fi
echo "Typescript Build Finished!"