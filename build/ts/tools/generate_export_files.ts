// generate_exports.ts
import { readdir, writeFile } from 'fs/promises';
import { join, relative } from 'path';

async function getAllFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    const items = await readdir(dir, { withFileTypes: true });

    for (const item of items) {
        const path = join(dir, item.name);
        if (item.isDirectory()) {
            files.push(...await getAllFiles(path));
        } else if (item.name.endsWith('.ts')) {
            files.push(path);
        }
    }
    return files;
}

async function generateExports() {
    const workDir = process.cwd();
    const srcDir = join(workDir, 'lib/src');
    const files = await getAllFiles(srcDir);

    // Generate Strata exports
    const strataExports = files
        .filter(file => !file.includes('/google/'))
        .map(file => `export * from '.${relative(workDir + '/lib', file).replace(/\.ts$/, '')}';`)
        .join('\n');
    await writeFile(join(workDir, 'lib/plasma_protobuf.ts'), strataExports);

    // Generate Google exports
    const googleExports = files
        .filter(file => file.includes('/google/'))
        .map(file => `export * from '.${relative(workDir + '/lib', file).replace(/\.ts$/, '')}';`)
        .join('\n');
    await writeFile(join(workDir, 'lib/google_protobuf.ts'), googleExports);
}

generateExports().catch(console.error);