import React, { useContext } from "react";
import { CartContext } from "../App";

function Cart() {
  const { cart, setCart } = useContext(CartContext);

  function handleRemoveFromCart(product) {
    let copied = [...cart];
    copied = copied.filter((item) => {
      return item.id != product.id;
    });
    setCart(copied);
  }

  function handleChangeCount(current, product) {
    let copied = [...cart];
    copied = copied.map((item) => {
      if (item.id == product.id) {
        item.count = current;
      }
      return item;
    });
    setCart(copied);
  }

  return (
    <div className="container">
      {cart.length > 0 &&
        cart.map(function (item, index) {
          return (
            <div key={index} className="w-[80%] border border-gray-500 p-4 rounded-2xl mt-10 flex gap-10 m-auto">
              <img
                src={item?.product?.attributes?.image}
                alt=""
                className="w-[300px] h-50 object-cover rounded-md"
              />
              <div className="flex  gap-44">
                <div>
                  <h3 className="inline-block text-gray-900 font-bold mb-1">
                    {item?.product?.attributes?.title}
                  </h3>
                  <h3 className="text-gray-400">
                    {item?.product?.attributes?.company}
                  </h3>
                  <h3>{item?.count}</h3>
                  <div className="flex gap-2 items-center">
                    <p>color:</p>
                    <span
                      style={{
                        backgroundColor: item.color,
                      }}
                      className="inline-block w-5 h-5 cursor-pointer rounded-full"
                    ></span>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      handleRemoveFromCart(item);
                    }}
                    className="bg-red-600 text-white p-3 mb-5 border rounded-2xl cursor-pointer hover:bg-red-800 duration-300"
                  >
                    Delete
                  </button>
                  <select
                    className="border p-2 rounded-md w-[200px]"
                    value={item.count}
                    onChange={(e) => {
                      handleChangeCount(e.target.value, item);
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Cart;
