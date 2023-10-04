"use client";

import { GlobalContext } from "@/context";
import Logo from "@/picture/logo.png";
import { getAllAdminProducts } from "@/services/product";
import { adminNavOptions } from "@/utils";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  IoIosAdd,
  IoIosArrowDown,
  IoIosBriefcase,
  IoIosCart,
  IoIosContact,
  IoIosDocument,
  IoIosHeart,
  IoIosLogOut,
  IoIosStar,
} from "react-icons/io";
import CartModal from "../CartModal";
import CommonModal from "../CommonModal";
import MenuBar from "../MenuBar";
import Search from "../SearchBar/Search";
import styles from "./styles.module.css";

function NavItems({ isModalView = false, isAdminView, router }) {
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
  return (
    <div
      className={`items-center justify-between w-full ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul className="flex flex-row font-medium rounded-lg">
        {isAdminView ? (
          adminNavOptions.map((item) => (
            <li
              className="rounded-lg text-sm text-[#3cca98] font-semibold px-3 py-1 m-0 
                  hover:text-[#f8f3f3da] cursor-pointer"
              key={item.id}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </li>
          ))
        ) : !isAdminView && user?.role === "primium" ? (
          <Fragment>
            <button
              className="p-0 m-0"
              onClick={() =>
                router.push("/premium-service/premium-item/listing/all-items")
              }
            >
              <p
                className="rounded-lg text-white text-sm font-semibold px-3 py-1 m-0 
                  hover:text-[#f8f3f3da]"
              >
                Premium
              </p>
            </button>
          </Fragment>
        ) : null}
      </ul>
    </div>
  );
}

const Navbar = () => {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const [allProducts, setAllProducts] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const handleScroll = () => {
    // Check the scroll position
    if (window.scrollY >= 500) {
      setShowCategories(true);
    } else {
      setShowCategories(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res) {
      setAllProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);

  const pathName = usePathname();
  const router = useRouter();

  console.log(currentUpdatedProduct);

  useEffect(() => {
    if (pathName !== "/admin-view/add-items" && currentUpdatedProduct !== null)
      setCurrentUpdatedProduct(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const isAdminView = pathName.includes("admin-view");

  // search

  const [results, setResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleChange = (e) => {
    const { value } = e.target;
    const { target } = e;
    if (!target.value.trim()) return setResults([]);

    const filteredValue = allProducts.filter((product) => {
      const productName = product.name.toLowerCase();
      const searchTerm = value.toLowerCase();
      const isMatch = productName.includes(searchTerm);
      console.log(
        `Product: ${productName}, Search Term: ${searchTerm}, Match: ${isMatch}`
      );
      return isMatch;
    });
    setResults(filteredValue);
  };

  return (
    <>
      <nav className="bg-transparent lg:bg-[#f85606] fixed w-full z-20 top-0 left-0">
        <div className="flex flex-wrap w-full items-center justify-center lg:justify-between mx-auto py-3 relative">
          <div className="flex flex-wrap items-center w-full lg:w-[50%]">
            {/* logo */}
            <div
              className="flex items-center cursor-pointer absolute left-1 lg:left-2"
              onClick={() => router.push("/")}
            >
              <Image
                className="lg:ml-[-2px] ml-0 w-[100px] h-auto hidden lg:block"
                src={Logo}
                // src={
                //   "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2FLogo%2FDecorWhims.png?alt=media&token=cbd68fea-1c6c-484e-a523-600bfe9d0c71"
                // }
                alt="decorwhims_logo"
                height="400"
                width="800"
              />
            </div>

            {/* Hidden Categories menu */}
            {showCategories ? (
              <div
                className={`absolute hidden left-[50px] lg:left-[100px] lg:flex items-center cursor-pointer flex-row mr-1 
            text-white hover:text-[#f8f3f3da] rounded-lg ${styles.dropdown}`}
              >
                <p className="text-sm font-semibold pl-3 pr-1 py-1 m-0 ">
                  Categories
                </p>
                <i className={`text-lg pr-2 ${styles.dropbtn}`}>
                  <IoIosArrowDown />
                </i>
                <div className={styles.dropdownContent}>
                  <MenuBar />
                </div>
              </div>
            ) : null}

            {/* Search Box */}
            <div className="w-full lg:w-[450px] lg:absolute block lg:left-[200px] xl:left-[220px]">
              <Search
                allProducts={allProducts}
                results={results}
                value={selectedProduct ? selectedProduct.name : ""}
                renderItem={(item) => (
                  <div className="flex flex-row align-middle">
                    <Image
                      className="h-8 w-8"
                      src={item.imageUrl[0]}
                      alt="img"
                      height="100"
                      width="100"
                    />
                    <p className="ml-2 text-xs flex self-center">{item.name}</p>
                  </div>
                )}
                onChange={(e, filteredResults) => {
                  setResults(filteredResults);
                  handleChange(e); // You may need to pass other arguments if necessary
                }}
                // onChange={handleChange}
                onSelect={(item) => setSelectedProduct(item)}
                router={router}
              />
            </div>
          </div>

          {/* Admin Product Control */}
          {/* Buttons */}
          <div className="flex flex-row items-center justify-center lg:w-[50%]">
            {user?.role === "admin" ? (
              isAdminView ? (
                <div
                  className={`flex items-center cursor-pointer relative flex-row mr-1 py-1 rounded-lg 
                ${styles.dropdown}`}
                >
                  <div className="flex flex-col ml-2 text-white">
                    <p className="text-sm font-semibold pl-0 lg:pl-3 pr-1 py-1 m-0">
                      Options
                    </p>
                  </div>
                  <i
                    className={`text-lg text-white
                   ${styles.dropbtn}`}
                  >
                    <IoIosArrowDown />
                  </i>
                  <div className={styles.dropdownContent}>
                    <div className="bg-[#f9f9f9] rounded-[10px] py-2 px-4 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)]">
                      <Link
                        className=" flex flex-row float-none text-xs text-[#35316d] font-semibold no-underline
                          text-left px-1 py-1 rounded-[10px] align-middle items-center hover:text-[#f3b064]"
                        href="/admin-view/all-items"
                      >
                        <i className="flex align-middle items-center pr-2 text-xl lg:text-2xl">
                          <IoIosDocument />
                        </i>
                        <p>Manage Products</p>
                      </Link>
                      <Link
                        className=" flex flex-row float-none text-xs text-[#35316d] font-semibold no-underline
                          text-left px-1 py-1 rounded-[10px] align-middle items-center hover:text-[#f3b064]"
                        href="/admin-view/add-items"
                      >
                        <i className="flex align-middle items-center pr-2 text-xl lg:text-2xl">
                          <IoIosAdd />
                        </i>
                        <p>Add Product</p>
                      </Link>
                      <Link
                        className=" flex flex-row float-none text-xs text-[#35316d] font-semibold no-underline
                          text-left px-1 py-1 rounded-[10px] align-middle items-center hover:text-[#f3b064]"
                        href="/premium-service/premium-item/listing/all-items"
                      >
                        <i className="flex align-middle items-center pr-2 text-xl lg:text-2xl">
                          <IoIosStar />
                        </i>
                        <p className="">Premium Products</p>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null
            ) : null}

            {user?.role === "admin" ? (
              !isAdminView ? (
                <Fragment>
                  <button
                    className="p-0 m-0 hidden lg:block"
                    onClick={() =>
                      router.push(
                        "/premium-service/premium-item/listing/all-items"
                      )
                    }
                  >
                    <p
                      className="rounded-lg text-sm text-white font-semibold px-0 lg:px-3 py-1 m-0 
                    hover:text-[#f8f3f3da]"
                    >
                      Premium
                    </p>
                  </button>
                </Fragment>
              ) : null
            ) : null}

            {!isAdminView && user?.role === "premium" ? (
              <Fragment>
                <button
                  className="p-0 m-0"
                  onClick={() =>
                    router.push(
                      "/premium-service/premium-item/listing/all-items"
                    )
                  }
                >
                  <p
                    className="rounded-lg text-white text-sm font-semibold px-3 py-1 m-0 
                    hover:text-[#f8f3f3da]"
                  >
                    Premium
                  </p>
                </button>
              </Fragment>
            ) : null}

            {/* Admin View or Client View */}
            <div className="hidden lg:block">
            {user?.role === "admin" ? (
              isAdminView ? (
                <button className="p-0 m-0" onClick={() => router.push("/")}>
                  <p className="rounded-lg text-sm font-semibold px-3 py-1 m-0 text-white hover:text-[#f8f3f3da]">
                    Admin
                  </p>
                </button>
              ) : (
                <button
                  className="p-0 m-0"
                  onClick={() => router.push("/admin-view")}
                >
                  <p className="rounded-lg text-sm font-semibold px-3 py-1 m-0 text-white hover:text-[#f8f3f3da]">
                    Customer
                  </p>
                </button>
              )
            ) : null}
            </div>

            {/* Login  or Account */}
            {isAuthUser ? (
              <div
                className={`lg:flex items-center cursor-pointer relative flex-row mr-1 xl:mr-4 hover:bg-[#3d3c3c1e]
                px-4 py-1 rounded-lg hidden ${styles.dropdown}`}
              >
                <i
                  className={`text-2xl text-white rounded-[100%] ring-2 hover:ring-2 ring-white
                   ${styles.dropbtn}`}
                >
                  <IoIosContact />
                </i>
                <div className="flex flex-col ml-2 text-white">
                  <p className="text-xs">Hello, {user?.name}</p>
                  <p className="text-xs">Orders & Account</p>
                </div>
                <div className={styles.dropdownContent}>
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
                </div>
              </div>
            ) : (
              <button className="p-0 m-0" onClick={() => router.push("/login")}>
                <p className="rounded-lg text-sm font-semibold px-3 py-1 m-0 text-white hover:text-[#f8f3f3da]">
                  Login
                </p>
              </button>
            )}

            {/* Cart */}
            {!isAdminView && isAuthUser ? (
              <div
                className="lg:flex items-center hidden cursor-pointer"
                onClick={() => setShowCartModal(true)}
              >
                <i
                  className="text-2xl text-white hover:bg-[#3d3c3c1e]
                px-4 py-2 rounded-lg mr-4 xl:mr-8"
                >
                  <IoIosCart />
                </i>
              </div>
            ) : null}

            {/* Logout  or Sign Up */}
            {!isAuthUser ? (
              <button
                className="p-0 m-0"
                onClick={() => router.push("/register")}
              >
                <p className="rounded-lg text-sm font-semibold px-3 py-1 m-0 text-white hover:text-[#f8f3f3da]">
                  Sign Up
                </p>
              </button>
            ) : null}

            {/* Menu for small device */}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden 
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
              dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems router={router} isAdminView={isAdminView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        show={showNavModal}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
};

export default Navbar;
