import React from "react";
import Header from "../components/Header/Header";
import "./styles/success.css";
const Success = () => {
  return (
    <>
      <Header />
      <div className="success">
        <h3>Başarıyla Tamamlandı</h3>
      </div>
    </>
  );
};

export default Success;
