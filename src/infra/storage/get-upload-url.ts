import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/cloudflare'
import { env } from '@/env'

type UploadProps = {
  fileKey: string
  fileType: string
}

export async function getUploadUrl({ fileKey, fileType }: UploadProps) {
  const signedUrl = getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: fileKey,
      ContentType: fileType,
      ACL: 'public-read',
    }),
    { expiresIn: 600 }, // 10 minutes
  )

  return signedUrl
}
