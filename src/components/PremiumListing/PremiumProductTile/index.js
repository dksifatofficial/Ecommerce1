"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const PremiumProductTile = ({ item }) => {
  const router = useRouter();
  
  return (
    <div onClick={() => router.push(`/premium-service/premium-item/${item._id}`)}>
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
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
       <h3 className="md-2 text-black text-sm font-semibold line-clamp-1">{item.name}</h3>
        <div className="mb-2 grid mt-2">
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
        
      </div>
    </div>
  );
};

export default PremiumProductTile;