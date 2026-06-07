import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN,
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      status: "fail"
    });
  }

  const { fp, botusername } = req.body || {};

  if (!fp || !botusername) {
    return res.json({
      status: "fail",
      message: "Missing Data"
    });
  }

  const key =
    `BOT_${botusername}:FP_${fp}`;

  await redis.del(
  `BOT_${botusername}:FP_${fp}`
);

  return res.json({
    status: "pass",
    message: "Reset Successful"
  });
}
