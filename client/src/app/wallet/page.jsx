"use client";

import Image from "next/image";
import { useState, useEffect } from 'react';

import Link from "next/link";
import { Button } from "flowbite-react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { ConcordiumWallet } from "@/helpers" ;
import { useRouter } from "next/navigation";




export default function Wallet(){
    const router = useRouter();
    const wallet = new ConcordiumWallet(9736);
    const [balance, setBalance] = useState("")
    const[key, setKey] = useState({})

    useEffect(() => {
        setKey(JSON.parse(window.localStorage.getItem("cis5-keypair")));
      }, []);



  useEffect(() => {  
    async function updateUI() {
        const key = JSON.parse(window.localStorage.getItem("cis5-keypair"))
        const balance = await wallet.getCCDBalanceOfAccount(key.publicKey)
        const nonce = await wallet.getNonce(key.publicKey)
        console.log("nonce: ", nonce.toString() )
        setBalance(balance);
    }
    updateUI();
  }, []);
    
    
    return (
        <>
            <div className="text-center py-2">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                SMART WALLET
                </h1>
                <div>
                    <p>SMART WALLET CONTRACT ADDRESS: 9736 </p>
                    <p>SMART ACCOUNT KEY: {key.publicKey}</p>
                    <p>SMART ACCOUNT BALANCE: {balance} CCD</p> <br/>
                    <button onClick = {()=>{router.push("/tokens")}} className=" rounded-md bg-cyan-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Tokens
                    </button>
                </div>            
            </div>
            < div >
            <Tabs variant='enclosed' className=" place-items-center px-6 py-12 sm:py-16 lg:px-8">
            <TabList className="bg-blue-100 text-center ">
                <Tab>Transfer CCD</Tab>
                <Tab>Withdraw CCD </Tab>
                <Tab>Get Airdrop</Tab>

            </TabList>
            <TabPanels>


                <TabPanel>
                <form class="max-w-sm mx-auto">
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Public Key</label>
                        <input  id="dest" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="32910d02a63764fdea8dc133ccc618e5f095527" />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                        <input type="number" id="amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="10" />
                    </div>
                    <div class="flex items-start mb-1">                        
                    </div>
                    <Button onClick={ async () => {
                        console.log("id: ",document.getElementById("dest").value)
                        try{
                            const key = JSON.parse(window.localStorage.getItem("cis5-keypair"))
                            const res = await wallet.makeCCDTransfer( 
                            key.publicKey, 
                            key.privateKey, 
                            parseFloat(document.getElementById("amount").value), 
                            document.getElementById("dest").value
                        )
                        res.status? toast.success(res.message)
                        : toast.error(`Error: ${res.message}`) 
                        }catch(e){
                            console.log(e)
                        }
                         
                    }
                        }>Send</Button>
                </form>
                </TabPanel>
                
                
                
                <TabPanel>                
                    <form class="max-w-sm mx-auto">
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Address</label>
                        <input  id="withdraw_dest" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="38TN6fTCjgHYp7vXDagLJsb6s3UHzDANaGS2wXwgQLBUJrEian" />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                        <input  id="withdraw_amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="10" />
                    </div>
                    <Button className="mt-3" onClick={ async ()=>{
                        //console.log("id: ",document.getElementById("withdraw_dest").value)
                        try{
                            const key = JSON.parse(window.localStorage.getItem("cis5-keypair"))
                            const res = await wallet.withdrawCCD( 
                            key.publicKey, 
                            key.privateKey, 
                            parseFloat(document.getElementById("withdraw_amount").value), 
                            document.getElementById("withdraw_dest").value
                        )
                        res.status? toast.success(res.message)
                        : toast.error(`Error: ${res.message}`) 
                        }catch(e){
                            console.log(e)
                        }
                    }}>Withdraw</Button>

                    </form>
                </TabPanel>




                <TabPanel>
                    <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">By clicking, you will receive 10 CCD to your smart account</label>

                <Button className="mt-3 max-w-sm mx-auto" onClick={
                    async () =>{   
                        try{
                            if (localStorage.getItem("airdrop") !== null) {
                                alert("You have recieved the airdrop previously and cannot receive it again")
                                return;
                            }
                            const key = JSON.parse(window.localStorage.getItem("cis5-keypair"))
                            const response = await wallet.airdrop(key.publicKey)
                            response.status ?
                                toast.success(response.message)
                                : toast.error(response.message) 
                            localStorage.setItem("airdrop", "true")
                        }catch(err){
                            console.log(err)
                        }
                                           
                    }
                }>airdrop</Button>
                </TabPanel>
            </TabPanels>
            </Tabs>
            <ToastContainer/>
        </div>
        </>
    )
}