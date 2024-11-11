import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Get the version tag from the command line arguments
const versionTag = process.argv[2];

// Exit early if no version tag is provided
if (!versionTag) {
    console.log('No version tag provided. Skipping version update.');
    process.exit(0);
  }

// Path to the package.json file
const packageJsonPath = join(__dirname, '../package.json');

// Read the package.json file
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

// Update the version in package.json
packageJson.version = versionTag;

// Write the updated package.json back to the file
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`Updated package.json to version ${versionTag}`);