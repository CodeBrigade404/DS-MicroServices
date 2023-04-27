import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:4001/products/getProductbyId/${id}`
      );
      setData(response.data);
    };

    fetchData();
  }, [id]);

  const handleBuy = async () => {
    alert("fuck");
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
          <button onClick={handleBuy}>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
