import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {

    const fp = String(req.body?.fp || "").trim();
    const botusername = String(req.body?.botusername || "").trim();

    if (!fp || !botusername) {
      return res.json({
        success: false,
        message: "Missing Data"
      });
    }

    const key =
      `BOT_${botusername}:FP_${fp}`;

    await redis.del(key);

    return res.json({
      success: true,
      deleted: key
    });

  } catch (e) {

    return res.json({
      success: false,
      error: String(e)
    });

  }

}
