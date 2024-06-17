import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Flex, IconButton } from "@radix-ui/themes";

type ICarousel = {
  images: string[]
}

const Carousel:React.FC<ICarousel> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % images.length 
    );
  };
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + images.length - 1) % images.length 
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  console.log(currentIndex)

  return (
    <div className="carousel">
      <img
        key={currentIndex}
        src={images[currentIndex]}
      />
      <Flex className="slide_direction">
        <IconButton className="left" onClick={handlePrevious}>
          <FaAngleLeft />
        </IconButton>
        <IconButton className="right" onClick={handleNext}>
          <FaAngleRight />
        </IconButton>
      </Flex>
      <Flex className="indicator">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          >
            <GoDotFill /> 
          </span>
        ))}
      </Flex>
    </div>
  );

}

export default Carousel
