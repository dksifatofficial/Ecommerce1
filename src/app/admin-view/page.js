"use client";

import ShutterUpButton from "@/components/Buttons/ShutterUpButton";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { getAllOrdersForAllUsers, updateStatusOfOrder } from "@/services/order";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

export default function AdminView() {
  const {
    allOrdersForAllUsers,
    setAllOrdersForAllUsers,
    user,
    pageLevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

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
        <div>
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                <ul className="flex flex-col gap-4">
                  {allOrdersForAllUsers.map((item) => (
                    <li
                      key={item._id}
                      className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left"
                    >
                      <div className="flex flex-row justify-between">
                        <div>
                          <div className="flex">
                            <h1 className="font-bold text-lg mb-3 flex-1">
                              Order ID: {item._id}
                            </h1>
                          </div>
                          <div className="grid gap-2">
                            {item.orderItems.map((orderItem, index) => (
                              <div
                                key={index}
                                className="shrink-0 flex flex-row"
                              >
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
                                    <p className="text-sm font-medium">
                                      Item Name:
                                    </p>
                                    <p className="text-sm ml-4 text-black font-semibold">
                                      {orderItem &&
                                        orderItem.product &&
                                        orderItem.product.name}
                                    </p>
                                  </div>
                                  <div className="flex flex-row">
                                    <p className="text-sm font-medium">
                                      Item Code:
                                    </p>
                                    <p className="text-sm ml-5 text-black font-bold">
                                      #{orderItem && orderItem.itemCode}
                                    </p>
                                  </div>
                                  <div className="flex flex-row">
                                    <p className="text-sm font-medium">
                                      Quantity:
                                    </p>
                                    <p className="text-sm ml-[30px] text-black font-semibold">
                                      {orderItem &&
                                        orderItem.product &&
                                        orderItem.qty}
                                    </p>
                                  </div>
                                  <div className="flex flex-row">
                                    <p className="text-sm font-medium">Color:</p>
                                    <p className="text-sm ml-[53px] text-black font-semibold">
                                      {orderItem && orderItem.reqColor}
                                    </p>
                                  </div>
                                  <div className="flex flex-row">
                                    <p className="text-sm font-medium">Sizes:</p>
                                    <p className="text-sm ml-[53px] text-black font-semibold">
                                      {orderItem && orderItem.reqSizes}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-5">
                            <ShutterUpButton
                              onClick={() => handleUpdateOrderStatus(item)}
                              disabled={!item.isProcessing}
                              className="disabled:opacity-50 disabled:hover:before:h-0 disabled:hover:text-white
                          mt-5 mr-5 inline-block text-white px-5 py-1 
                          text-xs font-medium uppercase tracking-wide before:bg-white "
                            >
                              {componentLevelLoader &&
                              componentLevelLoader.loading &&
                              componentLevelLoader.id === item._id ? (
                                <ComponentLevelLoader
                                  text={"Updating Order Status"}
                                  color={"#ffffff"}
                                  loading={
                                    componentLevelLoader &&
                                    componentLevelLoader.loading
                                  }
                                />
                              ) : (
                                "Update Order Status"
                              )}
                            </ShutterUpButton>
                            <button
                              className="disabled:text-green-700 disabled:font-bold mt-5 mr-5 cursor-text
                                inline-block text-red-700 px-5 py-1 text-base font-medium uppercase tracking-wide"
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
                            <p className="mr-[14px] text-sm font-medium text-gray-900">
                              User Name :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {item?.user?.name}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-[22px] text-sm font-medium text-gray-900">
                              Full Name :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {item?.shippingAddress?.fullName}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-[17px] text-sm font-medium text-gray-900">
                              User Email :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {item?.user?.email}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-[42px] text-sm font-medium text-gray-900">
                              Mobile :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {item?.shippingAddress?.mobile}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-[35px] text-sm font-medium text-gray-900">
                              Country :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {item?.shippingAddress?.country}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-[62px] text-sm font-medium text-gray-900">
                              City :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {item?.shippingAddress?.city}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-[9px] text-sm font-medium text-gray-900">
                              Postal Code :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {item?.shippingAddress?.postalCode}
                            </p>
                          </div>
                          <div className="flex">
                            <p className="mr-[38px] text-sm font-medium text-gray-900">
                              Address:
                            </p>
                            <p className=" w-[300px] text-sm font-semibold text-gray-900">
                              {item?.shippingAddress?.address}
                            </p>
                          </div>

                          <div className="flex items-center">
                            <p className="mr-[5px] text-sm font-medium text-gray-900">
                              Paid Amount :
                            </p>
                            <p className="text-sm mr-1 font-semibold text-green-700">
                              $
                            </p>
                            <p className="text-sm font-bold text-green-600">
                              {(item?.totalPrice).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        {/* Address section End*/}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
