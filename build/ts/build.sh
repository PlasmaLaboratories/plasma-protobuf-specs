#!/bin/sh

# initialize packages
npm ci

# Generate protos
npx buf generate

# install global ts-node runtime
npm install -g ts-node

# Update package.json version based on the GitHub version tag
ts-node tools/update_version.ts $1

# Run the TypeScript script to generate export files
ts-node tools/generate_export_files.ts

# Run the npm build script
npm run build