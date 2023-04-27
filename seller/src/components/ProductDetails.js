import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/products/getProductbyId/${id}`
      );
      setData(response.data);
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8080/products/${id}`);
    alert("Product deleted successfully!");

    window.location.href = "/";
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={data.imageUrl} alt={data.name} />
      </div>
      <div className="product-details">
        <h2 className="product-name">{data.name}</h2>
        <p className="product-description">{data.description}</p>
        <p className="product-price">Price: ${data.price}</p>
        <p className="product-quantity">Quantity: {data.quantity}</p>
        <p className="product-category">Category: {data.category}</p>
        <p className="product-seller">Seller: {data.seller}</p>
        <div className="product-actions">
          <Link to={`/edit-product/${id}`} className="edit-button">
            Edit
          </Link>
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
