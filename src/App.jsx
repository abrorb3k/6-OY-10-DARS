import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "../src/assets/products"
import Details from "./pages/Details";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";


import "./App.css";
import { createContext, useState } from "react";

export const CartContext = createContext();

function App() {

  const [cart, setCart] = useState([])

  return (
    <CartContext.Provider value={{cart, setCart}}>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home></Home>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <MainLayout>
              <About></About>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/products"
          element={
            <MainLayout>
              <Products></Products>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <Details></Details>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart></Cart>
            </MainLayout>
          }
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
