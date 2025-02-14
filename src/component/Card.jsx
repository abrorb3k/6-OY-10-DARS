import React from "react";
import { useNavigate } from "react-router-dom";

function Card(props) {
  const { product } = props;

  const navigate = useNavigate();

  function handleRedirect() {
    navigate(`/products/${product.id}`);
  }
  return (
    <div
      onClick={handleRedirect}
      className="w-[28%] shadow-md rounded-lg p-3 pb-5 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl  hover:translate-y-[-10px] "
    >
      <img
        className="w-full rounded-lg h-[250px] object-cover "
        src={product?.attributes?.image}
        alt=""
      />
      <h4 className="text-xl mt-2">{product?.attributes?.title}</h4>
      <p className="text-xl mt-2">${product?.attributes?.price}</p>
    </div>
  );
}

export default Card;
