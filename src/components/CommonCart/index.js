"use client";

import { useRouter } from "next/navigation";
import ShutterUpButton from "../Buttons/ShutterUpButton";
import ComponentLevelLoader from "../Loader/componentlevel";

export default function CommonCart({
  cartItems = [],
  handleDeleteCartItem,
  componentLevelLoader,
}) {
  const router = useRouter();

  return (
    <section className="h-screen bg-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {cartItems && cartItems.length ? (
                  <ul className=" grid gap-4 rounded-lg">
                    {cartItems.map((cartItem) => (
                      <li
                        className="flex-col flex space-y-3 py-6 text-left md:flex-row md:space-x-5 md:space-y-0
                          bg-slate-100 rounded-lg"
                        key={cartItem.id}
                      >
                        <div className="shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={
                              cartItem &&
                              cartItem.productID &&
                              cartItem.productID.imageUrl
                            }
                            alt="Product image"
                            className="h-24 w-25 max-w-full rounded-lg object-cover ml-4"
                          />
                        </div>
                        <div className="h-24 flex flex-1 flex-col justify-between justify-items-center">
                          <div className="h-24 sm:col-gap-5 md:grid md:grid-cols-2">
                            <div className="pr-8 sm:pr-4 px-4 lg:px-0 flex flex-col items-start justify-center">
                              <p className="text-base font-semibold text-gray-900">
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.name}
                              </p>
                              <div className="mt-1 flex">
                                <p className="text-sm pr-2">Item Code:</p>
                                <p className="text-sm text-gray-600">
                                  {cartItem &&
                                    cartItem.productID &&
                                    cartItem.productCode}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center px-4 mt-4 lg:mt-0 gap-3 lg:justify-end md:justify-start">
                              {/* sm:mt-0 sm:items-start sm:justify-end */}
                              <p className="shrink-0 text-base text-gray-950 justify-items-center">
                                Item Price{" "}
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.price}
                              </p>
                              <p className="text-sm">Size:</p>
                              <ul className="text-sm text-gray-600 flex flex-row gap-2">
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.requiredSize.map((size) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <li className="">{size.label}</li>
                                  ))}
                              </ul>
                              <p className="shrink-0 text-base text-gray-950 sm:order-1 sm:ml-8 sm:text-right">
                                piecs{" "}
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productQuantity}
                              </p>
                              <p className="shrink-0 text-base font-semibold text-gray-950 sm:order-1 sm:ml-8 sm:text-right">
                                Item Total $
                                {(cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.price) *
                                  cartItem.productQuantity}
                              </p>
                              <button
                                type="button"
                                className="font-medium text-yellow-700 sm:order-2"
                                onClick={() =>
                                  handleDeleteCartItem(cartItem._id)
                                }
                              >
                                {componentLevelLoader &&
                                componentLevelLoader.loading &&
                                componentLevelLoader.id === cartItem._id ? (
                                  <ComponentLevelLoader
                                    text={"Removing"}
                                    color={"#0000000"}
                                    loading={
                                      componentLevelLoader &&
                                      componentLevelLoader.loading
                                    }
                                  />
                                ) : (
                                  "Remove"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="font-bold text-lg">Your cart is Empty !</h1>
                )}
              </div>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg text-black font-semibold">
                    $
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) =>
                            item.productID.price * item.productQuantity + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping</p>
                  <p className="text-lg text-black font-semibold">$0</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-lg text-black font-semibold">
                  $
                  {cartItems && cartItems.length
                    ? cartItems.reduce(
                        (total, item) =>
                          item.productID.price * item.productQuantity + total,
                        0
                      )
                    : "0"}
                </p>
              </div>
              <div className="mt-5 text-center flex justify-end">
                <ShutterUpButton
                  onClick={() => router.push("/checkout")}
                  disabled={cartItems && cartItems.length === 0}
                  className="disabled:opacity-50 disabled:hover:before:h-0 group inline-flex items-center justify-center px-8 py-1
                    text-lg text-white font-medium uppercase tracking-wide before:bg-white rounded-md"
                >
                  Checkout
                </ShutterUpButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
