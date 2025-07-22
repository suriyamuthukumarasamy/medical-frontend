import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const AdminOrderTable = () => {
  const [orders, setOrders] = useState([]);

  // 🔁 Fetch all orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://medical-backend-teal.vercel.app/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  // 🗑️ Delete order as admin
  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://medical-backend-teal.vercel.app/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      alert("✅ Order deleted successfully.");
    } catch (err) {
      console.error("Error deleting order", err);
      alert("❌ Failed to delete the order.");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h3 className="mb-3">📦 Customer Orders</h3>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="table table-bordered align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order._id}>
                  <td>{i + 1}</td>
                  <td>{order.user?.name || "Guest"}</td>
                  <td>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="d-flex align-items-center mb-2">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px", borderRadius: "5px" }}
                          />
                        )}
                        <div className="text-start">
                          <div><strong>{item.name}</strong></div>
                          <div>Qty: {item.quantity}</div>
                          <div>₹{item.price}</div>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(order._id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminOrderTable;
