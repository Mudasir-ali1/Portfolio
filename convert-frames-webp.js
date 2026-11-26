/**
 * convert-frames-webp.js
 * Converts all /public/frames/*.jpg to /public/frames/*.webp
 * using Sharp (quality 78, effort 4 for speed).
 * Run: node convert-frames-webp.js
 */

import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const framesDir = resolve(__dirname, 'public', 'frames')

const files = (await readdir(framesDir)).filter((f) => f.endsWith('.jpg'))
console.log(`Converting ${files.length} frames to WebP…`)

let done = 0
await Promise.all(
  files.map(async (file) => {
    const src = join(framesDir, file)
    const dest = join(framesDir, file.replace('.jpg', '.webp'))
    await sharp(src)
      .webp({ quality: 78, effort: 4 })
      .toFile(dest)
    done++
    if (done % 20 === 0 || done === files.length) {
      process.stdout.write(`  ${done}/${files.length}\r`)
    }
  })
)

console.log(`\nDone. ${done} WebP files written.`)

