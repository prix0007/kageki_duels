import React from "react";
import { Box, Flex, Grid, Heading, Text, Link as RadixLink } from "@radix-ui/themes";
import { Link } from "react-router-dom";

import { CiCreditCard1 } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { GiCrossedSwords } from "react-icons/gi";
import { useStages } from "../../hooks/useStages";
import { LuSwords } from "react-icons/lu";


import { IoEarthOutline } from "react-icons/io5";
import { FaGripfire } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { GiWhirlwind } from "react-icons/gi";
import { SiElement } from "react-icons/si";
import { FaRandom } from "react-icons/fa";


const elementToIcon = (element: any) => {
	switch(element) {
		case "Water": return <IoIosWater color="blue" size={"110"} />;
		case "Fire": return <FaGripfire color="orange" size={"110"}/>;
		case "Earth": return <IoEarthOutline color="green" size={"110"} />;
		case "Wind": return <GiWhirlwind color="gray" size={"110"}/>;
		default: return <SiElement size={"110"} />
	}
}

const addressShort = (address: string) => { return address
	? `${address.slice(0, 6)}...${address.slice(-4)}`
	: null; }

type IHome = {}

const Home:React.FC<IHome> = () => {

	const battles = useStages();

	return <Flex direction="column">
		<Flex p={"6"} direction={"column"} gap={"2"} justify={"center"} align={"center"}>
			<Heading as="h1" size={"6"}>Kageki</Heading>		
			<Heading as="h4" size={"5"}>On-Chain PvP Party based Game</Heading>		
		</Flex>
		<Flex direction={"column"} justify={"center"} align={"center"} p={"4"}>
			<Heading as="h4" size={"4"}>How to play</Heading>		
			<Grid columns={"4"} minHeight={"10em"} gap={"2"}>
				<Flex direction={"column"} justify={"center"} align={"center"}>
					<Heading size={"8"} color="sky">1</Heading>
					<Text>You are Already Connected</Text>
				</Flex>
				<Flex direction={"column"} justify={"center"} align={"center"}>
					<Heading size={"8"} color="sky">2</Heading>
					<Text> 
						Create New 
						<CiCreditCard1 />'s 
						and create Party 
					</Text>
					<Link to={"/player"}>
						<RadixLink>
							<FiUser />	
						</RadixLink>
					</Link>
				</Flex>
				<Flex direction={"column"} justify={"center"} align={"center"}>
					<Heading size={"8"} color="sky">3</Heading>
					<Text> 
						Activate your party to battle
					</Text>
					<Link to={"/player"}>
						<RadixLink>
							<FiUser />	
						</RadixLink>
					</Link>
				</Flex>
				<Flex direction={"column"} justify={"center"} align={"center"}>
					<Heading size={"8"} color="sky">4</Heading>
					<Text> 
						Battle Opponent party and win on different terrains	
					</Text>
					<Link to={"/battle"}>
						<RadixLink>
							<GiCrossedSwords />	
						</RadixLink>
					</Link>
				</Flex>
			</Grid>
		</Flex>
		<Flex direction={"row"} wrap={"wrap"} justify={"center"} align={"center"} p={"4"} gap={"4"}>
			{battles.map(battle => {
				return <Box style={{ background: "var(--teal-5)", position: "relative"}} p={"4"}>
					<Heading><FaRandom /> - {battle.randomness}</Heading>
					<Box style={{position: "absolute", zIndex: 0}}>
						{elementToIcon(battle.environment)}
					</Box>
					<Box style={{ zIndex: 1, position: "relative", background: "var(--white-a4)"}}>
						<Flex direction={"row"} justify={"center"} align={"center"} gap={"3"} p={"4"} >
							<Text>{addressShort(battle.p1)}</Text>
							<LuSwords />
							<Text>{addressShort(battle.p2)}</Text>
						</Flex>
						<Flex direction={"row"} justify={"center"} align={"center"} gap={"3"} p={"4"}>
							<Text>PartyID: {battle.p1_party}</Text>
							VS
							<Text>PartyID: {battle.p2_party}</Text>
						</Flex>
					</Box>
				</Box>
			})}
		</Flex>
	</Flex>
}

export default Home
