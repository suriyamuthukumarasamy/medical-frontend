import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../Contexts/SearchContext";
import { useCart } from "../Contexts/MedicineContext";
import Cart from "../pages/Cart";

const Medicine = () => {
  const { bar, category } = useContext(SearchContext);
  const [result, setResult] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const { addToCart } = useCart(); // ✅ context

  useEffect(() => {
    fetch("https://medical-backend-teal.vercel.app/api/medicines")
      .then((res) => res.json())
      .then((data) => setResult(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    const filteredResults = result.filter((item) => {
      const matchesName = item.name?.toLowerCase().includes(bar.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      return matchesName && matchesCategory;
    });
    setFiltered(filteredResults);
  }, [bar, category, result]);

  return (
    <div className="container-fluid">
      <div className="row">
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <div className="col-lg-4 mt-3" key={index}>
              <Cart
                img={item.image}
                name={item.name}
                brand={item.brand}
                description={item.description}
                price={item.price}
                quantity={item.quantity}
                expiryDate={item.expiryDate}
                prescriptionRequired={item.prescriptionRequired}
                category={item.category}
                id={item._id}
                onAddClick={() => addToCart(item)}
              />
            </div>
          ))
        ) : (
          <p className="text-center mt-4">Loading......</p>
        )}
      </div>
    </div>
  );
};

export default Medicine;
