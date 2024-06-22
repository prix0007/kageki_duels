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

        // async makeParty(id1: bigint, id2: bigint, id3: bigint, id4: bigint): Promise<void> {
        //     try {
        //         await this.execute("make_party", [id1,
        //             id2,
        //             id3,
        //             id4])
        //     } catch (error) {
        //         console.error("Error executing makeParty:", error);
        //         throw error;
        //     }
        // }
        //
        // async createCharacter(player: string, randomness: string): Promise<void> {
        //     try {
        //         await this.execute("create_character", [player,
        //             randomness])
        //     } catch (error) {
        //         console.error("Error executing createCharacter:", error);
        //         throw error;
        //     }
        // }

    }
    return {
        player_actions: player_actions(),
    };
}
