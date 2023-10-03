'use client'

import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Star = ({ stars, reviews, onStarClick, averageRating }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    const rating = index + 0.5;

    return (
      <span
        key={index}
        // onClick={() => onStarClick(rating)} // Add onClick handler
        style={{ cursor: 'pointer' }} // Change cursor style to indicate interactivity
      >
        {stars > rating ? (
          <FaStar className="text-xs text-orange-600" />
        ) : stars > rating - 0.4 ? (
          <FaStarHalfAlt className="text-xs text-orange-600" />
        ) : (
          <AiOutlineStar className="text-xs text-orange-600" />
        )}
      </span>
    );
  });

  return (
    <div className="">
      <div className="flex gap-[0.2rem] items-center justify-start">
        {ratingStar}
        {/* <p className="m-0 ml-1 text-xs text-gray-600">({averageRating})</p>
        <p className="m-0 ml-1 text-xs text-gray-600">{reviews} reviews</p> */}
      </div>
    </div>
  );
};

export default Star;
