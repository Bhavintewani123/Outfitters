import Icon from "../components/Icon";
import { useShop } from "../context/ShopContext";
import { navigateTo } from "../components/RouterLink";

export default function Cart() {
  let {
    cart,
    subtotal,
    shipping,
    total,
    updateQuantity,
    removeFromCart
  } = useShop();

  return (
    <main className="container cart-page">

      <div className="page-intro left">
        <span className="eyebrow">YOUR EDIT</span>
        <h1>Shopping bag</h1>
      </div>

      {!cart.length ? (
        <div className="empty-state">
          <h2>Your bag is empty.</h2>

          <button
            className="btn btn-dark"
            onClick={() => navigateTo("/shop")}
          >
            SHOP NOW
          </button>
        </div>
      ) : (
        <div className="cart-layout">

          {/* =====================================================
              CART PRODUCTS
              ===================================================== */}

          <div>
            {cart.map((item) => (
              <div className="cart-item" key={item.key}>

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-copy">

                  <span>{item.category}</span>

                  <h3>{item.name}</h3>

                  <p>Size: {item.size}</p>

                  <strong>
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </strong>

                  <div className="quantity">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.key,
                          item.quantity - 1
                        )
                      }
                    >
                      <Icon name="minus" />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.key,
                          item.quantity + 1
                        )
                      }
                    >
                      <Icon name="plus" />
                    </button>

                  </div>

                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.key)}
                >
                  <Icon name="trash" />
                </button>

              </div>
            ))}
          </div>


          {/* =====================================================
              ORDER SUMMARY
              ===================================================== */}

          <aside className="summary">

            <h2>Order Summary</h2>


            {/* PRODUCT LIST: name + size/qty on the left, line total on the right */}

            <div className="summary-products">

              {cart.map((item) => {

                const itemTotal =
                  Number(item.price) *
                  Number(item.quantity);

                return (
                  <div
                    className="summary-product"
                    key={item.key}
                  >

                    <div className="summary-product-info">

                      <span className="summary-product-name">
                        {item.name}
                      </span>

                      <small>
                        Size {item.size} · Qty {item.quantity}
                      </small>

                    </div>

                    <strong className="summary-product-price">
                      ₹{itemTotal.toLocaleString("en-IN")}
                    </strong>

                  </div>
                );

              })}

            </div>


            {/* SUBTOTAL */}

            <div className="summary-row">

              <span>Subtotal</span>

              <strong>
                ₹{Number(subtotal).toLocaleString("en-IN")}
              </strong>

            </div>


            {/* SHIPPING */}

            <div className="summary-row">

              <span>Shipping</span>

              <strong>
                {shipping
                  ? `₹${Number(shipping).toLocaleString("en-IN")}`
                  : "FREE"}
              </strong>

            </div>


            {/* FREE SHIPPING MESSAGE */}

            {subtotal > 0 && subtotal < 999 && (
              <p className="shipping-note">
                Add ₹
                {(999 - subtotal).toLocaleString("en-IN")}
                {" "}
                more for free shipping.
              </p>
            )}


            {/* TOTAL */}

            <div className="summary-total">

              <span>Total</span>

              <strong>
                ₹{Number(total).toLocaleString("en-IN")}
              </strong>

            </div>


            {/* CHECKOUT */}

            <button
              className="btn btn-dark full"
              onClick={() => navigateTo("/checkout")}
            >
              CHECKOUT
            </button>

          </aside>

        </div>
      )}

    </main>
  );
}
