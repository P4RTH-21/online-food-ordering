import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Orders() {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);

    if (user && user.email) {
      // ✅ Load user-specific completed and cancelled orders
      const completed =
        JSON.parse(localStorage.getItem(`completedOrders_${user.email}`)) || [];
      const cancelled =
        JSON.parse(localStorage.getItem(`cancelledOrders_${user.email}`)) || [];

      setCompletedOrders(completed);
      setCancelledOrders(cancelled);
    } else {
      // ❌ If no user is logged in, clear all order data from state
      setCompletedOrders([]);
      setCancelledOrders([]);
    }
  }, []);

  const noOrders = completedOrders.length === 0 && cancelledOrders.length === 0;

  return (
    <div
      className="py-5"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url('https://images.unsplash.com/photo-1606788075761-676fa0c55288?auto=format&fit=crop&w=1400&q=80')",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <h2 className="text-danger fw-bold text-center mb-5">📦 My Orders</h2>

        {/* ✅ IF NO USER LOGGED IN */}
        {!currentUser ? (
          <div className="text-center mt-5">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Orders"
              style={{ width: "150px", marginBottom: "20px", opacity: 0.8 }}
            />
            <h5 className="text-muted mb-3">
              Please log in to view your orders.
            </h5>
            <button
              className="btn btn-danger px-4"
              onClick={() => navigate("/login")}
            >
              🔑 Login Now
            </button>
          </div>
        ) : (
          <>
            {/* 🟢 COMPLETED ORDERS */}
            <section className="mb-5">
              <h4 className="text-success fw-bold mb-4">
                ✅ Completed Orders
              </h4>
              {completedOrders.length === 0 ? (
                <p className="text-muted">
                  No completed orders yet.{" "}
                  <button
                    className="btn btn-link p-0 text-danger"
                    onClick={() => navigate("/restaurants")}
                  >
                    Go to restaurants
                  </button>{" "}
                  and order something!
                </p>
              ) : (
                <div className="row g-4">
                  {completedOrders.map((order, index) => (
                    <div key={index} className="col-md-4">
                      <div
                        className="card border-success border-2 shadow-sm rounded-4 p-3"
                        style={{ backgroundColor: "#f8fff9" }}
                      >
                        <h6 className="fw-bold text-success mb-2">
                          {order.name}
                        </h6>
                        <p className="text-muted small mb-1">
                          Quantity: {order.qty}
                        </p>
                        <p className="text-muted small mb-1">
                          Total: ₹{order.price * order.qty}
                        </p>
                        <p className="text-muted small mb-2">
                          Status:{" "}
                          <span className="fw-semibold text-success">
                            Completed
                          </span>
                        </p>
                        <div className="text-center">
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => navigate("/menu")}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 🔴 CANCELLED ORDERS */}
            <section>
              <h4 className="text-danger fw-bold mb-4">
                ❌ Cancelled Orders
              </h4>
              {cancelledOrders.length === 0 ? (
                <p className="text-muted">No cancelled orders yet.</p>
              ) : (
                <div className="row g-4">
                  {cancelledOrders.map((order, index) => (
                    <div key={index} className="col-md-4">
                      <div
                        className="card border-danger border-2 shadow-sm rounded-4 p-3"
                        style={{ backgroundColor: "#fff5f5" }}
                      >
                        <h6 className="fw-bold text-danger mb-2">
                          {order.name}
                        </h6>
                        <p className="text-muted small mb-1">
                          Quantity: {order.qty}
                        </p>
                        <p className="text-muted small mb-1">
                          Total: ₹{order.price * order.qty}
                        </p>
                        <p className="text-muted small mb-2">
                          Status:{" "}
                          <span className="fw-semibold text-danger">
                            Cancelled
                          </span>
                        </p>
                        <div className="text-center">
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => navigate("/menu")}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* 🟡 EMPTY ORDERS */}
            {noOrders && (
              <div className="text-center mt-5">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                  alt="Empty Orders"
                  style={{
                    width: "150px",
                    marginBottom: "20px",
                    opacity: 0.8,
                  }}
                />
                <h5 className="text-muted mb-3">
                  You haven’t placed any orders yet!
                </h5>
                <button
                  className="btn btn-danger px-4"
                  onClick={() => navigate("/restaurants")}
                >
                  🍴 Go to Restaurants
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
