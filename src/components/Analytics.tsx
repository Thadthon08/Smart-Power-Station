import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTaskStore } from "../store/taskStore";

const COLORS = {
  completed: "#10b981",
  pending: "#f59e0b",
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#10b981",
};

export default function Analytics() {
  const stats = useTaskStore((state) => state.getTaskStats());
  const todayTasks = useTaskStore((state) => state.getTodayTasks());

  const completionData = [
    { name: "Completed", value: stats.completed, color: COLORS.completed },
    {
      name: "Pending",
      value: stats.total - stats.completed,
      color: COLORS.pending,
    },
  ];

  const priorityData = [
    { name: "High", value: stats.high, color: COLORS.high },
    { name: "Medium", value: stats.medium, color: COLORS.medium },
    { name: "Low", value: stats.low, color: COLORS.low },
  ];

  const statCards = [
    {
      icon: CheckCircle2,
      label: "Completed",
      value: stats.completed,
      total: stats.total,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Clock,
      label: "Pending",
      value: stats.total - stats.completed,
      total: stats.total,
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: AlertCircle,
      label: "High Priority",
      value: stats.high,
      total: stats.total,
      color: "from-red-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      label: "Completion Rate",
      value: `${Math.round(stats.completionRate)}%`,
      total: null,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-8">Visual Analytics</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {typeof stat.value === "number" && stat.total
                    ? `${stat.value}/${stat.total}`
                    : stat.value}
                </div>
              </div>
            </div>
            <div className="text-white/60 font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Completion Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">Task Completion</h3>
          {stats.total > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={completionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Legend wrapperStyle={{ color: "white" }} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-white/40">
              No data available
            </div>
          )}
        </motion.div>

        {/* Priority Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">
            Priority Distribution
          </h3>
          {stats.total > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData.filter((d) => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Legend wrapperStyle={{ color: "white" }} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-white/40">
              No data available
            </div>
          )}
        </motion.div>
      </div>

      {/* Today's Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Today's Progress</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-white/80">
            <span>Tasks Created Today</span>
            <span className="text-2xl font-bold">{todayTasks.length}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.completionRate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
            />
          </div>
          <div className="text-center text-white/60 text-sm">
            {Math.round(stats.completionRate)}% of all tasks completed
          </div>
        </div>
      </motion.div>
    </div>
  );
}
