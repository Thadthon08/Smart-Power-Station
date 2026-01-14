import { motion } from "framer-motion";
import Dashboard from "./components/Dashboard";
import Departments from "./components/Departments";
import Hero from "./components/Hero";
import Maintenance from "./components/Maintenance";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";

function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <section id={id} className={`py-24 relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}

function App() {
  return (
    <div className="relative min-h-screen text-white bg-[#0a0a0c] overflow-hidden selection:bg-indigo-500/30 font-sans">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[150px]" />
        <div className="absolute top-[20%] right-[30%] w-[30%] h-[30%] bg-cyan-900/5 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main>
        <div id="home">
          <Hero />
        </div>

        <Section id="vision">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              การดำเนินงานของเรา
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              สำรวจตัวชี้วัดที่ใช้งานอยู่และวิสัยทัศน์ขององค์กรที่ขับเคลื่อนอนาคตของอุตสาหกรรม
            </p>
          </div>
          <Dashboard />
        </Section>

        <Section id="departments" className="bg-white/2">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">แผนกของเรา</h2>
            <p className="text-lg text-gray-400">
              พบกับทีมงานที่อยู่เบื้องหลังนวัตกรรม
            </p>
          </div>
          <Departments />
        </Section>

        <Section id="roadmap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">ตารางการบำรุงรักษา</h2>
              <p className="text-gray-400 mb-8">
                ความโปร่งใสคือกุญแจสำคัญ
                ดูตารางการบำรุงรักษาระบบและการอัปเกรดของเราได้ตลอดเวลา
              </p>
              <Maintenance />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                ลำดับความสำคัญในปัจจุบัน
              </h2>
              <p className="text-gray-400 mb-8">
                สิ่งที่ทีมงานของเรากำลังมุ่งเน้นในวันนี้
              </p>
              <div className="glass-panel rounded-2xl overflow-hidden h-[500px] relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0c] pointer-events-none z-10"></div>
                <TaskList />
              </div>
            </div>
          </div>
        </Section>

        <footer className="py-12 border-t border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-sm">
              © 2026 NexCorp Industries สงวนลิขสิทธิ์
            </div>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                นโยบายความเป็นส่วนตัว
              </a>
              <a href="#" className="hover:text-white transition-colors">
                เงื่อนไขการบริการ
              </a>
              <a href="#" className="hover:text-white transition-colors">
                ติดต่อเรา
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
