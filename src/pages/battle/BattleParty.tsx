import { Badge, Box, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import React, { useMemo } from "react";
import { useDojo } from "../../dojo/useDojo";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";

// Icons
import { LuSword } from "react-icons/lu";
import { FaLeaf } from "react-icons/fa6";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { CgCross } from "react-icons/cg";

import { IoEarthOutline } from "react-icons/io5";
import { FaGripfire } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { GiWhirlwind } from "react-icons/gi";
import { SiElement } from "react-icons/si";
import { CgCreditCard } from "react-icons/cg";

import "./battleParty.css"

const elementToIcon = (element: any) => {
	switch(element) {
		case "Water": return <IoIosWater />;
		case "Fire": return <FaGripfire />;
		case "Earth": return <IoEarthOutline />;
		case "Wind": return <GiWhirlwind/>;
		default: return <SiElement />
	}
}

type IBattleParty = {
	player?: bigint ; 
	partyId?: bigint; 
	is_active?: boolean; 
	card1?: bigint; 
	card2?: bigint; 
	card3?: bigint; 
	card4?: bigint;
	isSelected: boolean;
	toggleSelection: () => void;
}

const BattleParty: React.FC<IBattleParty> = ({
	player, partyId, card1, card3, card4, card2,
	isSelected,
	toggleSelection
}) => {
	const { 
		setup: {
			clientComponents: { Card },
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

	const totalStats = useMemo(() => {
		return cards.reduce((p, c) => {
			return {
				power: (p?.power ?? 0) + (c?.power ?? 0),
				health: (p?.health ?? 0) + (c?.health ?? 0),
				}
			}, {power: 0, health: 0})
	}, [cards])
	return <Box className={["card-box", isSelected ? "selected" : ""].join(" ")} onClick={() => toggleSelection()}>
		<Flex direction={"column"} p={"2"} m={"3"} gap={"2"} width={"max-width"}>
		<Flex gap={"2"} wrap={"wrap"}>
				<Heading size={"3"}>
					Party ID: {partyId?.toString()}
				</Heading>
				<Badge color="gray">Owner: {player?.toString()}</Badge>
				<Badge color="red">Total <LuSword />{totalStats?.power}</Badge>
				<Badge color="green">Total <MdOutlineHealthAndSafety/>{totalStats?.health}</Badge>
			</Flex>
			{ cards.map(card => {
			return <Flex gap={"1"} align={"center"}>
					<Flex align={"center"} gap={"1"}>
						{BigInt(card?.cardId ?? "0").toString()}
						<CgCreditCard />
					</Flex>
					<Separator orientation={"vertical"} />
				<Badge color="red"><LuSword />{card?.power}</Badge>
					<Badge color="green"><MdOutlineHealthAndSafety/>{card?.health}</Badge>
					<Badge color="brown"><CgCross />{card?.factor}</Badge>
				<Badge color="teal"><FaLeaf />{card?.skill}</Badge>
					<Badge color="sky">{elementToIcon(card?.element ?? "")} {card?.element}</Badge>
				</Flex>
			})}
		</Flex>
	</Box>
}

export default BattleParty
