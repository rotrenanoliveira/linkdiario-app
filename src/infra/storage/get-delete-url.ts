import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { env } from '@/env'
import { r2 } from '@/lib/cloudflare'

export async function deleteUploadUrl(fileKey: string) {
  const signedUrl = getSignedUrl(
    r2,
    new DeleteObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: fileKey,
    }),
    { expiresIn: 600 },
  )

  return signedUrl
}
