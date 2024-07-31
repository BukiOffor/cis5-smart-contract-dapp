'use client'


import Base from "@/components/Home";
import Wallet from "@/app/wallet/page";

export default function Home() {
  
  let hasWallet;
  if(localStorage.getItem("cis5-keypair") !== null){
    hasWallet = true;
  }
  return (
    <main className="min-h-screen p-2">
      {!hasWallet? (<Base/>): (<Wallet/>)}
    </main>
  );
}
