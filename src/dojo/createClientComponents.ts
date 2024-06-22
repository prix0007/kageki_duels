import { overridableComponent } from "@dojoengine/recs";
import { ContractComponents } from "./generated/contractComponents";

export type ClientComponents = ReturnType<typeof createClientComponents>;

export function createClientComponents({
    contractComponents,
}: {
    contractComponents: ContractComponents;
}) {
    return {
        ...contractComponents,
        Player: overridableComponent(contractComponents.Player),
        PlayerParty: overridableComponent(contractComponents.PlayerParty),
        Stage: overridableComponent(contractComponents.Stage),
        StageSettings: overridableComponent(contractComponents.StageSettings),
        Card: overridableComponent(contractComponents.Card),
        CardCount: overridableComponent(contractComponents.CardCount),
        Randomness: overridableComponent(contractComponents.Randomness),
    };
}
