import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage/HomePage";
import Profile from "./Pages/ProfilePage/ProfilePage";
import Cart from "./Components/CartPage/cartDisplay"
import Checkout from "./Components/Payments/Checkout-button";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='profile' element={<Profile />} />
        <Route path='/cart' element={<Cart/>} />
        <Route path = '/checkout' element={<Checkout/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
