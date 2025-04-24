import React, { useState } from "react";
import { useDashboardStore } from "./store/useDashboardStore";
import WidgetCard from "./components/dashboard/WidgetCard";
import AddWidgetModal from "./components/dashboard/AddWidgetModal";
import SearchBar from "./components/dashboard/SearchBar";
import { downloadJSON } from "./utils/exportJSON"; // Assuming the downloadJSON function is in utils

function App() {
  const { categories, search, removeWidget, togglePinWidget, toggleCheckWidget } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState(search);

  // Filter widgets based on search query
  const filteredWidgets = (categoryId: string) => {
    const widgets = categories.find((cat) => cat.id === categoryId)?.widgets || [];
    return widgets.filter(
      (widget) =>
        widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        widget.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleExport = () => {
    const data = { categories };  // Exporting the categories and widgets
    downloadJSON(data);
  };

  return (
    <div className="App">
      <div className="flex justify-between items-center p-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button onClick={handleExport} className="bg-blue-500 text-white p-2 rounded">
          Export Data
        </button>
      </div>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Pinned Widgets Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Pinned Widgets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.flatMap((category) =>
            category.widgets.filter((widget) => widget.pinned).map((widget) => (
              <WidgetCard
                key={widget.id}
                widget={widget}
                onRemove={() => removeWidget(category.id, widget.id)}
                onPinToggle={() => togglePinWidget(category.id, widget.id)}
                onCheckToggle={() => toggleCheckWidget(category.id, widget.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Categories */}
      {categories.map((category) => (
        <div key={category.id} className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <AddWidgetModal categoryId={category.id} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWidgets(category.id).map((widget) => (
              <WidgetCard
                key={widget.id}
                widget={widget}
                onRemove={() => removeWidget(category.id, widget.id)}
                onPinToggle={() => togglePinWidget(category.id, widget.id)}
                onCheckToggle={() => toggleCheckWidget(category.id, widget.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
