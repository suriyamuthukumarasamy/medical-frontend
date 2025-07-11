import React from "react";
import AdminNavbar from "./AdminNavbar"; //  Import AdminNavbar here

const ProductTable = ({ products, onDelete, onEdit }) => {
  return (
    <>
      <AdminNavbar /> {/*  Show navbar above the table */}

      <div>
        
        <div className="table-responsive pt-5">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price (₹)</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Expiry</th>
                <th>Prescription</th>
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-4">
                    No products available
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                          }}
                        />
                      ) : (
                        <span className="text-muted">No image</span>
                      )}
                    </td>
                    <td>{p.name}</td>
                    <td>{p.brand}</td>
                    <td>₹{p.price}</td>
                    <td>{p.category}</td>
                    <td>{p.quantity}</td>
                    <td>{new Date(p.expiryDate).toLocaleDateString()}</td>
                    <td>{p.prescriptionRequired ? "Yes" : "No"}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => onEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => onDelete(p._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
