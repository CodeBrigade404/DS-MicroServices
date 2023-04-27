import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/HomePage/HomePage";
import Profile from "./Pages/ProfilePage/ProfilePage";
import Cart from "./Components/CartPage/cartDisplay";
import SignIn from "./Components/Login/login";
import SignUp from "./Components/SignUp/signUp";
import OrdersList from "./Components/OrderPage/OrderPage";
import SingleProduct from "./Components/SingleProduct/SingleProduct";

function App() {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <>
            <Route path='profile' element={<Profile />} />
            <Route path='/' exact element={<Home />} />
            <Route path='/products/:id' element={<SingleProduct />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<OrdersList />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<SignIn />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/' element={<Navigate replace to='/login' />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}



export default App;
