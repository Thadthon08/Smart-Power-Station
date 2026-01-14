import { motion, useScroll, useSpring } from "framer-motion";
import { Activity } from "lucide-react";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Activity size={24} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              NexCorp
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
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
            <button className="px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105">
              พอร์ทัลลูกค้า
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
