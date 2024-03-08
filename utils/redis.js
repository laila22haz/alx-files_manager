import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (err) => {
            console.log(`Redis client not connected to the server: ${err}`);
        });
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setAsync = promisify(this.client.setex).bind(this.client);
        this.delAsync = promisify(this.client.del).bind(this.client);
    }
    isAlive() {
        if (this.client) return true;
        else return false;
    }
    async get(key) {
        try {
            const value = await this.getAsync(key);
            return value;
        } catch (err) {
            console.log(err);
        }
    }
    async set(key, value, duration) {
        try {
            await this.setAsync(key, duration, value);
        } catch (err) {
            console.log(err);
        }
    }
    async del(key) {
        try {
            await this.delAsync(key);
        } catch (err) {
            console.log(err);
        }
    }
}

const redisClient = new RedisClient();

export default redisClient;