"use client";

import { useRouter } from "next/navigation";
import {
  IoIosCalendar,
  IoIosFemale,
  IoIosGift,
  IoIosGlobe,
  IoIosHome,
  IoIosLeaf,
  IoIosTrophy,
  IoMdArrowDropright,
} from "react-icons/io";
import ClothsTowels from "./ClothsTowels";
import { menuBarFashionOptions, menuBarHomeMakeOver } from "./MenuBarLists";
import classes from "./classes.module.css";

export default function MenuBar() {
  const router = useRouter();

  return (
    <div className="relative clear-both mx-auto my-0 px-1 py-1">
      <nav>
        <ul
          className={`w-[250px] m-0 px-0 py-2 rounded-lg bg-[#ffffff36] list-none ${classes.mcdMenu}`}
        >
          <li onClick={() => router.push("/product/listing/mart")}>
            <i>
              <IoIosHome />
            </i>
            <p>Mart</p>
            <span
              className={`absolute top-[50%] -translate-y-2/4 left-[210px] text-2xl hidden ${classes.arrow1}`}
            >
              <IoMdArrowDropright />
            </span>
          </li>
          <li onClick={() => router.push("/product/listing/beautyGlamour")}>
            <i>
              <IoIosTrophy />
            </i>
            <p>Beauty & Glamour</p>
            <span
              className={`absolute top-[50%] -translate-y-2/4 left-[225px] text-2xl hidden ${classes.arrow1}`}
            >
              <IoMdArrowDropright />
            </span>
          </li>
          <li onClick={() => router.push("/product/listing/homeMakeover")}>
            <i>
              <IoIosGlobe />
            </i>
            <p>Home Makeover</p>
            <span
              className={`absolute top-[50%] -translate-y-2/4 left-[210px] text-2xl hidden ${classes.arrow1}`}
            >
              <IoMdArrowDropright />
            </span>
            <ul
              className="absolute h-auto w-full opacity-0 invisible transition-all 
                 duration-300 ease-linear z-[1000] top-[-72px] px-0 py-2 left-[300px] 
                 bg-[#d0f863] rounded-lg"
            >
              {menuBarHomeMakeOver.map((list, index) => {
                return (
                  <li onClick={() => router.push(list.path)} key={index}>
                    <p>{list.title}</p>
                    <span
                      className={`absolute top-[50%] -translate-y-2/4 left-[225px] text-2xl hidden ${classes.arrow2}`}
                    >
                      <IoMdArrowDropright />
                    </span>
                  </li>
                );
              })}

              <li onClick={() => router.push("/admin-view")}>
                <p>Cloths & Towels</p>
                <span
                  className={`absolute top-[50%] -translate-y-2/4 left-[225px] text-2xl hidden ${classes.arrow2}`}
                >
                  <IoMdArrowDropright />
                </span>
                <ul
                  className="absolute h-[270px] w-full opacity-0 invisible transition-all 
                    duration-300 ease-linear z-[1000] top-[-102px] mt-[-168px] ml-[48px] py-2 px-4 left-[300px] 
                    bg-[#faf7f7a1] rounded-lg"
                >
                  {/* <ClothsTowels /> */}
                </ul>
              </li>
            </ul>
          </li>
          <li onClick={() => router.push("/product/listing/fashion")}>
            <i>
              <IoIosLeaf />
            </i>
            <p>Fashion</p>
            <span
              className={`absolute top-[50%] -translate-y-2/4 left-[210px] text-2xl hidden ${classes.arrow1}`}
            >
              <IoMdArrowDropright />
            </span>
            <ul
              className="absolute h-auto min-w-[250px] opacity-0 invisible transition-all 
                 duration-300 ease-linear z-[1000] top-[-103.5px] m-0 px-0 py-2 left-[300px] 
                 bg-[#ffffff36] rounded-lg"
            >
              {menuBarFashionOptions.map((list, index) => {
                return (
                  <li onClick={() => router.push(list.path)} key={index}>
                    {list.title}
                    <span
                      className={`absolute top-[50%] -translate-y-2/4 left-[180px] text-2xl hidden ${classes.arrow2}`}
                    >
                      <IoMdArrowDropright />
                    </span>
                  </li>
                );
              })}
            </ul>
          </li>
          <li onClick={() => router.push("/product/listing/budgetDeals")}>
            <i>
              <IoIosFemale />
            </i>
            <p>Budget deals</p>
            <span
              className={`absolute top-[50%] -translate-y-2/4 left-[210px] text-2xl hidden ${classes.arrow1}`}
            >
              <IoMdArrowDropright />
            </span>
          </li>
          <li
            onClick={() => router.push("/product/listing/bestPriceGuaranteed")}
          >
            <i>
              <IoIosCalendar />
            </i>
            <p>Best Price Guaranteed</p>
            <span
              className={`absolute top-[50%] -translate-y-2/4 left-[210px] text-2xl hidden ${classes.arrow1}`}
            >
              <IoMdArrowDropright />
            </span>
          </li>
          <li onClick={() => router.push("/product/listing/freeDelivery")}>
            <i>
              <IoIosTrophy />
            </i>
            <p>Free Delivery</p>
            <span
              className={`absolute top-[50%] -translate-y-2/4 left-[210px] text-2xl hidden ${classes.arrow1}`}
            >
              <IoMdArrowDropright />
            </span>
          </li>
          <li onClick={() => router.push("/product/listing/everydayLowPrice")}>
            <i>
              <IoIosGift />
            </i>
            <p>Everyday Low Price</p>
            <span
              className={`absolute top-[50%] -translate-y-2/4 left-[210px] text-2xl hidden ${classes.arrow1}`}
            >
              <IoMdArrowDropright />
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
