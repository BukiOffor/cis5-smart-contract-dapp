"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';

import Link from "next/link";
import { Button } from "flowbite-react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';


export default function Electoral(){
 

    
    return(
        < div >
            <Tabs variant='enclosed' className=" place-items-center px-2 py-2 sm:py-2 lg:px-2">
            <TabList className="bg-blue-100 text-center ">
                <Tab>Send Token to Smart Account</Tab>
                <Tab>Send Token to Wallet Account</Tab>
                <Tab>Get Airdrop</Tab>
                
            </TabList>
            <TabPanels>


                <TabPanel>
                <form class="max-w-sm mx-auto">
                    <div class="mb-5">
                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
                    </div>
                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
                        <input type="number" id="id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required placeholder="123456" />
                    </div>
                    <div class="flex items-start mb-1">                        
                    </div>
                    <Button onClick={ async () => {
                       await addParticipant(document.getElementById("name").value, document.getElementById("id").value)?
                            toast.success("Participant Added Successfully")
                            : toast.error("Participant Not Added")
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