import { AccountInterface } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { ClientComponents } from "./createClientComponents";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createSystemCalls(
    { client }: { client: IWorld },
    _contractComponents: ContractComponents,
    { PlayerParty, Player, Stage, StageSettings, Card, CardCount, Randomness }: ClientComponents
) {
    const spawnPlayer = async (account: AccountInterface) => {
        try {
            const { transaction_hash } = await client.player_actions.spawnPlayer({
                account,
            });

            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 100,
                })
            );

            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    const createCharacter = async (account: AccountInterface) => {
        const random = randomIntFromInterval(1, 1000);
        try {
            const { transaction_hash } = await client.player_actions.createCharacter({
                account,
                randomness: random.toString()
            });

            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 1000,
                })
            );

            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    const createParty = async (account: AccountInterface,  ids: bigint[]) => {
        try {
            const { transaction_hash } = await client.player_actions.createParty({
                account,
                ids
            });

            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 1000,
                })
            );

            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    const toggleParty = async (account: AccountInterface,  party_id: bigint) => {
        try {
            const { transaction_hash } = await client.player_actions.toggleParty({
                account,
                id: party_id
            });

            console.log(
                await account.waitForTransaction(transaction_hash, {
                    retryInterval: 1000,
                })
            );

            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (e) {
            console.log(e);
        }
    };

    return {
        spawnPlayer,
        createCharacter,
        createParty,
        toggleParty
    };
}
