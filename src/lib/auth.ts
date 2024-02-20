import { env } from '@/env'
import { SignJWT, jwtVerify, importPKCS8, importSPKI } from 'jose'

export async function getPrivateKey() {
  const key = Buffer.from(env.JWT_PRIVATE_KEY, 'base64').toString()
  const privateKey = await importPKCS8(key, 'RS256')

  return privateKey
}

export async function getPublicKey() {
  const key = Buffer.from(env.JWT_PUBLIC_KEY, 'base64').toString()
  const publicKey = await importSPKI(key, 'RS256')

  return publicKey
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function encrypt(payload: any) {
  const privateKey = await getPrivateKey()

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(privateKey)
}

export async function decrypt(token: string) {
  const publicKey = await getPublicKey()

  try {
    const { payload } = await jwtVerify(token, publicKey, { algorithms: ['RS256'] })

    return payload
  } catch (error) {
    return null
  }
}
