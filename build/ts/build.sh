#!/bin/sh

# Run the TypeScript script to generate export files
ts-node tools/generate_export_files.ts

# Run the npm build script
npm run build