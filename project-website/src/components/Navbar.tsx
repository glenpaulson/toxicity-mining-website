import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isDarkPage = location.pathname === "/blueprint";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (
    e: React.MouseEvent,
    path: string,
    targetId?: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname === path) {
      const element = targetId ? document.getElementById(targetId) : null;

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate(path);
    }
  };

  const navLinks = [
    { name: "Introduction", href: "/", targetId: "introduction" },
    { name: "Blueprint", href: "/blueprint" },
    { name: "Team", href: "/team" },
  ];

  const getTextColor = () => {
    if (scrolled) return "text-gray-900";
    if (isDarkPage) return "text-white";
    return "text-gray-900";
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center">
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavigation(e, link.href, link.targetId)}
              className={`text-base font-medium hover:text-blue-600 transition-colors cursor-pointer ${getTextColor()}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${getTextColor()} focus:outline-none`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col items-start space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavigation(e, link.href, link.targetId)}
              className="text-gray-800 font-medium text-lg cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
