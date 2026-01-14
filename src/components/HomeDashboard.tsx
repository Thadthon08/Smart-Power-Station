import { motion } from "framer-motion";
import { FileText, Shield, Target, TrendingUp, Zap } from "lucide-react";
import LivePerformance from "./LivePerformance";

export default function HomeDashboard() {
  const goals = [
    {
      icon: TrendingUp,
      title: "ความน่าเชื่อถือ (Reliability)",
      value: "99.9%",
      description: "เวลาการทำงานของระบบต่อเนื่อง",
      color: "from-sky-400 to-blue-500",
    },
    {
      icon: Shield,
      title: "ความปลอดภัย (Zero Accident)",
      value: "0",
      description: "อุบัติเหตุในปีนี้",
      color: "from-emerald-400 to-green-500",
    },
    {
      icon: Zap,
      title: "ประสิทธิภาพการผลิต",
      value: "95.2%",
      description: "Efficiency Rating",
      color: "from-amber-400 to-orange-500",
    },
  ];

  const qualityGoals = [
    {
      id: 1,
      item: "เสียบการบดูถ้ว เนื่องจากข้อยกพรอง ของเหมก",
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
      item: "การดับไฟขนโรงไฟฟ้าผาบใช้ในโรงงาน น้ำภาค โดยให้รวยสลัคไฟฟ้าในนามารถ ถายได้ 32 MW",
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
      item: "ไม่มีอุบัติเหตุในหน่วยงาน ตามตั้งเป้าแผนกตลอง",
      target: "0 ครั้ง",
      monthly: 0,
      accumulated: 0,
      difference: 0,
    },
    {
      id: 6,
      item: "Kaizen ตามแผนโดยเฉพาะของหน่วยงาน",
      target: "3 เรื่องปี",
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

        {/* Quality Goals Table */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
                  <th className="px-4 py-4 text-left text-sm font-semibold border-r border-sky-400/50">
                    ลำดับ
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-semibold border-r border-sky-400/50">
                    รายการ
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold border-r border-sky-400/50">
                    <div>เป้าหมาย</div>
                    <div className="text-xs font-normal">ปี 68/69</div>
                  </th>
                  <th
                    className="px-6 py-4 text-center text-sm font-semibold border-r border-sky-400/50"
                    colSpan={2}
                  >
                    ผลงานที่ทำได้
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">
                    ผลต่าง
                  </th>
                </tr>
                <tr className="bg-sky-500/90 text-white">
                  <th className="border-t border-sky-400/50"></th>
                  <th className="border-t border-sky-400/50"></th>
                  <th className="border-t border-sky-400/50"></th>
                  <th className="px-4 py-2 text-center text-xs font-medium border-t border-r border-sky-400/50">
                    ประจำสัปดาห์
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium border-t border-r border-sky-400/50">
                    สะสม
                  </th>
                  <th className="border-t border-sky-400/50"></th>
                </tr>
              </thead>
              <tbody>
                {qualityGoals.map((goal, index) => (
                  <motion.tr
                    key={goal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-sky-50/50 transition-colors border-b border-slate-200 last:border-b-0"
                  >
                    <td className="px-4 py-4 text-center text-sm font-medium text-slate-700 border-r border-slate-200">
                      {goal.id}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-800 border-r border-slate-200">
                      {goal.item}
                    </td>
                    <td className="px-4 py-4 text-center text-sm font-semibold text-sky-600 border-r border-slate-200">
                      {goal.target}
                    </td>
                    <td className="px-4 py-4 text-center text-sm font-medium text-slate-700 border-r border-slate-200">
                      {goal.monthly}
                    </td>
                    <td className="px-4 py-4 text-center text-sm font-medium text-slate-700 border-r border-slate-200">
                      {goal.accumulated}
                    </td>
                    <td className="px-4 py-4 text-center text-sm font-medium text-slate-700">
                      {goal.difference}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Original Goals Cards */}
        <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">
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
      </div>

      {/* Live Performance */}
      <LivePerformance />
    </div>
  );
}
