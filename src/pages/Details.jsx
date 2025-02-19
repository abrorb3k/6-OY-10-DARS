// import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { CartContext } from "../App";
// import { axis } from "../axios";
// import { colors } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";

// function Details() {
//   const params = useParams();
//   const [product, setProduct] = useState({});
//   const [selectedColor, setSelectedColor] = useState('')
//   const [count, setCount] = useState(1)
//   const [cart, setCart] = useState(CartContext);

//   useEffect(function () {
//     axis
//       .get(`/products/${params.id}`)
//       .then((response) => {
//         setProduct(response?.data?.data)
//         setSelectedColor(response?.data?.data?.attributes?.color[0])
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   function handleAddToCard(){
//     let isExist = cart.find(value=>{
//       return value.product.id == product.id && value.color == selectedColor
//     })

//     let cartObject = {
//       id:Date.now(),
//       count:count,
//       color:selectedColor,
//       product:product
//     }

//     let copied = [...cart]
//     if(isExist){
//       copied = copied.map(function(value){
//         if(value.product.id == product.id && value.color == selectedColor){
//           value.count += Number(count)
//         }
//           return value
        
//       })
//       setCart(copied)
//     }else{
//       setCart([...cart, cartObject]);
//     }


//     toast("Item add to  cart", {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: false,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   }

//   return (
//     <div className="container px-16 flex gap-7 mt-10 mx-auto mr-14">
//       <img
//         className="w-1/2 h-[550px] rounded-md object-cover"
//         src={product?.attributes?.image}
//         alt=""
//       />
//       <div className="w-1/2">
//         <h3>{product?.attributes?.title}</h3>
//         <h3>{product?.attributes?.company}</h3>
//         <h3>${product?.attributes?.price}</h3>
//         <h3>{product?.attributes?.description}</h3>
//         <div className="flex gap-3">
//           {product?.attributes?.colors.length > 0 &&
//             product?.attributes?.colors.map(function (color, index) {
//               return (
//                 <span
//                   style={{
//                     backgroundColor: color,
//                     border: color == selectedColor ? "2px solid black" : "none",
//                   }}
//                   key={index}
//                   className="inline-block w-8 h-8 cursor-pointer rounded-full"
//                   onClick={() => {
//                     setSelectedColor(color);
//                   }}
//                 ></span>
//               );
//             })}
//         </div>
//         <div className="flex flex-col gap-4 mt-10">
//           <label htmlFor="Count">
//             <select
//               className="border p-2 w-[350px] rounded-md"
//               value={count}
//               onChange={(e) => {
//                 setCount(e.target.value);
//               }}
//             >
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//             </select>
//           </label>
//         </div>
//         <button
//           onClick={handleAddToCard}
//           className="mt-10 py-7 bg-purple-600 text-white rounded-md cursor-pointer"
//         >
//           ADD TO BAG
//         </button>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Details;
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../App";
import { axis } from "../axios";
import { ToastContainer, toast } from "react-toastify";

function Details() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const { cart, setCart } = useContext(CartContext); 
  const [count, setCount] = useState(1);

  useEffect(
    function () {
      axis
        .get(`/products/${params.id}`)
        .then((response) => {
          setProduct(response?.data?.data);
          setSelectedColor(response?.data?.data?.attributes?.color[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [params.id]
  );

  function handleAddToCart() {
    let index = cart.findIndex(
      (value) =>
        value.product.id === product.id && value.color === selectedColor
    );

    let cartObject = {
      id: Date.now(),
      count: count,
      color: selectedColor,
      product: product,
    };

    if (index !== -1) {
      let updatedCart = [...cart];
      updatedCart[index].count += Number(count); 
      setCart(updatedCart);
    } else {
      setCart([...cart, cartObject]);
    }

    toast("Item added to cart", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className="container px-16 flex gap-7 mt-10 mx-auto mr-14">
      <img
        className="w-1/2 h-[550px] rounded-md object-cover"
        src={product?.attributes?.image}
        alt="Product"
      />
      <div className="w-1/2">
        <h3>{product?.attributes?.title}</h3>
        <h3>{product?.attributes?.company}</h3>
        <h3>${product?.attributes?.price}</h3>
        <h3>{product?.attributes?.description}</h3>

        <div className="flex gap-3">
          {product?.attributes?.colors.length > 0 &&
            product?.attributes?.colors.map(function (color, index) {
              return (
                <span
                  style={{
                    backgroundColor: color,
                    border:
                      color === selectedColor ? "2px solid black" : "none",
                  }}
                  key={index}
                  className="inline-block w-8 h-8 cursor-pointer rounded-full"
                  onClick={() => {
                    setSelectedColor(color);
                  }}
                ></span>
              );
            })}
        </div>

        <div className="flex flex-col gap-4 mt-10">
          <label htmlFor="Count">
            <select
              className="border p-2 w-[350px] rounded-md"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </label>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-10 py-7 bg-purple-600 text-white rounded-md cursor-pointer"
        >
          ADD TO BAG
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Details;
