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
import { useRouter } from "next/navigation";


export default function Token(){
 
    const wallet = new ConcordiumWallet(9736);
    const router = useRouter();
    const [balance, setBalance] = useState("")
    const[key, setKey] = useState({})
    const [spinner, setSpinner] = useState(false)



    useEffect(() => {
        setKey(JSON.parse(window.localStorage.getItem("cis5-keypair")));
      }, []);



  useEffect(() => {  
    async function updateUI() {
        const key = JSON.parse(window.localStorage.getItem("cis5-keypair"))
        const balance = parseFloat((await wallet.balanceOfCis2Tokens(key.publicKey)) / 1e9);
        setBalance(balance.toFixed(9));
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
                    <p>TOKEN ID: null</p>
                    <p>SMART ACCOUNT KEY: {key.publicKey}</p>
                    <p>BALANCE: {balance} GATE</p> <br/>
                    <button onClick = {()=>{router.push("/wallet")}} className=" rounded-md bg-cyan-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        CCD
                    </button>
                    
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
                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Receiver</label>
                        <input type="text" id="t_recipient" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="32949765cb2c733c1cb90816e7" required />
                    </div>
                    <div class="mb-5">
                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                        <input type="text" id="t_amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="10" />
                    </div>
                    <div class="flex items-start mb-1">                        
                    </div>
                    <Button onClick={ async () => {
                        if (!(document.getElementById("t_recipient").value)) {
                            toast.error('Please fill in the receiver public key')
                            return
                        }
                        if (!(document.getElementById("t_amount").value)) {
                            toast.error('Error: Please fill in the amount')
                            return
                        }
                        try{
                            const key = JSON.parse(window.localStorage.getItem("cis5-keypair"))
                            const payload = {
                                publicKey:key.publicKey, 
                                privateKey: key.privateKey,
                                amount: document.getElementById("t_amount").value,
                                receiver: document.getElementById("t_recipient").value
                            }
                            const res = await wallet.transferCis2Tokens(payload)
                            if (res.status){ 
                                toast.success(res.message)
                                setTimeout(() => {
                                    window.location.reload() 
                                  }, 3000) 
                            } else { 
                                toast.error(`Error: ${res.message}`)
                             }
                            } catch(e) {
                                console.log(e)
                            }
                        }
                        }>Transfer</Button>
                </form>
                </TabPanel>
                
                
                
                <TabPanel>                
                    <form class="max-w-sm mx-auto">
                    <div class="mb-5">
                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account Address</label>
                        <input  type="text" id="w_dest" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="38TN6fTCjgHYp7vXDagLJsb6s3UHzDANaGS2wXwgQLBUJrEian" />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                        <input  type="text" id="w_amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="10" />
                    </div>
                    <Button className="mt-3" onClick={ async ()=>{
                        console.log('pressed')
                        if (!(document.getElementById("w_dest").value)) {
                            toast.error('Please fill in the receiver address')
                            return
                        }
                        if (!(document.getElementById("w_amount").value)) {
                            toast.error('Please fill in the withdrawal amount')
                            return
                        }
                        try{
                           
                            const key = JSON.parse(window.localStorage.getItem("cis5-keypair"))
                            const payload = {
                                publicKey:key.publicKey, 
                                privateKey: key.privateKey,
                                amount: document.getElementById("w_amount").value,
                                receiver: document.getElementById("w_dest").value
                            }
                            const res = await wallet.withdrawCis2Tokens(payload)
                            if (res.status){ 
                                toast.success(res.message)
                                setTimeout(() => {
                                    window.location.reload() 
                                  }, 3000) 
                            } else { 
                                toast.error(`Error: ${res.message}`)
                             }
                            } catch(e) {
                                console.log(e)
                            }
                    
                    }}>Withdraw</Button>

                    </form>
                </TabPanel>



                <TabPanel>
                <Button className="mt-3 max-w-sm mx-auto" id="btn" onClick={
                    async ()=>{
                        setSpinner(true)
                        try{
                            const key = JSON.parse(window.localStorage.getItem("cis5-keypair"))
                            const res = await wallet.airdropCis2Token(key.publicKey, 10)
                            if (res.status){ 
                                setSpinner(false)
                                toast.success(res.message) 
                                setTimeout(() => {
                                    window.location.reload() 
                                  }, 1500) 
                          
                            } else { 
                                toast.error(`Error: ${res.message}`) 
                                setSpinner(false)
                        }
                            } catch(e) {
                                console.log(e)
                                setSpinner(false)

                            }                 
                    }
                }>{spinner ? (
                    <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                ) : (
                    "airdrop token"
                )}</Button>
                </TabPanel>
            </TabPanels>
            </Tabs>
            <ToastContainer/>
        </div>
    )
}