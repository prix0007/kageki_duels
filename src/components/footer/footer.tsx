import React from "react";

import { Flex, Link, Text } from "@radix-ui/themes";

import { FaGithub } from "react-icons/fa";
import { SiDocsdotrs } from "react-icons/si";

const Footer:React.FC = () => {
  return <Flex direction={"column"} justify={"center"} align={"center"} p={"3"} width={"100%"}>
    <Flex gap={"2"}>
      <Link href="https://github.com/prix0007/kageki_duels" target="_blank">
        <FaGithub />
      </Link>
      <Link href="https://prix0007.gitbook.io/kageki-duels" target="_blank">
        <SiDocsdotrs />
      </Link>
    </Flex>
    <Text>Maintainer: <Link href="https://github.com/prix0007" target="_blank">@prix0007</Link></Text>
  </Flex>
}

export default Footer
