import { Wallet } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-gray-900 shadow-lg rounded-b-xl border-b-2">
      <div className="flex items-center space-x-4">
        <div className="transition-colors duration-300 hover:text-indigo-500">
          <Wallet className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-semibold text-white">Wallet</h1>
      </div>
    </header>
  );
};

export default Header;
