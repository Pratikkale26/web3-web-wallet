"use client";

import React, { useState } from "react";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import { EthereumWallet } from "./EthWallet";

const Hero = () => {
  const [mnemonic, setMnemonic] = useState("");

  const generateSeedPhrase = async () => {
    const MN = generateMnemonic();
    setMnemonic(MN);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="w-full max-w-[90%] bg-white shadow-lg rounded-lg p-8">

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Create Your Wallet
          </h1>
          <p className="text-lg text-gray-600">
            Generate a mnemonic phrase and select your blockchain.
          </p>
        </div>

        {/* Mnemonic Generation */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            Your Seed Phrase:
          </label>
          <textarea
            value={mnemonic}
            readOnly
            rows={1}
            className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 text-lg bg-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={generateSeedPhrase}
            className="mt-4 w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Generate Seed Phrase
          </button>
        </div>

        {/* Wallet Generation */}
        {mnemonic && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Choose a Blockchain:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Solana Wallet */}
              <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Solana Wallet
                </h3>
                <SolanaWallet mnemonic={mnemonic} />
              </div>

              {/* Ethereum Wallet */}
              <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Ethereum Wallet
                </h3>
                <EthereumWallet mnemonic={mnemonic} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
