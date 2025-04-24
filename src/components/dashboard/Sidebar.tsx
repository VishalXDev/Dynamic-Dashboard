import React from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import classNames from "classnames";

const Sidebar: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useDashboardStore();

  const handleKeyDown = (e: React.KeyboardEvent, categoryId: string) => {
    if (e.key === "ArrowDown") {
      // Handle navigation down
      const currentIndex = categories.findIndex((cat) => cat.id === categoryId);
      const nextIndex = (currentIndex + 1) % categories.length;
      setSelectedCategory(categories[nextIndex].id);
    }
    if (e.key === "ArrowUp") {
      // Handle navigation up
      const currentIndex = categories.findIndex((cat) => cat.id === categoryId);
      const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
      setSelectedCategory(categories[prevIndex].id);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => setSelectedCategory(category.id)}
              onKeyDown={(e) => handleKeyDown(e, category.id)} // Add keyboard navigation
              className={classNames(
                "w-full text-left px-3 py-2 rounded-lg transition",
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              )}
              aria-selected={selectedCategory === category.id} // Add ARIA attribute
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
