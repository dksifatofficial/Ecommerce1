import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Star = ({ stars, reviews, onStarClick }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    const rating = index + 1;

    return (
      <span
        key={index}
        onClick={() => onStarClick(rating)} // Add onClick handler
        style={{ cursor: 'pointer' }} // Change cursor style to indicate interactivity
      >
        {stars > rating ? (
          <FaStar className="text-base text-orange-600" />
        ) : stars > rating - 0.5 ? (
          <FaStarHalfAlt className="text-base text-orange-600" />
        ) : (
          <AiOutlineStar className="text-base text-orange-600" />
        )}
      </span>
    );
  });

  return (
    <div className="pt-2">
      <div className="flex gap-[0.2rem] items-center justify-start">
        {ratingStar}
        <p className="m-0 pl-4 text-xs">{reviews} customer reviews</p>
      </div>
    </div>
  );
};

export default Star;
