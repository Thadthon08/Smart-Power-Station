import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Check,
  Clock,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: "ต่ำ" | "ปานกลาง" | "สูง";
  time: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      text: "ตรวจสอบรายงานการเงินไตรมาส 4",
      completed: false,
      priority: "สูง",
      time: "09:00 AM",
    },
    {
      id: 2,
      text: "ประชุมทีมกับฝ่ายการตลาด",
      completed: true,
      priority: "ปานกลาง",
      time: "11:30 AM",
    },
    {
      id: 3,
      text: "ตรวจสอบการบำรุงรักษาเซิร์ฟเวอร์",
      completed: false,
      priority: "สูง",
      time: "02:00 PM",
    },
    {
      id: 4,
      text: "ร่างจดหมายข่าวทางอีเมล",
      completed: false,
      priority: "ต่ำ",
      time: "04:00 PM",
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const getPriorityColor = (p: string) => {
    if (p === "สูง") return "text-red-400 bg-red-400/10";
    if (p === "ปานกลาง") return "text-amber-400 bg-amber-400/10";
    return "text-green-400 bg-green-400/10";
  };

  return (
    <div className="p-8 h-full">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">งานประจำวัน</h2>
          <p className="text-gray-400">
            จัดการลำดับความสำคัญและกระบวนการทำงานของคุณ
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
          <CalendarIcon size={16} />
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="เพิ่มงานใหม่..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl transition-colors">
              <Plus size={24} />
            </button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`group p-4 rounded-xl border transition-all ${
                  task.completed
                    ? "bg-white/5 border-transparent opacity-60"
                    : "glass-panel border-white/10 hover:border-indigo-500/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                      task.completed
                        ? "bg-indigo-500 border-indigo-500 text-white"
                        : "border-gray-500 hover:border-indigo-400"
                    }`}
                  >
                    {task.completed && <Check size={14} />}
                  </button>

                  <div className="flex-1">
                    <p
                      className={`font-medium transition-colors ${
                        task.completed
                          ? "text-gray-500 line-through"
                          : "text-white"
                      }`}
                    >
                      {task.text}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs">
                      <span className="text-gray-500 flex items-center gap-1">
                        <Clock size={10} /> {task.time}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <button className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-opacity p-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mini Stats or Calendar */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4">ผลผลิต</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-white">75%</span>
              <span className="text-green-400 text-sm mb-1">
                +5% จากเมื่อวาน
              </span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 w-3/4"></div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">เสร็จสิ้น</span>
                <span className="text-white">12 งาน</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">รอดำเนินการ</span>
                <span className="text-white">4 งาน</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
