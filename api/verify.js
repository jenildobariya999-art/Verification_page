const store = {}; // in-memory device store (resets on cold start)

export default function handler(req, res) {

  // only accept POST
  if (req.method !== "POST") {
    return res.status(405).json({ status: "fail", message: "Method Not Allowed" });
  }

  const { fp } = req.body || {};

  if (!fp || typeof fp !== "string" || fp.trim() === "") {
    return res.json({ status: "fail", message: "Fingerprint Missing" });
  }

  const cleanFp = fp.trim();

  // same device check
  if (store[cleanFp]) {
    return res.json({ status: "fail", message: "Device already used" });
  }

  // save new device
  store[cleanFp] = true;

  return res.json({ status: "pass", message: "Verified Successfully" });
}
