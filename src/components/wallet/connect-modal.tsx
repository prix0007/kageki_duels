"use client";
import React from "react";

import { useConnect, Connector } from "@starknet-react/core";
import {
  Dialog,
  Flex,
} from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";

export default function ConnectModal() {
  const { connect, connectors } = useConnect();
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline">Connect Wallet</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Connect Wallet</Dialog.Title>
        <Flex direction={"column"} gap={"4"}>
          {connectors.map((connector: Connector) => (
            <Button
              key={connector.id}
              onClick={() => connect({ connector })}
              disabled={!connector.available()}
            >
              Connect {connector.name}
            </Button>
          ))}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
