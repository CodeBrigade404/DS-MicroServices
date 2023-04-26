import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:8080/cart/cart/61')
        .then(response => {
           
          setCartItems(response.data);
          //console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    const removeItem = async (productId) =>{
        await axios.delete(`http://localhost:8080/cart/cart/61/${productId}`)
          .then(response => {
          setCartItems(response.data);
          console.log(response.data);
           
          })
          .catch(error => {
            console.log(error);
          });
      }
      

  return (
    <div>
      <h1>My Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {cartItems.map(item => (
    <tr key={item._id}>
      <td>{item.productId}</td>
      <td>${item.quantity}</td>
      <td>{item.price}</td>
      <td>
        <button onClick={() => removeItem(item.productId)}>Remove</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
      <button onClick={() => checkout()}>Checkout</button>
    </div>
// {/* <div>
// {cartItems.map((item) => (
//   <div key={[0]}>
//     <p>Product ID: {item.productId}</p>
//     <p>Quantity: {item.quantity}</p>
//     <p>Price: ${item._id}</p>
//   </div>
// ))}
// </div> */}

  );



  function checkout() {
    // TODO: Implement checkout functionality
  }
}
export default Cart;