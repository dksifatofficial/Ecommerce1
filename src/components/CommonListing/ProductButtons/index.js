"use client";

import ShutterUpButton from "@/components/Buttons/ShutterUpButton";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const ProductButton = ({ item }) => {
  const pathName = usePathname();
  const {
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);
  const router = useRouter();

  const isAdminView = pathName.includes("admin-view");

  async function handleDeleteProduct(item) {
    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await deleteAProduct(item._id);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  // async function handleAddToCart(getItem) {
  //   setComponentLevelLoader({ loading: true, id: getItem._id });

  //   const res = await addToCart({ productID: getItem._id, userID: user._id });

  //   if (res.success) {
  //     toast.success(res.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     setComponentLevelLoader({ loading: false, id: "" });
  //     setShowCartModal(true);
  //   } else {
  //     toast.error(res.message, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     setComponentLevelLoader({ loading: false, id: "" });
  //     setShowCartModal(true);
  //   }

  //   console.log(res);
  // }

  return isAdminView ? (
    <>
      <ShutterUpButton
        className="mt-1.5 flex w-full justify-center px-5 py-1 text-xs font-medium
       uppercase tracking-wide text-white border-none before:bg-[#F85606] hover:text-white"
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-items");
        }}
      >
        Update
      </ShutterUpButton>
      <ShutterUpButton
        className="mt-1.5 flex w-full justify-center px-5 py-1 text-xs font-medium
       uppercase tracking-wide text-white before:bg-red-600 hover:text-white border-none"
        onClick={() => handleDeleteProduct(item)}
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Deleting Product"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "DELETE"
        )}
      </ShutterUpButton>
    </>
  ) : null
  // (
  //   <>
  //     <ShutterUpButton
  //       className="disabled:before:bg-[#3cca98] mt-1.5 flex w-full justify-center px-5 py-1 text-xs font-medium 
  //      uppercase tracking-wide text-white border-none before:bg-[#F85606] hover:text-white"
  //       onClick={() => handleAddToCart(item)}
  //       disabled={item.onSale === "no"}
  //     >
  //       {componentLevelLoader &&
  //       componentLevelLoader.loading &&
  //       componentLevelLoader.id === item._id ? (
  //         <ComponentLevelLoader
  //           text={"Adding to cart"}
  //           color={"#ffffff"}
  //           loading={componentLevelLoader && componentLevelLoader.loading}
  //         />
  //       ) : item.onSale === "no" ?
  //         "Sold Out" : "Add To Cart"
  //       }
  //     </ShutterUpButton>
  //   </>
  // );
};

export default ProductButton;