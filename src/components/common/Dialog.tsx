// File: src/components/common/Dialog.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            {title && (
              <DialogPrimitive.Title id="dialog-title" className="text-xl font-bold">
                {title}
              </DialogPrimitive.Title>
            )}
            <DialogPrimitive.Close asChild>
              <button className="text-gray-500 hover:text-gray-800">
                <X size={20} />
              </button>
            </DialogPrimitive.Close>
          </div>
          {description && <p id="dialog-description" className="text-gray-500 mb-4">{description}</p>}
          <div>{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

// Re-export DialogPrimitive components for use elsewhere
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = DialogPrimitive.Content;

export default Dialog;
