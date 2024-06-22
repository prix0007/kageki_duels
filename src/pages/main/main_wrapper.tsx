import React, { useEffect } from "react";

import Footer from '../../components/footer/footer';
import Navbar from "../../components/navbar/Navbar";

import { Box } from '@radix-ui/themes';
import { Outlet } from "react-router-dom";

export const MainAppWrapper:React.FC = () => {
	return <Box maxWidth={"1280px"} mx={"auto"} className='main-wrapper'>
		<Navbar />
		<Box minHeight={"80vh"}>
			<Outlet /> 
		</Box>
		<Footer />
	</Box>
}
