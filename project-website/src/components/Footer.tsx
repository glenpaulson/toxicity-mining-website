import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-black text-white py-16 px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-4">
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              A class project initiative exploring linguistic patterns in online
              hate speech using Natural Language Processing and Data Mining
              techniques.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
              Explore
            </h4>
            <Link
              to="/"
              onClick={scrollToTop}
              className="text-gray-300 hover:text-white transition-colors w-fit"
            >
              Introduction
            </Link>
            <Link
              to="/blueprint"
              onClick={scrollToTop}
              className="text-gray-300 hover:text-white transition-colors w-fit"
            >
              Project Blueprint
            </Link>
            <Link
              to="/proposal"
              onClick={scrollToTop}
              className="text-gray-300 hover:text-white transition-colors w-fit"
            >
              Proposal Overview
            </Link>
            <Link
              to="/team"
              onClick={scrollToTop}
              className="text-gray-300 hover:text-white transition-colors w-fit"
            >
              Meet the Team
            </Link>
          </div>

          <div className="flex flex-col space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
              Connect
            </h4>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors w-fit"
            >
              <span>GitHub Repository</span>
              <ArrowUpRight
                size={14}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
