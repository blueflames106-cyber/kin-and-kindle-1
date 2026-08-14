import React, { useState } from "react";


/* =========================================================
   HEADER
   ========================================================= */

export function Header({
  onHome,
  onStore,
  onSearch,
  onCategoryChange,
  onCart,
  onWishlist,
}) {

  const [
    searchOpen,
    setSearchOpen,
  ] = useState(false);

  const [
    searchValue,
    setSearchValue,
  ] = useState("");


  /* -------------------------------------------------------
     SEARCH
     ------------------------------------------------------- */

  const submitSearch = (
    event
  ) => {

    event.preventDefault();

    if (
      typeof onSearch ===
      "function"
    ) {
      onSearch(searchValue);
    }
  };


  /* -------------------------------------------------------
     CATEGORY
     ------------------------------------------------------- */

  const selectCategory = (
    event
  ) => {

    const category =
      event.target.value;

    if (
      typeof onCategoryChange ===
      "function"
    ) {
      onCategoryChange(
        category
      );
    }
  };


  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* =================================================
            LOGO
            ================================================= */}

        <button
          className="logo"
          onClick={onHome}
          type="button"
        >
          Kin & Kindle
        </button>


        {/* =================================================
            NAVIGATION
            ================================================= */}

        <nav>

          <ul className="nav-links">

            <li>
              <button
                type="button"
                onClick={onHome}
                className="nav-link-button"
              >
                Home
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={onStore}
                className="nav-link-button"
              >
                Store
              </button>
            </li>

            <li>

              <select
                className="category-select"
                defaultValue="All"
                onChange={
                  selectCategory
                }
              >

                <option value="All">
                  All Products
                </option>

                <option value="Signature Collection">
                  Signature Collection
                </option>

                <option value="Bestsellers">
                  Bestsellers
                </option>

                <option value="Newest Arrivals">
                  Newest Arrivals
                </option>

              </select>

            </li>

          </ul>

        </nav>


        {/* =================================================
            ACTIONS
            ================================================= */}

        <div className="nav-actions">

          {/* SEARCH */}

          <button
            type="button"
            className="nav-icon-button"
            onClick={() =>
              setSearchOpen(
                (value) =>
                  !value
              )
            }
            aria-label="Search"
          >
            🔍
          </button>


          {/* WISHLIST */}

          <button
            type="button"
            className="nav-icon-button"
            onClick={
              onWishlist
            }
            aria-label="Wishlist"
          >
            ♡
          </button>


          {/* CART */}

          <button
            type="button"
            className="nav-icon-button"
            onClick={
              onCart
            }
            aria-label="Cart"
          >
            🛒
          </button>

        </div>

      </div>


      {/* =================================================
          SEARCH BAR
          ================================================= */}

      {searchOpen && (

        <div className="header-search">

          <form
            onSubmit={
              submitSearch
            }
          >

            <input
              type="search"
              value={
                searchValue
              }
              onChange={(
                event
              ) =>
                setSearchValue(
                  event.target
                    .value
                )
              }
              placeholder="Search products..."
              autoFocus
            />

            <button
              type="submit"
            >
              Search
            </button>

          </form>

        </div>

      )}

    </header>
  );
}


/* =========================================================
   FOOTER
   ========================================================= */

export function Footer() {

  return (
    <footer>

      <div className="footer-container">

        {/* =================================================
            BRAND
            ================================================= */}

        <div>

          <h4>
            Kin & Kindle
          </h4>

          <p>
            Handcrafted candles
            created to bring warmth,
            comfort and character
            into everyday spaces.
          </p>

        </div>


        {/* =================================================
            QUICK LINKS
            ================================================= */}

        <div>

          <h4>
            Quick Links
          </h4>

          <p>
            <a href="/">
              Home
            </a>
          </p>

          <p>
            <a href="/store">
              Store
            </a>
          </p>

          <p>
            <a href="/about">
              About Us
            </a>
          </p>

        </div>


        {/* =================================================
            CONTACT
            ================================================= */}

        <div>

          <h4>
            Contact
          </h4>

          <p>
            Email:
            hello@kinandkindle.com
          </p>

          <p>
            Follow us on social
            media for new releases
            and announcements.
          </p>

        </div>

      </div>


      {/* =================================================
          COPYRIGHT
          ================================================= */}

      <div className="footer-bottom">

        ©{" "}
        {new Date().getFullYear()}
        {" "}
        Kin & Kindle. All
        rights reserved.

      </div>

    </footer>
  );
}


/* =========================================================
   SIMPLE PRODUCT CARD
   ========================================================= */

export function ProductCard({
  product,
  onAddToCart,
  onWishlist,
  wishlisted = false,
}) {

  if (!product) {
    return null;
  }

  return (
    <article className="product-card">

      <button
        type="button"
        className={`wishlist-btn ${
          wishlisted
            ? "active"
            : ""
        }`}
        onClick={() =>
          onWishlist &&
          onWishlist(product)
        }
        aria-label={
          wishlisted
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
      >
        {wishlisted
          ? "♥"
          : "♡"}
      </button>


      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />


      <h4>
        {product.name}
      </h4>


      {product.rating !==
        undefined && (

        <div className="star-rating">

          {[1, 2, 3, 4, 5].map(
            (star) => (

              <span
                key={star}
                className={
                  star <=
                  product.rating
                    ? "star filled"
                    : "star"
                }
              >
                ★
              </span>

            )
          )}

        </div>

      )}


      {product.description && (
        <p className="product-description">
          {product.description}
        </p>
      )}


      <p className="product-price">
        R
        {Number(
          product.price || 0
        ).toFixed(2)}
      </p>


      <button
        type="button"
        className="add-to-cart-btn"
        disabled={
          product.stock === 0
        }
        onClick={() =>
          onAddToCart &&
          onAddToCart(product)
        }
      >
        {product.stock === 0
          ? "Out of Stock"
          : "Add to Cart"}
      </button>

    </article>
  );
}


/* =========================================================
   CATEGORY BUTTON
   ========================================================= */

export function CategoryButton({
  name,
  active = false,
  onClick,
}) {

  return (
    <button
      type="button"
      className={`category-button ${
        active
          ? "active"
          : ""
      }`}
      onClick={() =>
        onClick &&
        onClick(name)
      }
    >
      {name}
    </button>
  );
}


/* =========================================================
   LOADING COMPONENT
   ========================================================= */

export function Loading() {

  return (
    <div className="loading-container">

      <div className="loading-spinner" />

      <p>
        Loading...
      </p>

    </div>
  );
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

export function EmptyState({
  title = "Nothing here yet",
  message = "",
}) {

  return (
    <div className="empty-state">

      <h3>
        {title}
      </h3>

      {message && (
        <p>
          {message}
        </p>
      )}

    </div>
  );
}
