import { create } from "zustand";

// Define the types for your store state
interface ExcelStoreState {
  data: Record<string, any[]>; // Data indexed by file name, where value is an array of parsed data
  keys: string[]; // Storing keys for each file
  filter_key: string;
  filter: string;
  selectedCols: string[];
  mainExcel: string;
  setData: (fileName: string, data: any[]) => void;
  setKeys: (fileName: string, keys: string[]) => void;
  setFilterKey: (filter_key: string) => void;
  setFilter: (filter: string) => void;
  setMainExcel: (mainExcel: string) => void;
  setSelectedCols: (selectedCols: string) => void;
  clearData: () => void;
}

// Create the store with TypeScript typings
export const useExcelStore = create<ExcelStoreState>((set) => ({
  data: {},
  keys: [],
  filter_key: "RFC emisor",
  filter: "",
  selectedCols: [],
  mainExcel: "",
  setData: (fileName, data) =>
    set((state) => ({
      data: { ...state.data, [fileName]: data },
    })),
  setKeys: (keys: any) => set({ keys }),
  setFilterKey: (filter_key: string) => set({ filter_key }),
  setFilter: (filter: string) => set({ filter }),
  setSelectedCols: (selectedCols: any) => set({ selectedCols }),
  setMainExcel: (mainExcel: any) => set({ mainExcel }),
  clearData: () => set({ data: {} }),
}));
