import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const C = createContext();

const read = (key, defaultValue) => {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return defaultValue;
    }

    return JSON.parse(value);
  } catch {
    return defaultValue;
  }
};

export function ShopProvider({ children }) {

  const [cart, setCart] = useState(() =>
    read("outfitters-cart", [])
  );

  const [wishlist, setWishlist] = useState(() =>
    read("outfitters-wishlist", [])
  );

  const [searchOpen, setSearchOpen] = useState(false);

  // ============================================================
  // CART POPUP
  // ============================================================

  const [cartMessage, setCartMessage] = useState(null);

  // ============================================================
  // SAVE CART
  // ============================================================

  useEffect(() => {
    localStorage.setItem(
      "outfitters-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // ============================================================
  // SAVE WISHLIST
  // ============================================================

  useEffect(() => {
    localStorage.setItem(
      "outfitters-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // ============================================================
  // ADD TO CART
  // ============================================================

  function addToCart(
    product,
    size,
    qty = 1
  ) {

    const selectedSize =
      size ||
      (
        product.sizes &&
        product.sizes.length > 0
          ? product.sizes[0]
          : "M"
      );

    const key =
      `${product.id}-${selectedSize}`;

    setCart(currentCart => {

      const existing =
        currentCart.find(
          item => item.key === key
        );

      if (existing) {

        return currentCart.map(
          item =>
            item.key === key
              ? {
                  ...item,
                  quantity:
                    item.quantity + qty
                }
              : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          size: selectedSize,
          quantity: qty,
          key: key
        }
      ];
    });

    // ==========================================================
    // SHOW POPUP
    // ==========================================================

    setCartMessage({
      name: product.name,
      image: product.image
    });

    // ==========================================================
    // HIDE AFTER 3 SECONDS
    // ==========================================================

    setTimeout(() => {
      setCartMessage(null);
    }, 3000);
  }

  // ============================================================
  // UPDATE QUANTITY
  // ============================================================

  function updateQuantity(
    key,
    quantity
  ) {

    setCart(currentCart =>
      currentCart
        .map(item =>
          item.key === key
            ? {
                ...item,
                quantity:
                  Math.max(
                    1,
                    quantity
                  )
              }
            : item
        )
        .filter(
          item =>
            item.quantity > 0
        )
    );
  }

  // ============================================================
  // REMOVE FROM CART
  // ============================================================

  function removeFromCart(key) {

    setCart(currentCart =>
      currentCart.filter(
        item =>
          item.key !== key
      )
    );
  }

  // ============================================================
  // CLEAR CART (order complete hone ke baad)
  // ============================================================

  function clearCart() {
    setCart([]);
  }

  // ============================================================
  // WISHLIST
  // ============================================================

  function toggleWishlist(product) {

    setWishlist(currentWishlist => {

      const exists =
        currentWishlist.some(
          item =>
            item.id === product.id
        );

      if (exists) {

        return currentWishlist.filter(
          item =>
            item.id !== product.id
        );
      }

      return [
        ...currentWishlist,
        product
      ];
    });
  }

  // ============================================================
  // CART CALCULATIONS
  // ============================================================

  const cartCount =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  const subtotal =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  const shipping =
    subtotal > 0 &&
    subtotal < 999
      ? 199
      : 0;

  const total =
    subtotal + shipping;

  // ============================================================
  // PROVIDER
  // ============================================================

  return (
    <C.Provider
      value={{
        cart,
        wishlist,

        cartCount,
        subtotal,
        shipping,
        total,

        searchOpen,
        setSearchOpen,

        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,

        isWishlisted: id =>
          wishlist.some(
            item =>
              item.id === id
          ),

        // POPUP
        cartMessage,
        setCartMessage
      }}
    >
      {children}
    </C.Provider>
  );
}

export const useShop = () =>
  useContext(C);