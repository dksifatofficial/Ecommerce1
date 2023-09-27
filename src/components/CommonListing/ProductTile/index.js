"use client";

import Star from "@/components/Star";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductTile = ({ item }) => {
  const router = useRouter();

  const calculateAverageRating = () => {
    let sum = 0;
    for (const rating of item.starRatings) {
      sum += rating.starRating;
    }
    return (sum / item.starRatings.length).toFixed(1);
  };
  const averageRating = calculateAverageRating();

  return (
    <div onClick={() => router.push(`/product/${item._id}`)}>
      <div className="overflow-hideen aspect-w-1 aspect-h-1 h-52">
        <Image
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
          src={item.imageUrl}
          alt="product Image"
          width="400"
          height="400"
        />
      </div>
      {item.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-[#3cca98]">
          <p className="rounded-full p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : (
        <div className="absolute top-0 m-2 rounded-full bg-red-700">
          <p className="rounded-full p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sold Out
          </p>
        </div>
      )}
      <div className="my-2 flex w-full px-3 flex-col items-start justify-between">
        <h3 className="mt-2 text-gray-800 text-sm font-semibold line-clamp-2">
          {item.name}
        </h3>
        <div className="mt-2 w-full flex justify-between">
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
                className={`mr-1 text-sm font-semibold text-gray-400 ${
                  item.onSale === "yes" ? "line-through" : ""
                }`}
              >
                {item.price}
              </p>
              {item.onSale === "yes" ? (
                <p className="text-sm text-gray-700 font-semibold">{`-${item.priceDrop}%`}</p>
              ) : null}
            </div>
          </div>
          {/* star rating */}
          <div className=" flex flex-col items-end justify-end pb-[2px]">
            <div className="flex items-center gap-x-1 flex-col">
              <Star
                stars={averageRating}
                reviews={item.starRatings.length}
                averageRating={averageRating}
              />
              <div className=" flex flex-row">
                <p className="m-0 ml-1 text-xs text-gray-600">
                  ({averageRating > 0 ? averageRating : 0})
                </p>
                <p className="m-0 ml-1 text-xs text-gray-600">
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
