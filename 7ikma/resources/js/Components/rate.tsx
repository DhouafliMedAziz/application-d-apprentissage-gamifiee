import { SetStateAction, useState } from 'react';
import { Star } from 'lucide-react';

export default function Rating({ initialValue = 5.0, maxStars = 5, readOnly = true , absolute = false }) {
  const [rating, setRating] = useState(initialValue);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (index: SetStateAction<number>) => {
    if (!readOnly) {
      setRating(index);
    }
  };

  const handleStarHover = (index: SetStateAction<number>) => {
    if (!readOnly) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  return (
    <div className={`flex items-center ${ absolute ? "absolute top-0":""} rate-box bg-[#f2eee4] text-[#151513]  rounded-xl px-3 py-1 `}>
      <div className="flex">
        {[...Array(maxStars)].map((_, index) => {
          const starValue = index + 1;
          return (
            <Star
              key={index}
              size={20}
              fill={starValue <= (hoverRating || rating) ? "#ff5734" : "none"}
              stroke={starValue <= (hoverRating || rating) ? "#ff5734" : "#ff5734"}
              className={`cursor-${readOnly ? 'default' : 'pointer'} transition-colors duration-150`}
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
      <span className="ml-2 font-bold text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
}
