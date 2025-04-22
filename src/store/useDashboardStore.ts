import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { arrayMove } from "@dnd-kit/sortable";

// Interfaces for Widget and Category
export interface Widget {
  id: string;
  title: string;
  description: string;
  pinned: boolean;
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

// DashboardState interface with selectedCategory and setSelectedCategory
export interface DashboardState {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (id: string) => void;
  addWidget: (categoryId: string, widget: Omit<Widget, "id">) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  setCategories: (categories: Category[]) => void;
  reorderWidgets: (categoryId: string, fromId: string, toId: string) => void;
  togglePinWidget: (categoryId: string, widgetId: string) => void;
  addCategory: (name: string) => void;
}

// Zustand store
export const useDashboardStore = create<DashboardState>((set) => ({
  categories: [],
  selectedCategory: null,

  setSelectedCategory: (id: string) => set({ selectedCategory: id }),

  addWidget: (categoryId, widget) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: [...cat.widgets, { ...widget, id: uuidv4() }] }
          : cat
      ),
    })),

  removeWidget: (categoryId, widgetId) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter((w) => w.id !== widgetId) }
          : cat
      ),
    })),

  setCategories: (categories) => set({ categories }),

  reorderWidgets: (categoryId, fromId, toId) =>
    set((state) => {
      const category = state.categories.find((c) => c.id === categoryId);
      if (!category) return state;

      const oldIndex = category.widgets.findIndex((w) => w.id === fromId);
      const newIndex = category.widgets.findIndex((w) => w.id === toId);
      const reordered = arrayMove(category.widgets, oldIndex, newIndex);

      return {
        categories: state.categories.map((cat) =>
          cat.id === categoryId ? { ...cat, widgets: reordered } : cat
        ),
      };
    }),

  togglePinWidget: (categoryId, widgetId) =>
    set((state) => {
      const categories = state.categories.map((cat) => {
        if (cat.id !== categoryId) return cat;

        const widgets = cat.widgets.map((w) =>
          w.id === widgetId ? { ...w, pinned: !w.pinned } : w
        );

        return { ...cat, widgets };
      });

      return { categories };
    }),

  addCategory: (name) =>
    set((state) => ({
      categories: [
        ...state.categories,
        {
          id: uuidv4(),
          name,
          widgets: [],
        },
      ],
    })),
}));
