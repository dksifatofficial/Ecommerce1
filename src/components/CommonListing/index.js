"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Notification from "../Notification";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";

const CommonListing = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data)

  return (
    <section className="bg-slate-100 py-12 sm:py-16">
      <div className="mx-auto px-4 sm:px-6">
        <div className="mt-10 gap-4 flex flex-wrap justify-center">
          {data && data.length
            ? data.filter((item) => item.category !== "premium")
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
