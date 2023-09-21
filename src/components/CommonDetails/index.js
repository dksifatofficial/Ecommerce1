"use client";

import Error404 from "@/app/error-404/page";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { productById } from "@/services/product";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ShutterUpButton from "../Buttons/ShutterUpButton";
import SizeComponent from "../FormElements/SizeComponent";
import ComponentLevelLoader from "../Loader/componentlevel";
import Notification from "../Notification";
import Rating from "../TestRating/Rating";

export default function CommonDetails({ item }) {
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);

  const [cnzQuantity, setCnzQuantity] = useState(1);
  const [newQuantity, setNewQuantity] = useState(cnzQuantity);
  const [selectedSize, setSelectedSize] = useState([]);
  const [productData, setProductData] = useState([]);
  const [rating, setRating] = useState(0);
  
// fetching Product Details
  useEffect(() => {
    if (item && item._id) {
      // Fetch the product details by ID
      async function fetchProductDetails() {
        try {
          const response = await productById(item._id);
          if (response.success) {
            // Set the product data in state

            setProductData(response.data);
          } else {
            console.error("Failed to fetch product details:", response.message);
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }

      fetchProductDetails();
    }
  }, [item]);

  // increase or decrease item quantity
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

  // Add To Cart
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
    console.log(res, "DK");
  }

  // select Size for order
  function handleTileClick(getCurrentItem) {
    const index = selectedSize.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) {
      setSelectedSize([getCurrentItem]);
    } else {
      setSelectedSize([]);
    }
  }



  return (
    <div className="w-full">
      {item && item.category !== "premium" ? (
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
                <div
                  className="mt-10 flex flex-col items-center justify-between space-y-4 botder-t border-b py-4
                   sm:flex-row sm:space-y-0"
                >
                  <div className="flex flex-col">
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

                    {/* Test for star rating */}

                    <div className="flex gap-[0.2rem] items-center justify-start">
                      {/* <Star
                        stars={userRating}
                        reviews={item.reviewsCount}
                        onStarClick={handleStarClick}
                      /> */}
                      <Rating
                        className="mt-[-4px]"
                        rating={rating}
                        onRating={(rate) => setRating(rate)}
                      />
                      <p className="ml-1 text-xs text-gray-600">({rating})</p>
                      <p className="ml-1 text-xs text-gray-600">105 reviews</p>
                    </div>

                    {/* <div className="border border-red-500">
                      <p>Give a review</p>
                      <div>
                        
                      </div>
                    </div> */}
                    {/* End Test for star rating */}
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
                                (item.price -
                                  item.price * (item.priceDrop / 100)) *
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
      ) : (
        <Error404>There is no page for this url on this website</Error404>
      )}
    </div>
  );
}
