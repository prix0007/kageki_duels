import React from "react";

import { useAccount, useDisconnect } from "@starknet-react/core";
import {
  Dialog,
  Flex,
} from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";


export default function DisconnectModal() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const addressShort = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  return (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="outline">{addressShort}</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Disconnect Wallet</Dialog.Title>
          <Flex direction={"column"} gap={"2"}>
            <Button onClick={() => disconnect()}>Disconnect</Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
  );
}
