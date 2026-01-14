import { motion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigationStore } from "../store/navigationStore";

export default function Navbar() {
  const { currentPage, setPage } = useNavigationStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "หน้าหลัก" },
    { id: "maintenance", label: "ศูนย์บำรุงรักษา" },
    { id: "library", label: "คลังเอกสาร" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-sky-200/50 bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg sky-glow">
            <Zap size={20} className="sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm sm:text-xl tracking-tight text-slate-900 block leading-none">
              Smart Power Station
            </span>
            <span className="text-[10px] sm:text-xs text-sky-600 font-medium hidden sm:block">
              Sustainable Energy for the Future
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setPage(item.id as any)}
              className={`text-sm font-semibold transition-all relative pb-1 ${
                currentPage === item.id
                  ? "text-sky-600"
                  : "text-slate-600 hover:text-sky-500"
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-slate-900 p-2 hover:bg-sky-50 rounded-lg transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden border-t border-sky-200/50 bg-white/95 backdrop-blur-xl"
        >
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  setPage(item.id as any);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                  currentPage === item.id
                    ? "bg-sky-100 text-sky-600"
                    : "text-slate-600 hover:bg-sky-50 hover:text-sky-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
