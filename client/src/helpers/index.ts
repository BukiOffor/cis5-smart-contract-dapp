import sodium from 'libsodium-wrappers';

import { credentials } from '@grpc/grpc-js';
import {
    AccountAddress,
    IdentityObjectV1,
    createConcordiumClient,
    isRpcError,
    signCredentialTransaction,
    getAccountAddress, createCredentialTransactionNoSeed, buildBasicAccountSigner, BlockInfo, AccountInfo,
    CIS2Contract,
    ModuleReference,
    AccountTransactionType,
    NextAccountNonce,
    AccountTransactionHeader,
    AccountTransaction,
    SimpleTransferPayload,
    CcdAmount,
    TransactionExpiry,
    AccountTransactionSignature,
    signTransaction,
    serializeUpdateContractParameters, Network
} from '@concordium/node-sdk';

import { ContractName, CredentialInputNoSeed} from "@concordium/web-sdk";
import {ConcordiumGRPCClient} from "@concordium/common-sdk/lib/GRPCClient";
import { Buffer } from "buffer";

async function generateKeyPair() {
    await sodium.ready;
    const keyPair = sodium.crypto_sign_keypair();
    const publickey = keyPair.publicKey
    const privateKey = keyPair.privateKey
    return {
        publicKey: Buffer.from(publickey).toString( 'hex'),
        privateKey: Buffer.from(privateKey). toString ('hex'),

        }
}

class ConcordiumWallet{
    private client: ConcordiumGRPCClient;

    constructor() {
        const address:string = "node.testnet.concordium.com";
        const port = 20000;
        this.client = createConcordiumClient(address, Number(port), credentials.createInsecure(),  { timeout: 15000 });
    }

    async generateKeyPair() {
        await sodium.ready;
        const keyPair = sodium.crypto_sign_keypair();
        const publickey = keyPair.publicKey
        const privateKey = keyPair.privateKey
        return {
            publicKey: Buffer.from(publickey).toString( 'hex'),
            privateKey: Buffer.from(privateKey). toString ('hex'),
    
            }
    }
    public async getCCDBalance(kpub: string) {
       
       
    }

}

module.exports = {
    generateKeyPair
}