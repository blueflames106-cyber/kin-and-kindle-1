import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useCart,
  useWishlist,
} from "./Store";

import { FaFire } from "react-icons/fa";

/* =========================================================
   PRODUCT IMAGES
   ========================================================= */

import sundaeImg from "./assets/sundae.jpg";
import cherry2Img from "./assets/cherry2.jpg";
import waffleImg from "./assets/waffle.jpg";
import raspberryImg from "./assets/raspberry.jpg";
import buttermilkImg from "./assets/buttermilk.jpg";
import appleImg from "./assets/apple.jpg";
import zestyImg from "./assets/zesty.jpg";
import ccImg from "./assets/cc.jpg";
import coconutImg from "./assets/coconut.jpg";
import strawberryImg from "./assets/strawberry.jpg";

import orchidImg from "./assets/orchid.jpg";
import lilacImg from "./assets/lilac.jpg";
import picnicImg from "./assets/picnic.jpg";
import rosesImg from "./assets/roses.jpg";
import cabinImg from "./assets/cabin.jpg";
import frostingImg from "./assets/frosting.jpg";
import rainImg from "./assets/rain.jpg";
import cherryImg from "./assets/cherry.jpg";
import honeyImg from "./assets/honey.jpg";
import pumpkinImg from "./assets/pumpkin.jpg";
import oceanImg from "./assets/ocean.jpg";
import rosewoodImg from "./assets/rosewood.jpg";
import peachImg from "./assets/peach.jpg";
import cashmereImg from "./assets/cashmere.jpg";
import serenityImg from "./assets/serenity.jpg";

import store1 from "./assets/exterior.jpg";
import store2 from "./assets/interior.jpg";
import scentImg from "./assets/scent.jpg";
import factoryImg from "./assets/factory.jpg";

/* =========================================================
   LANDING PAGE PRODUCTS
   ========================================================= */

const landingProducts = [
  {
    id: 1,
    name: "Chocolate Sundae Dream",
    image: sundaeImg,
    price: 149.99,
  },
  {
    id: 2,
    name: "Wild Cherry Crumble",
    image: cherry2Img,
    price: 139.99,
  },
  {
    id: 3,
    name: "Blueberry Waffles",
    image: waffleImg,
    price: 129.99,
  },
  {
    id: 4,
    name: "Chocolate Raspberry Torte",
    image: raspberryImg,
    price: 119.99,
  },
  {
    id: 5,
    name: "Buttermilk Pancakes & Syrup",
    image: buttermilkImg,
    price: 139.99,
  },
  {
    id: 6,
    name: "Caramel Apple Delight",
    image: appleImg,
    price: 144.99,
  },
  {
    id: 7,
    name: "Lemon Cream Tart",
    image: zestyImg,
    price: 124.99,
  },
  {
    id: 8,
    name: "Cookies & Cream",
    image: ccImg,
    price: 149.99,
  },
  {
    id: 9,
    name: "Strawberry Milkshake",
    image: strawberryImg,
    price: 134.99,
  },
  {
    id: 10,
    name: "Toasted Coconut Brownie",
    image: coconutImg,
    price: 139.99,
  },
];

/* =========================================================
   STORE PRODUCTS
   ========================================================= */

const storeProducts = [
  {
    id: 1,
    name: "Vanilla Orchid",
    category: "Signature Collection",
    image: orchidImg,
    rating: 4,
    stock: 5,
    description:
      "A gentle floral breeze, with blooming lilacs",
    price: 100,
  },
  {
    id: 2,
    name: "Lilac Garden",
    category: "Signature Collection",
    image: lilacImg,
    rating: 5,
    stock: 0,
    description: "Lilac and peonie breeze.",
    price: 100,
  },
  {
    id: 3,
    name: "Summer Picnic",
    category: "Signature Collection",
    image: picnicImg,
    rating: 3,
    stock: 2,
    description:
      "Juicy strawberry, crisp lemonade, and freshly cut grass",
    price: 125,
  },
  {
    id: 4,
    name: "Fresh Cut Roses",
    category: "Signature Collection",
    image: rosesImg,
    rating: 5,
    stock: 10,
    description:
      "Classic fresh roses with a hint of morning dews",
    price: 150,
  },
  {
    id: 5,
    name: "Cozy Cabin",
    category: "Signature Collection",
    image: cabinImg,
    rating: 4,
    stock: 3,
    description:
      "Crisp pinewood, toasted marshmallow",
    price: 100,
  },
  {
    id: 6,
    name: "Buttercream Frosting",
    category: "Signature Collection",
    image: frostingImg,
    rating: 2,
    stock: 0,
    description:
      "Sweet whipped vanilla frosting",
    price: 50,
  },
  {
    id: 7,
    name: "Soft Rainfall",
    category: "Signature Collection",
    image: rainImg,
    rating: 4,
    stock: 7,
    description:
      "Gentle rain, fresh mist, and clean earth",
    price: 95,
  },
  {
    id: 8,
    name: "Cherry Blossom Kiss",
    category: "Signature Collection",
    image: cherryImg,
    rating: 4,
    stock: 7,
    description:
      "Sweet cherry blossoms",
    price: 125,
  },
  {
    id: 9,
    name: "Sunflower & Honey",
    category: "Signature Collection",
    image: honeyImg,
    rating: 4,
    stock: 0,
    description:
      "Bright sunflowers and rich wild honey",
    price: 149.99,
  },
  {
    id: 10,
    name: "Cinnamon Snuggle",
    category: "Bestsellers",
    image: pumpkinImg,
    rating: 4,
    stock: 7,
    description:
      "Cozy cinnamon, clove, and pumpkin spice blend",
    price: 250,
  },
  {
    id: 11,
    name: "Seashell Serenade",
    category: "Bestsellers",
    image: oceanImg,
    rating: 4,
    stock: 7,
    description:
      "Sea breeze with hints of salt and jasmine",
    price: 250,
  },
  {
    id: 12,
    name: "Frosted Rosewood",
    category: "Bestsellers",
    image: rosewoodImg,
    rating: 4,
    stock: 7,
    description:
      "Rosewood, peony, cedar musk",
    price: 250,
  },
  {
    id: 13,
    name: "Peach Birch",
    category: "Bestsellers",
    image: peachImg,
    rating: 4,
    stock: 7,
    description:
      "Ripe peach, birchwood, white musk",
    price: 250,
  },
  {
    id: 14,
    name: "Coconut Cashmere",
    category: "Bestsellers",
    image: cashmereImg,
    rating: 4,
    stock: 7,
    description:
      "Coconut milk, sandalwood, amber",
    price: 250,
  },
  {
    id: 15,
    name: "Eucalyptus Ember",
    category: "Bestsellers",
    image: serenityImg,
    rating: 5,
    stock: 11,
    description:
      "Smoked eucalyptus, firewood, minty herbs",
    price: 139.99,
  },
  {
    id: 16,
    name: "Chocolate Sundae Dream",
    category: "Newest Arrivals",
    image: sundaeImg,
    rating: 4,
    stock: 7,
    description:
      "Fudge brownie, vanilla bean, chocolate syrup",
    price: 149.99,
  },
  {
    id: 17,
    name: "Blueberry Waffles",
    category: "Newest Arrivals",
    image: waffleImg,
    rating: 4,
    stock: 5,
    description:
      "Blueberry syrup, batter, maple syrup",
    price: 129.99,
  },
  {
    id: 18,
    name: "Chocolate Raspberry Torte",
    category: "Newest Arrivals",
    image: raspberryImg,
    rating: 3,
    stock: 8,
    description:
      "Cocoa and ripe raspberries",
    price: 119.99,
  },
  {
    id: 19,
    name: "Buttermilk Pancakes & Syrup",
    category: "Newest Arrivals",
    image: buttermilkImg,
    rating: 5,
    stock: 12,
    description:
      "Buttermilk, maple, vanilla",
    price: 139.99,
  },
  {
    id: 20,
    name: "Caramel Apple Delight",
    category: "Newest Arrivals",
    image: appleImg,
    rating: 4,
    stock: 6,
    description:
      "Apple, caramel, cinnamon",
    price: 144.99,
  },
  {
    id: 21,
    name: "Lemon Cream Tart",
    category: "Newest Arrivals",
    image: zestyImg,
    rating: 4,
    stock: 9,
    description:
      "Zesty lemon, cream, graham crust",
    price: 124.99,
  },
  {
    id: 22,
    name: "Cookies & Cream",
    category: "Newest Arrivals",
    image: ccImg,
    rating: 5,
    stock: 4,
    description:
      "Cream, cookies, vanilla",
    price: 149.99,
  },
  {
    id: 23,
    name: "Strawberry Milkshake",
    category: "Newest Arrivals",
    image: strawberryImg,
    rating: 3,
    stock: 7,
    description:
      "Strawberry, milk sugar, vanilla bean",
    price: 134.99,
  },
  {
    id: 24,
    name: "Toasted Coconut Brownie",
    category: "Newest Arrivals",
    image: coconutImg,
    rating: 5,
    stock: 11,
    description:
      "Dark chocolate, toasted coconut",
    price: 139.99,
  },
];

/* =========================================================
   ABOUT SECTION IMAGES
   ========================================================= */

const aboutImages = [
  {
    id: 1,
    src: store1,
    alt: "Lumina Store Front 1",
  },
  {
    id: 2,
    src: store2,
    alt: "Lumina Store Front 2",
  },
  {
    id: 3,
    src: scentImg,
    alt: "Lumina Product 1",
  },
  {
    id: 4,
    src: factoryImg,
    alt: "Lumina Product 2",
  },
];

/* =========================================================
   LANDING PAGE
   ========================================================= */

export function LandingPage() {
  const scrollRef = useRef(null);

  const {
    addToCart,
  } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    addedProductId,
    setAddedProductId,
  ] = useState(null);

  /* -------------------------------------------------------
     ABOUT SLIDESHOW
     ------------------------------------------------------- */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (previousIndex) =>
          (previousIndex + 1) %
          aboutImages.length
      );
    }, 5000);

    return () =>
      clearInterval(interval);
  }, []);

  /* -------------------------------------------------------
     PRODUCT CAROUSEL AUTO SCROLL
     ------------------------------------------------------- */

  useEffect(() => {
    const autoScroll =
      setInterval(() => {
        const container =
          scrollRef.current;

        if (!container) {
          return;
        }

        const scrollAmount = 300;

        if (
          container.scrollLeft +
            container.clientWidth >=
          container.scrollWidth
        ) {
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          container.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      }, 8000);

    return () =>
      clearInterval(autoScroll);
  }, []);

  /* -------------------------------------------------------
     MANUAL CAROUSEL SCROLL
     ------------------------------------------------------- */

  const scroll = (direction) => {
    const container =
      scrollRef.current;

    if (!container) {
      return;
    }

    const amount = 300;

    container.scrollBy({
      left:
        direction === "left"
          ? -amount
          : amount,
      behavior: "smooth",
    });
  };

  /* -------------------------------------------------------
     ADD TO CART
     ------------------------------------------------------- */

  const handleAddToCart = (
    product
  ) => {
    addToCart(product);

    setAddedProductId(
      product.id
    );

    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  /* -------------------------------------------------------
     WISHLIST
     ------------------------------------------------------- */

  const toggleWishlist = (
    product
  ) => {
    if (
      isWishlisted(product.id)
    ) {
      removeFromWishlist(
        product.id
      );
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="landing">

      {/* =================================================
          NEWEST ARRIVALS
          ================================================= */}

      <h2 className="section-title">
        Newest Arrivals
      </h2>

      <div className="carousel-wrapper">

        <button
          className="scroll-btn left"
          onClick={() =>
            scroll("left")
          }
          aria-label="Previous products"
        >
          &#8592;
        </button>

        <div
          className="carousel"
          ref={scrollRef}
        >
          {landingProducts.map(
            (product) => {
              const wished =
                isWishlisted(
                  product.id
                );

              return (
                <div
                  className="landing-product-card"
                  key={product.id}
                >

                  <div className="landing-new-label">
                    NEW
                  </div>

                  <button
                    className={`landing-wishlist-heart ${
                      wished
                        ? "active"
                        : ""
                    }`}
                    aria-label={
                      wished
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    onClick={() =>
                      toggleWishlist(
                        product
                      )
                    }
                  >
                    {wished
                      ? "♥"
                      : "♡"}
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <h4>
                    {product.name}
                  </h4>

                  <p>
                    ₹
                    {product.price.toFixed(
                      2
                    )}
                  </p>

                  <button
                    className="landing-buy-btn"
                    onClick={() =>
                      handleAddToCart(
                        product
                      )
                    }
                  >
                    {addedProductId ===
                    product.id
                      ? "Added!"
                      : "Add to Cart"}
                  </button>

                </div>
              );
            }
          )}
        </div>

        <button
          className="scroll-btn right"
          onClick={() =>
            scroll("right")
          }
          aria-label="Next products"
        >
          &#8594;
        </button>

      </div>

      {/* =================================================
          ABOUT SECTION
          ================================================= */}

      <div className="about-container">

        <div className="about-text">

          <h3>
            The Story of Lumina
          </h3>

          <p>
            Lumina began as a heartfelt
            passion project in 2010,
            born from a simple dream —
            to fill homes with warmth,
            comfort, and the gentle glow
            of handcrafted candles.
            What started as a few
            hand-poured creations in a
            small kitchen has since grown
            into a beloved brand, known
            for its dedication to quality,
            sustainability, and beauty.

            Each Lumina candle is
            thoughtfully made with premium
            ingredients and inspired by
            everyday moments — from cozy
            evenings and joyful
            celebrations to quiet mornings
            and fresh beginnings.

            Our mission has always been to
            turn the ordinary into
            something extraordinary, one
            flicker at a time.
          </p>

        </div>

        <div className="fade-slideshow">

          {aboutImages.map(
            (image, index) => (
              <img
                key={image.id}
                src={image.src}
                alt={image.alt}
                className={`fade-image ${
                  index ===
                  currentIndex
                    ? "visible"
                    : ""
                }`}
              />
            )
          )}

        </div>

      </div>

      {/* =================================================
          NEWSLETTER
          ================================================= */}

      <div className="newsletter-section">

        <div className="newsletter-box">

          <div className="newsletter-left">

            <h3>
              REACH THE FULL MELT POOL -
            </h3>

            <h4>
              SIGN UP TO OUR NEWSLETTER
            </h4>

            <ul className="newsletter-perks">

              <li>
                <FaFire className="perk-icon" />
                Get the inside scoop on
                our latest products
              </li>

              <li>
                <FaFire className="perk-icon" />
                Be first in line for flash
                sales and seasonal deals
              </li>

              <li>
                <FaFire className="perk-icon" />
                Recipes delivered to your
                inbox
              </li>

              <li>
                <FaFire className="perk-icon" />
                Trade secrets to grow your
                skills
              </li>

            </ul>

          </div>

          <form
            className="newsletter-form"
            onSubmit={(event) =>
              event.preventDefault()
            }
          >
            <input
              type="text"
              placeholder="Name"
              required
            />

            <input
              type="email"
              placeholder="Email"
              required
            />

            <button type="submit">
              SEND
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   STAR RATING
   ========================================================= */

function StarRating({
  rating,
}) {
  return (
    <div
      className="star-rating"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {[0, 1, 2, 3, 4].map(
        (index) => (
          <span
            key={index}
            className={
              index < rating
                ? "star filled"
                : "star"
            }
          >
            ★
          </span>
        )
      )}
    </div>
  );
}

/* =========================================================
   STORE PAGE
   ========================================================= */

export function StorePage({
  searchQuery = "",
  selectedCategory = "All",
  addToCart,
}) {
  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  const toggleWishlist = (
    product
  ) => {
    if (
      isWishlisted(product.id)
    ) {
      removeFromWishlist(
        product.id
      );
    } else {
      addToWishlist(product);
    }
  };

  const filteredProducts =
    storeProducts.filter(
      (product) => {
        const categoryMatches =
          selectedCategory ===
            "All" ||
          product.category ===
            selectedCategory;

        const searchMatches =
          product.name
            .toLowerCase()
            .includes(
              searchQuery
                .toLowerCase()
            );

        return (
          categoryMatches &&
          searchMatches
        );
      }
    );

  return (
    <div className="store-page-container">

      <main className="store-main">

        <h1>
          {selectedCategory} Products{" "}
          {searchQuery &&
            `- Search: "${searchQuery}"`}
        </h1>

        <div className="product-grid">

          {filteredProducts.length >
          0 ? (
            filteredProducts.map(
              (product) => {

                const wished =
                  isWishlisted(
                    product.id
                  );

                return (
                  <div
                    key={product.id}
                    className="product-card"
                  >

                    {product.category ===
                      "Bestsellers" && (
                      <span
                        className="hot-badge"
                        aria-label="Bestseller"
                      >
                        HOT!
                      </span>
                    )}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />

                    <h4>
                      {product.name}
                    </h4>

                    <StarRating
                      rating={
                        product.rating
                      }
                    />

                    <p className="product-description">
                      {product.description}
                    </p>

                    <p className="product-price">
                      ₹
                      {product.price.toFixed(
                        2
                      )}
                    </p>

                    <p
                      className={`product-stock ${
                        product.stock ===
                        0
                          ? "out-of-stock"
                          : ""
                      }`}
                    >
                      {product.stock >
                      0
                        ? "In Stock"
                        : "Out of Stock"}
                    </p>

                    <button
                      className={`wishlist-btn ${
                        wished
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleWishlist(
                          product
                        )
                      }
                      aria-label={
                        wished
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                    >
                      {wished
                        ? "♥"
                        : "♡"}
                    </button>

                    <button
                      className="add-to-cart-btn"
                      onClick={() =>
                        addToCart(
                          product
                        )
                      }
                      disabled={
                        product.stock ===
                        0
                      }
                    >
                      Add to Cart
                    </button>

                  </div>
                );
              }
            )
          ) : (
            <p>
              No products found.
            </p>
          )}

        </div>

      </main>

    </div>
  );
}

/* =========================================================
   CART DRAWER
   ========================================================= */

export function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onRemoveItem,
  onUpdateQty,
  onMoveToWishlist,
}) {
  const [
    shippingMethod,
    setShippingMethod,
  ] = useState("standard");

  const [
    showHelp,
    setShowHelp,
  ] = useState(false);

  const total =
    cartItems.reduce(
      (
        accumulator,
        {
          product,
          quantity,
        }
      ) =>
        accumulator +
        product.price *
          quantity,
      0
    );

  return (
    <div
      className={`offcanvas offcanvas-end ${
        isOpen ? "show" : ""
      }`}
      tabIndex="-1"
      style={{
        visibility: isOpen
          ? "visible"
          : "hidden",
      }}
      aria-labelledby="cartDrawerLabel"
    >

      <div className="offcanvas-header">

        <h5
          className="offcanvas-title"
          id="cartDrawerLabel"
        >
          Cart
        </h5>

        <button
          type="button"
          className="btn-close text-reset"
          onClick={onClose}
          aria-label="Close"
        />

      </div>

      <div className="offcanvas-body d-flex flex-column justify-content-between">

        <div>

          {cartItems.length ===
          0 ? (
            <div className="text-center mt-4">

              <p>
                Your cart is empty.
              </p>

              <p>
                No products found in
                your cart.
              </p>

              <button
                className="shop btn btn-primary mt-3"
                onClick={onClose}
              >
                Continue Shopping →
              </button>

            </div>
          ) : (

            <ul className="list-group mb-4">

              {cartItems.map(
                ({
                  product,
                  quantity,
                }) => (

                  <li
                    key={product.id}
                    className="list-group-item d-flex align-items-center justify-content-between"
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-thumbnail me-3"
                      style={{
                        width: "80px",
                        height: "100px",
                        objectFit:
                          "cover",
                      }}
                    />

                    <div className="flex-grow-1">

                      <h6>
                        {product.name}
                      </h6>

                      <p className="mb-1">
                        ₹
                        {product.price.toFixed(
                          2
                        )}
                      </p>

                      <div className="d-flex align-items-center gap-2">

                        <label
                          htmlFor={`qty-${product.id}`}
                          className="form-label mb-0 me-1"
                        >
                          Qty:
                        </label>

                        <input
                          id={`qty-${product.id}`}
                          type="number"
                          className="form-control"
                          value={quantity}
                          min="1"
                          style={{
                            width: "70px",
                          }}
                          onChange={(
                            event
                          ) =>
                            onUpdateQty(
                              product.id,
                              parseInt(
                                event
                                  .target
                                  .value,
                                10
                              )
                            )
                          }
                        />

                        <button
                          type="button"
                          className="wishlist-button"
                          onClick={() =>
                            onMoveToWishlist(
                              product.id
                            )
                          }
                        >
                          <span className="plus-icon">
                            +
                          </span>

                          <span className="heart-icon">
                            ♡
                          </span>
                        </button>

                      </div>

                    </div>

                    <button
                      type="button"
                      className="remove-button"
                      onClick={() =>
                        onRemoveItem(
                          product.id
                        )
                      }
                      title="Remove item"
                    >
                      ✖
                    </button>

                  </li>
                )
              )}

            </ul>
          )}

          {cartItems.length >
            0 && (
            <>
              <div className="mb-3">

                <label className="form-label fw-semibold">
                  Shipping Method
                </label>

                <select
                  className="form-select"
                  value={
                    shippingMethod
                  }
                  onChange={(event) =>
                    setShippingMethod(
                      event.target.value
                    )
                  }
                >
                  <option value="standard">
                    Standard Shipping
                    (3-5 days)
                  </option>

                  <option value="express">
                    Express Shipping
                    (1-2 days)
                  </option>

                  <option value="pickup">
                    Store Pickup
                    (Free)
                  </option>
                </select>

                <button
                  className="btn btn-link p-0 mt-1"
                  onClick={() =>
                    setShowHelp(
                      (value) =>
                        !value
                    )
                  }
                >
                  Need Help?
                </button>

                {showHelp && (
                  <div className="alert alert-info mt-2 small">

                    <strong>
                      Shipping Options:
                    </strong>

                    <br />

                    - Standard:
                    Affordable &
                    reliable, 3–5 days.

                    <br />

                    - Express:
                    Fast delivery
                    within 1–2 days.

                    <br />

                    - Pickup:
                    Collect from store
                    for free.

                  </div>
                )}

              </div>

              <div className="d-flex justify-content-between fw-bold fs-5 mt-4">

                <span>
                  Total:
                </span>

                <span>
                  ₹
                  {total.toFixed(
                    2
                  )}
                </span>

              </div>

              <button
                className="btn btn-success w-100 mt-3"
                onClick={() =>
                  alert(
                    "Checkout is not connected yet."
                  )
                }
              >
                Proceed to Checkout →
              </button>

            </>
          )}

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   WISHLIST DRAWER
   ========================================================= */

export function WishlistDrawer({
  isOpen,
  onClose,
}) {
  const {
    wishlistItems,
    removeFromWishlist,
    moveToCart,
  } = useWishlist();

  const {
    addToCart,
  } = useCart();

  return (
    <div
      className={`offcanvas offcanvas-end ${
        isOpen ? "show" : ""
      }`}
      tabIndex="-1"
      style={{
        visibility: isOpen
          ? "visible"
          : "hidden",
      }}
    >

      <div className="offcanvas-header">

        <h5 className="offcanvas-title">
          Your Wishlist
        </h5>

        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        />

      </div>

      <div className="offcanvas-body">

        {wishlistItems.length ===
        0 ? (
          <p className="text-muted">
            Your wishlist is empty.
          </p>
        ) : (

          wishlistItems.map(
            (item) => (

              <div
                key={item.id}
                className="wishlist-item d-flex mb-3 align-items-center"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="me-3"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit:
                      "cover",
                    borderRadius:
                      "5px",
                  }}
                />

                <div className="flex-grow-1">

                  <h6 className="mb-1">
                    {item.name}
                  </h6>

                  <p className="mb-1">
                    ₹
                    {item.price.toFixed(
                      2
                    )}
                  </p>

                  <div>

                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() =>
                        moveToCart(
                          item.id,
                          addToCart
                        )
                      }
                    >
                      Move to Cart
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        removeFromWishlist(
                          item.id
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            )
          )

        )}

      </div>

    </div>
  );
}

/* =========================================================
   EXPORTS
   ========================================================= */

export {
  landingProducts,
  storeProducts,
  aboutImages,
};
