import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage/HomePage";
import Profile from "./Pages/ProfilePage/ProfilePage";
import Cart from "./Components/CartPage/cartDisplay"
import Checkout from "./Components/Payments/Checkout-button";
import Orders from "./Components/OrderPage/orderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path = '/checkout' element={<Checkout/>}/>
        <Route path='/orders' element={<Orders />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
