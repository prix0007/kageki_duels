import React from "react";

import { Box, Card, Inset, Text, Strong, DataList, Badge, Button, Flex, Tooltip } from "@radix-ui/themes";
import { motion } from "framer-motion";
import * as Collapsible from '@radix-ui/react-collapsible';
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

import { CARDS_MAP } from "./cards_meta";

import "./card.css";

export type IKagekiCard = {
  title?: string,
  description?: string,
  imageUrl?: string
  isSelected?: boolean,
  toggleCard?: (cardId: bigint) => void,
  cardData?: { 
    owner: bigint, 
    cardId: bigint, 
    power: number, 
    health: number, 
    factor: number, 
    experience: bigint, 
    battles: bigint, 
    skill: number, 
    element: number 
  }
}

const ignoreKeyList = ["owner"]

const KagekiCard: React.FC<IKagekiCard> = ({ cardData, isSelected, toggleCard }) => {
  const cardIdx = BigInt(cardData?.cardId ?? 0n)
  const idx = parseInt((cardIdx % 10n).toString())

  // @ts-expect-error error due to not detecting mod
  const meta = CARDS_MAP[idx];

  const [open, setOpen] = React.useState(false);
  return <Box minWidth="240px" maxWidth={"320px"}>
    <Card size="2" className={isSelected ? "selected" : ""} onClick={() => { toggleCard && toggleCard(cardIdx)}}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={meta.link}
            alt={`${meta.name} kageki card`}
            style={{
              display: 'block',
              objectFit: 'cover',
              width: '100%',
              height: 320,
              backgroundColor: 'var(--orange-5)',
            }}
          />
        </Inset>
      </motion.div>
      <Flex direction="column">
        <Tooltip content={meta.cid}>
          <Text color="teal"><Strong>{meta.name} - {cardIdx?.toString()}</Strong></Text>
        </Tooltip>
        <Text as="p" size="3" mb={"3"}> 
          {meta.description} 
        </Text>
      </Flex>
      <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger asChild>
          <Button className="IconButton">{open ? <CiCircleChevUp /> : <CiCircleChevDown/>}</Button>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Box py={"2"}>
            <DataList.Root>
              {Object.entries(cardData ?? {}).map(([key, value]) => {
                if(ignoreKeyList.includes(key)) return
                return <DataList.Item align="center">
                  <DataList.Label minWidth="88px">
                    <Badge variant="soft" radius="full">
                      {key} 
                    </Badge>
                  </DataList.Label>
                  <DataList.Value>
                    <Badge color="jade" variant="soft" radius="full">
                      {value.toString()} 
                    </Badge>
                  </DataList.Value>
                </DataList.Item>
              })}
            </DataList.Root>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Card>
  </Box>
}

export default KagekiCard
