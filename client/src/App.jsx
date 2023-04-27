import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/HomePage/HomePage";
import Profile from "./Pages/ProfilePage/ProfilePage";
import Cart from "./Components/CartPage/cartDisplay";
import Checkout from "./Components/Payments/Checkout-button";

import Orders from "./Components/OrderPage/orderPage";

import SignIn from "./Components/Login/login";
import SignUp from "./Components/SignUp/signUp";


function App() {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
      {user ? (
          <>
            <Route path='/' exact element={<Home />} />
            <Route path='profile' element={<Profile />} />
            
           
           
          </>
        ) : (
          <>
            <Route path='/login' element={<SignIn />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/' element={<Navigate replace to='/login' />} />
            
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
