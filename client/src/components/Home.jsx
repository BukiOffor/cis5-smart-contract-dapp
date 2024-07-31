"use client";
import {generateKeyPair} from "@/helpers/index"
import { useRouter } from 'next/navigation';


export default function Base(){
  const router = useRouter();

    return (
        <>
            <div className="text-center p-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
               SMART WALLET ACCOUNT
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              This Application allows a user to create an account that that be used to send an recieve assets on the concordium network using the Cis5-Standard.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={async ()=>{
                  let keypair = await generateKeyPair();
                  localStorage.setItem("cis5-keypair", JSON.stringify(keypair));
                  alert(`Account Created: ${keypair.publicKey}`)
                  router.push('/wallet')
                  }
                }
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>             
            </div>
          </div>
        </>
    )
}