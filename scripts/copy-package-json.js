/* eslint-disable */
const path = require('path');
const fse = require('fs-extra');

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './dist');

/**
 * Creates a package.json file in the build directory that contains the correct
 * data necessary for consumption, i.e., adds "main" and "types" fields pointing to
 * the compiled files.
 */
async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  const { scripts, devDependencies, ...packageDataOther } =
    JSON.parse(packageData);

  const newPackageData = {
    ...packageDataOther,
    main: './index.js',
    types: './index.d.ts',
  };

  const targetPath = path.resolve(buildPath, './package.json');

  await fse.writeFile(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${targetPath}`);
}

async function run() {
  try {
    await createPackageFile();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
