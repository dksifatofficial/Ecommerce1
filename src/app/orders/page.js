"use client";

import Button3 from "@/components/Buttons/Button3";
import ShutterUpButton from "@/components/Buttons/ShutterUpButton";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { getAllOrdersForUser } from "@/services/order";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Orders() {
  const {
    user,
    pageLevelLoader,
    setPageLevelLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllOrders() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForUser(user?._id);

    if (res.success) {
      setPageLevelLoader(false);

      setAllOrdersForUser(res.data);
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setPageLevelLoader(false);
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log(allOrdersForUser);

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section>
      <div className="mx-auto p-4 md:p-6 lg:p-8">
          <div className="flow-root">
            {allOrdersForUser && allOrdersForUser.length ? (
              <ul className="flex flex-col gap-4">
                {allOrdersForUser.map((item) => (
                  <li
                    key={item._id}
                    className="bg-gray-200 shadow p-4 md:p-6 lg:p-6 flex flex-col text-left"
                  >
                    <div className="flex flex-col md:flex-row mb-3">
                      <h4 className="font-bold text-sm md:text-base lg:text-lg flex-1 text-gray-500">
                        #order: {item._id}
                      </h4>
                      <div className="flex items-center">
                        <p className="mr-3 text-sm font-medium text-gray-500">
                          Total paid amount
                        </p>
                        <p className="mr-3 text-sm  font-semibold text-gray-500">
                          ${item.totalPrice}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                      {item.orderItems.map((orderItem, index) => (
                        <div key={index} className="shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt="Order Item"
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                            src={
                              orderItem &&
                              orderItem.product &&
                              orderItem.product.imageUrl[0]
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-1 md:gap-3 lg:gap-5">
                      <Button3
                        onClick={() => router.push(`/orders/${item._id}`)}
                        className="inline-block text-white px-1 md:px-3 lg:px-5 py-1 text-xs font-medium
                        uppercase tracking-wide"
                      >
                        View Order Details
                      </Button3>
                      <button
                        className="disabled:text-green-700 disabled:font-bold inline-block text-red-700
                        py-1 font-medium text-[10px] md:text-sm lg:text-base uppercase tracking-wide"
                        disabled={!item.isProcessing}
                      >
                        {item.isProcessing
                          ? "Order is Processing"
                          : "Order is delivered"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
      </div>
      <Notification />
    </section>
  );
}
