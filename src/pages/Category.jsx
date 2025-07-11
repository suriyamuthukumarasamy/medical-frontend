import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Contexts/SearchContext";

// Images
import painImg from "../assets/photo/painImg.jpeg";
import heartImg from "../assets/photo/heartImg.webp";
import antibioticImg from "../assets/photo/antibioticImg.png";
import otherImg from "../assets/photo/otherImg.jpg";
import babyImg from "../assets/photo/babycare.webp"; // ✅ Add Baby Care Image

const categories = [
  { name: "Pain Relief", image: painImg },
  { name: "Antibiotic", image: antibioticImg },
  { name: "Heart", image: heartImg },
  { name: "Baby Care", image: babyImg }, // ✅ Added
  { name: "Other", image: otherImg },
];

// 💅 Inline CSS
const cardStyle = {
  borderRadius: "10px",
  overflow: "hidden",
  border: "1px solid #e0e0e0",
  transition: "all 0.3s ease-in-out",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  cursor: "pointer",
  backgroundColor: "#ffffff",
};

const hoverStyle = {
  transform: "scale(1.03)",
  boxShadow: "0 4px 12px rgba(13, 110, 253, 0.2)",
};

const imageStyle = {
  height: "160px",
  objectFit: "cover",
  width: "100%",
};

const textStyle = {
  padding: "10px",
  textAlign: "center",
  fontWeight: "500",
  color: "#0d6efd",
  backgroundColor: "#f8f9fa",
};

const Categories = () => {
  const { setCategory } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    setCategory(name);
    navigate("/medicines");
  };

  return (
    <div className="container mt-5">
      <h2
        className="text-center mb-4"
        style={{ color: "#0d6efd", fontWeight: "bold" }}
      >
        🩺 Browse by Category
      </h2>
      <div className="row">
        {categories.map((cat, idx) => (
          <div key={idx} className="col-sm-6 col-md-4 col-lg-4 mb-4">
            <div
              style={cardStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, hoverStyle)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, cardStyle)
              }
              onClick={() => handleCategoryClick(cat.name)}
            >
              <img src={cat.image} alt={cat.name} style={imageStyle} />
              <div style={textStyle}>{cat.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
