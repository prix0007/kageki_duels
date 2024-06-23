import { BurnerAccount, useBurnerManager } from "@dojoengine/create-burner";
import { ReactNode, createContext, useContext, useMemo } from "react";
import { Account } from "starknet";
import { ACCOUNTS, MASTER_ACCOUNT_ADDRESS, MASTER_PRIVATE_KEY, SetupResult } from "./generated/setup";
import { useAccount } from "@starknet-react/core";

interface DojoContextType extends SetupResult {
    masterAccount: Account;
    account: BurnerAccount;
}

export const DojoContext = createContext<DojoContextType | null>(null);

export const DojoProvider = ({
    children,
    value,
}: {
    children: ReactNode;
    value: SetupResult;
}) => {
    const currentValue = useContext(DojoContext);
    if (currentValue) throw new Error("DojoProvider can only be used once");

    const {
        config: { masterAddress, masterPrivateKey },
        dojoProvider,
    } = value;

    // const { account } = useAccount()

    const account = useMemo(() => {
        const random = ACCOUNTS[Math.floor((Math.random() * 1000) % 3)]
        const random_account = new Account(
            dojoProvider.provider,
            random.account,
            random.private,
            "1"
        )
        return random_account
    }, [dojoProvider.provider])

    const masterAccount = useMemo(
        () => {
            return new Account(
                dojoProvider.provider,
                MASTER_ACCOUNT_ADDRESS,
                MASTER_PRIVATE_KEY,
                "1"
            )
        },
        [masterAddress, masterPrivateKey, dojoProvider.provider]
    );


    return (
        <DojoContext.Provider
            value={{
                ...value,
                masterAccount,
                account: {
                    account: account ? account : masterAccount,
                },
            }}
        >
            {children}
        </DojoContext.Provider>
    );
};
