import { Account, AccountInterface } from "starknet";
import { DojoProvider } from "@dojoengine/core";

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export interface MoveProps {
    account: Account | AccountInterface;
}

export async function setupWorld(provider: DojoProvider) {
    function player_actions() {
        const spawnPlayer = async ({ account }: { account: AccountInterface }) => {
            try {
                return await provider.execute(account, {
                    contractName: "actions",
                    entrypoint: "spawn_player",
                    calldata: [],
                });
            } catch (error) {
                console.error("Error executing spawn:", error);
                throw error;
            }
        }

        const createCharacter = async ({ account, randomness }: { account: AccountInterface, randomness: string }) => {
            try {
                return await provider.execute(account, {
                    contractName: "actions",
                    entrypoint: "create_character",
                    calldata: [account.address, randomness],
                });
            } catch (error) {
                console.error("Error executing spawn:", error);
                throw error;
            }
        }

        const createParty= async ({ account, ids }: { account: AccountInterface, ids: bigint[] }) => {
            try {
                return await provider.execute(account, {
                    contractName: "actions",
                    entrypoint: "make_party",
                    calldata: [...ids],
                });
            } catch (error) {
                console.error("Error executing spawn:", error);
                throw error;
            }
        }

        const toggleParty = async ({ account, id }: { account: AccountInterface, id: bigint }) => {
            try {
                return await provider.execute(account, {
                    contractName: "actions",
                    entrypoint: "make_party_toggle",
                    calldata: [id],
                });
            } catch (error) {
                console.error("Error executing spawn:", error);
                throw error;
            }
        }

        return { spawnPlayer, createCharacter, createParty, toggleParty }

    }

    function stage_actions() {
        const battleParties = async ({ 
            account, partyId1, partyId2, randomness 
        }: { account: AccountInterface, partyId1: bigint, partyId2: bigint, randomness: bigint   }) => {
            try {
                return await provider.execute(account, {
                    contractName: "actions",
                    entrypoint: "stage_creation_battle_maker",
                    calldata: [partyId1, partyId2, randomness],
                });
            } catch (error) {
                console.error("Error executing spawn:", error);
                throw error;
            }
        }

        return { battleParties }
    }
    return {
        player_actions: player_actions(),
        stage_actions: stage_actions(),
    };
}
