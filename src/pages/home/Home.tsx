import React from "react";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import Carousel from "../../components/carousel/carousel";

type IHome = {}

const Home:React.FC<IHome> = () => {
	const images = [
		"https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
		"https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		"https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		"https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		"https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		"https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	];
	return <Flex direction="column">
		<Box p={"6"}>
			<Heading as="h1">Kageki</Heading>		
			<Heading as="h4">On-Chain PvP Party based Game</Heading>		
		</Box>
		<Box p={"6"}>
			<Text>Deployed Contracts: </Text>		
			<Text>0x...</Text>		
		</Box>
		<Box>
			<Carousel images={images} />
		</Box>
	</Flex>
}

export default Home