import React, { useState, useEffect } from "react";
import { useDashboardStore } from "../store/useDashboardStore";
import SearchBar from "../components/dashboard/SearchBar";
import WidgetCard from "../components/dashboard/WidgetCard";
import AddWidgetModal from "../components/dashboard/AddWidgetModal";
import { Widget } from "../types/dashboard";  // Ensure this import

const Dashboard = () => {
  const {
    categories,
    removeWidget,
    toggleCheckWidget,
    togglePinWidget,
    search,
    setSearch,
  } = useDashboardStore();
  
  const [searchQuery, setSearchQuery] = useState(search);

  // Update the store's search state when the query changes
  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery, setSearch]);


  const pinnedWidgets: (Widget & { categoryId: string; createdAt: string; updatedAt: string })[] = categories.flatMap((cat) =>
        cat.widgets.filter((widget) => widget.pinned).map((widget) => ({
          ...widget,
          categoryId: cat.id,
          createdAt: widget.createdAt || "",
          updatedAt: widget.updatedAt || "",
        }))
      );

  // Remove pinned widgets from category widgets
  const getCategoryWidgets = (categoryId: string) => {
    const widgets = categories.find((cat) => cat.id === categoryId)?.widgets || [];
    return widgets.filter((widget) => !widget.pinned);
  };

  return (
    <div className="p-6">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Pinned Widgets Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Pinned Widgets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pinnedWidgets.map((widget: Widget) => (
            <WidgetCard
              key={widget.id}
              widget={widget}
              onRemove={() => removeWidget(widget.categoryId, widget.id)}
              onPinToggle={() => togglePinWidget(widget.categoryId, widget.id)}
              onCheckToggle={() =>
                toggleCheckWidget(widget.categoryId, widget.id)
              }
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      {categories.map((cat) => (
        <div key={cat.id} className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">{cat.name}</h2>
            <AddWidgetModal categoryId={cat.id} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getCategoryWidgets(cat.id).map((widget: Widget) => (
              <WidgetCard
                key={widget.id}
                widget={widget}
                onRemove={() => removeWidget(cat.id, widget.id)}
                onPinToggle={() => togglePinWidget(cat.id, widget.id)}
                onCheckToggle={() => toggleCheckWidget(cat.id, widget.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
