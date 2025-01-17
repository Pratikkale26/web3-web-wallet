import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="fixed bottom-4 right-4 bg-gray-800 text-white py-4 px-6 rounded-lg shadow-lg flex items-center space-x-4 z-50">

      {/* Left Section */}
      <div className="text-sm font-semibold">
        <p>© 2025 Kalehub. All rights reserved.</p>
      </div>

      {/* Right Section (Social Media) */}
      <div className="flex space-x-4">
        <a
          href="https://x.com/pratikkale26"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-indigo-500 transition-colors"
        >
          <Twitter size={20} />
        </a>
        <a
          href="https://github.com/pratikkale26"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-indigo-500 transition-colors"
        >
          <Github size={20} />
        </a>
        <a
          href="https://linkedin.com/in/pratikkale26"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-indigo-500 transition-colors"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
