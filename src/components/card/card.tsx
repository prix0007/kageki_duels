import React from "react";

import { Box, Card, Inset, Text, Strong } from "@radix-ui/themes";
import { motion } from "framer-motion";

export type IKagekiCard = {
  title: string,
  description: string,
  imageUrl: string
}

const KagekiCard: React.FC<IKagekiCard> = ({ title, description, imageUrl }) => {
  return <Box minWidth="240px">
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <Card size="2">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={imageUrl}
            alt={`${title} kageki card`}
            style={{
              display: 'block',
              objectFit: 'cover',
              width: '100%',
              height: 320,
              backgroundColor: 'var(--orange-5)',
            }}
          />
        </Inset>
        <Strong>{title}</Strong> 
        <Text as="p" size="3"> 
          {description} 
        </Text>
      </Card>
    </motion.div>
  </Box>
}

export default KagekiCard
