"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  IoIosCalendar,
  IoIosFemale,
  IoIosGift,
  IoIosGlobe,
  IoIosHome,
  IoIosLeaf,
  IoIosTrophy,
} from "react-icons/io";
import {
  menuBarFashionOptions,
  menuBarGenderOptions,
  menuBarHomeMakeOver,
  menuBarMart,
} from "./MenuBarLists";

const AllCategories = () => {
  const [activeButton, setActiveButton] = useState("Mart");
  const router = useRouter();

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div className="max-w-[100vw] mt-2 mb-2 ml-2 mr-2">
      <div className="w-full flex flex-row gap-2">
        <nav className="w-[40%] flex flex-col gap-2">
          <button
            onClick={() => handleButtonClick("Mart")}
            className={`py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium text-left ${
              activeButton === "Mart" ? "text-[#e67e22]" : " text-gray-500"
            }`}
          >
            <i className="text-lg">
              <IoIosHome />
            </i>
            <p>Mart</p>
          </button>
          <button
            onClick={() => handleButtonClick("BeautyGlamour")}
            className={`py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium text-left ${
              activeButton === "BeautyGlamour"
                ? "text-[#e67e22]"
                : " text-gray-500"
            }`}
          >
            <i className="text-lg">
              <IoIosGlobe />
            </i>
            <p>Beauty & Glamour</p>
          </button>
          <button
            onClick={() => handleButtonClick("HomeMakeover")}
            className={`py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium text-left ${
              activeButton === "HomeMakeover"
                ? "text-[#e67e22]"
                : " text-gray-500"
            }`}
          >
            <i className="text-lg">
              <IoIosTrophy />
            </i>
            <p>Home Makeover</p>
          </button>
          <button
            onClick={() => handleButtonClick("Fashion")}
            className={`py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium text-left ${
              activeButton === "Fashion" ? "text-[#e67e22]" : " text-gray-500"
            }`}
          >
            <i className="text-lg">
              <IoIosLeaf />
            </i>
            <p>Fashion</p>
          </button>
          <button
            onClick={() => handleButtonClick("GenderCategories")}
            className={`py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium text-left ${
              activeButton === "GenderCategories"
                ? "text-[#e67e22]"
                : " text-gray-500"
            }`}
          >
            <i className="text-lg">
              <IoIosFemale />
            </i>
            <p>Gender Categories</p>
          </button>
          <button
            onClick={() => handleButtonClick("BestPriceGuaranteed")}
            className={`py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium text-left ${
              activeButton === "BestPriceGuaranteed"
                ? "text-[#e67e22]"
                : " text-gray-500"
            }`}
          >
            <i className="text-lg">
              <IoIosCalendar />
            </i>
            <p>Best Price Guaranteed</p>
          </button>
          <button
            onClick={() => handleButtonClick("FreeDelivery")}
            className={`py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium text-left ${
              activeButton === "FreeDelivery"
                ? "text-[#e67e22]"
                : " text-gray-500"
            }`}
          >
            <i className="text-lg">
              <IoIosTrophy />
            </i>
            <p>Free Delivery</p>
          </button>
          <button
            onClick={() => handleButtonClick("BudgetDeals")}
            className={`py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium text-left ${
              activeButton === "BudgetDeals"
                ? "text-[#e67e22]"
                : " text-gray-500"
            }`}
          >
            <i className="text-lg">
              <IoIosFemale />
            </i>
            <p>Budget Deals</p>
          </button>
          <button
            onClick={() => handleButtonClick("EverydayLowPrice")}
            className={`py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium text-left ${
              activeButton === "EverydayLowPrice"
                ? "text-[#e67e22]"
                : " text-gray-500"
            }`}
          >
            <i className="text-lg">
              <IoIosGift />
            </i>
            <p>Everyday Low Price</p>
          </button>
        </nav>

        <div className="w-[60%]">

          {activeButton === "Mart" && (
            <div>
              <ul className="flex flex-col gap-2">
                {menuBarMart.map((list, index) => {
                  return (
                    <li
                      className="py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium
                       text-left text-gray-700 cursor-pointer"
                      onClick={() => router.push(list.path)}
                      key={index}
                    >
                      <p>{list.title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {activeButton === "BeautyGlamour" && (
            <div>
              <ul className="flex flex-col gap-2">
                {menuBarFashionOptions.map((list, index) => {
                  return (
                    <li
                      className="py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium
                        text-left text-gray-700 cursor-pointer"
                        onClick={() => router.push(list.path)}
                      key={index}
                    >
                      <p>{list.title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {activeButton === "HomeMakeover" && (
            <div>
              <ul className=" flex flex-col gap-2">
                {menuBarHomeMakeOver.map((list, index) => {
                  return (
                    <li
                      className="py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium
                        text-left text-gray-700 cursor-pointer"
                        onClick={() => router.push(list.path)}
                      key={index}
                    >
                      <p>{list.title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {activeButton === "Fashion" && (
            <div>
              <ul className=" flex flex-col gap-2">
                {menuBarFashionOptions.map((list, index) => {
                  return (
                    <li
                      className="py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium
                        text-left text-gray-700 cursor-pointer"
                        onClick={() => router.push(list.path)}
                      key={index}
                    >
                      <p>{list.title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {activeButton === "GenderCategories" && (
            <div>
              <ul className=" flex flex-col gap-2">
                {menuBarGenderOptions.map((list, index) => {
                  return (
                    <li
                      className="py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium
                        text-left text-gray-700 cursor-pointer"
                        onClick={() => router.push(list.path)}
                      key={index}
                    >
                      <p>{list.title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {activeButton === "BestPriceGuaranteed" && (
            <div>
              <ul className=" flex flex-col gap-2">
                {menuBarMart.map((list, index) => {
                  return (
                    <li
                      className="py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium
                        text-left text-gray-700 cursor-pointer"
                        onClick={() => router.push(list.path)}
                      key={index}
                    >
                      <p>{list.title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {activeButton === "FreeDelivery" && (
            <div>
              <ul className=" flex flex-col gap-2">
                {menuBarHomeMakeOver.map((list, index) => {
                  return (
                    <li
                      className="py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium
                        text-left text-gray-700 cursor-pointer"
                        onClick={() => router.push(list.path)}
                      key={index}
                    >
                      <p>{list.title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {activeButton === "BudgetDeals" && (
            <div>
              <ul className=" flex flex-col gap-2">
                {menuBarFashionOptions.map((list, index) => {
                  return (
                    <li
                      className="py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium
                        text-left text-gray-700 cursor-pointer"
                        onClick={() => router.push(list.path)}
                      key={index}
                    >
                      <p>{list.title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {activeButton === "EverydayLowPrice" && (
            <div>
              <ul className=" flex flex-col gap-2">
                {menuBarMart.map((list, index) => {
                  return (
                    <li
                      className="py-2 px-2 flex flex-row gap-2 items-center bg-white text-xs font-medium
                        text-left text-gray-700 cursor-pointer"
                        onClick={() => router.push(list.path)}
                      key={index}
                    >
                      <p>{list.title}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
