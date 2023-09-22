import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.component";
import PageNotFound from "./pages/Notfound.component";
import "./asset/styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route
          path="/productList"
          element={
            <ErrorBoundary>
              <ProductList />
            </ErrorBoundary>
          }
        />
        <Route path="/pagenotfound" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};
export default App;
