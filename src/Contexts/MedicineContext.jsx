
import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const MedicineContext = createContext();

// Custom hook to use the context
export const useCart = () => {
  return useContext(MedicineContext);
};

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (!savedCart || savedCart === "undefined") {
        return [];
      }
      return JSON.parse(savedCart);
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  });

  //  Add to Cart
  const addToCart = (item) => {
    const itemInCart = cart.find((i) => i._id === item._id);
    if (itemInCart) {
      setCart(
        cart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  //  Remove from Cart
  const removeFromCart = (item) => {
    const itemInCart = cart.find((i) => i._id === item._id);
    if (itemInCart.quantity === 1) {
      setCart(cart.filter((i) => i._id !== item._id));
    } else {
      setCart(
        cart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    }
  };

  //  Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  //  Total Price
  const cartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Total Count
  const cartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  //  Sync with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <MedicineContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};
