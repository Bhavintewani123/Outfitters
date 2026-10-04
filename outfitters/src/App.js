import {
  ShopProvider,
  useShop
} from "./context/ShopContext";

import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchOverlay from "./components/SearchOverlay";

import { usePath } from "./components/RouterLink";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Collections from "./pages/Collections";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import {
  About,
  Contact,
  Account,
  Shipping,
  FAQ
} from "./pages/InfoPages";

import "./App.css";


// ============================================================
// CART TOAST
// ============================================================

function CartToast() {

  const {
    cartMessage,
    setCartMessage
  } = useShop();

  if (!cartMessage) {
    return null;
  }

  return (
    <div
      className="cart-toast"
      role="status"
      aria-live="polite"
    >

      <div className="cart-toast-image">

        <img
          src={cartMessage.image}
          alt={cartMessage.name}
        />

      </div>

      <div className="cart-toast-content">

        <strong>
          Item Added To Cart
        </strong>

        <span>
          {cartMessage.name}
        </span>

      </div>

      <button
        type="button"
        className="cart-toast-close"
        onClick={() =>
          setCartMessage(null)
        }
      >
        ×
      </button>

    </div>
  );
}


// ============================================================
// MAIN CONTENT
// ============================================================

function Content() {

  const fullPath = usePath();

  const [
    pathname,
    search
  ] = fullPath.split("?");

  const query =
    new URLSearchParams(
      search || ""
    );

  const gender =
    query.get("gender");

  const category =
    query.get("category");

  let page;


  // HOME

  if (pathname === "/") {

    page = <Home />;

  }


  // SHOP

  else if (pathname === "/shop") {

    page = (
      <Shop
        gender={gender}
        category={category}
      />
    );

  }


  // COLLECTIONS

  else if (
    pathname === "/collections"
  ) {

    page = <Collections />;

  }


  // NEW ARRIVALS

  else if (
    pathname === "/new-arrivals"
  ) {

    page = (
      <Shop
        mode="new"
      />
    );

  }


  // BEST SELLERS

  else if (
    pathname === "/best-sellers"
  ) {

    page = (
      <Shop
        mode="best"
      />
    );

  }


  // SALE

  else if (
    pathname === "/sale"
  ) {

    page = (
      <Shop
        mode="sale"
      />
    );

  }


  // WISHLIST

  else if (
    pathname === "/wishlist"
  ) {

    page = <Wishlist />;

  }


  // CART

  else if (
    pathname === "/cart"
  ) {

    page = <Cart />;

  }


  // CHECKOUT

  else if (
    pathname === "/checkout"
  ) {

    page = <Checkout />;

  }


  // ABOUT

  else if (
    pathname === "/about"
  ) {

    page = <About />;

  }


  // CONTACT

  else if (
    pathname === "/contact"
  ) {

    page = <Contact />;

  }


  // ACCOUNT

  else if (
    pathname === "/account"
  ) {

    page = <Account />;

  }


  // SHIPPING

  else if (
    pathname === "/shipping"
  ) {

    page = <Shipping />;

  }


  // FAQ

  else if (
    pathname === "/faq"
  ) {

    page = <FAQ />;

  }


  // PRODUCT

  else if (
    pathname.startsWith(
      "/product/"
    )
  ) {

    const productId =
      pathname.split("/")[2];

    page = (
      <ProductDetails
        id={productId}
      />
    );

  }


  // PAGE NOT FOUND

  else {

    page = (
      <div className="empty-state container">

        <h1>
          Page not found
        </h1>

        <a
          className="btn btn-dark"
          href="/"
          onClick={e => {

            e.preventDefault();

            window.history.pushState(
              {},
              "",
              "/"
            );

            window.dispatchEvent(
              new PopStateEvent(
                "popstate"
              )
            );

            window.scrollTo(
              0,
              0
            );

          }}
        >
          BACK HOME
        </a>

      </div>
    );
  }


  // ==========================================================
  // LAYOUT
  // ==========================================================

  return (
    <>
      <AnnouncementBar />

      <Header />

      {page}

      <Footer />

      <SearchOverlay />

      {/* CART POPUP */}
      <CartToast />
    </>
  );
}


// ============================================================
// APP
// ============================================================

export default function App() {

  return (
    <ShopProvider>

      <Content />

    </ShopProvider>
  );
}