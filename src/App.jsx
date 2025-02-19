import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";

import "./App.css";

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

  const ProtectedRoute = ({ children }) => {
    
    return children;
  };

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <Details />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Cart />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login/>} />{" "}
        <Route path="/register" element={<Register />} />
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
