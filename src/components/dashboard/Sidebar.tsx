import React from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import classNames from "classnames";

const Sidebar: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory } = useDashboardStore();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full p-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => setSelectedCategory(category.id)}
              className={classNames(
                "w-full text-left px-3 py-2 rounded-lg transition",
                selectedCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              )}
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
