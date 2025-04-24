import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { arrayMove } from "@dnd-kit/sortable";

// Interfaces for Widget and Category
export interface Widget {
  id: string;
  title: string;
  description: string;
  pinned: boolean;
  checked: boolean;
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardState {
  categories: Category[];
  selectedCategory: string | null;
  search: string;
  setSearch: (term: string) => void;
  setSelectedCategory: (id: string) => void;
  addWidget: (categoryId: string, widget: Omit<Widget, "id">) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  setCategories: (categories: Category[]) => void;
  reorderWidgets: (categoryId: string, fromId: string, toId: string) => void;
  togglePinWidget: (categoryId: string, widgetId: string) => void;
  toggleCheckWidget: (categoryId: string, widgetId: string) => void;
  addCategory: (name: string) => void;
}

// Utility functions for localStorage
const setLocalStorage = (key: string, data: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error storing data in localStorage", error);
  }
};

const getLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading data from localStorage", error);
    return [];
  }
};

// Load categories from localStorage
const loadCategories = () => getLocalStorage("dashboardCategories");

export const useDashboardStore = create<DashboardState>((set) => ({
  categories: loadCategories(),
  selectedCategory: null,
  search: "",

  // Set the search term (debounced)
  setSearch: (term: string) => {
    const debounceTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
      set({ search: term });
    }, 300);
    clearTimeout(debounceTimer); // Make sure this clears the previous timer
  },

  // Set selected category
  setSelectedCategory: (id: string) => set({ selectedCategory: id }),

  // Add a widget to a category
  addWidget: (categoryId, widget) =>
    set((state) => {
      const updatedCategories = state.categories.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              widgets: [
                ...cat.widgets,
                {
                  ...widget,
                  id: uuidv4(),
                  pinned: false,
                  checked: false,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
              ],
            }
          : cat
      );
      setLocalStorage("dashboardCategories", updatedCategories);
      return { categories: updatedCategories };
    }),

  // Remove a widget from a category
  removeWidget: (categoryId, widgetId) =>
    set((state) => {
      const updatedCategories = state.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter((w) => w.id !== widgetId) }
          : cat
      );
      setLocalStorage("dashboardCategories", updatedCategories);
      return { categories: updatedCategories };
    }),

  // Set the categories
  setCategories: (categories) => {
    setLocalStorage("dashboardCategories", categories);
    set({ categories });
  },

  // Reorder widgets within a category
  reorderWidgets: (categoryId, fromId, toId) =>
    set((state) => {
      const category = state.categories.find((c) => c.id === categoryId);
      if (!category) return state;

      const oldIndex = category.widgets.findIndex((w) => w.id === fromId);
      const newIndex = category.widgets.findIndex((w) => w.id === toId);
      const reordered = arrayMove(category.widgets, oldIndex, newIndex);

      const updatedCategories = state.categories.map((cat) =>
        cat.id === categoryId ? { ...cat, widgets: reordered } : cat
      );

      setLocalStorage("dashboardCategories", updatedCategories);
      return { categories: updatedCategories };
    }),

  // Toggle pin for a widget
  togglePinWidget: (categoryId, widgetId) =>
    set((state) => {
      const updatedCategories = state.categories.map((cat) => {
        if (cat.id !== categoryId) return cat;

        const widgets = cat.widgets.map((w) =>
          w.id === widgetId ? { ...w, pinned: !w.pinned } : w
        );

        return { ...cat, widgets };
      });

      setLocalStorage("dashboardCategories", updatedCategories);
      return { categories: updatedCategories };
    }),

  // Toggle check/uncheck for a widget
  toggleCheckWidget: (categoryId, widgetId) =>
    set((state) => {
      const updatedCategories = state.categories.map((cat) => {
        if (cat.id !== categoryId) return cat;

        const widgets = cat.widgets.map((w) =>
          w.id === widgetId ? { ...w, checked: !w.checked } : w
        );

        return { ...cat, widgets };
      });

      setLocalStorage("dashboardCategories", updatedCategories);
      return { categories: updatedCategories };
    }),

  // Add a new category
  addCategory: (name) =>
    set((state) => {
      const newCategory = { id: uuidv4(), name, widgets: [] };
      const updatedCategories = [...state.categories, newCategory];
      setLocalStorage("dashboardCategories", updatedCategories);
      return { categories: updatedCategories };
    }),
}));
