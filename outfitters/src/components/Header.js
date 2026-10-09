import { useState } from "react";
import { Link, useNavigate } from "./RouterLink";
import Icon from "./Icon";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";

function Header() {

  const {
    cartCount,
    wishlist,
    setSearchOpen
  } = useShop();

  const { user } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);


  // ============================================================
  // CLOSE MOBILE MENU
  // ============================================================

  function closeMenus() {
    setOpen(false);
  }


  return (

    <header className="site-header">

      <div className="header-inner">


        {/* ======================================================
            LOGO
        ====================================================== */}

        <Link
          to="/"
          className="brand"
          onClick={closeMenus}
        >
          OUTFITTERS
        </Link>


        {/* ======================================================
            MAIN NAVIGATION
        ====================================================== */}

        <nav
          className={`main-nav ${open ? "open" : ""}`}
        >


          {/* ==================================================
              HOME
          ================================================== */}

          <Link
            to="/"
            onClick={closeMenus}
          >
            Home
          </Link>


          {/* ==================================================
              WOMEN
          ================================================== */}

          <Link
            to="/shop?gender=Women"
            onClick={closeMenus}
          >
            Women
          </Link>


          {/* ==================================================
              MEN
          ================================================== */}

          <Link
            to="/shop?gender=Men"
            onClick={closeMenus}
          >
            Men
          </Link>


          {/* ==================================================
              COLLECTIONS
          ================================================== */}

          <Link
            to="/collections"
            onClick={closeMenus}
          >
            Collections
          </Link>


          {/* ==================================================
              NEW ARRIVALS
          ================================================== */}

          <Link
            to="/new-arrivals"
            onClick={closeMenus}
          >
            New Arrivals
          </Link>


          {/* ==================================================
              BEST SELLERS
          ================================================== */}

          <Link
            to="/best-sellers"
            onClick={closeMenus}
          >
            Best Sellers
          </Link>


          {/* ==================================================
              SALE
          ================================================== */}

          <Link
            to="/sale"
            onClick={closeMenus}
          >
            Sale
          </Link>

        </nav>


        {/* ======================================================
            HEADER ACTIONS
        ====================================================== */}

        <div className="header-actions">


          {/* ==================================================
              SEARCH
          ================================================== */}

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Icon name="search" />
          </button>


          {/* ==================================================
              ACCOUNT / LOGIN
          ================================================== */}

          <button
            type="button"
            onClick={() => navigate(user ? "/account" : "/login")}
            aria-label={user ? "Account" : "Login"}
            title={user ? user.name : "Login"}
          >
            <Icon name="user" />
          </button>



          {/* ==================================================
              WISHLIST
          ================================================== */}

          <button
            type="button"
            className="count-button"
            onClick={() => navigate("/wishlist")}
            aria-label="Wishlist"
          >

            <Icon name="heart" />

            {wishlist.length > 0 && (

              <span>
                {wishlist.length}
              </span>

            )}

          </button>


          {/* ==================================================
              CART
          ================================================== */}

          <button
            type="button"
            className="count-button"
            onClick={() => navigate("/cart")}
            aria-label="Cart"
          >

            <Icon name="bag" />

            {cartCount > 0 && (

              <span>
                {cartCount}
              </span>

            )}

          </button>


          {/* ==================================================
              MOBILE MENU
          ================================================== */}

          <button
            type="button"
            className="mobile-menu"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >

            <Icon
              name={open ? "close" : "menu"}
            />

          </button>

        </div>

      </div>

    </header>

  );
}

export default Header;