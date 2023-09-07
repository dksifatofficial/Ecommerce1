"use client";

import { caterogyFull } from "@/categoryList";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CategoryFull = () => {
  const router = useRouter();

  return (
    <div className="w-full mt-4 flex justify-center items-center mx-12">
      <div className="pt-2 flex flex-wrap items-center">
        <h2 className="px-3 w-full font-semibold text-gray-600 text-center py-6 text-xl">
          Categories
        </h2>
        <ul className="flex flex-wrap justify-center items-center gap-0">
          {caterogyFull.map((list, index) => {
            return (
              <li
                className="bg-white cursor-pointer h-44 text-center text-sm border border-slate-100
                hover:shadow-[0_5px_6px_0.2px_rgba(0,0,0,0.1)] text-gray-950 w-36 leading-none
                grid items-center justify-items-center py-2 hover:z-10"
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

export default CategoryFull;
