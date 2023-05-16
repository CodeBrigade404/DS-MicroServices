import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const SingleProduct = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/products/getProductbyId/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

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
  console.log(userData);

  const addToCart = async () => {
    try {
    
      const userId = Cookies.get("_id");
      console.log(userId);

      
      await axios.post("http://localhost:4004/cart/cart", {
        userId: userData,
        productId: id,
        quantity: 1, 
        price: data.price, 
        name: data.name
      });

   
      window.location = "/cart";
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <img src={data.imageUrl} alt={data.name} />
      </div>
      <div>
        <h2>{data.name}</h2>
        <p>{data.description}</p>
        <p>Price: ${data.price}</p>
        <p>Quantity: {data.quantity}</p>
        <p>Category: {data.category}</p>
        <p>Seller: {data.seller}</p>
        <div>
          <button onClick={addToCart}>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
