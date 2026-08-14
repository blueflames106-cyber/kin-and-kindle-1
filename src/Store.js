# Store.js

```javascript
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

/* =========================================================
   CART CONTEXT
   ========================================================= */

const CartContext = createContext();

/*
  CartProvider is the central cart manager for the application.

  It replaces the original:
    src/redux/CartContext.js

  The original application stores cart data under:
    "lumina-cart"

  Keeping the same localStorage key means existing cart data
  can continue to be recognized.
*/

export const CartProvider = ({ children }) => {
  /* -------------------------------------------------------
     INITIAL CART
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

      /*
        If the product is already in the cart,
        increase its quantity.
      */

      if (existingItem) {
        return previousItems.map((item) =>
          item.product &&
          item.product.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      /*
        Otherwise create a new cart entry.
      */

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

    /*
      Do not allow invalid or zero quantities.
      The original application directly stored the
      supplied quantity, so this still supports normal
      quantity editing while preventing broken state.
    */

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
     MOVE TO WISHLIST
     -------------------------------------------------------

     The original CartContext only removed the item
     from the cart and left the wishlist operation to
     the application layer.

     We preserve that behavior here.
  */

  const moveToWishlist = (
    productId
  ) => {
    removeFromCart(productId);
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
        Number(item?.product?.price) ||
        0;

      const quantity =
        Number(item?.quantity) || 0;

      return (
        total +
        price * quantity
      );
    },
    0
  );

  /* -------------------------------------------------------
     TOTAL ITEM COUNT
     ------------------------------------------------------- */

  const cartCount = cartItems.reduce(
    (total, item) =>
      total +
      (Number(item?.quantity) || 0),
    0
  );

  /* -------------------------------------------------------
     CART PROVIDER
     ------------------------------------------------------- */

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,

        removeFromCart,

        updateQty,

        moveToWishlist,

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
  createContext();

/*
  WishlistProvider replaces the original:
    src/redux/WishlistContext.js
*/

export const WishlistProvider = ({
  children,
}) => {
  /* -------------------------------------------------------
     WISHLIST STATE
     ------------------------------------------------------- */

  const [
    wishlistItems,
    setWishlistItems,
  ] = useState([]);

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
        /*
          Do not add the same product twice.
        */

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

    /*
      The original implementation receives
      addToCart as a callback.
    */

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
     CHECK WISHLIST STATUS
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

  /* -------------------------------------------------------
     WISHLIST PROVIDER
     ------------------------------------------------------- */

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
   PRODUCT / CATEGORY HELPERS
   ========================================================= */

/*
  These helpers are intentionally independent from the
  product arrays.

  The original application contains product data in its
  page files, so we will move those datasets into the
  appropriate section when Pages.js is consolidated.

  This prevents accidentally replacing the original
  product catalogue with the small demo dataset from
  productsSlice.js.
*/


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
      /* -------------------------
         CATEGORY FILTER
         ------------------------- */

      const categoryMatches =
        category === "All" ||
        !category ||
        product.category ===
          category;

      if (!categoryMatches) {
        return false;
      }

      /* -------------------------
         SEARCH FILTER
         ------------------------- */

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
        Number(item?.product?.price) ||
        0;

      const quantity =
        Number(item?.quantity) || 0;

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
      (Number(item?.quantity) || 0),
    0
  );
};


/* =========================================================
   USER STATE HELPERS
   ========================================================= */

/*
  The original Redux userSlice stores:

    username
    email
    loggedIn

  The current login modal handles the actual localStorage
  authentication flow.

  These helpers provide the same basic user state without
  requiring Redux.
*/


export const createEmptyUser = () => ({
  username: "",
  email: "",
  loggedIn: false,
});


export const createLoggedInUser = (
  username,
  email = ""
) => ({
  username: username || "",
  email: email || "",
  loggedIn: true,
});


/* =========================================================
   DEFAULT EXPORT
   ========================================================= */

/*
  No default export is required.

  Store.js is intentionally a shared state module containing:

    - CartProvider
    - WishlistProvider
    - useCart
    - useWishlist
    - cart helpers
    - product filtering helpers
    - user helpers
*/
```
