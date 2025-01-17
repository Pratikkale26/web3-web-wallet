import { useState } from "react";
import { HDNodeWallet, Mnemonic } from "ethers";

interface EthWallet {
  publicKey: string;
  privateKey: string;
  showPrivateKey: boolean;
}

export const EthereumWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [wallets, setWallets] = useState<EthWallet[]>([]);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const addWallet = () => {
    try {
      const mnemonicObj = Mnemonic.fromPhrase(mnemonic);
      const path = `m/44'/60'/${currentIndex}'/0/0`;
      const wallet = HDNodeWallet.fromMnemonic(mnemonicObj, path);

      setWallets((prev) => [
        ...prev,
        {
          publicKey: wallet.address,
          privateKey: wallet.privateKey,
          showPrivateKey: false,
        },
      ]);
      setCurrentIndex((prev) => prev + 1);
      setError("");
    } catch (e) {
      console.error(e);
      setError("Failed to generate wallet. Please check your mnemonic.");
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
    <div className="p-5 font-sans">
      <button
        onClick={addWallet}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 mb-5 transition-colors"
      >
        Add ETH Wallet
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
            className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 shadow-lg"
          >
            <div className="flex justify-between mb-2">
              <p className="font-bold text-lg">Public Key (Address):</p>
              <button
                onClick={() => deleteWallet(index)}
                className="text-red-500 hover:text-red-700 border-2 border-red-500 px-3 py-1 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
            <div className="break-words bg-green-100 p-2 rounded-md mb-3">
              {wallet.publicKey}
            </div>
            <div className="font-bold mb-2">
              Private Key:
              <button
                onClick={() => togglePrivateKey(index)}
                className="ml-3 bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
              >
                {wallet.showPrivateKey ? "Hide" : "Show"}
              </button>
            </div>
            {wallet.showPrivateKey && (
              <div className="break-words bg-red-100 p-2 rounded-md">
                {wallet.privateKey}
              </div>
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
};
