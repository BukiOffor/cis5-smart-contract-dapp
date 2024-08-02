import * as SDK from "@concordium/web-sdk";
/** The reference of the smart contract module supported by the provided client. */
export const moduleReference: SDK.ModuleReference.Type = /*#__PURE__*/ SDK.ModuleReference.fromHexString('13feddf39ead0312f22d64ab591eb3457b6d258500b33dda29898f4b709cc9cc');
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

/** Contract event type for the 'smart_contract_wallet' contract. */
export type Event = { type: 'TransferCis2Tokens', content: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    from: SDK.HexString,
    to: SDK.HexString,
    } } | { type: 'TransferCcd', content: {
    ccd_amount: SDK.CcdAmount.Type,
    from: SDK.HexString,
    to: SDK.HexString,
    } } | { type: 'WithdrawCis2Tokens', content: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    from: SDK.HexString,
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'WithdrawCcd', content: {
    ccd_amount: SDK.CcdAmount.Type,
    from: SDK.HexString,
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'DepositCis2Tokens', content: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    to: SDK.HexString,
    } } | { type: 'DepositCcd', content: {
    ccd_amount: SDK.CcdAmount.Type,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    to: SDK.HexString,
    } } | { type: 'Nonce', content: {
    nonce: number | bigint,
    public_key: SDK.HexString,
    } };

/**
 * Parse the contract events logged by the 'smart_contract_wallet' contract.
 * @param {SDK.ContractEvent.Type} event The unparsed contract event.
 * @returns {Event} The structured contract event.
 */
export function parseEvent(event: SDK.ContractEvent.Type): Event {
    const schemaJson = <{'TransferCis2Tokens' : [{
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    from: string,
    to: string,
    }] } | {'TransferCcd' : [{
    ccd_amount: SDK.CcdAmount.SchemaValue,
    from: string,
    to: string,
    }] } | {'WithdrawCis2Tokens' : [{
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    from: string,
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    }] } | {'WithdrawCcd' : [{
    ccd_amount: SDK.CcdAmount.SchemaValue,
    from: string,
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    }] } | {'DepositCis2Tokens' : [{
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    from: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    to: string,
    }] } | {'DepositCcd' : [{
    ccd_amount: SDK.CcdAmount.SchemaValue,
    from: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    to: string,
    }] } | {'Nonce' : [{
    nonce: bigint,
    public_key: string,
    }] }>SDK.ContractEvent.parseWithSchemaTypeBase64(event, 'HwcAAAD0EgAAAFRyYW5zZmVyQ2lzMlRva2VucwEBAAAAFAAFAAAADAAAAHRva2VuX2Ftb3VudBslAAAACAAAAHRva2VuX2lkHQAbAAAAY2lzMl90b2tlbl9jb250cmFjdF9hZGRyZXNzDAQAAABmcm9tHiAAAAACAAAAdG8eIAAAAPULAAAAVHJhbnNmZXJDY2QBAQAAABQAAwAAAAoAAABjY2RfYW1vdW50CgQAAABmcm9tHiAAAAACAAAAdG8eIAAAAPYSAAAAV2l0aGRyYXdDaXMyVG9rZW5zAQEAAAAUAAUAAAAMAAAAdG9rZW5fYW1vdW50GyUAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MMBAAAAGZyb20eIAAAAAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAz3CwAAAFdpdGhkcmF3Q2NkAQEAAAAUAAMAAAAKAAAAY2NkX2Ftb3VudAoEAAAAZnJvbR4gAAAAAgAAAHRvFQIAAAAHAAAAQWNjb3VudAEBAAAACwgAAABDb250cmFjdAEBAAAADPgRAAAARGVwb3NpdENpczJUb2tlbnMBAQAAABQABQAAAAwAAAB0b2tlbl9hbW91bnQbJQAAAAgAAAB0b2tlbl9pZB0AGwAAAGNpczJfdG9rZW5fY29udHJhY3RfYWRkcmVzcwwEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwCAAAAdG8eIAAAAPkKAAAARGVwb3NpdENjZAEBAAAAFAADAAAACgAAAGNjZF9hbW91bnQKBAAAAGZyb20VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQEAAAAMAgAAAHRvHiAAAAD6BQAAAE5vbmNlAQEAAAAUAAIAAAAFAAAAbm9uY2UFCgAAAHB1YmxpY19rZXkeIAAAAA==');
    let match3: { type: 'TransferCis2Tokens', content: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    from: SDK.HexString,
    to: SDK.HexString,
    } } | { type: 'TransferCcd', content: {
    ccd_amount: SDK.CcdAmount.Type,
    from: SDK.HexString,
    to: SDK.HexString,
    } } | { type: 'WithdrawCis2Tokens', content: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    from: SDK.HexString,
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'WithdrawCcd', content: {
    ccd_amount: SDK.CcdAmount.Type,
    from: SDK.HexString,
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    } } | { type: 'DepositCis2Tokens', content: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    to: SDK.HexString,
    } } | { type: 'DepositCcd', content: {
    ccd_amount: SDK.CcdAmount.Type,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    to: SDK.HexString,
    } } | { type: 'Nonce', content: {
    nonce: number | bigint,
    public_key: SDK.HexString,
    } };
    if ('TransferCis2Tokens' in schemaJson) {
       const variant4 = schemaJson.TransferCis2Tokens;
    const field5 = variant4[0].token_amount;
    const leb0 = BigInt(field5);
    const field6 = variant4[0].token_id;
    const field7 = variant4[0].cis2_token_contract_address;
    const contractAddress8 = SDK.ContractAddress.fromSchemaValue(field7);
    const field9 = variant4[0].from;
    const field10 = variant4[0].to;
    const named11 = {
    token_amount: leb0,
    token_id: field6,
    cis2_token_contract_address: contractAddress8,
    from: field9,
    to: field10,
    };
       match3 = {
           type: 'TransferCis2Tokens',
           content: named11,
       };
    } else if ('TransferCcd' in schemaJson) {
       const variant12 = schemaJson.TransferCcd;
    const field13 = variant12[0].ccd_amount;
    const amount14 = SDK.CcdAmount.fromSchemaValue(field13);
    const field15 = variant12[0].from;
    const field16 = variant12[0].to;
    const named17 = {
    ccd_amount: amount14,
    from: field15,
    to: field16,
    };
       match3 = {
           type: 'TransferCcd',
           content: named17,
       };
    } else if ('WithdrawCis2Tokens' in schemaJson) {
       const variant18 = schemaJson.WithdrawCis2Tokens;
    const field19 = variant18[0].token_amount;
    const leb1 = BigInt(field19);
    const field20 = variant18[0].token_id;
    const field21 = variant18[0].cis2_token_contract_address;
    const contractAddress22 = SDK.ContractAddress.fromSchemaValue(field21);
    const field23 = variant18[0].from;
    const field24 = variant18[0].to;
    let match25: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field24) {
       const variant26 = field24.Account;
    const accountAddress27 = SDK.AccountAddress.fromSchemaValue(variant26[0]);
       match25 = {
           type: 'Account',
           content: accountAddress27,
       };
    } else if ('Contract' in field24) {
       const variant28 = field24.Contract;
    const contractAddress29 = SDK.ContractAddress.fromSchemaValue(variant28[0]);
       match25 = {
           type: 'Contract',
           content: contractAddress29,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named30 = {
    token_amount: leb1,
    token_id: field20,
    cis2_token_contract_address: contractAddress22,
    from: field23,
    to: match25,
    };
       match3 = {
           type: 'WithdrawCis2Tokens',
           content: named30,
       };
    } else if ('WithdrawCcd' in schemaJson) {
       const variant31 = schemaJson.WithdrawCcd;
    const field32 = variant31[0].ccd_amount;
    const amount33 = SDK.CcdAmount.fromSchemaValue(field32);
    const field34 = variant31[0].from;
    const field35 = variant31[0].to;
    let match36: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field35) {
       const variant37 = field35.Account;
    const accountAddress38 = SDK.AccountAddress.fromSchemaValue(variant37[0]);
       match36 = {
           type: 'Account',
           content: accountAddress38,
       };
    } else if ('Contract' in field35) {
       const variant39 = field35.Contract;
    const contractAddress40 = SDK.ContractAddress.fromSchemaValue(variant39[0]);
       match36 = {
           type: 'Contract',
           content: contractAddress40,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const named41 = {
    ccd_amount: amount33,
    from: field34,
    to: match36,
    };
       match3 = {
           type: 'WithdrawCcd',
           content: named41,
       };
    } else if ('DepositCis2Tokens' in schemaJson) {
       const variant42 = schemaJson.DepositCis2Tokens;
    const field43 = variant42[0].token_amount;
    const leb2 = BigInt(field43);
    const field44 = variant42[0].token_id;
    const field45 = variant42[0].cis2_token_contract_address;
    const contractAddress46 = SDK.ContractAddress.fromSchemaValue(field45);
    const field47 = variant42[0].from;
    let match48: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field47) {
       const variant49 = field47.Account;
    const accountAddress50 = SDK.AccountAddress.fromSchemaValue(variant49[0]);
       match48 = {
           type: 'Account',
           content: accountAddress50,
       };
    } else if ('Contract' in field47) {
       const variant51 = field47.Contract;
    const contractAddress52 = SDK.ContractAddress.fromSchemaValue(variant51[0]);
       match48 = {
           type: 'Contract',
           content: contractAddress52,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field53 = variant42[0].to;
    const named54 = {
    token_amount: leb2,
    token_id: field44,
    cis2_token_contract_address: contractAddress46,
    from: match48,
    to: field53,
    };
       match3 = {
           type: 'DepositCis2Tokens',
           content: named54,
       };
    } else if ('DepositCcd' in schemaJson) {
       const variant55 = schemaJson.DepositCcd;
    const field56 = variant55[0].ccd_amount;
    const amount57 = SDK.CcdAmount.fromSchemaValue(field56);
    const field58 = variant55[0].from;
    let match59: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type };
    if ('Account' in field58) {
       const variant60 = field58.Account;
    const accountAddress61 = SDK.AccountAddress.fromSchemaValue(variant60[0]);
       match59 = {
           type: 'Account',
           content: accountAddress61,
       };
    } else if ('Contract' in field58) {
       const variant62 = field58.Contract;
    const contractAddress63 = SDK.ContractAddress.fromSchemaValue(variant62[0]);
       match59 = {
           type: 'Contract',
           content: contractAddress63,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    const field64 = variant55[0].to;
    const named65 = {
    ccd_amount: amount57,
    from: match59,
    to: field64,
    };
       match3 = {
           type: 'DepositCcd',
           content: named65,
       };
    } else if ('Nonce' in schemaJson) {
       const variant66 = schemaJson.Nonce;
    const field67 = variant66[0].nonce;
    const field68 = variant66[0].public_key;
    const named69 = {
    nonce: field67,
    public_key: field68,
    };
       match3 = {
           type: 'Nonce',
           content: named69,
       };
    }
     else {
       throw new Error("Unexpected enum variant");
    }
    return match3;
}
/** Base64 encoding of the parameter schema type for update transactions to 'depositCcd' entrypoint of the 'smart_contract_wallet' contract. */
const base64DepositCcdParameterSchema = 'HiAAAAA=';
/** Parameter JSON type needed by the schema for update transaction for 'depositCcd' entrypoint of the 'smart_contract_wallet' contract. */
type DepositCcdParameterSchemaJson = string;
/** Parameter type for update transaction for 'depositCcd' entrypoint of the 'smart_contract_wallet' contract. */
export type DepositCcdParameter = SDK.HexString;

/**
 * Construct schema JSON representation used in update transaction for 'depositCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {DepositCcdParameter} parameter The structured parameter to construct from.
 * @returns {DepositCcdParameterSchemaJson} The smart contract parameter JSON.
 */
function createDepositCcdParameterSchemaJson(parameter: DepositCcdParameter): DepositCcdParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'depositCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {DepositCcdParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createDepositCcdParameter(parameter: DepositCcdParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64DepositCcdParameterSchema, createDepositCcdParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'depositCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {DepositCcdParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createDepositCcdParameterWebWallet(parameter: DepositCcdParameter) {
    return {
        parameters: createDepositCcdParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64DepositCcdParameterSchema, 'base64')
        },
    }
}

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
        createDepositCcdParameter(parameter),
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
        createDepositCcdParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'depositCcd' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageDepositCcd = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'depositCcd' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageDepositCcd | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageDepositCcd(invokeResult: SDK.InvokeContractResult): ErrorMessageDepositCcd | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match70: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match70 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match70 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match70 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match70 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match70 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match70 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match70 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match70 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match70 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match70 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match70 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match70
}
/** Base64 encoding of the parameter schema type for update transactions to 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
const base64DepositCis2TokensParameterSchema = 'FAAEAAAACAAAAHRva2VuX2lkHQAGAAAAYW1vdW50GyUAAAAEAAAAZnJvbRUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAQAAAAwEAAAAZGF0YR4gAAAA';
/** Parameter JSON type needed by the schema for update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
type DepositCis2TokensParameterSchemaJson = {
    token_id: string,
    amount: string,
    from: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] },
    data: string,
    };
/** Parameter type for update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type DepositCis2TokensParameter = {
    token_id: SDK.HexString,
    amount: number | bigint,
    from: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: SDK.ContractAddress.Type },
    data: SDK.HexString,
    };

/**
 * Construct schema JSON representation used in update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {DepositCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {DepositCis2TokensParameterSchemaJson} The smart contract parameter JSON.
 */
function createDepositCis2TokensParameterSchemaJson(parameter: DepositCis2TokensParameter): DepositCis2TokensParameterSchemaJson {
    const field84 = parameter.token_id;
    const field85 = parameter.amount;
    const leb82 = BigInt(field85).toString();
    const field86 = parameter.from;
    let match87: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue] };
    switch (field86.type) {
        case 'Account':
    const accountAddress88 = SDK.AccountAddress.toSchemaValue(field86.content);
            match87 = { Account: [accountAddress88], };
        break;
        case 'Contract':
    const contractAddress89 = SDK.ContractAddress.toSchemaValue(field86.content);
            match87 = { Contract: [contractAddress89], };
        break;
    }

    const field90 = parameter.data;
    const named83 = {
    token_id: field84,
    amount: leb82,
    from: match87,
    data: field90,
    };
    return named83;
}

/**
 * Construct Parameter type used in update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {DepositCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createDepositCis2TokensParameter(parameter: DepositCis2TokensParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64DepositCis2TokensParameterSchema, createDepositCis2TokensParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {DepositCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createDepositCis2TokensParameterWebWallet(parameter: DepositCis2TokensParameter) {
    return {
        parameters: createDepositCis2TokensParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64DepositCis2TokensParameterSchema, 'base64')
        },
    }
}

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
        createDepositCis2TokensParameter(parameter),
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
        createDepositCis2TokensParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageDepositCis2Tokens = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'depositCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageDepositCis2Tokens | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageDepositCis2Tokens(invokeResult: SDK.InvokeContractResult): ErrorMessageDepositCis2Tokens | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match91: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match91 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match91 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match91 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match91 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match91 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match91 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match91 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match91 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match91 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match91 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match91 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match91
}
/** Base64 encoding of the parameter schema type for update transactions to 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
const base64GetCcdWithdrawMessageHashParameterSchema = 'FAAGAAAACwAAAGVudHJ5X3BvaW50FgELAAAAZXhwaXJ5X3RpbWUNBQAAAG5vbmNlBRUAAABzZXJ2aWNlX2ZlZV9yZWNpcGllbnQeIAAAABIAAABzZXJ2aWNlX2ZlZV9hbW91bnQKEAAAAHNpbXBsZV93aXRoZHJhd3MQARQAAwAAAAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQ8AAAB3aXRoZHJhd19hbW91bnQKBAAAAGRhdGEdAQ==';
/** Parameter JSON type needed by the schema for update transaction for 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
type GetCcdWithdrawMessageHashParameterSchemaJson = {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: SDK.CcdAmount.SchemaValue,
    simple_withdraws: Array<{
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] },
    withdraw_amount: SDK.CcdAmount.SchemaValue,
    data: string,
    }>,
    };
/** Parameter type for update transaction for 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type GetCcdWithdrawMessageHashParameter = {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: SDK.CcdAmount.Type,
    simple_withdraws: Array<{
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: [SDK.ContractAddress.Type, string] },
    withdraw_amount: SDK.CcdAmount.Type,
    data: SDK.HexString,
    }>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {GetCcdWithdrawMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {GetCcdWithdrawMessageHashParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetCcdWithdrawMessageHashParameterSchemaJson(parameter: GetCcdWithdrawMessageHashParameter): GetCcdWithdrawMessageHashParameterSchemaJson {
    const field104 = parameter.entry_point;
    const field105 = parameter.expiry_time;
    const timestamp106 = SDK.Timestamp.toSchemaValue(field105);
    const field107 = parameter.nonce;
    const number108 = BigInt(field107);
    const field109 = parameter.service_fee_recipient;
    const field110 = parameter.service_fee_amount;
    const amount111 = SDK.CcdAmount.toSchemaValue(field110);
    const field112 = parameter.simple_withdraws;
    const list113 = field112.map((item114) => {
    const field116 = item114.to;
    let match117: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] };
    switch (field116.type) {
        case 'Account':
    const accountAddress118 = SDK.AccountAddress.toSchemaValue(field116.content);
            match117 = { Account: [accountAddress118], };
        break;
        case 'Contract':
    const contractAddress120 = SDK.ContractAddress.toSchemaValue(field116.content[0]);
    const unnamed119: [SDK.ContractAddress.SchemaValue, string] = [contractAddress120, field116.content[1]];
            match117 = { Contract: unnamed119, };
        break;
    }

    const field121 = item114.withdraw_amount;
    const amount122 = SDK.CcdAmount.toSchemaValue(field121);
    const field123 = item114.data;
    const named115 = {
    to: match117,
    withdraw_amount: amount122,
    data: field123,
    };
    return named115;
    });
    const named103 = {
    entry_point: field104,
    expiry_time: timestamp106,
    nonce: number108,
    service_fee_recipient: field109,
    service_fee_amount: amount111,
    simple_withdraws: list113,
    };
    return named103;
}

/**
 * Construct Parameter type used in update transaction for 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {GetCcdWithdrawMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetCcdWithdrawMessageHashParameter(parameter: GetCcdWithdrawMessageHashParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64GetCcdWithdrawMessageHashParameterSchema, createGetCcdWithdrawMessageHashParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {GetCcdWithdrawMessageHashParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetCcdWithdrawMessageHashParameterWebWallet(parameter: GetCcdWithdrawMessageHashParameter) {
    return {
        parameters: createGetCcdWithdrawMessageHashParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64GetCcdWithdrawMessageHashParameterSchema, 'base64')
        },
    }
}

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
        createGetCcdWithdrawMessageHashParameter(parameter),
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
        createGetCcdWithdrawMessageHashParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueGetCcdWithdrawMessageHash = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

/**
 * Get and parse the return value from dry-running update transaction for 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetCcdWithdrawMessageHash | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueGetCcdWithdrawMessageHash(invokeResult: SDK.InvokeContractResult): ReturnValueGetCcdWithdrawMessageHash | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageGetCcdWithdrawMessageHash = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'getCcdWithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetCcdWithdrawMessageHash | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageGetCcdWithdrawMessageHash(invokeResult: SDK.InvokeContractResult): ErrorMessageGetCcdWithdrawMessageHash | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match126: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match126 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match126 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match126 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match126 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match126 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match126 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match126 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match126 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match126 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match126 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match126 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match126
}
/** Base64 encoding of the parameter schema type for update transactions to 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
const base64GetCis2WithdrawMessageHashParameterSchema = 'FAAGAAAACwAAAGVudHJ5X3BvaW50FgELAAAAZXhwaXJ5X3RpbWUNBQAAAG5vbmNlBRUAAABzZXJ2aWNlX2ZlZV9yZWNpcGllbnQeIAAAABIAAABzZXJ2aWNlX2ZlZV9hbW91bnQUAAMAAAAMAAAAdG9rZW5fYW1vdW50GyUAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MMEAAAAHNpbXBsZV93aXRoZHJhd3MQARQAAwAAAAIAAAB0bxUCAAAABwAAAEFjY291bnQBAQAAAAsIAAAAQ29udHJhY3QBAgAAAAwWAQ8AAAB3aXRoZHJhd19hbW91bnQUAAMAAAAMAAAAdG9rZW5fYW1vdW50GyUAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MMBAAAAGRhdGEdAQ==';
/** Parameter JSON type needed by the schema for update transaction for 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
type GetCis2WithdrawMessageHashParameterSchemaJson = {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    simple_withdraws: Array<{
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] },
    withdraw_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    data: string,
    }>,
    };
/** Parameter type for update transaction for 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type GetCis2WithdrawMessageHashParameter = {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    simple_withdraws: Array<{
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: [SDK.ContractAddress.Type, string] },
    withdraw_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    data: SDK.HexString,
    }>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {GetCis2WithdrawMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {GetCis2WithdrawMessageHashParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetCis2WithdrawMessageHashParameterSchemaJson(parameter: GetCis2WithdrawMessageHashParameter): GetCis2WithdrawMessageHashParameterSchemaJson {
    const field141 = parameter.entry_point;
    const field142 = parameter.expiry_time;
    const timestamp143 = SDK.Timestamp.toSchemaValue(field142);
    const field144 = parameter.nonce;
    const number145 = BigInt(field144);
    const field146 = parameter.service_fee_recipient;
    const field147 = parameter.service_fee_amount;
    const field149 = field147.token_amount;
    const leb138 = BigInt(field149).toString();
    const field150 = field147.token_id;
    const field151 = field147.cis2_token_contract_address;
    const contractAddress152 = SDK.ContractAddress.toSchemaValue(field151);
    const named148 = {
    token_amount: leb138,
    token_id: field150,
    cis2_token_contract_address: contractAddress152,
    };
    const field153 = parameter.simple_withdraws;
    const list154 = field153.map((item155) => {
    const field157 = item155.to;
    let match158: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] };
    switch (field157.type) {
        case 'Account':
    const accountAddress159 = SDK.AccountAddress.toSchemaValue(field157.content);
            match158 = { Account: [accountAddress159], };
        break;
        case 'Contract':
    const contractAddress161 = SDK.ContractAddress.toSchemaValue(field157.content[0]);
    const unnamed160: [SDK.ContractAddress.SchemaValue, string] = [contractAddress161, field157.content[1]];
            match158 = { Contract: unnamed160, };
        break;
    }

    const field162 = item155.withdraw_amount;
    const field164 = field162.token_amount;
    const leb139 = BigInt(field164).toString();
    const field165 = field162.token_id;
    const field166 = field162.cis2_token_contract_address;
    const contractAddress167 = SDK.ContractAddress.toSchemaValue(field166);
    const named163 = {
    token_amount: leb139,
    token_id: field165,
    cis2_token_contract_address: contractAddress167,
    };
    const field168 = item155.data;
    const named156 = {
    to: match158,
    withdraw_amount: named163,
    data: field168,
    };
    return named156;
    });
    const named140 = {
    entry_point: field141,
    expiry_time: timestamp143,
    nonce: number145,
    service_fee_recipient: field146,
    service_fee_amount: named148,
    simple_withdraws: list154,
    };
    return named140;
}

/**
 * Construct Parameter type used in update transaction for 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {GetCis2WithdrawMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetCis2WithdrawMessageHashParameter(parameter: GetCis2WithdrawMessageHashParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64GetCis2WithdrawMessageHashParameterSchema, createGetCis2WithdrawMessageHashParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {GetCis2WithdrawMessageHashParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetCis2WithdrawMessageHashParameterWebWallet(parameter: GetCis2WithdrawMessageHashParameter) {
    return {
        parameters: createGetCis2WithdrawMessageHashParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64GetCis2WithdrawMessageHashParameterSchema, 'base64')
        },
    }
}

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
        createGetCis2WithdrawMessageHashParameter(parameter),
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
        createGetCis2WithdrawMessageHashParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueGetCis2WithdrawMessageHash = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

/**
 * Get and parse the return value from dry-running update transaction for 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetCis2WithdrawMessageHash | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueGetCis2WithdrawMessageHash(invokeResult: SDK.InvokeContractResult): ReturnValueGetCis2WithdrawMessageHash | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageGetCis2WithdrawMessageHash = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'getCis2WithdrawMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetCis2WithdrawMessageHash | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageGetCis2WithdrawMessageHash(invokeResult: SDK.InvokeContractResult): ErrorMessageGetCis2WithdrawMessageHash | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match171: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match171 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match171 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match171 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match171 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match171 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match171 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match171 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match171 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match171 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match171 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match171 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match171
}
/** Base64 encoding of the parameter schema type for update transactions to 'withdrawCcd' entrypoint of the 'smart_contract_wallet' contract. */
const base64WithdrawCcdParameterSchema = 'EAEUAAMAAAAGAAAAc2lnbmVyHiAAAAAJAAAAc2lnbmF0dXJlHkAAAAAHAAAAbWVzc2FnZRQABgAAAAsAAABlbnRyeV9wb2ludBYBCwAAAGV4cGlyeV90aW1lDQUAAABub25jZQUVAAAAc2VydmljZV9mZWVfcmVjaXBpZW50HiAAAAASAAAAc2VydmljZV9mZWVfYW1vdW50ChAAAABzaW1wbGVfd2l0aGRyYXdzEAEUAAMAAAACAAAAdG8VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQIAAAAMFgEPAAAAd2l0aGRyYXdfYW1vdW50CgQAAABkYXRhHQE=';
/** Parameter JSON type needed by the schema for update transaction for 'withdrawCcd' entrypoint of the 'smart_contract_wallet' contract. */
type WithdrawCcdParameterSchemaJson = Array<{
    signer: string,
    signature: string,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: SDK.CcdAmount.SchemaValue,
    simple_withdraws: Array<{
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] },
    withdraw_amount: SDK.CcdAmount.SchemaValue,
    data: string,
    }>,
    },
    }>;
/** Parameter type for update transaction for 'withdrawCcd' entrypoint of the 'smart_contract_wallet' contract. */
export type WithdrawCcdParameter = Array<{
    signer: SDK.HexString,
    signature: SDK.HexString,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: SDK.CcdAmount.Type,
    simple_withdraws: Array<{
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: [SDK.ContractAddress.Type, string] },
    withdraw_amount: SDK.CcdAmount.Type,
    data: SDK.HexString,
    }>,
    },
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'withdrawCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {WithdrawCcdParameter} parameter The structured parameter to construct from.
 * @returns {WithdrawCcdParameterSchemaJson} The smart contract parameter JSON.
 */
function createWithdrawCcdParameterSchemaJson(parameter: WithdrawCcdParameter): WithdrawCcdParameterSchemaJson {
    const list183 = parameter.map((item184) => {
    const field186 = item184.signer;
    const field187 = item184.signature;
    const field188 = item184.message;
    const field190 = field188.entry_point;
    const field191 = field188.expiry_time;
    const timestamp192 = SDK.Timestamp.toSchemaValue(field191);
    const field193 = field188.nonce;
    const number194 = BigInt(field193);
    const field195 = field188.service_fee_recipient;
    const field196 = field188.service_fee_amount;
    const amount197 = SDK.CcdAmount.toSchemaValue(field196);
    const field198 = field188.simple_withdraws;
    const list199 = field198.map((item200) => {
    const field202 = item200.to;
    let match203: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] };
    switch (field202.type) {
        case 'Account':
    const accountAddress204 = SDK.AccountAddress.toSchemaValue(field202.content);
            match203 = { Account: [accountAddress204], };
        break;
        case 'Contract':
    const contractAddress206 = SDK.ContractAddress.toSchemaValue(field202.content[0]);
    const unnamed205: [SDK.ContractAddress.SchemaValue, string] = [contractAddress206, field202.content[1]];
            match203 = { Contract: unnamed205, };
        break;
    }

    const field207 = item200.withdraw_amount;
    const amount208 = SDK.CcdAmount.toSchemaValue(field207);
    const field209 = item200.data;
    const named201 = {
    to: match203,
    withdraw_amount: amount208,
    data: field209,
    };
    return named201;
    });
    const named189 = {
    entry_point: field190,
    expiry_time: timestamp192,
    nonce: number194,
    service_fee_recipient: field195,
    service_fee_amount: amount197,
    simple_withdraws: list199,
    };
    const named185 = {
    signer: field186,
    signature: field187,
    message: named189,
    };
    return named185;
    });
    return list183;
}

/**
 * Construct Parameter type used in update transaction for 'withdrawCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {WithdrawCcdParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createWithdrawCcdParameter(parameter: WithdrawCcdParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64WithdrawCcdParameterSchema, createWithdrawCcdParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'withdrawCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {WithdrawCcdParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createWithdrawCcdParameterWebWallet(parameter: WithdrawCcdParameter) {
    return {
        parameters: createWithdrawCcdParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64WithdrawCcdParameterSchema, 'base64')
        },
    }
}

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
        createWithdrawCcdParameter(parameter),
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
        createWithdrawCcdParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'withdrawCcd' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageWithdrawCcd = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'withdrawCcd' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageWithdrawCcd | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageWithdrawCcd(invokeResult: SDK.InvokeContractResult): ErrorMessageWithdrawCcd | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match210: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match210 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match210 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match210 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match210 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match210 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match210 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match210 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match210 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match210 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match210 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match210 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match210
}
/** Base64 encoding of the parameter schema type for update transactions to 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
const base64WithdrawCis2TokensParameterSchema = 'EAEUAAMAAAAGAAAAc2lnbmVyHiAAAAAJAAAAc2lnbmF0dXJlHkAAAAAHAAAAbWVzc2FnZRQABgAAAAsAAABlbnRyeV9wb2ludBYBCwAAAGV4cGlyeV90aW1lDQUAAABub25jZQUVAAAAc2VydmljZV9mZWVfcmVjaXBpZW50HiAAAAASAAAAc2VydmljZV9mZWVfYW1vdW50FAADAAAADAAAAHRva2VuX2Ftb3VudBslAAAACAAAAHRva2VuX2lkHQAbAAAAY2lzMl90b2tlbl9jb250cmFjdF9hZGRyZXNzDBAAAABzaW1wbGVfd2l0aGRyYXdzEAEUAAMAAAACAAAAdG8VAgAAAAcAAABBY2NvdW50AQEAAAALCAAAAENvbnRyYWN0AQIAAAAMFgEPAAAAd2l0aGRyYXdfYW1vdW50FAADAAAADAAAAHRva2VuX2Ftb3VudBslAAAACAAAAHRva2VuX2lkHQAbAAAAY2lzMl90b2tlbl9jb250cmFjdF9hZGRyZXNzDAQAAABkYXRhHQE=';
/** Parameter JSON type needed by the schema for update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
type WithdrawCis2TokensParameterSchemaJson = Array<{
    signer: string,
    signature: string,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    simple_withdraws: Array<{
    to: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] },
    withdraw_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    data: string,
    }>,
    },
    }>;
/** Parameter type for update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type WithdrawCis2TokensParameter = Array<{
    signer: SDK.HexString,
    signature: SDK.HexString,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    simple_withdraws: Array<{
    to: { type: 'Account', content: SDK.AccountAddress.Type } | { type: 'Contract', content: [SDK.ContractAddress.Type, string] },
    withdraw_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    data: SDK.HexString,
    }>,
    },
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {WithdrawCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {WithdrawCis2TokensParameterSchemaJson} The smart contract parameter JSON.
 */
function createWithdrawCis2TokensParameterSchemaJson(parameter: WithdrawCis2TokensParameter): WithdrawCis2TokensParameterSchemaJson {
    const list224 = parameter.map((item225) => {
    const field227 = item225.signer;
    const field228 = item225.signature;
    const field229 = item225.message;
    const field231 = field229.entry_point;
    const field232 = field229.expiry_time;
    const timestamp233 = SDK.Timestamp.toSchemaValue(field232);
    const field234 = field229.nonce;
    const number235 = BigInt(field234);
    const field236 = field229.service_fee_recipient;
    const field237 = field229.service_fee_amount;
    const field239 = field237.token_amount;
    const leb222 = BigInt(field239).toString();
    const field240 = field237.token_id;
    const field241 = field237.cis2_token_contract_address;
    const contractAddress242 = SDK.ContractAddress.toSchemaValue(field241);
    const named238 = {
    token_amount: leb222,
    token_id: field240,
    cis2_token_contract_address: contractAddress242,
    };
    const field243 = field229.simple_withdraws;
    const list244 = field243.map((item245) => {
    const field247 = item245.to;
    let match248: {'Account' : [SDK.AccountAddress.SchemaValue] } | {'Contract' : [SDK.ContractAddress.SchemaValue, string] };
    switch (field247.type) {
        case 'Account':
    const accountAddress249 = SDK.AccountAddress.toSchemaValue(field247.content);
            match248 = { Account: [accountAddress249], };
        break;
        case 'Contract':
    const contractAddress251 = SDK.ContractAddress.toSchemaValue(field247.content[0]);
    const unnamed250: [SDK.ContractAddress.SchemaValue, string] = [contractAddress251, field247.content[1]];
            match248 = { Contract: unnamed250, };
        break;
    }

    const field252 = item245.withdraw_amount;
    const field254 = field252.token_amount;
    const leb223 = BigInt(field254).toString();
    const field255 = field252.token_id;
    const field256 = field252.cis2_token_contract_address;
    const contractAddress257 = SDK.ContractAddress.toSchemaValue(field256);
    const named253 = {
    token_amount: leb223,
    token_id: field255,
    cis2_token_contract_address: contractAddress257,
    };
    const field258 = item245.data;
    const named246 = {
    to: match248,
    withdraw_amount: named253,
    data: field258,
    };
    return named246;
    });
    const named230 = {
    entry_point: field231,
    expiry_time: timestamp233,
    nonce: number235,
    service_fee_recipient: field236,
    service_fee_amount: named238,
    simple_withdraws: list244,
    };
    const named226 = {
    signer: field227,
    signature: field228,
    message: named230,
    };
    return named226;
    });
    return list224;
}

/**
 * Construct Parameter type used in update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {WithdrawCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createWithdrawCis2TokensParameter(parameter: WithdrawCis2TokensParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64WithdrawCis2TokensParameterSchema, createWithdrawCis2TokensParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {WithdrawCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createWithdrawCis2TokensParameterWebWallet(parameter: WithdrawCis2TokensParameter) {
    return {
        parameters: createWithdrawCis2TokensParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64WithdrawCis2TokensParameterSchema, 'base64')
        },
    }
}

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
        createWithdrawCis2TokensParameter(parameter),
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
        createWithdrawCis2TokensParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageWithdrawCis2Tokens = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'withdrawCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageWithdrawCis2Tokens | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageWithdrawCis2Tokens(invokeResult: SDK.InvokeContractResult): ErrorMessageWithdrawCis2Tokens | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match259: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match259 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match259 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match259 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match259 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match259 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match259 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match259 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match259 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match259 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match259 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match259 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match259
}
/** Base64 encoding of the parameter schema type for update transactions to 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
const base64GetCcdTransferMessageHashParameterSchema = 'FAAGAAAACwAAAGVudHJ5X3BvaW50FgELAAAAZXhwaXJ5X3RpbWUNBQAAAG5vbmNlBRUAAABzZXJ2aWNlX2ZlZV9yZWNpcGllbnQeIAAAABIAAABzZXJ2aWNlX2ZlZV9hbW91bnQKEAAAAHNpbXBsZV90cmFuc2ZlcnMQARQAAgAAAAIAAAB0bx4gAAAADwAAAHRyYW5zZmVyX2Ftb3VudAo=';
/** Parameter JSON type needed by the schema for update transaction for 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
type GetCcdTransferMessageHashParameterSchemaJson = {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: SDK.CcdAmount.SchemaValue,
    simple_transfers: Array<{
    to: string,
    transfer_amount: SDK.CcdAmount.SchemaValue,
    }>,
    };
/** Parameter type for update transaction for 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type GetCcdTransferMessageHashParameter = {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: SDK.CcdAmount.Type,
    simple_transfers: Array<{
    to: SDK.HexString,
    transfer_amount: SDK.CcdAmount.Type,
    }>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {GetCcdTransferMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {GetCcdTransferMessageHashParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetCcdTransferMessageHashParameterSchemaJson(parameter: GetCcdTransferMessageHashParameter): GetCcdTransferMessageHashParameterSchemaJson {
    const field272 = parameter.entry_point;
    const field273 = parameter.expiry_time;
    const timestamp274 = SDK.Timestamp.toSchemaValue(field273);
    const field275 = parameter.nonce;
    const number276 = BigInt(field275);
    const field277 = parameter.service_fee_recipient;
    const field278 = parameter.service_fee_amount;
    const amount279 = SDK.CcdAmount.toSchemaValue(field278);
    const field280 = parameter.simple_transfers;
    const list281 = field280.map((item282) => {
    const field284 = item282.to;
    const field285 = item282.transfer_amount;
    const amount286 = SDK.CcdAmount.toSchemaValue(field285);
    const named283 = {
    to: field284,
    transfer_amount: amount286,
    };
    return named283;
    });
    const named271 = {
    entry_point: field272,
    expiry_time: timestamp274,
    nonce: number276,
    service_fee_recipient: field277,
    service_fee_amount: amount279,
    simple_transfers: list281,
    };
    return named271;
}

/**
 * Construct Parameter type used in update transaction for 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {GetCcdTransferMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetCcdTransferMessageHashParameter(parameter: GetCcdTransferMessageHashParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64GetCcdTransferMessageHashParameterSchema, createGetCcdTransferMessageHashParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {GetCcdTransferMessageHashParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetCcdTransferMessageHashParameterWebWallet(parameter: GetCcdTransferMessageHashParameter) {
    return {
        parameters: createGetCcdTransferMessageHashParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64GetCcdTransferMessageHashParameterSchema, 'base64')
        },
    }
}

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
        createGetCcdTransferMessageHashParameter(parameter),
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
        createGetCcdTransferMessageHashParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueGetCcdTransferMessageHash = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

/**
 * Get and parse the return value from dry-running update transaction for 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetCcdTransferMessageHash | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueGetCcdTransferMessageHash(invokeResult: SDK.InvokeContractResult): ReturnValueGetCcdTransferMessageHash | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageGetCcdTransferMessageHash = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'getCcdTransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetCcdTransferMessageHash | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageGetCcdTransferMessageHash(invokeResult: SDK.InvokeContractResult): ErrorMessageGetCcdTransferMessageHash | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match289: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match289 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match289 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match289 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match289 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match289 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match289 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match289 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match289 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match289 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match289 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match289 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match289
}
/** Base64 encoding of the parameter schema type for update transactions to 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
const base64GetCis2TransferMessageHashParameterSchema = 'FAAGAAAACwAAAGVudHJ5X3BvaW50FgELAAAAZXhwaXJ5X3RpbWUNBQAAAG5vbmNlBRUAAABzZXJ2aWNlX2ZlZV9yZWNpcGllbnQeIAAAABIAAABzZXJ2aWNlX2ZlZV9hbW91bnQUAAMAAAAMAAAAdG9rZW5fYW1vdW50GyUAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MMEAAAAHNpbXBsZV90cmFuc2ZlcnMQARQAAgAAAAIAAAB0bx4gAAAADwAAAHRyYW5zZmVyX2Ftb3VudBQAAwAAAAwAAAB0b2tlbl9hbW91bnQbJQAAAAgAAAB0b2tlbl9pZB0AGwAAAGNpczJfdG9rZW5fY29udHJhY3RfYWRkcmVzcww=';
/** Parameter JSON type needed by the schema for update transaction for 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
type GetCis2TransferMessageHashParameterSchemaJson = {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    simple_transfers: Array<{
    to: string,
    transfer_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    }>,
    };
/** Parameter type for update transaction for 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type GetCis2TransferMessageHashParameter = {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    simple_transfers: Array<{
    to: SDK.HexString,
    transfer_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    }>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {GetCis2TransferMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {GetCis2TransferMessageHashParameterSchemaJson} The smart contract parameter JSON.
 */
function createGetCis2TransferMessageHashParameterSchemaJson(parameter: GetCis2TransferMessageHashParameter): GetCis2TransferMessageHashParameterSchemaJson {
    const field304 = parameter.entry_point;
    const field305 = parameter.expiry_time;
    const timestamp306 = SDK.Timestamp.toSchemaValue(field305);
    const field307 = parameter.nonce;
    const number308 = BigInt(field307);
    const field309 = parameter.service_fee_recipient;
    const field310 = parameter.service_fee_amount;
    const field312 = field310.token_amount;
    const leb301 = BigInt(field312).toString();
    const field313 = field310.token_id;
    const field314 = field310.cis2_token_contract_address;
    const contractAddress315 = SDK.ContractAddress.toSchemaValue(field314);
    const named311 = {
    token_amount: leb301,
    token_id: field313,
    cis2_token_contract_address: contractAddress315,
    };
    const field316 = parameter.simple_transfers;
    const list317 = field316.map((item318) => {
    const field320 = item318.to;
    const field321 = item318.transfer_amount;
    const field323 = field321.token_amount;
    const leb302 = BigInt(field323).toString();
    const field324 = field321.token_id;
    const field325 = field321.cis2_token_contract_address;
    const contractAddress326 = SDK.ContractAddress.toSchemaValue(field325);
    const named322 = {
    token_amount: leb302,
    token_id: field324,
    cis2_token_contract_address: contractAddress326,
    };
    const named319 = {
    to: field320,
    transfer_amount: named322,
    };
    return named319;
    });
    const named303 = {
    entry_point: field304,
    expiry_time: timestamp306,
    nonce: number308,
    service_fee_recipient: field309,
    service_fee_amount: named311,
    simple_transfers: list317,
    };
    return named303;
}

/**
 * Construct Parameter type used in update transaction for 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {GetCis2TransferMessageHashParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createGetCis2TransferMessageHashParameter(parameter: GetCis2TransferMessageHashParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64GetCis2TransferMessageHashParameterSchema, createGetCis2TransferMessageHashParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * @param {GetCis2TransferMessageHashParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createGetCis2TransferMessageHashParameterWebWallet(parameter: GetCis2TransferMessageHashParameter) {
    return {
        parameters: createGetCis2TransferMessageHashParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64GetCis2TransferMessageHashParameterSchema, 'base64')
        },
    }
}

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
        createGetCis2TransferMessageHashParameter(parameter),
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
        createGetCis2TransferMessageHashParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueGetCis2TransferMessageHash = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];

/**
 * Get and parse the return value from dry-running update transaction for 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueGetCis2TransferMessageHash | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueGetCis2TransferMessageHash(invokeResult: SDK.InvokeContractResult): ReturnValueGetCis2TransferMessageHash | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <[number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EyAAAAAC');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageGetCis2TransferMessageHash = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'getCis2TransferMessageHash' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageGetCis2TransferMessageHash | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageGetCis2TransferMessageHash(invokeResult: SDK.InvokeContractResult): ErrorMessageGetCis2TransferMessageHash | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match329: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match329 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match329 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match329 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match329 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match329 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match329 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match329 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match329 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match329 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match329 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match329 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match329
}
/** Base64 encoding of the parameter schema type for update transactions to 'transferCcd' entrypoint of the 'smart_contract_wallet' contract. */
const base64TransferCcdParameterSchema = 'EAEUAAMAAAAGAAAAc2lnbmVyHiAAAAAJAAAAc2lnbmF0dXJlHkAAAAAHAAAAbWVzc2FnZRQABgAAAAsAAABlbnRyeV9wb2ludBYBCwAAAGV4cGlyeV90aW1lDQUAAABub25jZQUVAAAAc2VydmljZV9mZWVfcmVjaXBpZW50HiAAAAASAAAAc2VydmljZV9mZWVfYW1vdW50ChAAAABzaW1wbGVfdHJhbnNmZXJzEAEUAAIAAAACAAAAdG8eIAAAAA8AAAB0cmFuc2Zlcl9hbW91bnQK';
/** Parameter JSON type needed by the schema for update transaction for 'transferCcd' entrypoint of the 'smart_contract_wallet' contract. */
type TransferCcdParameterSchemaJson = Array<{
    signer: string,
    signature: string,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: SDK.CcdAmount.SchemaValue,
    simple_transfers: Array<{
    to: string,
    transfer_amount: SDK.CcdAmount.SchemaValue,
    }>,
    },
    }>;
/** Parameter type for update transaction for 'transferCcd' entrypoint of the 'smart_contract_wallet' contract. */
export type TransferCcdParameter = Array<{
    signer: SDK.HexString,
    signature: SDK.HexString,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: SDK.CcdAmount.Type,
    simple_transfers: Array<{
    to: SDK.HexString,
    transfer_amount: SDK.CcdAmount.Type,
    }>,
    },
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'transferCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {TransferCcdParameter} parameter The structured parameter to construct from.
 * @returns {TransferCcdParameterSchemaJson} The smart contract parameter JSON.
 */
function createTransferCcdParameterSchemaJson(parameter: TransferCcdParameter): TransferCcdParameterSchemaJson {
    const list341 = parameter.map((item342) => {
    const field344 = item342.signer;
    const field345 = item342.signature;
    const field346 = item342.message;
    const field348 = field346.entry_point;
    const field349 = field346.expiry_time;
    const timestamp350 = SDK.Timestamp.toSchemaValue(field349);
    const field351 = field346.nonce;
    const number352 = BigInt(field351);
    const field353 = field346.service_fee_recipient;
    const field354 = field346.service_fee_amount;
    const amount355 = SDK.CcdAmount.toSchemaValue(field354);
    const field356 = field346.simple_transfers;
    const list357 = field356.map((item358) => {
    const field360 = item358.to;
    const field361 = item358.transfer_amount;
    const amount362 = SDK.CcdAmount.toSchemaValue(field361);
    const named359 = {
    to: field360,
    transfer_amount: amount362,
    };
    return named359;
    });
    const named347 = {
    entry_point: field348,
    expiry_time: timestamp350,
    nonce: number352,
    service_fee_recipient: field353,
    service_fee_amount: amount355,
    simple_transfers: list357,
    };
    const named343 = {
    signer: field344,
    signature: field345,
    message: named347,
    };
    return named343;
    });
    return list341;
}

/**
 * Construct Parameter type used in update transaction for 'transferCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {TransferCcdParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createTransferCcdParameter(parameter: TransferCcdParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64TransferCcdParameterSchema, createTransferCcdParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'transferCcd' entrypoint of the 'smart_contract_wallet' contract.
 * @param {TransferCcdParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createTransferCcdParameterWebWallet(parameter: TransferCcdParameter) {
    return {
        parameters: createTransferCcdParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64TransferCcdParameterSchema, 'base64')
        },
    }
}

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
        createTransferCcdParameter(parameter),
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
        createTransferCcdParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'transferCcd' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageTransferCcd = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'transferCcd' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageTransferCcd | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageTransferCcd(invokeResult: SDK.InvokeContractResult): ErrorMessageTransferCcd | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match363: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match363 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match363 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match363 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match363 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match363 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match363 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match363 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match363 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match363 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match363 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match363 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match363
}
/** Base64 encoding of the parameter schema type for update transactions to 'transferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
const base64TransferCis2TokensParameterSchema = 'EAEUAAMAAAAGAAAAc2lnbmVyHiAAAAAJAAAAc2lnbmF0dXJlHkAAAAAHAAAAbWVzc2FnZRQABgAAAAsAAABlbnRyeV9wb2ludBYBCwAAAGV4cGlyeV90aW1lDQUAAABub25jZQUVAAAAc2VydmljZV9mZWVfcmVjaXBpZW50HiAAAAASAAAAc2VydmljZV9mZWVfYW1vdW50FAADAAAADAAAAHRva2VuX2Ftb3VudBslAAAACAAAAHRva2VuX2lkHQAbAAAAY2lzMl90b2tlbl9jb250cmFjdF9hZGRyZXNzDBAAAABzaW1wbGVfdHJhbnNmZXJzEAEUAAIAAAACAAAAdG8eIAAAAA8AAAB0cmFuc2Zlcl9hbW91bnQUAAMAAAAMAAAAdG9rZW5fYW1vdW50GyUAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MM';
/** Parameter JSON type needed by the schema for update transaction for 'transferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
type TransferCis2TokensParameterSchemaJson = Array<{
    signer: string,
    signature: string,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.SchemaValue,
    nonce: bigint,
    service_fee_recipient: string,
    service_fee_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    simple_transfers: Array<{
    to: string,
    transfer_amount: {
    token_amount: string,
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    },
    }>,
    },
    }>;
/** Parameter type for update transaction for 'transferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type TransferCis2TokensParameter = Array<{
    signer: SDK.HexString,
    signature: SDK.HexString,
    message: {
    entry_point: string,
    expiry_time: SDK.Timestamp.Type,
    nonce: number | bigint,
    service_fee_recipient: SDK.HexString,
    service_fee_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    simple_transfers: Array<{
    to: SDK.HexString,
    transfer_amount: {
    token_amount: number | bigint,
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    },
    }>,
    },
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'transferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {TransferCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {TransferCis2TokensParameterSchemaJson} The smart contract parameter JSON.
 */
function createTransferCis2TokensParameterSchemaJson(parameter: TransferCis2TokensParameter): TransferCis2TokensParameterSchemaJson {
    const list377 = parameter.map((item378) => {
    const field380 = item378.signer;
    const field381 = item378.signature;
    const field382 = item378.message;
    const field384 = field382.entry_point;
    const field385 = field382.expiry_time;
    const timestamp386 = SDK.Timestamp.toSchemaValue(field385);
    const field387 = field382.nonce;
    const number388 = BigInt(field387);
    const field389 = field382.service_fee_recipient;
    const field390 = field382.service_fee_amount;
    const field392 = field390.token_amount;
    const leb375 = BigInt(field392).toString();
    const field393 = field390.token_id;
    const field394 = field390.cis2_token_contract_address;
    const contractAddress395 = SDK.ContractAddress.toSchemaValue(field394);
    const named391 = {
    token_amount: leb375,
    token_id: field393,
    cis2_token_contract_address: contractAddress395,
    };
    const field396 = field382.simple_transfers;
    const list397 = field396.map((item398) => {
    const field400 = item398.to;
    const field401 = item398.transfer_amount;
    const field403 = field401.token_amount;
    const leb376 = BigInt(field403).toString();
    const field404 = field401.token_id;
    const field405 = field401.cis2_token_contract_address;
    const contractAddress406 = SDK.ContractAddress.toSchemaValue(field405);
    const named402 = {
    token_amount: leb376,
    token_id: field404,
    cis2_token_contract_address: contractAddress406,
    };
    const named399 = {
    to: field400,
    transfer_amount: named402,
    };
    return named399;
    });
    const named383 = {
    entry_point: field384,
    expiry_time: timestamp386,
    nonce: number388,
    service_fee_recipient: field389,
    service_fee_amount: named391,
    simple_transfers: list397,
    };
    const named379 = {
    signer: field380,
    signature: field381,
    message: named383,
    };
    return named379;
    });
    return list377;
}

/**
 * Construct Parameter type used in update transaction for 'transferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {TransferCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createTransferCis2TokensParameter(parameter: TransferCis2TokensParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64TransferCis2TokensParameterSchema, createTransferCis2TokensParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'transferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * @param {TransferCis2TokensParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createTransferCis2TokensParameterWebWallet(parameter: TransferCis2TokensParameter) {
    return {
        parameters: createTransferCis2TokensParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64TransferCis2TokensParameterSchema, 'base64')
        },
    }
}

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
        createTransferCis2TokensParameter(parameter),
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
        createTransferCis2TokensParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'transferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageTransferCis2Tokens = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'transferCis2Tokens' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageTransferCis2Tokens | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageTransferCis2Tokens(invokeResult: SDK.InvokeContractResult): ErrorMessageTransferCis2Tokens | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match407: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match407 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match407 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match407 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match407 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match407 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match407 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match407 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match407 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match407 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match407 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match407 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match407
}
/** Base64 encoding of the parameter schema type for update transactions to 'setImplementors' entrypoint of the 'smart_contract_wallet' contract. */
const base64SetImplementorsParameterSchema = 'FAACAAAAAgAAAGlkFgAMAAAAaW1wbGVtZW50b3JzEAIM';
/** Parameter JSON type needed by the schema for update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract. */
type SetImplementorsParameterSchemaJson = {
    id: string,
    implementors: Array<SDK.ContractAddress.SchemaValue>,
    };
/** Parameter type for update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract. */
export type SetImplementorsParameter = {
    id: string,
    implementors: Array<SDK.ContractAddress.Type>,
    };

/**
 * Construct schema JSON representation used in update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns {SetImplementorsParameterSchemaJson} The smart contract parameter JSON.
 */
function createSetImplementorsParameterSchemaJson(parameter: SetImplementorsParameter): SetImplementorsParameterSchemaJson {
    const field420 = parameter.id;
    const field421 = parameter.implementors;
    const list422 = field421.map((item423) => {
    const contractAddress424 = SDK.ContractAddress.toSchemaValue(item423);
    return contractAddress424;
    });
    const named419 = {
    id: field420,
    implementors: list422,
    };
    return named419;
}

/**
 * Construct Parameter type used in update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSetImplementorsParameter(parameter: SetImplementorsParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SetImplementorsParameterSchema, createSetImplementorsParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SetImplementorsParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSetImplementorsParameterWebWallet(parameter: SetImplementorsParameter) {
    return {
        parameters: createSetImplementorsParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64SetImplementorsParameterSchema, 'base64')
        },
    }
}

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
        createSetImplementorsParameter(parameter),
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
        createSetImplementorsParameter(parameter),
        blockHash
    );
}

/** Error message for dry-running update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageSetImplementors = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'setImplementors' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSetImplementors | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSetImplementors(invokeResult: SDK.InvokeContractResult): ErrorMessageSetImplementors | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match425: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match425 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match425 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match425 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match425 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match425 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match425 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match425 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match425 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match425 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match425 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match425 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match425
}
/** Base64 encoding of the parameter schema type for update transactions to 'supports' entrypoint of the 'smart_contract_wallet' contract. */
const base64SupportsParameterSchema = 'EAEWAA==';
/** Parameter JSON type needed by the schema for update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract. */
type SupportsParameterSchemaJson = Array<string>;
/** Parameter type for update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract. */
export type SupportsParameter = Array<string>;

/**
 * Construct schema JSON representation used in update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SupportsParameterSchemaJson} The smart contract parameter JSON.
 */
function createSupportsParameterSchemaJson(parameter: SupportsParameter): SupportsParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createSupportsParameter(parameter: SupportsParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64SupportsParameterSchema, createSupportsParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * @param {SupportsParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createSupportsParameterWebWallet(parameter: SupportsParameter) {
    return {
        parameters: createSupportsParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64SupportsParameterSchema, 'base64')
        },
    }
}

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
        createSupportsParameter(parameter),
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
        createSupportsParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueSupports = Array<{ type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> }>;

/**
 * Get and parse the return value from dry-running update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueSupports | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueSupports(invokeResult: SDK.InvokeContractResult): ReturnValueSupports | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <Array<{'NoSupport' : [] } | {'Support' : [] } | {'SupportBy' : [Array<SDK.ContractAddress.SchemaValue>] }>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEVAwAAAAkAAABOb1N1cHBvcnQCBwAAAFN1cHBvcnQCCQAAAFN1cHBvcnRCeQEBAAAAEAAM');
    const list439 = schemaJson.map((item440) => {
    let match441: { type: 'NoSupport'} | { type: 'Support'} | { type: 'SupportBy', content: Array<SDK.ContractAddress.Type> };
    if ('NoSupport' in item440) {
       match441 = {
           type: 'NoSupport',
       };
    } else if ('Support' in item440) {
       match441 = {
           type: 'Support',
       };
    } else if ('SupportBy' in item440) {
       const variant444 = item440.SupportBy;
    const list445 = variant444[0].map((item446) => {
    const contractAddress447 = SDK.ContractAddress.fromSchemaValue(item446);
    return contractAddress447;
    });
       match441 = {
           type: 'SupportBy',
           content: list445,
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match441;
    });
    return list439;
}

/** Error message for dry-running update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageSupports = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'supports' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageSupports | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageSupports(invokeResult: SDK.InvokeContractResult): ErrorMessageSupports | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match448: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match448 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match448 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match448 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match448 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match448 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match448 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match448 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match448 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match448 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match448 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match448 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match448
}
/** Base64 encoding of the parameter schema type for update transactions to 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract. */
const base64CcdBalanceOfParameterSchema = 'EAEeIAAAAA==';
/** Parameter JSON type needed by the schema for update transaction for 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract. */
type CcdBalanceOfParameterSchemaJson = Array<string>;
/** Parameter type for update transaction for 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type CcdBalanceOfParameter = Array<SDK.HexString>;

/**
 * Construct schema JSON representation used in update transaction for 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {CcdBalanceOfParameter} parameter The structured parameter to construct from.
 * @returns {CcdBalanceOfParameterSchemaJson} The smart contract parameter JSON.
 */
function createCcdBalanceOfParameterSchemaJson(parameter: CcdBalanceOfParameter): CcdBalanceOfParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {CcdBalanceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createCcdBalanceOfParameter(parameter: CcdBalanceOfParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64CcdBalanceOfParameterSchema, createCcdBalanceOfParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {CcdBalanceOfParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createCcdBalanceOfParameterWebWallet(parameter: CcdBalanceOfParameter) {
    return {
        parameters: createCcdBalanceOfParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64CcdBalanceOfParameterSchema, 'base64')
        },
    }
}

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
        createCcdBalanceOfParameter(parameter),
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
        createCcdBalanceOfParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueCcdBalanceOf = Array<SDK.CcdAmount.Type>;

/**
 * Get and parse the return value from dry-running update transaction for 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueCcdBalanceOf | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueCcdBalanceOf(invokeResult: SDK.InvokeContractResult): ReturnValueCcdBalanceOf | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <Array<SDK.CcdAmount.SchemaValue>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEK');
    const list462 = schemaJson.map((item463) => {
    const amount464 = SDK.CcdAmount.fromSchemaValue(item463);
    return amount464;
    });
    return list462;
}

/** Error message for dry-running update transaction for 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageCcdBalanceOf = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'ccdBalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageCcdBalanceOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageCcdBalanceOf(invokeResult: SDK.InvokeContractResult): ErrorMessageCcdBalanceOf | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match465: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match465 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match465 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match465 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match465 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match465 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match465 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match465 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match465 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match465 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match465 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match465 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match465
}
/** Base64 encoding of the parameter schema type for update transactions to 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract. */
const base64Cis2BalanceOfParameterSchema = 'EAEUAAMAAAAIAAAAdG9rZW5faWQdABsAAABjaXMyX3Rva2VuX2NvbnRyYWN0X2FkZHJlc3MMCgAAAHB1YmxpY19rZXkeIAAAAA==';
/** Parameter JSON type needed by the schema for update transaction for 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract. */
type Cis2BalanceOfParameterSchemaJson = Array<{
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    public_key: string,
    }>;
/** Parameter type for update transaction for 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type Cis2BalanceOfParameter = Array<{
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    public_key: SDK.HexString,
    }>;

/**
 * Construct schema JSON representation used in update transaction for 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {Cis2BalanceOfParameter} parameter The structured parameter to construct from.
 * @returns {Cis2BalanceOfParameterSchemaJson} The smart contract parameter JSON.
 */
function createCis2BalanceOfParameterSchemaJson(parameter: Cis2BalanceOfParameter): Cis2BalanceOfParameterSchemaJson {
    const list477 = parameter.map((item478) => {
    const field480 = item478.token_id;
    const field481 = item478.cis2_token_contract_address;
    const contractAddress482 = SDK.ContractAddress.toSchemaValue(field481);
    const field483 = item478.public_key;
    const named479 = {
    token_id: field480,
    cis2_token_contract_address: contractAddress482,
    public_key: field483,
    };
    return named479;
    });
    return list477;
}

/**
 * Construct Parameter type used in update transaction for 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {Cis2BalanceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createCis2BalanceOfParameter(parameter: Cis2BalanceOfParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64Cis2BalanceOfParameterSchema, createCis2BalanceOfParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {Cis2BalanceOfParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createCis2BalanceOfParameterWebWallet(parameter: Cis2BalanceOfParameter) {
    return {
        parameters: createCis2BalanceOfParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64Cis2BalanceOfParameterSchema, 'base64')
        },
    }
}

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
        createCis2BalanceOfParameter(parameter),
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
        createCis2BalanceOfParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueCis2BalanceOf = Array<number | bigint>;

/**
 * Get and parse the return value from dry-running update transaction for 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueCis2BalanceOf | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueCis2BalanceOf(invokeResult: SDK.InvokeContractResult): ReturnValueCis2BalanceOf | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <Array<string>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEbJQAAAA==');
    const list485 = schemaJson.map((item486) => {
    const leb484 = BigInt(item486);
    return leb484;
    });
    return list485;
}

/** Error message for dry-running update transaction for 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageCis2BalanceOf = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'cis2BalanceOf' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageCis2BalanceOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageCis2BalanceOf(invokeResult: SDK.InvokeContractResult): ErrorMessageCis2BalanceOf | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match487: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match487 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match487 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match487 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match487 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match487 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match487 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match487 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match487 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match487 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match487 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match487 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match487
}
/** Base64 encoding of the parameter schema type for update transactions to 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract. */
const base64CcdBalanceOfAccountParameterSchema = 'HiAAAAA=';
/** Parameter JSON type needed by the schema for update transaction for 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract. */
type CcdBalanceOfAccountParameterSchemaJson = string;
/** Parameter type for update transaction for 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract. */
export type CcdBalanceOfAccountParameter = SDK.HexString;

/**
 * Construct schema JSON representation used in update transaction for 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {CcdBalanceOfAccountParameter} parameter The structured parameter to construct from.
 * @returns {CcdBalanceOfAccountParameterSchemaJson} The smart contract parameter JSON.
 */
function createCcdBalanceOfAccountParameterSchemaJson(parameter: CcdBalanceOfAccountParameter): CcdBalanceOfAccountParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {CcdBalanceOfAccountParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createCcdBalanceOfAccountParameter(parameter: CcdBalanceOfAccountParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64CcdBalanceOfAccountParameterSchema, createCcdBalanceOfAccountParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {CcdBalanceOfAccountParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createCcdBalanceOfAccountParameterWebWallet(parameter: CcdBalanceOfAccountParameter) {
    return {
        parameters: createCcdBalanceOfAccountParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64CcdBalanceOfAccountParameterSchema, 'base64')
        },
    }
}

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
        createCcdBalanceOfAccountParameter(parameter),
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
        createCcdBalanceOfAccountParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueCcdBalanceOfAccount = SDK.CcdAmount.Type;

/**
 * Get and parse the return value from dry-running update transaction for 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueCcdBalanceOfAccount | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueCcdBalanceOfAccount(invokeResult: SDK.InvokeContractResult): ReturnValueCcdBalanceOfAccount | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <SDK.CcdAmount.SchemaValue>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'Cg==');
    const amount499 = SDK.CcdAmount.fromSchemaValue(schemaJson);
    return amount499;
}

/** Error message for dry-running update transaction for 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageCcdBalanceOfAccount = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'ccdBalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageCcdBalanceOfAccount | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageCcdBalanceOfAccount(invokeResult: SDK.InvokeContractResult): ErrorMessageCcdBalanceOfAccount | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match500: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match500 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match500 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match500 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match500 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match500 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match500 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match500 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match500 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match500 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match500 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match500 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match500
}
/** Base64 encoding of the parameter schema type for update transactions to 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract. */
const base64Cis2BalanceOfAccountParameterSchema = 'FAADAAAACAAAAHRva2VuX2lkHQAbAAAAY2lzMl90b2tlbl9jb250cmFjdF9hZGRyZXNzDAoAAABwdWJsaWNfa2V5HiAAAAA=';
/** Parameter JSON type needed by the schema for update transaction for 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract. */
type Cis2BalanceOfAccountParameterSchemaJson = {
    token_id: string,
    cis2_token_contract_address: SDK.ContractAddress.SchemaValue,
    public_key: string,
    };
/** Parameter type for update transaction for 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract. */
export type Cis2BalanceOfAccountParameter = {
    token_id: SDK.HexString,
    cis2_token_contract_address: SDK.ContractAddress.Type,
    public_key: SDK.HexString,
    };

/**
 * Construct schema JSON representation used in update transaction for 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {Cis2BalanceOfAccountParameter} parameter The structured parameter to construct from.
 * @returns {Cis2BalanceOfAccountParameterSchemaJson} The smart contract parameter JSON.
 */
function createCis2BalanceOfAccountParameterSchemaJson(parameter: Cis2BalanceOfAccountParameter): Cis2BalanceOfAccountParameterSchemaJson {
    const field513 = parameter.token_id;
    const field514 = parameter.cis2_token_contract_address;
    const contractAddress515 = SDK.ContractAddress.toSchemaValue(field514);
    const field516 = parameter.public_key;
    const named512 = {
    token_id: field513,
    cis2_token_contract_address: contractAddress515,
    public_key: field516,
    };
    return named512;
}

/**
 * Construct Parameter type used in update transaction for 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {Cis2BalanceOfAccountParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createCis2BalanceOfAccountParameter(parameter: Cis2BalanceOfAccountParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64Cis2BalanceOfAccountParameterSchema, createCis2BalanceOfAccountParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * @param {Cis2BalanceOfAccountParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createCis2BalanceOfAccountParameterWebWallet(parameter: Cis2BalanceOfAccountParameter) {
    return {
        parameters: createCis2BalanceOfAccountParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64Cis2BalanceOfAccountParameterSchema, 'base64')
        },
    }
}

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
        createCis2BalanceOfAccountParameter(parameter),
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
        createCis2BalanceOfAccountParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueCis2BalanceOfAccount = number | bigint;

/**
 * Get and parse the return value from dry-running update transaction for 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueCis2BalanceOfAccount | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueCis2BalanceOfAccount(invokeResult: SDK.InvokeContractResult): ReturnValueCis2BalanceOfAccount | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <string>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'GyUAAAA=');
    const leb517 = BigInt(schemaJson);
    return leb517;
}

/** Error message for dry-running update transaction for 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageCis2BalanceOfAccount = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'cis2BalanceOfAccount' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageCis2BalanceOfAccount | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageCis2BalanceOfAccount(invokeResult: SDK.InvokeContractResult): ErrorMessageCis2BalanceOfAccount | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match518: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match518 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match518 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match518 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match518 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match518 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match518 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match518 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match518 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match518 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match518 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match518 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match518
}
/** Base64 encoding of the parameter schema type for update transactions to 'nonceOf' entrypoint of the 'smart_contract_wallet' contract. */
const base64NonceOfParameterSchema = 'EAEeIAAAAA==';
/** Parameter JSON type needed by the schema for update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract. */
type NonceOfParameterSchemaJson = Array<string>;
/** Parameter type for update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type NonceOfParameter = Array<SDK.HexString>;

/**
 * Construct schema JSON representation used in update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns {NonceOfParameterSchemaJson} The smart contract parameter JSON.
 */
function createNonceOfParameterSchemaJson(parameter: NonceOfParameter): NonceOfParameterSchemaJson {
    return parameter;
}

/**
 * Construct Parameter type used in update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns {SDK.Parameter.Type} The smart contract parameter.
 */
export function createNonceOfParameter(parameter: NonceOfParameter): SDK.Parameter.Type {
    return SDK.Parameter.fromBase64SchemaType(base64NonceOfParameterSchema, createNonceOfParameterSchemaJson(parameter));
}

/**
 * Construct WebWallet parameter type used in update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * @param {NonceOfParameter} parameter The structured parameter to construct from.
 * @returns The smart contract parameter support by the WebWallet.
 */
export function createNonceOfParameterWebWallet(parameter: NonceOfParameter) {
    return {
        parameters: createNonceOfParameterSchemaJson(parameter),
        schema: {
            type: 'TypeSchema' as const,
            value: SDK.toBuffer(base64NonceOfParameterSchema, 'base64')
        },
    }
}

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
        createNonceOfParameter(parameter),
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
        createNonceOfParameter(parameter),
        blockHash
    );
}

/** Return value for dry-running update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type ReturnValueNonceOf = Array<number | bigint>;

/**
 * Get and parse the return value from dry-running update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not successful.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ReturnValueNonceOf | undefined} The structured return value or undefined if result was not a success.
 */
export function parseReturnValueNonceOf(invokeResult: SDK.InvokeContractResult): ReturnValueNonceOf | undefined {
    if (invokeResult.tag !== 'success') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <Array<bigint>>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'EAEF');
    return schemaJson;
}

/** Error message for dry-running update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract. */
export type ErrorMessageNonceOf = { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};

/**
 * Get and parse the error message from dry-running update transaction for 'nonceOf' entrypoint of the 'smart_contract_wallet' contract.
 * Returns undefined if the result is not a failure.
 * @param {SDK.InvokeContractResult} invokeResult The result from dry-running the transaction.
 * @returns {ErrorMessageNonceOf | undefined} The structured error message or undefined if result was not a failure or failed for other reason than contract rejectedReceive.
 */
export function parseErrorMessageNonceOf(invokeResult: SDK.InvokeContractResult): ErrorMessageNonceOf | undefined {
    if (invokeResult.tag !== 'failure' || invokeResult.reason.tag !== 'RejectedReceive') {
        return undefined;
    }

    if (invokeResult.returnValue === undefined) {
        throw new Error('Unexpected missing \'returnValue\' in result of invocation. Client expected a V1 smart contract.');
    }

    const schemaJson = <{'ParseParams' : [] } | {'LogFull' : [] } | {'LogMalformed' : [] } | {'OnlyContract' : [] } | {'InsufficientFunds' : [] } | {'WrongSignature' : [] } | {'NonceMismatch' : [] } | {'Expired' : [] } | {'WrongEntryPoint' : [] } | {'UnAuthorized' : [] } | {'Overflow' : [] }>SDK.ReturnValue.parseWithSchemaTypeBase64(invokeResult.returnValue, 'FQsAAAALAAAAUGFyc2VQYXJhbXMCBwAAAExvZ0Z1bGwCDAAAAExvZ01hbGZvcm1lZAIMAAAAT25seUNvbnRyYWN0AhEAAABJbnN1ZmZpY2llbnRGdW5kcwIOAAAAV3JvbmdTaWduYXR1cmUCDQAAAE5vbmNlTWlzbWF0Y2gCBwAAAEV4cGlyZWQCDwAAAFdyb25nRW50cnlQb2ludAIMAAAAVW5BdXRob3JpemVkAggAAABPdmVyZmxvdwI=');
    let match534: { type: 'ParseParams'} | { type: 'LogFull'} | { type: 'LogMalformed'} | { type: 'OnlyContract'} | { type: 'InsufficientFunds'} | { type: 'WrongSignature'} | { type: 'NonceMismatch'} | { type: 'Expired'} | { type: 'WrongEntryPoint'} | { type: 'UnAuthorized'} | { type: 'Overflow'};
    if ('ParseParams' in schemaJson) {
       match534 = {
           type: 'ParseParams',
       };
    } else if ('LogFull' in schemaJson) {
       match534 = {
           type: 'LogFull',
       };
    } else if ('LogMalformed' in schemaJson) {
       match534 = {
           type: 'LogMalformed',
       };
    } else if ('OnlyContract' in schemaJson) {
       match534 = {
           type: 'OnlyContract',
       };
    } else if ('InsufficientFunds' in schemaJson) {
       match534 = {
           type: 'InsufficientFunds',
       };
    } else if ('WrongSignature' in schemaJson) {
       match534 = {
           type: 'WrongSignature',
       };
    } else if ('NonceMismatch' in schemaJson) {
       match534 = {
           type: 'NonceMismatch',
       };
    } else if ('Expired' in schemaJson) {
       match534 = {
           type: 'Expired',
       };
    } else if ('WrongEntryPoint' in schemaJson) {
       match534 = {
           type: 'WrongEntryPoint',
       };
    } else if ('UnAuthorized' in schemaJson) {
       match534 = {
           type: 'UnAuthorized',
       };
    } else if ('Overflow' in schemaJson) {
       match534 = {
           type: 'Overflow',
       };
    }

     else {
       throw new Error("Unexpected enum variant");
    }

    return match534
}
