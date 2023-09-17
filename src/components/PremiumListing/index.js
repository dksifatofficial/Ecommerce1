"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Notification from "../Notification";
import PremiumProductTile from "./PremiumProductTile";
import PremiumProductButton from "./PremiumProductButtons";

const PremiumListing = ({ data }) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="bg-slate-100 py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {data && data.length
            ? data.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden bg-white
                   cursor-pointer hover:shadow-[0_4px_5px_0.5px_rgba(0,0,0,0.2)]"
                  key={item._id}
                >
                  <PremiumProductTile item={item} />
                  <PremiumProductButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
      <Notification />
    </section>
  );
};

export default PremiumListing;
