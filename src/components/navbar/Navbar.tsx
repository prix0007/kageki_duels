import React from "react";
import { Flex, Link } from "@radix-ui/themes";
import Logo from "../logo/Logo";
import ConnectWallet from "../wallet/connect-wallet";

const Navbar:React.FC = () => {
  return <Flex direction={{ md: "row", sm: "column"}} justify={"between"} px={"3"} py={"1"} align={"center"}>
    <Logo />
    <Flex direction={{ md: "row", sm: "column"}} gap={"3"} height={"min-content"} align={"center"}>
      <Link href="#">About</Link>
      <ConnectWallet />
    </Flex>
  </Flex>
}

export default Navbar
