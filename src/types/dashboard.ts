export interface Widget {
    id: string;
    title: string;
    description: string;
    pinned?: boolean; // ← new
  }
  
  export interface Category {
    id: string;
    name: string;
    widgets: Widget[];
  }
  