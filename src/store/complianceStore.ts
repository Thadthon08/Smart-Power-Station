import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ComplianceStatus = "รอตรวจสอบ" | "ผ่าน" | "ไม่ผ่าน" | "ต้องแก้ไข";

export interface ChecklistItem {
  id: string;
  item: string;
  checked: boolean;
  notes?: string;
}

export interface ComplianceRecord {
  id: string;
  equipmentName: string;
  documentType: string; // เช่น "Safety Inspection", "Environmental Compliance", "Quality Check"
  checklist: ChecklistItem[];
  status: ComplianceStatus;
  inspectedBy?: string;
  inspectionDate?: string;
  nextInspectionDate: string;
  createdAt: Date;
}

interface ComplianceStore {
  records: ComplianceRecord[];
  addRecord: (
    equipmentName: string,
    documentType: string,
    checklist: ChecklistItem[],
    nextInspectionDate: string
  ) => void;
  updateRecord: (id: string, updates: Partial<ComplianceRecord>) => void;
  deleteRecord: (id: string) => void;
  toggleChecklistItem: (recordId: string, itemId: string) => void;
  updateChecklistNote: (
    recordId: string,
    itemId: string,
    notes: string
  ) => void;
  completeInspection: (
    recordId: string,
    inspectedBy: string,
    status: ComplianceStatus
  ) => void;
  getComplianceStats: () => {
    total: number;
    pending: number;
    passed: number;
    failed: number;
    needsAction: number;
  };
}

export const useComplianceStore = create<ComplianceStore>()(
  persist(
    (set, get) => ({
      records: [
        {
          id: "1",
          equipmentName: "Gas Turbine Unit 1",
          documentType: "Safety Inspection",
          checklist: [
            { id: "c1", item: "ตรวจสอบระบบดับเพลิงอัตโนมัติ", checked: true },
            {
              id: "c2",
              item: "ทดสอบ Emergency Shutdown System",
              checked: true,
            },
            {
              id: "c3",
              item: "ตรวจวัดระดับเสียง (Noise Level)",
              checked: true,
            },
            { id: "c4", item: "ตรวจสอบป้ายเตือนความปลอดภัย", checked: false },
            { id: "c5", item: "ทดสอบระบบแจ้งเตือนฉุกเฉิน", checked: true },
          ],
          status: "ผ่าน",
          inspectedBy: "วิศวกร สมชาย",
          inspectionDate: "2026-01-10",
          nextInspectionDate: "2026-02-10",
          createdAt: new Date("2026-01-10"),
        },
        {
          id: "2",
          equipmentName: "Generator Unit 2",
          documentType: "Environmental Compliance",
          checklist: [
            { id: "c1", item: "ตรวจวัดค่า Emission (NOx, SOx)", checked: true },
            { id: "c2", item: "ทดสอบคุณภาพน้ำทิ้ง", checked: false },
            { id: "c3", item: "ตรวจสอบระบบกรองฝุ่น", checked: false },
            { id: "c4", item: "บันทึกข้อมูลการใช้เชื้อเพลิง", checked: true },
          ],
          status: "รอตรวจสอบ",
          nextInspectionDate: "2026-01-20",
          createdAt: new Date("2026-01-05"),
        },
        {
          id: "3",
          equipmentName: "Cooling Tower System",
          documentType: "Water Quality Standard",
          checklist: [
            { id: "c1", item: "ตรวจวัดค่า pH ของน้ำหล่อเย็น", checked: true },
            { id: "c2", item: "ทดสอบระดับ Chlorine", checked: true },
            {
              id: "c3",
              item: "ตรวจหาแบคทีเรีย Legionella",
              checked: false,
              notes: "รอผลแล็บ",
            },
            { id: "c4", item: "ตรวจสอบอุณหภูมิน้ำ", checked: true },
            {
              id: "c5",
              item: "วิเคราะห์ค่าความกระด้าง (Hardness)",
              checked: false,
            },
          ],
          status: "ต้องแก้ไข",
          inspectedBy: "นักวิทยาศาสตร์ สมหญิง",
          inspectionDate: "2026-01-12",
          nextInspectionDate: "2026-01-25",
          createdAt: new Date("2026-01-12"),
        },
      ],

      addRecord: (
        equipmentName,
        documentType,
        checklist,
        nextInspectionDate
      ) => {
        const newRecord: ComplianceRecord = {
          id: crypto.randomUUID(),
          equipmentName,
          documentType,
          checklist,
          status: "รอตรวจสอบ",
          nextInspectionDate,
          createdAt: new Date(),
        };
        set((state) => ({ records: [...state.records, newRecord] }));
      },

      updateRecord: (id, updates) => {
        set((state) => ({
          records: state.records.map((record) =>
            record.id === id ? { ...record, ...updates } : record
          ),
        }));
      },

      deleteRecord: (id) => {
        set((state) => ({
          records: state.records.filter((record) => record.id !== id),
        }));
      },

      toggleChecklistItem: (recordId, itemId) => {
        set((state) => ({
          records: state.records.map((record) => {
            if (record.id === recordId) {
              return {
                ...record,
                checklist: record.checklist.map((item) =>
                  item.id === itemId
                    ? { ...item, checked: !item.checked }
                    : item
                ),
              };
            }
            return record;
          }),
        }));
      },

      updateChecklistNote: (recordId, itemId, notes) => {
        set((state) => ({
          records: state.records.map((record) => {
            if (record.id === recordId) {
              return {
                ...record,
                checklist: record.checklist.map((item) =>
                  item.id === itemId ? { ...item, notes } : item
                ),
              };
            }
            return record;
          }),
        }));
      },

      completeInspection: (recordId, inspectedBy, status) => {
        set((state) => ({
          records: state.records.map((record) => {
            if (record.id === recordId) {
              return {
                ...record,
                status,
                inspectedBy,
                inspectionDate: new Date().toISOString().split("T")[0],
              };
            }
            return record;
          }),
        }));
      },

      getComplianceStats: () => {
        const records = get().records;
        return {
          total: records.length,
          pending: records.filter((r) => r.status === "รอตรวจสอบ").length,
          passed: records.filter((r) => r.status === "ผ่าน").length,
          failed: records.filter((r) => r.status === "ไม่ผ่าน").length,
          needsAction: records.filter((r) => r.status === "ต้องแก้ไข").length,
        };
      },
    }),
    {
      name: "compliance-storage",
    }
  )
);
