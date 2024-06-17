import React from "react";

import { Box, Card, Inset, Text, Strong } from "@radix-ui/themes";

type IKagekiCard = {
  title: string,
  description: string,
  imageUrl: string
}

const KagekiCard: React.FC<IKagekiCard> = ({ title, description, imageUrl }) => {
  return <Box maxWidth="240px">
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
      <Text as="p" size="3"> 
        <Strong>{title}</Strong> 
        {description} 
      </Text>
    </Card>
  </Box>
}

export default KagekiCard
