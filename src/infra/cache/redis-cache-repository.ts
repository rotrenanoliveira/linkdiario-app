import { upstashRedis } from '@/lib/upstash-redis'

const cache = upstashRedis

export const RedisCacheRepository = {
  async set(key: string, value: string): Promise<void> {
    await cache.set(key, value, {
      ex: 60 * 1 * 1440, // 1 day
    })
  },
  async get<T = string>(key: string): Promise<T | null> {
    return await cache.get<T>(key)
  },
  async delete(key: string): Promise<void> {
    await cache.del(key)
  },
}
