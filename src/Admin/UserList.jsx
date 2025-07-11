import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [hasRedirected, setHasRedirected] = useState(false);
  const navigate = useNavigate();

  // Show alert
  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: "", message: "" }), 3000);
  };

  // Redirect to login
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

  // Handle auth errors
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

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users/allusers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users failed:", err);
      handleAuthError(err);
    }
  }, [handleAuthError]);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || storedUser.role !== "admin") {
        redirectToLogin("🔒 Admin access required.");
      } else {
        fetchUsers();
      }
    } catch (err) {
      console.error("Admin check failed:", err);
      redirectToLogin("🔒 Invalid session.");
    }
  }, [fetchUsers, redirectToLogin]);

  // Confirm delete
  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/${userToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
      showAlert("success", "🗑️ User deleted.");
    } catch (err) {
      console.error("Delete failed:", err);
      handleAuthError(err);
    } finally {
      setUserToDelete(null);
    }
  };

  return (
    <div style={styles.container}>
      <AdminNavbar />

      <h2 style={styles.heading}>User Management</h2>

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

      <div style={styles.tableWrapper}>
        <table className="table table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registered On</th>
              <th style={{ width: "120px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted py-4">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => setUserToDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {userToDelete && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h4>Confirm Delete</h4>
            <p>Are you sure you want to delete this user?</p>
            <div style={styles.modalButtons}>
              <button
                style={{ ...styles.button, backgroundColor: "#6c757d" }}
                onClick={() => setUserToDelete(null)}
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
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#007bff",
  },
  alertBox: {
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "20px",
    fontWeight: 500,
    textAlign: "center",
  },
  tableWrapper: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
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

export default UserList;
