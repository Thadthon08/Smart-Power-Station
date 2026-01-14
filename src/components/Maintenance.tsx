import { motion } from "framer-motion";
import { AlertCircle, Calendar, CheckCircle2, Clock } from "lucide-react";

const schedule = [
  {
    id: 1,
    system: "Server Cluster A",
    type: "Routine Update",
    date: "2023-11-15",
    status: "เสร็จสิ้น",
    technician: "Alex M.",
  },
  {
    id: 2,
    system: "Database Sharding",
    type: "Migration",
    date: "2023-11-20",
    status: "กำลังดำเนินการ",
    technician: "Sarah K.",
  },
  {
    id: 3,
    system: "Firewall Patch",
    type: "Security",
    date: "2023-11-22",
    status: "รอดำเนินการ",
    technician: "Unassigned",
  },
  {
    id: 4,
    system: "Cooling Systems",
    type: "Hardware",
    date: "2023-11-25",
    status: "รอดำเนินการ",
    technician: "Mike R.",
  },
  {
    id: 5,
    system: "Backup Verification",
    type: "Audit",
    date: "2023-11-28",
    status: "ตามกำหนดการ",
    technician: "Bot_01",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "เสร็จสิ้น":
      return "text-green-400 bg-green-400/10 border-green-400/20";
    case "กำลังดำเนินการ":
      return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    case "รอดำเนินการ":
      return "text-red-400 bg-red-400/10 border-red-400/20";
    default:
      return "text-gray-400 bg-gray-400/10 border-gray-400/20";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "เสร็จสิ้น":
      return CheckCircle2;
    case "กำลังดำเนินการ":
      return Clock;
    case "รอดำเนินการ":
      return AlertCircle;
    default:
      return Calendar;
  }
};

export default function Maintenance() {
  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            ตารางการบำรุงรักษา
          </h2>
          <p className="text-gray-400">
            การอัปเดตระบบและการตรวจสอบฮาร์ดแวร์ที่กำลังจะมาถึง
          </p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors">
          + กำหนดการใหม่
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="grid grid-cols-5 p-4 border-b border-white/10 bg-white/5 text-gray-400 text-sm font-medium">
          <div className="col-span-1">ระบบ</div>
          <div className="col-span-1">ประเภท</div>
          <div className="col-span-1">วันที่</div>
          <div className="col-span-1">ช่างเทคนิค</div>
          <div className="col-span-1 text-right">สถานะ</div>
        </div>

        {schedule.map((item, index) => {
          const StatusIcon = getStatusIcon(item.status);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="grid grid-cols-5 p-4 border-b border-white/5 hover:bg-white/5 transition-colors items-center text-sm"
            >
              <div className="col-span-1 font-medium text-white">
                {item.system}
              </div>
              <div className="col-span-1 text-gray-400">{item.type}</div>
              <div className="col-span-1 text-gray-400">{item.date}</div>
              <div className="col-span-1 text-gray-400">{item.technician}</div>
              <div className="col-span-1 flex justify-end">
                <span
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    item.status
                  )}`}
                >
                  <StatusIcon size={12} />
                  {item.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
