type WidgetType = 'chart' | 'image' | 'text' | 'other'; // Adjust based on widget types you plan to use

export interface Widget {
  id: string;
  title: string;
  description: string;
  pinned: boolean;
  checked: boolean;
  icon?: string; // Optional icon for the widget (URL or class name)
  type?: WidgetType; // Type of the widget (e.g., 'chart', 'image', 'text', 'other')
  categoryId: string; // ✅ Needed for drag/drop within categories
  createdAt?: string; // Optional createdAt property
  updatedAt?: string; // Optional updatedAt property
}

export interface Category {
  id: string;
  name: string;
  description?: string; // Optional description for the category
  color?: string; // Optional color code
  order?: number; // Optional order for sorting categories
  widgets: Widget[];
}
