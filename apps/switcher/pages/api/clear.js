import RedisService from "../../services/RedisService"

export default async function handler(req, res) {
  const redis = new RedisService()
  redis.connect()
  const domain = req.headers.host.split(':')[0]
  const reply = await redis.delete(domain)
  res.status(200).json({ status: true, reply })
}
