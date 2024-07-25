"use client";
import React from 'react';
import dayjs from 'dayjs';


interface ResumeProps {
  selectedDate: dayjs.Dayjs;
  events: any[];
}

const Resume: React.FC<ResumeProps> = ({ selectedDate, events }) => {
  const dailyEvents = events.filter(event => {
    const eventStart = dayjs(event.startDate).startOf('day');
    const eventEnd = event.endDate ? dayjs(event.endDate).endOf('day') : eventStart;
    return selectedDate.isBetween(eventStart, eventEnd, 'day', '[]');
  });

  return (
    <div className="p-4 flex-1 bg-red-600">
      <h2 className="text-2xl mb-2">Résumé du {selectedDate.format('DD MMMM YYYY')}</h2>
      {dailyEvents.length > 0 ? (
        <ul>
          {dailyEvents.map((event) => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Organisé par: {event.user.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun événement pour ce jour.</p>
      )}
    </div>
  );
};

export default Resume;
