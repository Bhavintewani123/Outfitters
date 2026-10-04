import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { navigateTo } from "../components/RouterLink";
import { sendOrderEmail } from "../utils/orderApi";

const PAYMENT_LABELS = {
  cod: "Cash on Delivery",
  gpay: "GPay",
  paytm: "Paytm",
  card: "Card"
};

const PAYMENT_OPTIONS = [
  ["cod", "Cash on Delivery", "Pay when delivered"],
  ["gpay", "GPay", "Fast & secure"],
  ["paytm", "Paytm", "Fast & secure"],
  ["card", "Card", "Credit / Debit Card"]
];

/* ============================================================
   VALIDATION
   ============================================================ */

const NAME_RE = /^[\p{L}][\p{L} .'-]*$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/;      // Indian 10-digit mobile
const PINCODE_RE = /^[1-9]\d{5}$/;    // Indian 6-digit PIN

function validate(f) {
  const e = {};

  const first = f.firstName.trim();
  const last = f.lastName.trim();
  const address = f.address.trim();
  const city = f.city.trim();

  if (first.length < 2 || !NAME_RE.test(first)) {
    e.firstName = "Enter a valid first name";
  }

  if (last && !NAME_RE.test(last)) {
    e.lastName = "Enter a valid last name";
  }

  if (!EMAIL_RE.test(f.email.trim())) {
    e.email = "Enter a valid email address (e.g. name@gmail.com)";
  }

  if (address.length < 10) {
    e.address = "Enter your full address (house no., street, area)";
  }

  if (city.length < 2 || !NAME_RE.test(city)) {
    e.city = "Enter a valid city";
  }

  if (!PINCODE_RE.test(f.pincode)) {
    e.pincode = "Enter a valid 6-digit PIN code";
  }

  if (!PHONE_RE.test(f.phone)) {
    e.phone = "Enter a valid 10-digit mobile number";
  }

  return e;
}

/* ============================================================
   INPUT WITH ERROR MESSAGE
   (component ko bahar rakha hai, warna typing me focus chala jata hai)
   ============================================================ */

function Field({ name, placeholder, value, onChange, error, full, ...rest }) {
  return (
    <div className={full ? "full-field" : ""}>
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? "input-error" : ""}
        {...rest}
      />

      {error && <small className="field-error">{error}</small>}
    </div>
  );
}

/* ============================================================
   CHECKOUT
   ============================================================ */

export default function Checkout() {
  const { cart, subtotal, shipping, total, clearCart } = useShop();

  const [pay, setPay] = useState("gpay");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [placed, setPlaced] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;

    // Phone aur PIN me sirf digits allowed
    if (name === "phone" || name === "pincode") {
      value = value.replace(/\D/g, "");
    }

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePayment = async () => {
    if (sending) return;

    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      return;
    }

    setSending(true);

    const order = {
      items: cart.map((item) => ({
        name: item.name,
        category: item.category,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      })),
      shipping: shipping || 0,
      payment: PAYMENT_LABELS[pay],
      customer: {
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        email: form.email.trim().toLowerCase(),
        phone: "+91 " + form.phone,
        address: form.address.trim(),
        city: form.city.trim(),
        state: "",
        pincode: form.pincode
      }
    };

    try {
      await sendOrderEmail(order);
    } catch (err) {
      // Mail fail ho to bhi order flow chalne do
      console.error("Order email failed:", err);
    }

    setPlaced({ payment: pay, total });
    setSending(false);
    setDone(true);
    clearCart();
  };

  /* ---------- EMPTY BAG ---------- */

  if (!cart.length && !done) {
    return (
      <div className="empty-state container">
        <h1>Your bag is empty.</h1>

        <button
          className="btn btn-dark"
          onClick={() => navigateTo("/shop")}
        >
          SHOP NOW
        </button>
      </div>
    );
  }

  /* ---------- SUCCESS ---------- */

  if (done) {
    const isCod = placed?.payment === "cod";

    return (
      <main className="success-page container">
        <div>
          <span className="success-icon">✓</span>

          <span className="eyebrow">ORDER CONFIRMED</span>

          <h1>Thanks for your order.</h1>

          <p>
            {isCod
              ? `Please keep ₹${Number(placed.total).toLocaleString("en-IN")} ready to pay in cash when your order is delivered.`
              : "This demo checkout does not process a real payment."}
          </p>

          <button
            className="btn btn-dark"
            onClick={() => navigateTo("/")}
          >
            BACK TO HOME
          </button>
        </div>
      </main>
    );
  }

  /* ---------- CHECKOUT ---------- */

  const buttonLabel =
    pay === "cod"
      ? `PLACE ORDER · ₹${total.toLocaleString("en-IN")}`
      : `MAKE A PAYMENT · ₹${total.toLocaleString("en-IN")}`;

  return (
    <main className="container checkout-page">

      <div className="page-intro left">
        <span className="eyebrow">SECURE CHECKOUT</span>
        <h1>Make a payment</h1>
        <p>Demo payment interface — no real transaction will be processed.</p>
      </div>

      <div className="checkout-layout">

        <div className="checkout-form">

          <h2>Contact & delivery</h2>

          <div className="form-grid">

            <Field
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />

            <Field
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />

            <Field
              full
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Field
              full
              name="address"
              placeholder="Full address (house no., street, area)"
              value={form.address}
              onChange={handleChange}
              error={errors.address}
            />

            <Field
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              error={errors.city}
            />

            <Field
              name="pincode"
              placeholder="PIN code"
              inputMode="numeric"
              maxLength={6}
              value={form.pincode}
              onChange={handleChange}
              error={errors.pincode}
            />

            <Field
              full
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Mobile number (10 digits)"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
            />

          </div>

          <h2>Payment method</h2>

          <div className="payment-options">
            {PAYMENT_OPTIONS.map((x) => (
              <button
                key={x[0]}
                type="button"
                className={
                  pay === x[0]
                    ? "payment-option active"
                    : "payment-option"
                }
                onClick={() => setPay(x[0])}
              >
                <b>{x[1]}</b>
                <small>{x[2]}</small>
              </button>
            ))}
          </div>

          {pay === "card" && (
            <div className="form-grid">
              <input
                className="full-field"
                placeholder="Card number"
              />

              <input placeholder="MM / YY" />

              <input placeholder="CVV" />
            </div>
          )}

          {pay === "cod" && (
            <p className="cod-note">
              Pay in cash when your order arrives. Please keep the exact
              amount ready.
            </p>
          )}

          <button
            className="btn btn-dark full"
            onClick={handlePayment}
            disabled={sending}
          >
            {sending ? "PLACING ORDER..." : buttonLabel}
          </button>

        </div>

        <aside className="summary">

          <h2>Your order</h2>

          {cart.map((i) => (
            <div className="checkout-item" key={i.key}>

              <img src={i.image} alt="" />

              <span>
                {i.name} × {i.quantity}
                <small>{i.size}</small>
              </span>

              <strong>
                ₹{(i.price * i.quantity).toLocaleString("en-IN")}
              </strong>

            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <strong>{shipping ? `₹${shipping}` : "FREE"}</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>

        </aside>

      </div>

    </main>
  );
}