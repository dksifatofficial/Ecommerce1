"use client";

import ShutterUpButton from "@/components/Buttons/ShutterUpButton";
import Category1 from "@/components/Category/Category1";
import CategoryFull from "@/components/Category/CategoryFull";
import Footer from "@/components/Footer/Footer";
import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

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
      <div className="h-[750px] w-full relative grid justify-center">
        <Image
          className="absolute w-[100%] top-[-100px] hidden md:block"
          src={
            "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Fcover%2Fcover2.jpg?alt=media&token=99c2ec90-908e-4381-91f0-842ee0d7893c"
          }
          alt="cover"
          height="800"
          width="1600"
        />

        <div className=" absolute top-20 right-12 w-[600px]">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1
              className="max-w-2xl mb-8 text-[#e70146b2] text-4xl font-extrabold tracking-wide
            md:text-5xl xl:text-6xl text-center"
            >
              Best Fashion Collection
            </h1>
            <p className="max-w-2xl text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <div className="w-full relative flex justify-center">
              <ShutterUpButton
                className=" before:bg-[#90cbdc] hover:text-white py-1 px-5 rounded-lg"
                onClick={() => router.push("/product/listing/all-products")}
              >
                <p className="text-xl font-bold">Explore Shop Collection</p>
              </ShutterUpButton>
            </div>
          </div>
        </div>
      </div>

      <section className="flex min-h-screen flex-col items-center justify-between px-24">
        {/* Category1 Section */}
        <Category1 />

        {/* Summer Sale Collection Section */}
        <div className="max-w-screen-xl  py-8 mx-auto sm:py-12 ">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid p-6 bg-[#3cca9828] place-content-center sm:p-8">
              <div className="max-w-md mx-auto text-center lg:text-left">
                <div>
                  <h2 className="text-4xl pb-4 font-bold text-blue-900">
                    Summer Sale Collection
                  </h2>
                </div>
                <ShutterUpButton
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-1.5 inline-block px-5 py-3 text-xs font-medium uppercase tracking-wide text-white before:bg-white"
                >
                  Shop ALL
                </ShutterUpButton>
              </div>
            </div>
            <div className="lg:col-span-2">
              <ul className="grid grid-cols-3 gap-4">
                {products && products.length
                  ? products
                      .filter((item) => item.onSale === "yes")
                      .splice(0, 6)
                      .map((productItem) => (
                        <li
                          onClick={() =>
                            router.push(`/product/${productItem._id}`)
                          }
                          className="cursor-pointer bg-white"
                          key={productItem._id}
                        >
                          <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={productItem.imageUrl}
                              alt="Sale Product Item"
                              className="object-cover w-full  aspect-square"
                            />
                          </div>
                          <div className="mt-3 p-2">
                            <h3 className="font-medium text-gray-900 line-clamp-1">
                              {productItem.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-800">
                              ${productItem.price}{" "}
                              <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
                            </p>
                          </div>
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          </div>
        </div>

        {/* CategoryFull Section */}
        <CategoryFull />

        {/* category by person Section */}

        <div className="max-w-screen-xl py-8 mx-auto sm:px-6 sm:py-12 ">
          <div className="text-center">
            <h2 className="text-xl uppercase font-bold text-gray-600">
              category by person
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
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
              <div className="relative block group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
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
              <div className="relative block group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
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
        </div>

        {/* Just For You Section */}

        <div>
          <h2 className="px-3 w-full font-semibold text-gray-600 text-center py-6 text-3xl">
            Just For You
          </h2>
          <div className="lg:col-span-2">
            <ul className="grid grid-cols-6 gap-4">
              {products && products.length
                ? products
                    .filter((item) => item.onSale === "yes")
                    .splice(0, 18)
                    .map((productItem) => (
                      <li
                        onClick={() =>
                          router.push(`/product/${productItem._id}`)
                        }
                        className="cursor-pointer bg-white hover:shadow-[0_5px_6px_0.2px_rgba(0,0,0,0.1)]"
                        key={productItem._id}
                      >
                        <div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={productItem.imageUrl}
                            alt="Sale Product Item"
                            className="object-cover w-full aspect-square"
                          />
                        </div>
                        <div className="mt-2 p-2">
                          <h3 className="font-medium text-sm text-gray-900 line-clamp-1">
                            {productItem.name}
                          </h3>
                          {productItem.onSale === "yes" ? (
                            <p className="text-base mt-2 font-semibold text-[#F85606]">{`$ ${(
                              productItem.price -
                              productItem.price * (productItem.priceDrop / 100)
                            ).toFixed(2)}`}</p>
                          ) : (
                            <p className="text-base mt-2 font-semibold text-[#F85606]">
                              {`$ ${productItem.price}`}
                            </p>
                          )}
                          <p className="mt-1 text-xs text-gray-800">
                           {`(-${productItem.priceDrop}%) Off`}
                          </p>
                        </div>
                      </li>
                    ))
                : null}
            </ul>
          </div>
          <div className="w-full relative flex justify-center my-8">
              <ShutterUpButton
                className=" before:bg-slate-100 py-1 px-10 rounded-lg"
                onClick={() => router.push("/product/listing/all-products")}
              >
                <p className="text-xl font-bold">See More</p>
              </ShutterUpButton>
            </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
