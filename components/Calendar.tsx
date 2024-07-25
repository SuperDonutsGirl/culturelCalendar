"use client";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "dayjs/locale/fr";

dayjs.locale("fr");
dayjs.extend(isBetween);

const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

interface CalendarProps {
  onDateSelect: (date: dayjs.Dayjs) => void;
  events: any[];
}


const Calendar: React.FC<CalendarProps> = ({ onDateSelect, events }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf("day"));
  const today = dayjs().startOf("day");

  const startDay = currentDate.startOf("month").day();
  const daysInMonth = currentDate.daysInMonth();

  // Créer un tableau de jours
  const days = [];
  let index = 0;

  // Ajouter les cases vides avant le début du mois
  for (let i = 1; i < startDay; i++) {
    days.push(
      <div key={`empty-${i + 1}`} className="text-center row-span-3" />
    );
    index++;
  }

  // Ajouter les jours du mois
  for (let i = 1; i <= daysInMonth; i++) {
    const day = currentDate.date(i).startOf("day");
    const isToday = day.isSame(today, "day"); // Vérifier si c'est aujourd'hui
    const isSelected = day.isSame(selectedDate, "day"); // Vérifier si c'est le jour sélectionné

    // Trouver les événements pour ce jour
    const dailyEvents = events.filter((event) => {
      const eventStart = dayjs(event.startDate).startOf("day");
      const eventEnd = event.endDate
        ? dayjs(event.endDate).endOf("day")
        : eventStart;
      return day.isBetween(eventStart, eventEnd, "day", "[]");
    });

    days.push(
      <div
        key={i}
        className={`text-center border row-span-3 cursor-pointer rounded-md text-sm ${
          isSelected ? "border-blue-500" : ""
        }`}
        onClick={() => {
          setSelectedDate(day);
          onDateSelect(day);
        }}
      >
        <p
          className={`text-center border row-span-3 cursor-pointer rounded-md text-sm ${
            isToday ? "bg-red-500 text-white" : ""
          } `}
        >
          {i}
        </p>
        {/* <p className={text-xl ${isToday ? 'bg-red-500 text-white' : ""}}>{i}</p> */}
        {dailyEvents.length > 0 && (
          <div className="text-green-500 text-xl flex">
            {dailyEvents.map((event) => (
              <div key={event.id}>o</div>
            ))}
          </div>
        )}
      </div>
    );
    index++;
  }

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  return (
    <>
      <div className="mx-auto mt-2 p-4 border rounded-lg shadow-lg w-3/5">
        <div className="flex justify-evenly items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="text-l font-bold p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            &lt;
          </button>
          <div className="text-l font-bold">
            {currentDate.format("MMMM YYYY")}
          </div>
          <button
            onClick={handleNextMonth}
            className="text-l font-bold p-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 grid-rows-19 gap-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-bold text-red-500">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    </>
  );
};

export default Calendar;
