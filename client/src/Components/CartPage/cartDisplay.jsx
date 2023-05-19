import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userData="))
      ?.split("=")[1];

    if (cookieValue) {
      const userDataObj = JSON.parse(cookieValue);
      setUserData(userDataObj._id);
    }
  }, []);
  console.log(cartItems);

  useEffect(() => {
    if (userData) {
      axios
        .get(`http://localhost:4004/cart/cart/${userData}`)
        .then((response) => {
          setCartItems(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userData]);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotalBill(total.toFixed(2));
    localStorage.setItem("totalBill", total.toFixed(2));
  }, [cartItems]);

  const incrementQuantity = async (productId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.productId === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCartItems(updatedItems);
    try {
      await axios.put(
        `http://localhost:4004/cart/cart/${userData}/${productId}`,
        {
          quantity: updatedItems.find((item) => item.productId === productId)
            ?.quantity,
          action: "increment",
        }
      );
    } catch (error) {
      console.error(error);
      // Handle error state or display error message
    }
  };

  const decrementQuantity = async (productId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: Math.max(item.quantity - 1, 1),
        };
      }
      return item;
    });

    setCartItems(updatedItems);
    try {
      await axios.put(
        `http://localhost:4004/cart/cart/${userData}/${productId}`,
        {
          quantity: updatedItems.find((item) => item.productId === productId)
            ?.quantity,
          action: "decrement",
        }
      );
    } catch (error) {
      console.error(error);
      // Handle error state or display error message
    }
  };

  const removeItem = async (productId) => {
    await axios
      .delete(`http://localhost:4004/cart/cart/${userData}/${productId}`)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateTotal = (item) => {
    return item.quantity * item.price;
  };

  const onClick = async (event) => {
    event.preventDefault();
    const items = [
      { id: 1, quantity: 3 },
      { id: 2, quantity: 2 },
      { id: 3, quantity: 2 },
    ];

    try {
      const response = await axios.post(
        "http://localhost:4000/create-checkout-session",
        {
          items: items,
        }
      );
      window.location = response.data.url;
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="container">
      <h1>My Cart</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <div className="btn-group" role="group">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => decrementQuantity(item.productId)}
                  >
                    -
                  </button>
                  <button className="btn btn-sm btn-light">
                    {item.quantity}
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => incrementQuantity(item.productId)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>${calculateTotal(item)}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total bill: ${totalBill}</p>
      <button type="submit" className="btn btn-success" onClick={onClick}>
        Checkout
      </button>
    </div>
  );
}

export default Cart;
