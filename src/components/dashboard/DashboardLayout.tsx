import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Button from "../common/Button";
import { downloadJSON } from "../../utils/exportJSON";
import { useDashboardStore } from "../../store/useDashboardStore";
import AddWidgetModal from "../dashboard/AddWidgetModal";
import AddCategory from "./AddCategory";
import WidgetCard from "./WidgetCard";

const SortableWidget = ({ widget, onRemove, onPinToggle }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <WidgetCard widget={widget} onRemove={onRemove} onPinToggle={onPinToggle} />
    </div>
  );
};

const DashboardLayout = () => {
  const { categories, removeWidget, reorderWidgets, togglePinWidget } = useDashboardStore();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any, categoryId: string) => {
    const { active, over } = event;

    // Ensure `over` is not null and check if the active item has moved
    if (active.id !== over?.id) {
      reorderWidgets(categoryId, active.id, over.id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dynamic Dashboard</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => downloadJSON(categories)}>
            📤 Export JSON
          </Button>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <AddWidgetModal categoryId={category.id} />
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={(e) => handleDragEnd(e, category.id)}
          >
            <SortableContext
              items={category.widgets.map((w) => w.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.widgets
                  .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) // Pinned widgets first
                  .map((widget) => (
                    <SortableWidget
                      key={widget.id}
                      widget={widget}
                      onRemove={() => removeWidget(category.id, widget.id)}
                      onPinToggle={() => togglePinWidget(category.id, widget.id)}
                    />
                  ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      ))}

      <AddCategory />
    </div>
  );
};

export default DashboardLayout;
