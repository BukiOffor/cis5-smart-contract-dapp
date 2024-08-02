// import { AccountAddress, AccountTransaction, AccountTransactionHeader, AccountTransactionType, CIS2Contract,
//     CcdAmount, ConcordiumGRPCClient, Contract, ContractContext, InitContractPayload,
//     ModuleReference, UpdateContractPayload, affectedContracts,
//     buildBasicAccountSigner, createConcordiumClient, serializeInitContractParameters,
//     serializeUpdateContractParameters, signTransaction, unwrap, deserializeReceiveReturnValue } from "@concordium/node-sdk";
// // import "../api/middleware/errors";
// import { Service } from "typedi";
// import { credentials } from '@grpc/grpc-js';
// import { ICreatePowerup, IMintGameItem, IPowerUp, IUser, IWithdrawConcordiumPayload } from "../interfaces";
// import { Concordium } from "../database/repository/concordium";
// import { Point, Transaction, Wallet } from "../database/repository";
// import { NotificationService } from "./notification";
// import { ApiError, Message, encryption, misc } from "../utils";
// import { getDefaultTransactionExpiry } from "./concordium";
// import { environment } from "../config";
// import { ConcordiumService } from "./concordium";
// import sodium from 'libsodium-wrappers';
// import { } from "@concordium/web-sdk"


// @Service()
// export class GateNftService {
//     private client: ConcordiumGRPCClient;
//     constructor(private readonly wallet: Wallet,
//                 private readonly transaction: Transaction,
//                 private readonly notification: NotificationService,
//                 private readonly point: Point,
//                 private readonly concordium: Concordium,
//                 private concordiumService: ConcordiumService
//     ) {
//         const address = environment.concordiumAdmin.clientAddress; // use 'Testnet' for the testnet.

//         const port = 20000;
//         const security = environment.concordiumAdmin.environment === 'Mainnet' ? credentials.createSsl() : credentials.createInsecure();
//         this.client = createConcordiumClient(address, Number(port), security,  { timeout: 15000000 });
//     }
    
//     public async mint(tokenId?: string, price?: number,user?: IUser, amount?: string) {
//         // const wallet = await this.concordium.findByUserId(user.id);
//         // if (!wallet) throw new ApiError(Message.walletNotFound, 400);
//         // const signingKey = await encryption.decrypt({
//         //     seedPhrase: misc.emailToSecret(user.email),
//         //     iv: wallet.signingKeyIv,
//         //     text: wallet.encryptedSiginingKey,
//         // });
//         const wallet = await this.concordium.getOrCreateConcordiumKeyPairs(user);
//         if (!wallet) throw new ApiError(Message.walletNotFound, 400);

//         const sender = new AccountAddress(environment.concordiumAdmin.sender);
//         const signer = buildBasicAccountSigner(environment.concordiumAdmin.signingKey);

//         const moduleRef = new ModuleReference(environment.concordiumAdmin.gateNftModuleReference);

//         const maxCost = BigInt(30000);
//         const contractName = 'gateway_nft';
//         const receiveName = 'gateway_nft.mint';
//         const schema = await this.client.getEmbeddedSchema(moduleRef);
//         const index = environment.concordiumAdmin.gateSmartWalletAddress
//         console.log({index, wallet: wallet.publicKey})
//         const paramJson = {
//             token_id: tokenId, 
//             amount,
//             data: wallet.publicKey,
//             owner: {
//                 Contract: [{
//                     index: Number(environment.concordiumAdmin.gateSmartWalletAddress),
//                     subindex: 0
//                 }, 
//                 'depositCis2Tokens'
//             ]
//             },
//         };
//         const updateHeader: AccountTransactionHeader = {
//             // @ts-ignore
//             expiry: getDefaultTransactionExpiry(),
//             nonce: (await this.client.getNextAccountNonce(sender)).nonce,
//             sender,
//         };
//         const updateParams = serializeUpdateContractParameters(
//             contractName,
//             'mint',
//             paramJson,
//             schema,
//         );
//         console.log({updateHeader, updateParams})
//         const contractAddress = { index: environment.concordiumAdmin.gateNftTokenAddress, subindex: 0n };
//         console.log({contractAddress})
//         const updatePayload: UpdateContractPayload = {
//             amount: new CcdAmount(price * (10 ** 6)),
//             address: unwrap(contractAddress),
//             receiveName,
//             message: updateParams,
//             maxContractExecutionEnergy: maxCost,
//         };
//         console.log({updatePayload})
//         const updateTransaction: AccountTransaction = {
//             header: updateHeader,
//             payload: updatePayload,
//             type: AccountTransactionType.Update,
//         };
//         const updateSignature = await signTransaction(updateTransaction, signer);
//         const updateTrxHash = await this.client.sendAccountTransaction(
//             updateTransaction,
//             updateSignature
//         );
//         console.log('Transaction submitted, waiting for finalization...');
//         const updateStatus = await this.client.waitForTransactionFinalization(updateTrxHash);
//         console.dir(updateStatus, { depth: null, colors: true });

//         return updateTrxHash
//     }

//     public async createPowerup(payload: ICreatePowerup) {
//         const sender = new AccountAddress(environment.concordiumAdmin.sender);
//         const signer = buildBasicAccountSigner(environment.concordiumAdmin.signingKey);

//         const moduleRef = new ModuleReference(environment.concordiumAdmin.gateNftModuleReference);
//         const maxCost = BigInt(30000);
//         const contractName = 'gateway_nft';
//         const receiveName = 'gateway_nft.create_power_up';
//         const schema = await this.client.getEmbeddedSchema(moduleRef);
//         console.log({schema})

//         const paramJson = {
//             base_token: payload.base_token,
//             power_token: payload.power_token,
//             power: payload.power
//         };
//         const updateHeader: AccountTransactionHeader = {
//             // @ts-ignore
//             expiry: getDefaultTransactionExpiry(),
//             nonce: (await this.client.getNextAccountNonce(sender)).nonce,
//             sender,
//         };
//         const updateParams = serializeUpdateContractParameters(
//             contractName,
//             'create_power_up',
//             paramJson,
//             schema,
//         );
//         console.log({updateHeader, updateParams})
//         const contractAddress = { index: environment.concordiumAdmin.gateNftTokenAddress, subindex: 0n };
//         console.log({contractAddress})
//         const updatePayload: UpdateContractPayload = {
//             amount: new CcdAmount(0),
//             address: unwrap(contractAddress),
//             receiveName,
//             message: updateParams,
//             maxContractExecutionEnergy: maxCost,
//         };
//         console.log({updatePayload})
//         const updateTransaction: AccountTransaction = {
//             header: updateHeader,
//             payload: updatePayload,
//             type: AccountTransactionType.Update,
//         };
//         const updateSignature = await signTransaction(updateTransaction, signer);
//         const updateTrxHash = await this.client.sendAccountTransaction(
//             updateTransaction,
//             updateSignature
//         );
//         console.log('Transaction submitted, waiting for finalization...');
//         const updateStatus = await this.client.waitForTransactionFinalization(updateTrxHash);
//         console.dir(updateStatus, { depth: null, colors: true });

//         return updateTrxHash
//     }

//     public async powerUp(payload: IPowerUp, user: IUser) {
//         // const wallet = await this.concordium.findByUserId(user.id);
//         const wallet = await this.concordium.getOrCreateConcordiumKeyPairs(user)
//         if (!wallet) throw new ApiError(Message.walletNotFound, 400);
//         // const signingKey = await encryption.decrypt({
//         //     seedPhrase: misc.emailToSecret(user.email),
//         //     iv: wallet.signingKeyIv,
//         //     text: wallet.encryptedSiginingKey,
//         // });
//         // const sender = new AccountAddress(wallet.address);
//         // const signer = buildBasicAccountSigner(signingKey);
//         const sender = new AccountAddress(environment.concordiumAdmin.sender);
//         const signer = buildBasicAccountSigner(environment.concordiumAdmin.signingKey);
//         const moduleRef = new ModuleReference(environment.concordiumAdmin.gateNftModuleReference);
//         const maxCost = BigInt(30000);
//         const contractName = 'gateway_nft';
//         const receiveName = 'gateway_nft.power_up';
//         const schema = await this.client.getEmbeddedSchema(moduleRef);
 

//         const from = payload.from.toLowerCase()
//         const to = payload.to.toLowerCase()
//         const amount = payload.quantity.toString()
//         const paramJson = {
//             base_token: from, 
//             power_token: to,
//             amount,
//             is_smart_account: true,
//             data: wallet.publicKey,
//             owner: {
//                 Contract: [{
//                     index: Number(environment.concordiumAdmin.gateSmartWalletAddress),
//                     subindex: 0
//                 },
//                 '' 
//             ]
//             },
//         };
//         // const paramJson = {
//         //     params: {
//         //         base_token: from,
//         //         power_token: to,
//         //         amount: payload.quantity
//         //       },
//         //     address: sender
//         // }

//         const updateHeader: AccountTransactionHeader = {
//             // @ts-ignore
//             expiry: getDefaultTransactionExpiry(),
//             nonce: (await this.client.getNextAccountNonce(sender)).nonce,
//             sender,
//         };
//         const updateParams = serializeUpdateContractParameters(
//             contractName,
//             'power_up',
//             paramJson,
//             schema,
//         );
//         console.log({updateHeader, updateParams})
//         const contractAddress = { index: environment.concordiumAdmin.gateNftTokenAddress, subindex: 0n };
//         console.log({contractAddress})
//         const updatePayload: UpdateContractPayload = {
//             amount: new CcdAmount(0),
//             address: unwrap(contractAddress),
//             receiveName,
//             message: updateParams,
//             maxContractExecutionEnergy: maxCost,
//         };
//         console.log({updatePayload})
//         const updateTransaction: AccountTransaction = {
//             header: updateHeader,
//             payload: updatePayload,
//             type: AccountTransactionType.Update,
//         };
//         const updateSignature = await signTransaction(updateTransaction, signer);
//         const updateTrxHash = await this.client.sendAccountTransaction(
//             updateTransaction,
//             updateSignature
//         );
//         console.log('Transaction submitted, waiting for finalization...');
//         const updateStatus = await this.client.waitForTransactionFinalization(updateTrxHash);
//         console.dir(updateStatus, { depth: null, colors: true });

//         return updateTrxHash
//     }

//     public async addToken(price: number, url: string) {
//         // const wallet = await this.concordium.findByUserId(user.id);
//         // if (!wallet) throw new ApiError(Message.walletNotFound, 400);
//         // const signingKey = await encryption.decrypt({
//         //     seedPhrase: misc.emailToSecret(user.email),
//         //     iv: wallet.signingKeyIv,
//         //     text: wallet.encryptedSiginingKey,
//         // });
//         const sender = new AccountAddress(environment.concordiumAdmin.sender);
//         const signer = buildBasicAccountSigner(environment.concordiumAdmin.signingKey);
//         // const sender = new AccountAddress('3DBHuPUv244AeXL2QJPn6LQwdG75U8dMykSYFdXqpnAMQCBH7o')
//         // const signer = buildBasicAccountSigner('f4b62724c9340fffb19d1e0d544100a95689be47382de6ae5c2e2d9f35804943')
//         // const moduleRef Testnet = new ModuleReference('a4acdd2536ad8a4a9c5b46164c975a1a07ba2c01564d8caf2cc43f7c85083f06');
//         // const moduleRef Mainnet = new ModuleReference('286a3df85fc5f283eebd3328d9ec202844f94d7c0052b81d40d2fc18ff2fdb71');
//         const moduleRef = new ModuleReference(environment.concordiumAdmin.gateNftModuleReference);
//         const maxCost = BigInt(30000);
//         const contractName = 'gateway_nft';
//         const receiveName = 'gateway_nft.add_token';
//         const schema = await this.client.getEmbeddedSchema(moduleRef);
//         console.log({schema})

//         const paramJson = {
//             meta_data: {
//                 url,
//                 hash: { None: [] }
//             },
//             price: price

//         };
//         const updateHeader: AccountTransactionHeader = {
//             // @ts-ignore
//             expiry: getDefaultTransactionExpiry(),
//             nonce: (await this.client.getNextAccountNonce(sender)).nonce,
//             sender,
//         };
//         const updateParams = serializeUpdateContractParameters(
//             contractName,
//             'add_token',
//             paramJson,
//             schema,
//         );
//         console.log({updateHeader, updateParams})
//         const contractAddress = { index: environment.concordiumAdmin.gateNftTokenAddress, subindex: 0n };
//         console.log({contractAddress})
//         const updatePayload: UpdateContractPayload = {
//             amount: new CcdAmount(0),
//             address: unwrap(contractAddress),
//             receiveName,
//             message: updateParams,
//             maxContractExecutionEnergy: maxCost,
//         };
//         console.log({updatePayload})
//         const updateTransaction: AccountTransaction = {
//             header: updateHeader,
//             payload: updatePayload,
//             type: AccountTransactionType.Update,
//         };
//         const updateSignature = await signTransaction(updateTransaction, signer);
//         const updateTrxHash = await this.client.sendAccountTransaction(
//             updateTransaction,
//             updateSignature
//         );
//         console.log('Transaction submitted, waiting for finalization...');
//         const updateStatus = await this.client.waitForTransactionFinalization(updateTrxHash);
//         console.dir(updateStatus, { depth: null, colors: true });

//         return updateTrxHash
//     }

//     async burnNFT(tokenId: string, user:IUser) {
//         const wallet = await this.concordium.findByUserId(user.id);
//         if (!wallet) throw new ApiError(Message.walletNotFound, 400);
//         const signingKey = await encryption.decrypt({
//             seedPhrase: misc.emailToSecret(user.email),
//             iv: wallet.signingKeyIv,
//             text: wallet.encryptedSiginingKey,
//         });
//         // const sender = new AccountAddress('3DBHuPUv244AeXL2QJPn6LQwdG75U8dMykSYFdXqpnAMQCBH7o')
//         // const signer = buildBasicAccountSigner('f4b62724c9340fffb19d1e0d544100a95689be47382de6ae5c2e2d9f35804943')
//         const sender = new AccountAddress(wallet.address);
//         const signer = buildBasicAccountSigner(signingKey);
//         const moduleRef = new ModuleReference('a4acdd2536ad8a4a9c5b46164c975a1a07ba2c01564d8caf2cc43f7c85083f06');
//         const maxCost = BigInt(30000);
//         const contractName = 'gateway_nft';
//         const receiveName = 'gateway_nft.burn';
//         const schema = await this.client.getEmbeddedSchema(moduleRef);
 
//         const paramJson = {
//             token_id: tokenId, 
//             amount: "1",
//             owner: {
//                 Account: [sender] 
//             },
//         };
//             // message: "https://gateway.pinata.cloud/ipfs/QmZ3939dLLFzvYZjFnkdqACe2n9TQA8Rx4efbjaYTXteeu",
//             // Ensure all additional fields are as expected by the contract.
//         const updateHeader: AccountTransactionHeader = {
//             // @ts-ignore
//             expiry: getDefaultTransactionExpiry(),
//             nonce: (await this.client.getNextAccountNonce(sender)).nonce,
//             sender,
//         };
//         const updateParams = serializeUpdateContractParameters(
//             contractName,
//             'burn',
//             paramJson,
//             schema,
//         );
//         console.log({updateHeader, updateParams})
//         const contractAddress = { index: environment.concordiumAdmin.gateNftTokenAddress, subindex: 0n };
//         console.log({contractAddress})
//         const updatePayload: UpdateContractPayload = {
//             amount: new CcdAmount(0),
//             address: unwrap(contractAddress),
//             receiveName,
//             message: updateParams,
//             maxContractExecutionEnergy: maxCost,
//         };
//         console.log({updatePayload})
//         const updateTransaction: AccountTransaction = {
//             header: updateHeader,
//             payload: updatePayload,
//             type: AccountTransactionType.Update,
//         };
//         const updateSignature = await signTransaction(updateTransaction, signer);
//         const updateTrxHash = await this.client.sendAccountTransaction(
//             updateTransaction,
//             updateSignature
//         );
//         console.log('Transaction submitted, waiting for finalization...');
//         const updateStatus = await this.client.waitForTransactionFinalization(updateTrxHash);
//         console.dir(updateStatus, { depth: null, colors: true });

//         return updateTrxHash
//     }


//     async mintSession(tokenId?: string) {

//         // const sender = new AccountAddress('3DBHuPUv244AeXL2QJPn6LQwdG75U8dMykSYFdXqpnAMQCBH7o')
//         // const signer = buildBasicAccountSigner('f4b62724c9340fffb19d1e0d544100a95689be47382de6ae5c2e2d9f35804943')
//         const sender = new AccountAddress(environment.concordiumAdmin.sender);
//         const signer = buildBasicAccountSigner(environment.concordiumAdmin.signingKey);
//         const moduleRef = new ModuleReference(environment.concordiumAdmin.sessionsModuleRef);
//         const maxCost = BigInt(30000);
//         const contractName = 'sessions';
//         const receiveName = 'sessions.mint';
//         const schema = await this.client.getEmbeddedSchema(moduleRef);
 
//         const paramJson = {
//             token_id: 'a6680000', 
//             owner: {
//                 Account: [sender] 
//             },
//         };
//             // message: "https://gateway.pinata.cloud/ipfs/QmZ3939dLLFzvYZjFnkdqACe2n9TQA8Rx4efbjaYTXteeu",
//             // Ensure all additional fields are as expected by the contract.
//         const updateHeader: AccountTransactionHeader = {
//             // @ts-ignore
//             expiry: getDefaultTransactionExpiry(),
//             nonce: (await this.client.getNextAccountNonce(sender)).nonce,
//             sender,
//         };
//         const updateParams = serializeUpdateContractParameters(
//             contractName,
//             'mint',
//             paramJson,
//             schema,
//         );
//         console.log({updateHeader, updateParams})
//         // const contractAddress = { index: 8919n, subindex: 0n };
//         const contractAddress = { index: environment.concordiumAdmin.sessionsTokenAddress, subindex: 0n}
//         console.log({contractAddress})
//         const updatePayload: UpdateContractPayload = {
//             amount: new CcdAmount(0),
//             address: unwrap(contractAddress),
//             receiveName,
//             message: updateParams,
//             maxContractExecutionEnergy: maxCost,
//         };
//         console.log({updatePayload})
//         const updateTransaction: AccountTransaction = {
//             header: updateHeader,
//             payload: updatePayload,
//             type: AccountTransactionType.Update,
//         };
//         const updateSignature = await signTransaction(updateTransaction, signer);
//         const updateTrxHash = await this.client.sendAccountTransaction(
//             updateTransaction,
//             updateSignature
//         );
//         console.log('Transaction submitted, waiting for finalization...');
//         const updateStatus = await this.client.waitForTransactionFinalization(updateTrxHash);
//         console.dir(updateStatus, { depth: null, colors: true });

//         return updateTrxHash
//     }

//     async burnSession(tokenId?: string) {
//         // const wallet = await this.concordium.findByUserId(user.id);
//         // if (!wallet) throw new ApiError(Message.walletNotFound, 400);
//         // const signingKey = await encryption.decrypt({
//         //     seedPhrase: misc.emailToSecret(user.email),
//         //     iv: wallet.signingKeyIv,
//         //     text: wallet.encryptedSiginingKey,
//         // });
//         const sender = new AccountAddress('3DBHuPUv244AeXL2QJPn6LQwdG75U8dMykSYFdXqpnAMQCBH7o')
//         const signer = buildBasicAccountSigner('f4b62724c9340fffb19d1e0d544100a95689be47382de6ae5c2e2d9f35804943')
//         // const sender = new AccountAddress(wallet.address);
//         // const signer = buildBasicAccountSigner(signingKey);
//         const moduleRef = new ModuleReference('42f70897ba7add9cd33fa7953fec53b7d00dde8dd21b4c88fd39a2818132f7a3');
//         const maxCost = BigInt(30000);
//         const contractName = 'gateway_sessions';
//         const receiveName = 'gateway_sessions.burn';
//         const schema = await this.client.getEmbeddedSchema(moduleRef);
 
//         const paramJson = {
//             token_id: 'a6680000', 
//             amount: "1",
//             owner: {
//                 Account: [sender] 
//             },
//         };
//             // message: "https://gateway.pinata.cloud/ipfs/QmZ3939dLLFzvYZjFnkdqACe2n9TQA8Rx4efbjaYTXteeu",
//             // Ensure all additional fields are as expected by the contract.
//         const updateHeader: AccountTransactionHeader = {
//             // @ts-ignore
//             expiry: getDefaultTransactionExpiry(),
//             nonce: (await this.client.getNextAccountNonce(sender)).nonce,
//             sender,
//         };
//         const updateParams = serializeUpdateContractParameters(
//             contractName,
//             'burn',
//             paramJson,
//             schema,
//         );
//         console.log({updateHeader, updateParams})
//         const contractAddress = { index: environment.concordiumAdmin.gateNftTokenAddress, subindex: 0n };
//         console.log({contractAddress})
//         const updatePayload: UpdateContractPayload = {
//             amount: new CcdAmount(0),
//             address: unwrap(contractAddress),
//             receiveName,
//             message: updateParams,
//             maxContractExecutionEnergy: maxCost,
//         };
//         console.log({updatePayload})
//         const updateTransaction: AccountTransaction = {
//             header: updateHeader,
//             payload: updatePayload,
//             type: AccountTransactionType.Update,
//         };
//         const updateSignature = await signTransaction(updateTransaction, signer);
//         const updateTrxHash = await this.client.sendAccountTransaction(
//             updateTransaction,
//             updateSignature
//         );
//         console.log('Transaction submitted, waiting for finalization...');
//         const updateStatus = await this.client.waitForTransactionFinalization(updateTrxHash);
//         console.dir(updateStatus, { depth: null, colors: true });

//         return updateTrxHash
//     }

//     async ccdBalanceOf(user: IUser) {
//         const wallet = await this.concordium.getOrCreateConcordiumKeyPairs(user)
//         const invoker = new AccountAddress(environment.concordiumAdmin.sender);

//         try {
//             const contractAddress = { index: environment.concordiumAdmin.gateSmartWalletAddress, subindex: 0n };
//             const receiveName = 'gateway_smart_wallet.ccdBalanceOf';
        
//             const moduleRef = new ModuleReference(environment.concordiumAdmin.smartWalletModuleRef);
//             const schema = await this.client.getEmbeddedSchema(moduleRef);
                
//             // Serialize the parameters
//             const serializedParams = serializeUpdateContractParameters(
//                 'gateway_smart_wallet',
//                 'ccdBalanceOf',
//                 // ["a6c22f4e0d5e48ddd5166a992773e2d12e0891727884859d32fcaeae72ba4c9a"],
//                 [wallet.publicKey],
//                 schema
//             );
        
//             // Invoke the contract
//             const result = await this.client.invokeContract({
//                 contract: unwrap(contractAddress),
//                 // invoker: new AccountAddress('3DBHuPUv244AeXL2QJPn6LQwdG75U8dMykSYFdXqpnAMQCBH7o'),
//                 invoker,
//                 method: 'gateway_smart_wallet.ccdBalanceOf',
//                 parameter: serializedParams,
//             });
        
//             console.log({ result });
        
        
//             // Deserialize the response if needed
//             // @ts-ignore
//             const decodedResult = deserializeReceiveReturnValue(result.returnValue, schema, 'gateway_smart_wallet',"ccdBalanceOf" );
        
//             console.log({decodedResult})
//             return decodedResult

//         } catch (error) {
//             console.error(error);
//         }
    
//     }

//     async deposit(amount: number, user: IUser) {
//         const contractAddress = { index: environment.concordiumAdmin.gateSmartWalletAddress, subindex: 0n };

//         const wallet = await this.concordium.getOrCreateConcordiumKeyPairs(user)
//         const sender = new AccountAddress(environment.concordiumAdmin.sender);
//         const signer = buildBasicAccountSigner(environment.concordiumAdmin.signingKey);
//         const moduleRef = new ModuleReference(environment.concordiumAdmin.smartWalletModuleRef);
//         const schema = await this.client.getEmbeddedSchema(moduleRef);
//         const maxCost = BigInt(30000);
//         const contractName = 'gateway_smart_wallet';
//         const receiveName = 'gateway_smart_wallet.depositCcd';

  
//         const param = wallet.publicKey
          
//         const updateHeader: AccountTransactionHeader = {
//             // @ts-ignore
//             expiry: getDefaultTransactionExpiry(),
//             nonce: (await this.client.getNextAccountNonce(sender)).nonce,
//             sender,
//         };

//         const updateParams = serializeUpdateContractParameters(
//             contractName,
//             'depositCcd',
//             param,
//             schema,
//         );
//         console.log({updateHeader, updateParams})

//         const updatePayload: UpdateContractPayload = {
//             amount: new CcdAmount(amount * (10 ** 6)),
//             address: unwrap(contractAddress),
//             receiveName,
//             message: updateParams,
//             maxContractExecutionEnergy: maxCost,
//         };

//         console.log({updatePayload})
//         const updateTransaction: AccountTransaction = {
//             header: updateHeader,
//             payload: updatePayload,
//             type: AccountTransactionType.Update,
//         };

//         const updateSignature = await signTransaction(updateTransaction, signer);
//         const updateTrxHash = await this.client.sendAccountTransaction(
//             updateTransaction,
//             updateSignature
//         );
//         console.log('Transaction submitted, waiting for finalization...');
//         const updateStatus = await this.client.waitForTransactionFinalization(updateTrxHash);
//         console.dir(updateStatus, { depth: null, colors: true });

//         return updateTrxHash
//     }

//     async balanceOfCis2(tokenId: string, user: IUser) {
//         const keyPair = await this.concordium.getOrCreateConcordiumKeyPairs(user)
//         const invoker = new AccountAddress(environment.concordiumAdmin.sender);
//         try {
//             const contractAddress = { index: environment.concordiumAdmin.gateSmartWalletAddress, subindex: 0n };
//             const receiveName = 'gateway_smart_wallet.cis2BalanceOf';
        
//             const moduleRef = new ModuleReference(environment.concordiumAdmin.smartWalletModuleRef);
//             const schema = await this.client.getEmbeddedSchema(moduleRef);
        
//             // Create the parameter object as an array
//             // const paramJson = { queries: ["3DBHuPUv244AeXL2QJPn6LQwdG75U8dMykSYFdXqpnAMQCBH7o"] };
        
//             const param = [
//                 {
//                 cis2_token_contract_address: {
//                     index: 9568,
//                     subindex: 0
//                 },
//                 public_key: keyPair.publicKey,
//                 token_id: tokenId
//                 }
//             ]
//             // Serialize the parameters
//             const serializedParams = serializeUpdateContractParameters(
//                 'gateway_smart_wallet',
//                 'cis2BalanceOf',
//                 param,
//                 schema
//             );
        
//             // Invoke the contract
//             const result = await this.client.invokeContract({
//                 contract: unwrap(contractAddress),
//                 // invoker: new AccountAddress('3DBHuPUv244AeXL2QJPn6LQwdG75U8dMykSYFdXqpnAMQCBH7o'),
//                 invoker,
//                 method: 'gateway_smart_wallet.cis2BalanceOf',
//                 parameter: serializedParams,
//             });
        
//             console.log({ result });
        
        
//             // Deserialize the response if needed
//             // @ts-ignore
//             const decodedResult = deserializeReceiveReturnValue(result.returnValue, schema, 'gateway_smart_wallet',"cis2BalanceOf" );
        
//             console.log({decodedResult})
//             return decodedResult
//             // Send the result back to the client
//             // res.json({ balance: Number(decodedResult[0]) });
//         } catch (error) {
//             console.error(error);
//             // res.status(500).json({ error: error.message });
//         }
    
//     }

//     async gateTokenTransfer(payload: IWithdrawConcordiumPayload, user: IUser) {
//         const wallet = await this.concordium.getOrCreateConcordiumKeyPairs(user);
//         if (!wallet) throw new ApiError(Message.walletNotFound, 400);

//         const sender = new AccountAddress(environment.concordiumAdmin.sender);
//         const signer = buildBasicAccountSigner(environment.concordiumAdmin.signingKey);

//         const moduleRef = new ModuleReference(environment.concordiumAdmin.gateTokenModuleReference);

//         const maxCost = BigInt(30000);
//         const contractName = 'token';
//         const receiveName = 'token.transfer';
//         const schema = await this.client.getEmbeddedSchema(moduleRef);

//         const amount = payload.amount * (10 ** 9)
//         const paramJson = {
//             amount: amount.toString(),
//             data: wallet.publicKey,
//             from: {
//                 Account: [sender]
//             },
//             to: {
//                 Contract: [{
//                     index: Number(environment.concordiumAdmin.gateSmartWalletAddress),
//                     subindex: 0
//                 }, 
//                 'depositCis2Tokens'
//             ]
//             },
//             token_id: ''
//         };
//         const updateHeader: AccountTransactionHeader = {
//             // @ts-ignore
//             expiry: getDefaultTransactionExpiry(),
//             nonce: (await this.client.getNextAccountNonce(sender)).nonce,
//             sender,
//         };
//         const updateParams = serializeUpdateContractParameters(
//             contractName,
//             'transfer',
//             [paramJson],
//             schema,
//         );
//         console.log({updateHeader, updateParams})
//         const contractAddress = { index: environment.concordiumAdmin.gateTokenAddress, subindex: 0n };
//         console.log({contractAddress})
//         const updatePayload: UpdateContractPayload = {
//             amount: new CcdAmount(0 * (10 ** 6)),
//             address: unwrap(contractAddress),
//             receiveName,
//             message: updateParams,
//             maxContractExecutionEnergy: maxCost,
//         };
//         console.log({updatePayload})
//         const updateTransaction: AccountTransaction = {
//             header: updateHeader,
//             payload: updatePayload,
//             type: AccountTransactionType.Update,
//         };
//         const updateSignature = await signTransaction(updateTransaction, signer);
//         const updateTrxHash = await this.client.sendAccountTransaction(
//             updateTransaction,
//             updateSignature
//         );
//         console.log('Transaction submitted, waiting for finalization...');
//         const updateStatus = await this.client.waitForTransactionFinalization(updateTrxHash);
//         console.dir(updateStatus, { depth: null, colors: true });

//         return updateTrxHash
//     }

//     async withdrawGate(payload: IWithdrawConcordiumPayload, user: IUser) {
//         const contractAddress = { index: environment.concordiumAdmin.gateSmartWalletAddress, subindex: 0n };
//         const sender = new AccountAddress(environment.concordiumAdmin.sender);
//         const signer = buildBasicAccountSigner(environment.concordiumAdmin.signingKey);
//         const moduleRef = new ModuleReference(environment.concordiumAdmin.smartWalletModuleRef);
//         const schema = await this.client.getEmbeddedSchema(moduleRef);

//         const maxCost = BigInt(30000);
//         const contractName = 'gateway_smart_wallet';
//         const receiveName = 'gateway_smart_wallet.withdrawCis2Tokens';

//         const wallet = await this.concordium.getOrCreateConcordiumKeyPairs(user)
//         const privateKey = await encryption.decrypt({
//             seedPhrase: misc.emailToSecret(user.email),
//             iv: wallet.privateKeyIv,
//             text: wallet.encryptedPrivateKey,
//         });
//         const nonce = (await this.nonceOf(wallet.publicKey))[0]

//         console.log({nonce})
//         const expiry_time = await this.getExpiryTime()
//         const message = {
//             entry_point: "withdrawCis2Tokens",
//             expiry_time,
//             nonce,
//             service_fee_amount: {
//                 cis2_token_contract_address: {
//                     index: Number(environment.concordiumAdmin.gateTokenAddress),
//                     subindex: 0
//                 },
//                 token_amount: new CcdAmount(0),
//                 token_id: ''
//             },
//             service_fee_recipient: "b288c8518c8be158e5e22cb1ee8c748b1992a2cb3572643a7b6ceb1ccd6bf3ec",
//             simple_withdraws: [
//               {
//                 to: {
//                     Account: [payload.recipient]
//                 },
//                 withdraw_amount: {
//                     cis2_token_contract_address: {
//                         index: Number(environment.concordiumAdmin.gateTokenAddress),
//                         subindex: 0
//                     },
//                     token_amount: (payload.amount * (10 ** 9)).toString(),
//                     token_id: ''
//                 },
//                 data: wallet.publicKey
//               }
//             ]
//         }

//         const messageHash = await this.getCis2WithdrawMessageHash(message)
//         console.log({messageHash})
//         // const privateKeyUint = sodium.from_hex(wallet.privateKey)
//         const messageHashBin = this.hexToUint8Array(messageHash);

//         // const messageHashBin = sodium.hex2bin();
//         const privateKeyBin = this.hexToUint8Array(privateKey);

//         const signatureUint8 = sodium.crypto_sign_detached(messageHashBin, privateKeyBin);
//         console.log({signatureUint8})
//         const signature = sodium.to_hex(signatureUint8);
//         console.log({signature})
//         console.log({timeAfter: expiry_time})
//         const paramJson = [
//             {
//               message,
//               signature,
//               signer: wallet.publicKey
//             }
//           ]
          
//         const updateHeader: AccountTransactionHeader = {
//             // @ts-ignore
//             expiry: getDefaultTransactionExpiry(),
//             nonce: (await this.client.getNextAccountNonce(sender)).nonce,
//             sender,
//         };

//         const updateParams = serializeUpdateContractParameters(
//             contractName,
//             'withdrawCis2Tokens',
//             paramJson,
//             schema,
//         );
//         console.log({updateHeader, updateParams})

//         // const contractAddress = {index: 9522n, subindex:0n}
//         console.log("Before update payload")

//         const updatePayload: UpdateContractPayload = {
//             amount: new CcdAmount(0),
//             address: unwrap(contractAddress),
//             receiveName,
//             message: updateParams,
//             maxContractExecutionEnergy: maxCost,
//         };

//         console.log({updatePayload})
//         const updateTransaction: AccountTransaction = {
//             header: updateHeader,
//             payload: updatePayload,
//             type: AccountTransactionType.Update,
//         };

//         const updateSignature = await signTransaction(updateTransaction, signer);
//         const updateTrxHash = await this.client.sendAccountTransaction(
//             updateTransaction,
//             updateSignature
//         );
//         console.log('Transaction submitted, waiting for finalization...');
//         const updateStatus = await this.client.waitForTransactionFinalization(updateTrxHash);
//         console.dir(updateStatus, { depth: null, colors: true });

//         return updateTrxHash
//     }
//     async gateTokenBalance(user: IUser) {
//         const keyPair = await this.concordium.getOrCreateConcordiumKeyPairs(user)
//         const invoker = new AccountAddress(environment.concordiumAdmin.sender);
//         try {
//             const contractAddress = { index: environment.concordiumAdmin.gateSmartWalletAddress, subindex: 0n };
//             const receiveName = 'gateway_smart_wallet.cis2BalanceOf';
        
//             const moduleRef = new ModuleReference(environment.concordiumAdmin.smartWalletModuleRef);
//             const schema = await this.client.getEmbeddedSchema(moduleRef);
        
//             // Create the parameter object as an array
//             // const paramJson = { queries: ["3DBHuPUv244AeXL2QJPn6LQwdG75U8dMykSYFdXqpnAMQCBH7o"] };
        
//             const param = [
//                 {
//                 cis2_token_contract_address: {
//                     index: 8345,
//                     subindex: 0
//                 },
//                 public_key: keyPair.publicKey,
//                 token_id: ''
//                 }
//             ]
//             // Serialize the parameters
//             const serializedParams = serializeUpdateContractParameters(
//                 'gateway_smart_wallet',
//                 'cis2BalanceOf',
//                 param,
//                 schema
//             );
//             // Invoke the contract
//             const result = await this.client.invokeContract({
//                 contract: unwrap(contractAddress),
//                 // invoker: new AccountAddress('3DBHuPUv244AeXL2QJPn6LQwdG75U8dMykSYFdXqpnAMQCBH7o'),
//                 invoker,
//                 method: 'gateway_smart_wallet.cis2BalanceOf',
//                 parameter: serializedParams,
//             });
        
//             console.log({ result });
//                 // @ts-ignore
//             const decodedResult = deserializeReceiveReturnValue(result.returnValue, schema, 'gateway_smart_wallet',"cis2BalanceOf" );
        
//             console.log({decodedResult})
//             return decodedResult
//             // Send the result back to the client
//             // res.json({ balance: Number(decodedResult[0]) });
//         } catch (error) {
//             console.error(error);
//             // res.status(500).json({ error: error.message });
//         }
//     }


//     async withdrawCcd(payload: IWithdrawConcordiumPayload, user: IUser) {
//         const contractAddress = { index: environment.concordiumAdmin.gateSmartWalletAddress, subindex: 0n };
//         const sender = new AccountAddress(environment.concordiumAdmin.sender);
//         const signer = buildBasicAccountSigner(environment.concordiumAdmin.signingKey);
//         const moduleRef = new ModuleReference(environment.concordiumAdmin.smartWalletModuleRef);
//         const schema = await this.client.getEmbeddedSchema(moduleRef);

//         const maxCost = BigInt(30000);
//         const contractName = 'gateway_smart_wallet';
//         const receiveName = 'gateway_smart_wallet.withdrawCcd';

//         // const wallet = {
//         //     publicKey: "a6c22f4e0d5e48ddd5166a992773e2d12e0891727884859d32fcaeae72ba4c9a",
//         //     privateKey: "ab3f16cf72ca060c50daf5b6dbc927b48aa306274c88f4681b529648f6ce1614a6c22f4e0d5e48ddd5166a992773e2d12e0891727884859d32fcaeae72ba4c9a"
//         // }
//         const wallet = await this.concordium.getOrCreateConcordiumKeyPairs(user)
//         const privateKey = await encryption.decrypt({
//             seedPhrase: misc.emailToSecret(user.email),
//             iv: wallet.privateKeyIv,
//             text: wallet.encryptedPrivateKey,
//         });
//         const nonce = (await this.nonceOf(wallet.publicKey))[0]

//         console.log({nonce})
//         const expiry_time = await this.getExpiryTime()
//         const message = {
//             entry_point: "withdrawCcd",
//             expiry_time,
//             nonce,
//             service_fee_amount: new CcdAmount(0),
//             service_fee_recipient: "b288c8518c8be158e5e22cb1ee8c748b1992a2cb3572643a7b6ceb1ccd6bf3ec",
//             simple_withdraws: [
//               {
//                 to: {
//                     Account: [payload.recipient]
//                 },
//                 withdraw_amount: new CcdAmount(payload.amount * (10 ** 6)),
//                 data: wallet.publicKey
//               }
//             ]
//         }

//         const messageHash = await this.getCcdWithdrawMessageHash(message)
//         console.log({messageHash})
//         // const privateKeyUint = sodium.from_hex(wallet.privateKey)
//         const messageHashBin = this.hexToUint8Array(messageHash);

//         // const messageHashBin = sodium.hex2bin();
//         const privateKeyBin = this.hexToUint8Array(privateKey);

//         const signatureUint8 = sodium.crypto_sign_detached(messageHashBin, privateKeyBin);
//         console.log({signatureUint8})
//         const signature = sodium.to_hex(signatureUint8);
//         console.log({signature})
//         console.log({timeAfter: expiry_time})
//         const paramJson = [
//             {
//               message,
//               signature,
//               signer: wallet.publicKey
//             }
//           ]
          
//         const updateHeader: AccountTransactionHeader = {
//             // @ts-ignore
//             expiry: getDefaultTransactionExpiry(),
//             nonce: (await this.client.getNextAccountNonce(sender)).nonce,
//             sender,
//         };

//         const updateParams = serializeUpdateContractParameters(
//             contractName,
//             'withdrawCcd',
//             paramJson,
//             schema,
//         );
//         console.log({updateHeader, updateParams})

//         // const contractAddress = {index: 9522n, subindex:0n}
//         console.log("Before update payload")

//         const updatePayload: UpdateContractPayload = {
//             amount: new CcdAmount(0),
//             address: unwrap(contractAddress),
//             receiveName,
//             message: updateParams,
//             maxContractExecutionEnergy: maxCost,
//         };

//         console.log({updatePayload})
//         const updateTransaction: AccountTransaction = {
//             header: updateHeader,
//             payload: updatePayload,
//             type: AccountTransactionType.Update,
//         };

//         const updateSignature = await signTransaction(updateTransaction, signer);
//         const updateTrxHash = await this.client.sendAccountTransaction(
//             updateTransaction,
//             updateSignature
//         );
//         console.log('Transaction submitted, waiting for finalization...');
//         const updateStatus = await this.client.waitForTransactionFinalization(updateTrxHash);
//         console.dir(updateStatus, { depth: null, colors: true });

//         return updateTrxHash
//     }
//     async transferCcd(amount: number, user?: IUser) {

//         const contractAddress = { index: environment.concordiumAdmin.gateSmartWalletAddress, subindex: 0n };
//         const sender = new AccountAddress(environment.concordiumAdmin.sender);
//         const signer = buildBasicAccountSigner(environment.concordiumAdmin.signingKey);
//         const moduleRef = new ModuleReference(environment.concordiumAdmin.smartWalletModuleRef);
//         const schema = await this.client.getEmbeddedSchema(moduleRef);

//         const maxCost = BigInt(30000);
//         const contractName = 'gateway_smart_wallet';
//         const receiveName = 'gateway_smart_wallet.transferCcd';

//         const wallet = {
//             publicKey: "a6c22f4e0d5e48ddd5166a992773e2d12e0891727884859d32fcaeae72ba4c9a",
//             privateKey: "ab3f16cf72ca060c50daf5b6dbc927b48aa306274c88f4681b529648f6ce1614a6c22f4e0d5e48ddd5166a992773e2d12e0891727884859d32fcaeae72ba4c9a"
//         }
//         const nonce = (await this.nonceOf(wallet.publicKey))[0]

//         console.log({nonce})
//         const expiry_time = await this.getExpiryTime()
//         console.log({timeBefore: expiry_time})
//         const message = {
//             entry_point: "transferCcd",
//             expiry_time,
//             nonce,
//             service_fee_amount: new CcdAmount(0),
//             service_fee_recipient: "b288c8518c8be158e5e22cb1ee8c748b1992a2cb3572643a7b6ceb1ccd6bf3ec",
//             simple_transfers: [
//               {
//                 to: "d7753a3fd8c50f2efd4f92d282c975f9732b8a6ef9483d945f4ce58641a73d35",
//                 transfer_amount: new CcdAmount(amount * (10 ** 6))
//               }
//             ]
//         }

//         const messageHash = await this.getCcdTransferMessageHash(message)
//         console.log({messageHash})
//         // const privateKeyUint = sodium.from_hex(wallet.privateKey)
//         const messageHashBin = this.hexToUint8Array(messageHash);

//         // const messageHashBin = sodium.hex2bin();
//         const privateKeyBin = this.hexToUint8Array(wallet.privateKey);

//         const signatureUint8 = sodium.crypto_sign_detached(messageHashBin, privateKeyBin);
//         console.log({signatureUint8})
//         const signature = sodium.to_hex(signatureUint8);
//         console.log({signature})
//         console.log({timeAfter: expiry_time})
//         const paramJson = [
//             {
//               message,
//               signature,
//               signer: wallet.publicKey
//             }
//           ]
//           console.log({message: paramJson[0].message});
//           // const paramJson = wallet.publicKey

//         console.log("Before update header")
          
//         const updateHeader: AccountTransactionHeader = {
//             // @ts-ignore
//             expiry: getDefaultTransactionExpiry(),
//             nonce: (await this.client.getNextAccountNonce(sender)).nonce,
//             sender,
//         };
//         console.log("Before update param")

//         const updateParams = serializeUpdateContractParameters(
//             contractName,
//             'transferCcd',
//             paramJson,
//             schema,
//         );
//         console.log({updateHeader, updateParams})

//         // const contractAddress = {index: 9522n, subindex:0n}
//         console.log("Before update payload")

//         const updatePayload: UpdateContractPayload = {
//             amount: new CcdAmount(0),
//             address: unwrap(contractAddress),
//             receiveName,
//             message: updateParams,
//             maxContractExecutionEnergy: maxCost,
//         };

//         console.log({updatePayload})
//         const updateTransaction: AccountTransaction = {
//             header: updateHeader,
//             payload: updatePayload,
//             type: AccountTransactionType.Update,
//         };

//         const updateSignature = await signTransaction(updateTransaction, signer);
//         const updateTrxHash = await this.client.sendAccountTransaction(
//             updateTransaction,
//             updateSignature
//         );
//         console.log('Transaction submitted, waiting for finalization...');
//         const updateStatus = await this.client.waitForTransactionFinalization(updateTrxHash);
//         console.dir(updateStatus, { depth: null, colors: true });

//         return updateTrxHash
//     }

//     async getCcdTransferMessageHash(message: any) {
//         try {
//             const contractAddress = { index: environment.concordiumAdmin.gateSmartWalletAddress, subindex: 0n };
//             const receiveName = 'gateway_smart_wallet.getCcdTransferMessageHash';
        
//             const moduleRef = new ModuleReference(environment.concordiumAdmin.smartWalletModuleRef);
//             const schema = await this.client.getEmbeddedSchema(moduleRef);
//             const invoker = new AccountAddress(environment.concordiumAdmin.sender);

//             // Serialize the parameters
//             const serializedParams = serializeUpdateContractParameters(
//                 'gateway_smart_wallet',
//                 'getCcdTransferMessageHash',
//                 message,
//                 schema
//             );
        
//             const result = await this.client.invokeContract({
//                 contract: unwrap(contractAddress),
//                 invoker,
//                 method: 'gateway_smart_wallet.getCcdTransferMessageHash',
//                 parameter: serializedParams,
//             });
        
//             console.log({ result });
//             // @ts-ignore
//             const decodedResult = deserializeReceiveReturnValue(result.returnValue, schema, 'gateway_smart_wallet',"getCcdTransferMessageHash" );
        
//             console.log({decodedResult})
//             // @ts-ignore
//             return result.returnValue
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async getCcdWithdrawMessageHash(message: any) {
//         try {
//             const contractAddress = { index: environment.concordiumAdmin.gateSmartWalletAddress, subindex: 0n };
//             const receiveName = 'gateway_smart_wallet.getCcdWithdrawMessageHash';
        
//             const moduleRef = new ModuleReference(environment.concordiumAdmin.smartWalletModuleRef);
//             const schema = await this.client.getEmbeddedSchema(moduleRef);
//             const invoker = new AccountAddress(environment.concordiumAdmin.sender);

//             // Serialize the parameters
//             const serializedParams = serializeUpdateContractParameters(
//                 'gateway_smart_wallet',
//                 'getCcdWithdrawMessageHash',
//                 message,
//                 schema
//             );
        
//             const result = await this.client.invokeContract({
//                 contract: unwrap(contractAddress),
//                 invoker,
//                 method: 'gateway_smart_wallet.getCcdWithdrawMessageHash',
//                 parameter: serializedParams,
//             });
        
//             console.log({ result });
//             // @ts-ignore
//             const decodedResult = deserializeReceiveReturnValue(result.returnValue, schema, 'gateway_smart_wallet',"getCcdWithdrawMessageHash" );
        
//             console.log({decodedResult})
//             // @ts-ignore
//             return result.returnValue
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async getCis2WithdrawMessageHash(message: any) {
//         try {
//             const contractAddress = { index: environment.concordiumAdmin.gateSmartWalletAddress, subindex: 0n };
//             const receiveName = 'gateway_smart_wallet.getCis2WithdrawMessageHash';
        
//             const moduleRef = new ModuleReference(environment.concordiumAdmin.smartWalletModuleRef);
//             const schema = await this.client.getEmbeddedSchema(moduleRef);
//             const invoker = new AccountAddress(environment.concordiumAdmin.sender);

//             // Serialize the parameters
//             const serializedParams = serializeUpdateContractParameters(
//                 'gateway_smart_wallet',
//                 'getCis2WithdrawMessageHash',
//                 message,
//                 schema
//             );
        
//             const result = await this.client.invokeContract({
//                 contract: unwrap(contractAddress),
//                 invoker,
//                 method: 'gateway_smart_wallet.getCis2WithdrawMessageHash',
//                 parameter: serializedParams,
//             });
        
//             console.log({ result });
//             // @ts-ignore
//             const decodedResult = deserializeReceiveReturnValue(result.returnValue, schema, 'gateway_smart_wallet',"getCis2WithdrawMessageHash" );
        
//             console.log({decodedResult})
//             // @ts-ignore
//             return result.returnValue
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     hexToUint8Array(hexString) {
//         const bytes = new Uint8Array(hexString.length / 2);
//         for (let i = 0; i < hexString.length; i += 2) {
//           bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
//         }
//         return bytes;
//       }

//     async nonceOf(publicKey: string) {
//         try {
//             const contractAddress = { index: environment.concordiumAdmin.gateSmartWalletAddress, subindex: 0n };
//             const receiveName = 'gateway_smart_wallet.nonceOf';
        
//             const moduleRef = new ModuleReference(environment.concordiumAdmin.smartWalletModuleRef);
//             const schema = await this.client.getEmbeddedSchema(moduleRef);
//             const invoker = new AccountAddress(environment.concordiumAdmin.sender);

//             // Serialize the parameters
//             const serializedParams = serializeUpdateContractParameters(
//                 'gateway_smart_wallet',
//                 'nonceOf',
//                 [publicKey],
//                 schema
//             );
        
//             const result = await this.client.invokeContract({
//                 contract: unwrap(contractAddress),
//                 invoker,
//                 method: 'gateway_smart_wallet.nonceOf',
//                 parameter: serializedParams,
//             });
        
//             console.log({ result });
//             // @ts-ignore
//             const decodedResult = deserializeReceiveReturnValue(result.returnValue, schema, 'gateway_smart_wallet',"nonceOf" );
        
//             console.log({decodedResult})
//             return decodedResult
//         } catch (error) {
//             console.error(error);
//         }
//     }
//     async getExpiryTime() {
//         const currentTime = new Date();
//         const expiryTime = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
//         return expiryTime.toISOString(); // Convert to ISO 8601 string
//     }

//     //   {
//     //     "publicKey": "a6c22f4e0d5e48ddd5166a992773e2d12e0891727884859d32fcaeae72ba4c9a",
//     //     "privateKey": "ab3f16cf72ca060c50daf5b6dbc927b48aa306274c88f4681b529648f6ce1614a6c22f4e0d5e48ddd5166a992773e2d12e0891727884859d32fcaeae72ba4c9a"
//     // }
// }
