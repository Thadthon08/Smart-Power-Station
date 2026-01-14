import { motion } from "framer-motion";
import { Shield, Target, TrendingUp, Zap } from "lucide-react";
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

  return (
    <div className="space-y-12">
      {/* Vision & Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-10 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-400/10 to-blue-600/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Target size={32} className="text-sky-600" />
            <h2 className="text-3xl font-bold text-slate-900">
              วิสัยทัศน์ของเรา
            </h2>
          </div>

          <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mb-6">
            "มุ่งมั่นเป็นผู้นำในการผลิตพลังงานไฟฟ้าที่ยั่งยืน
            ด้วยเทคโนโลยีที่ทันสมัยและการดูแลสิ่งแวดล้อม
            เพื่ออนาคตที่สดใสของประเทศไทย"
          </p>

          <div className="flex gap-3">
            <span className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold">
              Sustainable
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Innovation
            </span>
            <span className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
              Excellence
            </span>
          </div>
        </div>
      </motion.div>

      {/* Department Goals */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          เป้าหมายประจำปี
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-6 rounded-2xl hover:shadow-xl transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center mb-4 sky-glow`}
                >
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">
                  {goal.title}
                </h3>
                <div className="text-4xl font-bold text-sky-600 mb-2">
                  {goal.value}
                </div>
                <p className="text-sm text-slate-600">{goal.description}</p>
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
