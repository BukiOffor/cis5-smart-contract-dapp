import Base from "@/components/Home";
import Wallet from "@/components/Wallet";

export default function Home() {
  
  const hasWallet = true;

  return (
    <main className="min-h-screen p-2">
      {hasWallet? (<Base/>): (<Wallet/>)}
    </main>
  );
}
