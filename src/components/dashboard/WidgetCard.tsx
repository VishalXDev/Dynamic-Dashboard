import React from "react";
import { Widget } from "../../types/dashboard";
import { X, Pin, PinOff, CheckSquare, Square } from "lucide-react";

interface WidgetCardProps {
  widget: Widget;
  onRemove: () => void;
  onPinToggle: () => void;
  onCheckToggle: () => void;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  widget,
  onRemove,
  onPinToggle,
  onCheckToggle,
}) => {
  return (
    <div className="relative bg-white border border-gray-200 p-4 rounded-2xl shadow hover:shadow-lg transition">
      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label="Remove widget"
      >
        <X size={18} />
      </button>

      {/* Pin Toggle */}
      <button
        onClick={onPinToggle}
        className="absolute bottom-2 right-8 text-blue-500 hover:text-blue-700"
        aria-label={widget.pinned ? "Unpin widget" : "Pin widget"}
      >
        {widget.pinned ? <PinOff size={18} /> : <Pin size={18} />}
      </button>

      {/* Check Toggle */}
      <button
        onClick={onCheckToggle}
        className="absolute bottom-2 right-2 text-green-500 hover:text-green-700"
        aria-label={widget.checked ? "Uncheck widget" : "Check widget"}
      >
        {widget.checked ? <CheckSquare size={18} /> : <Square size={18} />}
      </button>

      {/* Content */}
      <h3 className="text-lg font-semibold mb-1">{widget.title}</h3>
      <p className="text-sm text-gray-600">{widget.description}</p>
    </div>
  );
};

export default WidgetCard;
