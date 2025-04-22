import React, { useState } from "react";
import { useDashboardStore } from "../../store/useDashboardStore";
import Button from "../common/Button";
import Input from "../common/Input";
import { Dialog, DialogTrigger, DialogContent } from "../common/Dialog";  // Updated import for named exports

interface AddWidgetModalProps {
  categoryId: string;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({ categoryId }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const addWidget = useDashboardStore((state) => state.addWidget);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleAdd = () => {
    if (title.trim()) {
      addWidget(categoryId, { title, description });
      setTitle("");
      setDescription(""); // Reset description
      setIsOpen(false); // Close the dialog after adding the widget
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>  {/* Manage Dialog open state */}
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
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
        <Button onClick={handleAdd} disabled={!title.trim()}>Add Widget</Button> {/* Disable button if no title */}
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetModal;
