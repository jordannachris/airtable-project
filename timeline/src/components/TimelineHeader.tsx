import React from "react";

interface TimelineHeaderProps {
  startDate: Date;
  totalDays: number;
  dayWidth: number;
}

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  startDate,
  totalDays,
  dayWidth,
}) => {
  const generateHeaders = () => {
    const labels = [];
    const gridLines = [];
    const monthHeaders = [];
    const currentDate = new Date(startDate);

    // Track months and their spans
    const months: { name: string; startDay: number; endDay: number }[] = [];
    let currentMonth = -1;
    let monthStartDay = 0;

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);

      // Check if we've entered a new month
      if (date.getMonth() !== currentMonth) {
        // Close previous month if it exists
        if (months.length > 0) {
          months[months.length - 1].endDay = i - 1;
        }

        // Start new month
        currentMonth = date.getMonth();
        monthStartDay = i;
        months.push({
          name: date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
          startDay: i,
          endDay: i, // Will be updated when month ends
        });
      }

      // Add vertical grid line for each day
      gridLines.push(
        <div
          key={`grid-${i}`}
          className="absolute border-l border-gray-200"
          style={{
            left: i * dayWidth,
            top: 60, // Start below month/day headers
            height: "100vh", // Extend through entire timeline height
            zIndex: 1,
          }}
        />
      );

      // Add day label
      labels.push(
        <div
          key={`day-${i}`}
          className="absolute text-xs text-gray-600 font-medium border-r border-gray-200 bg-gray-50 flex items-center justify-center"
          style={{
            left: i * dayWidth,
            top: 30,
            width: dayWidth,
            height: 30,
            zIndex: 2,
          }}
        >
          {date.getDate()}
        </div>
      );
    }

    // Close the last month
    if (months.length > 0) {
      months[months.length - 1].endDay = totalDays - 1;
    }

    // Generate month headers
    months.forEach((month, index) => {
      const monthWidth = (month.endDay - month.startDay + 1) * dayWidth;
      monthHeaders.push(
        <div
          key={`month-${index}`}
          className="absolute text-sm font-semibold text-gray-800 bg-white border border-gray-300 flex items-center justify-center"
          style={{
            left: month.startDay * dayWidth,
            top: 0,
            width: monthWidth,
            height: 30,
            zIndex: 2,
          }}
        >
          {month.name}
        </div>
      );
    });

    return [...gridLines, ...monthHeaders, ...labels];
  };

  return (
    <div
      className="timeline-header relative bg-gray-50 border-b"
      style={{ height: 60, width: totalDays * dayWidth }}
    >
      {generateHeaders()}
    </div>
  );
};
