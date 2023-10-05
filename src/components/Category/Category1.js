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
      <div className=" bg-transparent lg:bg-white pt-2 px-2 lg:px-4 xl:px-6 flex flex-wrap items-center rounded-lg">
        <ul className="flex flex-wrap justify-center gap-4 lg:gap-6 xl:gap-8 py-2 xl:py-4">
          {caterogy8.map((list, index) => {
            return (
              <li
                className="flex flex-col align-top justify-center cursor-pointer hover:text-orange-600 text-center text-sm 
                text-gray-950 w-16 lg:w-20 xl:w-28"
                onClick={() => router.push(list.path)}
                key={index}
              >
                <div className="flex justify-center">
                <Image
                  className="h-12 lg:h-16 xl:h-28 w-12 lg:w-16 xl:w-28 mb-1 lg:mb-3 rounded-full lg:rounded-none"
                  src={list.imageUrl}
                  alt=""
                  height="400"
                  width="400"
                />
                </div>
                <p className="text-xs leading-tight">{list.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Category1;
