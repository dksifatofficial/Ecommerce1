"use client";

import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteFromWishlist, getAllWishlistItems } from "@/services/wishlist";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { ImBin } from "react-icons/im";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";

const MyWishlist = () => {
  const { user, wishlistItems, setWishlistItems } = useContext(GlobalContext);

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
      (wish) => wish.userID === user._id && wish.productID._id === getItem._id
    );

    if (indexToDelete !== -1) {
      const deletedItem = wishlistItems.splice(indexToDelete, 1)[0];
      const res = await deleteFromWishlist(deletedItem._id);

      if (res.success) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
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

  useEffect(() => {
    if (user !== null) {
      extractAllWishlistItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Add To Cart
  async function handleAddToCart(getItem) {
    const res = await addToCart({
      productID: getItem._id,
      userID: user._id,
      productQuantity: 1,
      productCode: getItem.itemCode,
    });

    if (res.success) {
      toast.success("Product is added to cart !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("Something went wrong ! Please try again later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    console.log(res);
  }

  const router = useRouter();

  // console.log(item)

  return (
    <>
      <div className="p-4 md:p-6 lg:p-12">
        <h4 className="text-sm md:text-base lg:text-lg text-gray-600 font-semibold mb-4 md:mb-6">
          My Wishlist ({wishlistItems.length})
        </h4>
        <ul className="flex flex-col bg-white p-4 md:p-6 lg:p-8 gap-4">
          {wishlistItems && wishlistItems.length
            ? wishlistItems.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <li className="flex flex-row justify-start gap-4 border-t border-b pt-4 pb-4">
                  <div className="w-full flex flex-col md:flex-row justify-start md:justify-between gap-x-7 gap-y-4">
                    <div className="flex flex-row gap-4 w-full md:w-[50%]">
                      <div
                        className="h-20 w-24 md:w-20 overflow-hidden bg-white cursor-pointer"
                        onClick={() =>
                          router.push(`/product/${item.productID._id}`)
                        }
                      >
                        <Image
                          className="object-cover"
                          src={item.productID.imageUrl[0]}
                          alt="product Image"
                          width="400"
                          height="400"
                        />
                      </div>
                      <div className="">
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(`/product/${item.productID._id}`)
                          }
                        >
                          <p className="line-clamp-2 pt-1 text-xs md:text-sm text-gray-700">
                            {item.productID.name}
                          </p>
                        </div>
                        <button
                          className="mt-3 p-1 text-gray-500 text-lg"
                          onClick={() =>
                            handleDeleteWishlistItem(item.productID)
                          }
                        >
                          <ImBin />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between w-full md:w-[50%]">
                      <div>
                        <p className="text-[#f57224] font-semibold text-sm md:text-base">
                          ${" "}
                          {item.productID.price -
                            item.productID.price *
                              (item.productID.priceDrop / 100)}
                        </p>

                        {item.productID.priceDrop > 0 ? (
                          <p className="text-xs md:text-sm text-gray-700">
                            <span className="line-through text-gray-400 mr-2">
                              $ {item.productID.price}
                            </span>
                            - {item.productID.priceDrop}%
                          </p>
                        ) : null}

                        {item.productID.priceDrop > 0 ? (
                          <p className="text-[#4caf50] text-xs md:text-sm">
                            Price dropped
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <button
                          className="bg-[#f57224] px-4 py-2 text-white text-xl rounded-sm"
                          onClick={() => handleAddToCart(item.productID)}
                        >
                          <MdAddShoppingCart />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </>
  );
};

export default MyWishlist;
