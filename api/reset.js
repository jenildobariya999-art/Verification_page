import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {

  const { fp, botusername } = req.body;

  const key =
    `BOT_${botusername}:FP_${fp}`;

  await redis.del(key);

  return res.json({
    success: true
  });

}
