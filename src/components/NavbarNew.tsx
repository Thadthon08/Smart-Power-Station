import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useNavigationStore } from "../store/navigationStore";

export default function Navbar() {
  const { currentPage, setPage } = useNavigationStore();

  const navItems = [
    { id: "home", label: "หน้าหลัก" },
    { id: "maintenance", label: "ศูนย์บำรุงรักษา" },
    { id: "library", label: "คลังเอกสาร" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-sky-200/50 bg-white/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg sky-glow">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-slate-900 block leading-none">
              Smart Power Station
            </span>
            <span className="text-xs text-sky-600 font-medium">
              Sustainable Energy for the Future
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
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
      </div>
    </nav>
  );
}
