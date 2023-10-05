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
  menuBarGenderOptions,
  menuBarHomeMakeOver,
  menuBarMart,
} from "./MenuBarLists";
import classes from "./classes.module.css";

export default function MenuBar() {
  const router = useRouter();


  return (
    <div className="relative my-0">
      <nav>
        <ul
          className={`w-[250px] m-0 p-0 py-4 rounded-lg bg-white list-none ${classes.mcdMenu}`}
        >
          <li onClick={() => router.push("/product/listing/mart")}>
            <div className=" relative flex flex-row">
              <i>
                <IoIosHome />
              </i>
              <p>Mart</p>
              <span
                className={`absolute top-[50%] -translate-y-2/4 left-[210px] text-2xl hidden ${classes.arrow1}`}
              >
                <IoMdArrowDropright />
              </span>
            </div>
            <ul
              className="absolute h-[320px] w-[290px] opacity-0 invisible transition-all 
                 duration-300 ease-linear z-[1000] top-0 px-0 py-2 left-[300px] 
                 bg-white rounded-lg"
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
            <div className=" relative flex flex-row">
              <i>
                <IoIosGlobe />
              </i>
              <p>Home Makeover</p>
              <span
                className={`absolute top-[50%] -translate-y-2/4 left-[210px] text-2xl hidden ${classes.arrow1}`}
              >
                <IoMdArrowDropright />
              </span>
            </div>
            <ul
              className="absolute h-[320px] w-[290px] opacity-0 invisible transition-all 
                 duration-300 ease-linear z-[1000] top-0 px-0 py-2 left-[300px] 
                 bg-white rounded-lg"
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
            <div className=" relative flex flex-row">
              <i>
                <IoIosLeaf />
              </i>
              <p>Fashion</p>
              <span
                className={`absolute top-[50%] -translate-y-2/4 left-[210px] text-2xl hidden ${classes.arrow1}`}
              >
                <IoMdArrowDropright />
              </span>
            </div>
            <ul
              className="absolute h-[320px] min-w-[290px] opacity-0 invisible transition-all 
                 duration-300 ease-linear z-[1000] top-0 m-0 px-0 py-2 left-[300px] 
                 bg-white rounded-lg"
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
            <div className=" relative flex flex-row">
            <i>
              <IoIosFemale />
            </i>
            <p>Gender Categories</p>
            <span
                className={`absolute top-[50%] -translate-y-2/4 left-[210px] text-2xl hidden ${classes.arrow1}`}
              >
                <IoMdArrowDropright />
              </span>
            </div>
            <ul
              className="absolute h-[320px] min-w-[290px] opacity-0 invisible transition-all 
                 duration-300 ease-linear z-[1000] top-0 m-0 px-0 py-2 left-[300px] 
                 bg-white rounded-lg"
            >
              {menuBarGenderOptions.map((list, index) => {
                return (
                  <li onClick={() => router.push(list.path)} key={index}>
                    {list.title}
                  </li>
                );
              })}
            </ul>
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
            <div className=" relative flex flex-row">
              <i>
                <IoIosTrophy />
              </i>
              <p>Free Delivery</p>
              <span
                className={`absolute top-[50%] -translate-y-2/4 left-[210px] text-2xl hidden ${classes.arrow1}`}
              >
                <IoMdArrowDropright />
              </span>
            </div>
            <ul
              className="absolute h-[320px] w-[290px] opacity-0 invisible transition-all 
                 duration-300 ease-linear z-[1000] top-0 px-0 py-2 left-[300px] 
                 bg-white rounded-lg"
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
              <IoIosFemale />
            </i>
            <p>Budget deals</p>
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
