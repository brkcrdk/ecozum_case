import { Field, Form, Formik } from "formik";
import React from "react";
import Header from "../components/Header/Header";
import * as Yup from "yup";
import {
  CheckoutDispatchContext,
  CheckoutStateContext,
  CHECKOUT_STEPS,
  saveCreditCard,
} from "../context/checkout";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardStateContext } from "../context/card";
import Success from "./success";
import { useState } from "react";
import "./styles/summary.css";

const CartSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  cartNumber: Yup.string()
    .required("Cart Number is required")
    .matches(/^[0-9]{16}$/, "Cart Number must be 16 digits")
    .min(16, "Cart Number is too short")
    .max(16, "Cart Number is too long"),
  skt: Yup.string().required("SKT is required"),
  cvv: Yup.string().required("CVV is required"),
});

const CartForm = () => {
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const handleSaveCart = (values) => {
    saveCreditCard(checkoutDispatch, values);
  };
  return (
    <div className="detail-container">
      <h2>Cart Detail</h2>
      <Formik
        initialValues={{
          fullName: "John Doe",
          cartNumber: "55522298765559",
          skt: "01/27",
          cvv: "123",
        }}
        validationSchema={CartSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const cartData = { ...values };
            resetForm();
            handleSaveCart(cartData);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {() => (
          <Form>
            <label>Kart Üzerindeki Ad Soyad</label>
            <Field
              name="fullName"
              type="text"
              placeholder="Full Name"
              className="form-input"
            />

            <div className="field-group">
              <label>SKT</label>
              <Field
                name="skt"
                type="text"
                placeholder="SKT"
                className="form-input"
              />
              <label>Kart Numarası</label>
              <Field
                name="cartNumber"
                type="text"
                placeholder="Cart Number"
                label="Kart Numarası"
                className="form-input"
              />
              <label>CVV/CVC</label>
              <Field
                name="cvv"
                type="text"
                placeholder="CVV/CVC"
                className="form-input"
              />
            </div>

            <div>
              <h4>Sözleşme</h4>
              <p className="content">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const Summary = ({ data }) => {
  const [success, setSuccess] = useState(false);
  const navigation = useNavigate();
  const { step } = useContext(CheckoutStateContext);
  const { items = [] } = useContext(CardStateContext);
  const totalItems = items.length;
  const totalPrice = items?.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  const handleClick = (e) => {
    e.preventDefault();
    navigation("/summary/success");
  };
  return (
    <>
      <Header />

      <div className="checkout-page">
        <div className="container">
          <div className="cart-details">
            {step === CHECKOUT_STEPS.CART && <CartForm />}
          </div>
          <div className="order-summary">
            <h2>
              Summary
              <span>{` (${totalItems}) Items`}</span>
            </h2>
            <ul className="cart-items">
              {items?.map((item) => {
                return (
                  <li className="cart-item" key={item.name}>
                    <img
                      className="product-image"
                      src={item.image}
                      alt="product"
                    />
                    <div className="product-info">
                      <p className="product-name">{item.name}</p>
                      <p className="product-price">{item.price}</p>
                    </div>
                    <div className="product-total">
                      <p className="quantity">{`${item.quantity} tane`}</p>
                      <p className="amount">{item.quantity * item.price}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <ul className="total-breakup">
              <li>
                <h2>Total</h2>
                <h2>{totalPrice}</h2>
              </li>
            </ul>
            <button
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Ödeme Yap
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Summary;
