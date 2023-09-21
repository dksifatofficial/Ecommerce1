import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { IoIosStar } from "react-icons/io";

const Rating = ({ count, rating, color, onRating, className }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.hover;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }

    return color.unfilled;
  };

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <IoIosStar
          key={idx}
          className="cursor-pointer inline-block"
          onClick={() => onRating(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, rating, hoverRating]);

  return <div className={`${className}`}>{starRating}</div>;
};

Rating.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
  color: {
    hover: PropTypes.string,
    filled: PropTypes.string,
    unfilled: PropTypes.string,
  },
};

Rating.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    hover: "#ea5a0cb7",
    filled: "#EA580C",
    unfilled: "#DCDCDC",
  },
};

export default Rating;