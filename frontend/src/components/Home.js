import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home({ user, onLogout }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto" }}>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a
            className="navbar-brand fw-bold text-danger"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            FoodExpress
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item me-3">
                <a
                  className="nav-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/restaurants");
                  }}
                >
                  Restaurants
                </a>
              </li>
              <li className="nav-item me-3">
                <a
                  className="nav-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/orders");
                  }}
                >
                  My Orders
                </a>
              </li>
              <li className="nav-item me-3">
                <a
                  className="nav-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/cart");
                  }}
                >
                  Cart
                </a>
              </li>

              {user ? (
                <>
                  <li className="nav-item me-2">
                    <span className="fw-bold text-dark">👤 {user.name}</span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={onLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item me-2">
                    <button
                      className="btn btn-outline-danger me-2"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-danger"
                      onClick={() => navigate("/register")}
                    >
                      Sign Up
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header
        className="py-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <div className="container py-5 text-center">
          <h1 className="display-5 fw-bold">Delicious food, delivered fast.</h1>
          <p className="lead mb-4">Order from the best restaurants. Prices in ₹ INR.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button
              className="btn btn-danger btn-lg"
              onClick={() => navigate("/restaurants")}
            >
              Explore Restaurants
            </button>
            {!user && (
              <button
                className="btn btn-outline-light btn-lg"
                onClick={() => navigate("/register")}
              >
                Get Started (Sign Up)
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HOW IT WORKS SECTION */}
      <section className="py-5" style={{ backgroundColor: "#fff5ec" }}>
        <div className="container text-center">
          <h2 className="fw-bold text-danger mb-5">🚀 How It Works</h2>
          <div className="row g-4">
            {[
              {
                icon: "🛍️",
                title: "Choose Restaurant",
                desc: "Browse a wide range of restaurants and cuisines.",
              },
              {
                icon: "🍛",
                title: "Select Your Meal",
                desc: "Add your favorite dishes to the cart.",
              },
              {
                icon: "💳",
                title: "Make Payment",
                desc: "Choose UPI or Cash on Delivery for easy checkout.",
              },
              {
                icon: "🚚",
                title: "Get It Delivered",
                desc: "Sit back and relax — your food is on the way!",
              },
            ].map((step, i) => (
              <div key={i} className="col-md-3">
                <div className="card shadow-sm border-0 h-100 p-4 rounded-4">
                  <div className="fs-1 mb-3">{step.icon}</div>
                  <h5 className="fw-bold text-danger">{step.title}</h5>
                  <p className="text-muted mt-2">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold text-danger mb-5">💬 What Our Customers Say</h2>
          <div className="row g-4 justify-content-center">
            {[
              {
                name: "Aarav Patel",
                text: "FoodExpress never disappoints! Super fast delivery and the food always tastes amazing. ❤️",
              },
              {
                name: "Priya Sharma",
                text: "Absolutely love how easy it is to order from my favorite restaurants. Highly recommend!",
              },
              {
                name: "Rohan Mehta",
                text: "Great variety, easy payments, and amazing offers. It’s my go-to app for dinner time!",
              },
            ].map((review, i) => (
              <div key={i} className="col-md-4">
                <div
                  className="card shadow-sm border-0 h-100 p-4 rounded-4"
                  style={{ backgroundColor: "#fff" }}
                >
                  <p className="fst-italic text-muted mb-3">
                    “{review.text}”
                  </p>
                  <h6 className="fw-bold text-danger">— {review.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US */}
      <section className="py-5 bg-white">
        <div className="container">
          <h4 className="text-center text-danger fw-bold mb-4">Contact Us</h4>
          <div className="row justify-content-center">
            <div className="col-md-8">
              {submitted ? (
                <div className="alert alert-success text-center">
                  ✅ Thank you! Your message has been sent.
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-light p-4 rounded-4 shadow-sm"
                >
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Type your message here..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>
                  <div className="text-center">
                    <button className="btn btn-danger px-4" type="submit">
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#222",
          color: "#fff",
          padding: "40px 0 10px",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div className="row justify-content-center text-start">
            <div className="col-md-3 mb-3">
              <h5 className="text-warning fw-bold mb-3">🍴 FoodExpress India</h5>
              <p style={{ fontSize: "14px", color: "#bbb" }}>
                Your favorite online food ordering system. Bringing delicious
                meals from top Indian restaurants right to your doorstep.
              </p>
            </div>
            <div className="col-md-3 mb-3">
              <h6 className="fw-bold text-light mb-3">Quick Links</h6>
              <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
                <li>
                  <a href="/" style={{ color: "#bbb", textDecoration: "none" }}>
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/restaurants"
                    style={{ color: "#bbb", textDecoration: "none" }}
                  >
                    Restaurants
                  </a>
                </li>
                <li>
                  <a
                    href="/register"
                    style={{ color: "#bbb", textDecoration: "none" }}
                  >
                    Register
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    style={{ color: "#bbb", textDecoration: "none" }}
                  >
                    Login
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 mb-3">
              <h6 className="fw-bold text-light mb-3">Contact Us</h6>
              <p style={{ fontSize: "14px", color: "#bbb" }}>
                📞 +91 98765 43210
                <br />
                📧 support@foodexpress.in
                <br />
                📍 Ahmedabad, Gujarat, India
              </p>
            </div>
          </div>

          <hr style={{ borderColor: "#444" }} />

          <p style={{ color: "#aaa", fontSize: "13px" }}>
            © {new Date().getFullYear()} <strong>FoodExpress India</strong> — All
            Rights Reserved.
            <br />
            Made with ❤️ for Indian Food Lovers.
          </p>
        </div>
      </footer>
    </div>
  );
}
