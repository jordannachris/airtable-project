import React, { useState, useMemo } from "react";
import type { TimelineItem, TimelineProps } from "../types/timeline";
import { TimelineHeader } from "./TimelineHeader";
import { TimelineItemComponent } from "./TimelineItemComponent";
import { assignLanes } from "../utils/assignLanes.js";
import { ZoomIn, ZoomOut } from "lucide-react";

export const Timeline: React.FC<TimelineProps> = ({ items, onItemUpdate }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  // Calculate date range and dimensions
  const { startDate, totalDays } = useMemo(() => {
    if (items.length === 0)
      return { startDate: new Date(), endDate: new Date(), totalDays: 0 };

    const dates = items.flatMap((item) => [
      new Date(item.startDate),
      new Date(item.endDate),
    ]);
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

    // Add some padding
    minDate.setDate(minDate.getDate() - 2);
    maxDate.setDate(maxDate.getDate() + 2);

    const diffTime = maxDate.getTime() - minDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return { startDate: minDate, endDate: maxDate, totalDays: diffDays };
  }, [items]);

  // Assign lanes to items
  const itemsWithLanes = useMemo(() => assignLanes(items), [items]);

  // Calculate dimensions
  const dayWidth = 40 * zoomLevel;
  const laneHeight = 120; // Aumenta a altura de cada lane para expandir o Timeline para baixo
  const maxLane = Math.max(...itemsWithLanes.map((item) => item.lane || 0));
  const timelineHeight = (maxLane + 1) * laneHeight + 60; // +60 for header

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev * 1.5, 5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev / 1.5, 0.2));

  const handleItemEdit = (itemId: number) => {
    setEditingItemId(itemId);
  };

  const handleItemSave = (itemId: number, newName: string) => {
    if (onItemUpdate) {
      const item = items.find((i) => i.id === itemId);
      if (item) {
        onItemUpdate({ ...item, name: newName });
      }
    }
    setEditingItemId(null);
  };

  const handleItemCancel = () => {
    setEditingItemId(null);
  };

  const handleItemClick = (itemId: number) => {
    if (selectedItemId === itemId) {
      setSelectedItemId(null); // Deselect if already selected
    } else {
      setSelectedItemId(itemId);
    }
  };

  const handleDateChange = (
    itemId: number,
    startDate: string,
    endDate: string
  ) => {
    if (onItemUpdate) {
      const item = items.find((i) => i.id === itemId);
      if (item) {
        onItemUpdate({ ...item, startDate, endDate });
      }
    }
  };

  const handleTimelineClick = () => {
    setSelectedItemId(null);
  };

  const getItemPosition = (item: TimelineItem & { lane: number }) => {
    const itemStart = new Date(item.startDate);
    const itemEnd = new Date(item.endDate);

    const startDays =
      Math.floor(
        (itemStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;
    const endDays =
      Math.floor(
        (itemEnd.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;
    const durationDays = endDays - startDays + 1;

    return {
      left: startDays * dayWidth,
      width: durationDays * dayWidth,
      top: 60 + item.lane * laneHeight + 5, // +60 for header, +5 for padding
      height: laneHeight - 10, // -10 for padding
    };
  };

  return (
  <div className="timeline-container bg-white rounded shadow-sm overflow-visible" style={{marginTop: '0.5rem', marginBottom: '0.5rem'}}>
      {/* Controls */}
      <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">Timeline View</h2>
          <span className="text-sm text-gray-600">
            {items.length} items • Zoom: {Math.round(zoomLevel * 100)}%
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-md bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Timeline Content */}
      <div
        className="timeline-content overflow-x-auto"
        style={{ height: timelineHeight }}
      >
        <div
          className="relative"
          style={{ width: totalDays * dayWidth, height: timelineHeight }}
          onClick={handleTimelineClick}
        >
          {/* Header */}
          <TimelineHeader
            startDate={startDate}
            totalDays={totalDays}
            dayWidth={dayWidth}
          />

          {/* Timeline Items */}
          {itemsWithLanes.map((item) => (
            <React.Fragment key={item.id}>
              <TimelineItemComponent
                item={item}
                position={getItemPosition(item)}
                isEditing={editingItemId === item.id}
                isSelected={selectedItemId === item.id}
                onEdit={() => handleItemEdit(item.id)}
                onSave={(newName) => handleItemSave(item.id, newName)}
                onCancel={handleItemCancel}
                onClick={() => handleItemClick(item.id)}
                onDateChange={handleDateChange}
                dayWidth={dayWidth}
                startDate={startDate}
              />

              {/* Selected Item Indicators */}
              {selectedItemId === item.id && (
                <>
                  {/* Start line indicator */}
                  <div
                    className="absolute bg-red-500 z-10 pointer-events-none"
                    style={{
                      left: getItemPosition(item).left,
                      top: 60,
                      width: 2,
                      height: timelineHeight - 60,
                    }}
                  />

                  {/* End line indicator */}
                  <div
                    className="absolute bg-red-500 z-10 pointer-events-none"
                    style={{
                      left:
                        getItemPosition(item).left +
                        getItemPosition(item).width,
                      top: 60,
                      width: 2,
                      height: timelineHeight - 60,
                    }}
                  />

                  {/* Start date label */}
                  <div
                    className="absolute bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg z-10 pointer-events-none"
                    style={{
                      left: getItemPosition(item).left - 35,
                      top: getItemPosition(item).top - 25,
                      minWidth: 70,
                      textAlign: "center",
                    }}
                  >
                    <div>{item.startDate}</div>
                  </div>

                  {/* End date label */}
                  <div
                    className="absolute bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg z-10 pointer-events-none"
                    style={{
                      left:
                        getItemPosition(item).left +
                        getItemPosition(item).width -
                        35,
                      top: getItemPosition(item).top - 25,
                      minWidth: 70,
                      textAlign: "center",
                    }}
                  >
                    <div>{item.endDate}</div>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
