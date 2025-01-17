import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonicToSeed, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import nacl from "tweetnacl";

interface Wallet {
  publicKey: PublicKey;
  privateKey: string;
  showPrivateKey: boolean;
}

export const SolanaWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [error, setError] = useState("");

  const addWallet = async () => {
    try {
      if (!validateMnemonic(mnemonic)) {
        setError("Invalid mnemonic.");
        return;
      }

      const seed = await mnemonicToSeed(mnemonic);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keyPair = Keypair.fromSecretKey(secret);

      setCurrentIndex((prev) => prev + 1);
      setWallets((prev) => [
        ...prev,
        {
          publicKey: keyPair.publicKey,
          privateKey: Buffer.from(secret).toString("hex"),
          showPrivateKey: false, // hidden by default
        },
      ]);
      setError("");
    } catch (e) {
      console.error(e);
      setError("Failed to generate wallet. Please try again.");
    }
  };

  const togglePrivateKey = (index: number) => {
    setWallets((prev) =>
      prev.map((wallet, i) =>
        i === index ? { ...wallet, showPrivateKey: !wallet.showPrivateKey } : wallet
      )
    );
  };

  const deleteWallet = (index: number) => {
    setWallets((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteAllWallets = () => {
    setWallets([]);
  };

  return (
    <div className="p-5 font-sans bg-gray-900 text-white">
        <button
            onClick={addWallet}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 mb-5 transition-colors"
        >
            Add SOL Wallet
        </button>

        {wallets.length > 0 && (
            <button
            onClick={deleteAllWallets}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 mt-4 transition-colors ml-4"
            >
            Delete All Wallets
            </button>
        )}

        {error && (
            <div className="text-red-500 font-semibold mb-4 p-2 border-2 border-red-500 rounded-lg">
            {error}
            </div>
        )}

        <div>
            {wallets.map((wallet, index) => (
            <div
                key={index}
                className="border border-gray-600 rounded-lg p-4 mb-4 bg-gray-800 shadow-lg"
            >
                <div className="flex justify-between mb-2">
                <p className="font-bold text-lg text-gray-200">Public Key:</p>

                <button
                    onClick={() => deleteWallet(index)}
                    className="text-red-500 hover:text-red-700 border-2 border-red-500 px-3 py-1 rounded-lg transition-colors"
                >
                    Delete
                </button>
                </div>
                
                <div className="break-words bg-green-700 p-2 rounded-md mb-3">
                {wallet.publicKey.toBase58()}
                </div>
                <div className="font-bold mb-2 text-gray-200">
                Private Key:
                <button
                    onClick={() => togglePrivateKey(index)}
                    className="ml-3 bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 transition-colors"
                >
                    {wallet.showPrivateKey ? "Hide" : "Show"}
                </button>
                </div>
                {wallet.showPrivateKey && (
                <div className="break-words bg-red-700 p-2 rounded-md">
                    {wallet.privateKey}
                </div>
                )}
            </div>
            ))}
        </div>
        </div>

  );
};
