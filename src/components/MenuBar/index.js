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
import {
  menuBarFashionOptions,
  menuBarHomeMakeOver,
  menuBarMart,
} from "./MenuBarLists";
import classes from "./classes.module.css";

export default function MenuBar() {
  const router = useRouter();

  return (
    <div className="relative clear-both mx-auto my-0 px-1 py-1">
      <nav>
        <ul
          className={`w-[250px] m-0 px-0 py-2 rounded-lg bg-[#ffffffa1] list-none ${classes.mcdMenu}`}
        >
          <li onClick={() => router.push("/product/listing/mart")}>
            <i>
              <IoIosHome />
            </i>
            <p>Mart</p>
            <span
              className={`absolute top-[50%] -translate-y-2/4 left-[230px] text-2xl hidden ${classes.arrow1}`}
            >
              <IoMdArrowDropright />
            </span>
            <ul
              className="absolute h-auto w-[290px] opacity-0 invisible transition-all 
                 duration-300 ease-linear z-[1000] top-[-8px] px-0 py-2 left-[300px] 
                 bg-[#ffffffa1] rounded-lg"
            >
              {menuBarMart.map((list, index) => {
                return (
                  <li onClick={() => router.push(list.path)} key={index}>
                    <p>{list.title}</p>
                  </li>
                );
              })}
            </ul>
          </li>
          <li onClick={() => router.push("/product/listing/beautyGlamour")}>
            <i>
              <IoIosTrophy />
            </i>
            <p>Beauty & Glamour</p>
          </li>
          <li onClick={() => router.push("/product/listing/homeMakeover")}>
            <i>
              <IoIosGlobe />
            </i>
            <p>Home Makeover</p>
            <span
              className={`absolute top-[50%] -translate-y-2/4 left-[230px] text-2xl hidden ${classes.arrow1}`}
            >
              <IoMdArrowDropright />
            </span>
            <ul
              className="absolute h-auto w-[290px] opacity-0 invisible transition-all 
                 duration-300 ease-linear z-[1000] top-[-72px] px-0 py-2 left-[300px] 
                 bg-[#ffffffa1] rounded-lg"
            >
              {menuBarHomeMakeOver.map((list, index) => {
                return (
                  <li onClick={() => router.push(list.path)} key={index}>
                    <p>{list.title}</p>
                  </li>
                );
              })}
            </ul>
          </li>
          <li onClick={() => router.push("/product/listing/fashion")}>
            <i>
              <IoIosLeaf />
            </i>
            <p>Fashion</p>
            <span
              className={`absolute top-[50%] -translate-y-2/4 left-[230px] text-2xl hidden ${classes.arrow1}`}
            >
              <IoMdArrowDropright />
            </span>
            <ul
              className="absolute h-auto min-w-[290px] opacity-0 invisible transition-all 
                 duration-300 ease-linear z-[1000] top-[-103.5px] m-0 px-0 py-2 left-[300px] 
                 bg-[#ffffffa1] rounded-lg"
            >
              {menuBarFashionOptions.map((list, index) => {
                return (
                  <li onClick={() => router.push(list.path)} key={index}>
                    {list.title}
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
          </li>
          <li
            onClick={() => router.push("/product/listing/bestPriceGuaranteed")}
          >
            <i>
              <IoIosCalendar />
            </i>
            <p>Best Price Guaranteed</p>
          </li>
          <li onClick={() => router.push("/product/listing/freeDelivery")}>
            <i>
              <IoIosTrophy />
            </i>
            <p>Free Delivery</p>
            <span
              className={`absolute top-[50%] -translate-y-2/4 left-[230px] text-2xl hidden ${classes.arrow1}`}
            >
              <IoMdArrowDropright />
            </span>
            <ul
              className="absolute h-auto w-[290px] opacity-0 invisible transition-all 
                 duration-300 ease-linear z-[1000] top-[-200px] px-0 py-2 left-[300px] 
                 bg-[#ffffffa1] rounded-lg"
            >
              {menuBarMart.map((list, index) => {
                return (
                  <li onClick={() => router.push(list.path)} key={index}>
                    <p>{list.title}</p>
                  </li>
                );
              })}
            </ul>
          </li>
          <li onClick={() => router.push("/product/listing/everydayLowPrice")}>
            <i>
              <IoIosGift />
            </i>
            <p>Everyday Low Price</p>
          </li>
        </ul>
      </nav>
    </div>
  );
}
