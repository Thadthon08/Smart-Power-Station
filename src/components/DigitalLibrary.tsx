import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BookOpen, Cog, FileText } from "lucide-react";
import generatorPdf from "../assets/training_Generator.pdf";
import steamTurbinePdf from "../assets/training_Steam Turbine.pdf";
import { useNavigationStore } from "../store/navigationStore";

const libraryCards = [
  {
    id: "steam-turbine",
    title: "Steam Turbine",
    subtitle: "กังหันไอน้ำ",
    icon: Cog,
    color: "from-purple-400 to-indigo-500",
    description: "เอกสารและคู่มือกังหันไอน้ำ",
    pdfUrl: steamTurbinePdf,
  },
  {
    id: "generator",
    title: "Generator",
    subtitle: "เครื่องกำเนิดไฟฟ้า",
    icon: Cog,
    color: "from-blue-400 to-cyan-500",
    description: "คู่มือและข้อมูลเครื่องกำเนิดไฟฟ้า",
    pdfUrl: generatorPdf,
  },
  {
    id: "wi-starting",
    title: "WI: Starting Steam Turbine",
    subtitle: "ขั้นตอนการสตาร์ทกังหัน",
    icon: FileText,
    color: "from-rose-400 to-pink-500",
    description: "Work Instruction การสตาร์ทกังหันไอน้ำ",
    pdfUrl: steamTurbinePdf,
  },
  {
    id: "wi-sync",
    title: "WI: Synchronizing of Alternator",
    subtitle: "ขั้นตอนการซิงค์เครื่อง",
    icon: FileText,
    color: "from-teal-400 to-emerald-500",
    description: "Work Instruction การซิงโครไนซ์อัลเทอร์เนเตอร์",
    pdfUrl: generatorPdf,
  },
];

export default function DigitalLibrary() {
  const { librarySubMenu, setLibrarySubMenu } = useNavigationStore();

  const openPdf = (pdfUrl: string, title: string) => {
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  if (librarySubMenu) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="space-y-4 sm:space-y-6"
      >
        <button
          onClick={() => setLibrarySubMenu(null)}
          className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold mb-4"
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          กลับไปคลังเอกสาร
        </button>

        <div className="glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">
            {librarySubMenu}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            เอกสารและคู่มือสำหรับ {librarySubMenu}
          </p>

          {/* Placeholder document list */}
          <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
            {[
              "คู่มือการใช้งาน (Operating Manual)",
              "เอกสารทางเทคนิค (Technical Specification)",
              "ขั้นตอนการบำรุงรักษา (Maintenance Procedure)",
              "รายงานการทดสอบ (Test Report)",
            ].map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-sky-200 hover:border-sky-400 transition-all cursor-pointer"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={16} className="sm:w-5 sm:h-5 text-sky-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                    {doc}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-500">
                    PDF • อัปเดตล่าสุด 2026
                  </p>
                </div>
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-sky-100 text-sky-600 rounded-lg text-xs sm:text-sm font-semibold hover:bg-sky-200 transition-colors flex-shrink-0">
                  ดูเอกสาร
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          คลังเอกสารดิจิทัล
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          เอกสาร คู่มือ และ Work Instruction ทั้งหมด
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <AnimatePresence>
          {libraryCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  card.pdfUrl
                    ? openPdf(card.pdfUrl, card.title)
                    : setLibrarySubMenu(card.title)
                }
                className="glass-panel p-6 sm:p-8 rounded-xl sm:rounded-2xl text-left hover:shadow-xl transition-all"
              >
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 sm:mb-4 sky-glow`}
                >
                  <Icon size={24} className="sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg sm:text-xl mb-1">
                  {card.title}
                </h3>
                <p className="text-sky-600 text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                  {card.subtitle}
                </p>
                <p className="text-slate-600 text-xs sm:text-sm">
                  {card.description}
                </p>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
