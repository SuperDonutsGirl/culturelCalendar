"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Select from "react-select";
import Link from "next/link";

interface OptionType {
  value: string;
  label: string;
  color: string; // Couleur pour chaque type
}

export default function Profile() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    types: [], // Tableau pour stocker plusieurs types
    startDate: "",
    endDate: "",
    time: "",
    location: "",
    description: "",
    ticketLink: "",
    session: session,
  });

  const [allEventTypes, setAllEventTypes] = useState<OptionType[]>([]); // Stocker les types d'événements avec couleur

  useEffect(() => {
    // Fetch all event types from your API or define them manually
    // Example: fetching types from an API endpoint
    const fetchEventTypes = async () => {
      try {
        const response = await fetch("/api/events/eventTypes"); // Remplacez par votre API
        const data = await response.json();
        console.log(data);

        // Assurez-vous que 'name' correspond à la propriété des types et définissez une couleur aléatoire ou une couleur spécifique
        setAllEventTypes(
          data.map((type: { name: string; color: string }) => ({
            value: type.name,
            label: type.name,
            color: type.color, // Associe une couleur à chaque type
          }))
        );
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des types d'événements:",
          error
        );
      }
    };

    fetchEventTypes();
  }, []);

  // // Fonction pour générer ou associer une couleur à chaque type
  // const getColorForType = (typeName: string): string => {
  //   // Vous pouvez personnaliser cette fonction pour attribuer des couleurs spécifiques
  //   const colors: { [key: string]: string } = {
  //     Concert: '#FF5733',
  //     Art: '#33FF57',
  //     Théatre: '#3357FF',
  //     Dance: '#F3FF33',
  //     // Ajoutez plus de couleurs selon les types
  //   };
  //   return colors[typeName] || '#CCCCCC'; // Couleur par défaut si le type n'a pas de couleur définie
  // };

  // Gérer les changements dans le formulaire
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "types") {
      // Modification pour le sélecteur de tags
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  // Gérer le changement dans le sélecteur de tags
  const handleTagChange = (selectedOptions: OptionType[]) => {
    setEventData({
      ...eventData,
      types: selectedOptions.map((option) => option.value),
    });
  };

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/events/createEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Échec de la création de l'événement");
      }

      // Réinitialiser le formulaire
      setEventData({
        title: "",
        types: [],
        startDate: "",
        endDate: "",
        time: "",
        location: "",
        description: "",
        ticketLink: "",
        session: null,
      });
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div>
      {session ? (
        <>
          <div className="flex flex-col">
            <p>Bienvenue {session.user?.name}</p>
          </div>

          <h2>Ajouter un événement</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Titre:</label>
              <input
                type="text"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Type:</label>
              <Select
                isMulti
                options={allEventTypes}
                value={allEventTypes.filter((type) =>
                  eventData.types.includes(type.value)
                )}
                onChange={handleTagChange}
                getOptionLabel={(option) => (
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: option.color }}
                    />
                    {option.label}
                  </div>
                )}
                getOptionValue={(option) => option.value}
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? state.data.color
                      : "white",
                    ":active": {
                      backgroundColor: state.isSelected ? state.data.color : "#f8f9fa",
                    },
                  }),
                  multiValue: (provided, state) => ({
                    ...provided,
                    borderColor: state.data.color,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: "5px"
                  }),
                  multiValueRemove: (provided, state) => ({
                    ...provided,
                    ":hover": {
                      backgroundColor: state.data.color,
                      color: "white",
                    },
                  }),
                }}
              />
            </div>
            <div>
              <label>Date de début:</label>
              <input
                type="date"
                name="startDate"
                value={eventData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Date de fin:</label>
              <input
                type="date"
                name="endDate"
                value={eventData.endDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Heure:</label>
              <input
                type="text"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Lieu:</label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Lien vers la billeterie:</label>
              <input
                type="url"
                name="ticketLink"
                value={eventData.ticketLink}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Créer un événement</button>
          </form>
        </>
      ) : (
        <>
          <div>Oups ... Vous n'êtes pas connecté</div>
          <Link href="/login">Login</Link>
        </>
      )}
    </div>
  );
}
