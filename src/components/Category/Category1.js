"use client";

import { caterogy8 } from "@/categoryList";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Category1 = () => {
  const router = useRouter();

  return (
    <div className="w-full grid justify-center items-center">
      {/* <h2 className="px-3 w-full font-semibold text-gray-600 text-center py-6 text-xl">
          Top Sell
        </h2> */}
      <div className="bg-white pt-2 px-2 lg:px-4 xl:px-6 flex flex-wrap items-center rounded-lg">
        <ul className="flex flex-wrap justify-center items-center gap-4 lg:gap-6 xl:gap-8 py-2 xl:py-4">
          {caterogy8.map((list, index) => {
            return (
              <li
                className="cursor-pointer hover:text-orange-600 text-center text-sm 
                text-gray-950 w-20 lg:w-24 xl:w-28 leading-none"
                onClick={() => router.push(list.path)}
                key={index}
              >
                <Image
                  className="h-20 lg:h-24 xl:h-28 w-20 lg:w-24 xl:w-28 mb-3"
                  src={list.imageUrl}
                  alt=""
                  height="400"
                  width="400"
                />
                <p>{list.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Category1;
