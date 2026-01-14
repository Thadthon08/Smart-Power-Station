import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MaintenanceStatus = "รอดำเนินการ" | "กำลังดำเนินการ" | "เสร็จสิ้น";
export type MaintenanceType =
  | "Preventive"
  | "Corrective"
  | "Predictive"
  | "Emergency";

export interface MaintenanceSchedule {
  id: string;
  equipment: string;
  type: MaintenanceType;
  description: string;
  scheduledDate: string;
  assignedTo: string;
  status: MaintenanceStatus;
  createdAt: Date;
  completedAt?: Date;
}

interface MaintenanceStore {
  schedules: MaintenanceSchedule[];
  addSchedule: (
    equipment: string,
    type: MaintenanceType,
    description: string,
    scheduledDate: string,
    assignedTo: string
  ) => void;
  updateSchedule: (id: string, updates: Partial<MaintenanceSchedule>) => void;
  deleteSchedule: (id: string) => void;
  toggleStatus: (id: string) => void;
  getScheduleStats: () => {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
  };
}

export const useMaintenanceStore = create<MaintenanceStore>()(
  persist(
    (set, get) => ({
      schedules: [
        {
          id: "1",
          equipment: "Gas Turbine Unit 1",
          type: "Preventive",
          description: "ตรวจเช็คระบบหล่อลื่นและเปลี่ยนน้ำมัน",
          scheduledDate: "2026-01-20",
          assignedTo: "ทีมช่าง A",
          status: "รอดำเนินการ",
          createdAt: new Date(),
        },
        {
          id: "2",
          equipment: "Generator Unit 2",
          type: "Predictive",
          description: "Vibration Analysis และตรวจสอบ Bearing",
          scheduledDate: "2026-01-18",
          assignedTo: "ทีมช่าง B",
          status: "กำลังดำเนินการ",
          createdAt: new Date(),
        },
        {
          id: "3",
          equipment: "Cooling Tower",
          type: "Preventive",
          description: "ทำความสะอาดและตรวจสอบระบบน้ำหล่อเย็น",
          scheduledDate: "2026-01-15",
          assignedTo: "ทีมช่าง C",
          status: "เสร็จสิ้น",
          createdAt: new Date(),
          completedAt: new Date(),
        },
      ],

      addSchedule: (
        equipment,
        type,
        description,
        scheduledDate,
        assignedTo
      ) => {
        const newSchedule: MaintenanceSchedule = {
          id: crypto.randomUUID(),
          equipment,
          type,
          description,
          scheduledDate,
          assignedTo,
          status: "รอดำเนินการ",
          createdAt: new Date(),
        };
        set((state) => ({ schedules: [...state.schedules, newSchedule] }));
      },

      updateSchedule: (id, updates) => {
        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === id ? { ...schedule, ...updates } : schedule
          ),
        }));
      },

      deleteSchedule: (id) => {
        set((state) => ({
          schedules: state.schedules.filter((schedule) => schedule.id !== id),
        }));
      },

      toggleStatus: (id) => {
        set((state) => ({
          schedules: state.schedules.map((schedule) => {
            if (schedule.id === id) {
              let newStatus: MaintenanceStatus;
              if (schedule.status === "รอดำเนินการ") {
                newStatus = "กำลังดำเนินการ";
              } else if (schedule.status === "กำลังดำเนินการ") {
                newStatus = "เสร็จสิ้น";
              } else {
                newStatus = "รอดำเนินการ";
              }

              return {
                ...schedule,
                status: newStatus,
                completedAt: newStatus === "เสร็จสิ้น" ? new Date() : undefined,
              };
            }
            return schedule;
          }),
        }));
      },

      getScheduleStats: () => {
        const schedules = get().schedules;
        return {
          total: schedules.length,
          pending: schedules.filter((s) => s.status === "รอดำเนินการ").length,
          inProgress: schedules.filter((s) => s.status === "กำลังดำเนินการ")
            .length,
          completed: schedules.filter((s) => s.status === "เสร็จสิ้น").length,
        };
      },
    }),
    {
      name: "maintenance-storage",
    }
  )
);
