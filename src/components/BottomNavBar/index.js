import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { AiFillAppstore } from "react-icons/ai";
import { GiCardExchange } from "react-icons/gi";
import {
  IoIosBriefcase,
  IoIosContact,
  IoIosHeart,
  IoIosHome,
  IoIosLogOut,
  IoIosStar,
  IoMdCart,
  IoMdPerson,
} from "react-icons/io";
import { MdWorkspacePremium } from "react-icons/md";
import { BiLogIn } from "react-icons/bi"
import { FaFileSignature } from "react-icons/fa"
import styles from "./styles.module.css";

const BottomNavBar = () => {
  const { user, setUser, isAuthUser, setIsAuthUser } =
    useContext(GlobalContext);
  const pathName = usePathname();
  const isAdminView = pathName.includes("admin-view");
  const router = useRouter();

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  return (
    <>
      <nav className="bg-white fixed w-full z-20 bottom-0 left-0 block lg:hidden">
        <div className="flex flex-wrap w-full items-center justify-between mx-auto">
          <div className="flex flex-row justify-around py-2 px-4 w-full items-center border">
            <Link
              className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]"
              href="/"
            >
              <i className="text-2xl">
                <IoIosHome className="" />
              </i>
              <p className=" text-xs text-center">Home</p>
            </Link>

            <Link
              className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]"
              href="/categories"
            >
              <i className="text-2xl">
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
                  <i className="text-2xl">
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
                <i className="text-2xl">
                  <MdWorkspacePremium className="" />
                </i>
                <p className=" text-xs">Premium</p>
              </Link>
            ) : null}

            <Link
              className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]"
              href="/cart"
            >
              <i className="text-2xl">
                <IoMdCart className="" />
              </i>
              <p className=" text-xs">Cart</p>
            </Link>

            <div
              className={`${styles.dropdown} relative flex flex-col items-center w-[55px] justify-center
                 cursor-pointer text-[#f85606]`}
            >
              <i className={`${styles.dropbtn} text-2xl`}>
                <IoMdPerson className="" />
              </i>
              <p className=" text-xs text-center">Account</p>
              <div className={styles.dropdownContent}>
                {isAuthUser ? (
                  <div className="bg-[#f9f9f9] w-[200px] rounded-[10px] py-2 px-4 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)]">
                    <button
                      className=" flex flex-row float-none text-xs text-[#35316d] font-semibold no-underline
                          text-left px-1 py-1 rounded-[10px] align-middle items-center hover:text-[#f3b064]"
                      onClick={() => router.push("/account")}
                    >
                      <i className="flex align-middle items-center pr-2 text-2xl">
                        <IoIosContact />
                      </i>
                      <p>Manage My Account</p>
                    </button>
                    <button
                      className=" flex flex-row float-none text-xs text-[#35316d] font-semibold no-underline
                          text-left px-1 py-1 rounded-[10px] align-middle items-center hover:text-[#f3b064]"
                      onClick={() => router.push("/orders")}
                    >
                      <i className="flex align-middle items-center pr-2 text-2xl">
                        <IoIosBriefcase />
                      </i>
                      <p>My Orders</p>
                    </button>
                    <Link
                      className=" flex flex-row float-none text-xs text-[#35316d] font-semibold no-underline
                          text-left px-1 py-1 rounded-[10px] align-middle items-center hover:text-[#f3b064]"
                      href="/"
                    >
                      <i className="flex align-middle items-center pr-2 text-2xl">
                        <IoIosHeart />
                      </i>
                      <p className="">My Wishlist</p>
                    </Link>
                    <Link
                      className=" flex flex-row float-none text-xs text-[#35316d] font-semibold no-underline
                          text-left px-1 py-1 rounded-[10px] align-middle items-center hover:text-[#f3b064]"
                      href="/"
                    >
                      <i className="flex align-middle items-center pr-2 text-2xl">
                        <IoIosStar />
                      </i>
                      <p>My Reviews</p>
                    </Link>
                    <Link
                      className=" flex flex-row float-none text-xs text-[#35316d] font-semibold no-underline
                          text-left px-1 py-1 rounded-[10px] align-middle items-center hover:text-[#f3b064]"
                      onClick={handleLogout}
                      href="/"
                    >
                      <i className="flex align-middle items-center pr-2 text-2xl">
                        <IoIosLogOut />
                      </i>
                      <p>Logout</p>
                    </Link>
                  </div>
                ) : (
                  <div className="bg-[#f9f9f9] w-[200px] rounded-[10px] py-4 px-4 flex flex-col gap-4
                  shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)]">
                    <button
                      className=" flex flex-row float-none text-xs text-[#35316d] font-semibold no-underline
                      text-left px-1 py-1 rounded-[10px] align-middle items-center hover:text-[#f3b064]"
                      onClick={() => router.push("/login")}
                    >
                      <i className="flex align-middle items-center pr-3 text-2xl">
                        <BiLogIn />
                      </i>
                      <p>
                        Login
                      </p>
                    </button>
                    <button
                      className=" flex flex-row float-none text-xs text-[#35316d] font-semibold no-underline
                      text-left px-1 py-1 rounded-[10px] align-middle items-center hover:text-[#f3b064]"
                      onClick={() => router.push("/register")}
                    >
                      <i className="flex align-middle items-center pl-2 pr-2 text-xl">
                        <FaFileSignature />
                      </i>
                      <p>
                        Sign Up
                      </p>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {user?.role === "admin" ? (
              isAdminView ? (
                <Link
                  className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]"
                  href="/"
                >
                  <i className="text-2xl">
                    <GiCardExchange className="" />
                  </i>
                  <p className="text-xs text-center">Customer</p>
                </Link>
              ) : (
                <Link
                  className="flex flex-col items-center w-[55px] justify-center cursor-pointer text-[#f85606]"
                  href="/admin-view"
                >
                  <i className="text-2xl">
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
