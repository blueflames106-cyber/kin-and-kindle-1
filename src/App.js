import React, { useState } from "react";

import {
  CartProvider,
  WishlistProvider,
  useCart,
} from "./Store";

import {
  LandingPage,
  StorePage,
  CartDrawer,
  WishlistDrawer,
} from "./Pages";

import {
  Header,
  Footer,
} from "./Components";


/* =========================================================
   MAIN APPLICATION
   ========================================================= */

function AppContent() {

  const [page, setPage] =
    useState("home");

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [
    cartOpen,
    setCartOpen,
  ] = useState(false);

  const [
    wishlistOpen,
    setWishlistOpen,
  ] = useState(false);


  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQty,
    moveToWishlist,
  } = useCart();


  /* -------------------------------------------------------
     NAVIGATION
     ------------------------------------------------------- */

  const goHome = () => {
    setPage("home");
    window.scrollTo(0, 0);
  };

  const goStore = () => {
    setPage("store");
    window.scrollTo(0, 0);
  };


  /* -------------------------------------------------------
     SEARCH
     ------------------------------------------------------- */

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage("store");
  };


  /* -------------------------------------------------------
     CATEGORY
     ------------------------------------------------------- */

  const handleCategoryChange =
    (category) => {
      setSelectedCategory(
        category
      );

      setPage("store");
    };


  /* -------------------------------------------------------
     CART
     ------------------------------------------------------- */

  const openCart = () => {
    setCartOpen(true);
    setWishlistOpen(false);
  };

  const closeCart = () => {
    setCartOpen(false);
  };


  /* -------------------------------------------------------
     WISHLIST
     ------------------------------------------------------- */

  const openWishlist = () => {
    setWishlistOpen(true);
    setCartOpen(false);
  };

  const closeWishlist = () => {
    setWishlistOpen(false);
  };


  /* -------------------------------------------------------
     PAGE CONTENT
     ------------------------------------------------------- */

  let pageContent;

  if (page === "store") {

    pageContent = (
      <StorePage
        searchQuery={
          searchQuery
        }
        selectedCategory={
          selectedCategory
        }
        addToCart={
          addToCart
        }
      />
    );

  } else {

    pageContent = (
      <LandingPage />
    );

  }


  return (
    <div className="app">

      {/* =================================================
          HEADER
          ================================================= */}

      <Header
        onHome={goHome}
        onStore={goStore}
        onSearch={
          handleSearch
        }
        onCategoryChange={
          handleCategoryChange
        }
        onCart={openCart}
        onWishlist={
          openWishlist
        }
      />


      {/* =================================================
          MAIN PAGE
          ================================================= */}

      <main>
        {pageContent}
      </main>


      {/* =================================================
          FOOTER
          ================================================= */}

      <Footer />


      {/* =================================================
          CART DRAWER
          ================================================= */}

      <CartDrawer
        isOpen={cartOpen}
        onClose={closeCart}
        cartItems={
          cartItems
        }
        onRemoveItem={
          removeFromCart
        }
        onUpdateQty={
          updateQty
        }
        onMoveToWishlist={
          moveToWishlist
        }
      />


      {/* =================================================
          WISHLIST DRAWER
          ================================================= */}

      <WishlistDrawer
        isOpen={
          wishlistOpen
        }
        onClose={
          closeWishlist
        }
      />

    </div>
  );
}


/* =========================================================
   ROOT PROVIDERS
   ========================================================= */

function App() {

  return (
    <CartProvider>

      <WishlistProvider>

        <AppContent />

      </WishlistProvider>

    </CartProvider>
  );
}


export default App;
