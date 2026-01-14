import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileCheck,
  StickyNote,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {  type ComplianceStatus, useComplianceStore } from "../store/complianceStore";

export default function ComplianceTracking() {
  const {
    records,
    toggleChecklistItem,
    updateChecklistNote,
    completeInspection,
    getComplianceStats,
  } = useComplianceStore();

  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<{
    recordId: string;
    itemId: string;
  } | null>(null);
  const [noteText, setNoteText] = useState("");
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [inspectorName, setInspectorName] = useState("");

  const stats = getComplianceStats();

  const getStatusColor = (status: ComplianceStatus) => {
    switch (status) {
      case "รอตรวจสอบ":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "ผ่าน":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "ไม่ผ่าน":
        return "bg-red-100 text-red-700 border-red-200";
      case "ต้องแก้ไข":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: ComplianceStatus) => {
    switch (status) {
      case "รอตรวจสอบ":
        return <Clock size={14} />;
      case "ผ่าน":
        return <CheckCircle2 size={14} />;
      case "ไม่ผ่าน":
        return <XCircle size={14} />;
      case "ต้องแก้ไข":
        return <AlertTriangle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  const handleCompleteInspection = (
    recordId: string,
    status: ComplianceStatus
  ) => {
    if (!inspectorName.trim()) {
      alert("กรุณากรอกชื่อผู้ตรวจสอบ");
      return;
    }
    completeInspection(recordId, inspectorName, status);
    setCompletingId(null);
    setInspectorName("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const calculateProgress = (checklist: any[]) => {
    const checked = checklist.filter((item) => item.checked).length;
    return Math.round((checked / checklist.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-sm text-slate-600 mb-1">ทั้งหมด</div>
          <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-sm text-slate-600 mb-1">รอตรวจสอบ</div>
          <div className="text-2xl font-bold text-amber-600">
            {stats.pending}
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-sm text-slate-600 mb-1">ผ่าน</div>
          <div className="text-2xl font-bold text-emerald-600">
            {stats.passed}
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl">
          <div className="text-sm text-slate-600 mb-1">ต้องแก้ไข</div>
          <div className="text-2xl font-bold text-orange-600">
            {stats.needsAction}
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {records.map((record) => {
          const isExpanded = expandedRecord === record.id;
          const progress = calculateProgress(record.checklist);
          const isCompleting = completingId === record.id;

          return (
            <motion.div
              key={record.id}
              layout
              className="glass-panel rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <div
                className="p-5 cursor-pointer hover:bg-white/50 transition-colors"
                onClick={() => setExpandedRecord(isExpanded ? null : record.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
                        <FileCheck size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">
                          {record.equipmentName}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {record.documentType}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-slate-600">
                          ความคืบหน้า
                        </span>
                        <span className="text-xs font-semibold text-sky-600">
                          {progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-gradient-to-r from-sky-400 to-blue-500"
                        />
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <span
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {getStatusIcon(record.status)}
                        {record.status}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar size={12} />
                        ครั้งถัดไป:{" "}
                        {new Date(record.nextInspectionDate).toLocaleDateString(
                          "th-TH"
                        )}
                      </span>
                      {record.inspectedBy && (
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                          <User size={12} />
                          {record.inspectedBy}
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    {isExpanded ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Content - Checklist */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-sky-200/50 p-5 bg-white/30"
                >
                  <h4 className="font-semibold text-slate-900 mb-4">
                    รายการตรวจสอบ
                  </h4>

                  <div className="space-y-3 mb-6">
                    {record.checklist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 bg-white rounded-xl border border-sky-100"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleChecklistItem(record.id, item.id);
                          }}
                          className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            item.checked
                              ? "bg-emerald-500 border-emerald-500"
                              : "border-slate-300 hover:border-sky-400"
                          }`}
                        >
                          {item.checked && (
                            <CheckCircle2 size={12} className="text-white" />
                          )}
                        </button>

                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium ${
                              item.checked
                                ? "text-slate-400 line-through"
                                : "text-slate-900"
                            }`}
                          >
                            {item.item}
                          </p>
                          {item.notes && (
                            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                              <div className="flex items-start gap-2">
                                <StickyNote
                                  size={14}
                                  className="text-amber-600 mt-0.5"
                                />
                                <p className="text-xs text-amber-800">
                                  {item.notes}
                                </p>
                              </div>
                            </div>
                          )}
                          {editingNote?.recordId === record.id &&
                            editingNote?.itemId === item.id && (
                              <div className="mt-2 space-y-2">
                                <textarea
                                  value={noteText}
                                  onChange={(e) => setNoteText(e.target.value)}
                                  className="w-full px-3 py-2 text-xs bg-white border border-sky-200 rounded-lg focus:outline-none focus:border-sky-500"
                                  rows={2}
                                  placeholder="เพิ่มหมายเหตุ..."
                                  autoFocus
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      updateChecklistNote(
                                        record.id,
                                        item.id,
                                        noteText
                                      );
                                      setEditingNote(null);
                                      setNoteText("");
                                    }}
                                    className="px-3 py-1 text-xs bg-sky-500 text-white rounded-lg hover:bg-sky-600"
                                  >
                                    บันทึก
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingNote(null);
                                      setNoteText("");
                                    }}
                                    className="px-3 py-1 text-xs bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                                  >
                                    ยกเลิก
                                  </button>
                                </div>
                              </div>
                            )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingNote({
                              recordId: record.id,
                              itemId: item.id,
                            });
                            setNoteText(item.notes || "");
                          }}
                          className="text-slate-400 hover:text-sky-600 transition-colors"
                        >
                          <StickyNote size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Complete Inspection */}
                  {record.status === "รอตรวจสอบ" && (
                    <div className="border-t border-sky-200/50 pt-4">
                      {!isCompleting ? (
                        <button
                          onClick={() => setCompletingId(record.id)}
                          className="w-full px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                        >
                          บันทึกผลการตรวจสอบ
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={inspectorName}
                            onChange={(e) => setInspectorName(e.target.value)}
                            placeholder="ชื่อผู้ตรวจสอบ"
                            className="w-full px-4 py-3 bg-white border border-sky-200 rounded-xl focus:outline-none focus:border-sky-500"
                          />
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              onClick={() =>
                                handleCompleteInspection(record.id, "ผ่าน")
                              }
                              className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors"
                            >
                              ผ่าน
                            </button>
                            <button
                              onClick={() =>
                                handleCompleteInspection(record.id, "ต้องแก้ไข")
                              }
                              className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
                            >
                              ต้องแก้ไข
                            </button>
                            <button
                              onClick={() =>
                                handleCompleteInspection(record.id, "ไม่ผ่าน")
                              }
                              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
                            >
                              ไม่ผ่าน
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              setCompletingId(null);
                              setInspectorName("");
                            }}
                            className="w-full px-4 py-2 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 transition-colors"
                          >
                            ยกเลิก
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
