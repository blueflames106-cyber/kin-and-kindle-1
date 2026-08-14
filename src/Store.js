import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/* =========================================================
   CART STATE
   ========================================================= */

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("lumina-cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("lumina-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previousItems,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item.product.id !== productId
      )
    );
  };

  const updateQty = (productId, newQty) => {
    const quantity = Number(newQty);

    if (!Number.isFinite(quantity) || quantity < 1) {
      return;
    }

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const moveToWishlist = (productId) => {
    removeFromCart(productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        moveToWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

/* =========================================================
   WISHLIST STATE
   ========================================================= */

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    setWishlistItems((previousItems) => {
      if (
        previousItems.some(
          (item) => item.id === product.id
        )
      ) {
        return previousItems;
      }

      return [...previousItems, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );
  };

  const moveToCart = (id, addToCart) => {
    const item = wishlistItems.find(
      (product) => product.id === id
    );

    if (!item) {
      return;
    }

    addToCart(item);
    removeFromWishlist(id);
  };

  const isWishlisted = (id) => {
    return wishlistItems.some(
      (item) => item.id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
