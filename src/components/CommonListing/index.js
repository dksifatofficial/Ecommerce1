"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminViewMenu from "../AdminMenu/AdminViewMenu";
import Notification from "../Notification";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";

const CommonListing = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);

  return (
    <section className="bg-slate-100 mb-4 md:mb-0 py-0 md:py-4 lg:py-8 px-0 md:px-2">
      <AdminViewMenu />
      <div className="mx-auto px-0 md:px-6">
        <div className="mt-4 md:mt-10 gap-1 md:gap-4 flex flex-wrap justify-center">
          {data && data.length
            ? data
                .filter((item) => item.category !== "premium")
                .map((item) => (
                  <article
                    className="relative flex flex-col overflow-hidden bg-white
                    cursor-pointer w-[190px] hover:shadow-[0_4px_5px_0.5px_rgba(0,0,0,0.2)]"
                    key={item._id}
                  >
                    <ProductTile item={item} />
                    <ProductButton item={item} />
                  </article>
                ))
            : null}
        </div>
      </div>
      <Notification />
    </section>
  );
};

export default CommonListing;

//&& data.category !== "premium"
