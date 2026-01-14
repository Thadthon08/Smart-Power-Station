import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Calendar, FileCheck, History } from "lucide-react";
import { useNavigationStore } from "../store/navigationStore";
import ComplianceTracking from "./ComplianceTracking";
import MaintenanceScheduling from "./MaintenanceScheduling";

const maintenanceCards = [
  {
    id: "scheduling",
    title: "Maintenance Scheduling",
    subtitle: "ปฏิทินงานบำรุงรักษา",
    icon: Calendar,
    color: "from-sky-400 to-blue-500",
    description: "จัดการตารางการบำรุงรักษาเครื่องจักร",
  },
  {
    id: "compliance",
    title: "Compliance Tracking",
    subtitle: "ตรวจสอบมาตรฐาน",
    icon: FileCheck,
    color: "from-emerald-400 to-green-500",
    description: "ติดตามความสอดคล้องตามมาตรฐาน",
  },
  {
    id: "history",
    title: "Maintenance History",
    subtitle: "ประวัติการบำรุงรักษา",
    icon: History,
    color: "from-amber-400 to-orange-500",
    description: "ดูประวัติการบำรุงรักษาย้อนหลัง",
  },
];

export default function MaintenanceCenter() {
  const { maintenanceSubMenu, setMaintenanceSubMenu } = useNavigationStore();

  if (maintenanceSubMenu) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="space-y-4 sm:space-y-6"
      >
        <button
          onClick={() => setMaintenanceSubMenu(null)}
          className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold mb-4"
        >
          <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
          กลับไปเมนูหลัก
        </button>

        <div className="glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
            {maintenanceSubMenu}
          </h2>

          {maintenanceSubMenu === "Maintenance Scheduling" ? (
            <MaintenanceScheduling />
          ) : maintenanceSubMenu === "Compliance Tracking" ? (
            <ComplianceTracking />
          ) : (
            <>
              <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8">
                เนื้อหาของเมนู {maintenanceSubMenu} จะแสดงที่นี่
              </p>

              {/* Placeholder content */}
              <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-sky-200"
                  >
                    <div className="h-3 sm:h-4 bg-sky-100 rounded w-3/4 mb-2"></div>
                    <div className="h-2 sm:h-3 bg-slate-100 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          ศูนย์บำรุงรักษา
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          เลือกเมนูเพื่อดูรายละเอียดการบำรุงรักษา
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <AnimatePresence>
          {maintenanceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMaintenanceSubMenu(card.title)}
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
