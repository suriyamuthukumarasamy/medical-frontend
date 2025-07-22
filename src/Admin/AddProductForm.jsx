import React, { useState } from "react";

const initialFormState = {
  name: "",
  brand: "",
  expiryDate: "",
  prescriptionRequired: false,
  price: "",
  category: "",
  quantity: "",
  description: "",
  image: "",
};

const AddProductForm = ({ onAdd }) => {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedForm = {
      ...form,
      name: form.name.trim(),
      brand: form.brand.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      image: form.image.trim(),
    };

    onAdd(trimmedForm);
    setForm(initialFormState);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>➕ Add New Medicine</h2>

        {/* Name */}
        <div style={styles.inputGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Medicine name"
            style={styles.input}
            required
          />
        </div>

        {/* Brand */}
        <div style={styles.inputGroup}>
          <label htmlFor="brand" style={styles.label}>Brand</label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            style={styles.input}
            required
          />
        </div>

        {/* Expiry Date */}
        <div style={styles.inputGroup}>
          <label htmlFor="expiryDate" style={styles.label}>Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Prescription Checkbox */}
        <div style={styles.checkboxGroup}>
          <input
            type="checkbox"
            name="prescriptionRequired"
            checked={form.prescriptionRequired}
            onChange={handleChange}
          />
          <label htmlFor="prescriptionRequired" style={{ marginLeft: "8px" }}>Prescription Required</label>
        </div>

        {/* Price */}
        <div style={styles.inputGroup}>
          <label htmlFor="price" style={styles.label}>Price (₹)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            style={styles.input}
            required
          />
        </div>

        {/* Category */}
        <div style={styles.inputGroup}>
          <label  htmlFor="category" style={styles.label}>Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Pain Relief"
            style={styles.input}
            required
          />
        </div>

        {/* Quantity */}
        <div style={styles.inputGroup}>
          <label htmlFor="quantity" style={styles.label}>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Stock quantity"
            style={styles.input}
            required
          />
        </div>

        {/* Description */}
        <div style={styles.inputGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write a brief description"
            style={styles.textarea}
            required
          />
        </div>

        {/* Image */}
        <div style={styles.inputGroup}>
          <label htmlFor="image" style={styles.label}>Image URL</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          ➕ Add Product
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 8px 24px rgba(0, 123, 255, 0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    textAlign: "center",
    color: "#007bff",
    fontSize: "24px",
    marginBottom: "10px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    marginBottom: "6px",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    transition: "0.3s",
    outline: "none",
  },
  textarea: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    minHeight: "80px",
    resize: "vertical",
    outline: "none",
  },
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default AddProductForm;
