#!/bin/sh

# initialize packages
npm install

# Update package.json version based on the GitHub version tag
node tools/update_version.js $1

# Run the TypeScript script to generate export files
ts-node tools/generate_export_files.ts

# Run the npm build script
npm run build