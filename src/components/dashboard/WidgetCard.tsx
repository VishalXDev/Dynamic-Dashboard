import React from "react";
import { Widget } from "../../types/dashboard";
import { X, Pin, PinOff } from "lucide-react";

interface WidgetCardProps {
  widget: Widget;
  onRemove: () => void;
  onPinToggle: () => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ widget, onRemove, onPinToggle }) => {
  return (
    <div className="relative bg-gray-100 p-4 rounded-xl shadow hover:shadow-md transition">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      >
        <X size={18} />
      </button>
      <button
        onClick={onPinToggle}
        className="absolute bottom-2 right-2 text-blue-500 hover:text-blue-700"
      >
        {widget.pinned ? <PinOff size={18} /> : <Pin size={18} />}
      </button>
      <h3 className="text-lg font-medium">{widget.title}</h3>
      <p className="text-sm text-gray-600">{widget.description}</p>
    </div>
  );
};

export default WidgetCard;
