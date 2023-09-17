"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useContext, useEffect } from "react";
import CartModal from "../CartModal";
import CommonModal from "../CommonModal";
import ShutterUpButton from "../Buttons/ShutterUpButton";
import Image from "next/image";

function NavItems({ isModalView = false, isAdminView, router }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg 
         md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white
         ${isModalView ? "border-none" : "border border-gray-100"}
         `}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-[#3cca98] rounded md:p-0
                 hover:text-[#268d69]"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-[#3cca98] rounded md:p-0
                 hover:text-[#268d69]"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

const Navbar = () => {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
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
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    )
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

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
                className=" ml-[-2px] w-[180px] h-auto"
                src={"https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2FLogo%2FDecorWhims.png?alt=media&token=cbd68fea-1c6c-484e-a523-600bfe9d0c71"}
                alt="decorwhims_logo"
                height="400"
                width="800"
              />
            {/* <span className="slef-center text-[#e70146] text-2xl font-bold whitespace-nowrap">
              Raiment Gallery
            </span> */}
          </div>
          <div className="flex md:order-2 gap-2">
            
            {user?.role === "admin" ? (
              <Fragment>
              <ShutterUpButton
                className="mt-1.5 inline-block px-5 py-1 before:bg-white upprcase tracking-wide 
                hover:text-red-700 bg-red-600 border-red-600"
                onClick={() => router.push("/premium-service/product/listing/all-products")}
              >
                <p>Premium Service</p>
              </ShutterUpButton>
            </Fragment>
            ) : null}

          {!isAdminView && user?.role === "primium" ? (
              <Fragment>
                <ShutterUpButton
                  className="mt-1.5 inline-block px-5 py-1 before:bg-white upprcase tracking-wide 
                  hover:text-red-700 bg-red-600 border-red-600"
                  onClick={() => router.push("/premium-service/product/listing/all-products")}
                >
                  <p>Premium Service</p>
                </ShutterUpButton>
              </Fragment>
            ) : null}

            {!isAdminView && isAuthUser ? (
              <Fragment>
                <ShutterUpButton
                  className="mt-1.5 inline-block px-5 py-1 before:bg-white upprcase tracking-wide text-[#3cca98]"
                  onClick={() => router.push("/account")}
                >
                  <p>Account</p>
                </ShutterUpButton>
                <ShutterUpButton
                  className="mt-1.5 inline-block px-5 py-1 before:bg-white upprcase tracking-wide text-white"
                  onClick={() => setShowCartModal(true)}
                >
                  <p>Cart</p>
                </ShutterUpButton>
              </Fragment>
            ) : null}

            {user?.role === "admin" ? (
              isAdminView ? (
                <ShutterUpButton
                  className="mt-1.5 inline-block px-5 py-1 before:bg-white upprcase tracking-wide text-white"
                  onClick={() => router.push("/")}
                >
                  <p>Client View</p>
                </ShutterUpButton>
              ) : (
                <ShutterUpButton
                  className="mt-1.5 inline-block px-5 py-1 before:bg-white upprcase tracking-wide text-white"
                  onClick={() => router.push("/admin-view")}
                >
                  <p>Admin View</p>
                </ShutterUpButton>
              )
            ) : null}
            
            {isAuthUser ? (
              <ShutterUpButton
                className="mt-1.5 inline-block bg-black px-5 py-1 before:bg-white
                 upprcase tracking-wide text-white border-black hover:text-black"
                onClick={handleLogout}
              >
                <p>Logout</p>
              </ShutterUpButton>
            ) : (
              <ShutterUpButton
                className="mt-1.5 inline-block bg-black px-5 py-1 before:bg-white
                 upprcase tracking-wide text-white border-black hover:text-black"
                onClick={() => router.push("/login")}
              >
                <p>Login</p>
              </ShutterUpButton>
            )}
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
