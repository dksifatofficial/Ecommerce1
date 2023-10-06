"use client";

import Button3 from "@/components/Buttons/Button3";
import { GlobalContext } from "@/context";
import { getOrderDetails } from "@/services/order";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

export default function OrderDetails() {
  const {
    pageLevelLoader,
    setPageLevelLoader,
    orderDetails,
    setOrderDetails,
    user,
  } = useContext(GlobalContext);

  const params = useParams();
  const router = useRouter();

  async function extractOrderDetails() {
    setPageLevelLoader(true);

    const res = await getOrderDetails(params["order-details"]);

    if (res.success) {
      setPageLevelLoader(false);
      setOrderDetails(res.data);
    } else {
      setPageLevelLoader(false);
    }

    console.log(res);
  }

  useEffect(() => {
    extractOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className="py-4 md:py-6 lg:py-12 px-4 md:px-6 lg:px-12">
      <div className="bg-white p-4 md:p-6 flex justify-start items-start space-y-2 flex-col">
        <h3 className=" text-sm md:text-base lg:text-lg font-bold text-gray-900">
          Order ID #{orderDetails && orderDetails._id}
        </h3>
        <p className="text-xs md:text-sm lg:text-base font-medium text-gray-600">
          {orderDetails &&
            orderDetails.createdAt &&
            orderDetails.createdAt.split("T")[0]}{" "}
          |{" "}
          {orderDetails &&
            orderDetails.createdAt &&
            orderDetails.createdAt.split("T")[1].split(".")[0]}
        </p>
      </div>
      <div className="mt-4 flex flex-col justify-center xl:flex-row items-stretch w-full gap-4">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:p-6 xl:p-8 w-full">
            <p className="font-bold text-sm md:text-base lg:text-lg mb-2">
              Your order summary
            </p>
            {orderDetails &&
            orderDetails.orderItems &&
            orderDetails.orderItems.length
              ? orderDetails.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-row py-4 border-b w-full"
                  >
                    <div className="w-[180px] mr-4 md:mr-8 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item && item.product && item.product.imageUrl[0]}
                        className="w-full object-cover"
                        alt=""
                      />
                    </div>
                    <div className="flex-col flex items-start w-full">
                      <div className="w-full flex flex-col justify-start items-start">
                        <p className="text-xs md:text-sm text-gray-600">
                          {item && item.product && item.product.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs md:text-sm text-gray-600">
                          #{item && item.itemCode}
                        </p>
                      </div>
                      <div className="w-full flex items-start">
                        <p className="text-xs md:text-sm text-gray-600">
                          Unit Price: $
                          {item &&
                            item.product &&
                            item.product.price - item.product.priceDrop}
                        </p>
                      </div>
                      <div className="w-full flex items-start">
                        <p className="text-xs md:text-sm text-gray-600">
                          Color: {item && item.reqColor}
                        </p>
                      </div>
                      <div className="w-full flex items-start">
                        <p className="text-xs md:text-sm text-gray-600">
                          Size: {item && item.reqSizes}
                        </p>
                      </div>
                      <div className="w-full flex items-start">
                        <p className="text-xs md:text-sm text-gray-600">
                          Quantity: {item && item.qty}
                        </p>
                      </div>
                      <div className="w-full flex items-start">
                        <p className="text-xs md:text-sm text-gray-600">
                          Total Price: $
                          {(
                            (item &&
                              item.product &&
                              item.product.price - item.product.priceDrop) *
                            item.qty
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div
            className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 
           md:space-y-0 md:space-x-5 xl:space-x-8"
          >
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <p className="font-bold text-sm md:text-base lg:text-lg mb-2">
                Summary
              </p>
              <div
                className="flex justify-center items-center w-full space-y-4 flex-col 
               border-gray-200 border-b pb-4"
              >
                <div className="flex justify-between w-full">
                  <p className="text-sm md:text-base leading-5 text-gray-600">Subtotal</p>
                  <p className="text-sm md:text-base leading-5 text-gray-600">
                    ${orderDetails && orderDetails.totalPrice}
                  </p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-sm md:text-base leading-5 text-gray-600">Shipping</p>
                  <p className="text-sm md:text-base leading-5 text-gray-600">Free</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-sm md:text-base leading-5 text-gray-600">Total</p>
                  <p className="text-sm md:text-base leading-5 text-gray-600">
                    ${orderDetails && orderDetails.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-gray-50 w-full flex items-start px-4 py-6 flex-col">
            <p className="font-bold text-sm md:text-base lg:text-lg mb-2">
              Customer Details
            </p>
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div
                className="flex gap-4 flex-col w-full justify-start py-4 md:py-8 
               border-b border-gray-200"
              >
                <p className="text-sm md:text-base font-semibold text-left text-gray-650">
                  Name: {user?.name}
                </p>
                <p className="text-sm md:text-base font-semibold text-left text-gray-650">
                  Email: {user?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 flex justify-between xl:h-full items-stretch w-full flex-col p-4">
            <div
              className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 
              lg:space-x-8 xl:space-x-0 space-y-4 md:space-y-0 xl:space-y-12 md:flex-col items-center md:items-start"
            >
              <div className="flex justify-start items-start flex-col">
                <p className="font-bold text-sm md:text-base lg:text-lg mb-2 border-b">
                  Shipping Address
                </p>
                <p className="text-sm md:text-base font-semibold leading-4 text-left text-gray-650">
                  Address :{" "}
                  {orderDetails && orderDetails.shippingAddress.address}
                </p>
                <p className="text-sm md:text-base font-semibold leading-4 text-left text-gray-650">
                  City :{orderDetails && orderDetails.shippingAddress.city}
                </p>
                <p className="text-sm md:text-base font-semibold leading-4 text-left text-gray-650">
                  Country :{" "}
                  {orderDetails && orderDetails.shippingAddress.country}
                </p>
                <p className="text-sm md:text-base font-semibold leading-4 text-left text-gray-650">
                  Postal Code :{" "}
                  {orderDetails && orderDetails.shippingAddress.postalCode}
                </p>
                <p className="text-sm md:text-base font-semibold leading-4 text-left text-gray-650">
                  Mobile : {orderDetails && orderDetails.shippingAddress.mobile}
                </p>
              </div>
              <Button3
                onClick={() => router.push(`/`)}
                className="mt-5 lg:mr-5 mr-0 w-full inline-block text-white lg:px-5 px-4 py-2 text-xs font-medium 
                uppercase tracking-wide"
              >
                Shop Again
              </Button3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
