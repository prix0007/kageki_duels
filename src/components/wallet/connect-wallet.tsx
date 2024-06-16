import React, {lazy} from "react";

import { useAccount } from "@starknet-react/core";
import { Flex } from "@radix-ui/themes";

const ConnectModal = lazy(
  () => import("./connect-modal")
);

const DisconnectModal = lazy(
  () => import("./disconnect-modal")
);

export default function ConnectWallet() {
  const { address } = useAccount();

  return (
    <Flex align={"center"}>
      {address ? <DisconnectModal /> : <ConnectModal />}
    </Flex>
  );
}
