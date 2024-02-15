import { randomUUID } from 'node:crypto'
import axios from 'axios'

import { CarouselImage } from '@/core/types/campaign'
import { env } from '@/env'
import { getUploadUrl } from './get-upload-url'
import { CampaignAttachmentsRepository } from '../database/db'

export async function uploadCampaignImage(campaignId: string, image: File) {
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
    return null
  }

  const fileKey = randomUUID().concat('-').concat(image.name)
  const fileType = image.type
  // const fileName = image.name

  const signedUrl = await getUploadUrl({
    fileType,
    fileKey,
  })

  const buffer = Buffer.from(await image.arrayBuffer())

  await axios.put(signedUrl, buffer, {
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
