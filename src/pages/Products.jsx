import  Pagination  from "@mui/material/Pagination";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { axis } from "../axios.js";
import Card from "../component/Card";
import grid from "../assets/gridd.svg";
import list from "../assets/menu.svg";

function PRoducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [view, setView] = useState("grid");

  const formRef = useRef();
  const [filter, setFilter] = useState({
    search: "",
    company: "all",
    category: "all",
    order: "a-z",
    price: 10000,
    shipping: false,
  });

  useEffect(() => {
    setLoading(true);

    let url = "/products";

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
          category: searchParams.get("category")
            ? searchParams.get("category")
            : "all",
          company: searchParams.get("company")
            ? searchParams.get("company")
            : "all",
          order: searchParams.get("order") ? searchParams.get("order") : "",
          price: searchParams.get("price")
            ? searchParams.get("price")
            : "100000",
          shipping: searchParams.get("shipping") ? true : false,
        };
      });
      url = `products?search=${filter.search}&category=${
        filter.category
      }&company=${filter.company}&order=${filter.order}&price=${filter.price}${
        filter.shipping ? "&shipping=on" : ""
      }`;
    }
    axis(url)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams])

  useEffect(() => {
    axis
      .get(`/products?page=${currentPage}`)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response?.data?.data)
          setTotalPage(response.data.meta.pagination.pageCount);
        }
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage])

  function handleFilter(event) {
    event.preventDefault();

    let url = `/products?search=${filter.search}&category=${
      filter.category
    }&company=${filter.company}&order=${filter.order}&price=${
      filter.price
    }&shipping=${filter.shipping ? "&shipping=on" : ""}`;
    setSearchParams(
      { ...filter, shipping: filter.shipping ? "on" : "" },
      false
    );

    axis
      .get(url)
      .then((response) => {
        if (response === 200) {
          setProducts(response?.data?.data);
          setTotalPage(response?.data?.meta?.pagination?.pageCount)
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleReset() {
    formRef.current.reset();
    setFilter[
      {
        search: "",
        company: "all",
        category: "all",
        order: "a-z",
        price: 10000,
        shipping: false,
      }
    ];
    setSearchParams({});
  }

  function handlePaginate(event, target) {
    setCurrentPage(target);
  }

return (
    <div>
      <form
        ref={formRef}
        className=" mt-10 grid grid-cols-4 gap-4 bg-blue-100 p-5 rounded-lg"
      >
        <div className=" flex flex-col gap-2">
          <label>Search Product</label>
          <input
            type="text"
            value={filter.search}
            onChange={(e) => {
              setFilter({ ...filter, search: e.target.value });
            }}
            className="border rounded-md p-2 bg-white"
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label>Search Product</label>
          <select
            type="text"
            value={filter.category}
            onChange={(e) => {
              setFilter({ ...filter, category: e.target.value });
            }}
            className="border rounded-md p-2 bg-white"
          >
            <option>all</option>
            <option>Table</option>
            <option>Chairs</option>
            <option>Kids</option>
          </select>
        </div>
        <div className=" flex flex-col gap-2">
          <label>Search Product</label>
          <select
            type="text"
            value={filter.company}
            onChange={(e) => {
              setFilter({ ...filter, company: e.target.value });
            }}
            className="border rounded-md p-2 bg-white"
          >
            <option>all</option>
            <option>Modenza</option>
            <option>Luxora</option>
          </select>
        </div>
        <div className=" flex flex-col gap-2">
          <label>Search Product</label>
          <select
            type="text"
            value={filter.order}
            onChange={(e) => {
              setFilter({ ...filter, order: e.target.value });
            }}
            className="border rounded-md p-2 bg-white"
          >
            <option>a-z</option>
            <option>z-a</option>
          </select>
        </div>
        <div className=" flex flex-col gap-2">
          <label>
            Search Product: <span>{`$${filter.price}`}</span>
          </label>
          <input
            type="range"
            min={1}
            max={100000}
            value={filter.price}
            onChange={(e) => {
              setFilter({ ...filter, price: e.target.value });
            }}
            className="border rounded-md p-2 bg-white"
          />
        </div>
        <div className=" flex flex-col gap-2 text-center">
          <label>Free Shipping</label>
          <input
            type="checkbox"
            value={filter.shipping}
            onChange={(e) => {
              setFilter({ ...filter, shipping: e.target.checked });
            }}
            className="border rounded-md p-2 bg-white"
          />
        </div>
        <div className=" flex flex-col gap-2 text-center">
          <button
            onClick={handleFilter}
            className=" bg-blue-500 w-full p-1 cursor-pointer rounded-lg text-white"
          >
            Search
          </button>
        </div>
        <div className=" flex flex-col gap-2 text-center">
          <button
            onClick={handleReset}
            type="reset"
            className=" bg-purple-500 w-full p-1 cursor-pointer rounded-lg text-white"
          >
            Reset
          </button>
        </div>
      </form>

<div className="mt-[30px] border-b border-gray-200 pb-[20px] flex justify-between">
        <h3>
          <b>Products: {products.length}</b>
        </h3>
        <div className=" flex gap-2 mb-5">
          <button
            onClick={() => setView("grid")}
            className={`${
              view === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
            } cursor-pointer transition-all hover:bg-gray-400 rounded-[3px] p-[5px]`}
          >
            <img src={grid} alt="viewgrid" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`${
              view === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
            } cursor-pointer transition-all hover:bg-gray-400 rounded-[3px] p-[5px]`}
          >
            <img src={list} alt="viewlist" />
          </button>
        </div>
      </div>

      <div className={view === "grid" && `flex flex-wrap mt-10 `}>
        {loading && <p>Loading...</p>}
        {!loading &&
          products.length > 0 &&
          products.map((product, index) => {
            return <Card key={index} product={product} view={view} />;
          })}

        {!loading && products.length === 0 && (
          <p>Sorry, no products matched your search...</p>
        )}
      </div>

      <div>
        <Pagination
          onChange={handlePaginate}
          page={currentPage}
          className="flex justify-end mb-4 mt-10"
          count={totalPage}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default PRoducts;