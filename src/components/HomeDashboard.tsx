import { motion } from "framer-motion";
import { FileText, Target } from "lucide-react";
import LivePerformance from "./LivePerformance";

export default function HomeDashboard() {
  // const goals = [
  //   {
  //     icon: TrendingUp,
  //     title: "ความน่าเชื่อถือ (Reliability)",
  //     value: "99.9%",
  //     description: "เวลาการทำงานของระบบต่อเนื่อง",
  //     color: "from-sky-400 to-blue-500",
  //   },
  //   {
  //     icon: Shield,
  //     title: "ความปลอดภัย (Zero Accident)",
  //     value: "0",
  //     description: "อุบัติเหตุในปีนี้",
  //     color: "from-emerald-400 to-green-500",
  //   },
  //   {
  //     icon: Zap,
  //     title: "ประสิทธิภาพการผลิต",
  //     value: "95.2%",
  //     description: "Efficiency Rating",
  //     color: "from-amber-400 to-orange-500",
  //   },
  // ];

  const qualityGoals = [
    {
      id: 1,
      item: "เสียเวลาหยุดหีบ เนื่องจากข้อบกพร่องของแผนก",
      target: "0 ครั้ง",
      monthly: 0,
      accumulated: 0,
      difference: 0,
    },
    {
      id: 2,
      item: "ต้องไม่มี Rotor Gear Generator หลัง Test Run",
      target: "0 ครั้ง",
      monthly: 0,
      accumulated: 0,
      difference: 0,
    },
    {
      id: 3,
      item: "การดึงไฟฟ้าจากโรงไฟฟ้าเข้ามาใช้ในโรงงานน้ำตาล โดยที่เครื่องผลิตไฟฟ้าไม่สามารถจ่ายได้ 32 MW",
      target: "1 ครั้ง",
      monthly: 0,
      accumulated: 0,
      difference: 0,
    },
    {
      id: 4,
      item: "งบการซ่อมบำรุง",
      target: "ไม่เกิน 100%",
      monthly: 0,
      accumulated: 0,
      difference: 0,
    },
    {
      id: 5,
      item: "ไม่มีอุบัติเหตุในหน่วยงาน (จนถึงขั้นหยุดงาน)",
      target: "0 ครั้ง",
      monthly: 0,
      accumulated: 0,
      difference: 0,
    },
    {
      id: 6,
      item: "Kaizen ตามนโยบาย/ปัญหาของหน่วยงาน",
      target: "3 เรื่อง/ปี",
      monthly: 0,
      accumulated: 0,
      difference: 0,
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12">
      {/* Vision & Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-sky-400/10 to-blue-600/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target size={24} className="sm:w-8 sm:h-8 text-sky-600" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">
              วิสัยทัศน์ของเรา
            </h2>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mb-4 sm:mb-6">
            "มุ่งมั่นเป็นผู้นำในการผลิตพลังงานไฟฟ้าที่ยั่งยืน
            ด้วยเทคโนโลยีที่ทันสมัยและการดูแลสิ่งแวดล้อม
            เพื่ออนาคตที่สดใสของประเทศไทย"
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-sky-100 text-sky-700 rounded-full text-xs sm:text-sm font-semibold">
              Sustainable
            </span>
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-semibold">
              Innovation
            </span>
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-100 text-cyan-700 rounded-full text-xs sm:text-sm font-semibold">
              Excellence
            </span>
          </div>
        </div>
      </motion.div>

      {/* Department Goals */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
            <FileText size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            เป้าหมายคุณภาพ : แผนกไฟฟ้าหลัก ( LP )
          </h2>
        </div>

        {/* Quality Goals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {qualityGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel rounded-2xl overflow-hidden hover:shadow-2xl transition-all group"
            >
              {/* Card Header with Badge */}
              <div className="relative p-6 pb-5">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">
                      {goal.id}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-800 text-base leading-relaxed pt-1">
                    {goal.item}
                  </h3>
                </div>

                {/* Target Section */}
                <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-4 border border-sky-100">
                  <div className="text-xs font-medium text-slate-600 mb-2">
                    เป้าหมาย ปี 68/69
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    {goal.target}
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="bg-white/60 px-6 py-5 border-t border-slate-200">
                <div className="grid grid-cols-3 gap-4">
                  {/* ประจำสัปดาห์ */}
                  <div className="text-center">
                    <div className="text-xs font-semibold text-slate-500 mb-2">
                      ประจำสัปดาห์
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {goal.monthly}
                    </div>
                  </div>

                  {/* สะสม */}
                  <div className="text-center border-x border-slate-200">
                    <div className="text-xs font-semibold text-slate-500 mb-2">
                      สะสม
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {goal.accumulated}
                    </div>
                  </div>

                  {/* ผลต่าง */}
                  <div className="text-center">
                    <div className="text-xs font-semibold text-slate-500 mb-2">
                      ผลต่าง
                    </div>
                    <div className="text-3xl font-bold text-emerald-600">
                      {goal.difference}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Original Goals Cards */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 sm:p-8 rounded-2xl mt-8"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            เป้าหมายหลัก
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {goals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-5 sm:p-6 rounded-xl sm:rounded-2xl hover:shadow-xl transition-all"
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-3 sm:mb-4 sky-glow`}
                  >
                    <Icon size={24} className="sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                    {goal.title}
                  </h3>
                  <div className="text-3xl sm:text-4xl font-bold text-sky-600 mb-2">
                    {goal.value}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    {goal.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div> */}
      </div>

      {/* Live Performance */}
      <LivePerformance />
    </div>
  );
}
