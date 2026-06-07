import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
});

export default async function handler(req, res) {

  const { fp, botusername } = req.body;

  await redis.del(
    `BOT_${botusername}:FP_${fp}`
  );

  return res.json({
    status: "ok"
  });
}
