import { GlobalContext } from "@/context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { GiCardExchange } from "react-icons/gi";
import { IoIosHome, IoMdCart, IoMdPerson } from "react-icons/io";
import { MdWorkspacePremium } from "react-icons/md";

const BottomNavBar = () => {
  const { user } = useContext(GlobalContext);
  const pathName = usePathname();
  const isAdminView = pathName.includes("admin-view");

  return (
    <>
      <nav className="bg-white fixed w-full z-20 bottom-0 left-0 block lg:hidden">
        <div className="flex flex-wrap w-full items-center justify-between mx-auto">
          <div className="flex flex-row justify-around py-2 px-12 w-full items-center border">
            <Link
              className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]"
              href="/"
            >
              <i className="text-4xl">
                <IoIosHome className="" />
              </i>
              <p className=" text-xs text-center">Home</p>
            </Link>
            <Link
              className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]"
              href="/categories"
            >
              <i className="text-4xl">
                <AiFillAppstore className="" />
              </i>
              <p className=" text-xs text-center">Categories</p>
            </Link>

            {user?.role === "admin" ? (
              !isAdminView ? (
                <Link
                  className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]"
                  href="/premium-service/premium-item/listing/all-items"
                >
                  <i className="text-4xl">
                    <MdWorkspacePremium className="" />
                  </i>
                  <p className=" text-xs">Premium</p>
                </Link>
              ) : null
            ) : null}

            {user?.role === "premium" ? (
              <Link
                className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]"
                href="/premium-service/premium-item/listing/all-items"
              >
                <i className="text-4xl">
                  <MdWorkspacePremium className="" />
                </i>
                <p className=" text-xs">Premium</p>
              </Link>
            ) : null}

            <Link
              className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]"
              href="/cart"
            >
              <i className="text-4xl">
                <IoMdCart className="" />
              </i>
              <p className=" text-xs">Cart</p>
            </Link>
            <div className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]">
              <i className="text-4xl">
                <IoMdPerson className="" />
              </i>
              <p className=" text-xs text-center">Account</p>
            </div>

            {user?.role === "admin" ? (
              isAdminView ? (
                <Link
                  className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]"
                  href="/"
                >
                  <i className="text-4xl">
                    <GiCardExchange className="" />
                  </i>
                  <p className="text-xs text-center">Customer</p>
                </Link>
              ) : (
                <Link
                  className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]"
                  href="/admin-view"
                >
                  <i className="text-4xl">
                    <GiCardExchange className="" />
                  </i>
                  <p className=" text-xs text-center">Admin</p>
                </Link>
              )
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNavBar;
