import { Link } from "../components/RouterLink";

/* =====================================================
   ABOUT
===================================================== */

export function About() {
  return (
    <main className="container info-page">
      <div className="page-intro">
        <span className="eyebrow">THE STORY</span>
        <h1>Clothes with a point of view.</h1>
        <p>
          OUTFITTERS is a concept fashion store built around everyday pieces,
          expressive styling and a wardrobe that works harder for you.
        </p>
      </div>

      <div className="info-image">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1500&q=85"
          alt="Fashion editorial"
        />
      </div>

      <div className="info-copy">
        <h2>Wear your own story.</h2>
        <p>
          Good style does not need to be complicated. Our collections balance
          clean essentials with statement pieces so you can build outfits that
          feel personal.
        </p>
        <Link to="/collections" className="btn btn-dark">
          EXPLORE COLLECTIONS
        </Link>
      </div>
    </main>
  );
}

/* =====================================================
   CONTACT
===================================================== */

export function Contact() {
  return (
    <main className="container contact-page">
      <div className="page-intro left">
        <span className="eyebrow">WE'D LOVE TO HEAR FROM YOU</span>
        <h1>Get in touch.</h1>
        <p>Questions, collaborations or feedback? Send us a message.</p>
      </div>

      <div className="contact-layout">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks! Your message has been received in this demo.");
            e.currentTarget.reset();
          }}
        >
          <input required placeholder="Your name" />
          <input required type="email" placeholder="Email address" />

          <select defaultValue="">
            <option value="" disabled>
              What can we help with?
            </option>
            <option>Order support</option>
            <option>Collaboration</option>
            <option>General enquiry</option>
          </select>

          <textarea required rows="6" placeholder="Your message" />

          <button className="btn btn-dark">SEND MESSAGE</button>
        </form>

        <div className="contact-details">
          <h2>OUTFITTERS</h2>
          <p>
            Monday — Saturday
            <br />
            10:00 — 18:00 IST
          </p>
          <p>
            hello@outfitters.example
            <br />
            Vadodara, India
          </p>
        </div>
      </div>
    </main>
  );
}

/* =====================================================
   ACCOUNT
===================================================== */

export function Account() {
  return (
    <main className="container simple-page">
      <span className="eyebrow">YOUR SPACE</span>
      <h1>My account</h1>
      <p>
        Account sign-in can be connected to your preferred authentication
        service later. For now, continue shopping as a guest.
      </p>
      <Link to="/shop" className="btn btn-dark">
        CONTINUE SHOPPING
      </Link>
    </main>
  );
}

/* =====================================================
   SHIPPING & RETURNS
===================================================== */

export function Shipping() {
  return (
    <main className="container simple-page">
      <span className="eyebrow">DELIVERY</span>
      <h1>Shipping & returns</h1>

      <div className="faq-list">
        <details open>
          <summary>Shipping</summary>
          <p>
            Orders above ₹999 ship free. Orders below ₹999 have a ₹199
            shipping charge.
          </p>
        </details>

        <details>
          <summary>Returns</summary>
          <p>
            Eligible products can be returned within 15 days of delivery.
            Items must be unused, unwashed and have their original tags.
          </p>
        </details>
      </div>
    </main>
  );
}

/* =====================================================
   FAQ
===================================================== */

export function FAQ() {
  const faqs = [
    {
      q: "How do I choose my size?",
      a: "Every product page lists the available sizes. Measure your bust, waist and hips and pick the size that matches. If you are between two sizes, we suggest going one size up for a relaxed fit."
    },
    {
      q: "Can I cancel an order?",
      a: "Yes, you can cancel your order before it is shipped. Write to us at hello@outfitters.example with your order details and we will take care of it. Once an order has shipped, you can return it after delivery."
    },
    {
      q: "Do you offer cash on delivery?",
      a: "Yes, Cash on Delivery is available at checkout. You can pay in cash when your order arrives."
    },
    {
      q: "What is your return policy?",
      a: "You can request a return within 15 days of delivery. Items must be unused, unwashed and have their original tags. Once we receive the item, your refund is processed within 5-7 working days."
    }
  ];

  return (
    <main className="container simple-page">
      <span className="eyebrow">NEED TO KNOW</span>
      <h1>Frequently asked questions</h1>

      <div className="faq-list">
        {faqs.map((item, i) => (
          <details key={item.q} open={i === 0}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </main>
  );
}