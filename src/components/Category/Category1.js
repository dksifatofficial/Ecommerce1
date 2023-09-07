"use client";

import { caterogy8 } from "@/categoryList";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Category1 = () => {
  const router = useRouter();

  return (
    <div className="w-full mt-8 grid justify-center items-center">
      <h2 className="px-3 w-full font-semibold text-gray-600 text-center py-6 text-xl">
          Top Sell
        </h2>
      <div className="bg-white pt-2 px-6 flex flex-wrap items-center rounded-lg">
        <ul className="flex flex-wrap justify-center items-center gap-8">
          {caterogy8.map((list, index) => {
            return (
              <li
                className="cursor-pointer h-40 hover:text-orange-600 text-center text-sm 
                text-gray-950 w-28 leading-none"
                onClick={() => router.push(list.path)}
                key={index}
              >
                <Image
                  className="h-28 w-28 mb-3"
                  src={list.imageUrl}
                  alt=""
                  height="400"
                  width="400"
                />
                {list.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Category1;
