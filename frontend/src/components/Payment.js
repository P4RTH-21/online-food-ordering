import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Payment() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiApp, setUpiApp] = useState("");
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [orderStarted, setOrderStarted] = useState(false);
  const [halfTimeWarning, setHalfTimeWarning] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      alert("Please login to continue with payment.");
      navigate("/login");
      return;
    }
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, [navigate, user]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = total * 0.05;
  const delivery = total > 0 ? 40 : 0;
  const finalTotal = total + gst + delivery;

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (paymentMethod === "UPI" && (!upiId || !upiApp)) {
      alert("Please enter your UPI ID and select your UPI app.");
      return;
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const randomTime = Math.floor(Math.random() * (10 - 5 + 1) + 5) * 60; // 5–10 min
    setTimeLeft(randomTime);
    setOrderStarted(true);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleCompleteOrder();
          return 0;
        }
        if (prev === Math.floor(randomTime / 2)) setHalfTimeWarning(true);
        return prev - 1;
      });
    }, 1000);
    setTimer(interval);
  };

  const handleCompleteOrder = () => {
    if (!user) {
      alert("User not found! Please login again.");
      navigate("/login");
      return;
    }

    const userEmail = user.email;
    const key = `completedOrders_${userEmail}`;
    const existingOrders = JSON.parse(localStorage.getItem(key)) || [];

    const newOrders = cartItems.map((item) => ({
      ...item,
      status: "Completed",
      completedAt: new Date().toISOString(),
    }));

    localStorage.setItem(key, JSON.stringify([...existingOrders, ...newOrders]));
    localStorage.removeItem("cart");

    clearInterval(timer);
    alert("✅ Your food is ready for delivery!");

    // ✅ Wait a short moment to allow UI update before navigating
    setTimeout(() => navigate("/"), 300);
  };

  const handleCancelOrder = () => {
    if (timer) clearInterval(timer);

    if (!user) {
      alert("User not found! Please login again.");
      navigate("/login");
      return;
    }

    const userEmail = user.email;
    const key = `cancelledOrders_${userEmail}`;
    const existingOrders = JSON.parse(localStorage.getItem(key)) || [];

    const newOrders = cartItems.map((item) => ({
      ...item,
      status: "Cancelled",
      cancelledAt: new Date().toISOString(),
    }));

    localStorage.setItem(key, JSON.stringify([...existingOrders, ...newOrders]));
    localStorage.removeItem("cart");

    alert("❌ Your order has been cancelled.");

    // ✅ Quick, guaranteed redirect after cancel
    setTimeout(() => navigate("/"), 300);
  };

  // ✅ Always working “Back to Home”
  const handleBackToHome = () => {
    if (timer) clearInterval(timer); // ensure no timer blocks redirect
    setOrderStarted(false);
    navigate("/");
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('https://images.unsplash.com/photo-1627366422957-3efa9c6df0fc?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "500px", width: "100%", borderRadius: "20px" }}
      >
        <h2 className="text-danger mb-4">💳 Payment Summary</h2>

        <ul className="list-group mb-3 text-start">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </li>
          ))}
        </ul>

        <div className="text-start mb-3">
          <p>Subtotal: ₹{total.toFixed(2)}</p>
          <p>GST (5%): ₹{gst.toFixed(2)}</p>
          <p>Delivery Fee: ₹{delivery.toFixed(2)}</p>
          <h5>Total: ₹{finalTotal.toFixed(2)}</h5>
        </div>

        {!orderStarted ? (
          <>
            <div className="mb-3">
              <h5 className="fw-bold">Select Payment Method</h5>
              <div className="form-check text-start">
                <input
                  type="radio"
                  className="form-check-input"
                  id="cod"
                  name="paymentMethod"
                  value="COD"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="cod">
                  Cash on Delivery
                </label>
              </div>
              <div className="form-check text-start">
                <input
                  type="radio"
                  className="form-check-input"
                  id="upi"
                  name="paymentMethod"
                  value="UPI"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="upi">
                  UPI Payment
                </label>
              </div>
            </div>

            {paymentMethod === "UPI" && (
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter your UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
                <select
                  className="form-select"
                  value={upiApp}
                  onChange={(e) => setUpiApp(e.target.value)}
                >
                  <option value="">Select UPI App</option>
                  <option value="Google Pay">Google Pay</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Paytm">Paytm</option>
                  <option value="BHIM">BHIM</option>
                </select>
              </div>
            )}

            <button
              className="btn btn-danger w-100 mt-3"
              onClick={handlePayment}
            >
              Proceed to Payment
            </button>
          </>
        ) : (
          <>
            <h4 className="fw-bold text-success">
              ⏳ Order in Progress: {formatTime(timeLeft)}
            </h4>
            {halfTimeWarning && (
              <p className="text-warning mt-2">
                ⚠️ Halfway done! Don't waste food — it'll be ready soon!
              </p>
            )}
            <div className="mt-4 d-flex justify-content-center gap-3">
              <button
                className="btn btn-outline-danger"
                onClick={handleCancelOrder}
              >
                Cancel Order
              </button>
            </div>
          </>
        )}

        {/* 🏠 Back to Home Button (always works now) */}
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={handleBackToHome}
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
