"use client";

import Error404 from "@/app/error-404/page";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { productById, updateStarRatings } from "@/services/product";
import {
  addToWishlist,
  deleteFromWishlist,
  getAllWishlistItems,
} from "@/services/wishlist";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import Button3 from "../Buttons/Button3";
import InputComponent from "../FormElements/InputComponent";
import SizeComponent from "../FormElements/SizeComponent";
import ComponentLevelLoader from "../Loader/componentlevel";
import Notification from "../Notification";
import Star from "../Star";

const initialFormData = {
  starRatings: [],
};

export default function CommonDetails({ item }) {
  const [formData, setFormData] = useState(initialFormData);
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    wishlistItems,
    setWishlistItems,
  } = useContext(GlobalContext);

  const [cnzQuantity, setCnzQuantity] = useState(1);
  const [newQuantity, setNewQuantity] = useState(cnzQuantity);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [productData, setProductData] = useState([]);
  const [currentRevUser, setCurrentRevUser] = useState(user?._id);
  const [selectedImage, setSelectedImage] = useState(item.imageUrl[0]);
  const [activeButton, setActiveButton] = useState("Description");
  const [isInWishlist, setIsInWishlist] = useState();

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

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

  // Add To Wishlist
  async function handleAddToWishlist(getItem) {
    const res = await addToWishlist({
      productID: getItem._id,
      userID: user._id,
    });

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsInWishlist(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    console.log(res);
  }

  // Extract All Wishlist
  async function extractAllWishlistItems() {
    const res = await getAllWishlistItems(user?._id);

    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item) => ({
              ...item,
              productID: {
                ...item.productID,
              },
            }))
          : [];
          setWishlistItems(updatedData);
      // localStorage.setItem("wishlistItems", JSON.stringify(updatedData));
    }
    console.log(res);
  }

  //Delete To Wishlist
  async function handleDeleteWishlistItem(getItem) {
    const indexToDelete = wishlistItems.findIndex(
      (wish) => wish.userID === user._id && wish.productID._id === item._id
    );

    if (indexToDelete !== -1) {
      const deletedItem = wishlistItems[indexToDelete]; //wishlistItems.splice(indexToDelete, 1)[0];
      const res = await deleteFromWishlist(deletedItem._id);

      if (res.success) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Remove the item from the wishlist
      wishlistItems.splice(indexToDelete, 1);
      setWishlistItems([...wishlistItems]);
      
      // Update isInWishlist
      setIsInWishlist(false);
      } else {
        wishlistItems.splice(indexToDelete, 0, deletedItem);
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setWishlistItems([...wishlistItems]);
    } else {
      toast.error("Item not found in wishlist", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  // isInWishlist and setIsInWishlist
  useEffect(() => {
    if (user !== null) {
      // Make sure wishlistItems is properly initialized
      if (!wishlistItems) return;

      const productInWishlist = wishlistItems.find(
        (wish) => wish.productID?._id === item._id
      );
      setIsInWishlist(!!productInWishlist);
    }
  }, [user, item, wishlistItems]);

    // For Extract All Wishlist
  useEffect(() => {
    if (user !== null) {
      extractAllWishlistItems();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  // Add To Cart
  async function handleAddToCart(getItem) {
    setComponentLevelLoader({ loading: true, id: "" });

    const res = await addToCart({
      productID: getItem._id,
      userID: user._id,
      productQuantity: newQuantity,
      productCode: getItem.itemCode,
      requiredSize: selectedSize,
      requiredColor: selectedColor,
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

  // select color for order
  function handleColorClick(getCurrentItem) {
    const index = selectedColor.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) {
      setSelectedColor([getCurrentItem]);
    } else {
      setSelectedColor([]);
    }
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

  // review
  useEffect(() => {
    setCurrentRevUser(user?._id);
  }, [user?._id]);

  const handleInputChange = (event) => {
    const newRevUser = user?._id;
    const updatedStarRatings = [...formData.starRatings];

    // Check if the current revUser value is different
    const existingIndex = updatedStarRatings.findIndex(
      (item) => item.revUser === currentRevUser
    );

    const newStarRating = parseFloat(event.target.value); // Convert the input value to a number

    if (!isNaN(newStarRating)) {
      if (newStarRating <= 5) {
        // Check if the conversion was successful
        if (existingIndex !== -1) {
          // If the revUser value is the same, edit the previous entry
          updatedStarRatings[existingIndex].starRating = newStarRating;
        } else {
          // If the revUser value is different, add a new entry
          updatedStarRatings.push({
            starRating: newStarRating,
            revUser: newRevUser,
          });
        }

        setFormData({
          ...formData,
          starRatings: updatedStarRatings,
        });

        // Update the currentRevUser state with the new value
        setCurrentRevUser(newRevUser);
      } else {
        // Handle the case where the input value is above 5 (e.g., show an error message)
        toast.error("Rating must be 5 or below", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("Rating must be 5 or below.");
      }
    } else {
      // Handle the case where the input value is not a valid number
      // You can show an error message or take other appropriate action here
    }
  };

  console.log(currentUpdatedProduct);

  useEffect(() => {
    if (currentUpdatedProduct !== null) setFormData(currentUpdatedProduct);
  }, [currentUpdatedProduct]);

  async function handleAddProduct() {
    const res =
      currentUpdatedProduct !== null ? await updateStarRatings(formData) : null;

    console.log(res);

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);
      setCurrentUpdatedProduct(null);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);
    }
  }

  const calculateAverageRating = () => {
    let sum = 0;
    for (const rating of item.starRatings) {
      sum += rating.starRating;
    }
    return (sum / item.starRatings.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="w-full">
      <Helmet>
        <title>{item ? item.name : ""}</title>
        <meta name="description" content="" />
      </Helmet>
      {item && item.category !== "premium" ? (
        <section className="mx-auto max-w-screen-xl ">
          <div className="container mx-auto py-3 md:py-6 lg:py-12 px-2 sm:px-0">
            {/* Main section */}
            <div className="flex flex-col sm:flex-row flex-wrap mb-4 overflow-hidden">
              {/* picture section */}
              <div
                className="col-span-3 bg-white rounded-lg sm:rounded-tr-none py-5 w-full sm:w-[30%] row-end-1
              flex justify-center sm:rounded-tb-none"
              >
                <div className="flex flex-row sm:flex-col w-full justify-center items-start px-5 gap-4 sm:gap-0">
                  <div className="order-2 sm:order-1 pb-4 border-b w-full flex justify-center">
                    <div className="max-w-full h-[350px] flex justify-center w-full overflow-hidden rounded-lg">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedImage}
                        className="h-full max-w-full object-cover rounded-lg"
                        alt="Product Image"
                      />
                    </div>
                  </div>
                  <div className="mt-0 sm:mt-2 sm:w-full order-1 sm:order-2 flex-shrink-0">
                    <div className="flex flex-col md:flex-row sm:flex-wrap justify-center">
                      {item && item.imageUrl && item.imageUrl.length ? (
                        <button
                          type="button"
                          className="flex-0 aspect-square mb-3 h-16 w-16 overflow-hidden rounded-lg 
                          border-2 border-gray-100 text-center"
                          onClick={() => setSelectedImage(item.imageUrl[0])}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl[0]}
                            className="h-full w-full object-cover"
                            alt="Product Details"
                          />
                        </button>
                      ) : null}
                      {item && item.imageUrl && item.imageUrl.length > 1 ? (
                        <button
                          type="button"
                          className="flex-0 aspect-square mb-3 h-16 w-16 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                          onClick={() => setSelectedImage(item.imageUrl[1])}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl[1]}
                            className="h-full w-full object-cover"
                            alt="Product Details"
                          />
                        </button>
                      ) : null}
                      {item && item.imageUrl && item.imageUrl.length > 2 ? (
                        <button
                          type="button"
                          className="flex-0 aspect-square mb-3 h-16 w-16 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                          onClick={() => setSelectedImage(item.imageUrl[2])}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl[2]}
                            className="h-full w-full object-cover"
                            alt="Product Details"
                          />
                        </button>
                      ) : null}
                      {item && item.imageUrl && item.imageUrl.length > 3 ? (
                        <button
                          type="button"
                          className="flex-0 aspect-square mb-3 h-16 w-16 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                          onClick={() => setSelectedImage(item.imageUrl[3])}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl[3]}
                            className="h-full w-full object-cover"
                            alt="Product Details"
                          />
                        </button>
                      ) : null}
                      {item && item.imageUrl && item.imageUrl.length > 4 ? (
                        <button
                          type="button"
                          className="flex-0 aspect-square mb-3 h-16 w-16 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                          onClick={() => setSelectedImage(item.imageUrl[4])}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl[4]}
                            className="h-full w-full object-cover"
                            alt="Product Details"
                          />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* product section */}
              {/* header section */}
              <div className="w-full sm:w-[45%] pl-4 sm:pl-0 pr-4 sm:pr-5 mt-2 sm:mt-0 py-5 sm:rounded-none rounded-lg bg-white">
                <div className="border-b pb-6">
                  <h1 className="text-xl font-semibold text-gray-600">
                    {item && item.name}
                  </h1>
                  <p className="text-xs text-gray-400">
                    Item code: #{item.itemCode}
                  </p>
                  {/*star rating */}
                  <div className="py-1 flex flex-row justify-between">
                    <div>
                      <div className="flex gap-[0.2rem] items-center justify-start">
                        <Star
                          stars={averageRating}
                          reviews={item.starRatings.length}
                          averageRating={averageRating}
                          // onStarClick={handleStarClick}
                        />
                        <p className="m-0 ml-1 text-xs text-gray-600">
                          ({averageRating})
                        </p>
                        <p className="m-0 ml-1 text-xs text-gray-600">
                          {item.starRatings.length} reviews
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">
                        Brand:{" "}
                        <span className="text-teal-500">{item.brand}</span> |{" "}
                        <Link
                          className="text-teal-500 hover:underline"
                          href="/"
                        >
                          More from No Brand
                        </Link>
                      </p>
                    </div>

                    {/* Wishlist Button*/}
                    <div>
                      {isInWishlist ? (
                        // If the product is in the wishlist, show the "Remove from Wishlist" button
                        <button
                          onClick={() => handleDeleteWishlistItem(item)}
                          className="text-red-500 text-lg md:text-xl"
                        >
                          <AiFillHeart />
                        </button>
                      ) : (
                        // If the product is not in the wishlist, show the "Add to Wishlist" button
                        <button
                          onClick={() => handleAddToWishlist(item)}
                          className="text-red-500 text-lg md:text-xl"
                        >
                          <AiOutlineHeart />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price section */}
                <div
                  className="flex flex-col justify-start space-y-4 botder-t border-b py-4
                   sm:flex-row sm:space-y-0"
                >
                  <div className="flex flex-col">
                    <div className="flex items-end">
                      {item.onSale === "yes" ? (
                        <h1 className="text-3xl font-bold text-[#F85606]">{`$${(
                          item.price -
                          item.price * (item.priceDrop / 100)
                        ).toFixed(2)}`}</h1>
                      ) : null}
                      <h1
                        className={`text-3xl text-gray-400 font-bold ml-4 ${
                          item.onSale === "yes" ? "line-through" : ""
                        }`}
                      >
                        ${item && item.price}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Order section */}
                <div className="mt-8 flex flex-col items-start gap-8 justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row">
                      <p className="text-ms text-gray-400 mr-[10px]">
                        Color Family:
                      </p>
                      <SizeComponent
                        selected={selectedColor}
                        data={item.colors}
                        onClick={handleColorClick}
                      />
                    </div>

                    <div className="flex flex-row">
                      <p className="text-ms text-gray-400 mr-[20px]">
                        Select Size:
                      </p>
                      <SizeComponent
                        selected={selectedSize}
                        data={item.sizes}
                        onClick={handleTileClick}
                      />
                    </div>

                    <div className="flex gap-4">
                      <p className="text-ms text-gray-400 pr-[22px]">
                        Quantity:{" "}
                      </p>
                      <button
                        className="text-lg px-3 text-gray-700 bg-gray-200"
                        onClick={decreaseQuantity}
                      >
                        -
                      </button>
                      <p className="text-lg text-gray-700">{newQuantity}</p>
                      <button
                        className="text-lg px-3 text-gray-700 bg-gray-200"
                        onClick={increaseQuantity}
                      >
                        +
                      </button>
                    </div>

                    <div className="flex gap-4">
                      <p className="text-ms text-gray-400 mr-[49px]">Total:</p>
                      <p className="text-ms text-gray-700">
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
                      </p>
                    </div>
                  </div>

                  {/* Button section */}
                  <div className="w-full flex justify-center">
                    <Button3
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className="px-20 py-2 border-none uppercase text-xs md:text-sm"
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
                    </Button3>
                  </div>
                </div>
                {/* End Order section */}
              </div>

              {/* delivery/warenty section */}
              <div
                className="w-full sm:w-[25%] px-4 sm:px-0 mt-4 sm:mt-0 bg-slate-50 flex flex-col rounded-lg
               sm:rounded-tl-none sm:rounded-tb-none"
              >
                <div className="flex flex-col px-2 sm:px-5">
                  <div className="py-4 border-b">
                    <p className="text-xs text-gray-500">Delivery info:</p>
                  </div>

                  <div className="flex flex-row py-4 justify-between">
                    <div className="flex flex-col">
                      <p className="text-base font-semibold text-gray-800">
                        Standard Delivery
                      </p>
                      <p className="text-xs text-gray-500">3 - 7 day</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        <span className="text-lg font-bold">৳</span>
                        {item && item.deliveryInfo}
                      </p>
                    </div>
                  </div>

                  <div className="border-b py-4">
                    <p className="text-gray-800 text-base">
                      Cash on Delivery Available
                    </p>
                  </div>
                </div>

                <div className="flex flex-col px-2 sm:px-5">
                  <div className="py-4 border-b">
                    <p className="text-xs text-gray-500">Service info:</p>
                  </div>

                  <div className="flex flex-row py-4 justify-between">
                    <div className="flex flex-col">
                      <p className="text-base text-gray-800">7 Day Return</p>
                      <p className="text-xs text-gray-500">
                        Change of mind not applicable
                      </p>
                      <p className="text-xs text-gray-500">
                        <span className=" text-teal-500">
                          Terms & Conditions
                        </span>{" "}
                        apply
                      </p>
                    </div>
                  </div>

                  <div className="border-b py-4">
                    <p className="text-gray-800 text-base">
                      Warranty not available
                    </p>
                  </div>
                </div>

                <div className="flex flex-col px-2 sm:px-5">
                  <div className="py-4 border-b">
                    <p className="text-xs text-gray-500">Sold by:</p>
                  </div>

                  <div className="flex flex-row py-4 justify-between">
                    <div className="flex flex-col">
                      <p className="text-base text-gray-800">Store Name</p>
                      <p className="text-xs text-gray-500">
                        Lorem ipsum dolor sit amet
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End main section */}

            {/* Product More details & Review section */}
            <div className="bg-white rounded-lg mt-8 py-8 px-4 sm:px-6 md:px-12">
              <div className="py-4 px-4">
                <p className=" text-xl font-semibold text-gray-700">
                  Product Description & Reviews:
                </p>
              </div>

              <div className=" px-4">
                <div className="border-b border-gray-400">
                  <nav className="flex gap-4">
                    <button
                      onClick={() => handleButtonClick("Description")}
                      className={`border-gray-900 py-4 text-sm font-medium text-gray-900 ${
                        activeButton === "Description" ? "border-b-2" : ""
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => {
                        setCurrentUpdatedProduct(item);
                        handleButtonClick("Reviews");
                      }}
                      className={`border-gray-900 py-4 text-sm font-medium text-gray-900 ${
                        activeButton === "Reviews" ? "border-b-2" : ""
                      }`}
                    >
                      Review&apos;s
                    </button>
                  </nav>
                </div>
              </div>

              {/* Description div */}
              {activeButton === "Description" && (
                <div className="px-0 md:px-4">
                  <div className="py-4">
                    <p className=" bg-slate-100 px-4 py-2 text-xs md:text-base font-semibold text-gray-700">
                      Product details of {item && item.name}:
                    </p>
                  </div>

                  <div className="px-4">
                    <p className="text-xs md:text-base whitespace-pre-line">
                      {item && item.description}
                    </p>
                  </div>

                  <div className="py-4">
                    <p className=" bg-slate-100 px-4 py-2 text-xs md:text-base font-semibold text-gray-700">
                      Specifications of {item && item.name}:
                    </p>
                  </div>

                  <div className="pb-4 px-4">
                    <p className="text-xs md:text-base whitespace-pre-line">
                      {item && item.details}
                    </p>
                  </div>

                  <div className="py-4 px-4">
                    <p className="text-gray-500 text-sm">
                      Material:{" "}
                      <span className="text-gray-700 text-xs md:text-sm">
                        {item && item.material}
                      </span>
                    </p>
                  </div>

                  <div className="py-4 px-4">
                    <p className="text-gray-500 text-sm">
                      What&apos;s in the box:{" "}
                      <span className="text-gray-700 text-xs md:text-sm">
                        {item && item.whatsInTheBox}
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Review div */}
              {activeButton === "Reviews" && (
                <div className="mt-8 px-12">
                  <div className="mt-4 w-[200px]">
                    <InputComponent
                      type="number"
                      placeholder="5"
                      label="Give a Rating"
                      value={formData.starRatings.starRating}
                      controlItem="starRating"
                      onChange={handleInputChange}
                    />
                    <button
                      className="bg-teal-500 rounded-lg px-6 py-2 mb-8 mt-4 text-white text-sm font-semibold"
                      onClick={handleAddProduct}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
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
