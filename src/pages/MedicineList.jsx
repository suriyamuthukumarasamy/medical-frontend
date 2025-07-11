import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Contexts/MedicineContext";
import { useNavigate } from "react-router-dom";



const DetailPage = () => {
  const { id } = useParams(); //  Get medicine ID from URL
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
 const { addToCart } = useCart(); //  Get addToCart from context
  const navigate = useNavigate();
// 
  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const response = await axios.get(`https://medical-backend-teal.vercel.app/api/medicines/${id}`);
        setMedicine(response.data);
      } catch (error) {
        console.error("Error fetching medicine:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicine();
  }, [id]);

   const handleAddToCart = () => {
    addToCart(medicine);
    navigate("/Cart"); // Navigate to cart after adding
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!medicine) return <p className="text-center mt-5">Medicine not found.</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-5">
          <img
            src={medicine.image}
            alt={medicine.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-7">
          <h2>{medicine.name}</h2>
          <p className="pt-5"><strong>Brand:</strong> {medicine.brand}</p>
          <p><strong>Description:</strong> {medicine.description}</p>
          <p><strong>Price:</strong> ₹{medicine.price}</p>
          <p><strong>Quantity:</strong> {medicine.quantity}</p>
          <p><strong>Expiry Date:</strong> {medicine.expiryDate}</p>
          <p><strong>Prescription Required:</strong> {medicine.prescriptionRequired ? "Yes" : "No"}</p>
          <p><strong>Category:</strong> {medicine.category}</p>
          
          <button className="btn btn-primary" onClick={() => handleAddToCart(medicine)}>Add to Cart</button>

        </div>
      </div>
    </div>
  );
};

export default DetailPage;
