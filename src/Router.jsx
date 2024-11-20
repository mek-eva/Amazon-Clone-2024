import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/Auth/Signup";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Cart from "./pages/Cart/Cart";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<SignUp />} />
        <Route path="/Payments" element={<Payment />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Category/:categoryName" element={<Results />} />
        <Route path="products/:productId" element={<ProductDetail />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default Routing;
