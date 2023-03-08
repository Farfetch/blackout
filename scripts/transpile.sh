#!/bin/bash

npx babel --config-file ../../babel.config.js src --out-dir dist --extensions ".ts,.tsx" --ignore "src/**/__tests__","src/**/__fixtures__","src/**/*.d.ts" "$@"