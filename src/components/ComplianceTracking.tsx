import { Camera, CheckCircle2, Upload, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface MaintenanceSubItem {
  id: string;
  description: string;
  checked: boolean;
}

interface MaintenanceItem {
  id: string;
  title: string;
  subItems: MaintenanceSubItem[];
  images: string[];
}

const initialMaintenanceData: MaintenanceItem[] = [
  {
    id: "1",
    title: "งานถอดตรวจเช็คเบื้องต้น Tubine 20 mw. No.1,2,10 mw.",
    subItems: [
      { id: "1-1", description: "ถอด Cover and Insulation for Turbine", checked: false },
      { id: "1-2", description: "ถอด Inlet Steam Piping and Steam Expansion Joint", checked: false },
      { id: "1-3", description: "ถอด Connecting Rod and Upper Casing", checked: false },
      { id: "1-4", description: "ถอด Cover Housing Bearing Front and Rear Side", checked: false },
      { id: "1-5", description: "ถอด Coupling Turbine vs Reduction Gear", checked: false },
      { id: "1-6", description: "ถอด Cover and Bearing and Thrust Bearing", checked: false },
      { id: "1-7", description: "ยก Rotor ออกจาก Casing", checked: false },
      { id: "1-8", description: "ถอด Labyrinth Packing", checked: false },
      { id: "1-9", description: "ยก Nozzle Diaphragm for Lower Casing", checked: false },
      { id: "1-10", description: "ถอด Governor Valve พร้อมยกออก", checked: false },
      { id: "1-11", description: "หงาย Upper Casing พร้อม ถอด Labyrinth Packing", checked: false },
      { id: "1-12", description: "ถอด Nozzle Diaphragm for Upper Casing", checked: false },
    ],
    images: [],
  },
  {
    id: "2",
    title: "ตรวจเช็คและ ซ่อแซม Overhead Crane (เครนอาคาร)",
    subItems: [
      { id: "2-1", description: "เช็คระบบยกน้ำหนัก", checked: false },
      { id: "2-2", description: "เช็คระบบขับเคลื่อน", checked: false },
      { id: "2-3", description: "เช็คระบบเบรก", checked: false },
      { id: "2-4", description: "เช็ระบบหล่อลื่นและรบบควบคุมทั้งหมด", checked: false },
    ],
    images: [],
  },
  {
    id: "3",
    title: "ตรวจเช็คและซ่อมแซม Reduction Gear 10 mw.",
    subItems: [
      { id: "3-1", description: "เช็ค Clearance Bearing and Thrust Bearing", checked: false },
      { id: "3-2", description: "เช็ค Backlash", checked: false },
      { id: "3-3", description: "ตรวจเช็ครอยร้าว Pinion and Wheel Gear", checked: false },
      { id: "3-4", description: "ทำความสะอาดพร้อมประกอบ", checked: false },
    ],
    images: [],
  },
  {
    id: "4",
    title: "ตรวจเช็คและซ่อมแซม Generator 10 mw.",
    subItems: [
      { id: "4-1", description: "ทำความสะอาด Water Tube for Air Cooler", checked: false },
      { id: "4-2", description: "ทำคาวมสะอาดและตรวจเช็ค Bearing", checked: false },
      { id: "4-3", description: "ทำความสะอาดและตรวจเช็ค Rotor and Stator", checked: false },
      { id: "4-4", description: "ทำความสะอาดและตรวจเช็ค Exciter and p.m.g", checked: false },
      { id: "4-5", description: "ตรวจเช็คและทำความสะอาด ct Box", checked: false },
    ],
    images: [],
  },
  {
    id: "5",
    title: "ตรวจเช็คและซ่อมแซม Reduction Gear 20 mw. No.1",
    subItems: [
      { id: "5-1", description: "ถอดทำความสะอาดและเช็ค Clearance Bearing", checked: false },
      { id: "5-2", description: "Check Backlash for Pinion Gear and Wheel Gear", checked: false },
      { id: "5-3", description: "ทำความสะอาดและตรวจเช็ครอยร้าว Pinion and Wheel Gear", checked: false },
      { id: "5-4", description: "ทำความสะอาดพร้อมประกอบ", checked: false },
    ],
    images: [],
  },
  {
    id: "6",
    title: "ถอดตรวจเช็คและซ่อมแซม Main Oil Pump 20 mw. No.1,2",
    subItems: [
      { id: "6-1", description: "เช็ค Bearing", checked: false },
      { id: "6-2", description: "เช็ค Backlash", checked: false },
      { id: "6-3", description: "เช็ค Oil Seal and O-ring", checked: false },
    ],
    images: [],
  },
  {
    id: "7",
    title: "ถอดตรวจเช็คและซ่อมแซม Generator 20 mw. No.1",
    subItems: [
      { id: "7-1", description: "ถอดทำความสะอาด Water Tube For Air Cooler", checked: false },
      { id: "7-2", description: "ถอดตรวจเช็คและทำความสะอาด Bearing", checked: false },
      { id: "7-3", description: "ถอดตรวจเช็คสะอาด Stator and Rotor (ตรวจเช็คพบว่ามีการชำรุดของลิ่ม Stator ก็ชัก Rotor ออก)", checked: false },
      { id: "7-4", description: "ถอดตรวจเช็คและทำความสะอาดชุด Exciter", checked: false },
      { id: "7-5", description: "ถอดตรวจเช็คและทำความสะอาด Ct Box", checked: false },
    ],
    images: [],
  },
  {
    id: "8",
    title: "ตรวจเช็คซ่อมแซม Reduction Gear 20 mw. No.2",
    subItems: [
      { id: "8-1", description: "ถอดทำความสะอาดและเช็ค Clearance Bearing", checked: false },
      { id: "8-2", description: "เช็ค Backlash Pinion and Wheel Gear", checked: false },
      { id: "8-3", description: "ทำความสะอาดและเช็ครอยร้าว Pinion and Wheel Gear", checked: false },
      { id: "8-4", description: "ทำความสะอาดพร้อมประกอบ", checked: false },
    ],
    images: [],
  },
  {
    id: "9",
    title: "ถอดตรวจเช็คและซ่อมแซม Generator 20 mw. No.2",
    subItems: [
      { id: "9-1", description: "ถอดทำความสะอาด Water Tube for Air Cooler", checked: false },
      { id: "9-2", description: "ถอดตรวจเช็คและทำความสะอาด Bearing", checked: false },
      { id: "9-3", description: "ถอดตรวจเช็คและทำความสะอาด Rotor and Stator (ตรวจเช็คพบว่าลิ่ม Stator ชำรุดก็ต้องชัก Rotorออก)", checked: false },
      { id: "9-4", description: "ถอดตรวจเช็คและทำความสะอาดชุด Exciter", checked: false },
      { id: "9-5", description: "ถอดตรวจเช็คและทำความสะอาดชุด Ct Box", checked: false },
    ],
    images: [],
  },
  {
    id: "10",
    title: "ตรวจเช็คและซ่อมแซม Turbine 10 mw.",
    subItems: [
      { id: "10-1", description: "ทำความสะอาด Upper and Lower Casing", checked: false },
      { id: "10-2", description: "ทำความสะอาดและเช็ครอยร้าว Nozzle and Rotor", checked: false },
      { id: "10-3", description: "ทำความสะอาดและเช็ค Bearing and Thrust Bearing", checked: false },
      { id: "10-4", description: "ทำความสะอาดและเช็คชุด Emergency Stop Valve", checked: false },
      { id: "10-5", description: "ทำความสะอาดและเช็คชุด Governor Valve", checked: false },
      { id: "10-6", description: "ทำความสะอาดและเช็ค ชุด Pilot Valve", checked: false },
      { id: "10-7", description: "ประกอบ Nozzle ,Bearing ,Rotor,Governor Valve,Upper Casing,Emergency Stop valve ,Oilpiping and Steam Piping", checked: false },
      { id: "10-8", description: "เช็ค Clearance and Alignment", checked: false },
      { id: "10-9", description: "หุ้มฉนวน และ ประกอบ Cover", checked: false },
    ],
    images: [],
  },
  {
    id: "11",
    title: "ตรวจเช็คและซ่อมแซม Turbine 20 mw. No.1",
    subItems: [
      { id: "11-1", description: "ทำความสะอาด Lower and Upper Casing", checked: false },
      { id: "11-2", description: "ทำความสะอาดและเช็ครอยร้าว Nozzle and Rotor", checked: false },
      { id: "11-3", description: "ทำความสะอาดและเช็ค Bearing and Thrust Bearing", checked: false },
      { id: "11-4", description: "ถอดทำความสะอาดและเช็คชุด Governor Valve", checked: false },
      { id: "11-5", description: "ถอดทำความสะอาดและเช็คชุด Emergency Stop Valve", checked: false },
      { id: "11-6", description: "ถอดทำความสะอาและเช็คชุด Pilot Valve", checked: false },
      { id: "11-7", description: "ประกอบ Nozzle,Rotor,Bearing ,Thrust Bearing,Governor Valve,Upper Casing,Emergency Stop Valve", checked: false },
      { id: "11-8", description: "เช็ค Clearance and Alignment", checked: false },
      { id: "11-9", description: "หุ้มฉนวนและประกอบ Cover", checked: false },
    ],
    images: [],
  },
  {
    id: "12",
    title: "ตรวจเช็คและซ่อมแซม Turbine 20 mw. No.2",
    subItems: [
      { id: "12-1", description: "ทำความสะอาด Lower and Upper Casing", checked: false },
      { id: "12-2", description: "ทำความสะอาดและเช็ครอยร้าว Nozzle and Rotor", checked: false },
      { id: "12-3", description: "ทำความสะอาดและเช็ค Bearing and Thrust Bearing", checked: false },
      { id: "12-4", description: "ถอดทำความสะอาดและเช็คชุด Emergency Stop Valve", checked: false },
      { id: "12-5", description: "ถอดทำความสะอาดและเช็คชุด Governor Valve", checked: false },
      { id: "12-6", description: "ถอดทำความสะอาดและเช็คชุด Pilot Valve", checked: false },
      { id: "12-7", description: "ประกอบ Nozzle,Rotor,Bearing ,Thrust Bearing,Governor Valve,Upper Casing,Emergency Stop Valve", checked: false },
      { id: "12-8", description: "เช็ค Alignment and Clearance", checked: false },
      { id: "12-9", description: "หุ้มฉนวน", checked: false },
    ],
    images: [],
  },
  {
    id: "13",
    title: "ตรวจเช็คและซ่อมแซม Main Oil Pump 10 mw.",
    subItems: [
      { id: "13-1", description: "เช็ค Bearing", checked: false },
      { id: "13-2", description: "เช็ค Backlash", checked: false },
      { id: "13-3", description: "เช็ค O-ring and Oilseal", checked: false },
    ],
    images: [],
  },
  {
    id: "14",
    title: "ซ่อมแซมระบบน้ำมันหล่อลื่นและน้ำมันควบคุม Turbine 10 mw. , 20 mw. No.1,2",
    subItems: [
      { id: "14-1", description: "ถอดซ่อมแซม Aux. Lube Oil Pump,Motor Drive", checked: false },
      { id: "14-2", description: "ถอดซ่อมแซม Main and Aux Governor Oil Pump, Motor Drive", checked: false },
      { id: "14-3", description: "ถอดซ่อมแซม Exhaust Fan ,Motor Drive", checked: false },
      { id: "14-4", description: "ทำความสะอาด Water Tube for Oil Cooler", checked: false },
      { id: "14-5", description: "ทำความสะอาด Oil Tank และเปลี่ยนถ่ายน้ำมัน 20 mw. No.1", checked: false },
    ],
    images: [],
  },
];

export default function ComplianceTracking() {
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceItem[]>(initialMaintenanceData);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const calculateProgress = (item: MaintenanceItem) => {
    const checkedCount = item.subItems.filter((sub) => sub.checked).length;
    return Math.round((checkedCount / item.subItems.length) * 100);
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

  const toggleSubItem = (itemId: string, subItemId: string) => {
    setMaintenanceData(
      maintenanceData.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            subItems: item.subItems.map((sub) =>
              sub.id === subItemId ? { ...sub, checked: !sub.checked } : sub
            ),
          };
        }
        return item;
      })
    );
  };

  const handleImageUpload = (itemId: string, event: React.ChangeEvent<HTMLInputElement>) => {
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
                  return { ...item, images: [...item.images, ...newImages] };
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

  const removeImage = (itemId: string, imageIndex: number) => {
    setMaintenanceData(
      maintenanceData.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            images: item.images.filter((_, idx) => idx !== imageIndex),
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
        <p className="text-slate-600 text-lg">
          ติดตามความคืบหน้าและแนบหลักฐาน
        </p>
      </div>

      <div className="space-y-4 max-w-6xl mx-auto">
        {maintenanceData.map((item, index) => {
          const progress = calculateProgress(item);
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
                          ความคืบหน้า: {item.subItems.filter(s => s.checked).length}/{item.subItems.length} รายการ
                        </span>
                        <span className={`font-bold ${progress === 100 ? 'text-green-600' : 'text-blue-600'}`}>
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
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                              : 'bg-gradient-to-r from-blue-500 to-sky-600'
                          }`}
                        />
                      </div>
                    </div>

                    {item.images.length > 0 && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                        <Camera size={16} />
                        <span>{item.images.length} รูปภาพหลักฐาน</span>
                      </div>
                    )}
                  </div>

                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </motion.div>
                  </button>
                </div>
              </div>

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
                    <div className="space-y-2">
                      {item.subItems.map((subItem) => (
                        <div
                          key={subItem.id}
                          className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSubItem(item.id, subItem.id);
                            }}
                            className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                              subItem.checked
                                ? "bg-green-500 border-green-500"
                                : "border-slate-300 hover:border-blue-400"
                            }`}
                          >
                            {subItem.checked && (
                              <CheckCircle2 size={14} className="text-white" />
                            )}
                          </button>
                          <p
                            className={`text-sm flex-1 ${
                              subItem.checked
                                ? "text-slate-400 line-through"
                                : "text-slate-900"
                            }`}
                          >
                            {subItem.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-white/20 border-t border-slate-200">
                    <h5 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Camera size={18} className="text-green-600" />
                      รูปภาพหลักฐาน
                    </h5>

                    <div className="mb-4">
                      <label
                        htmlFor={`upload-${item.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl cursor-pointer hover:shadow-lg transition-all"
                      >
                        <Upload size={18} />
                        อัพโหลดรูปภาพ
                      </label>
                      <input
                        id={`upload-${item.id}`}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleImageUpload(item.id, e)}
                      />
                    </div>

                    {item.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {item.images.map((image, imgIdx) => (
                          <motion.div
                            key={imgIdx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group"
                          >
                            <img
                              src={image}
                              alt={`Evidence ${imgIdx + 1}`}
                              className="w-full h-32 object-cover rounded-xl border-2 border-slate-200"
                            />
                            <button
                              onClick={() => removeImage(item.id, imgIdx)}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                            >
                              <XCircle size={18} />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {item.images.length === 0 && (
                      <p className="text-sm text-slate-500 italic">
                        ยังไม่มีรูปภาพหลักฐาน
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">
              {maintenanceData.length}
            </p>
            <p className="text-sm text-slate-600">รายการทั้งหมด</p>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="text-2xl font-bold text-green-600">
              {maintenanceData.filter((item) => calculateProgress(item) === 100).length}
            </p>
            <p className="text-sm text-slate-600">เสร็จสมบูรณ์</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl">
            <p className="text-2xl font-bold text-amber-600">
              {maintenanceData.reduce((sum, item) => sum + item.images.length, 0)}
            </p>
            <p className="text-sm text-slate-600">รูปภาพหลักฐาน</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
