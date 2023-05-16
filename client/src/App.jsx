// import "./App.css";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./Pages/HomePage/HomePage";
// import Cart from "./Components/CartPage/cartDisplay";
// import SignIn from "./Components/Login/login";
// import SignUp from "./Components/SignUp/signUp";
// import OrdersList from "./Components/OrderPage/OrderPage";
// import SingleProduct from "./Components/SingleProduct/SingleProduct";
// import NavBar from "./Components/Nav/Navbar";

// function App() {
//   const user = localStorage.getItem("token");
//   return (
//     <BrowserRouter>
//       <Routes>
//         {user ? (
//           <>
//             <NavBar />
//             <Route path='/' exact element={<Home />} />
//             <Route path='/products/:id' element={<SingleProduct />} />
//             <Route path='/cart' element={<Cart />} />
//             <Route path='/order' element={<OrdersList />} />
//           </>
//         ) : (
//           <>
//             <Route path='/login' element={<SignIn />} />
//             <Route path='/signUp' element={<SignUp />} />
//             <Route path='/' element={<Navigate replace to='/login' />} />
//           </>
//         )}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/HomePage/HomePage";
import Cart from "./Components/CartPage/cartDisplay";
import SignIn from "./Components/Login/login";
import SignUp from "./Components/SignUp/signUp";
import OrdersList from "./Components/OrderPage/OrderPage";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import NavBar from "./Components/Nav/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <NavBar onLogout={handleLogout} />}
      <Routes>
        <Route path='/' element={isLoggedIn && <Home />} />
        <Route path='/products/:id' element={isLoggedIn && <SingleProduct />} />
        <Route path='/cart' element={isLoggedIn && <Cart />} />
        <Route path='/order' element={isLoggedIn && <OrdersList />} />
        <Route path='/login' element={<SignIn onLogin={handleLogin} />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/' element={<Navigate replace to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

