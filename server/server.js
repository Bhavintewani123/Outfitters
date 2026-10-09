require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true, // connection reuse, next mails fast jayengi
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const inr = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

// Customer input HTML me jaata hai, isliye escape karna zaroori hai
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));

// Email me images ka PUBLIC absolute URL chahiye (localhost ya relative path nahi chalega)
const absoluteImage = (src) => {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  const base = (process.env.SITE_URL || "").replace(/\/$/, "");
  return base + (src.startsWith("/") ? src : "/" + src);
};

// Har product ki image download karke mail ke andar embed karta hai (CID attachment)
async function prepareImages(items) {
  const attachments = [];

  const srcs = await Promise.all(
    items.map(async (item, idx) => {
      const url = absoluteImage(item.image);
      if (!url) return "";

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("HTTP " + response.status);

        const buffer = Buffer.from(await response.arrayBuffer());
        const type = response.headers.get("content-type") || "image/jpeg";
        const ext = (type.split("/")[1] || "jpg").split(";")[0].replace("jpeg", "jpg");
        const cid = `item${idx}@outfitters`;

        attachments.push({
          filename: `product-${idx + 1}.${ext}`,
          content: buffer,
          contentType: type,
          cid
        });

        return "cid:" + cid;
      } catch (err) {
        console.warn("Image embed failed:", url, err.message);
        return url; // fallback: normal URL
      }
    })
  );

  return { attachments, srcs };
}

function buildEmailHtml(order, orderId, imageSrcs) {
  const { items, customer, payment, shipping } = order;

  const subtotal = items.reduce(
    (sum, i) => sum + Number(i.price) * Number(i.quantity),
    0
  );
  const shippingCost = Number(shipping || 0);
  const total = subtotal + shippingCost;

  const rows = items
    .map(
      (i, idx) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #eee;width:90px;">
          <img src="${esc(imageSrcs[idx] || "")}" alt="${esc(i.name)}"
               width="80" style="display:block;width:80px;height:100px;object-fit:cover;" />
        </td>
        <td style="padding:12px;border-bottom:1px solid #eee;font-size:14px;">
          <strong>${esc(i.name)}</strong><br/>
          <span style="color:#777;font-size:12px;">
            ${esc(i.category)} · Size ${esc(i.size)} · Qty ${esc(i.quantity)}
          </span><br/>
          <span style="color:#777;font-size:12px;">${inr(i.price)} each</span>
        </td>
        <td style="padding:12px 0;border-bottom:1px solid #eee;text-align:right;font-size:14px;font-weight:bold;">
          ${inr(Number(i.price) * Number(i.quantity))}
        </td>
      </tr>`
    )
    .join("");

  return `
  <div style="max-width:620px;margin:auto;font-family:Arial,Helvetica,sans-serif;color:#111;">
    <h1 style="font-size:24px;margin-bottom:4px;">Outfitters.</h1>
    <p style="margin:0 0 20px;color:#555;">Order confirmed 🎉 &nbsp;|&nbsp; Order ID: <strong>${esc(orderId)}</strong></p>

    <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;font-size:14px;">
      <tr><td style="padding:4px 0;">Subtotal</td><td style="text-align:right;">${inr(subtotal)}</td></tr>
      <tr><td style="padding:4px 0;">Shipping</td><td style="text-align:right;">${shippingCost ? inr(shippingCost) : "FREE"}</td></tr>
      <tr><td style="padding:10px 0;border-top:1px solid #ddd;font-size:16px;"><strong>Total</strong></td>
          <td style="padding:10px 0;border-top:1px solid #ddd;text-align:right;font-size:16px;"><strong>${inr(total)}</strong></td></tr>
    </table>

    <h3 style="margin:28px 0 8px;">Delivery details</h3>
    <p style="margin:0;font-size:14px;line-height:1.7;">
      <strong>${esc(customer.name)}</strong><br/>
      ${esc(customer.address)}<br/>
      ${esc(customer.city)}${customer.state ? ", " + esc(customer.state) : ""} - ${esc(customer.pincode)}<br/>
      Phone: ${esc(customer.phone)}<br/>
      Email: ${esc(customer.email)}
    </p>

    <h3 style="margin:24px 0 8px;">Payment</h3>
    <p style="margin:0;font-size:14px;">${esc(payment || "N/A")}</p>
  </div>`;
}

// Images download + mail bhejna (response ke baad background me chalta hai)
async function deliverOrderEmail(order, orderId, recipients) {
  try {
    const { attachments, srcs } = await prepareImages(order.items);

    await transporter.sendMail({
      from: `"Outfitters" <${process.env.GMAIL_USER}>`,
      to: recipients,
      subject: `New Order ${orderId} - ${order.customer.name}`,
      html: buildEmailHtml(order, orderId, srcs),
      attachments
    });

    console.log("Order email sent:", orderId);
  } catch (err) {
    console.error("Order email failed:", orderId, err);
  }
}

app.post("/api/send-order", async (req, res) => {
  try {
    const order = req.body;

    if (!order?.items?.length || !order?.customer) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    const orderId = "OUT-" + Date.now().toString().slice(-8);

    // Owner (tumhara Gmail) + customer dono ko jayega
    const recipients = [process.env.GMAIL_USER];
    if (order.customer.email) recipients.push(order.customer.email);

    // Customer ko turant response do, mail background me bhejo
    res.json({ success: true, orderId });

    deliverOrderEmail(order, orderId, recipients);
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err.message));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));