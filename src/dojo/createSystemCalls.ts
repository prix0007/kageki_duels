import { AccountInterface } from "starknet";
import { ClientComponents } from "./createClientComponents";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

function randomIntFromInterval(min: number, max: number) { // min and max included 
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

    const battleParties = async (account: AccountInterface, p1: bigint,  partyId1: bigint, p2: bigint, partyId2: bigint) => {
        const random = randomIntFromInterval(1, 10000000);
        try {
            const { transaction_hash } = await client.stage_actions.battleParties({
                account,
                p1,
                partyId1,
                p2,
                partyId2,
                randomness: BigInt(random)
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
        toggleParty,
        battleParties
    };
}
