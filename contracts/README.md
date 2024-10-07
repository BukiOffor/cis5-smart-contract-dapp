# CIS5 SMART CONTRACT WALLET

A smart contract wallet that can hold and transfer CCDs or CIS-2 tokens. 
> Tutorial article can be found at [here](https://medium.com/@buki.offor/concordium-full-stack-smart-contract-account-tutorial-part-one-cdac8bcf0ff9)   
## SET UP

### Prerequisite

* Rust
* cargo-concordium
* concordium-client

> NOTE: you install the prequesites using this tutorial [Developer Environment](https://developer.concordium.software/en/mainnet/smart-contracts/tutorials/setup-env.html)

## Build, deploy, and initialize the contract

To build a wasm compiled contract and save in the dist folder run: 
```bash
cargo concordium build --out dist/module.wasm.v1 --schema-embed
```
You can deploy the compiled contract to the testnet with
```bash
concordium-client module deploy dist/module.wasm.v1 \
    --sender <YOUR-TESTNET-ADDRESS> \
    --grpc-ip grpc.testnet.concordium.com \
    --grpc-port 20000 \
    --secure
```
The client may also ask you for the password you specified when you imported your key into the Concordium client. If successful, the command should respond with Module successfully deployed with reference: <MODULE-HASH>, where the module hash is a long hex string. Note down this hash, we’ll need it when we initialize a new contract instance below

Finally, let’s initialize a contract instance:
```bash
concordium-client contract init <MODULE-HASH> \
    --sender <YOUR-TESTNET-ADDRESS> \
    --energy 30000 \
    --contract counter \
    --grpc-ip grpc.testnet.concordium.com \
    --grpc-port 20000 \
    --secure
```
This will return your smart contract index and subindex if succesfull.