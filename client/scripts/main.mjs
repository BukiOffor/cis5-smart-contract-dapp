import * as ccdJsGen from "@concordium/ccd-js-gen"
import * as SDK from "@concordium/web-sdk"
import { createConcordiumClient } from '@concordium/node-sdk';
import { credentials } from '@grpc/grpc-js';



async function buildFromModule(){

    const mod_ref = "13feddf39ead0312f22d64ab591eb3457b6d258500b33dda29898f4b709cc9cc";
    const moduleFilePath = "../contracts/dist/module.wasm.v1"
    const generatedFilepath = "src/constants/"
    console.log('Generating smart contract module clients.')
    await ccdJsGen.generateContractClientsFromFile(moduleFilePath, generatedFilepath);
    console.info('Code generation was successful.');

}

async function buildFromChain(){
    const outDirPath = "src/constants"; // The directory to use for the generated files.
    const outputModuleName = "smart_contract_wallet_generated"; // The name to give the output smart contract module.

    const grpcClient = createConcordiumClient("node.testnet.concordium.com", Number(20000), credentials.createInsecure(),  { timeout: 150000 });
    const moduleRef = SDK.ModuleReference.fromHexString('13feddf39ead0312f22d64ab591eb3457b6d258500b33dda29898f4b709cc9cc');
    
    // Fetch the smart contract module source from chain.
    const moduleSource = await grpcClient.getModuleSource(moduleRef);
    
    // Generate the smart contract clients from module source.
    console.info('Generating smart contract module clients.');
    await ccdJsGen.generateContractClients(moduleSource, outputModuleName, outDirPath);
    console.info('Code generation was successful.');
}



async function main(){
   await buildFromModule();
   //await buildFromChain()
}

main().then().catch((err)=>{
    console.log(err)
})