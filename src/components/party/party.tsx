import { Badge, Button, Flex, Heading } from "@radix-ui/themes";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";

import { Entity, getComponentValue } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useComponentValue } from "@dojoengine/react";
import { useDojo } from "../../dojo/useDojo";
import KagekiCard from "../card/card";

import "./party.css";

type IParty = {
  player?: bigint , 
  partyId?: bigint, 
  is_active?: boolean, 
  card1?: bigint, 
  card2?: bigint, 
  card3?: bigint, 
  card4?: bigint 
}

const Party: React.FC<IParty> = ({player, partyId, is_active, card1, card3, card4, card2}) => {
  const { 
    setup: {
      systemCalls: { toggleParty },
      clientComponents: { Card },
      account
  }} = useDojo();

  const cards = useMemo(() => {
    const cardIds = [card1, card2, card3, card4]

    return cardIds.map((cardId) => {
      if(cardId) {
        const cardEntity = getEntityIdFromKeys([BigInt(player ?? "0n"), BigInt(cardId)]) as Entity;
        const card = getComponentValue(Card, cardEntity);
        return card
      } else {
        return undefined
      }
    })
  }, [card1, card2, card3, card4, Card, player])

  const handleToggleParty = async () => {
    console.log("I am called")
    if(partyId) 
      await toggleParty(account?.account, partyId);
  }

  console.log({ cards })
  return <Flex flexGrow={"1"} direction={"column"} p={"2"} style={{ background: "var(--orange-a4)"}}>
    <Flex align={"center"} gap={"3"} p={"4"}>
      <Heading>
        Party Id: {partyId?.toString()}
      </Heading>
      <Badge color={is_active ? "green" : "gray"}>{ is_active ? "Active" : "InActive"}</Badge>
      {!is_active 
        ? <Button onClick={() => handleToggleParty()}> <FaFire /> Deploy Party for Battle </Button> 
        : <Button onClick={() => handleToggleParty()} color="red"> <FaFire /> Withdraw party from Battle </Button> }
    </Flex>
    <motion.div className="party-cards-wrapper" layout>
      {cards?.map(card => { 
        if(card) {
          return <KagekiCard 
            cardData={card} 
          />
        } 
        return <></>
      })}
    </motion.div>
  </Flex>
}

export default Party;
