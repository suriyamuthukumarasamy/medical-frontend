import React from 'react';
import { Button, Card } from "antd";
import { Link } from 'react-router-dom';

const Cart = (props) => {
  return (
    <Card
      hoverable
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}
      cover={
        <img
          alt={props.name}
          className="zoom-img"
          src={props.img}
          style={{ height: 400, objectFit: 'cover' }}
        />
      }
    >
      <p><b>Name:</b> {props.name}</p>
      <p><b>Brand:</b> {props.brand}</p>
      <p><b>Price:</b> ₹{props.price}</p>
       <p><b>Quantity:</b> {props.quantity}</p>
        <p><b>ExpiryDate:</b> {props.expiryDate}</p>
         <p><b>category:</b> {props.category}</p>
          <p><b>Description:</b> {props.description}</p>





      <div className="d-flex justify-content-between">
        <Link to="/cart">
        <Button onClick={props.onAddClick}>
          Add to Cart <i className="fa-solid fa-cart-plus ms-2"></i>
        </Button>
        </Link>

        <Link to={`/medicine/${props.id}`}>
          <Button className="ms-2">View</Button>
        </Link>
      </div>
    </Card>
  );
};

export default Cart;
