import React, { useState } from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import Button from "../common/Button";
import Input from "../common/Input";
import Dialog, { DialogTrigger, DialogContent } from "../common/Dialog";
import { Widget } from "../../types/dashboard";

interface AddWidgetModalProps {
  categoryId: string;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({ categoryId }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { addWidget, categories } = useDashboardStore();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleAdd = () => {
    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) {
      setError("Category not found.");
      return;
    }

    const widgetExists = category.widgets.some((widget) => widget.title === title);

    if (widgetExists) {
      setError("Widget with this title already exists.");
      return;
    }

    const newWidget: Omit<Widget, "id"> = {
      title,
      description,
      pinned: false,
      checked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      categoryId, // ✅ add this
    };

    addWidget(categoryId, newWidget);
    setTitle("");
    setDescription("");
    setError("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="text-sm px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100">
          + Add Widget
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <h2 className="text-lg font-semibold">Add New Widget</h2>
        <Input
          placeholder="Widget Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Widget Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <Button
          onClick={handleAdd}
          disabled={!title.trim() || !description.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Widget
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetModal;
