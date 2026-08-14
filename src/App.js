import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  CartProvider,
  WishlistProvider,
  useCart,
  useWishlist,
} from "./Store";

import {
  Header,
  SearchBar,
  PromoBanner,
  Footer,
  LoginRegisterModal,
} from "./Components";

import {
  LandingPage,
  StorePage,
  CartDrawer,
  WishlistDrawer,
} from "./Pages";

/* =========================================================
   MAIN APPLICATION CONTENT
   ========================================================= */

function AppContent() {
  const location = useLocation();

  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQty,
  } = useCart();

  const {
    wishlistItems,
    addToWishlist,
  } = useWishlist();

  /* -------------------------
     UI STATE
     ------------------------- */

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [currentUser, setCurrentUser] = useState(null);

  /* -------------------------
     SEARCH STATE
     ------------------------- */

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  /* -------------------------
     ROUTE-SPECIFIC UI
     ------------------------- */

  const hiddenRoutes = ["/cart"];

  const shouldHideBanner =
    hiddenRoutes.includes(location.pathname);

  /* -------------------------
     SEARCH HANDLERS
     ------------------------- */

  const handleSearch = (query, category) => {
    setSearchQuery(query);
    setSelectedCategory(category);
  };

  const handleCategoryChange = (category, query) => {
    setSelectedCategory(category);
    setSearchQuery(query);
  };

  /* -------------------------
     LOGIN / LOGOUT
     ------------------------- */

  const handleLogout = () => {
    setCurrentUser(null);
  };

  /* -------------------------
     CART → WISHLIST
     ------------------------- */

  const handleMoveToWishlist = (productId) => {
    const item = cartItems.find(
      (cartItem) =>
        cartItem.product.id === productId
    );

    if (!item) {
      return;
    }

    addToWishlist(item.product);
    removeFromCart(productId);
  };

  return (
    <>
      <Header
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={() => setWishlistOpen(true)}
        cartCount={cartItems.length}
        wishlistCount={wishlistItems.length}
        currentUser={currentUser}
        onLoginClick={() => setShowModal(true)}
        onLogoutClick={handleLogout}
      />

      {location.pathname === "/store" && (
        <SearchBar
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
        />
      )}

      {!shouldHideBanner && <PromoBanner />}

      <main>
        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route
            path="/store"
            element={
              <StorePage
                addToCart={addToCart}
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />
            }
          />
        </Routes>
      </main>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQty={updateQty}
        onMoveToWishlist={handleMoveToWishlist}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />

      <Footer />

      {showModal && (
        <LoginRegisterModal
          isLogin={isLogin}
          onClose={() => setShowModal(false)}
          switchForm={() =>
            setIsLogin((previous) => !previous)
          }
          onLoginSuccess={(username) => {
            setCurrentUser(username);
            setShowModal(false);
          }}
        />
      )}
    </>
  );
}

/* =========================================================
   APPLICATION ROOT
   ========================================================= */

export default function App() {
  return (
    <Router>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}
