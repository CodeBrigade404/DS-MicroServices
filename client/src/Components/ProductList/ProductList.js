import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4001/products/all");
      setData(response.data);
    };

    fetchData();
  }, []);

  const filteredData =
    data &&
    data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search product name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="product-list">
        {filteredData.map((item) => (
          <div className="product-list-item" key={item._id}>
            <Link to={`/products/${item._id}`}>
              <img src={item.imageUrl} alt={item.name} />
              <div>
                <h5>{item.name}</h5>
                <p>
                  <span className="price">Price: ${item.price}</span>
                </p>
                <p>
                  <span className="quantity">Quantity: {item.quantity}</span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
