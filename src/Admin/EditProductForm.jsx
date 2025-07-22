import React, { useState } from "react";

const EditProductForm = ({ product, onUpdate, onCancel }) => {
  const [form, setForm] = useState({
    ...product,
    expiryDate: product.expiryDate?.split("T")[0] || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedForm = {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
      prescriptionRequired: Boolean(form.prescriptionRequired),
    };
    onUpdate(cleanedForm);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Edit Product</h2>

      <div style={styles.field}>
        <label htmlFor="name" style={styles.label}>Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
          autoComplete="name"
        />
      </div>

      <div style={styles.field}>
        <label htmlFor="brand" style={styles.label}>Brand</label>
        <input
          id="brand"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          style={styles.input}
          required
          autoComplete="organization"
        />
      </div>

      <div style={styles.field}>
        <label htmlFor="expiryDate" style={styles.label}>Expiry Date</label>
        <input
          id="expiryDate"
          name="expiryDate"
          type="date"
          value={form.expiryDate}
          onChange={handleChange}
          style={styles.input}
          required
          autoComplete="bday"
        />
      </div>

      <div style={styles.fieldCheckbox}>
        <label style={styles.label}>
          <input
            id="prescriptionRequired"
            type="checkbox"
            name="prescriptionRequired"
            checked={form.prescriptionRequired}
            onChange={handleChange}
          />
          &nbsp;Prescription Required
        </label>
      </div>

      <div style={styles.field}>
        <label htmlFor="price" style={styles.label}>Price</label>
        <input
          id="price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          style={styles.input}
          required
          autoComplete="off"
        />
      </div>

      <div style={styles.field}>
        <label htmlFor="category" style={styles.label}>Category</label>
        <input
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          style={styles.input}
          required
          autoComplete="off"
        />
      </div>

      <div style={styles.field}>
        <label htmlFor="quantity" style={styles.label}>Quantity</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          style={styles.input}
          required
          autoComplete="off"
        />
      </div>

      <div style={styles.field}>
        <label htmlFor="description" style={styles.label}>Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          style={styles.textarea}
          required
          autoComplete="off"
        />
      </div>

      <div style={styles.field}>
        <label htmlFor="image" style={styles.label}>Image URL</label>
        <input
          id="image"
          name="image"
          value={form.image}
          onChange={handleChange}
          style={styles.input}
          required
          autoComplete="url"
        />
      </div>

      <div style={styles.buttonGroup}>
        <button type="submit" style={styles.buttonPrimary}>Update</button>
        <button type="button" onClick={onCancel} style={styles.buttonSecondary}>Cancel</button>
      </div>
    </form>
  );
};

// Styles remain unchanged
const styles = {
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  field: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
    fontWeight: "500",
    color: "#555",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    height: "100px",
    resize: "vertical",
    outline: "none",
  },
  fieldCheckbox: {
    marginBottom: "15px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginTop: "20px",
  },
  buttonPrimary: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  buttonSecondary: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default EditProductForm;
