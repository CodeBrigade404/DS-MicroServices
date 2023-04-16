import "./App.css";
import Checkout from "./components/checkout-button-service";

import React from "react";

export default function App() {
  return (
    <div>
      <h1>E-commerce</h1>
      <div className='container'>
        <Checkout /> {/* <Checkout /> Add wh=ere you want to checkout */}
      </div>
    </div>
  );
}
