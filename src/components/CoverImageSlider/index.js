"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [transitionDelay, setTransitionDelay] = useState(false);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      if (!hovered) {
        goToNextImage();
      }
    }, 5000);

    return () => {
      clearInterval(sliderInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  const goToNextImage = () => {
  setTransitionDelay(true);
  setTimeout(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTransitionDelay(false);
  }, 50);
};

  // const goToNextImage = () => {
  //   setTransitionDelay(true);
  //   setTimeout(() => {
  //     setCurrentImageIndex((prevIndex) =>
  //       prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //     );
  //     setTransitionDelay(false);
  //   }, 50);
  // };

  const goToPreviousImage = () => {
    setTransitionDelay(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setTransitionDelay(false);
    }, 50);
  };


  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleDotClick = (index) => {
    setTransitionDelay(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setTransitionDelay(false);
    }, 50);
  };

  const translateX = -currentImageIndex * 100;

  const sliderStyles = {
    transform: `translateX(${translateX}%)`,
    transition: transitionDelay ? 'transform 0.5s ease' : 'transform 0.5s ease',
  };

  return (
    <div
      className="w-[800px] h-[350px] relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex items-center w-full h-full relative transition-transform duration-[1s] ease-[ease]"
        style={sliderStyles}
      >
        {[...images, images[0]].map((image, index) => (
          <Link
            className="relative flex-[0_0_100%] w-full flex justify-center items-center transition-transform 
            duration-[1s] ease-[ease] overflow-hidden"
            key={index}
            href={image.link}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              src={image.src}
              alt={image.alt}
            />
            <div className="absolute z-[1] text-white bg-[rgba(0,0,0,0.5)] p-[10px]">
              <h2 className="text-2xl m-0">{image.header}</h2>
              <p className="text-base m-0">{image.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-between w-full px-5 py-0 absolute top-0 transform 
      opacity-0 hover:opacity-[1] transition-opacity duration-300 ease-in-out">
        <button
          className="text-white text-2xl cursor-pointer pr-[50px] pl-4 py-[160px] border-[none] absolute left-0 bg-transparent"
          onClick={goToPreviousImage}
        >
          &lt;
        </button>
        <button
          className="text-white text-2xl cursor-pointer pl-[50px] pr-4 py-[160px] border-[none] absolute right-0 bg-transparent"
          onClick={goToNextImage}
        >
          &gt;
        </button>
      </div>
      <div className="absolute -translate-x-2/4 flex gap-2.5 left-2/4 bottom-5">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 bg-white cursor-pointer transition-[background-color] duration-[0.3s] 
            ease-[ease] rounded-[50%] border-2 border-solid border-[rgba(0,0,0,0.5)] ${
              currentImageIndex === index ?  "bg-[#8b8a8a]" : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;

// https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Fcc1.jpg-1694800235238-3y1ye4f9it?alt=media&token=4760c043-e97d-40da-a89c-5978d9bb1ef4
// https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Fcc2.jpg-1694800271890-yepu392ygp?alt=media&token=6a4edcac-13af-40c6-b732-034cab8bc21b
// https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Fcc3.jpg-1694800299474-1b1em2qp2b?alt=media&token=8f942274-6781-4a86-87d6-ee06adaa4a66
// https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Fcc4.jpg-1694800330850-lfapplltyc?alt=media&token=2e0eb356-9163-45be-a9cd-2471d06cc079
// https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-2023-5d8d1.appspot.com/o/ecommerce%2Fcc5.jpg-1694800356107-91bseavbag?alt=media&token=c1595050-90ef-4d7a-996e-5ed10f4db577
//
