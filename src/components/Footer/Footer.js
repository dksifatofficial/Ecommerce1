'use client';

import { FacebookIcon, LinkedinIcon, TwitterIcon } from "next-share";
import Image from "next/image";
import Link from "next/link";
import Logo from '@/picture/logo.png'

const Footer = () => {
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="pt-2 md:pt-6 grid lg:flex justify-items-center w-[100%] px-4 md:px-[50px] lg:px-[100px] bg-[#f85606]">
          <div
            className="grid justify-items-center w-[100%] lg:w-[40%] lg:justify-items-start"
          >
            <Link href="/">
              <Image
                className="ml-0 lg:ml-[-2px] w-[100px] md:w-[140px] lg:w-[180px] h-auto"
                src={Logo}
                // src={"https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2FLogo%2FDecorWhims.png?alt=media&token=cbd68fea-1c6c-484e-a523-600bfe9d0c71"}
                alt="decorwhims_logo"
                height="400"
                width="800"
              />
            </Link>
            <p
              className="w-full text-center font-serif tracking-[1px] text-white py-2 md:py-4
               lg:pr-[100px] lg:text-left text-[10px] md:text-sm lg:text-base"
            >
              Discover Endless Elegance, Craft Your Dream Home with Distinctive
              Décor Delights!
            </p>
          </div>

          {/* Bottom Menu */}
          <div className="w-full lg:w-[60%] flex justify-around lg:justify-around mt-0 md:mt-4 lg:mt-0">
            {/* Row One */}
            <div className="flex flex-col justify-center gap-y-2 w-[20%]">
              <Link
                className="relative font-semibold py-0 text-[10px] lg:text-[14px] flex justify-start items-center"
                href="https://www.facebook.com/DecorWhims/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon className="mr-2 absolute left-0" size={20} round />
                <p className="text-white ml-6 text-[10px] lg:text-[14px]">Facebook</p>
              </Link>
              <Link
                className="relative font-semibold py-0 text-[10px] lg:text-[14px] flex justify-start items-center"
                href="https://twitter.com/DecorWhims"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon className="mr-2 absolute left-0" size={20} round />
                <p className="text-white ml-6 text-[10px] lg:text-[14px]">Twitter</p>
              </Link>
              <Link
                className="relative font-semibold text-[10px] lg:text-[14px] py-0 flex justify-start items-center"
                href="/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon className="mr-2 absolute left-0" size={20} round />
                <p className="text-white ml-6 text-[10px] lg:text-[14px]">Linkedin</p>
              </Link>
            </div>

            {/* Row Two */}
            <div className="flex flex-col justify-center gap-y-2 w-[20%]">
              <Link
                className="text-white text-[10px] lg:text-[14px] font-semibold pt-0 flex justify-start items-center"
                href="/disclaimer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Disclaimer
              </Link>
              <Link
                className="text-white text-[10px] lg:text-[14px] font-semibold pt-0 flex justify-start items-center"
                href="/privacyPolicy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-white text-[10px] lg:text-[14px] font-semibold pt-0 flex justify-start items-center"
                href="/contactUs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </Link>
            </div>

            {/* Row Three */}
            <div className="flex flex-col justify-center gap-y-2 w-[20%]">
              <Link
                className="text-white text-[10px] lg:text-[14px] font-semibold pt-0 flex justify-start items-center"
                href="/aboutUs"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Us
              </Link>

              <Link
                className="text-white text-[10px] lg:text-[14px] font-semibold pt-0 flex justify-start items-center"
                href="/signin"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign In
              </Link>

              <Link
                className="text-white text-[10px] lg:text-[14px] font-semibold pt-0 flex justify-start items-center"
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
      <div className="w-full flex pt-2 justify-center bg-[#f85606]">
        <p className="px-4 lg:px-0 tracking-[1px] text-[10px] lg:text-[12px] text-white text-center
          py-1 lg:w-[90%] lg:text-left border-t">
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
