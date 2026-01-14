import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, ClipboardCheck, Clock } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTaskStore } from "../store/taskStore";
import { useComplianceStore } from "../store/complianceStore";

export default function LivePerformance() {
  const { tasks, getTaskStats, toggleTask } = useTaskStore();
  const { records } = useComplianceStore();
  const stats = getTaskStats();

  // Mock data for Power Output chart
  const powerData = [
    { time: "00:00", mw: 245 },
    { time: "04:00", mw: 238 },
    { time: "08:00", mw: 268 },
    { time: "12:00", mw: 285 },
    { time: "16:00", mw: 292 },
    { time: "20:00", mw: 275 },
    { time: "24:00", mw: 250 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "สูง":
        return "bg-red-100 text-red-700 border-red-200";
      case "ปานกลาง":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "ต่ำ":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "สูง":
        return <AlertCircle size={14} />;
      case "ปานกลาง":
        return <Clock size={14} />;
      default:
        return <CheckCircle2 size={14} />;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        ประสิทธิภาพแบบเรียลไทม์
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Tasks Progress */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="font-bold text-slate-900 mb-4">งานประจำวัน</h3>

            {/* Circular Progress */}
            <div className="flex justify-center items-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-sky-100"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 70 * (1 - stats.completionRate / 100)
                    }`}
                    className="text-sky-500 transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-sky-600">
                    {stats.completionRate}%
                  </span>
                  <span className="text-sm text-slate-500">เสร็จสิ้น</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">งานทั้งหมด</span>
                <span className="font-semibold text-slate-900">
                  {stats.total} งาน
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">เสร็จแล้ว</span>
                <span className="font-semibold text-emerald-600">
                  {stats.completed} งาน
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">คงเหลือ</span>
                <span className="font-semibold text-amber-600">
                  {stats.total - stats.completed} งาน
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Power Output Chart */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900">
                กราฟกำลังไฟฟ้า (Power Output)
              </h3>
              <span className="text-sm text-slate-500">วันนี้</span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={powerData}>
                  <defs>
                    <linearGradient id="colorMW" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(14, 165, 233, 0.1)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="time"
                    stroke="#64748b"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value} MW`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e0f2fe",
                      borderRadius: "12px",
                      boxShadow: "0 8px 32px rgba(14, 165, 233, 0.15)",
                    }}
                    itemStyle={{ color: "#0f172a", fontWeight: 600 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mw"
                    stroke="#0EA5E9"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorMW)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="mt-6 glass-panel p-6 rounded-2xl">
        <h3 className="font-bold text-slate-900 mb-4">รายการงานวันนี้</h3>
        <div className="space-y-3">
          {/* Regular Tasks */}
          {tasks.slice(0, 3).map((task) => (
            <motion.div
              key={task.id}
              layout
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                task.completed
                  ? "bg-slate-50 border-slate-200 opacity-60"
                  : "bg-white border-sky-200 hover:border-sky-400"
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                  task.completed
                    ? "bg-sky-500 border-sky-500"
                    : "border-slate-300 hover:border-sky-400"
                }`}
              >
                {task.completed && (
                  <CheckCircle2 size={16} className="text-white" />
                )}
              </button>

              <div className="flex-1">
                <p
                  className={`font-medium ${
                    task.completed
                      ? "text-slate-400 line-through"
                      : "text-slate-900"
                  }`}
                >
                  {task.title}
                </p>
                {task.category && (
                  <span className="text-xs text-slate-500">
                    {task.category}
                  </span>
                )}
              </div>

              <span
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                  task.priority
                )}`}
              >
                {getPriorityIcon(task.priority)}
                {task.priority}
              </span>
            </motion.div>
          ))}

          {/* Compliance Records */}
          {records.slice(0, 2).map((record) => {
            const completedItems = record.checklist.filter(
              (item) => item.checked
            ).length;
            const totalItems = record.checklist.length;
            const progress = Math.round((completedItems / totalItems) * 100);

            return (
              <motion.div
                key={record.id}
                layout
                className="flex items-center gap-4 p-4 rounded-xl border bg-white border-purple-200 hover:border-purple-400 transition-all"
              >
                <div className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center">
                  <ClipboardCheck size={16} className="text-purple-600" />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    {record.equipmentName} - {record.documentType}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">
                      ความคืบหน้า: {completedItems}/{totalItems}
                    </span>
                    <div className="flex-1 max-w-[120px] h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    record.status === "ผ่าน"
                      ? "bg-emerald-100 text-emerald-700"
                      : record.status === "ไม่ผ่าน"
                      ? "bg-red-100 text-red-700"
                      : record.status === "ต้องแก้ไข"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {record.status}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
