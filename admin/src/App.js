import "./App.css";
import ProductList from "./components/AdminProductList";
import ProductDetails from "./components/AdminSingleProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
