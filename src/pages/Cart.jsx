import React, { useContext } from "react";
import { CartContext } from "../App";

function Cart() {
  const {cart, setCart} = useContext(CartContext)

  function handleRemoveFromCart(product){
    let copied = [...cart]
    copied = copied.filter(item => {
      return item.id != product.id
    })
    setCart(copied)
  }

  function  handleChangeCount(current,product){
    let copied = [...cart]
    copied = copied.map(item => {
      if(item.id == product.id){
        item.count = current
      }
      return item
    })
    setCart(copied)
  }


  return <div>
    {
      cart.length > 0 && cart.map(function(item,index){
          return (
            <div className="w-[80%] border p-4 rounded-2xl mt-10 flex gap-10 m-auto">
              <img
                src={item?.product?.attributes?.image}
                alt=""
                className="w-[300px] h-50 object-cover"
              />
              <div>
                <h3>{item?.product?.attributes?.title}</h3>
                <h3>{item?.count}</h3>
                <span
                  style={{
                    backgroundColor: item.color,
                  }}
                  className="inline-block w-8 h-8 cursor-pointer rounded-full"
                ></span>
                <button
                  onClick={() => {
                    handleRemoveFromCart(item);
                  }}
                  className="bg-red-700 p-4 m-6 border rounded-2xl cursor-pointer"
                >
                  Delete  
                </button>
                <select
                  className="border p-2 w-[350px] rounded-md"
                  value={item.count}
                  onChange={(e) => {handleChangeCount(e.target.value, item)}}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          );
      })
    }
  </div>;
}

export default Cart;
