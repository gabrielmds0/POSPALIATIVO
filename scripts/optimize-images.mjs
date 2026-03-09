import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const source = 'imagens/DOUTORES.webp'
const outputDir = 'imagens/optimized'

const outputs = [
  { name: 'doutores-640', width: 640, webpQuality: 60, avifQuality: 42 },
  { name: 'doutores-720', width: 720, webpQuality: 62, avifQuality: 44 },
  { name: 'doutores-960', width: 960, webpQuality: 62, avifQuality: 44 },
  { name: 'doutores-1400', width: 1400, webpQuality: 65, avifQuality: 46 },
]

await fs.mkdir(outputDir, { recursive: true })

for (const output of outputs) {
  const base = sharp(source)
    .rotate()
    .resize({ width: output.width, withoutEnlargement: true })

  await base
    .clone()
    .webp({ quality: output.webpQuality, effort: 6 })
    .toFile(path.join(outputDir, `${output.name}.webp`))

  await base
    .clone()
    .avif({ quality: output.avifQuality, effort: 6 })
    .toFile(path.join(outputDir, `${output.name}.avif`))
}

console.log('Optimized images generated in imagens/optimized')
