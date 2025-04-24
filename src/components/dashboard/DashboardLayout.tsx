import { useMemo } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Button from "../common/Button";
import { downloadJSON } from "../../utils/exportJSON"; // Corrected import
import { useDashboardStore } from "../../store/useDashboardStore";
import AddWidgetModal from "./AddWidgetModal";
import AddCategory from "./AddCategory";
import WidgetCard from "./WidgetCard";
import SearchBar from "./SearchBar";
import { Widget as WidgetType } from "../../types/dashboard"; 

interface SortableWidgetProps {
  widget: WidgetType & { categoryId: string };
  onRemove: () => void;
  onPinToggle: () => void;
  onCheckToggle: () => void;
}

const SortableWidget = ({
  widget,
  onRemove,
  onPinToggle,
  onCheckToggle,
}: SortableWidgetProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <WidgetCard
        widget={widget}
        onRemove={onRemove}
        onPinToggle={onPinToggle}
        onCheckToggle={onCheckToggle}
      />
    </div>
  );
};

const DashboardLayout = () => {
  const { categories, removeWidget, reorderWidgets, togglePinWidget, toggleCheckWidget, search } = useDashboardStore();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent, categoryId: string) => {
    const { active, over } = event;
    if (
      over &&
      active.id !== over.id &&
      active.data.current?.categoryId === over.data.current?.categoryId
    ) {
      reorderWidgets(categoryId, active.id as string, over.id as string);
    }
  };

  const filteredCategories = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      widgets: category.widgets
        .filter(
          (widget) =>
            widget.title.toLowerCase().includes(search.toLowerCase()) ||
            widget.description.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)),
    }));
  }, [categories, search]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dynamic Dashboard</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => downloadJSON({ categories })}>
            📤 Export JSON
          </Button>
        </div>
      </div>

      <SearchBar searchQuery={search} setSearchQuery={(query) => useDashboardStore.setState({ search: query })} />

      {filteredCategories.map((category) => (
        <div key={category.id} className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <AddWidgetModal categoryId={category.id} />
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => handleDragEnd(e, category.id)}>
            <SortableContext items={category.widgets.map((w) => w.id)} strategy={verticalListSortingStrategy}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.widgets.map((widget) => (
                  <SortableWidget
                    key={widget.id}
                    widget={{
                      ...widget,
                      categoryId: category.id,
                      createdAt: widget.createdAt || "", // Fallback to empty string if not available
                      updatedAt: widget.updatedAt || "", // Fallback to empty string if not available
                    }}
                    onRemove={() => removeWidget(category.id, widget.id)}
                    onPinToggle={() => togglePinWidget(category.id, widget.id)}
                    onCheckToggle={() => toggleCheckWidget(category.id, widget.id)}
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
