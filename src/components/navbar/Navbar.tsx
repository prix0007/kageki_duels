import React from "react";
import { Avatar, Flex, Link as RadixLink, Tooltip } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import ConnectWallet from "../wallet/connect-wallet";
import Dynamic from "../dynamic/dynamic";
import { FaHome } from "react-icons/fa";
import { GiJetFighter } from "react-icons/gi";

const Navbar:React.FC = () => {
  return <Flex direction={{ md: "row", sm: "column"}} justify={"between"} px={"3"} py={"1"} align={"center"}>
    <Link to={"home"}>
      <Logo />
    </Link>
    <Flex direction={{ md: "row", sm: "column"}} gap={"5"} height={"min-content"} align={"center"} >
      {/*<ConnectWallet /> */}
      <Link to={"home"}>
        <Tooltip content="Home">
          <RadixLink>
            <FaHome />
          </RadixLink>
        </Tooltip>
      </Link>
      <Link to={"battle"}>
        <Tooltip content="Battle">
          <RadixLink>
            <GiJetFighter />
          </RadixLink>
        </Tooltip>
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
