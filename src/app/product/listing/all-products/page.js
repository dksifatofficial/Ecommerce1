"use client";

import React, { useContext, useEffect, useState } from "react";
import CommonListing from "@/components/CommonListing";
import { GlobalContext } from "@/context";
import { productByCategory } from "@/services/product";

export default function AllProducts() {
  const { user } = useContext(GlobalContext);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const categories = ["men", "women", "kids", "all"];
      // if (user?.role === "admin" || user?.role === "premium") {
      //   categories.push("premium");
      // };

      const dataPromises = categories.map(async (category) => {
        const response = await productByCategory(category);
        return { category, data: response.data };
      });

      const fetchedData = await Promise.all(dataPromises);
      const dataObject = {};

      fetchedData.forEach((item) => {
        dataObject[item.category] = item.data;
      });

      setProductData(dataObject);
    }

    fetchData();
  }, [user]);

  return (
    <div>
      {Object.entries(productData).map(([category, data]) => (
        <CommonListing key={category} data={data} />
      ))}
    </div>
  );
}