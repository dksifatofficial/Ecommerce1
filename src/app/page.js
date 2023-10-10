"use client";

import BestExperience from "@/components/BestExperience";
import Category1 from "@/components/Category/Category1";
import CategoryFull from "@/components/Category/CategoryFull";
import ProductTile from "@/components/CommonListing/ProductTile";
import ImageSlider from "@/components/CoverImageSlider";
import MenuBar from "@/components/MenuBar";
import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const images = [
  {
    src: "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Faa%20(9).jpg-1696059825340-6lnrnqocmk?alt=media&token=2e537a0e-6d8b-4756-a403-117a967f9fe5",
    alt: "Image 1",
    header: "Image 1 Header",
    description: "Description for Image 1",
    link: "/product/listing/jersey",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Faa%20(8).jpg-1696059828992-lnfvqa6iyc?alt=media&token=b55cc7c5-82b3-4c61-b964-bfc941adf0a7",
    alt: "Image 2",
    header: "Image 2 Header",
    description: "Description for Image 2",
    link: "/product/listing/jersey",
  },

  {
    src: "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Faa%20(7).jpg-1696059831780-fqtwo15hof?alt=media&token=e9c04410-774e-4481-b99e-c0f6a4676dc0",
    alt: "Image 3",
    header: "Image 3 Header",
    description: "Description for Image 3",
    link: "/product/listing/jersey",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Faa%20(6).jpg-1696059834409-6zxrly2yjp?alt=media&token=01663c2c-6044-43e8-9474-664993b7e588",
    alt: "Image 4",
    header: "Image 4 Header",
    description: "Description for Image 4",
    link: "/product/listing/jersey",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Faa%20(5).jpg-1696059837364-6ij1vjo60f?alt=media&token=3111d16e-dfdd-4c3b-a4cf-026782a837ba",
    alt: "Image 5",
    header: "Image 5 Header",
    description: "Description for Image 5",
    link: "/product/listing/jersey",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Faa%20(4).jpg-1696059839872-neslzdjqhn?alt=media&token=fdf72bee-f2d2-46f5-8af9-322dd8638cbd",
    alt: "Image 6",
    header: "Image 2 Header",
    description: "Description for Image 2",
    link: "/product/listing/jersey",
  },

  {
    src: "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Faa%20(3).jpg-1696059842160-m8hsxwxtdf?alt=media&token=5e2bf78f-25fd-4ece-87fe-3738dca5d7e4",
    alt: "Image 7",
    header: "Image 3 Header",
    description: "Description for Image 3",
    link: "/product/listing/jersey",
  },
];

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [productsToLoad, setProductsToLoad] = useState(12);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadMore = () => {
    setProductsToLoad((prev) => prev + 4);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        handleLoadMore();
      }
    });

    // You need to reference the element at the bottom of your product list.
    // You can use a ref for this purpose.
    const loadMoreElement = document.getElementById("loadMoreElement");

    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }

    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement);
      }
    };
  }, []);

  async function getListOfProducts() {
    setIsLoading(true);
    const res = await getAllAdminProducts();

    if (res) {
      setProducts(res.data);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);

  // try {
  //   const parsedData = JSON.parse(response);
  //   // Handle parsed data here
  // } catch (error) {
  //   console.error("JSON parsing error:", error);
  //   // Handle the error, e.g., by displaying an error message to the user
  // }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-slate-100">
      {/* Header Section */}
      <div
        className="w-full relative flex flex-col justify-center lg:flex-row gap-2 
           mt-4 lg:gap-4 lg:mt-4 xl:gap-6 xl:mt-6 px-4"
      >
        <div className="hidden lg:block">
          <MenuBar />
        </div>

        <div className="flex justify-center">
          <ImageSlider images={images} />
        </div>
      </div>

      {/* Best Experience Section */}
      <div className="hidden lg:block w-full pl-4 pr-4 lg:pl-16 lg:pr-16">
        <BestExperience />
      </div>

      {/* Main Section */}
      <section
        className="flex min-h-screen mt-6 lg:mt-0 flex-col items-center justify-between 
        px-0 md:px-4 lg:px-16"
      >
        {/* Category1 Section */}
        <div className="w-full bg-transparent lg:bg-white rounded-lg">
          <Category1 />
        </div>

        {/* Collection Section */}
        <div className="hidden lg:block xl:max-w-screen-xl w-full mx-auto mt-6">
          <div className=" bg-slate-200 overflow-hidden rounded-lg grid grid-cols-1 gap-2 xl:grid-cols-3 lg:items-stretch">
            <div className="relative grid w-full py-4 xl:place-content-center">
              <div className="absolute hidden xl:block h-full overflow-hidden">
                <Image
                  className="h-full object-cover opacity-50"
                  src="https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Fwinter.png-1696167224788-077hha4q12?alt=media&token=e8058295-79e5-4dc0-a263-91cbae9a9f97"
                  alt="Winter"
                  height="1200"
                  width="600"
                />
              </div>
              <div className="xl:max-w-md w-full pl-6 mx-auto text-center z-10 lg:text-left">
                <div>
                  <motion.h2
                    className="text-5xl font-bold text-transparent bg-clip-text inline-block
                    bg-[linear-gradient(to_bottom_right,#0d9488,#f85606)]"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Winter Sale Collection
                  </motion.h2>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 px-2 pb-4">
              <ul className="flex flex-wrap justify-center gap-4 xl:gap-2 xl:grid xl:grid-cols-4">
                {products && products.length
                  ? products
                      .filter((item) => item.category === "all")
                      .splice(0, 8)
                      .map((item) => (
                        <li
                          className="relative flex flex-col overflow-hidden bg-white
                        cursor-pointer w-[190px] hover:shadow-[0_4px_5px_0.5px_rgba(0,0,0,0.2)]"
                          key={item._id}
                        >
                          <ProductTile item={item} />
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          </div>
        </div>

        {/* CategoryFull Section */}
        <div className="hidden lg:block mt-12 w-full">
          <CategoryFull />
        </div>

        {/* Just For You Section */}
        <div className="mt-6 w-full">
          <div className="w-full flex justify-center">
            <h2
              className="px-3 font-semibold lg:bg-white rounded-lg text-transparent bg-clip-text inline-block
           text-center py-2 md:py-6 text-lg md:text-3xl bg-[linear-gradient(to_right,#0d9488,#f85606)]"
            >
              Just For You
            </h2>
          </div>
          <div className="lg:col-span-2 mt-4 w-full">
            <ul className="flex flex-wrap gap-1 md:gap-2 lg:gap-4 justify-center">
              {products && products.length
                ? products
                    .filter((item) => item.category !== "premium")
                    .reverse()
                    .slice(0, productsToLoad)
                    .map((item) => (
                      <li
                        className="relative flex flex-col overflow-hidden bg-white rounded-lg
                        cursor-pointer w-[190px] hover:shadow-[0_4px_5px_0.5px_rgba(0,0,0,0.2)]"
                        key={item._id}
                      >
                        <ProductTile item={item} />
                      </li>
                    ))
                : null}
            </ul>
            <div id="loadMoreElement"></div>
            {isLoading && (
              <p className="w-full text-center text-xs md:text-sm lg:text-lg font-bold text-gray-400">
                Loading...
              </p>
            )}
            {/* {isLoading && <p>Loading...</p>} */}

            {/* <InfiniteScroll
                className="flex flex-wrap gap-1 md:gap-2 lg:gap-4 justify-center"
                dataLength={products.length}
                next={() => setPage(page)}
                hasMore={true} // Set to false when you have loaded all products
                // loader={<h4>Loading...</h4>}
              >
                {products && products.length
                  ? products
                      .filter((item) => item.category !== "premium")
                      .reverse()
                      // .splice(0, 24)
                      .map((item) => (
                        <div
                          className="relative flex flex-col overflow-hidden bg-white rounded-lg
                        cursor-pointer w-[190px] hover:shadow-[0_4px_5px_0.5px_rgba(0,0,0,0.2)]"
                          key={item._id}
                        >
                          <ProductTile item={item} />
                        </div>
                      ))
                  : null}
              </InfiniteScroll> */}
          </div>
          <div className="w-full relative flex justify-center my-3 lg-my8-">
            <Link href="/product/listing/all-products">
              <p className="text-xs md:text-sm lg:text-lg font-bold text-gray-600 hover:text-gray-400">
                See More...
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
