import React from "react";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const { product, view } = props;
  const navigate = useNavigate();

  function handleRedirect() {
    navigate(`/products/${product.id}`);
  }
  return (
    <div
      onClick={handleRedirect}
      className={`cursor-pointer transition-all hover:shadow-xl p-4 mt-7 rounded-lg shadow-md py-3 ${
        view === "grid" ? "w-70 h-70 flex flex-col mx-auto text-center" : "w-full h-[250px]"
      } rounded-lg object-cover`}
    >
        <img
          className={`${
            view === "list" ? "w-50 h-[150px]" : " w-90 h-[150px]"
          } rounded-lg object-cover`}
          src={product?.attributes?.image}
          alt="img"
        />
        
          <h4 className=" text-xl mt-2">{product?.attributes?.title}</h4>
          <p className=" text-xl mt-2">
            <b>${product?.attributes?.price}</b>
          </p>
    </div>
  );
}

export default Card;