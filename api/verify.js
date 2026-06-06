import { kv } from "@vercel/kv";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ status: "fail", message: "Method Not Allowed" });
  }

  const { fp, botId } = req.body || {};

  if (!fp || typeof fp !== "string" || fp.trim() === "") {
    return res.json({ status: "fail", message: "Fingerprint Missing" });
  }

  // botId is required — each bot has its own separate fingerprint space
  if (!botId || typeof botId !== "string" || botId.trim() === "") {
    return res.json({ status: "fail", message: "Bot ID Missing" });
  }

  const cleanFp   = fp.trim();
  const cleanBot  = botId.trim().replace(/[^a-zA-Z0-9_]/g, ""); // sanitize
  const key       = `BOT_${cleanBot}:FP_${cleanFp}`;            // e.g. BOT_CashLoot:FP_abc123

  // check persistent KV store
  const existing = await kv.get(key);

  if (existing) {
    return res.json({ status: "fail", message: "Device already used" });
  }

  // save permanently under this bot's namespace
  await kv.set(key, "1");

  return res.json({ status: "pass", message: "Verified Successfully" });
}
