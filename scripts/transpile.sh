#!/bin/bash

npx babel --config-file ../../babel.config.js src --out-dir dist --extensions ".ts" --ignore "src/**/__tests__","src/**/__fixtures__","src/**/*.d.ts" "$@"
npx babel --config-file ../../babel.config.js src --out-dir dist --extensions ".tsx" --out-file-extension ".jsx" --ignore "src/**/__tests__","src/**/__fixtures__","src/**/*.d.ts" "$@"