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
    alt: "Image 2",
    header: "Image 2 Header",
    description: "Description for Image 2",
    link: "/product/listing/jersey",
  },

  {
    src: "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Faa%20(3).jpg-1696059842160-m8hsxwxtdf?alt=media&token=5e2bf78f-25fd-4ece-87fe-3738dca5d7e4",
    alt: "Image 3",
    header: "Image 3 Header",
    description: "Description for Image 3",
    link: "/product/listing/jersey",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Faa%20(2).jpg-1696059844777-pmyb8z9s0h?alt=media&token=bc7982e2-54bf-4b2a-86cc-7d9898914e69",
    alt: "Image 4",
    header: "Image 4 Header",
    description: "Description for Image 4",
    link: "/product/listing/jersey",
  },
  {
    src: "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Faa%20(1).jpg-1696059847267-qn3egey83r?alt=media&token=4baf19b3-b54b-4e66-8f33-cb6ce87289d8",
    alt: "Image 5",
    header: "Image 5 Header",
    description: "Description for Image 5",
    link: "/product/listing/jersey",
  },
];

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-slate-100">
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

      <div className="hidden lg:block">
        <BestExperience />
      </div>

      <section className="flex min-h-screen flex-col items-center justify-between px-4">
        {/* Category1 Section */}
        <div className="w-full bg-white rounded-lg">
          <Category1 />
        </div>

        {/* Collection Section */}
        <div className="xl:max-w-screen-xl w-full mx-auto mt-6">
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
                    className="text-5xl pb-4 font-bold text-transparent bg-clip-text inline-block
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

            <div className="lg:col-span-2 px-2 py-4">
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
        <div className="mt-4">
          <CategoryFull />
        </div>
        
        {/* category by person Section */}

        {/* <div className="max-w-screen-xl py-8 mx-auto sm:px-6 sm:py-12 ">
          <div className="text-center">
            <h2 className="text-xl uppercase font-bold text-gray-600">
              category by person
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block group"> */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
                  src="https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full aspect-square"
                  alt=""
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">KIDS</h3>
                  <ShutterUpButton
                    onClick={() => router.push("/product/listing/kids")}
                    className="px-5 py-3 mt-1.5 text-xs inline-block font-medium uppercase tracking-wide text-white before:bg-white"
                  >
                    Shop Now
                  </ShutterUpButton>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group"> */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
                  src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full aspect-square"
                  alt=""
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">WOMEN</h3>
                  <ShutterUpButton
                    onClick={() => router.push("/product/listing/women")}
                    className="mt-1.5 inline-block px-5 py-3 text-xs font-medium uppercase tracking-wide text-white before:bg-white"
                  >
                    Shop Now
                  </ShutterUpButton>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block group"> */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
                  src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                  className="object-cover w-full aspect-square"
                  alt=""
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">MEN</h3>
                  <ShutterUpButton
                    onClick={() => router.push("/product/listing/men")}
                    className="mt-1.5 inline-block px-5 py-3 text-xs font-medium uppercase tracking-wide text-white before:bg-white"
                  >
                    Shop Now
                  </ShutterUpButton>
                </div>
              </div>
            </li>
          </ul>
        </div> */}

        {/* Just For You Section */}

        <div className="mt-6">
          <h2 className="px-3 w-full font-semibold text-gray-600 bg-white rounded-lg text-center py-6 text-3xl">
            Just For You
          </h2>
          <div className="lg:col-span-2 mt-4">
            <ul className="grid grid-cols-6 gap-4">
              {products && products.length
                ? products
                    .filter((item) => item.category !== "premium")
                    .reverse()
                    .splice(0, 24)
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
          <div className="w-full relative flex justify-center my-8">
            <Link href="/product/listing/all-products">
              <p className="text-lg font-bold text-gray-600 hover:text-gray-400">
                See More...
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
