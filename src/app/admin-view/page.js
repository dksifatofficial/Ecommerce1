"use client";

import AdminViewMenu from "@/components/AdminMenu/AdminViewMenu";
import Button3 from "@/components/Buttons/Button3";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import SearchForOrder from "@/components/SearchBar/SearchForOrder";
import { GlobalContext } from "@/context";
import { getAllOrdersForAllUsers, updateStatusOfOrder } from "@/services/order";
import { getAllAdminProducts } from "@/services/product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export default function AdminView() {
  const [activeButton, setActiveButton] = useState("AllOrders");

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const router = useRouter();
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [transitionDelay, setTransitionDelay] = useState(false);
  const {
    allOrdersForAllUsers,
    setAllOrdersForAllUsers,
    user,
    pageLevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  function ListLi({ item }) {
    return (
      <li
        key={item._id}
        className="bg-gray-200 shadow p-3 lg:p-5 flex flex-col space-y-3 py-6 text-left"
      >
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-0 md:justify-between">
          <div>
            <div className="flex flex-col mb-6">
              <h4 className="font-bold text-sm md:text-base lg:text-lg flex-1">
                Order ID: {item._id}
              </h4>
              <p className="text-xs md:text-sm">{item.createdAt}</p>
            </div>
            <div className="grid gap-2">
              {item.orderItems.map((orderItem, index) => (
                <div key={index} className="shrink-0 flex flex-row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="Order Item"
                    className="h-24 w-24 max-w-full rounded-lg object-cover mr-4"
                    src={
                      orderItem &&
                      orderItem.product &&
                      orderItem.product.imageUrl[0]
                    }
                  />
                  <div>
                    <div className="flex flex-row">
                      <p className="text-sm text-gray-500 font-medium">Name:</p>
                      <p className="text-sm ml-4 text-gray-500 font-semibold">
                        {orderItem &&
                          orderItem.product &&
                          orderItem.product.name}
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <p className="text-sm text-gray-500 font-medium">Code:</p>
                      <p className="text-sm ml-5 font-bold text-gray-500">
                        #{orderItem && orderItem.itemCode}
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <p className="text-sm text-gray-500 font-medium">
                        Quantity:
                      </p>
                      <p className="text-sm ml-[3px] font-semibold text-gray-500">
                        {orderItem && orderItem.product && orderItem.qty}
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <p className="text-sm text-gray-500 font-medium">
                        Color:
                      </p>
                      <p className="text-sm ml-[53px] font-semibold text-gray-500">
                        {orderItem && orderItem.reqColor}
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <p className="text-sm text-gray-500 font-medium">
                        Sizes:
                      </p>
                      <p className="text-sm ml-[53px] font-semibold text-gray-500">
                        {orderItem && orderItem.reqSizes}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-row gap-1 md:gap-3 lg:gap-5 mt-5">
              <Button3
                onClick={() => handleUpdateOrderStatus(item)}
                disabled={!item.isProcessing}
                className="disabled:opacity-50 disabled:hover:before:h-0 disabled:hover:text-white
                  inline-block text-white px-2 md:px-5 py-1 text-[10px] font-medium uppercase"
              >
                {componentLevelLoader &&
                componentLevelLoader.loading &&
                componentLevelLoader.id === item._id ? (
                  <ComponentLevelLoader
                    text={"Updating Order Status"}
                    color={"#ffffff"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  "Update Order Status"
                )}
              </Button3>
              <button
                className="disabled:text-green-700 disabled:font-bold cursor-texttext-center
                inline-block text-red-700 px-2 md:px-5 py-1 text-[10px] md:text-sm lg:text-base font-medium uppercase"
                disabled={!item.isProcessing}
              >
                {item.isProcessing
                  ? "Order is Processing"
                  : "Order is delivered"}
              </button>
            </div>
          </div>

          {/* Address section */}
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="mr-[14px] text-sm text-gray-500 font-medium">
                User Name :
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {item?.user?.name}
              </p>
            </div>
            <div className="flex items-center">
              <p className="mr-[22px] text-sm text-gray-500 font-medium">
                Full Name :
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {item?.shippingAddress?.fullName}
              </p>
            </div>
            <div className="flex items-center">
              <p className="mr-[17px] text-sm text-gray-500 font-medium">
                User Email :
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {item?.user?.email}
              </p>
            </div>
            <div className="flex items-center">
              <p className="mr-[42px] text-sm text-gray-500 font-medium">
                Mobile :
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {item?.shippingAddress?.mobile}
              </p>
            </div>
            <div className="flex items-center">
              <p className="mr-[35px] text-sm text-gray-500 font-medium">
                Country :
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {item?.shippingAddress?.country}
              </p>
            </div>
            <div className="flex items-center">
              <p className="mr-[62px] text-sm text-gray-500 font-medium">
                City :
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {item?.shippingAddress?.city}
              </p>
            </div>
            <div className="flex items-center">
              <p className="mr-[9px] text-sm text-gray-500 font-medium">
                Postal Code :
              </p>
              <p className="text-sm font-semibold text-gray-500">
                {item?.shippingAddress?.postalCode}
              </p>
            </div>
            <div className="flex">
              <p className="mr-[38px] text-sm text-gray-500 font-medium">
                Address:
              </p>
              <p className=" w-[300px] text-sm font-semibold text-gray-500">
                {item?.shippingAddress?.address}
              </p>
            </div>

            <div className="flex items-center">
              <p className="mr-[5px] text-sm text-gray-500 font-medium">
                Paid Amount :
              </p>
              <p className="text-sm mr-1 font-semibold text-green-700">$</p>
              <p className="text-sm font-bold text-green-600">
                {(item?.totalPrice).toFixed(2)}
              </p>
            </div>
          </div>
          {/* Address section End*/}
        </div>
      </li>
    );
  }

  //test

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res) {
      setAllProducts(res.data);
    }
  }
  useEffect(() => {
    getListOfProducts();
  }, []);

  // search
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    const { target } = e;
    if (!target.value.trim()) return setResults([]);

    const filteredValue = allOrdersForAllUsers.filter((order) => {
      const productName = order._id.toLowerCase();
      const searchTerm = value.toLowerCase();
      const isMatch = productName.includes(searchTerm);
      console.log(
        `Order: ${productName}, Search Term: ${searchTerm}, Match: ${isMatch}`
      );
      return isMatch;
    });
    setResults(filteredValue);
  };

  // test end

  async function extractAllOrdersForAllUsers() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForAllUsers();

    console.log(res);

    if (res.success) {
      setPageLevelLoader(false);
      setAllOrdersForAllUsers(
        res.data && res.data.length
          ? res.data.filter((item) => item.user._id !== user._id)
          : []
      );
    } else {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrdersForAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log(allOrdersForAllUsers);

  async function handleUpdateOrderStatus(getItem) {
    setComponentLevelLoader({ loading: true, id: getItem._id });
    const res = await updateStatusOfOrder({
      ...getItem,
      isProcessing: false,
    });

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      extractAllOrdersForAllUsers();
    } else {
      setComponentLevelLoader({ loading: true, id: "" });
    }
  }

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <AdminViewMenu />
        <div
          className="w-full flex flex-wrap items-center justify-center gap-2 lg:gap-4 mx-auto py-1 md:py-3
            mt-1 md:mt-4 rounded-lg bg-[#0d9488] bg-[linear-gradient(to_bottom,#0d9488,#95a7a5,#f85606)]"
        >
          <button onClick={() => handleButtonClick("AllOrders")}>
            <p
              className={`rounded-lg text-sm font-semibold px-0 md:px-3 py-0 md:py-1 m-0 hover:text-[#f8f3f3da]
              ${
                activeButton === "AllOrders"
                  ? "bg-transparent text-gray-200 md:text-white md:bg-[#2e2e2d21]"
                  : "bg-transparent text-white"
              }`}
            >
              All
            </p>
          </button>
          <button onClick={() => handleButtonClick("FinishedOrders")}>
            <p
              className={`rounded-lg text-sm font-semibold px-0 md:px-3 py-0 md:py-1 m-0 hover:text-[#f8f3f3da]
              ${
                activeButton === "FinishedOrders"
                  ? "bg-transparent text-gray-200 md:text-white md:bg-[#2e2e2d21]"
                  : "bg-transparent text-white"
              }`}
            >
              Delivered
            </p>
          </button>
          <button onClick={() => handleButtonClick("UnfinishedOrders")}>
            <p
              className={`rounded-lg text-sm font-semibold px-0 md:px-3 py-0 md:py-1 m-0 hover:text-[#f8f3f3da]
              ${
                activeButton === "UnfinishedOrders"
                  ? "bg-transparent text-gray-200 md:text-white md:bg-[#2e2e2d21]"
                  : "bg-transparent text-white"
              }`}
            >
              Processing
            </p>
          </button>
          <button onClick={() => handleButtonClick("SearchOrders")}>
            <p
              className={`rounded-lg text-sm font-semibold px-0 md:px-3 py-0 md:py-1 m-0 hover:text-[#f8f3f3da]
              ${
                activeButton === "SearchOrders"
                  ? "bg-transparent text-gray-200 md:text-white md:bg-[#2e2e2d21]"
                  : "bg-transparent text-white"
              }`}
            >
              Search
            </p>
          </button>
        </div>

        {activeButton === "AllOrders" && (
          <div id="AllOrders">
            <div className="px-0 md:px-2 lg:px-4 py-4">
              <div className="flow-root">
                {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                  <ul className="flex flex-col gap-4">
                    {allOrdersForAllUsers.reverse().map((item) => (
                      // eslint-disable-next-line react/jsx-key
                      <ListLi item={item} />
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {activeButton === "FinishedOrders" && (
          <div id="FinishedOrders">
            <div className="px-0 md:px-2 lg:px-4 py-4">
              <div className="flow-root">
                {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                  <ul className="flex flex-col gap-4">
                    {allOrdersForAllUsers
                      .filter((item) => item.isProcessing !== true)
                      .reverse()
                      .map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <ListLi item={item} />
                      ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {activeButton === "UnfinishedOrders" && (
          <div id="UnfinishedOrders">
            <div className="px-0 md:px-2 lg:px-4 py-4">
              <div className="flow-root">
                {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                  <ul className="flex flex-col gap-4">
                    {allOrdersForAllUsers
                      .filter((item) => item.isProcessing === true)
                      .reverse()
                      .map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <ListLi item={item} />
                      ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {activeButton === "SearchOrders" && (
          <div className="w-full h-[670px]" id="Search Orders">
            <div className="px-0 md:px-2 lg:px-4 py-4">
              <div className="flow-root">
                <div>
                  <SearchForOrder
                    allProducts={allOrdersForAllUsers}
                    results={results}
                    value={allOrdersForAllUsers ? allOrdersForAllUsers._id : ""}
                    renderItem={(item) => (
                      // eslint-disable-next-line react/jsx-key
                      <ListLi item={item} />
                    )}
                    onChange={(e, filteredResults) => {
                      setResults(filteredResults);
                      handleChange(e); // You may need to pass other arguments if necessary
                    }}
                    // onChange={handleChange}
                    onSelect={(item) => setSelectedProduct(item)}
                    router={router}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
