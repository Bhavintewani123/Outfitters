// Local (npm start): Express server on port 5000
// Vercel (production): same-site "/api/send-order" serverless function
const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production" ? "" : "http://localhost:5000");

export async function sendOrderEmail(order) {
  // Serverless me images download + mail bhejne me kuch seconds lagte hain,
  // isliye timeout 5s se badha ke 20s kiya
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);

  try {
    const res = await fetch(`/api/send-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      signal: controller.signal
    });

    if (!res.ok) throw new Error("Order email failed");

    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}