import React from "react";
import ProductList from "../../Components/ProductList/ProductList";
const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
      <ProductList></ProductList>
    </div>
  );
};

export default Home;
