"use client";

import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import ShutterUpButton from "../Buttons/ShutterUpButton";
import ComponentLevelLoader from "../Loader/componentlevel";
import Notification from "../Notification";
import SizeComponent from "../FormElements/SizeComponent";

export default function PremiumDetails({ item }) {
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);

  const [cnzQuantity, setCnzQuantity] = useState(1);
  const [newQuantity, setNewQuantity] = useState(cnzQuantity);
  const [selectedSize, setSelectedSize] = useState([]);

  const increaseQuantity = () => {
    setCnzQuantity(cnzQuantity + 1);
    setNewQuantity(cnzQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (cnzQuantity > 1) {
      setCnzQuantity(cnzQuantity - 1);
      setNewQuantity(cnzQuantity - 1);
    }
  };

  async function handleAddToCart(getItem) {
    setComponentLevelLoader({ loading: true, id: "" });

    const res = await addToCart({
      productID: getItem._id,
      userID: user._id,
      productQuantity: newQuantity,
      productCode: getItem.itemCode,
      requiredSize: selectedSize,
    });

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
    console.log(res);
  }

  function handleTileClick(getCurrentItem) {
    // Check if the size is already selected
    const index = selectedSize.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      // If not selected, add it to selectedSizes
      setSelectedSize([getCurrentItem]);
    } else {
      // If already selected, remove it from selectedSizes
      setSelectedSize([]);
    }
  }

  return (
    
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    className="h-full w-full max-w-full object-cover"
                    alt="Product Details"
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {item && item.name}
            </h1>
            <h3>Item code: #{item.itemCode}</h3>
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 botder-t border-b py-4
             sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1
                  className={`text-3xl text-gray-400 font-bold mr-2 ${
                    item.onSale === "yes" ? "line-through" : ""
                  }`}
                >
                  ${item && item.price}
                </h1>
                {item.onSale === "yes" ? (
                  <h1 className="text-3xl font-bold text-[#F85606]">{`$${(
                    item.price -
                    item.price * (item.priceDrop / 100)
                  ).toFixed(2)}`}</h1>
                ) : null}
              </div>

              <ul className="space-y-2">
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  {item && item.deliveryInfo}
                </li>
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  {"Cancel anytime"}
                </li>
              </ul>
            </div>

            <div className="my-8 flex flex-col items-start gap-8 justify-between">
              <div className="flex flex-col">

                <div className=" flex flex-row">
                  <p className="mr-[10px]">Select Size:</p>
                  <SizeComponent
                  selected={selectedSize}
                  data={item.sizes}
                  onClick={handleTileClick}
                  />
                </div>

                <div className="flex flex-row">
                  <p className="mr-[53px]">Price:</p>
                  <p>
                    {`$${(
                      item.price -
                      item.price * (item.priceDrop / 100)
                    ).toFixed(2)}`}
                  </p>
                </div>

                <div className="flex gap-4">
                  <p className="pr-4">Quantity: </p>
                  <button className="text-lg" onClick={decreaseQuantity}>
                    -
                  </button>
                  <p>{newQuantity}</p>
                  <button className="text-lg" onClick={increaseQuantity}>
                    +
                  </button>
                </div>

                <div className="flex gap-4">
                  <p className="mr-[39px]">Total:</p>
                  <div>
                    {`$${
                      newQuantity > 1
                        ? (
                            (item.price - item.price * (item.priceDrop / 100)) *
                            newQuantity
                          ).toFixed(2)
                        : (
                            item.price -
                            item.price * (item.priceDrop / 100)
                          ).toFixed(2)
                    }`}
                  </div>
                </div>
              </div>

              <ShutterUpButton
                type="button"
                onClick={() => handleAddToCart(item)}
                className="inline-block px-5 py-2 text-xs font-medium tracking-wide 
                before:bg-[#F85606] border-none hover:text-white uppercase text-white
                 "
              >
                {/* absolute left-[100%] translate-x-[-100%] top-0 */}
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text={"Adding to Cart"}
                    color={"#ffffff"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  "Add to Cart"
                )}
              </ShutterUpButton>
            </div>
            <div className="lg:col-span-3">
              <div className="border-b border-gray-400">
                <nav className="flex gap-4">
                  <a
                    href="#"
                    className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
                  >
                    Description
                  </a>
                </nav>
              </div>
              <div className="mt-8 flow-root sm:mt-12">
                {item && item.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
