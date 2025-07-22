import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Medicine from './pages/Medicine';
import MedicineList from "./pages/MedicineList";
import MedicinePage from './Contexts/MedicinePage';
import Category from './pages/Category';
import Register from './login/Register';
import LoginIn from './login/LoginIn';
import AdminDashboard from './Admin/AdminDashboard';
import { CartProvider } from './Contexts/MedicineContext';
import ProtectRoute from './ProtectRoute/ProtectRoutes';
import UserList from './Admin/UserList';
import AdminOrderTable from './Admin/AdminOrderTable';
import MyOrders from './pages/MyOrders';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const hideLayout =
    location.pathname === '/loginIn' ||
    location.pathname === '/';

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("token_expiry");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && expiry && Date.now() < Number(expiry)) {
      setIsAuthenticated(true);
      setRole(user?.role);
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div style={{ padding: 50, textAlign: 'center' }}>🔄 Loading...</div>;
  }

  return (
    <CartProvider>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route
          path="/loginIn"
          element={<LoginIn setIsAuthenticated={setIsAuthenticated} setRole={setRole} />}
        />

        <Route path="/" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path="/medicines"
          element={
            <ProtectRoute isAuthenticated={isAuthenticated}>
              <Medicine />
            </ProtectRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectRoute isAuthenticated={isAuthenticated}>
              <MedicinePage />
            </ProtectRoute>
          }
        />
        <Route
          path="/category"
          element={
            <ProtectRoute isAuthenticated={isAuthenticated}>
              <Category />
            </ProtectRoute>
          }
        />
        <Route
          path="/medicine/:id"
          element={
            <ProtectRoute isAuthenticated={isAuthenticated}>
              <MedicineList />
            </ProtectRoute>
          }
        />
        <Route
          path="/allorder"
          element={
            <ProtectRoute isAuthenticated={isAuthenticated}>
              <MyOrders />
            </ProtectRoute>
          }
        />

        {/* Admin Only */}
        <Route
          path="/admin"
          element={
            <ProtectRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={['admin']}
              role={role}
            >
              <AdminDashboard />
            </ProtectRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={['admin']}
              role={role}
            >
              <UserList />
            </ProtectRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectRoute
              isAuthenticated={isAuthenticated}
              allowedRoles={['admin']}
              role={role}
            >
              <AdminOrderTable />
            </ProtectRoute>
          }
        />
      </Routes>

      {!hideLayout && <Footer />}
    </CartProvider>
  );
}

export default App;
