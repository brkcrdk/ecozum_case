import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import logo from "../../assets/logo.png";
import "./Header.css";
import { useEffect } from "react";

const Header = (props) => {
  const navigation = useNavigate();

  const { isUser } = useContext(AuthContext);

  const handleGotoLogin = () => {
    navigation("/auth");
  };
  const handleGotoHome = () => {
    if (isUser) {
      navigation("/");
    }
  };

  return (
    <div className="header">
      {/* <img className="logo" src={logo} alt="logo" /> */}
      <h2 onClick={handleGotoHome}>LOGO</h2>
      <div className="user-header">
        {isUser ? (
          <p>
            <span>{isUser.username}</span>
          </p>
        ) : (
          <>
            <p>Please login to continue.</p>
            <button onClick={() => handleGotoLogin()}>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
