"use client";

import ShutterUpButton from "@/components/Buttons/ShutterUpButton";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { fetchAllAddresses } from "@/services/address";
import { createNewOrder } from "@/services/order";
import { callStripeSession } from "@/services/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Checkout() {
  const {
    cartItems,
    user,
    addresses,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(GlobalContext);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const router = useRouter();
  const params = useSearchParams();

  const publishableKey =
    "pk_test_51NIpU7QeahBh3avq0nlk4QKl6CXWWXW3Ub1N0HZYIIIirIDgkkp1kHDBDjd6ffpbWM8Xs9McaTSUWGQrBPCTvgFD00qJjw0gq8";
  const stripePromise = loadStripe(publishableKey);

  console.log(cartItems);

  async function getAllAddresses() {
    const res = await fetchAllAddresses(user?._id);

    if (res.success) {
      setAddresses(res.data);
    }
  }

  useEffect(() => {
    if (user !== null) getAllAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    async function createFinalOrder() {
      const isStripe = JSON.parse(localStorage.getItem("stripe"));

      if (
        isStripe &&
        params.get("status") === "success" &&
        cartItems &&
        cartItems.length > 0
      ) {
        setIsOrderProcessing(true);
        const getCheckoutFormData = JSON.parse(
          localStorage.getItem("checkoutFormData")
        );

        const createFinalCheckoutFormData = {
          user: user?._id,
          shippingAddress: getCheckoutFormData.shippingAddress,
          orderItems: cartItems.map((item) => ({
            qty: item.productQuantity,
            product: item.productID,
            itemCode: item.productCode,
            reqSizes: item.requiredSize.map((size) => size.label),
            reqColor: item.requiredColor.map((color) => color.label),
          })),
          paymentMethod: "Stripe",
          totalPrice: cartItems.reduce(
            (total, item) =>
              item.productID.price * item.productQuantity + total,
            0
          ),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };

        const res = await createNewOrder(createFinalCheckoutFormData);

        if (res.success) {
          setIsOrderProcessing(false);
          setOrderSuccess(true);
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          setIsOrderProcessing(false);
          setOrderSuccess(false);
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }

    createFinalOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.get("status"), cartItems]);

  function handleSelectedAddress(getAddress) {
    if (getAddress._id === selectedAddress) {
      setSelectedAddress(null);
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      });

      return;
    }

    setSelectedAddress(getAddress._id);
    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        ...checkoutFormData.shippingAddress,
        fullName: getAddress.fullName,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
        address: getAddress.address,
        mobile: getAddress.mobile,
      },
    });
  }

  async function handleCheckout() {
    const stripe = await stripePromise;

    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          images: [item.productID.imageUrl[0]],
          name: item.productID.name,
        },
        unit_amount: item.productID.price * 100,
      },
      quantity: item.productQuantity,
    }));

    const res = await callStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: res.id,
    });

    console.log(error);
  }

  console.log(checkoutFormData);

  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        // setOrderSuccess(false);
        router.push("/orders");
      }, [2000]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderSuccess]);

  if (orderSuccess) {
    return (
      <section className="h-screen bg-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                <h1 className="font-bold text-lg">
                  Your payment is successfull and you will be redirected to
                  orders page in 2 seconds !
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isOrderProcessing) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={isOrderProcessing}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="font-medium text-xl">Cart Summary</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
            {cartItems && cartItems.length ? (
              cartItems.map((item) => (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={item._id}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item && item.productID && item.productID.imageUrl[0]}
                    alt="Cart Item"
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  />
                  <div className="flex w-full flex-col px-4 py-0">
                    <div className="font-bold flex flex-row">
                      <p>{item && item.productID && item.productID.name}</p>
                    </div>
                    <div className="font-medium text-sm flex flex-row pb-2">
                      <p>#</p>
                      <p>{item && item.productID && item.productCode}</p>
                    </div>
                    <div className="font-medium text-sm flex flex-row">
                      <p className="mr-[22px]">Unit Price:</p>
                      <p>${item && item.productID && item.productID.price}</p>
                    </div>
                    <div className="font-medium text-sm flex flex-row">
                      <p className="mr-[31px]">Color:</p>
                      <ul className="text-sm text-gray-600 flex flex-row gap-2">
                        {item &&
                          item.productID &&
                          item.requiredColor.map((color) => (
                            // eslint-disable-next-line react/jsx-key
                            <li className="">{color.label}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="font-medium text-sm flex flex-row">
                      <p className="mr-[31px]">Size:</p>
                      <ul className="text-sm text-gray-600 flex flex-row gap-2">
                        {item &&
                          item.productID &&
                          item.requiredSize.map((size) => (
                            // eslint-disable-next-line react/jsx-key
                            <li className="">{size.label}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="font-medium text-sm flex flex-row">
                      <p className="mr-[31px]">Quantity:</p>
                      <p>{item && item.productID && item.productQuantity}P</p>
                    </div>
                    <div className="font-medium text-sm flex flex-row">
                      <p className="mr-[16px]">Total Price:</p>
                      <p>
                        $
                        {(item && item.productID && item.productID.price) *
                          item.productQuantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Your cart is empty</div>
            )}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Shipping address details</p>
          <p className="text-gray-400 font-bold">
            Complete your order by selecting address below
          </p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
            {addresses && addresses.length ? (
              addresses.map((item) => (
                <div
                  onClick={() => handleSelectedAddress(item)}
                  key={item._id}
                  className={`border p-6 ${
                    item._id === selectedAddress ? "border-[#3cca98]" : ""
                  }`}
                >
                  <p>Name : {item.fullName}</p>
                  <p>Address : {item.address}</p>
                  <p>City : {item.city}</p>
                  <p>Country : {item.country}</p>
                  <p>PostalCode : {item.postalCode}</p>
                  <p>Mobile : {item.mobile}</p>
                  <ShutterUpButton
                    className="mt-5 mr-5 inline-block text-white px-5 py-3 text-xs font-medium 
                  uppercase tracking-wide before:bg-white"
                  >
                    {item._id === selectedAddress
                      ? "Selected Address"
                      : "Select Address"}
                  </ShutterUpButton>
                </div>
              ))
            ) : (
              <p>No addresses added</p>
            )}
          </div>
          <ShutterUpButton
            onClick={() => router.push("/account")}
            className="mt-5 mr-5 inline-block text-white px-5 py-3 text-xs font-medium uppercase
             tracking-wide before:bg-white"
          >
            Add new address
          </ShutterUpButton>
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="text-lg font-bold text-gray-900">
                $
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) => item.productID.price + total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="text-lg font-bold text-gray-900">Free</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-lg font-bold text-gray-900">
                $
                {cartItems && cartItems.length
                  ? cartItems.reduce(
                      (total, item) =>
                        (item && item.productID && item.productID.price) *
                          item.productQuantity +
                        total,
                      0
                    )
                  : "0"}
              </p>
            </div>
            <div className="pb-10">
              <ShutterUpButton
                disabled={
                  (cartItems && cartItems.length === 0) ||
                  Object.keys(checkoutFormData.shippingAddress).length === 0
                }
                onClick={handleCheckout}
                className="disabled:opacity-50 disabled:hover:before:h-0 disabled:hover:text-white mt-5 mr-5 w-full  inline-block text-white px-5 py-3
                text-xs font-medium uppercase tracking-wide before:bg-white"
              >
                Checkout
              </ShutterUpButton>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
