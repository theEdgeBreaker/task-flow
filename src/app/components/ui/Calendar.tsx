// src/components/ui/calendar.tsx
import { useState } from "react";
import { format } from "date-fns";

export function Calendar({
  selected,
  onSelect,
}: {
  selected: Date;
  onSelect: (date: Date) => void;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    onSelect(date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
      <div className="text-center font-semibold text-lg mb-4">
        {format(currentDate, "MMMM yyyy")}
      </div>
      <input
        type="date"
        value={format(selected, "yyyy-MM-dd")}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
