'use client';

import { FacebookIcon, LinkedinIcon, TwitterIcon } from "next-share";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className=" flex justify-center w-full">
        <div className="pt-6 grid lg:flex justify-items-center w-[90%] border-t-[1px] border-dashed border-t-[#454545]">
          <div
            className="grid justify-items-center w-[100%]
               lg:w-[40%] lg:justify-items-start"
          >
            <Link href="/">
              <Image
                className=" ml-[-2px] w-[180px] h-auto"
                src={"https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2FLogo%2FDecorWhims.png?alt=media&token=cbd68fea-1c6c-484e-a523-600bfe9d0c71"}
                alt="decorwhims_logo"
                height="400"
                width="800"
              />
            </Link>
            <p
              className="w-full text-center font-serif tracking-[1px] text-[#141c3a] py-4
               lg:pr-[100px] lg:text-left"
            >
              Discover Endless Elegance, Craft Your Dream Home with Distinctive
              Décor Delights!
            </p>
          </div>

          {/* Bottom Menu */}
          <div className="w-full lg:w-[60%] flex justify-around lg:justify-around mt-6 lg:mt-0">
            {/* Row One */}
            <div className="h-[120px] grid justify-center w-[20%]">
              <Link
                className="font-semibold py-0 flex justify-start items-center"
                href="https://www.facebook.com/DecorWhims/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="mr-2" size={20} round />
                <p className="text-[#141c3a] text-[14px]">Facebook</p>
              </Link>
              <Link
                className="font-semibold py-0 flex justify-start items-center"
                href="https://twitter.com/DecorWhims"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon className="mr-2" size={20} round />
                <p className="text-[#141c3a] text-[14px]">Twitter</p>
              </Link>
              <Link
                className="font-semibold py-0 flex justify-start items-center"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon className="mr-2" size={20} round />
                <p className="text-[#141c3a] text-[14px]">Linkedin</p>
              </Link>
            </div>

            {/* Row Two */}
            <div className="h-[120px] pt-2 grid justify-center w-[20%]">
              <Link
                className="text-[#141c3a] text-[14px] font-semibold pt-0"
                href="/disclaimer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Disclaimer
              </Link>
              <Link
                className="text-[#141c3a] text-[14px] font-semibold pt-0"
                href="/privacyPolicy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-[#141c3a] text-[14px] font-semibold pt-0"
                href="/contactUs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </Link>
            </div>

            {/* Row Three */}
            <div className="h-[120px] pt-2 grid justify-center w-[20%]">
              <Link
                className="text-[#141c3a] text-[14px] font-semibold pt-0"
                href="/aboutUs"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Us
              </Link>

              <Link
                className="text-[#141c3a] text-[14px] font-semibold pt-0"
                href="/signin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign In
              </Link>

              <Link
                className="text-[#141c3a] text-[14px] font-semibold pt-0"
                href="/signup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <p className="px-4 lg:px-0 tracking-[1px] text-[12px] text-center pt-4 pb-8 lg:w-[90%] lg:text-left">
          <Link
            className="hover:text-[#4071fa]"
            href={"https://aminulkibria.com"}
            target="_blank"
          >
            Aminul Kibria
          </Link>{" "}
          © 2023. All Right Reserved. Published with NEXT-JS & Vercel.
        </p>
      </div>
    </>
  );
};

export default Footer;
