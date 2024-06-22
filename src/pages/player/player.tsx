import { Box, Button, Flex, Grid, Heading, ScrollArea, Separator, Tooltip } from "@radix-ui/themes";
import React, { useMemo, useState } from "react";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useComponentValue } from "@dojoengine/react";

import { GrPowerReset } from "react-icons/gr";
import { MdAddCircleOutline } from "react-icons/md";
import { useDojo } from '../../dojo/useDojo';
import KagekiCard from "../../components/card/card";
import Party from "../../components/party/party";

const Player:React.FC = () => {

	const { setup: {
		systemCalls: { createCharacter, createParty },
		clientComponents: { Player, PlayerParty, Card, CardCount },
	},
		account,
	} = useDojo();

	const entityId = getEntityIdFromKeys([
		BigInt(account?.account.address),
	]) as Entity;

	// console.log({entityId1, entityId})
	// const cards1 = useEntityQuery([Has(Card)]);
	// const cards2 = useEntityQuery([HasValue(Card, {owner: BigInt(account?.account.address) })]);

	const player = useComponentValue(Player, entityId);
	const playerCardCount = useComponentValue(CardCount, entityId);

	const [selectedParties, setSelectedParties] = useState<bigint[]>([])

	const cards = useMemo(() => {
		const total_cards = BigInt(playerCardCount?.total ?? "0");
		const cardsFetched = []
		for (let i: bigint = 0n; i < total_cards; i+=1n) {
			const cardEntity = getEntityIdFromKeys([BigInt(player?.player ?? "0n"), BigInt(i)]) as Entity;
			const card = getComponentValue(Card, cardEntity);
			cardsFetched.push(card);
		}
		return cardsFetched
		}, [player, playerCardCount, Card])

	const parties = useMemo(() => {
		const total_parties = BigInt(player?.party_count ?? "0");
		const partiesFetched = []
		for (let i: bigint = 0n; i < total_parties ; i+=1n) {
			const partyEntity = getEntityIdFromKeys([BigInt(player?.player ?? "0n"), BigInt(i)]) as Entity;
			const party = getComponentValue(PlayerParty, partyEntity);
			partiesFetched.push(party);
		}
		return partiesFetched
		}, [player, PlayerParty])
	console.log(parties)

	const handleCreateNewParty =  async () => {
		try {
			if(account.account && selectedParties.length === 4) {
				await createParty(account.account, selectedParties);
			setSelectedParties([]);
			}
		} catch (e) {
			console.error(e)
		}
	}

	return <Box p={"2"}>
		<Heading my={"2"}>Logged in as: {account.account.address}</Heading>
		<Separator size={"4"} />
		<Box p={"4"}>
			<Flex justify={"between"}>
				<Button color="blue" onClick={() => createCharacter(account?.account)}>Create New Card</Button>
			</Flex>
		</Box>
		<Box p={"4"}>
			<Flex justify={"between"} p={"4"}>
				<Heading size={"6"} color="blue">My Cards</Heading>
				{selectedParties.length > 0 && <Tooltip content="reset party selection">
					<Button onClick={() => setSelectedParties([])}><GrPowerReset /></Button>
				</Tooltip>}
				{selectedParties.length === 4 && <Tooltip content="create a new party from party selection">
					<Button onClick={handleCreateNewParty}><MdAddCircleOutline /> Create a New Party</Button>
				</Tooltip>}
				<Heading size={"4"} color="blue">Total Cards: {cards?.length}</Heading>

			</Flex>
			<ScrollArea type="always" scrollbars="vertical" style={{ height: 600 }}>
				<Grid columns={{sm: "1", md: "2", lg: "3", xl:"4"}} gap={"4"} p={"4"}>
					{cards?.map(card => { 
						const currentId = BigInt(card?.cardId ?? 0n)
						return <KagekiCard 
							cardData={card} 
							isSelected={selectedParties.includes(currentId)} 
							toggleCard={(cardIdx) => {
								if (selectedParties.includes(cardIdx)) {
									setSelectedParties(selectedParties.filter(c => cardIdx != c));
								} else {
									if(selectedParties.length === 4) {
										alert("A party can have exact of 4 cards");
										return;
									}
									setSelectedParties([...selectedParties, cardIdx]);
								}
							}}
						/>
					})}
				</Grid>
			</ScrollArea>
		</Box>
		<Box p={"4"}>
			<Flex justify={"between"}>
				<Heading size={"6"} color="blue">My Parties</Heading>
				<Heading size={"4"} color="blue">Total Party: {parties.length}</Heading>

			</Flex>
			<ScrollArea type="always" scrollbars="vertical" style={{ height: 600 }}>
				{parties?.map(party => {
					return <Party {...party} />
				})}
			</ScrollArea>
		</Box>
		<Separator size={"4"} />

	</Box>
}

export default Player
