"use client";

import Star from "@/components/Star";
import { GlobalContext } from "@/context";
import { addToWishlist, getAllWishlistItems } from "@/services/wishlist";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";

const ProductTile = ({ item }) => {
  const { user, wishlistItems, setWishlistItems } = useContext(GlobalContext);
  const [isInWishlist, setIsInWishlist] = useState();
  const router = useRouter();

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

  const calculateAverageRating = () => {
    let sum = 0;
    for (const rating of item.starRatings) {
      sum += rating.starRating;
    }
    return (sum / item.starRatings.length).toFixed(1);
  };
  const averageRating = calculateAverageRating();

  return (
    <div className="">
      <div className="relative overflow-hideen aspect-w-1 aspect-h-1 h-52">
        <Image
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
          onClick={() => router.push(`/product/${item._id}`)}
          src={item.imageUrl[0]}
          alt="product Image"
          width="400"
          height="400"
        />
      </div>
      <div className="absolute top-0 right-0 m-2">
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
      {item.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-[#3cca98]">
          <div className="rounded-full p-0 text-[12px] font-bold uppercase tracking-wide text-white sm:py-0 sm:px-3">
            {item && item.priceDrop > 1 ? (
              <p>-{item.priceDrop}%</p>
            ) : (
              <p>Sale</p>
            )}
          </div>
        </div>
      ) : (
        <div className="absolute top-0 m-2 rounded-full bg-red-700">
          <p className="rounded-full p-0 text-[12px] font-bold uppercase tracking-wide text-white sm:py-0 sm:px-3">
            Sold Out
          </p>
        </div>
      )}
      <div
        className="mt-2 flex w-full px-3 flex-col items-start justify-between"
        onClick={() => router.push(`/product/${item._id}`)}
      >
        <div className="h-[40px] overflow-hidden">
          <h3 className="text-gray-600 text-xs font-semibold line-clamp-2">
            {item.name}
          </h3>
        </div>
        <div className="w-full flex flex-col lg:flex-row lg:justify-between">
          <div className="grid">
            <div className="w-full">
              {item.onSale === "yes" ? (
                <p className="text-base font-semibold text-[#F85606]">{`$ ${(
                  item.price -
                  item.price * (item.priceDrop / 100)
                ).toFixed(2)}`}</p>
              ) : (
                <p className="text-base font-semibold text-[#F85606]">
                  {`$ ${item.price}`}
                </p>
              )}
            </div>
            <div className="w-full flex">
              <p
                className={`mr-1 text-xs md:text-sm font-semibold text-gray-400 ${
                  item.onSale === "yes" ? "line-through" : ""
                }`}
              >
                {item.price}
              </p>
              {item.onSale === "yes" ? (
                <p className="text-xs md:text-sm text-gray-700 font-semibold">{`-${item.priceDrop}%`}</p>
              ) : null}
            </div>
          </div>
          {/* star rating */}
          <div className="flex flex-col items-start lg:items-end justify-start lg:justify-end mt-1 lg:mt-0 pb-1">
            <div className="flex items-center gap-x-1 flex-row lg:flex-col">
              <Star
                stars={averageRating}
                reviews={item.starRatings.length}
                averageRating={averageRating}
              />
              <div className="flex flex-row">
                <p className="m-0 lg:ml-1 text-[10px] text-gray-600">
                  ({averageRating > 0 ? averageRating : 0})
                </p>
                <p className="m-0 lg:ml-1 text-[10px] text-gray-600">
                  {item.starRatings.length} reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTile;
