import sodium from 'libsodium-wrappers';


import { 
    ContractAddress,
    ConcordiumGRPCWebClient, Timestamp, AccountAddress,
    CcdAmount, Energy, AccountSigner,
    buildBasicAccountSigner,ContractInvokeMetadata,
    ModuleReference, ContractTransactionMetadata,
    } from "@concordium/web-sdk";
import * as SmartWallet from "@/constants/module_smart_contract_wallet"
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

export type Response = {
    status: boolean;
    message: string
}



export class ConcordiumWallet{
    private contractAddress: number;
    private grpc: ConcordiumGRPCWebClient;
    private signer: AccountSigner;
    private name: string

    constructor(contractAddress: number) {
        this.contractAddress = contractAddress;
        this.grpc = new ConcordiumGRPCWebClient("http://node.testnet.concordium.com", 20000)
        this.signer = buildBasicAccountSigner("bccce67043b1776484453eb2ba754ee6f7a2e982c10590cc1ef1be47d1001a57");
        this.name = "smart_contract_wallet";    
    }

    private async getSchema(){
        const mod_ref = ModuleReference.fromHexString("13feddf39ead0312f22d64ab591eb3457b6d258500b33dda29898f4b709cc9cc");
        const schema = await this.grpc.getEmbeddedSchema(mod_ref);
        return schema
    }

    private getSender(){
        return AccountAddress.fromBase58("38TN6fTCjgHYp7vXDagLJsb6s3UHzDANaGS2wXwgQLBUJrEian");
    }

    private getContract(){
        const contractAddr = ContractAddress.create(this.contractAddress);
        const contract = SmartWallet.createUnchecked(this.grpc, contractAddr) 
        return contract;
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
    public async getCCDBalanceOfAccount(kpub: string) {
       const contract = this.getContract();
       const result = await SmartWallet.dryRunCcdBalanceOfAccount(contract, kpub);
       const balance = SmartWallet.parseReturnValueCcdBalanceOfAccount(result);
       return balance?.toString();       
    }

    public async makeCCDTransfer(kpub: string, kpr:string, amount: number, receiver: string): Promise<Response> {
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
        const response =  await SmartWallet.dryRunTransferCcd(contract, parameter);
        
        if (!response || response.tag === 'failure' || !response.returnValue) {
            const parsedErrorCode = SmartWallet.parseErrorMessageTransferCcd(response)?.type;
            return {status:false, message: JSON.stringify(parsedErrorCode)}
        }
               
        const maxContractExecutionEnergy = Energy.create(response.usedEnergy.value + BigInt(200));
        const metadata:ContractTransactionMetadata = {
            amount: CcdAmount.zero(),
            senderAddress: this.getSender(),
            energy: maxContractExecutionEnergy
        }
        const send = await SmartWallet.sendTransferCcd(contract,metadata,parameter,this.signer);
        
        console.log(send)

        const res = {status: true, message:"Transaction was successful"}
        return res;
    }


    public async airdrop(kpub:string): Promise<Response>{
        const contract = this.getContract();
        const invokeMetadata:ContractInvokeMetadata = {
            amount: CcdAmount.fromCcd(10),
            invoker: this.getSender(),
        }
        const dryRun = await SmartWallet.dryRunDepositCcd(contract,kpub,invokeMetadata);
        if (!dryRun || dryRun.tag === 'failure' || !dryRun.returnValue) {
            const parsedErrorCode = SmartWallet.parseErrorMessageDepositCcd(dryRun)?.type;
            return {status:false, message: JSON.stringify(parsedErrorCode)}
        }
        const maxContractExecutionEnergy = Energy.create(dryRun.usedEnergy.value + BigInt(200));
        const metadata:ContractTransactionMetadata = {
            amount: CcdAmount.fromCcd(10),
            senderAddress: this.getSender(),
            energy: maxContractExecutionEnergy
        } 
        const hash = await SmartWallet.sendDepositCcd(contract,metadata,kpub,this.signer);
        console.log(hash)
        return  {status:true, message:"Recevied 10 CCD Successfully"}
    }

    public async withdrawCCD(kpub: string, kpr:string, amount: number, receiver: string) {
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
        console.log(result)
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
        //@ts-ignore 
        const dryRun =  await SmartWallet.dryRunWithdrawCcd(contract, parameter);
        if (!dryRun || dryRun.tag === 'failure' || !dryRun.returnValue) {
            const parsedErrorCode = SmartWallet.parseErrorMessageWithdrawCcd(dryRun)?.type;
            return {status:false, message: JSON.stringify(parsedErrorCode)}
        }
        const maxContractExecutionEnergy = Energy.create(dryRun.usedEnergy.value + BigInt(200));
        const metadata:ContractTransactionMetadata = {
            amount: CcdAmount.fromCcd(0),
            senderAddress: this.getSender(),
            energy: maxContractExecutionEnergy
        } 
        //@ts-ignore
        await SmartWallet.sendWithdrawCcd(contract,metadata,parameter,this.signer)
        
        return { status:true, message: "Your withdrawal was sent successfully" }

    }

    public async getNonce(kpub: string){
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
    private hexToUint8Array(hexString:string) {
        const bytes = new Uint8Array(hexString.length / 2);
        for (let i = 0; i < hexString.length; i += 2) {
          bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
        }
        return bytes;
      }



}

module.exports = {
    generateKeyPair,
    ConcordiumWallet,
}