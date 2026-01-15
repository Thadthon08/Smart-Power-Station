import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function LivePerformance() {
  // Mock data for Power Output chart - Monthly (1-31 days)
  const powerData = [
    { day: "1", mw: 245 },
    { day: "2", mw: 238 },
    { day: "3", mw: 268 },
    { day: "4", mw: 285 },
    { day: "5", mw: 292 },
    { day: "6", mw: 275 },
    { day: "7", mw: 250 },
    { day: "8", mw: 258 },
    { day: "9", mw: 272 },
    { day: "10", mw: 280 },
    { day: "11", mw: 288 },
    { day: "12", mw: 295 },
    { day: "13", mw: 282 },
    { day: "14", mw: 265 },
    { day: "15", mw: 248 },
    { day: "16", mw: 242 },
    { day: "17", mw: 260 },
    { day: "18", mw: 278 },
    { day: "19", mw: 290 },
    { day: "20", mw: 293 },
    { day: "21", mw: 287 },
    { day: "22", mw: 270 },
    { day: "23", mw: 255 },
    { day: "24", mw: 247 },
    { day: "25", mw: 252 },
    { day: "26", mw: 268 },
    { day: "27", mw: 283 },
    { day: "28", mw: 291 },
    { day: "29", mw: 286 },
    { day: "30", mw: 273 },
    { day: "31", mw: 258 },
  ];

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
        ประสิทธิภาพแบบเรียลไทม์
      </h2>

      <div className="gap-4 sm:gap-6">
        {/* Power Output Chart */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-5 sm:p-6 rounded-xl sm:rounded-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                กราฟปริมาณการขายไฟ Feeder (8 mw)
              </h3>
              <span className="text-xs sm:text-sm text-slate-500">
                เดือนนี้
              </span>
            </div>

            <div className="h-48 sm:h-56 md:h-64">
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
                    dataKey="day"
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
    </div>
  );
}
