import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("❌ You must be logged in to view your orders.");
      return;
    }

    try {
      const res = await axios.get("https://medical-backend-teal.vercel.app/api/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setError("❌ Failed to fetch your orders. Try again later.");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://medical-backend-teal.vercel.app/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      alert("✅ Order cancelled successfully.");
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("❌ Failed to cancel the order.");
    }
  };

  const handleRemoveItem = async (orderId, itemId) => {
    if (!itemId) {
      alert("❌ Item ID is missing. Cannot remove item.");
      return;
    }

    if (!window.confirm("Remove this product from your order?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `https://medical-backend-teal.vercel.app/api/orders/${orderId}/items/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Replace the order with the updated order returned from backend
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? res.data.order : order
        )
      );
      alert("✅ Product removed from order.");
    } catch (err) {
      console.error("Error removing product:", err);
      alert("❌ Failed to remove the product.");
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>🛒 My Orders</h2>

      {error && <p style={styles.error}>{error}</p>}

      {orders.length === 0 && !error ? (
        <p style={styles.empty}>You have not placed any orders yet.</p>
      ) : (
        orders.map((order, i) => (
          <div key={order._id} style={styles.orderCard}>
            <h4 style={styles.orderTitle}>Order #{i + 1}</h4>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>

            <div>
              <strong>Items:</strong>
              <div style={styles.itemsGrid}>
                {order.items.map((item, idx) => {
                  const itemId = item._id; // ✅ Use order item ID for removal
                  return (
                    <div key={idx} style={styles.itemBox}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={styles.itemImage}
                        />
                      )}
                      <div>
                        <p style={{ margin: 0 }}><strong>{item.name}</strong></p>
                        <p style={{ margin: 0 }}>Qty: {item.quantity}</p>
                        <p style={{ margin: 0 }}>Price: ₹{item.price}</p>
                        <p style={{ margin: 0 }}>Subtotal: ₹{item.price * item.quantity}</p>

                        <button
                          onClick={() => handleRemoveItem(order._id, itemId)}
                          style={styles.removeBtn}
                        >
                          ❌ Remove Product
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ textAlign: "right", marginTop: "10px" }}>
              <button
                onClick={() => handleDeleteOrder(order._id)}
                style={styles.deleteBtn}
              >
                🗑️ Cancel Entire Order
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f7f9fc",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#007bff",
  },
  orderCard: {
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
  },
  orderTitle: {
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#333",
  },
  itemsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    marginTop: "10px",
  },
  itemBox: {
    display: "flex",
    gap: "10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "10px",
    width: "100%",
    maxWidth: "300px",
    backgroundColor: "#fafafa",
  },
  itemImage: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  empty: {
    fontSize: "16px",
    color: "#555",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  removeBtn: {
    marginTop: "6px",
    backgroundColor: "#ff6b6b",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default MyOrders;
