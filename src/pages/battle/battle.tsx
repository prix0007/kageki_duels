import { Box, Flex, Grid, Heading, ScrollArea, Separator } from "@radix-ui/themes";
import React, { useMemo, useState } from "react";

import { Entity, getComponentValue } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useComponentValue } from "@dojoengine/react";
import { useDojo } from "../../dojo/useDojo";

import { LuSwords } from "react-icons/lu";
import BattleParty from "./BattleParty";

const Battle:React.FC = () => {
	const { 
		setup: {
			clientComponents: { Player, PlayerParty },
		},
		account,
	} = useDojo();

	const entityId = getEntityIdFromKeys([
		BigInt(account?.account.address),
	]) as Entity;


	const player = useComponentValue(Player, entityId);

	const active_parties = useMemo(() => {
		const total_parties = BigInt(player?.party_count ?? "0");
		const partiesFetched = []
		for (let i: bigint = 0n; i < total_parties ; i+=1n) {
			const partyEntity = getEntityIdFromKeys([BigInt(player?.player ?? "0n"), BigInt(i)]) as Entity;
			const party = getComponentValue(PlayerParty, partyEntity);
			if(party?.is_active)
				partiesFetched.push(party);
		}
		return partiesFetched
		}, [player, PlayerParty])

	const [selectedMyParty, setSelectedMyParty] = useState<bigint | undefined>()
	const [selectedOpponentParty, setSelectedOpponentParty] = useState<bigint | undefined>()

	return <Box p={"2"}>
		<Box>
			<Flex justify={"center"}>
				<Heading my={"2"}>Logged in as: {account.account.address}</Heading>
			</Flex>
		</Box>
		<Grid columns={"2"} my={"4"}>
			<Box style={{ border: "1px solid red"}}>
				<Flex justify={"center"}>
				<Heading>My Parties</Heading>
				</Flex>

				<ScrollArea type="always" scrollbars="vertical" style={{ height: 600, background: "var(--orange-a3)" }}>
					{active_parties?.map(party => {
						return <BattleParty {...party} isSelected={selectedMyParty === party.partyId} toggleSelection={() => {
							if(selectedMyParty === party.partyId) {
								setSelectedMyParty(undefined)
							} else {
								setSelectedMyParty(party.partyId)
							}	
						}}/>
					})}
				</ScrollArea>
				<Separator orientation={"vertical"} size={"4"} />
			</Box>
			<Box style={{ border: "1px solid red"}}>
				<Flex justify={"center"}>
					<Heading>Choose to <LuSwords /> Opponent</Heading>
				</Flex>
				<ScrollArea type="always" scrollbars="vertical" style={{ height: 600, background: "var(--orange-a3)" }}>
				</ScrollArea>
			</Box>
		</Grid>
	</Box>
}

export default Battle;
