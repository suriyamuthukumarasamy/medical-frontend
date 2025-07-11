import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import ProductTable from "./ProductTable";
import AdminOrderTable from "./AdminOrderTable";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [hasRedirected, setHasRedirected] = useState(false);
  const [activeTab, setActiveTab] = useState("products"); // ✅ for order
  const [orders, setOrders] = useState([]); // ✅ for order
  const navigate = useNavigate();
  const formRef = useRef(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  const redirectToLogin = useCallback(
    (message) => {
      showAlert("error", message);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setTimeout(() => {
        navigate("/loginIn");
      }, 1500);
    },
    [navigate]
  );

  const handleAuthError = useCallback(
    (err) => {
      if (err.response?.status === 401 && !hasRedirected) {
        setHasRedirected(true);
        redirectToLogin("🔐 Session expired. Please log in again.");
      } else {
        showAlert("error", "❌ Operation failed. Try again.");
      }
    },
    [hasRedirected, redirectToLogin]
  );

  const fetchProducts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/medicines", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      handleAuthError(err);
    }
  }, [handleAuthError]);

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      handleAuthError(err);
    }
  }, [handleAuthError]);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || storedUser.role !== "admin") {
        redirectToLogin("🔒 Admin access required.");
      } else {
        fetchProducts();
        fetchOrders(); // ✅ also fetch orders
      }
    } catch (err) {
      console.error("Admin check failed:", err);
      redirectToLogin("🔒 Invalid session.");
    }
  }, [fetchProducts, fetchOrders, redirectToLogin]);

  useEffect(() => {
    if (editingProduct && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editingProduct]);

  const handleAddProduct = async (productData) => {
    try {
      const token = localStorage.getItem("token");
      const formattedData = {
        ...productData,
        price: Number(productData.price),
        quantity: Number(productData.quantity),
        prescriptionRequired: Boolean(productData.prescriptionRequired),
      };
      await axios.post("http://localhost:5000/api/medicines/add", formattedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      showAlert("success", "✅ Product added successfully!");
    } catch (err) {
      console.error("Failed to add product:", err);
      handleAuthError(err);
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/medicines/${productToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      showAlert("success", "🗑️ Product deleted.");
    } catch (err) {
      console.error("Delete failed:", err);
      handleAuthError(err);
    } finally {
      setProductToDelete(null);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const token = localStorage.getItem("token");
      const { _id, ...updateData } = {
        ...updatedProduct,
        price: Number(updatedProduct.price),
        quantity: Number(updatedProduct.quantity),
        prescriptionRequired: Boolean(updatedProduct.prescriptionRequired),
      };
      await axios.put(
        `http://localhost:5000/api/medicines/${updatedProduct._id}`,
        updateData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingProduct(null);
      fetchProducts();
      showAlert("success", "✏️ Product updated.");
    } catch (err) {
      console.error("Update failed:", err);
      handleAuthError(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ color: "#007bff" }}>Admin Dashboard</h2>
        <p style={styles.subtitle}>Manage your product inventory & customer orders</p>

        <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginTop: "15px" }}>
          <button
            onClick={() => setActiveTab("products")}
            style={{
              ...styles.button,
              backgroundColor: activeTab === "products" ? "#007bff" : "#6c757d",
            }}
          >
            Manage Products
          </button>
         
        </div>
      </div>

      {alert.message && (
        <div
          style={{
            ...styles.alertBox,
            backgroundColor: alert.type === "error" ? "#f8d7da" : "#d4edda",
            color: alert.type === "error" ? "#721c24" : "#155724",
            border:
              alert.type === "error"
                ? "1px solid #f5c6cb"
                : "1px solid #c3e6cb",
          }}
        >
          {alert.message}
        </div>
      )}

      {activeTab === "products" ? (
        <>
          <div style={styles.card} ref={formRef}>
            <h3 style={{ color: "#0056b3" }}>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>
            {editingProduct ? (
              <EditProductForm
                product={editingProduct}
                onUpdate={handleUpdateProduct}
                onCancel={() => setEditingProduct(null)}
              />
            ) : (
              <AddProductForm onAdd={handleAddProduct} />
            )}
          </div>

          <div style={styles.card}>
            <h3 style={{ color: "#0056b3" }}>Product List</h3>
            <ProductTable
              products={products}
              onDelete={(id) => setProductToDelete(id)}
              onEdit={setEditingProduct}
            />
          </div>
        </>
      ) : (
        <div style={styles.card}>
          <h3 style={{ color: "#0056b3" }}>Customer Orders</h3>
          <AdminOrderTable orders={orders} />
        </div>
      )}

      {productToDelete && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h4>Confirm Delete</h4>
            <p>Are you sure you want to delete this product?</p>
            <div style={styles.modalButtons}>
              <button
                style={{ ...styles.button, backgroundColor: "#6c757d" }}
                onClick={() => setProductToDelete(null)}
              >
                Cancel
              </button>
              <button
                style={{ ...styles.button, backgroundColor: "#dc3545" }}
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f0f8ff",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#666",
  },
  alertBox: {
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontWeight: 500,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    marginBottom: "30px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "8px",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

export default AdminDashboard;
