import { motion, useScroll, useSpring } from "framer-motion";
import { Activity, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Activity size={20} className="sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-white">
              NexCorp
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-300">
            <a href="#home" className="hover:text-white transition-colors">
              หน้าแรก
            </a>
            <a href="#vision" className="hover:text-white transition-colors">
              วิสัยทัศน์
            </a>
            <a
              href="#departments"
              className="hover:text-white transition-colors"
            >
              แผนก
            </a>
            <a href="#roadmap" className="hover:text-white transition-colors">
              แผนงาน
            </a>
            <button className="px-4 lg:px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105">
              พอร์ทัลลูกค้า
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
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
            className="md:hidden border-t border-white/5 bg-[#0a0a0c]/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 space-y-3">
              <a
                href="#home"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                หน้าแรก
              </a>
              <a
                href="#vision"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                วิสัยทัศน์
              </a>
              <a
                href="#departments"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                แผนก
              </a>
              <a
                href="#roadmap"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                แผนงาน
              </a>
              <button className="w-full px-4 py-2.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all">
                พอร์ทัลลูกค้า
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}
