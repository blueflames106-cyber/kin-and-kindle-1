import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/* =========================================================
   CART CONTEXT
   ========================================================= */

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  /* -------------------------------------------------------
     LOAD CART
     ------------------------------------------------------- */

  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart =
        localStorage.getItem("lumina-cart");

      if (!storedCart) {
        return [];
      }

      const parsedCart =
        JSON.parse(storedCart);

      return Array.isArray(parsedCart)
        ? parsedCart
        : [];
    } catch (error) {
      console.error(
        "Unable to load saved cart:",
        error
      );

      return [];
    }
  });

  /* -------------------------------------------------------
     SAVE CART
     ------------------------------------------------------- */

  useEffect(() => {
    try {
      localStorage.setItem(
        "lumina-cart",
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Unable to save cart:",
        error
      );
    }
  }, [cartItems]);

  /* -------------------------------------------------------
     ADD TO CART
     ------------------------------------------------------- */

  const addToCart = (product) => {
    if (!product) {
      return;
    }

    setCartItems((previousItems) => {
      const existingItem =
        previousItems.find(
          (item) =>
            item.product &&
            item.product.id === product.id
        );

      if (existingItem) {
        return previousItems.map((item) =>
          item.product &&
          item.product.id === product.id
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) + 1,
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

  /* -------------------------------------------------------
     REMOVE FROM CART
     ------------------------------------------------------- */

  const removeFromCart = (productId) => {
    setCartItems((previousItems) =>
      previousItems.filter(
        (item) =>
          !item.product ||
          item.product.id !== productId
      )
    );
  };

  /* -------------------------------------------------------
     UPDATE QUANTITY
     ------------------------------------------------------- */

  const updateQty = (
    productId,
    newQty
  ) => {
    const quantity =
      Number(newQty);

    if (
      !Number.isFinite(quantity) ||
      quantity < 1
    ) {
      return;
    }

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.product &&
        item.product.id === productId
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  /* -------------------------------------------------------
     CLEAR CART
     ------------------------------------------------------- */

  const clearCart = () => {
    setCartItems([]);
  };

  /* -------------------------------------------------------
     CART TOTAL
     ------------------------------------------------------- */

  const cartTotal = cartItems.reduce(
    (total, item) => {
      const price =
        Number(item?.product?.price) || 0;

      const quantity =
        Number(item?.quantity) || 0;

      return total + price * quantity;
    },
    0
  );

  /* -------------------------------------------------------
     CART COUNT
     ------------------------------------------------------- */

  const cartCount = cartItems.reduce(
    (total, item) =>
      total +
      (Number(item?.quantity) || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


/* =========================================================
   CART HOOK
   ========================================================= */

export const useCart = () =>
  useContext(CartContext);


/* =========================================================
   WISHLIST CONTEXT
   ========================================================= */

const WishlistContext =
  createContext(null);

export const WishlistProvider = ({
  children,
}) => {

  /* -------------------------------------------------------
     LOAD WISHLIST
     ------------------------------------------------------- */

  const [
    wishlistItems,
    setWishlistItems,
  ] = useState(() => {
    try {
      const storedWishlist =
        localStorage.getItem(
          "lumina-wishlist"
        );

      if (!storedWishlist) {
        return [];
      }

      const parsedWishlist =
        JSON.parse(storedWishlist);

      return Array.isArray(
        parsedWishlist
      )
        ? parsedWishlist
        : [];
    } catch (error) {
      console.error(
        "Unable to load saved wishlist:",
        error
      );

      return [];
    }
  });

  /* -------------------------------------------------------
     SAVE WISHLIST
     ------------------------------------------------------- */

  useEffect(() => {
    try {
      localStorage.setItem(
        "lumina-wishlist",
        JSON.stringify(
          wishlistItems
        )
      );
    } catch (error) {
      console.error(
        "Unable to save wishlist:",
        error
      );
    }
  }, [wishlistItems]);

  /* -------------------------------------------------------
     ADD TO WISHLIST
     ------------------------------------------------------- */

  const addToWishlist = (
    product
  ) => {
    if (!product) {
      return;
    }

    setWishlistItems(
      (previousItems) => {

        const alreadyExists =
          previousItems.some(
            (item) =>
              item.id === product.id
          );

        if (alreadyExists) {
          return previousItems;
        }

        return [
          ...previousItems,
          product,
        ];
      }
    );
  };

  /* -------------------------------------------------------
     REMOVE FROM WISHLIST
     ------------------------------------------------------- */

  const removeFromWishlist = (
    productId
  ) => {
    setWishlistItems(
      (previousItems) =>
        previousItems.filter(
          (item) =>
            item.id !== productId
        )
    );
  };

  /* -------------------------------------------------------
     CHECK WISHLIST
     ------------------------------------------------------- */

  const isWishlisted = (
    productId
  ) => {
    return wishlistItems.some(
      (item) =>
        item.id === productId
    );
  };

  /* -------------------------------------------------------
     MOVE WISHLIST ITEM TO CART
     ------------------------------------------------------- */

  const moveToCart = (
    productId,
    addToCart
  ) => {

    const item =
      wishlistItems.find(
        (product) =>
          product.id === productId
      );

    if (!item) {
      return;
    }

    if (
      typeof addToCart ===
      "function"
    ) {
      addToCart(item);
    }

    removeFromWishlist(
      productId
    );
  };

  /* -------------------------------------------------------
     CLEAR WISHLIST
     ------------------------------------------------------- */

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  /* -------------------------------------------------------
     WISHLIST COUNT
     ------------------------------------------------------- */

  const wishlistCount =
    wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        isWishlisted,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};


/* =========================================================
   WISHLIST HOOK
   ========================================================= */

export const useWishlist = () =>
  useContext(WishlistContext);


/* =========================================================
   PRODUCT FILTER HELPER
   ========================================================= */

export const filterProducts = (
  products = [],
  searchQuery = "",
  category = "All"
) => {

  const query =
    searchQuery
      .trim()
      .toLowerCase();

  return products.filter(
    (product) => {

      const categoryMatches =
        category === "All" ||
        !category ||
        product.category ===
          category;

      if (!categoryMatches) {
        return false;
      }

      if (!query) {
        return true;
      }

      const searchableText = [
        product.name,
        product.description,
        product.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        query
      );
    }
  );
};


/* =========================================================
   CART CALCULATION HELPERS
   ========================================================= */

export const calculateCartTotal = (
  cartItems = []
) => {

  return cartItems.reduce(
    (total, item) => {

      const price =
        Number(
          item?.product?.price
        ) || 0;

      const quantity =
        Number(
          item?.quantity
        ) || 0;

      return (
        total +
        price * quantity
      );
    },
    0
  );
};


export const calculateCartCount = (
  cartItems = []
) => {

  return cartItems.reduce(
    (total, item) =>
      total +
      (
        Number(
          item?.quantity
        ) || 0
      ),
    0
  );
};


/* =========================================================
   USER STATE HELPERS
   ========================================================= */

export const createEmptyUser = () => ({
  username: "",
  email: "",
  loggedIn: false,
});


export const createLoggedInUser = (
  username,
  email = ""
) => ({
  username:
    username || "",
  email:
    email || "",
  loggedIn: true,
});
