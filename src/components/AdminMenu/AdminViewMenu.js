import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AdminViewMenu = () => {
  const [activeButton, setActiveButton] = useState();
  const pathName = usePathname();

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div>
      <div
        className="w-full flex flex-wrap items-center justify-center gap-2 lg:gap-4 mx-auto py-1 md:py-3
            mt-2 md:mt-4 lg:mt-6 bg-gray-300"
      >
        <Link href="/admin-view" onClick={() => handleButtonClick("Orders")}>
          <p
            className={`rounded-lg text-xs md:text-sm bg-transparent font-semibold px-0 md:px-3 py-0 md:py-1 m-0 hover:text-[#f8f3f3da]
              ${pathName === "/admin-view" ? "text-gray-700" : "text-white"}`}
          >
            Orders
          </p>
        </Link>
        <p className="text-xs md:text-sm text-white">|</p>
        <Link
          href="/admin-view/all-items"
          onClick={() => handleButtonClick("ManageProducts")}
        >
          <p
            className={`rounded-lg text-xs md:text-sm font-semibold px-0 md:px-3 py-0 md:py-1 m-0 hover:text-[#f8f3f3da]
              ${
                pathName === "/admin-view/all-items"
                  ? "text-gray-700"
                  : "text-white"
              }`}
          >
            Manage Product
          </p>
        </Link>
        <p className="text-xs md:text-sm text-white">|</p>
        <Link
          href="/admin-view/add-items"
          onClick={() => handleButtonClick("AddProduct")}
        >
          <p
            className={`rounded-lg text-xs md:text-sm font-semibold px-0 md:px-3 py-0 md:py-1 m-0 hover:text-[#f8f3f3da]
              ${
                pathName === "/admin-view/add-items"
                  ? "text-gray-700"
                  : "text-white"
              }`}
          >
            Add Product
          </p>
        </Link>
        <p className="text-xs md:text-sm text-white">|</p>
        <Link
          href="/premium-service/premium-item/listing/all-items"
          onClick={() => handleButtonClick("PremiumProducts")}
        >
          <p
            className={`rounded-lg text-xs md:text-sm font-semibold px-0 md:px-3 py-0 md:py-1 m-0 hover:text-[#f8f3f3da]
              ${
                pathName === "/premium-service/premium-item/listing/all-items"
                  ? "text-gray-700"
                  : "text-white"
              }`}
          >
            Premium
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminViewMenu;
