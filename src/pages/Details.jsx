import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axis } from "../axios";

function Details() {
  const params = useParams();
  useEffect(function () {
    axis
      .get(`/products/${params.id}`)
      .then((response) => {
        console.log("response:", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div></div>;
}

export default Details;
