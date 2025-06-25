import { promisify } from 'util';
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.redisClient = createClient();
    this.setRedisConnection = true;
    this.redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
      this.setRedisConnection = false;
    });

    this.redisClient.on('connect', () => {
        this.setRedisConnection = true;
      });

  }

  isAlive() {
    return this.setRedisConnection;
  }

  async get(key) {
    return promisify(this.redisClient.GET).bind(this.redisClient)(key);
  }

  async set(key, value, duration) {
    await promisify(this.redisClient.SETEX)
      .bind(this.redisClient)(key, duration, value);
  }

  async del(key) {
    await promisify(this.redisClient.DEL).bind(this.redisClient)(key);
}
}

const redisClient = new RedisClient();
export default redisClient;
