import sodium from 'libsodium-wrappers';
import {
    ContractAddress,
    ConcordiumGRPCWebClient, Timestamp, AccountAddress,
    CcdAmount, Energy, AccountSigner,
    buildBasicAccountSigner, ContractInvokeMetadata,
    ModuleReference, ContractTransactionMetadata,
    AccountTransactionHeader,
    serializeUpdateContractParameters,
    ContractName,
    EntrypointName,
    UpdateContractPayload,
    ReceiveName,
    AccountTransaction,
    AccountTransactionType,
    signTransaction,
    TransactionExpiry,
} from "@concordium/web-sdk";
import * as SmartWallet from "@/constants/smart_contract_smart_contract_wallet"
import { Buffer } from "buffer";
import {
    Cis2BalanceOfAccountParameter,
    GetCis2WithdrawMessageHashParameter,
    TransferCis2TokensParameter,
    WithdrawCis2TokensParameter
} from '@/constants/smart_contract_smart_contract_wallet';


export type Response = {
    status: boolean;
    message: string
}

export type TransactionPayload = {
    publicKey: string;
    privateKey: string;
    amount: number;
    receiver: string;
}


export class ConcordiumWallet {
    private contractAddress: number;
    private grpc: ConcordiumGRPCWebClient;
    private signer: AccountSigner;
    private name: string
    private tokenAddress: number;

    constructor(contractAddress: number) {
        this.contractAddress = contractAddress;
        this.grpc = new ConcordiumGRPCWebClient("https://grpc.testnet.concordium.com", 20000)
        //this.grpc = new ConcordiumGRPCWebClient('http://node.testnet.concordium.com', 20000)
        this.signer = buildBasicAccountSigner("bccce67043b1776484453eb2ba754ee6f7a2e982c10590cc1ef1be47d1001a57");
        this.name = "smart_contract_wallet";
        this.tokenAddress = 9173;

    }

    private async getSchema() {
        const mod_ref = ModuleReference.fromHexString("13feddf39ead0312f22d64ab591eb3457b6d258500b33dda29898f4b709cc9cc");
        const schema = await this.grpc.getEmbeddedSchema(mod_ref);
        return schema
    }

    /**
    *Returns the account address of the admin
    */
    private getSender() {
        return AccountAddress.fromBase58("38TN6fTCjgHYp7vXDagLJsb6s3UHzDANaGS2wXwgQLBUJrEian");
    }

    // returns of contract instance
    private getContract() {
        const contractAddr = ContractAddress.create(this.contractAddress);
        const contract = SmartWallet.createUnchecked(this.grpc, contractAddr)
        return contract;
    }
    /**
    *Generates ed25519 keypair for a user
    * @returns { publicKey: string, privateKey: string }
    */
    async generateKeyPair() {
        await sodium.ready;
        const keyPair = sodium.crypto_sign_keypair();
        const publickey = keyPair.publicKey
        const privateKey = keyPair.privateKey
        return {
            publicKey: Buffer.from(publickey).toString('hex'),
            privateKey: Buffer.from(privateKey).toString('hex'),
        }
    }
    /**
    *Checks and returns the ccd balance of a public key on the smart wallet
    * @param kpub ed25519 public key of the owner
    */
    public async getCCDBalanceOfAccount(kpub: string) {
        const contract = this.getContract();
        const result = await SmartWallet.dryRunCcdBalanceOfAccount(contract, kpub);
        const balance = SmartWallet.parseReturnValueCcdBalanceOfAccount(result);
        return balance?.toString();
    }

    /**
    *This method makes a transfer from a user to another publickey.
    The user first signs a transaction and the admin key sends the signed transaction to the chain.
    * @param kpub public key of the sender
    * @param kpr private key of the sender
    * @param amount amount to be transferred in CCDs
    * @param receiver public key of the receiver
    */

    public async makeCCDTransfer(kpub: string, kpr: string, amount: number, receiver: string): Promise<Response> {
        try {
            const contract = this.getContract();
            // @ts-ignore
            const nonce = BigInt(await this.getNonce(kpub));
            const expiry_time = Timestamp.futureMinutes(60)
            const message = {
                entry_point: "transferCcd",
                expiry_time,
                nonce,
                service_fee_amount: CcdAmount.zero(),
                service_fee_recipient: kpub,
                simple_transfers: [
                    {
                        to: receiver,
                        transfer_amount: CcdAmount.fromCcd(amount)
                    }
                ]
            }
            // Get the transfer message hash from the smart wallet
            const result = await SmartWallet.dryRunGetCcdTransferMessageHash(contract, message);
            const hash = SmartWallet.parseReturnValueGetCcdTransferMessageHash(result);
            const privateKeyBin = this.hexToUint8Array(kpr);

            // sign the message hash gotten from the contract
            //@ts-ignore 
            const signatureUint8 = sodium.crypto_sign_detached(result.returnValue?.buffer, privateKeyBin);
            const signature = sodium.to_hex(signatureUint8);
            const parameter = [
                {
                    message,
                    signature,
                    signer: kpub
                }
            ]
            const response = await SmartWallet.dryRunTransferCcd(contract, parameter);

            if (!response || response.tag === 'failure' || !response.returnValue) {
                const parsedErrorCode = SmartWallet.parseErrorMessageTransferCcd(response)?.type;
                return { status: false, message: JSON.stringify(parsedErrorCode) }
            }

            const maxContractExecutionEnergy = Energy.create(response.usedEnergy.value + BigInt(200));
            const metadata: ContractTransactionMetadata = {
                amount: CcdAmount.zero(),
                senderAddress: this.getSender(),
                energy: maxContractExecutionEnergy
            }
            const send = await SmartWallet.sendTransferCcd(contract, metadata, parameter, this.signer);

            //console.log(send)

            const res = { status: true, message: "Transaction was successful" }
            return res;
        } catch (err) {
            return { status: false, message: "something went wrong" }

        }

    }

    /**
   *deposits 10 ccd to a publickey from the admin wallet
   * @param kpub
   */

    public async airdrop(kpub: string): Promise<Response> {
        const contract = this.getContract();
        const invokeMetadata: ContractInvokeMetadata = {
            amount: CcdAmount.fromCcd(10),
            invoker: this.getSender(),
        }
        //simulate transaction
        const dryRun = await SmartWallet.dryRunDepositCcd(contract, kpub, invokeMetadata);
        if (!dryRun || dryRun.tag === 'failure' || !dryRun.returnValue) {
            const parsedErrorCode = SmartWallet.parseErrorMessageDepositCcd(dryRun)?.type;
            return { status: false, message: JSON.stringify(parsedErrorCode) }
        }
        const maxContractExecutionEnergy = Energy.create(dryRun.usedEnergy.value + BigInt(200));
        const metadata: ContractTransactionMetadata = {
            amount: CcdAmount.fromCcd(10),
            senderAddress: this.getSender(),
            energy: maxContractExecutionEnergy
        }
        const hash = await SmartWallet.sendDepositCcd(contract, metadata, kpub, this.signer);
        //console.log(hash)
        return { status: true, message: "Recevied 10 CCD Successfully" }
    }


    /**
    *Withdraws CCD out of the smart wallet to an account on the blockchain
    * @param kpub ed25519 public key of the sender
    * @param kpr ed25519 private key of the sender
    * @param amount amount to be withdrawn in ccds
    * @param receiver account address of the receiver
    * @returns { status: boolean, message: string }
    */
    public async withdrawCCD(kpub: string, kpr: string, amount: number, receiver: string) {
        try {
            const contract = this.getContract();
            const expiry_time = Timestamp.futureMinutes(60)
            // @ts-ignore
            const nonce = BigInt(await this.getNonce(kpub));
            const message = {
                entry_point: "withdrawCcd",
                expiry_time,
                nonce,
                service_fee_amount: CcdAmount.fromCcd(amount),
                service_fee_recipient: kpub,
                simple_withdraws: [
                    {
                        to: {
                            type: "Account",
                            content: AccountAddress.fromBase58(receiver)
                        },
                        withdraw_amount: CcdAmount.fromCcd(amount),
                        data: ""
                    },
                ]
            }
            //@ts-ignore
            const result = await SmartWallet.dryRunGetCcdWithdrawMessageHash(contract, message);
            //console.log(result)
            const privateKeyBin = this.hexToUint8Array(kpr);

            // sign the message hash gotten from the contract
            //@ts-ignore 
            const signatureUint8 = sodium.crypto_sign_detached(result.returnValue?.buffer, privateKeyBin);
            const signature = sodium.to_hex(signatureUint8);
            const parameter = [
                {
                    message,
                    signature,
                    signer: kpub
                }
            ]
            // simulate transaction
            //@ts-ignore 
            const dryRun = await SmartWallet.dryRunWithdrawCcd(contract, parameter);
            if (!dryRun || dryRun.tag === 'failure' || !dryRun.returnValue) {
                const parsedErrorCode = SmartWallet.parseErrorMessageWithdrawCcd(dryRun)?.type;
                return { status: false, message: JSON.stringify(parsedErrorCode) }
            }
            const maxContractExecutionEnergy = Energy.create(dryRun.usedEnergy.value + BigInt(200));
            const metadata: ContractTransactionMetadata = {
                amount: CcdAmount.fromCcd(0),
                senderAddress: this.getSender(),
                energy: maxContractExecutionEnergy
            }
            //@ts-ignore
            await SmartWallet.sendWithdrawCcd(contract, metadata, parameter, this.signer)

            return { status: true, message: "Your withdrawal was sent successfully" }

        } catch (err) {
            return { status: false, message: "Something went wrong" }

        }

    }

    /**
   *Checks and returns the cis2 token balance of a public key on the smart wallet
   * @param kpub ed25519 public key of the owner
   */
    public async balanceOfCis2Tokens(kpub: string): Promise<any> {
        const contract = this.getContract();
        const tokenAddress = ContractAddress.create(this.tokenAddress);
        const message: Cis2BalanceOfAccountParameter = {
            token_id: "",
            cis2_token_contract_address: tokenAddress,
            public_key: kpub
        }
        const dryRun = await SmartWallet.dryRunCis2BalanceOfAccount(contract, message);
        //console.log(dryRun)
        const balance = SmartWallet.parseReturnValueCis2BalanceOfAccount(dryRun);
        return balance?.toString();
    }

    /**
    *Transfers CIS2 token from an owner to another publickey on the smart contract
    * @param payload Transaction payload to perform a transfer on the contract.
    * @param payload.publicKey ed25519 public key of the sender
    * @param payload.privatKey ed25519 private key of the sender 
    * @param payload.amount amount to be transferred
    * @param payload.receiver ed25519 public key of the receiver   
    */
    public async transferCis2Tokens(payload: TransactionPayload): Promise<Response> {
        try {
            const contract = this.getContract();
            const tokenAddress = ContractAddress.create(this.tokenAddress);
            // @ts-ignore
            const nonce = BigInt(await this.getNonce(payload.publicKey));
            const message = {
                entry_point: "transferCis2Tokens",
                expiry_time: Timestamp.futureMinutes(60),
                nonce,
                service_fee_recipient: payload.publicKey,
                service_fee_amount: {
                    token_amount: 0,
                    token_id: "",
                    cis2_token_contract_address: tokenAddress,
                },
                simple_transfers: [{
                    to: payload.receiver,
                    transfer_amount: {
                        token_amount: payload.amount * (10 ** 9),
                        token_id: "",
                        cis2_token_contract_address: tokenAddress,
                    }
                }]
            };
            const result = await SmartWallet.dryRunGetCis2TransferMessageHash(contract, message);
            const privateKeyBin = this.hexToUint8Array(payload.privateKey);
            //@ts-ignore 
            const signatureUint8 = sodium.crypto_sign_detached(result.returnValue?.buffer, privateKeyBin);
            const signature = sodium.to_hex(signatureUint8);
            const param: TransferCis2TokensParameter = [{
                signer: payload.publicKey,
                signature,
                message,

            }]
            const dryRun = await SmartWallet.dryRunTransferCis2Tokens(contract, param);
            if (!dryRun || dryRun.tag === 'failure' || !dryRun.returnValue) {
                const parsedErrorCode = SmartWallet.parseErrorMessageWithdrawCcd(dryRun)?.type;
                return { status: false, message: JSON.stringify(parsedErrorCode) }
            }
            const energy = Energy.create(dryRun.usedEnergy.value + BigInt(200));
            const metadata: ContractTransactionMetadata = {
                amount: CcdAmount.fromCcd(0),
                senderAddress: this.getSender(),
                energy
            }
            await SmartWallet.sendTransferCis2Tokens(contract, metadata, param, this.signer)
            return { status: true, message: "Transfer was Succesful" }
        } catch (err) {
            return { status: false, message: "something went wrong" }
        }

    }
    public async withdrawCis2Tokens(payload: TransactionPayload): Promise<Response> {
        try {
            const contract = this.getContract();
            const tokenAddress = ContractAddress.create(this.tokenAddress);
            // @ts-ignore
            const nonce = BigInt(await this.getNonce(payload.publicKey));
            const amount = payload.amount * (10 ** 9)
            const message: GetCis2WithdrawMessageHashParameter = {
                entry_point: "withdrawCis2Tokens",
                expiry_time: Timestamp.futureMinutes(60),
                nonce,
                service_fee_recipient: payload.publicKey,
                service_fee_amount: {
                    token_amount: 0,
                    token_id: "",
                    cis2_token_contract_address: tokenAddress,
                },
                simple_withdraws: [{
                    to: {
                        type: "Account",
                        content: AccountAddress.fromBase58(payload.receiver)
                    },
                    withdraw_amount: {
                        token_amount: BigInt(amount),
                        token_id: "",
                        cis2_token_contract_address: tokenAddress,
                    },
                    data: ""
                }]
            };
            const result = await SmartWallet.dryRunGetCis2WithdrawMessageHash(contract, message);
            const privateKeyBin = this.hexToUint8Array(payload.privateKey);
            //@ts-ignore 
            const signatureUint8 = sodium.crypto_sign_detached(result.returnValue?.buffer, privateKeyBin);
            const signature = sodium.to_hex(signatureUint8);
            const param: WithdrawCis2TokensParameter = [{
                signer: payload.publicKey,
                signature,
                message,

            }]
            const dryRun = await SmartWallet.dryRunWithdrawCis2Tokens(contract, param);
            if (!dryRun || dryRun.tag === 'failure' || !dryRun.returnValue) {
                const parsedErrorCode = SmartWallet.parseErrorMessageWithdrawCcd(dryRun)?.type;
                return { status: false, message: JSON.stringify(parsedErrorCode) }
            }
            const energy = Energy.create(dryRun.usedEnergy.value + BigInt(200));
            const metadata: ContractTransactionMetadata = {
                amount: CcdAmount.fromCcd(0),
                senderAddress: this.getSender(),
                energy
            }
            await SmartWallet.sendWithdrawCis2Tokens(contract, metadata, param, this.signer)
            return { status: true, message: "Transfer was Succesful" }

        } catch (err) {
            return { status: false, message: "something went wrong" }

        }

    }


    /**
   *deposits 10 ccd to a publickey from the admin wallet
   * @param publicKey ed25519 public key of the receiptient
   * @param _amount amount of token to be deposited
   */

    async airdropCis2Token(publicKey: string, _amount: number): Promise<Response> {
        try {
            const sender = this.getSender();
            const signer = this.signer;
            const mod_ref = ModuleReference.fromHexString("17dc53460985e3259d1ea88de9c9b6360ce4f43d3ccca66907cb7a559cc44cb6");
            const schema = await this.grpc.getEmbeddedSchema(mod_ref);
            const amount = _amount * (10 ** 9)
            const param = {
                amount: amount.toString(),
                data: publicKey,
                from: {
                    Account: [sender]
                },
                to: {
                    Contract: [{
                        index: Number(this.contractAddress),
                        subindex: 0
                    },
                        'depositCis2Tokens'
                    ]
                },
                token_id: ''
            };
            const updateHeader: AccountTransactionHeader = {
                expiry: TransactionExpiry.futureMinutes(10),
                nonce: (await this.grpc.getNextAccountNonce(sender)).nonce,
                sender,
            };

            const updateParams = serializeUpdateContractParameters(
                ContractName.fromString("token"),
                EntrypointName.fromString("transfer"),
                [param],
                schema,
            );
            //console.log({updateHeader, updateParams})
            const updatePayload: UpdateContractPayload = {
                amount: CcdAmount.fromCcd(0),
                address: ContractAddress.create(9173),
                receiveName: ReceiveName.fromString("token.transfer"),
                message: updateParams,
                maxContractExecutionEnergy: Energy.create(30000),
            };
            //console.log({updatePayload})
            const updateTransaction: AccountTransaction = {
                header: updateHeader,
                payload: updatePayload,
                type: AccountTransactionType.Update,
            };
            const updateSignature = await signTransaction(updateTransaction, signer);
            const hash = await this.grpc.sendAccountTransaction(
                updateTransaction,
                updateSignature
            );
            console.log('Transaction submitted, waiting for finalization...');
            const updateStatus = await this.grpc.waitForTransactionFinalization(hash);

            return { status: true, message: "Airdrop was sent succesfully" }

        } catch (err) {
            //console.log(err)
            return { status: false, message: "Airdrop was not succesful, Please try again" }
        }

    }


    public async getNonce(kpub: string) {
        const contract = this.getContract();
        const result = await SmartWallet.dryRunNonceOf(contract, [kpub]);
        const nonce = SmartWallet.parseReturnValueNonceOf(result);
        return nonce?.toString();

    }

    public async getExpiryTime() {
        const currentTime = new Date();
        const expiryTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
        return expiryTime; // Convert to ISO 8601 string
    }
    private hexToUint8Array(hexString: string) {
        const bytes = new Uint8Array(hexString.length / 2);
        for (let i = 0; i < hexString.length; i += 2) {
            bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
        }
        return bytes;
    }
}



module.exports = {
    ConcordiumWallet,
}