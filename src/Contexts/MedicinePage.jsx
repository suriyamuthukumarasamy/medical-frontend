import React from "react";
import { useCart } from "../Contexts/MedicineContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const MedicinePage = () => {
  const { cart, removeFromCart, clearCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("❌ Please log in first.");
        return;
      }

      // ✅ Send correct structure expected by backend
      const orderData = {
        items: cart.map(item => ({
          _id: item._id, // This is what your backend uses to look up medicine
          quantity: item.quantity
        })),
        totalAmount: cartTotal()
      };

      console.log("🛒 Sending order:", orderData);

      await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      clearCart();
      alert("✅ Order placed successfully!");
      navigate("/allorder");
    } catch (err) {
      console.error("❌ Failed to place order:", err);
      alert("❌ Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container pt-5 pb-5">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>
      <p className="text-center text-muted">
        Total Items: <strong>{cartCount()}</strong>
      </p>

      {cart.length === 0 ? (
        <div className="text-center mt-5">
          <p className="fs-5">🛒 Your cart is currently empty.</p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/home">
              <button className="btn btn-success">Go Back to Shop</button>
            </Link>
            <Link to="/allorder">
              <button className="btn btn-outline-primary">View My Orders</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={item._id || item.id || index} className="card mb-4 shadow-sm p-3">
              <div className="row g-3 align-items-center">
                <div className="col-md-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid rounded"
                    style={{ height: "200px", objectFit: "cover", width: "100%" }}
                  />
                </div>
                <div className="col-md-8 px-5">
                  <h5>{item.name}</h5>
                  <p className="mb-1"><strong>Brand:</strong> {item.brand || "N/A"}</p>
                  <p className="mb-1"><strong>Price:</strong> ₹{item.price}</p>
                  <p className="mb-1"><strong>Quantity:</strong> {item.quantity}</p>
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="text-end mt-4">
            <h4>Total Amount: <span className="text-success">₹{cartTotal()}</span></h4>
            <div className="d-flex justify-content-end gap-3 mt-3">
              <button className="btn btn-danger" onClick={clearCart}>
                Clear Cart
              </button>
              <Link to="/medicines">
                <button className="btn btn-success">Continue Shopping</button>
              </Link>
              <button className="btn btn-primary" onClick={handlePlaceOrder}>
                🛍️ Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MedicinePage;
