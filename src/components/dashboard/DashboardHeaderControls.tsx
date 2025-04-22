import { ChangeEvent } from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import Button from "../common/Button";
import { downloadJSON } from "../../utils/exportJSON";
import { Category } from "../../types/dashboard";

const DashboardHeaderControls = () => {
  const { categories, setCategories } = useDashboardStore();

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          setCategories(imported as Category[]);
        } else {
          alert("Invalid JSON format.");
        }
      } catch (err) {
        alert("Failed to import JSON.");
        console.error(err);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Dynamic Dashboard</h1>
      <div className="space-x-2 flex items-center">
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
          id="import-json"
        />
        <label htmlFor="import-json">
          <Button variant="outline">📥 Import JSON</Button>
        </label>
        <Button variant="outline" onClick={() => downloadJSON({ categories })}>
          📤 Export JSON
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeaderControls;
