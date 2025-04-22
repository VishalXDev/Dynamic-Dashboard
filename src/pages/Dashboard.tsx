import React, { useState } from "react";
import { useDashboardStore } from "../store/useDashboardStore";
import SearchBar from "../components/dashboard/SearchBar";
import WidgetCard from "../components/dashboard/WidgetCard";
import AddWidgetModal from "../components/dashboard/AddWidgetModal";

const Dashboard = () => {
  const { categories, removeWidget } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWidgets = (categoryId: string) => {
    const widgets = categories.find(cat => cat.id === categoryId)?.widgets || [];
    return widgets.filter(widget =>
      widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="p-6">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {categories.map((cat) => (
        <div key={cat.id} className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">{cat.name}</h2>
            <AddWidgetModal categoryId={cat.id} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWidgets(cat.id).map((widget) => (
              <WidgetCard
                key={widget.id}
                widget={widget}
                onRemove={() => removeWidget(cat.id, widget.id)}
                onPinToggle={() => console.log(`Toggled pin for widget ${widget.id}`)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
