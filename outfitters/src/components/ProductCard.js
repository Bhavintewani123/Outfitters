import Icon from "./Icon";
import { navigateTo } from "./RouterLink";
import { useShop } from "../context/ShopContext";
import { useState } from "react";

export default function ProductCard({
  product: p
}) {

  const {
    toggleWishlist,
    isWishlisted,
    addToCart
  } = useShop();

  const [showAdded, setShowAdded] =
    useState(false);

  const w = isWishlisted(p.id);


  // ============================================================
  // ADD TO CART
  // ============================================================

  function handleAddToCart(e) {
  e.stopPropagation();

  addToCart(p);

  // Mobile vibration
  if (navigator.vibrate) {
    navigator.vibrate([50, 30, 50]);
  }

  setShowAdded(true);

  setTimeout(() => {
    setShowAdded(false);
  }, 1000);
}

  return (
    <article className="product-card">


      {/* ======================================================
          PRODUCT IMAGE
          ====================================================== */}

      <div
        className="product-image-wrap"
        onClick={() =>
          navigateTo(
            `/product/${p.id}`
          )
        }
      >

        {p.badge && (
          <span className="product-badge">
            {p.badge}
          </span>
        )}


        <img
          src={p.image}
          alt={p.name}
          className="product-image"
        />


        {/* ====================================================
            WISHLIST
            ==================================================== */}

        <button
          type="button"
          className={`wishlist-button ${
            w ? "active" : ""
          }`}
          onClick={e => {

            e.stopPropagation();

            toggleWishlist(p);

          }}
          aria-label="Add to wishlist"
        >
          <Icon name="heart" />
        </button>


        {/* ====================================================
            QUICK ADD
            ==================================================== */}

        <button
          type="button"
          className="quick-add"
          onClick={handleAddToCart}
        >
          QUICK ADD
        </button>


        {/* ====================================================
            ADDED POPUP
            ==================================================== */}

        {showAdded && (

          <div
            className="product-added-popup"
            onClick={e =>
              e.stopPropagation()
            }
          >

            <div className="product-added-check">
              ✓
            </div>

            <div>
              <strong>
                Added to cart
              </strong>

              <span>
                {p.name}
              </span>
            </div>

          </div>

        )}

      </div>


      {/* ======================================================
          PRODUCT INFORMATION
          ====================================================== */}

      <div className="product-info">


        <button
          type="button"
          className="product-name"
          onClick={() =>
            navigateTo(
              `/product/${p.id}`
            )
          }
        >
          {p.name}
        </button>


        <span className="product-category">
          {p.category} · {p.color}
        </span>


        <div className="price-row">

          <b>
            ₹
            {p.price.toLocaleString(
              "en-IN"
            )}
          </b>

          {p.oldPrice && (
            <del>
              ₹
              {p.oldPrice.toLocaleString(
                "en-IN"
              )}
            </del>
          )}

        </div>

      </div>

    </article>
  );
}