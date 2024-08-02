'use client'


import Base from "@/components/Home";
import Wallet from "@/app/wallet/page";
import { useState, useEffect } from "react";

export default function Home() {
  const [hasWallet, setHasWallet] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem("cis5-keypair") !== null){
    setHasWallet(true);
    }  
  }, []);
 
  return (
    <main className="min-h-screen p-2">
      {!hasWallet? (<Base/>): (<Wallet/>)}
    </main>
  );
}
