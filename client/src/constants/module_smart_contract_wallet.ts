import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('7e2ba56e16e84e85b25efe1ac4b84dd5f69debdaa267e70662b016cb4582071d');
/** Name of the smart contract supported by this client. */
export const contractName: SDK.ContractName.Type = /*#__PURE__*/ SDK.ContractName.fromStringUnchecked('smart_contract_wallet');

/** Smart contract client for a contract instance on chain. */
class SmartContractWalletContract {
    /** Having a private field prevents similar structured objects to be considered the same type (similar to nominal typing). */
    private __nominal = true;
    /** The gRPC connection used by this client. */
    public readonly grpcClient: SDK.ConcordiumGRPCClient;
    /** The contract address used by this client. */
    public readonly contractAddress: SDK.ContractAddress.Type;
    /** Generic contract client used internally. */
    public readonly genericContract: SDK.Contract;

    constructor(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, genericContract: SDK.Contract) {
        this.grpcClient = grpcClient;
        this.contractAddress = contractAddress;
        this.genericContract = genericContract;
    }
}

/** Smart contract client for a contract instance on chain. */
export type Type = SmartContractWalletContract;

/**
 * Construct an instance of `SmartContractWalletContract` for interacting with a 'smart_contract_wallet' contract on chain.
 * Checking the information instance on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @param {SDK.BlockHash.Type} [blockHash] - Hash of the block to check the information at. When not provided the last finalized block is used.
 * @throws If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SmartContractWalletContract}
 */
export async function create(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type, blockHash?: SDK.BlockHash.Type): Promise<SmartContractWalletContract> {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    await genericContract.checkOnChain({ moduleReference: moduleReference, blockHash: blockHash });
    return new SmartContractWalletContract(
        grpcClient,
        contractAddress,
        genericContract
    );
}

/**
 * Construct the `SmartContractWalletContract` for interacting with a 'smart_contract_wallet' contract on chain.
 * Without checking the instance information on chain.
 * @param {SDK.ConcordiumGRPCClient} grpcClient - The client used for contract invocations and updates.
 * @param {SDK.ContractAddress.Type} contractAddress - Address of the contract instance.
 * @returns {SmartContractWalletContract}
 */
export function createUnchecked(grpcClient: SDK.ConcordiumGRPCClient, contractAddress: SDK.ContractAddress.Type): SmartContractWalletContract {
    const genericContract = new SDK.Contract(grpcClient, contractAddress, contractName);
    return new SmartContractWalletContract(
        grpcClient,
        contractAddress,
        genericContract,
    );
}

/**
 * Check if the smart contract instance exists on the blockchain and whether it uses a matching contract name and module reference.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.BlockHash.Type} [blockHash] A optional block hash to use for checking information on chain, if not provided the last finalized will be used.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 */
export function checkOnChain(contractClient: SmartContractWalletContract, blockHash?: SDK.BlockHash.Type): Promise<void> {
    return contractClient.genericContract.checkOnChain({moduleReference: moduleReference, blockHash: blockHash });
}
/** Parameter type  used in update transaction for 'depositCcd' entrypoint of the 'smart_contract_wallet' contract. */
export type DepositCcdParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'depositCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {DepositCcdParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendDepositCcd(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: DepositCcdParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('depositCcd'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'depositCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {DepositCcdParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunDepositCcd(contractClient: SmartContractWalletContract, parameter: DepositCcdParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('depositCcd'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type DepositCis2TokensParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {DepositCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendDepositCis2Tokens(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: DepositCis2TokensParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('depositCis2Tokens'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {DepositCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunDepositCis2Tokens(contractClient: SmartContractWalletContract, parameter: DepositCis2TokensParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('depositCis2Tokens'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type GetCcdWithdrawMessageHashParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetCcdWithdrawMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetCcdWithdrawMessageHash(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetCcdWithdrawMessageHashParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('getCcdWithdrawMessageHash'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetCcdWithdrawMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetCcdWithdrawMessageHash(contractClient: SmartContractWalletContract, parameter: GetCcdWithdrawMessageHashParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('getCcdWithdrawMessageHash'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type GetCis2WithdrawMessageHashParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetCis2WithdrawMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetCis2WithdrawMessageHash(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetCis2WithdrawMessageHashParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('getCis2WithdrawMessageHash'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetCis2WithdrawMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetCis2WithdrawMessageHash(contractClient: SmartContractWalletContract, parameter: GetCis2WithdrawMessageHashParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('getCis2WithdrawMessageHash'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'withdrawCcd' entrypoint of the 'smart_contract_wallet' contract. */
export type WithdrawCcdParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'withdrawCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {WithdrawCcdParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendWithdrawCcd(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: WithdrawCcdParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('withdrawCcd'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'withdrawCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {WithdrawCcdParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunWithdrawCcd(contractClient: SmartContractWalletContract, parameter: WithdrawCcdParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('withdrawCcd'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type WithdrawCis2TokensParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {WithdrawCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendWithdrawCis2Tokens(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: WithdrawCis2TokensParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('withdrawCis2Tokens'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {WithdrawCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunWithdrawCis2Tokens(contractClient: SmartContractWalletContract, parameter: WithdrawCis2TokensParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('withdrawCis2Tokens'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type GetCcdTransferMessageHashParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetCcdTransferMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetCcdTransferMessageHash(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetCcdTransferMessageHashParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('getCcdTransferMessageHash'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetCcdTransferMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetCcdTransferMessageHash(contractClient: SmartContractWalletContract, parameter: GetCcdTransferMessageHashParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('getCcdTransferMessageHash'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type GetCis2TransferMessageHashParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {GetCis2TransferMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendGetCis2TransferMessageHash(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: GetCis2TransferMessageHashParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('getCis2TransferMessageHash'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {GetCis2TransferMessageHashParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunGetCis2TransferMessageHash(contractClient: SmartContractWalletContract, parameter: GetCis2TransferMessageHashParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('getCis2TransferMessageHash'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'transferCcd' entrypoint of the 'smart_contract_wallet' contract. */
export type TransferCcdParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'transferCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {TransferCcdParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendTransferCcd(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: TransferCcdParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('transferCcd'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'transferCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {TransferCcdParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunTransferCcd(contractClient: SmartContractWalletContract, parameter: TransferCcdParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('transferCcd'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'transferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type TransferCis2TokensParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'transferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {TransferCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendTransferCis2Tokens(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: TransferCis2TokensParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('transferCis2Tokens'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'transferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {TransferCis2TokensParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunTransferCis2Tokens(contractClient: SmartContractWalletContract, parameter: TransferCis2TokensParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('transferCis2Tokens'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract. */
export type SetImplementorsParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'setImplementors' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SetImplementorsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSetImplementors(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SetImplementorsParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('setImplementors'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'setImplementors' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SetImplementorsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSetImplementors(contractClient: SmartContractWalletContract, parameter: SetImplementorsParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('setImplementors'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract. */
export type SupportsParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendSupports(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: SupportsParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('supports'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {SupportsParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunSupports(contractClient: SmartContractWalletContract, parameter: SupportsParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('supports'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type CcdBalanceOfParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {CcdBalanceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendCcdBalanceOf(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: CcdBalanceOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('ccdBalanceOf'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {CcdBalanceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunCcdBalanceOf(contractClient: SmartContractWalletContract, parameter: CcdBalanceOfParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('ccdBalanceOf'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type Cis2BalanceOfParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {Cis2BalanceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendCis2BalanceOf(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: Cis2BalanceOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('cis2BalanceOf'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {Cis2BalanceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunCis2BalanceOf(contractClient: SmartContractWalletContract, parameter: Cis2BalanceOfParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('cis2BalanceOf'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract. */
export type CcdBalanceOfAccountParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {CcdBalanceOfAccountParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendCcdBalanceOfAccount(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: CcdBalanceOfAccountParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('ccdBalanceOfAccount'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {CcdBalanceOfAccountParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunCcdBalanceOfAccount(contractClient: SmartContractWalletContract, parameter: CcdBalanceOfAccountParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('ccdBalanceOfAccount'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract. */
export type Cis2BalanceOfAccountParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {Cis2BalanceOfAccountParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendCis2BalanceOfAccount(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: Cis2BalanceOfAccountParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('cis2BalanceOfAccount'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {Cis2BalanceOfAccountParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunCis2BalanceOfAccount(contractClient: SmartContractWalletContract, parameter: Cis2BalanceOfAccountParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('cis2BalanceOfAccount'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
/** Parameter type  used in update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type NonceOfParameter = SDK.Parameter.Type;

/**
 * Send an update-contract transaction to the 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractTransactionMetadata} transactionMetadata - Metadata related to constructing a transaction for a smart contract.
 * @param {NonceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.AccountSigner} signer - The signer of the update contract transaction.
 * @throws If the entrypoint is not successfully invoked.
 * @returns {SDK.TransactionHash.Type} Hash of the transaction.
 */
export function sendNonceOf(contractClient: SmartContractWalletContract, transactionMetadata: SDK.ContractTransactionMetadata, parameter: NonceOfParameter, signer: SDK.AccountSigner): Promise<SDK.TransactionHash.Type> {
    return contractClient.genericContract.createAndSendUpdateTransaction(
        SDK.EntrypointName.fromStringUnchecked('nonceOf'),
        SDK.Parameter.toBuffer,
        transactionMetadata,
        parameter,
        signer
    );
}

/**
 * Dry-run an update-contract transaction to the 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SmartContractWalletContract} contractClient The client for a 'smart_contract_wallet' smart contract instance on chain.
 * @param {SDK.ContractAddress.Type | SDK.AccountAddress.Type} invokeMetadata - The address of the account or contract which is invoking this transaction.
 * @param {NonceOfParameter} parameter - Parameter to provide the smart contract entrypoint as part of the transaction.
 * @param {SDK.BlockHash.Type} [blockHash] - Optional block hash allowing for dry-running the transaction at the end of a specific block.
 * @throws {SDK.RpcError} If failing to communicate with the concordium node or if any of the checks fails.
 * @returns {SDK.InvokeContractResult} The result of invoking the smart contract instance.
 */
export function dryRunNonceOf(contractClient: SmartContractWalletContract, parameter: NonceOfParameter, invokeMetadata: SDK.ContractInvokeMetadata = {}, blockHash?: SDK.BlockHash.Type): Promise<SDK.InvokeContractResult> {
    return contractClient.genericContract.dryRun.invokeMethod(
        SDK.EntrypointName.fromStringUnchecked('nonceOf'),
        invokeMetadata,
        SDK.Parameter.toBuffer,
        parameter,
        blockHash
    );
}
