import React from "react";
import { Avatar, Flex, Link as RadixLink } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import ConnectWallet from "../wallet/connect-wallet";
import Dynamic from "../dynamic/dynamic";
import { FaHome } from "react-icons/fa";

const Navbar:React.FC = () => {
  return <Flex direction={{ md: "row", sm: "column"}} justify={"between"} px={"3"} py={"1"} align={"center"}>
    <Logo />
    <Flex direction={{ md: "row", sm: "column"}} gap={"3"} height={"min-content"} align={"center"} >
      {/*<ConnectWallet /> */}
      <Link to={"home"}>
        <RadixLink>
          <FaHome />
        </RadixLink>
      </Link>
      <Link to={"player"}>
        <RadixLink>
          <Avatar fallback={"Me"} variant="soft" radius="full" />
        </RadixLink>
      </Link>
      <Dynamic />
    </Flex>
  </Flex>
}

export default Navbar
