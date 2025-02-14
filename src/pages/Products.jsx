import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../component/card";
import { axis } from "../axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    search: "",
    company: "all",
    category: "all",
    order: "a-z",
    price: 100000,
    shipping: false,
  });

  useEffect(() => {
    setLoading(true);

    let url = "/products/";
    if (
      searchParams.get("search") ||
      searchParams.get("category") ||
      searchParams.get("company") ||
      searchParams.get("order") ||
      searchParams.get("price") ||
      searchParams.get("shipping")
    ) {
      setFilter((prev) => {
        return {
          search: searchParams.get("search") ? searchParams.get("search") : "",
          company: searchParams.get("company")
            ? searchParams.get("company")
            : "all",
          category: searchParams.get("category")
            ? searchParams.get("category")
            : "all",
          order: searchParams.get("order") ? searchParams.get("order") : "a-z",
          price: searchParams.get("price") ? searchParams.get("price") : 10000,
          shipping: searchParams.get("shipping") ? true : false,
        };
      });

      url = `url?search=${filter.search}&category=${filter.category}&company=${
        filter.company
      }&order=${filter.order}&price=${filter.price}&shipping=${
        filter.shipping && "on"
      }`;

      setSearchParams(
        { ...filter, shipping: filter.shipping ? "on" : "" },
        false
      );
    }
    axis
      .get("/products")
      .then((response) => {
        if (response.status == 200) {
          setProducts(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleFilter(e) {
    e.preventDefault();
    let url = `/products?search=${filter.search}&company=${
      filter.company
    }&category=${filter.category}&order=${filter.order}&price=${
      filter.price
    }&shipping=${filter.shipping & "on"}`;

    setSearchParams(
      { ...filter, shipping: filter.shipping ? "on" : "" },
      false
    );

    axis
      .get(url)
      .then((response) => {
        if (response.status == 200) {
          setProducts(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="">
      <form className="container mx-auto grid grid-cols-4 gap-3 mt-10 bg-blue-200 p-5 rounded-lg">
        <div className="flex flex-col gap-2">
          <label>Search Product</label>
          <input
            value={filter.search}
            onChange={(e) => {
              setFilter({ ...filter, search: e.target.value });
            }}
            className=" bg-white border rounded-md p-2"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Select Category</label>

          <select
            value={filter.category}
            onChange={(e) => {
              setFilter({ ...filter, category: e.target.value });
            }}
            className=" bg-white border rounded-md p-2"
          >
            <option value="all">all</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label>Select Company</label>

          <select
            value={filter.company}
            onChange={(e) => {
              setFilter({ ...filter, company: e.target.value });
            }}
            className=" bg-white border rounded-md p-2">
            <option value="all">all</option>
            <option value="Modenza">Modenza</option>
            <option value="Luxora">Luxora</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label>Sort By</label>

          <select
            value={filter.order}
            onChange={(e) => {
              setFilter({ ...filter, order: e.target.value });
            }}
            className=" bg-white border rounded-md p-2"
          >
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label>Search Product 650$</label>
          <input
            value={filter.price}
            onChange={(e) => {
              setFilter({ ...filter, price: e.target.value });
            }}
            className=" bg-white border rounded-md p-2"
            type="range"
            min={1}
            max={10000}
          />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <label>Free Shipping</label>
          <input
            onChange={(e) => {
              setFilter({ ...filter, shipping: e.target.checked });
            }}
            className=" bg-white border rounded-md p-2"
            type="checkbox"
          />
        </div>

        <div className="flex flex-col gap-2 text-center">
          <button
            onClick={handleFilter}
            className="bg-blue-500 w-full py-2 rounded-lg cursor-pointer text-white"
          >
            SEARCH
          </button>
        </div>

        <div className="flex flex-col gap-2 text-center">
          <button
            type="reset"
            className=" bg-purple-600 w-full py-2 rounded-lg cursor-pointer text-white"
          >
            RESET
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-between gap-y-7 mt-10 mx-auto">
        {loading && <p>Loading...</p>}

        {!loading &&
          products.length > 0 &&
          products.map(function (product, index) {
            return <Card key={index} product={product}></Card>;
          })}

        {!loading && products.length == 0 && (
          <p>Sorry,no products matched your search...</p>
        )}
      </div>
    </div>
  );
}

export default Products;
