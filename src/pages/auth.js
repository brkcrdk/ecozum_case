import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthContext from "../context/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import "./styles/auth.css";
import { useEffect } from "react";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required!"),
  username: Yup.string().required("Name is required!"),
});

const AuthPage = () => {
  const [user, setUser] = useLocalStorage("user-data", "");
  const authDispatch = useContext(AuthContext);
  const navigation = useNavigate();
  useEffect(() => {
    if (user) {
      navigation("/");
    }
  }, []);
  const signInSuccess = (userData) => {
    // authDispatch(userData);
    setUser(userData);
    navigation("/");
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userData = { ...values };
          resetForm();
          signInSuccess(userData);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {() => (
        <Form className="auth-container">
          <div className="wrapper">
            <label>Adınız Soyadınız</label>
            <Field
              name="username"
              type="text"
              placeholder="Adınız Soyadınız"
              className="field"
            />
            <label>Email</label>
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="field"
            />
            <button className="auth-button" type="submit">
              Devam Et
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthPage;
