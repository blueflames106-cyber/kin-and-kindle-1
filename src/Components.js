# Components.js

```javascript
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaStore,
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaHeart,
  FaSearch,
  FaEye,
  FaEyeSlash,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaGithub,
} from "react-icons/fa";

import logo from "./assets/brandname.png";

/* =========================================================
   HEADER
   ========================================================= */

export function Header({
  currentUser,
  onLogoutClick,
  onLoginClick,
  onCartClick,
  onWishlistClick,
  cartCount = 0,
  wishlistCount = 0,
}) {
  const activateWithKeyboard = (event, callback) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      callback();
    }
  };

  return (
    <header className="header">
      <nav className="navbar">

        <NavLink
          to="/"
          className="logo-link"
          aria-label="Lumina Home"
        >
          <img
            src={logo}
            alt="Lumina Logo"
            className="logo"
          />
        </NavLink>

        <ul className="nav-links">

          <li className="nav-icon" data-tooltip="Home">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "icon-btn active"
                  : "icon-btn"
              }
              aria-label="Home"
            >
              <FaHome aria-hidden="true" />
            </NavLink>
          </li>

          <li className="nav-icon" data-tooltip="Store">
            <NavLink
              to="/store"
              className={({ isActive }) =>
                isActive
                  ? "icon-btn active"
                  : "icon-btn"
              }
              aria-label="Store"
            >
              <FaStore aria-hidden="true" />
            </NavLink>
          </li>

          <li
            className="nav-icon"
            data-tooltip="Wishlist"
            role="button"
            tabIndex={0}
            onClick={onWishlistClick}
            onKeyDown={(event) =>
              activateWithKeyboard(
                event,
                onWishlistClick
              )
            }
            aria-label={`Open wishlist with ${wishlistCount} items`}
          >
            <div
              style={{
                position: "relative",
              }}
            >
              <FaHeart
                className="icon-btn"
                aria-hidden="true"
              />

              {wishlistCount > 0 && (
                <span className="wishlist-badge">
                  {wishlistCount}
                </span>
              )}
            </div>
          </li>

          <li
            className="nav-icon"
            data-tooltip="Cart"
            role="button"
            tabIndex={0}
            onClick={onCartClick}
            onKeyDown={(event) =>
              activateWithKeyboard(
                event,
                onCartClick
              )
            }
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <div
              style={{
                position: "relative",
              }}
            >
              <FaShoppingCart
                className="icon-btn"
                aria-hidden="true"
              />

              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount}
                </span>
              )}
            </div>
          </li>

          <li
            className="nav-icon"
            data-tooltip={
              currentUser ? "Logout" : "Login"
            }
          >
            {currentUser ? (
              <div className="welcome-user">
                Welcome,{" "}
                <span className="username">
                  {currentUser}
                </span>

                <button
                  type="button"
                  onClick={onLogoutClick}
                  className="logout-btn"
                  aria-label="Logout"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <FaUser
                className="icon-btn"
                onClick={onLoginClick}
                style={{
                  cursor: "pointer",
                }}
                aria-label="Login"
              />
            )}
          </li>

        </ul>
      </nav>
    </header>
  );
}


/* =========================================================
   SEARCH BAR
   ========================================================= */

const SEARCH_CATEGORIES = [
  "All",
  "Bestsellers",
  "Signature Collection",
  "Newest Arrivals",
];

export function SearchBar({
  onSearch,
  onCategoryChange,
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const updateSearch = (value) => {
    setQuery(value);

    if (typeof onSearch === "function") {
      onSearch(value, category);
    }
  };

  const updateCategory = (value) => {
    setCategory(value);

    if (
      typeof onCategoryChange === "function"
    ) {
      onCategoryChange(value, query);
    }
  };

  const clearSearch = () => {
    setQuery("");

    if (typeof onSearch === "function") {
      onSearch("", category);
    }
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-container">

        <select
          value={category}
          onChange={(event) =>
            updateCategory(event.target.value)
          }
          className="category-select"
          aria-label="Product category"
        >
          {SEARCH_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="search-input-wrapper">
          <input
            type="search"
            placeholder="Search products..."
            value={query}
            onChange={(event) =>
              updateSearch(event.target.value)
            }
            className="search-input"
            aria-label="Search products"
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="clear-button"
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>

        <button
          type="button"
          className="search-icon-button"
          aria-label="Search"
        >
          <FaSearch />
        </button>

      </div>
    </div>
  );
}


/* =========================================================
   PROMOTIONAL BANNER
   ========================================================= */

export function PromoBanner() {
  const navigate = useNavigate();

  const openStore = () => {
    navigate("/store");
  };

  return (
    <div className="promo-banner">
      <div className="promo-content">

        <h1 className="promo-title">
          FLAMING HOT SALE
        </h1>

        <h2 className="promo-subtitle">
          50% off Selected Items
        </h2>

        <p className="promo-message">
          While stocks last!
        </p>

        <p className="promo-footer">
          Online * T&C’s apply
        </p>

        <button
          type="button"
          className="promo-btn"
          onClick={openStore}
        >
          Shop Now
        </button>

      </div>
    </div>
  );
}


/* =========================================================
   LOGIN / REGISTER MODAL
   ========================================================= */

export function LoginRegisterModal({
  isLogin,
  onClose,
  switchForm,
  onLoginSuccess,
}) {
  const [registration, setRegistration] =
    useState({
      firstName: "",
      surname: "",
      username: "",
      email: "",
      password: "",
    });

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [errors, setErrors] = useState({});

  const [loginIdentity, setLoginIdentity] =
    useState("");

  const [loginPassword, setLoginPassword] =
    useState("");

  const [rememberMe, setRememberMe] =
    useState(false);

  const [loginError, setLoginError] =
    useState("");

  const [showRegistrationPassword, setShowRegistrationPassword] =
    useState(false);

  const [showLoginPassword, setShowLoginPassword] =
    useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(
          "rememberedLogin"
        )
      );

      if (saved) {
        setLoginIdentity(
          saved.usernameOrEmail || ""
        );
        setLoginPassword(
          saved.password || ""
        );
        setRememberMe(true);
      }
    } catch {
      localStorage.removeItem(
        "rememberedLogin"
      );
    }
  }, []);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );

  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  const updateRegistration = (event) => {
    const {
      name,
      value,
    } = event.target;

    setRegistration((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const registerUser = (event) => {
    event.preventDefault();

    const nextErrors = {};

    const data = {
      firstName:
        registration.firstName.trim(),
      surname:
        registration.surname.trim(),
      username:
        registration.username.trim(),
      email:
        registration.email.trim(),
      password:
        registration.password.trim(),
    };

    if (!data.firstName) {
      nextErrors.firstName =
        "First name required";
    }

    if (!data.surname) {
      nextErrors.surname =
        "Surname required";
    }

    if (!data.username) {
      nextErrors.username =
        "Username required";
    }

    if (!validateEmail(data.email)) {
      nextErrors.email =
        "Invalid email";
    }

    if (!validatePassword(data.password)) {
      nextErrors.password =
        "Password must be 8+ characters, include a capital letter and number";
    }

    if (
      data.password !==
      confirmPassword
    ) {
      nextErrors.confirmPassword =
        "Passwords do not match";
    }

    if (
      Object.keys(nextErrors).length
    ) {
      setErrors(nextErrors);
      return;
    }

    let users = [];

    try {
      users =
        JSON.parse(
          localStorage.getItem("users")
        ) || [];
    } catch {
      users = [];
    }

    const duplicate = users.some(
      (user) =>
        user.username ===
          data.username ||
        user.email === data.email
    );

    if (duplicate) {
      alert(
        "User already exists with this email or username."
      );
      return;
    }

    const updatedUsers = [
      ...users,
      data,
    ];

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    alert(
      `Registered successfully as ${data.username}`
    );

    onLoginSuccess(data.username);
    onClose();
  };

  const loginUser = (event) => {
    event.preventDefault();

    setLoginError("");

    if (
      !loginIdentity.trim() ||
      !loginPassword.trim()
    ) {
      setLoginError(
        "Please fill in both fields"
      );
      return;
    }

    let users = [];

    try {
      users =
        JSON.parse(
          localStorage.getItem("users")
        ) || [];
    } catch {
      users = [];
    }

    const matchedUser = users.find(
      (user) =>
        (
          user.username ===
            loginIdentity ||
          user.email === loginIdentity
        ) &&
        user.password === loginPassword
    );

    if (!matchedUser) {
      setLoginError(
        "Invalid email/username or password"
      );
      return;
    }

    if (rememberMe) {
      localStorage.setItem(
        "rememberedLogin",
        JSON.stringify({
          usernameOrEmail:
            loginIdentity,
          password:
            loginPassword,
        })
      );
    } else {
      localStorage.removeItem(
        "rememberedLogin"
      );
    }

    onLoginSuccess(
      matchedUser.username
    );

    onClose();
  };

  const handleOverlayClick = (event) => {
    if (
      event.target === event.currentTarget
    ) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className="modal-content"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h2>
          {isLogin
            ? "Login to Lumina"
            : "Register for Lumina"}
        </h2>

        <form
          onSubmit={
            isLogin
              ? loginUser
              : registerUser
          }
        >

          {!isLogin && (
            <>
              <label>
                First Name
                <input
                  type="text"
                  name="firstName"
                  value={
                    registration.firstName
                  }
                  onChange={
                    updateRegistration
                  }
                  required
                />
                {errors.firstName && (
                  <small className="error">
                    {errors.firstName}
                  </small>
                )}
              </label>

              <label>
                Surname
                <input
                  type="text"
                  name="surname"
                  value={
                    registration.surname
                  }
                  onChange={
                    updateRegistration
                  }
                  required
                />
                {errors.surname && (
                  <small className="error">
                    {errors.surname}
                  </small>
                )}
              </label>

              <label>
                Username
                <input
                  type="text"
                  name="username"
                  value={
                    registration.username
                  }
                  onChange={
                    updateRegistration
                  }
                  required
                />
                {errors.username && (
                  <small className="error">
                    {errors.username}
                  </small>
                )}
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={
                    registration.email
                  }
                  onChange={
                    updateRegistration
                  }
                  required
                />
                {errors.email && (
                  <small className="error">
                    {errors.email}
                  </small>
                )}
              </label>

              <label>
                Password

                <div className="password-wrapper">
                  <input
                    type={
                      showRegistrationPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={
                      registration.password
                    }
                    onChange={
                      updateRegistration
                    }
                    required
                  />

                  <button
                    type="button"
                    className="eye-icon"
                    onClick={() =>
                      setShowRegistrationPassword(
                        (value) => !value
                      )
                    }
                    aria-label={
                      showRegistrationPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showRegistrationPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <small className="error">
                    {errors.password}
                  </small>
                )}
              </label>

              <label>
                Confirm Password

                <input
                  type={
                    showRegistrationPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    confirmPassword
                  }
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  required
                />

                {errors.confirmPassword && (
                  <small className="error">
                    {
                      errors.confirmPassword
                    }
                  </small>
                )}
              </label>
            </>
          )}

          {isLogin && (
            <>
              <label>
                Email or Username

                <input
                  type="text"
                  value={loginIdentity}
                  onChange={(event) =>
                    setLoginIdentity(
                      event.target.value
                    )
                  }
                  required
                />
              </label>

              <label>
                Password

                <div className="password-wrapper">
                  <input
                    type={
                      showLoginPassword
                        ? "text"
                        : "password"
                    }
                    value={loginPassword}
                    onChange={(event) =>
                      setLoginPassword(
                        event.target.value
                      )
                    }
                    required
                  />

                  <button
                    type="button"
                    className="eye-icon"
                    onClick={() =>
                      setShowLoginPassword(
                        (value) => !value
                      )
                    }
                    aria-label={
                      showLoginPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showLoginPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>
              </label>

              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() =>
                    setRememberMe(
                      (value) => !value
                    )
                  }
                />
                Remember me
              </label>

              {loginError && (
                <small className="error">
                  {loginError}
                </small>
              )}
            </>
          )}

          <button
            type="submit"
            className="submit-btn"
          >
            {isLogin
              ? "Sign in"
              : "Register"}
          </button>
        </form>

        <div className="switch-form">
          {isLogin ? (
            <>
              No online profile?{" "}
              <button
                type="button"
                onClick={switchForm}
                className="switch-btn"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={switchForm}
                className="switch-btn"
              >
                Login
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}


/* =========================================================
   FOOTER
   ========================================================= */

export function Footer() {
  const stopFormSubmission = (event) => {
    event.preventDefault();
  };

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section brand">
          <h4 className="brand-name">
            Lumina
          </h4>

          <p className="brand-description">
            Where elegance meets aroma.
            Handcrafted candles made to calm,
            captivate, and create mood.
          </p>
        </div>

        <div className="footer-section links">
          <h5>Quick Links</h5>

          <ul>
            <li>
              <a
                href="/"
                className="footer-link"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="/store"
                className="footer-link"
              >
                Shop
              </a>
            </li>

            <li>
              <a
                href="/contact"
                className="footer-link"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section newsletter">

          <h5>Stay in Touch</h5>

          <p>
            Be the first to know about new
            collections and special offers.
          </p>

          <form
            className="newsletter-form"
            onSubmit={
              stopFormSubmission
            }
            aria-label="Subscribe to newsletter"
          >
            <input
              type="email"
              placeholder="Your email"
              className="newsletter-input"
              required
              aria-required="true"
            />

            <button
              type="submit"
              className="btn-subscribe"
            >
              Subscribe
            </button>
          </form>

          <div
            className="social-icons"
            role="list"
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="social-link"
              role="listitem"
            >
              <FaInstagram />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="social-link"
              role="listitem"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="social-link"
              role="listitem"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2025 Lumina. All rights reserved.
        </p>

        <p>
          Developed by Chante Schnetler
        </p>

        <a
          href="https://github.com/Zu3ty"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="github-link"
        >
          <FaGithub />
          <span>GitHub</span>
        </a>

      </div>

    </footer>
  );
}
```

