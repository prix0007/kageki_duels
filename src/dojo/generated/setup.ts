import { getSyncEntities } from "@dojoengine/state";
import { DojoConfig, DojoProvider } from "@dojoengine/core";
import * as torii from "@dojoengine/torii-client";
import { createClientComponents } from "../createClientComponents";
import { createSystemCalls } from "../createSystemCalls";
import { defineContractComponents } from "./contractComponents";
import { world } from "./world";
import { setupWorld } from "./generated";
import { Account, RpcProvider, WeierstrassSignatureType } from "starknet";
import { BurnerManager } from "@dojoengine/create-burner";

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export const ACCOUNTS = [
    {
        "account": "0xb3ff441a68610b30fd5e2abbf3a1548eb6ba6f3559f2862bf2dc757e5828ca",
        "private": "0x2bbf4f9fd0bbb2e60b0316c1fe0b76cf7a4d0198bd493ced9b8df2a3a24d68a",
        "public": "0x640466ebd2ce505209d3e5c4494b4276ed8f1cde764d757eb48831961f7cdea",
    },{

        "account": "0xe29882a1fcba1e7e10cad46212257fea5c752a4f9b1b1ec683c503a2cf5c8a",
        "private": "0x14d6672dcb4b77ca36a887e9a11cd9d637d5012468175829e9c6e770c61642",
        "public": "0x16e375df37a7653038bd9eccd767e780c2c4d4c66b4c85f455236a3fd75673a",

    },{
        "account": "0x29873c310fbefde666dc32a1554fea6bb45eecc84f680f8a2b0a8fbb8cb89af",
        "private": "0xc5b2fcab997346f3ea1c00b002ecf6f382c5f9c9659a3894eb783c5320f912",
        "public": "0x33246ce85ebdc292e6a5c5b4dd51fab2757be34b8ffda847ca6925edf31cb67",

    },{
        "account": "0x2d71e9c974539bb3ffb4b115e66a23d0f62a641ea66c4016e903454c8753bbc",
        "private": "0x33003003001800009900180300d206308b0070db00121318d17b5e6262150b",
        "public": "0x4c0f884b8e5b4f00d97a3aad26b2e5de0c0c76a555060c837da2e287403c01d",
    },{

        "account": "0x3ebb4767aae1262f8eb28d9368db5388cfe367f50552a8244123506f0b0bcca",
        "private": "0x3e3979c1ed728490308054fe357a9f49cf67f80f9721f44cc57235129e090f4",
        "public": "0x1e8965b7d0b20b91a62fe515dd991dc9fcb748acddf6b2cf18cec3bdd0f9f9a",

    },{
        "account": "0x541da8f7f3ab8247329d22b3987d1ffb181bc8dc7f9611a6eccec3b0749a585",
        "private": "0x736adbbcdac7cc600f89051db1abbc16b9996b46f6b58a9752a11c1028a8ec8",
        "public": "0x570258e7277eb345ab80803c1dc5847591efd028916fc826bc7cd47ccd8f20d",

    },{
        "account": "0x56c155b624fdf6bfc94f7b37cf1dbebb5e186ef2e4ab2762367cd07c8f892a1",
        "private": "0x6bf3604bcb41fed6c42bcca5436eeb65083a982ff65db0dc123f65358008b51",
        "public": "0x4b076e402835913e3f6812ed28cef8b757d4643ebf2714471a387cb10f22be3",

    },{
        "account": "0x6162896d1d7ab204c7ccac6dd5f8e9e7c25ecd5ae4fcb4ad32e57786bb46e03",
        "private": "0x1800000000300000180000000000030000000000003006001800006600",
        "public": "0x2b191c2f3ecf685a91af7cf72a43e7b90e2e41220175de5c4f7498981b10053",

    },{
        "account": "0x66efb28ac62686966ae85095ff3a772e014e7fbf56d4c5f6fac5606d4dde23a",
        "private": "0x283d1e73776cd4ac1ac5f0b879f561bded25eceb2cc589c674af0cec41df441",
        "public": "0x73c8a29ba0e6a368422d0551b3f45a30a27166b809ba07a41a1bc434b000ba7",

    },{
        "account": "0x6b86e40118f29ebe393a75469b4d926c7a44c2e2681b6d319520b7c1156d114",
        "private": "0x1c9053c053edf324aec366a34c6901b1095b07af69495bffec7d7fe21effb1b",
        "public": "0x4c339f18b9d1b95b64a6d378abd1480b2e0d5d5bd33cd0828cbce4d65c27284",
    }
] 

// export const RPC_URL = "https://api.cartridge.gg/x/kageki/katana";
// export const TORII_URL = "https://api.cartridge.gg/x/kageki/torii";
//
// export const MASTER_ACCOUNT_ADDRESS = "0x2ea5a09a95ee73556a3ef6420c11a8df775fe4f06e58fd9f7a21b5d99e0b5ea"
// export const MASTER_PRIVATE_KEY = "0x18055e629284db77daa8d60e4ca767d65807c3f1690785006e46d6e63a13d54"
// export const WORLD_ADDRESS = "0x21fc8b30c72425f7dcdc97f39e8db73a27e131018ae3f031c3394101354ea8c"  

export const RPC_URL = "http://localhost:5050";
export const TORII_URL = "http://localhost:8080";

export const MASTER_ACCOUNT_ADDRESS = ACCOUNTS[0].account 
export const MASTER_PRIVATE_KEY = ACCOUNTS[0].private
export const WORLD_ADDRESS = "0x21fc8b30c72425f7dcdc97f39e8db73a27e131018ae3f031c3394101354ea8c"  


export async function setup({ ...config }: DojoConfig) {
    // torii client
    const toriiClient = await torii.createClient([], {
        rpcUrl: RPC_URL,
        toriiUrl: TORII_URL,
        relayUrl: "",
        worldAddress: config.manifest.world.address || "",
    });

    // create contract components
    const contractComponents = defineContractComponents(world);

    // create client components
    const clientComponents = createClientComponents({ contractComponents });

    // fetch all existing entities from torii
    const sync = await getSyncEntities(
        toriiClient,
        contractComponents as any,
        []
    );

    // create dojo provider
    const dojoProvider = new DojoProvider(config.manifest, RPC_URL);

    // setup world
    const client = await setupWorld(dojoProvider);

    // create burner manager
    // const burnerManager = new BurnerManager({
    //     masterAccount: new Account(
    //         {
    //             nodeProvider: RPC_URL,
    //         },
    //         config.masterAddress,
    //         config.masterPrivateKey
    //     ),
    //     accountClassHash: config.accountClassHash,
    //     rpcProvider: dojoProvider.provider,
    //     feeTokenAddress: config.feeTokenAddress,
    // });

    // try {
    //     await burnerManager.init();
    //     if (burnerManager.list().length === 0) {
    //         await burnerManager.create();
    //     }
    // } catch (e) {
    //     console.error(e);
    // }

    return {
        client,
        clientComponents,
        contractComponents,
        systemCalls: createSystemCalls(
            { client },
            contractComponents,
            clientComponents
        ),
        publish: (typedData: string, signature: WeierstrassSignatureType) => {
            toriiClient.publishMessage(typedData, {
                r: signature.r.toString(),
                s: signature.s.toString(),
            });
        },
        config,
        dojoProvider,
        toriiClient,
        sync,
    };
}
