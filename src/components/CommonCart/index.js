"use client";

import { useRouter } from "next/navigation";
import ShutterUpButton from "../Buttons/ShutterUpButton";
import ComponentLevelLoader from "../Loader/componentlevel";
import { RxCross2 } from "react-icons/rx";

export default function CommonCart({
  cartItems = [],
  handleDeleteCartItem,
  componentLevelLoader,
}) {
  const router = useRouter();

  return (
    <section className="bg-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-4 md:mt-8 max-w-screen-xl px-1 sm:px-3 md:px-5 lg:px-8">
          <div className="bg-white rounded-lg mb-6">
            <div className="px-4 py-4 sm:px-8 sm:py-8">
              <div className="flow-root">
                {cartItems && cartItems.length ? (
                  <ul className="grid gap-4 rounded-lg">
                    {cartItems.map((cartItem) => (
                      <li
                        className="flex-col flex space-y-3 py-3 text-left md:flex-row md:space-x-5 md:space-y-0
                          bg-slate-100 rounded-lg relative"
                        key={cartItem.id}
                      >
                        <div className="shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={
                              cartItem &&
                              cartItem.productID &&
                              cartItem.productID.imageUrl[0]
                            }
                            alt="Product image"
                            className="h-28 max-w-full rounded-lg object-cover ml-4"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between justify-items-center">
                          <div className="flex flex-col">
                            <div className="pr-8 sm:pr-4 px-4 lg:px-0 flex flex-col items-start justify-center">
                              <p className="text-xs md:text-sm font-semibold text-gray-600">
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.name}
                              </p>
                              <div className="mt-1 flex">
                                <p className="text-xs pr-2">#</p>
                                <p className="text-xs text-gray-400">
                                  {cartItem &&
                                    cartItem.productID &&
                                    cartItem.productCode}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col ml-4 lg:ml-0 items-start mt-2 md:justify-start">
                              {/* sm:mt-0 sm:items-start sm:justify-end */}

                              <div>
                                <p className="text-xs text-gray-950 justify-items-center">
                                  Price:{" "}
                                  {cartItem &&
                                    cartItem.productID &&
                                    cartItem.productID.price}
                                </p>
                              </div>

                              <div className="flex flex-row">
                                <p className="text-xs mr-2">Color:</p>
                                <ul className="text-xs text-gray-600 flex flex-row gap-2">
                                  {cartItem &&
                                    cartItem.productID &&
                                    cartItem.requiredColor.map((color) => (
                                      // eslint-disable-next-line react/jsx-key
                                      <li className="">{color.label}</li>
                                    ))}
                                </ul>
                              </div>

                              <div className="flex flex-row">
                                <p className="text-xs mr-2">Size:</p>
                                <ul className="text-xs text-gray-600 flex flex-row gap-2">
                                  {cartItem &&
                                    cartItem.productID &&
                                    cartItem.requiredSize.map((size) => (
                                      // eslint-disable-next-line react/jsx-key
                                      <li className="">{size.label}</li>
                                    ))}
                                </ul>
                              </div>

                              <div>
                                <p className="text-xs text-gray-950 flex flex-row">
                                  piecs:{" "}
                                  {cartItem &&
                                    cartItem.productID &&
                                    cartItem.productQuantity}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs font-semibold text-gray-950 flex flex-row">
                                  Total: $
                                  {(cartItem &&
                                    cartItem.productID &&
                                    cartItem.productID.price) *
                                    cartItem.productQuantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className=" absolute top-2 right-2 font-bold text-md md:text-lg lg:text-xl text-red-700 sm:order-2"
                          onClick={() => handleDeleteCartItem(cartItem._id)}
                        >
                          <RxCross2 />
                          {/* {componentLevelLoader &&
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
                          )} */}
                        </button>
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
                  <p className="text-sm md:text-lg text-black font-semibold">
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
                  <p className="text-sm md:text-lg text-black font-semibold">$0</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Total</p>
                <p className="text-sm md:text-lg text-black font-semibold">
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
