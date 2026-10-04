const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function sendOrderEmail(order) {
  // Server 5 second me jawab na de to customer ko wait na karna pade
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(`${API_URL}/api/send-order`, {
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