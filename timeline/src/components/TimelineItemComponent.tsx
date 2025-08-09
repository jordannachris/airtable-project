import React, { useState, useRef, useEffect } from "react";
import type { TimelineItem } from "../types/timeline";

interface TimelineItemComponentProps {
  item: TimelineItem;
  position: {
    left: number;
    width: number;
    top: number;
    height: number;
  };
  isEditing: boolean;
  isSelected: boolean;
  onEdit: () => void;
  onSave: (newName: string) => void;
  onCancel: () => void;
  onClick: () => void;
  onDateChange: (itemId: number, startDate: string, endDate: string) => void;
  dayWidth: number;
  startDate: Date;
}

export const TimelineItemComponent: React.FC<TimelineItemComponentProps> = ({
  item,
  position,
  isEditing,
  isSelected,
  onEdit,
  onSave,
  onCancel,
  onClick,
}) => {
  const [editValue, setEditValue] = useState(item.name);
  const [, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSave(editValue);
    } else if (e.key === "Escape") {
      setEditValue(item.name);
      onCancel();
    }
  };

  const getItemColor = (id: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-red-500",
    ];
    return colors[id % colors.length];
  };

  const getBorderColor = (id: number) => {
    const colors = [
      "border-blue-600",
      "border-green-600",
      "border-purple-600",
      "border-orange-600",
      "border-pink-600",
      "border-indigo-600",
      "border-teal-600",
      "border-red-600",
    ];
    return colors[id % colors.length];
  };

  const handleItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Handle double-click for editing
    if (clickTimer) {
      clearTimeout(clickTimer);
      setClickTimer(null);
      setClickCount(0);
      // Double click - start editing
      onEdit();
    } else {
      setClickCount(1);
      setClickTimer(
        setTimeout(() => {
          // Single click - just select
          onClick();
          setClickTimer(null);
          setClickCount(0);
        }, 300)
      );
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (clickTimer) {
        clearTimeout(clickTimer);
      }
    };
  }, [clickTimer]);

  const handleSaveEdit = () => {
    onSave(editValue);
  };

  return (
    <>
      <div
        className="absolute"
        style={{
          left: position.left,
          width: position.width,
          top: position.top,
          height: position.height,
          minWidth: "100px",
          zIndex: 3,
        }}
      >
        {/* Main timeline bar */}
        <div
          className={`relative w-full h-full rounded-md shadow-sm border cursor-pointer transition-all duration-200 hover:shadow-md ${getItemColor(
            item.id
          )} ${getBorderColor(item.id)} text-white border-l-4 border-r-4 ${
            isSelected ? "ring-2 ring-red-400" : ""
          }`}
          onClick={handleItemClick}
        >
          <div className="p-2 h-full flex flex-col justify-center">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSaveEdit}
                className="bg-white text-gray-800 px-2 py-1 rounded text-sm font-medium w-full"
              />
            ) : (
              <>
                <div
                  className="text-sm font-bold text-white truncate mb-1"
                  title={item.name}
                >
                  {item.name}
                </div>
                <div className="text-xs text-white opacity-90">
                  {item.startDate} → {item.endDate}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
