import sharp from 'sharp'
import { mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const INPUT = join(__dirname, 'public', 'logo.png')
const OUTPUT = join(__dirname, 'public', 'icons')

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

mkdirSync(OUTPUT, { recursive: true })

for (const size of SIZES) {
  await sharp(INPUT)
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(join(OUTPUT, `icon-${size}.png`))

  console.log(`icon-${size}.png`)
}

console.log('\nAll PWA icons generated in public/icons/')