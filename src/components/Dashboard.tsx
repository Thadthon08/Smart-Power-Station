import { motion } from "framer-motion";
import { Activity, BarChart3, Globe, Shield, Zap } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

const Card = ({
  title,
  icon: Icon,
  value,
  delay,
}: {
  title: string;
  icon: any;
  value: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="glass-panel rounded-2xl p-6 hover:bg-white/5 transition-colors cursor-default"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
        <Icon size={24} />
      </div>
      <span className="text-xs font-medium text-gray-500 bg-white/5 px-2 py-1 rounded-full">
        +2.5%
      </span>
    </div>
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold text-white mt-1">{value}</p>
  </motion.div>
);

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Welcome & Vision Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              ยินดีต้อนรับกลับ, <span className="text-gradient">Jay</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl">
              นี่คือสรุปผลการดำเนินงานของบริษัทและโครงการที่กำลังดำเนินการอยู่
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 rounded-3xl relative overflow-hidden bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/10"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Zap size={120} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 relative z-10">
              วิสัยทัศน์ของเรา
            </h2>
            <p className="text-gray-300 relative z-10 text-lg leading-relaxed max-w-xl">
              "เพื่อปฏิวัติวงการดิจิทัลด้วยการสร้างเทคโนโลยีที่ไร้รอยต่อ
              ใช้งานง่าย และทรงพลัง เพื่อเสริมศักยภาพของมนุษย์ให้ถึงขีดสุด"
            </p>
            <div className="mt-6 flex gap-4 relative z-10">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-indigo-200">
                นวัตกรรม
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-indigo-200">
                ความซื่อสัตย์
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-indigo-200">
                ความเป็นเลิศ
              </span>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-1 grid grid-cols-1 gap-4">
          <Card
            title="รายได้รวม"
            icon={BarChart3}
            value="$124,500"
            delay={0.2}
          />
          <Card title="ผู้ใช้งาน" icon={Globe} value="12,345" delay={0.3} />
        </div>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="ความปลอดภัยโครงการ"
          icon={Shield}
          value="98.5%"
          delay={0.4}
        />
        <Card title="สุขภาพระบบ" icon={Activity} value="100%" delay={0.5} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel p-6 rounded-2xl flex flex-col justify-center items-center text-center hover:bg-white/5 transition-colors cursor-pointer border-dashed border-2 border-white/10"
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
            <PlusIcon />
          </div>
          <span className="text-gray-400 font-medium">เพิ่มวิดเจ็ต</span>
        </motion.div>
      </div>

      {/* Analytics Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-panel p-8 rounded-3xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            การวิเคราะห์ประสิทธิภาพ
          </h3>
          <select className="bg-black/20 text-white border border-white/10 rounded-lg px-3 py-1 text-sm focus:outline-none">
            <option>6 เดือนล่าสุด</option>
            <option>ปีที่ผ่านมา</option>
          </select>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                tick={{ fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#6b7280"
                tick={{ fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-500"
    >
      <path d="M5 12h14"></path>
      <path d="M12 5v14"></path>
    </svg>
  );
}
