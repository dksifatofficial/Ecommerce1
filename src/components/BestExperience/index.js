import img5 from "@/picture/logo/AuthenticProducts.png";
import img4 from "@/picture/logo/BestPriceGuaranteed.png";
import img6 from "@/picture/logo/DarazVerified.png";
import img3 from "@/picture/logo/Free&EasyReturns.png";
import img2 from "@/picture/logo/NationwideDelivery.png";
import img1 from "@/picture/logo/SafePayments.png";
import Image from "next/image";
import Link from "next/link";

const BestExperience = () => {
  return (
    <div className="w-full py-6">
      <Link
        className=" bg-[#f8570610] hover:bg-[#f857062a] rounded-lg py-2 px-4
        flex flex-wrap justify-center gap-x-6"
        href="/get-the-best-shopping-experience"
      >
        <div className="flex flex-row">
          <Image
            className="h-4 w-4 xl:h-6 xl:w-6 mr-1"
            src={img1}
            alt=""
            height="100"
            width="100"
          />
          <p className="text-gray-700 text-sm tracking-tighter">
            Safe Payments
          </p>
        </div>
        <p className="ml-1 text-gray-300">|</p>
        <div className="flex flex-row">
          <Image
            className="h-4 w-4 xl:h-6 xl:w-6 mr-1"
            src={img2}
            alt=""
            height="100"
            width="100"
          />
          <p className="text-gray-700 text-sm tracking-tighter">
            Nationwide Delivery
          </p>
        </div>
        <p className="ml-1 text-gray-300">|</p>
        <div className="flex flex-row">
          <Image
            className="h-4 w-4 xl:h-6 xl:w-6 mr-1"
            src={img3}
            alt=""
            height="100"
            width="100"
          />
          <p className="text-gray-700 text-sm tracking-tighter">
            Free & Easy Returns
          </p>
        </div>
        <p className="ml-1 text-gray-300">|</p>
        <div className="flex flex-row">
          <Image
            className="h-4 w-4 xl:h-6 xl:w-6 mr-1"
            src={img4}
            alt=""
            height="100"
            width="100"
          />
          <p className="text-gray-700 text-sm tracking-tighter">
            Best Price Guaranteed
          </p>
        </div>
        <p className="ml-1 text-gray-300">|</p>
        <div className="flex flex-row">
          <Image
            className="h-4 w-4 xl:h-6 xl:w-6 mr-1"
            src={img5}
            alt=""
            height="100"
            width="100"
          />
          <p className="text-gray-700 text-sm tracking-tighter">
            100% Authentic Products
          </p>
        </div>
        <p className="ml-1 text-gray-300">|</p>
        <div className="flex flex-row">
          <Image
            className="h-4 w-4 xl:h-6 xl:w-6 mr-1"
            src={img6}
            alt=""
            height="100"
            width="100"
          />
          <p className="text-gray-700 text-sm tracking-tighter">
            Daraz Verified
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BestExperience;
