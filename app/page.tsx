// app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import Resume from '../components/Resume';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';

export default function Home() {
  const { data: session, status } = useSession();
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf('day'));
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events/getEvents');
        const data = await response.json();
        
        // Vérifiez si 'data' est un tableau avant de le stocker dans l'état
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Les données des événements ne sont pas dans le format attendu.');
          setEvents([]); // Assurez-vous que 'events' est un tableau
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        setEvents([]); // Assurez-vous que 'events' est un tableau en cas d'erreur
      }
    };

    fetchEvents();
  }, []);

  const handleDateSelect = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
  };

  return (
    <main className="w-full">
      <section className="flex items-center justify-center content-center w-full h-flex-calendar gap-2">
        <Calendar onDateSelect={handleDateSelect} events={events} />
        <Resume selectedDate={selectedDate} events={events} />
      </section>

    </main>
  );
}
