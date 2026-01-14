import { motion } from "framer-motion";
import {
  BarChart2,
  Code,
  Leaf,
  Megaphone,
  ShieldCheck,
  Truck,
} from "lucide-react";

const departments = [
  {
    name: "วิศวกรรม",
    head: "Sarah Chen",
    count: 42,
    icon: Code,
    color: "from-blue-500 to-indigo-500",
    desc: "พัฒนาโซลูชันยุคใหม่สำหรับแพลตฟอร์มหลักของเรา",
  },
  {
    name: "การตลาด",
    head: "Marcus Johnson",
    count: 18,
    icon: Megaphone,
    color: "from-pink-500 to-rose-500",
    desc: "ขับเคลื่อนการรับรู้แบรนด์และการเข้าถึงทั่วโลก",
  },
  {
    name: "ความยั่งยืน",
    head: "Emma Watson",
    count: 12,
    icon: Leaf,
    color: "from-green-500 to-emerald-500",
    desc: "ทำให้มั่นใจว่ามีการปฏิบัติที่เป็นมิตรกับสิ่งแวดล้อมทั่วทั้งองค์กร",
  },
  {
    name: "การเงิน",
    head: "David Miller",
    count: 24,
    icon: BarChart2,
    color: "from-amber-500 to-orange-500",
    desc: "บริหารการเติบโตทางการเงินและความสัมพันธ์กับนักลงทุน",
  },
  {
    name: "การดำเนินงาน",
    head: "Lisa Wong",
    count: 56,
    icon: Truck,
    color: "from-cyan-500 to-blue-500",
    desc: "ปรับปรุงโลจิสติกส์และกระบวนการทำงานประจำวันให้มีประสิทธิภาพ",
  },
  {
    name: "ความปลอดภัย",
    head: "James Bond",
    count: 8,
    icon: ShieldCheck,
    color: "from-red-500 to-purple-500",
    desc: "ปกป้องทรัพย์สินขององค์กรและความเป็นส่วนตัวของข้อมูล",
  },
];

export default function Departments() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">แผนกของเรา</h2>
        <p className="text-gray-400">ภาพรวมของโครงสร้างองค์กรและทีมงานของเรา</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => {
          const Icon = dept.icon;
          return (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dept.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <Icon size={24} className="text-white" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{dept.name}</h3>
                <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
                  {dept.count} สมาชิก
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4 h-10">{dept.desc}</p>
              <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                <div className="w-6 h-6 rounded-full bg-gray-600"></div>
                <span className="text-xs text-gray-500">
                  หัวหน้าทีม: <span className="text-gray-300">{dept.head}</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
