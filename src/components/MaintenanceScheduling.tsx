import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Edit2,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import { useState } from "react";
import {
  type MaintenanceType,
  useMaintenanceStore,
} from "../store/maintenanceStore";

export default function MaintenanceScheduling() {
  const {
    schedules,
    addSchedule,
    deleteSchedule,
    toggleStatus,
    updateSchedule,
  } = useMaintenanceStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    equipment: "",
    type: "Preventive" as MaintenanceType,
    description: "",
    scheduledDate: "",
    assignedTo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateSchedule(editingId, formData);
      setEditingId(null);
    } else {
      addSchedule(
        formData.equipment,
        formData.type,
        formData.description,
        formData.scheduledDate,
        formData.assignedTo
      );
    }
    setFormData({
      equipment: "",
      type: "Preventive",
      description: "",
      scheduledDate: "",
      assignedTo: "",
    });
    setShowForm(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (schedule: any) => {
    setFormData({
      equipment: schedule.equipment,
      type: schedule.type,
      description: schedule.description,
      scheduledDate: schedule.scheduledDate,
      assignedTo: schedule.assignedTo,
    });
    setEditingId(schedule.id);
    setShowForm(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "รอดำเนินการ":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "กำลังดำเนินการ":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "เสร็จสิ้น":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "รอดำเนินการ":
        return <Clock size={14} />;
      case "กำลังดำเนินการ":
        return <AlertCircle size={14} />;
      case "เสร็จสิ้น":
        return <CheckCircle2 size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  const getTypeColor = (type: MaintenanceType) => {
    switch (type) {
      case "Preventive":
        return "bg-sky-100 text-sky-700";
      case "Corrective":
        return "bg-orange-100 text-orange-700";
      case "Predictive":
        return "bg-purple-100 text-purple-700";
      case "Emergency":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            ตารางงานบำรุงรักษา
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            จัดการและติดตามงานบำรุงรักษาทั้งหมด
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              equipment: "",
              type: "Preventive",
              description: "",
              scheduledDate: "",
              assignedTo: "",
            });
          }}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg sky-glow hover:shadow-xl transition-all"
        >
          <Plus size={20} />
          เพิ่มงานบำรุงรักษา
        </motion.button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 rounded-2xl"
        >
          <h4 className="font-bold text-slate-900 mb-4">
            {editingId ? "แก้ไขงานบำรุงรักษา" : "เพิ่มงานบำรุงรักษาใหม่"}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  ชื่ออุปกรณ์
                </label>
                <input
                  type="text"
                  required
                  value={formData.equipment}
                  onChange={(e) =>
                    setFormData({ ...formData, equipment: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-sky-200 rounded-xl focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="เช่น Gas Turbine Unit 1"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  ประเภทงาน
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as MaintenanceType,
                    })
                  }
                  className="w-full px-4 py-3 bg-white border border-sky-200 rounded-xl focus:outline-none focus:border-sky-500 transition-colors"
                >
                  <option value="Preventive">Preventive (ป้องกัน)</option>
                  <option value="Corrective">Corrective (แก้ไข)</option>
                  <option value="Predictive">Predictive (คาดการณ์)</option>
                  <option value="Emergency">Emergency (ฉุกเฉิน)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                รายละเอียดงาน
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 bg-white border border-sky-200 rounded-xl focus:outline-none focus:border-sky-500 transition-colors"
                rows={3}
                placeholder="อธิบายงานที่ต้องทำ..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  วันที่กำหนด
                </label>
                <input
                  type="date"
                  required
                  value={formData.scheduledDate}
                  onChange={(e) =>
                    setFormData({ ...formData, scheduledDate: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-sky-200 rounded-xl focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  ผู้รับผิดชอบ
                </label>
                <input
                  type="text"
                  required
                  value={formData.assignedTo}
                  onChange={(e) =>
                    setFormData({ ...formData, assignedTo: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-sky-200 rounded-xl focus:outline-none focus:border-sky-500 transition-colors"
                  placeholder="เช่น ทีมช่าง A"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="px-5 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                {editingId ? "บันทึกการแก้ไข" : "เพิ่มงาน"}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Schedule List */}
      <div className="space-y-3">
        {schedules.length === 0 ? (
          <div className="glass-panel p-12 rounded-2xl text-center">
            <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">ยังไม่มีงานบำรุงรักษา</p>
            <p className="text-sm text-slate-400 mt-1">
              คลิกปุ่ม "เพิ่มงานบำรุงรักษา" เพื่อเริ่มต้น
            </p>
          </div>
        ) : (
          schedules.map((schedule) => (
            <motion.div
              key={schedule.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass-panel p-5 rounded-xl hover:shadow-lg transition-all ${
                schedule.status === "เสร็จสิ้น" ? "opacity-70" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Status Indicator */}
                <button
                  onClick={() => toggleStatus(schedule.id)}
                  className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                    schedule.status === "เสร็จสิ้น"
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-slate-300 hover:border-sky-400"
                  }`}
                >
                  {schedule.status === "เสร็จสิ้น" && (
                    <CheckCircle2 size={14} className="text-white" />
                  )}
                </button>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4
                        className={`font-bold text-lg ${
                          schedule.status === "เสร็จสิ้น"
                            ? "text-slate-400 line-through"
                            : "text-slate-900"
                        }`}
                      >
                        {schedule.equipment}
                      </h4>
                      <p
                        className={`text-sm mt-1 ${
                          schedule.status === "เสร็จสิ้น"
                            ? "text-slate-400"
                            : "text-slate-600"
                        }`}
                      >
                        {schedule.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(schedule)}
                        className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteSchedule(schedule.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <span
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        schedule.status
                      )}`}
                    >
                      {getStatusIcon(schedule.status)}
                      {schedule.status}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                        schedule.type
                      )}`}
                    >
                      {schedule.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar size={12} />
                      {new Date(schedule.scheduledDate).toLocaleDateString(
                        "th-TH",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <User size={12} />
                      {schedule.assignedTo}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
