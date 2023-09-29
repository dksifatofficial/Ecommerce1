"use client";

import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { useRouter } from "next/navigation";
import { Fragment, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import ShutterUpButton from "../Buttons/ShutterUpButton";
import CommonModal from "../CommonModal";
import ComponentLevelLoader from "../Loader/componentlevel";

export default function CartModal() {
  const {
    showCartModal,
    setShowCartModal,
    cartItems,
    setCartItems,
    user,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllCartItems() {
    const res = await getAllCartItems(user?._id);

    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item) => ({
              ...item,
              productID: {
                ...item.productID,
                price:
                  item.productID.onSale === "yes"
                    ? parseInt(
                        (
                          item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100)
                        ).toFixed(2)
                      )
                    : item.productID.price,
              },
            }))
          : [];
      setCartItems(updatedData);
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    }

    console.log(res);
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function handleDeleteCartItem(getCartItemID) {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      extractAllCartItems();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: getCartItemID });
    }
  }

  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="-my-6 divide-y divide-gray-300">
            {cartItems.map((cartItem) => (
              <li key={cartItem.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      cartItem &&
                      cartItem.productID &&
                      cartItem.productID.imageUrl[0]
                    }
                    alt="Cart Item"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>
                          {cartItem &&
                            cartItem.productID &&
                            cartItem.productID.name}
                        </a>
                      </h3>
                    </div>
                    <div className="mt-1 flex">
                      <p className="text-sm pr-4">Item Code:</p>
                      <p className="text-sm text-gray-600">
                        {cartItem && cartItem.productID && cartItem.productCode}
                      </p>
                    </div>
                    <div className="mt-1 flex">
                      <p className="text-sm pr-[52px]">Price:</p>
                      <p className="text-sm text-gray-600">
                        $
                        {cartItem &&
                          cartItem.productID &&
                          cartItem.productID.price}
                      </p>
                    </div>
                    <div className="mt-1 flex">
                      <p className="text-sm pr-[57px]">Color:</p>
                      <ul className="text-sm text-gray-600 flex flex-row gap-2">
                        {cartItem &&
                          cartItem.productID &&
                          cartItem.requiredColor.map((color) =>(
                            // eslint-disable-next-line react/jsx-key
                            <li className="">{color.label}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="mt-1 flex">
                      <p className="text-sm pr-[57px]">Size:</p>
                      <ul className="text-sm text-gray-600 flex flex-row gap-2">
                        {cartItem &&
                          cartItem.productID &&
                          cartItem.requiredSize.map((size) =>(
                            // eslint-disable-next-line react/jsx-key
                            <li className="">{size.label}</li>
                          ))}
                      </ul>
                    </div>
                    <div className="mt-1 flex">
                      <p className="text-sm pr-[29px]">Quantity:</p>
                      <p className="text-sm text-gray-600">
                        {cartItem &&
                          cartItem.productID &&
                          cartItem.productQuantity}{" "}
                        piece
                      </p>
                    </div>
                    <div className="mt-1 flex">
                      <p className="text-sm pr-[14px]">Total Price:</p>
                      <p className="text-sm text-gray-600">
                        $
                        {(cartItem &&
                          cartItem.productID &&
                          cartItem.productID.price) *
                          (cartItem &&
                            cartItem.productID &&
                            cartItem.productQuantity)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      type="button"
                      className="font-medium text-yellow-600 sm:order-2 mt-2"
                      onClick={() => handleDeleteCartItem(cartItem._id)}
                    >
                      {componentLevelLoader &&
                      componentLevelLoader.loading &&
                      componentLevelLoader.id === cartItem._id ? (
                        <ComponentLevelLoader
                          text={"Removing"}
                          color={"#000000"}
                          loading={
                            componentLevelLoader && componentLevelLoader.loading
                          }
                        />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null
      }
      buttonComponent={
        <Fragment>
          <ShutterUpButton
            type="button"
            onClick={() => {
              router.push("/cart");
              setShowCartModal(false);
            }}
            className="mt-1.5 w-full inline-block text-white px-5 py-1 text-xs font-medium uppercase
            tracking-wide before:bg-white"
          >
            Go To Cart
          </ShutterUpButton>
          <ShutterUpButton
            disabled={cartItems && cartItems.length === 0}
            type="button"
            onClick={() => {
              router.push("/checkout");
              setShowCartModal(false);
            }}
            className="mt-1.5 w-full inline-block text-white px-5 py-1 text-xs font-medium uppercase
            tracking-wide disabled:opacity-50 before:bg-white"
          >
            Checkout
          </ShutterUpButton>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button type="button" className="font-medium text-grey">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
}
