// generate_exports_files.ts
import { mkdir, readdir, writeFile } from 'fs/promises'
import { join, relative } from 'path'

async function getAllFiles (dir: string): Promise<string[]> {
  const files: string[] = []
  const items = await readdir(dir, { withFileTypes: true })

  for (const item of items) {
    const path = join(dir, item.name)
    if (item.isDirectory()) {
      files.push(...(await getAllFiles(path)))
    } else if (item.name.endsWith('.ts')) {
      files.push(path)
    }
  }
  return files
}

async function generateExports () {
  const workDir = process.cwd()
  const srcDir = join(workDir, 'proto')
  const files = await getAllFiles(srcDir)

  const exportMap = new Map<string, Set<string>>()

  files.forEach(file => {
    const relativePath = relative(workDir + '/src', file)
      .replace(/\.ts$/, '')
      .replace(/\\/g, '/')
    const fileName = relativePath.split('/').pop() || ''

    if (!exportMap.has(fileName)) {
      exportMap.set(fileName, new Set())
    }
    exportMap.get(fileName)!.add(relativePath)
  })

  const generateExportStatements = (entries: [string, Set<string>][]) => {
    const exportStatements: string[] = []
    const usedNames = new Set<string>()

    entries.forEach(([fileName, paths]) => {
      paths.forEach(path => {
        exportStatements.push(`export * from '${path}';`)
      })
    })

    return exportStatements.join('\n')
  }

  // Check full path for google, not just filename
  const isGooglePath = (filePath: string) => {
    const normalizedPath = filePath.replace(/\\/g, '/')
    return normalizedPath.includes('/google/')
  }

  const plasmaExports = generateExportStatements(
    Array.from(exportMap.entries()).filter(
      ([_, paths]) => ![...paths].some(path => isGooglePath(path))
    )
  )

  const googleExports = generateExportStatements(
    Array.from(exportMap.entries()).filter(([_, paths]) =>
      [...paths].some(path => isGooglePath(path))
    )
  )

  const outputDir = join(workDir, 'src')
  await mkdir(outputDir, { recursive: true })

  await writeFile(join(outputDir, 'plasma_protobuf.ts'), plasmaExports)
  await writeFile(join(outputDir, 'google_protobuf.ts'), googleExports)

  console.log('Generated exports:')
  console.log('Plasma exports:', plasmaExports.split('\n').length)
  console.log('Google exports:', googleExports.split('\n').length)

  await generateIndexFile(outputDir)
}

async function generateIndexFile (outputDir: string) {
  const indexContent = `
export * from './plasma_protobuf';
export * as google from './google_protobuf';
  `.trim()

  await writeFile(join(outputDir, 'index.ts'), indexContent)
  console.log('Generated index.ts')
}

generateExports().catch(console.error)
