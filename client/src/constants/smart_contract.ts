import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('13feddf39ead0312f22d64ab591eb3457b6d258500b33dda29898f4b709cc9cc');

/** Client for an on-chain smart contract module with module reference '13feddf39ead0312f22d64ab591eb3457b6d258500b33dda29898f4b709cc9cc', can be used for instantiating new smart contract instances. */
class SmartContractModule {
    /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
    private __nominal = true;
    /** Generic module client used internally. */
    public readonly internalModuleClient: SDK.ModuleClient.Type;

    /** Constructor is only meant to be used internally in this module. Use functions such as `create` or `createUnchecked` for construction. */
    constructor(internalModuleClient: SDK.ModuleClient.Type) {
        this.internalModuleClient = internalModuleClient;
    }
}

/** Client for an on-chain smart contract module with module reference '13feddf39ead0312f22d64ab591eb3457b6d258500b33dda29898f4b709cc9cc', can be used for instantiating new smart contract instances. */
export type Type = SmartContractModule;

/**
 * Construct a SmartContractModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {SmartContractModule} A module client ensured to be deployed on chain.
 */
export async function create(grpcClient: SDK.ConcordiumGRPCClient): Promise<SmartContractModule> {
    const moduleClient = await SDK.ModuleClient.create(grpcClient, moduleReference);
    return new SmartContractModule(moduleClient);
}

/**
 * Construct a SmartContractModule client for interacting with a smart contract module on chain.
 * It is up to the caller to ensure the module is deployed on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The concordium node client to use.
 * @returns {SmartContractModule}
 */
export function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient): SmartContractModule {
    const moduleClient = SDK.ModuleClient.createUnchecked(grpcClient, moduleReference);
    return new SmartContractModule(moduleClient);
}

/**
 * Construct a SmartContractModule client for interacting with a smart contract module on chain.
 * This function ensures the smart contract module is deployed on chain.
 * @param {SmartContractModule} moduleClient - The client of the on-chain smart contract module with referecence '13feddf39ead0312f22d64ab591eb3457b6d258500b33dda29898f4b709cc9cc'.
 * @throws If failing to communicate with the concordium node or if the module reference is not present on chain.
 * @returns {SmartContractModule} A module client ensured to be deployed on chain.
 */
export function checkOnChain(moduleClient: SmartContractModule): Promise<void> {
    return SDK.ModuleClient.checkOnChain(moduleClient.internalModuleClient);
}

/**
 * Get the module source of the deployed smart contract module.
 * @param {SmartContractModule} moduleClient - The client of the on-chain smart contract module with referecence '13feddf39ead0312f22d64ab591eb3457b6d258500b33dda29898f4b709cc9cc'.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or module not found.
 * @returns {SDK.VersionedModuleSource} Module source of the deployed smart contract module.
 */
export function getModuleSource(moduleClient: SmartContractModule): Promise<SDK.VersionedModuleSource> {
    return SDK.ModuleClient.getModuleSource(moduleClient.internalModuleClient);
}
/** Parameter type transaction for instantiating a new 'smart_contract_wallet' smart contract instance. */
export type SmartContractWalletParameter = SDK.Parameter.Type;

/**
 * Send transaction for instantiating a new 'smart_contract_wallet' smart contract instance.
 * @param {SmartContractModule} moduleClient - The client of the on-chain smart contract module with referecence '13feddf39ead0312f22d64ab591eb3457b6d258500b33dda29898f4b709cc9cc'.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract module.
 * @param {SmartContractWalletParameter} parameter - Parameter to provide as part of the transaction for the instantiation of a new smart contract contract.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If failing to communicate with the concordium node.
 * @returns {SDK.TransactionHash.Type}
 */
export function instantiateSmartContractWallet(moduleClient: SmartContractModule, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SmartContractWalletParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return SDK.ModuleClient.createAndSendInitTransaction(
        moduleClient.internalModuleClient,
        SDK.ContractName.fromStringUnchecked('smart_contract_wallet'),
        transactionMetadata,
        parameter,
        signer
    );
}
