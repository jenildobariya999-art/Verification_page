import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      status: "fail",
      message: "Method Not Allowed"
    });
  }

  const { fp, botusername } = req.body || {};

  if (!fp || fp.trim() === "") {
    return res.json({
      status: "fail",
      message: "Fingerprint Missing"
    });
  }

  if (!botusername || botusername.trim() === "") {
    return res.json({
      status: "fail",
      message: "Bot Username Missing"
    });
  }

  try {

    const cleanFp = fp.trim();

    const cleanBot =
      botusername
      .trim()
      .replace(/[^a-zA-Z0-9_]/g, "");

    const key =
      `BOT_${cleanBot}:FP_${cleanFp}`;

    const existing =
      await redis.get(key);

    if (existing) {

      return res.json({
        status: "fail",
        message: "Device already used"
      });

    }

    await redis.set(key, "1");

    return res.json({
      status: "pass",
      message: "Verified Successfully"
    });

  } catch (e) {

    return res.json({
      status: "fail",
      message: "Server Error"
    });

  }

}
