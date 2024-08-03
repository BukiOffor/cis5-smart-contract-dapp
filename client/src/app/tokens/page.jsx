"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';

import Link from "next/link";
import { Button } from "flowbite-react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { ConcordiumWallet } from "@/helpers" ;


export default function Token(){
 
    const wallet = new ConcordiumWallet(9736);
    const [balance, setBalance] = useState("")
    const[key, setKey] = useState({})

    useEffect(() => {
        setKey(JSON.parse(window.localStorage.getItem("cis5-keypair")));
      }, []);



  useEffect(() => {  
    async function updateUI() {
        const key = JSON.parse(window.localStorage.getItem("cis5-keypair"))
        const balance = await wallet.balanceOfCis2Tokens(key.publicKey)
        setBalance(balance);
    }
    updateUI();
  }, []);

    
    return(
        < div >
               <div className="text-center py-2">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                SMART WALLET
                </h1>
                <div>
                    <p>TOKEN ADDRESS: 9173</p>
                    <p>SMART ACCOUNT KEY: {key.publicKey}</p>
                    <p>BALANCE: {balance} GATE</p> <br/>
                    
                </div>            
              </div>
            <Tabs variant='enclosed' className=" place-items-center px-2 py-2 sm:py-2 lg:px-2">
            <TabList className="bg-blue-100 text-center ">
                <Tab>Transfer</Tab>
                <Tab>Withdraw</Tab>
                <Tab>Get Airdrop</Tab>
                
            </TabList>
            <TabPanels>


                <TabPanel>
                <form class="max-w-sm mx-auto">
                    <div class="mb-5">
                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Receiptent</label>
                        <input type="text" id="t_recipient" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                        <input type="number" id="t_amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="123456" />
                    </div>
                    <div class="flex items-start mb-1">                        
                    </div>
                    <Button onClick={ async () => {

                      console.log("t_recipient: ",document.getElementById("t_recipient").value)
                        try{
                            const key = JSON.parse(window.localStorage.getItem("cis5-keypair"))
                            const payload = {
                                publicKey:key.publicKey, 
                                privateKey: key.privateKey,
                                amount: document.getElementById("t_amount").value,
                                receiver: document.getElementById("t_recipient").value
                            }
                            const res = await wallet.transferCis2Tokens(payload)
                            res.status? toast.success(res.message)
                            : toast.error(`Error: ${res.message}`) 
                            } catch(e) {
                                console.log(e)
                            }
                        }
                        }>Add Participant</Button>
                </form>
                </TabPanel>
                
                
                
                <TabPanel>                
                    <form class="max-w-sm mx-auto">
                    <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Voter Address</label>
                    <div class="flex">
                        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>
                        </span>
                        <input type="text" id="voter" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0xcd3B766CCDd6AE721141F452C550C1"/>
                    </div>
                    <Button className="mt-3" onClick={ async ()=>{
                        await addVoters(document.getElementById("voter").value)?
                            toast.success("Voter Added Successfully")
                            : toast.error("Voter Not Added")
                    
                    }}>Add Voter</Button>

                    </form>
                </TabPanel>



                <TabPanel>
                <Button className="mt-3 max-w-sm mx-auto" onClick={
                    async ()=>{
                        await getResult() ?
                            toast.success("Results Calculated Successfully")
                            : toast.error("Something Went Wrong")                    
                    }
                }>Calculate Results</Button>
                </TabPanel>
            </TabPanels>
            </Tabs>
            <ToastContainer/>
        </div>
    )
}