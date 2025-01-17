import { Box, Button, Flex, Grid, Heading, ScrollArea, Separator } from "@radix-ui/themes";
import React, { useMemo, useState } from "react";

import { Entity, getComponentValue } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useComponentValue } from "@dojoengine/react";
import { useDojo } from "../../dojo/useDojo";
import { useNavigate } from "react-router-dom";

import { LuSwords } from "react-icons/lu";


import BattleParty from "./BattleParty";
import { useParties } from "../../hooks/useParties";

const Battle:React.FC = () => {
	const { account } = useDojo();

	if(!account?.account?.address) {
		return <Heading>Connect your wallet to get started</Heading>
	} else {
		return <BattleWrapper />
	}
}

const BattleWrapper:React.FC = () => {
	const { 
		setup: {
			systemCalls: { battleParties },
			clientComponents: { Player, PlayerParty },
		},
		account,
	} = useDojo();

	const entityId = getEntityIdFromKeys([
		BigInt(account?.account?.address),
	]) as Entity;

	const navigate = useNavigate();

	const player = useComponentValue(Player, entityId);

	// All Active Parties 
	const all_opponent_parties = useParties(account?.account?.address)

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

	const [selectedMyParty, setSelectedMyParty] = useState<any | undefined>()
	const [selectedOpponentParty, setSelectedOpponentParty] = useState<any | undefined>()

	const handleBattle = async () => {
		if(selectedMyParty && selectedOpponentParty) {
			await battleParties(account?.account, selectedMyParty?.player, selectedMyParty?.partyId, selectedOpponentParty?.player, selectedOpponentParty?.partyId)
			setSelectedMyParty(undefined)
			setSelectedOpponentParty(undefined)
			navigate("/home")
		} else {
			alert("select one of your party and opponent party to battle");
		}
	}


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
						return <BattleParty 
							{...party} 
							isSelected={selectedMyParty?.partyId === party.partyId} 
							toggleSelection={() => {
								if(selectedMyParty?.partyId === party.partyId) {
									setSelectedMyParty(undefined)
								} else {
									setSelectedMyParty(party)
								}	
						}}/>
					})}
				</ScrollArea>
			</Box>
			<Box style={{ border: "1px solid red"}}>
				<Flex justify={"center"}>
					<Heading>Choose to <LuSwords /> Opponent</Heading>
				</Flex>
				<ScrollArea type="always" scrollbars="vertical" style={{ height: 600, background: "var(--orange-a3)" }}>
					{all_opponent_parties?.map(party => {
						return <BattleParty {...party} 
							isSelected={
								selectedOpponentParty?.partyId === party.partyId && selectedOpponentParty?.owner === party.owner } 
							toggleSelection={() => {
								if(selectedOpponentParty === party.partyId) {
									setSelectedOpponentParty(undefined)
								} else {
									setSelectedOpponentParty(party)
								}	
						}}/>
					})}
				</ScrollArea>
			</Box>
		</Grid>
		<Grid columns={"2"} gap={"3"} my={"4"}>
			<Flex align={"center"} justify={"center"}>
				{ selectedMyParty 
					? <BattleParty {...selectedMyParty} isSelected={true} toggleSelection={() => {}}/> 
					: <Heading>Select a party to Battle</Heading> 
				}
			</Flex>
			<Flex align={"center"} justify={"center"}>
				{ selectedOpponentParty
					? <BattleParty {...selectedOpponentParty} isSelected={true} toggleSelection={() => {}}/> 
					: <Heading>Select an opponent to Battle</Heading> 
				}
			</Flex>
		</Grid>
		<Flex>
			<Button 
				color="red" 
				style={{width: "100%", minHeight: "4em"}} 
				disabled={!selectedMyParty && !selectedOpponentParty}
				onClick={handleBattle}
			>
				Battle <LuSwords />
			</Button>
		</Flex>
	</Box>
}

export default Battle;
