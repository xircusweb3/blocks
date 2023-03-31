import { createClient } from "redis";

export default class RedisService {
  constructor() {
    this.client = createClient({
      url: process.env.REDIS_UPSTASH_CONFIG
    })
    this.client.on('error', (err) => console.log('Redis Client Error', err))
  }

  async connect() {
    await this.client.connect()
  }

  async disconnect() {
    await this.client.disconnect()
  }
  
  async set(name, data) {
    try {
      await this.client.set(name, data)
    } catch (e) {
      console.log("REDIS SET FAILED", e)
    }
  }

  async get(name, defaultValue) {
    try {
      let data = await this.client.get(name)
      return data
    } catch (e) {
      console.log("REDIS GET FAILED", e)
      return defaultValue
    }
  }

  async delete(keys = []) {
    try {
      await this.client.del(keys)
    } catch (e) {
      console.log("REDIS DELETe FAILED", e)
    }    
  }

  async getJSON(name, ...args) {
    await this.client.connect()    
    const reply = await this.client.json.get(name, ...args)
    await this.client.disconnect()
    return reply
  }

}