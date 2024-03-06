import { randomUUID } from 'node:crypto'
import axios from 'axios'
import sharp from 'sharp'

import { CompanyLogo } from '@/core/types/company'
import { env } from '@/env'
import { getUploadUrl } from './get-upload-url'

export async function uploadCompanyLogo(image: File) {
  const bannedMimeTypes = [
    '.exe', // (executáveis)
    '.dll', // (bibliotecas dinâmicas)
    '.bat', // (arquivos de lote)
    '.cmd', // (arquivos de comando)
    '.sh', // (scripts shell)
    '.cgi', // (scripts cgi)
    '.jar', // (arquivos jars)
    '.app', // (aplicativos)
  ]

  if (bannedMimeTypes.includes(image.type)) {
    throw new Error('Invalid file type')
  }

  const fileKey = randomUUID().concat('-').concat(image.name.trim().replace(/\s+/g, ''))
  const fileType = image.type
  // const fileName = image.name

  const signedUrl = await getUploadUrl({
    fileType,
    fileKey,
  })

  const buffer = Buffer.from(await image.arrayBuffer())
  const imageBuffer = await sharp(buffer)
    .webp({ quality: 65 })
    .resize(256, 256, {
      fit: 'cover',
      position: 'center',
      background: { r: 255, g: 255, b: 255, alpha: 0.5 },
    })
    .toBuffer()

  await axios.put(signedUrl, imageBuffer, {
    headers: {
      'Content-Type': fileType,
    },
  })

  const uploadedLogo: CompanyLogo = {
    file: fileKey,
    url: String(env.ASSETS_URL).concat('/').concat(fileKey),
  }

  return uploadedLogo
}
