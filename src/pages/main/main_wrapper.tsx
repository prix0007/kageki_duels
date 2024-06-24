import React, { useEffect } from "react";

import Footer from '../../components/footer/footer';
import Navbar from "../../components/navbar/Navbar";

import { Box } from '@radix-ui/themes';
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export const MainAppWrapper:React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		if(location.pathname === '/') {
			navigate('/home');
		}
		}, [location, navigate])
	return <Box maxWidth={"1280px"} mx={"auto"} className='main-wrapper'>
		<Navbar />
		<Box minHeight={"80vh"}>
			<Outlet /> 
		</Box>
		<Footer />
	</Box>
}
