import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Priority = "สูง" | "ปานกลาง" | "ต่ำ";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  category?: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (
    title: string,
    description: string,
    priority: Priority,
    category?: string
  ) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  getTodayTasks: () => Task[];
  getTaskStats: () => {
    total: number;
    completed: number;
    high: number;
    medium: number;
    low: number;
    completionRate: number;
  };
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: "1",
          title: "ตรวจสอบระดับน้ำมันหล่อลื่น (Lube Oil Level)",
          description: "ตรวจวัดระดับน้ำมันหล่อลื่นในถังหลัก",
          priority: "สูง",
          completed: false,
          createdAt: new Date(),
          category: "Daily Check",
        },
        {
          id: "2",
          title: "บันทึกค่า Power Output",
          description: "บันทึกค่า MW และ MVAR ทุก 2 ชม.",
          priority: "ปานกลาง",
          completed: false,
          createdAt: new Date(),
          category: "Operation",
        },
        {
          id: "3",
          title: "ตรวจสอบ Temperature ของ Generator",
          description: "ตรวจวัด Bearing Temperature",
          priority: "สูง",
          completed: false,
          createdAt: new Date(),
          category: "Safety",
        },
      ],

      addTask: (title, description, priority, category = "General") => {
        const newTask: Task = {
          id: crypto.randomUUID(),
          title,
          description,
          priority,
          completed: false,
          createdAt: new Date(),
          category,
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      toggleTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: !task.completed,
                  completedAt: !task.completed ? new Date() : undefined,
                }
              : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      getTodayTasks: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return get().tasks.filter((task) => {
          const taskDate = new Date(task.createdAt);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate.getTime() === today.getTime();
        });
      },

      getTaskStats: () => {
        const tasks = get().tasks;
        const completed = tasks.filter((t) => t.completed).length;
        const high = tasks.filter((t) => t.priority === "สูง").length;
        const medium = tasks.filter((t) => t.priority === "ปานกลาง").length;
        const low = tasks.filter((t) => t.priority === "ต่ำ").length;

        return {
          total: tasks.length,
          completed,
          high,
          medium,
          low,
          completionRate:
            tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0,
        };
      },
    }),
    {
      name: "task-storage",
    }
  )
);
