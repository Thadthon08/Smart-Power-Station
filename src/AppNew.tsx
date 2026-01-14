import { AnimatePresence, motion } from "framer-motion";
import DigitalLibrary from "./components/DigitalLibrary";
import HomeDashboard from "./components/HomeDashboard";
import MaintenanceCenter from "./components/MaintenanceCenter";
import NavbarNew from "./components/NavbarNew";
import { useNavigationStore } from "./store/navigationStore";

function App() {
  const { currentPage } = useNavigationStore();

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomeDashboard />;
      case "maintenance":
        return <MaintenanceCenter />;
      case "library":
        return <DigitalLibrary />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <NavbarNew />

      <main className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <footer className="relative mt-20 py-16 border-t border-sky-200/50 overflow-hidden">
        {/* Background Image from Unsplash - Power Plant */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&auto=format&fit=crop"
            alt="Power Station"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-50 via-sky-50/80 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <span className="font-bold text-lg text-slate-900">
                  Smart Power Station
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                มุ่งมั่นผลิตพลังงานไฟฟ้าที่ยั่งยืนและเป็นมิตรกับสิ่งแวดล้อม
                เพื่ออนาคตที่สดใสของประเทศไทย
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-slate-900 mb-4">ลิงก์ด่วน</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-sky-600 transition-colors">
                    เกี่ยวกับเรา
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sky-600 transition-colors">
                    บริการของเรา
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sky-600 transition-colors">
                    ข่าวสารและกิจกรรม
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sky-600 transition-colors">
                    ติดต่อเรา
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-slate-900 mb-4">ติดต่อเรา</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>📍 ต.หนองโพธิ์ อ.ตาคลี จ.นครสวรรค์</li>
                <li>📞 โทร: 02-123-4567</li>
                <li>✉️ อีเมล: info@smartpowerstation.com</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-sky-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-600 text-sm">
              © 2026 Smart Power Station. All rights reserved.
            </div>
            <div className="flex gap-6 text-slate-600 text-sm">
              <a href="#" className="hover:text-sky-600 transition-colors">
                นโยบายความเป็นส่วนตัว
              </a>
              <a href="#" className="hover:text-sky-600 transition-colors">
                เงื่อนไขการบริการ
              </a>
              <a href="#" className="hover:text-sky-600 transition-colors">
                แผนผังเว็บไซต์
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
