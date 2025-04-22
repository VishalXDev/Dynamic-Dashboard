import React, { useState } from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import Button from "../common/Button";
import Input from "../common/Input";

const AddCategory: React.FC = () => {
  const [name, setName] = useState<string>("");
  const addCategory = useDashboardStore((state) => state.addCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addCategory(name.trim());
      setName("");  // Reset the name field after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4 mt-4">
      <Input
        placeholder="New Category Name"
        aria-label="New Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-64"
      />
      <Button type="submit" disabled={!name.trim()}>
        Add Category
      </Button>
    </form>
  );
};

export default AddCategory;
