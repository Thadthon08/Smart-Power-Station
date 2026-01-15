import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  Clock,
  Image as ImageIcon,
  ThumbsDown,
  ThumbsUp,
  Upload,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface MaintenanceSubItem {
  id: string;
  description: string;
  images: string[];
  inspectionStatus: "pending" | "passed" | "failed" | null;
}

interface MaintenanceItem {
  id: string;
  title: string;
  subItems: MaintenanceSubItem[];
}

const initialMaintenanceData: MaintenanceItem[] = [
  {
    id: "1",
    title: "งานถอดตรวจเช็คเบื้องต้น Tubine 20 mw. No.1,2,10 mw.",
    subItems: [
      {
        id: "1-1",
        description: "ถอด Cover and Insulation for Turbine",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "1-2",
        description: "ถอด Inlet Steam Piping and Steam Expansion Joint",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "1-3",
        description: "ถอด Connecting Rod and Upper Casing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "1-4",
        description: "ถอด Cover Housing Bearing Front and Rear Side",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "1-5",
        description: "ถอด Coupling Turbine vs Reduction Gear",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "1-6",
        description: "ถอด Cover and Bearing and Thrust Bearing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "1-7",
        description: "ยก Rotor ออกจาก Casing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "1-8",
        description: "ถอด Labyrinth Packing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "1-9",
        description: "ยก Nozzle Diaphragm for Lower Casing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "1-10",
        description: "ถอด Governor Valve พร้อมยกออก",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "1-11",
        description: "หงาย Upper Casing พร้อม ถอด Labyrinth Packing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "1-12",
        description: "ถอด Nozzle Diaphragm for Upper Casing",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "2",
    title: "ตรวจเช็คและ ซ่อแซม Overhead Crane (เครนอาคาร)",
    subItems: [
      {
        id: "2-1",
        description: "เช็คระบบยกน้ำหนัก",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "2-2",
        description: "เช็คระบบขับเคลื่อน",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "2-3",
        description: "เช็คระบบเบรก",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "2-4",
        description: "เช็ระบบหล่อลื่นและรบบควบคุมทั้งหมด",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "3",
    title: "ตรวจเช็คและซ่อมแซม Reduction Gear 10 mw.",
    subItems: [
      {
        id: "3-1",
        description: "เช็ค Clearance Bearing and Thrust Bearing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "3-2",
        description: "เช็ค Backlash",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "3-3",
        description: "ตรวจเช็ครอยร้าว Pinion and Wheel Gear",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "3-4",
        description: "ทำความสะอาดพร้อมประกอบ",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "4",
    title: "ตรวจเช็คและซ่อมแซม Generator 10 mw.",
    subItems: [
      {
        id: "4-1",
        description: "ทำความสะอาด Water Tube for Air Cooler",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "4-2",
        description: "ทำคาวมสะอาดและตรวจเช็ค Bearing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "4-3",
        description: "ทำความสะอาดและตรวจเช็ค Rotor and Stator",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "4-4",
        description: "ทำความสะอาดและตรวจเช็ค Exciter and p.m.g",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "4-5",
        description: "ตรวจเช็คและทำความสะอาด ct Box",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "5",
    title: "ตรวจเช็คและซ่อมแซม Reduction Gear 20 mw. No.1",
    subItems: [
      {
        id: "5-1",
        description: "ถอดทำความสะอาดและเช็ค Clearance Bearing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "5-2",
        description: "Check Backlash for Pinion Gear and Wheel Gear",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "5-3",
        description: "ทำความสะอาดและตรวจเช็ครอยร้าว Pinion and Wheel Gear",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "5-4",
        description: "ทำความสะอาดพร้อมประกอบ",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "6",
    title: "ถอดตรวจเช็คและซ่อมแซม Main Oil Pump 20 mw. No.1,2",
    subItems: [
      {
        id: "6-1",
        description: "เช็ค Bearing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "6-2",
        description: "เช็ค Backlash",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "6-3",
        description: "เช็ค Oil Seal and O-ring",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "7",
    title: "ถอดตรวจเช็คและซ่อมแซม Generator 20 mw. No.1",
    subItems: [
      {
        id: "7-1",
        description: "ถอดทำความสะอาด Water Tube For Air Cooler",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "7-2",
        description: "ถอดตรวจเช็คและทำความสะอาด Bearing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "7-3",
        description:
          "ถอดตรวจเช็คสะอาด Stator and Rotor (ตรวจเช็คพบว่ามีการชำรุดของลิ่ม Stator ก็ชัก Rotor ออก)",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "7-4",
        description: "ถอดตรวจเช็คและทำความสะอาดชุด Exciter",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "7-5",
        description: "ถอดตรวจเช็คและทำความสะอาด Ct Box",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "8",
    title: "ตรวจเช็คซ่อมแซม Reduction Gear 20 mw. No.2",
    subItems: [
      {
        id: "8-1",
        description: "ถอดทำความสะอาดและเช็ค Clearance Bearing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "8-2",
        description: "เช็ค Backlash Pinion and Wheel Gear",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "8-3",
        description: "ทำความสะอาดและเช็ครอยร้าว Pinion and Wheel Gear",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "8-4",
        description: "ทำความสะอาดพร้อมประกอบ",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "9",
    title: "ถอดตรวจเช็คและซ่อมแซม Generator 20 mw. No.2",
    subItems: [
      {
        id: "9-1",
        description: "ถอดทำความสะอาด Water Tube for Air Cooler",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "9-2",
        description: "ถอดตรวจเช็คและทำความสะอาด Bearing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "9-3",
        description:
          "ถอดตรวจเช็คและทำความสะอาด Rotor and Stator (ตรวจเช็คพบว่าลิ่ม Stator ชำรุดก็ต้องชัก Rotorออก)",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "9-4",
        description: "ถอดตรวจเช็คและทำความสะอาดชุด Exciter",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "9-5",
        description: "ถอดตรวจเช็คและทำความสะอาดชุด Ct Box",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "10",
    title: "ตรวจเช็คและซ่อมแซม Turbine 10 mw.",
    subItems: [
      {
        id: "10-1",
        description: "ทำความสะอาด Upper and Lower Casing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "10-2",
        description: "ทำความสะอาดและเช็ครอยร้าว Nozzle and Rotor",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "10-3",
        description: "ทำความสะอาดและเช็ค Bearing and Thrust Bearing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "10-4",
        description: "ทำความสะอาดและเช็คชุด Emergency Stop Valve",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "10-5",
        description: "ทำความสะอาดและเช็คชุด Governor Valve",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "10-6",
        description: "ทำความสะอาดและเช็ค ชุด Pilot Valve",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "10-7",
        description:
          "ประกอบ Nozzle ,Bearing ,Rotor,Governor Valve,Upper Casing,Emergency Stop valve ,Oilpiping and Steam Piping",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "10-8",
        description: "เช็ค Clearance and Alignment",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "10-9",
        description: "หุ้มฉนวน และ ประกอบ Cover",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "11",
    title: "ตรวจเช็คและซ่อมแซม Turbine 20 mw. No.1",
    subItems: [
      {
        id: "11-1",
        description: "ทำความสะอาด Lower and Upper Casing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "11-2",
        description: "ทำความสะอาดและเช็ครอยร้าว Nozzle and Rotor",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "11-3",
        description: "ทำความสะอาดและเช็ค Bearing and Thrust Bearing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "11-4",
        description: "ถอดทำความสะอาดและเช็คชุด Governor Valve",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "11-5",
        description: "ถอดทำความสะอาดและเช็คชุด Emergency Stop Valve",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "11-6",
        description: "ถอดทำความสะอาและเช็คชุด Pilot Valve",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "11-7",
        description:
          "ประกอบ Nozzle,Rotor,Bearing ,Thrust Bearing,Governor Valve,Upper Casing,Emergency Stop Valve",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "11-8",
        description: "เช็ค Clearance and Alignment",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "11-9",
        description: "หุ้มฉนวนและประกอบ Cover",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "12",
    title: "ตรวจเช็คและซ่อมแซม Turbine 20 mw. No.2",
    subItems: [
      {
        id: "12-1",
        description: "ทำความสะอาด Lower and Upper Casing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "12-2",
        description: "ทำความสะอาดและเช็ครอยร้าว Nozzle and Rotor",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "12-3",
        description: "ทำความสะอาดและเช็ค Bearing and Thrust Bearing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "12-4",
        description: "ถอดทำความสะอาดและเช็คชุด Emergency Stop Valve",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "12-5",
        description: "ถอดทำความสะอาดและเช็คชุด Governor Valve",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "12-6",
        description: "ถอดทำความสะอาดและเช็คชุด Pilot Valve",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "12-7",
        description:
          "ประกอบ Nozzle,Rotor,Bearing ,Thrust Bearing,Governor Valve,Upper Casing,Emergency Stop Valve",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "12-8",
        description: "เช็ค Alignment and Clearance",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "12-9",
        description: "หุ้มฉนวน",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "13",
    title: "ตรวจเช็คและซ่อมแซม Main Oil Pump 10 mw.",
    subItems: [
      {
        id: "13-1",
        description: "เช็ค Bearing",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "13-2",
        description: "เช็ค Backlash",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "13-3",
        description: "เช็ค O-ring and Oilseal",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
  {
    id: "14",
    title:
      "ซ่อมแซมระบบน้ำมันหล่อลื่นและน้ำมันควบคุม Turbine 10 mw. , 20 mw. No.1,2",
    subItems: [
      {
        id: "14-1",
        description: "ถอดซ่อมแซม Aux. Lube Oil Pump,Motor Drive",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "14-2",
        description: "ถอดซ่อมแซม Main and Aux Governor Oil Pump, Motor Drive",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "14-3",
        description: "ถอดซ่อมแซม Exhaust Fan ,Motor Drive",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "14-4",
        description: "ทำความสะอาด Water Tube for Oil Cooler",
        images: [],
        inspectionStatus: null,
      },
      {
        id: "14-5",
        description: "ทำความสะอาด Oil Tank และเปลี่ยนถ่ายน้ำมัน 20 mw. No.1",
        images: [],
        inspectionStatus: null,
      },
    ],
  },
];

export default function ComplianceTracking() {
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceItem[]>(
    initialMaintenanceData
  );
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const calculateProgress = (item: MaintenanceItem) => {
    const inspectedCount = item.subItems.filter(
      (sub) =>
        sub.inspectionStatus === "passed" || sub.inspectionStatus === "failed"
    ).length;
    return Math.round((inspectedCount / item.subItems.length) * 100);
  };

  const getTotalImages = (item: MaintenanceItem) => {
    return item.subItems.reduce((sum, sub) => sum + sub.images.length, 0);
  };

  const getInspectionStats = (item: MaintenanceItem) => {
    const passed = item.subItems.filter(
      (sub) => sub.inspectionStatus === "passed"
    ).length;
    const failed = item.subItems.filter(
      (sub) => sub.inspectionStatus === "failed"
    ).length;
    const pending = item.subItems.filter(
      (sub) => !sub.inspectionStatus || sub.inspectionStatus === "pending"
    ).length;
    return { passed, failed, pending };
  };

  const toggleExpand = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const setInspectionStatus = (
    itemId: string,
    subItemId: string,
    status: "passed" | "failed"
  ) => {
    setMaintenanceData(
      maintenanceData.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            subItems: item.subItems.map((sub) =>
              sub.id === subItemId ? { ...sub, inspectionStatus: status } : sub
            ),
          };
        }
        return item;
      })
    );
  };

  const handleImageUpload = (
    itemId: string,
    subItemId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setMaintenanceData(
              maintenanceData.map((item) => {
                if (item.id === itemId) {
                  return {
                    ...item,
                    subItems: item.subItems.map((sub) =>
                      sub.id === subItemId
                        ? { ...sub, images: [...sub.images, ...newImages] }
                        : sub
                    ),
                  };
                }
                return item;
              })
            );
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (
    itemId: string,
    subItemId: string,
    imageIndex: number
  ) => {
    setMaintenanceData(
      maintenanceData.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            subItems: item.subItems.map((sub) =>
              sub.id === subItemId
                ? {
                    ...sub,
                    images: sub.images.filter((_, idx) => idx !== imageIndex),
                  }
                : sub
            ),
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-slate-900 mb-2">
          รายการตรวจสอบการซ่อมบำรุง
        </h3>
        <p className="text-slate-600 text-lg">ติดตามความคืบหน้าและแนบหลักฐาน</p>
      </div>

      <div className="space-y-4 max-w-6xl mx-auto">
        {maintenanceData.map((item, index) => {
          const progress = calculateProgress(item);
          const totalImages = getTotalImages(item);
          const inspectionStats = getInspectionStats(item);
          const isExpanded = expandedItems.has(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-panel rounded-2xl overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-white/50 transition-colors"
                onClick={() => toggleExpand(item.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg text-sm">
                        #{item.id}
                      </span>
                      <h4 className="text-lg font-bold text-slate-900 flex-1">
                        {item.title}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 font-medium">
                          ความคืบหน้า:{" "}
                          {
                            item.subItems.filter(
                              (s) =>
                                s.inspectionStatus === "passed" ||
                                s.inspectionStatus === "failed"
                            ).length
                          }
                          /{item.subItems.length} รายการ
                        </span>
                        <span
                          className={`font-bold ${
                            progress === 100
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        >
                          {progress}%
                        </span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            progress === 100
                              ? "bg-gradient-to-r from-green-500 to-emerald-600"
                              : "bg-gradient-to-r from-blue-500 to-sky-600"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-sm">
                      {totalImages > 0 && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Camera size={16} />
                          <span>{totalImages} รูปภาพ</span>
                        </div>
                      )}
                      {inspectionStats.passed > 0 && (
                        <div className="flex items-center gap-1.5 text-green-600">
                          <ThumbsUp size={16} />
                          <span className="font-semibold">
                            {inspectionStats.passed} ผ่าน
                          </span>
                        </div>
                      )}
                      {inspectionStats.failed > 0 && (
                        <div className="flex items-center gap-1.5 text-red-600">
                          <ThumbsDown size={16} />
                          <span className="font-semibold">
                            {inspectionStats.failed} ไม่ผ่าน
                          </span>
                        </div>
                      )}
                      {inspectionStats.pending > 0 && (
                        <div className="flex items-center gap-1.5 text-amber-600">
                          <Clock size={16} />
                          <span className="font-semibold">
                            {inspectionStats.pending} รอตรวจ
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </motion.div>
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-slate-200"
                  >
                    <div className="p-6 bg-white/30">
                      <h5 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-blue-600" />
                        รายการตรวจสอบ
                      </h5>
                      <div className="space-y-3">
                        {item.subItems.map((subItem) => (
                          <div
                            key={subItem.id}
                            className="bg-white rounded-xl p-4 border border-slate-200"
                          >
                            <div className="flex items-start gap-3 mb-3">
                              <div className="flex-1">
                                <p className="text-sm mb-2 text-slate-900 font-medium">
                                  {subItem.description}
                                </p>

                                {/* Inspection Status Buttons */}
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-xs text-slate-600 font-medium">
                                    สถานะการตรวจ:
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setInspectionStatus(
                                        item.id,
                                        subItem.id,
                                        "passed"
                                      );
                                    }}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                      subItem.inspectionStatus === "passed"
                                        ? "bg-green-500 text-white shadow-md"
                                        : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                                    }`}
                                  >
                                    <ThumbsUp size={14} />
                                    ผ่าน
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setInspectionStatus(
                                        item.id,
                                        subItem.id,
                                        "failed"
                                      );
                                    }}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                      subItem.inspectionStatus === "failed"
                                        ? "bg-red-500 text-white shadow-md"
                                        : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                                    }`}
                                  >
                                    <ThumbsDown size={14} />
                                    ไม่ผ่าน
                                  </button>
                                  {subItem.inspectionStatus && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setMaintenanceData(
                                          maintenanceData.map((itm) => {
                                            if (itm.id === item.id) {
                                              return {
                                                ...itm,
                                                subItems: itm.subItems.map(
                                                  (sub) =>
                                                    sub.id === subItem.id
                                                      ? {
                                                          ...sub,
                                                          inspectionStatus:
                                                            null,
                                                        }
                                                      : sub
                                                ),
                                              };
                                            }
                                            return itm;
                                          })
                                        );
                                      }}
                                      className="text-xs text-slate-500 hover:text-slate-700 underline ml-2"
                                    >
                                      ล้าง
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Image Section */}
                            <div className="space-y-3 border-t border-slate-100 pt-3 mt-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                  <Camera
                                    size={14}
                                    className="text-green-600"
                                  />
                                  <span className="font-medium">
                                    รูปภาพหลักฐาน
                                  </span>
                                </div>
                                <label
                                  htmlFor={`upload-${item.id}-${subItem.id}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-semibold rounded-lg cursor-pointer hover:shadow-lg transition-all"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Upload size={14} />
                                  อัพโหลด
                                </label>
                                <input
                                  id={`upload-${item.id}-${subItem.id}`}
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  className="hidden"
                                  onChange={(e) =>
                                    handleImageUpload(item.id, subItem.id, e)
                                  }
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>

                              {subItem.images.length > 0 ? (
                                <div className="grid grid-cols-3 gap-2">
                                  {subItem.images.map((image, imgIdx) => (
                                    <motion.div
                                      key={imgIdx}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      className="relative group"
                                    >
                                      <img
                                        src={image}
                                        alt={`Evidence ${imgIdx + 1}`}
                                        className="w-full h-24 object-cover rounded-lg border-2 border-slate-200"
                                      />
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeImage(
                                            item.id,
                                            subItem.id,
                                            imgIdx
                                          );
                                        }}
                                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                                      >
                                        <XCircle size={14} />
                                      </button>
                                    </motion.div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex items-center justify-center p-4 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                                  <div className="text-center">
                                    <ImageIcon
                                      size={24}
                                      className="mx-auto text-slate-400 mb-1"
                                    />
                                    <p className="text-xs text-slate-500">
                                      ยังไม่มีรูปภาพ
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-6 rounded-2xl max-w-6xl mx-auto"
      >
        <h5 className="font-bold text-slate-900 mb-3">สรุปภาพรวม</h5>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">
              {maintenanceData.length}
            </p>
            <p className="text-sm text-slate-600">รายการทั้งหมด</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="text-2xl font-bold text-green-600">
              {
                maintenanceData.filter(
                  (item) => calculateProgress(item) === 100
                ).length
              }
            </p>
            <p className="text-sm text-slate-600">เสร็จสมบูรณ์</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl">
            <p className="text-2xl font-bold text-emerald-600">
              {maintenanceData.reduce(
                (sum, item) =>
                  sum +
                  item.subItems.filter((s) => s.inspectionStatus === "passed")
                    .length,
                0
              )}
            </p>
            <p className="text-sm text-slate-600">ผ่านการตรวจ</p>
          </div>
          <div className="p-4 bg-red-50 rounded-xl">
            <p className="text-2xl font-bold text-red-600">
              {maintenanceData.reduce(
                (sum, item) =>
                  sum +
                  item.subItems.filter((s) => s.inspectionStatus === "failed")
                    .length,
                0
              )}
            </p>
            <p className="text-sm text-slate-600">ไม่ผ่าน</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl">
            <p className="text-2xl font-bold text-amber-600">
              {maintenanceData.reduce(
                (sum, item) => sum + getTotalImages(item),
                0
              )}
            </p>
            <p className="text-sm text-slate-600">รูปภาพ</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
