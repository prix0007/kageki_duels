import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, HTMLMotionProps, useDragControls } from "framer-motion";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Box, Flex, IconButton } from "@radix-ui/themes";
import KagekiCard, { IKagekiCard } from "../card/card";

type ICarousel = {
  images: string[]
}

const MotionCard: React.FC<HTMLMotionProps<"div"> & { kageki: IKagekiCard }>= ({ 
  kageki,
  ...rest
}) => {
  return <motion.div {...rest}>
    <KagekiCard {...kageki} />
  </motion.div>
}

const Carousel:React.FC<ICarousel> = ({ images }) => {
  const controls = useDragControls()

  return (
    <Box 
      width={"100%"} 
      overflow={"hidden"} 
      p={"4"} 
      style={{ border: "1px solid black"}}
    >
      <AnimatePresence>
        <motion.div 
          drag="x" 
          dragControls={controls} 
          dragConstraints={{
            right: 0,
            left: -1 * ((images.length - 4) * 240)
          }}
        >
          <Flex gap={"4"}>
            {images.map(image => {
              return <MotionCard kageki={{ imageUrl:image , title:"Motion", description:"Kageki Card" }} />
            })}
          </Flex>
        </motion.div>
      </AnimatePresence>
    </Box>
  );

}

export default Carousel
