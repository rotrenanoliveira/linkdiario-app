import { randomUUID } from 'node:crypto'
import axios from 'axios'
import sharp from 'sharp'

import { CarouselImage } from '@/core/types/campaign'
import { env } from '@/env'
import { getUploadUrl } from './get-upload-url'
import { CampaignAttachmentsRepository } from '../database/db'

export async function uploadCampaignAttachment(campaignId: string, image: File) {
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
    throw new Error('Tipo de arquivo inválido')
  }

  const fileKey = randomUUID().concat('-').concat(image.name)
  const fileType = image.type
  // const fileName = image.name

  const signedUrl = await getUploadUrl({
    fileType,
    fileKey,
  })

  const buffer = Buffer.from(await image.arrayBuffer())
  const imageBuffer = await sharp(buffer)
    .webp({ quality: 80 })
    .resize(352, 448, {
      fit: 'cover',
    })
    .toBuffer()

  await axios.put(signedUrl, imageBuffer, {
    headers: {
      'Content-Type': fileType,
    },
  })

  await CampaignAttachmentsRepository.create({
    name: image.name,
    key: fileKey,
    campaignId,
  })

  const attachment: CarouselImage = {
    file: fileKey,
    url: String(env.ASSETS_URL).concat('/').concat(fileKey),
  }

  return attachment
}
