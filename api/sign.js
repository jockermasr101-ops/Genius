// Vercel Serverless Function: يوقّع رفع Cloudinary للمالك فقط
const crypto = require("crypto");

const hits = new Map();
const limited = (ip) => {
  const n = Date.now(), list = (hits.get(ip) || []).filter((t) => n - t < 60000);
  list.push(n); hits.set(ip, list);
  return list.length > 20;
};

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "method" });
  const ip = String(req.headers["x-forwarded-for"] || "x").split(",")[0].trim();
  if (limited(ip)) return res.status(429).json({ error: "slow down" });
  // لا يقبل إلا طلبات قادمة من نفس الموقع
  const origin = req.headers.origin || "";
  if (origin && origin !== "https://" + req.headers.host) return res.status(403).json({ error: "origin" });
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ error: "no token" });
  if (!process.env.OWNER_EMAIL) return res.status(500).json({ error: "missing", names: ["OWNER_EMAIL"] });
  try {
    const key = process.env.FIREBASE_API_KEY || "AIzaSyDne0ICmp3JiaCBOPBJWeLYz67aFG5DwUc";
    const r = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + key, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: token }),
    });
    const d = await r.json();
    const u = d.users && d.users[0];
    const isPwd = u && (u.providerUserInfo || []).some((p) => p.providerId === "password");
    if (!u || !isPwd || String(u.email || "").toLowerCase() !== process.env.OWNER_EMAIL.trim().toLowerCase())
      return res.status(403).json({ error: "forbidden" });
    // بعد التأكد أنه المالك فقط: نبلغه بأي قيمة ناقصة في Vercel (الأسماء فقط)
    const names = ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"].filter((k) => !process.env[k]);
    if (names.length) return res.status(500).json({ error: "missing", names });
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "abqari";
    const signature = crypto
      .createHash("sha1")
      .update(`folder=${folder}&timestamp=${timestamp}` + process.env.CLOUDINARY_API_SECRET)
      .digest("hex");
    return res.status(200).json({
      signature, timestamp, folder,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (e) {
    return res.status(500).json({ error: "failed" });
  }
};
