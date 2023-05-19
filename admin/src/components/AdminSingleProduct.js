import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SingleProduct = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4006/api/admin/products/getProductbyId/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const addToCart = async () => {
    await axios.delete(
      `http://localhost:4006/api/admin/products/delete/${id}`,
      {
        data: {
          productId: data.pId,
        },
      }
    );

    alert("Product deleted successfully!");
    navigate(`/`);
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
          <button onClick={addToCart}>Delted</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
