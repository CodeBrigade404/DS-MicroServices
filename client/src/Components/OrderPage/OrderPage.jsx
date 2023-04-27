import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './order.css';

const OrdersList = ({ userId }) => {
  const [items, setItems] = useState([]);
  const [allitems, ALLsetItems] = useState([]);
  const [orderStatus, OrderStatus] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4002/order/orderstatus/123`
        );
        OrderStatus(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [userId]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:4002/order/123`);
        setItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [userId]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4002/order/orders/123`
        );
        ALLsetItems(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [userId]);

  return (
    <div className='container'>
      <h2 className='my-4'>Orders for User {userId}</h2>
      <div className='row'>
        <div className='col-md-12'>
          <h4>All Orders</h4>
          <ul className='list-group'>
            {allitems.map((allitems) => (
              <li className='list-group-item order-item' key={allitems.userId}>
                <div className='order-header'>
                  <p className='order-id'>Order ID: {allitems._id}</p>
                  <p className='order-date'>
                    Order Date:{' '}
                    {new Date(allitems.createdAt).toLocaleDateString()}
                  </p>
                  <p className='order-time'>
                    Order Time:{' '}
                    {new Date(allitems.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className='order-body'>
                  <p className='order-address'>Address: {allitems.addressId}</p>

                  {allitems.orderStatus.map((ordersta) => (
                    <p className='order-status'>orderStatus: {ordersta.type}</p>
                  ))}

                  <p className='order-amount'>
                    Total Amount: Rs. {allitems.totalAmount}
                  </p>
                  <table className='table table-striped'>
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allitems.items.map((item) => (
                        <tr key={item.productId}>
                          <td>{item.productId}</td>
                          <td>Rs. {item.Price}</td>
                          <td>{item.purchasedQty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
