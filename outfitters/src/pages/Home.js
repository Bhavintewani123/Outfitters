import { Link } from "../components/RouterLink";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import CustomerVideoReviews from "../components/CustomerVideoReviews";

export default function Home() {
  return (
    <main>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero">

        <div className="hero-copy">

          <span className="eyebrow">
            THE NEW EVERYDAY EDIT
          </span>

          <h1>
            WEAR<br />
            YOUR<br />
            OWN<br />
            STORY.
          </h1>

          <p>
            Everyday pieces designed for people who dress
            with their own point of view.
          </p>

          <div className="hero-buttons">

            <Link
              to="/new-arrivals"
              className="btn btn-dark"
            >
              SHOP NEW ARRIVALS
            </Link>

            <Link
              to="/collections"
              className="btn btn-outline"
            >
              EXPLORE COLLECTIONS
            </Link>

          </div>

          <ul className="hero-trust">
            <li>✦ Free shipping ₹999+</li>
            <li>✦ Easy 15-day returns</li>
            <li>✦ 10k+ happy customers</li>
          </ul>

        </div>

        <div className="hero-image">

          <img
            src={process.env.PUBLIC_URL + "/hero.jpg"}
            alt="Floral fashion campaign"
          />


          {/* CAPTION */}
          <div className="hero-caption">
            <span className="hero-caption-line"></span>
            <p>
              Floral Wrap Dress<br />
              From the Everyday Edit
            </p>
          </div>

        </div>

      </section>


      {/* =====================================================
          NEW PRODUCTS
      ===================================================== */}

      <section className="section container">

        <div className="section-title">

          <span>
            JUST IN
          </span>

          <h2>
            New pieces, new energy
          </h2>

          <p>
            Fresh silhouettes selected for your everyday rotation.
          </p>

        </div>


        <div className="product-grid">

          {products
            .slice(0, 4)
            .map(product => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

        </div>


        <div className="center-action">

          <Link
            to="/new-arrivals"
            className="text-link"
          >
            VIEW ALL NEW ARRIVALS →
          </Link>

        </div>

      </section>


      {/* =====================================================
          EDITORIAL
      ===================================================== */}

      <section className="editorial">

        <div className="editorial-image">

          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85"
            alt="Fashion editorial"
          />

        </div>


        <div className="editorial-copy">

          <span className="eyebrow">
            THE STREET EDIT
          </span>

          <h2>
            Less effort.<br />
            More attitude.
          </h2>

          <p>
            Relaxed tailoring, strong basics and pieces that
            work together without looking too planned.
          </p>

          <Link
            to="/collections"
            className="btn btn-dark"
          >
            SHOP THE EDIT
          </Link>

        </div>

      </section>


      {/* =====================================================
          OUTFITTERS STANDARD
      ===================================================== */}

      <section className="section container">

        <div className="section-title">

          <span>
            THE OUTFITTERS STANDARD
          </span>

          <h2>
            Designed around real wardrobes
          </h2>

        </div>


        <div className="values-grid">

          <div>

            <b>01</b>

            <h3>
              Easy to wear
            </h3>

            <p>
              Versatile pieces built for repeat wears
              and different moods.
            </p>

          </div>


          <div>

            <b>02</b>

            <h3>
              Made to mix
            </h3>

            <p>
              Colour, shape and texture are considered
              to work across your wardrobe.
            </p>

          </div>


          <div>

            <b>03</b>

            <h3>
              Always personal
            </h3>

            <p>
              Style is yours. We make the pieces;
              you make the story.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CUSTOMER VIDEO REVIEWS
      ===================================================== */}

      <CustomerVideoReviews />

    </main>
  );
}