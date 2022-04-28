import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import ProductCard from "../components/Product/Product";
import { CardStateContext } from "../context/card";
import "./styles/home.css";
const Home = ({ data }) => {
  const { items = [] } = useContext(CardStateContext);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigation = useNavigate();
  const productList = data;

  const handleCheckout = () => {
    navigation("/summary");
  };
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  return (
    <>
      <Header />
      <div className="products-wrapper">
        <div className="products">
          {productList.map((data) => {
            return <ProductCard key={data.id} data={data} />;
          })}
        </div>
      </div>
      <div className="products-action">
        <div className="total-price">Seçilen Paket tutarı: {totalPrice}</div>
        <button className="product-button" onClick={handleCheckout}>
          Devam Et
        </button>
      </div>
    </>
  );
};

export default Home;
