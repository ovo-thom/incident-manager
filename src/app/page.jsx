"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import IncidentForm from "@/components/IncidentForm";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [incidents, setIncidents] = useState([]);

  const addIncident = (newIncident) => {
    setIncidents((prev) => [...prev, newIncident]);
  }

  return (
    <div className="h-screen bg-blue-950 flex justify-center items-center">
      {showForm &&
        createPortal(
          <IncidentForm
           onClose={() => setShowForm(false)}
            onAddIncident={(incident) => {
              addIncident(incident);
              setShowForm(false);
            }}
           />,
          document.body
        )}
      <div className="border rounded-lg border-gray-200 shadow-white shadow-lg p-10">
        <h1 className="text-white text-2xl mb-3">
          Tableau de gestion des incidents
        </h1>
        <div className="flex space-x-3">
          <select
            className="text-gray-200 border rounded-lg bg-stone-800 p-2"
          >
            <option value="">Tous</option>
            <option value="">Ouvert</option>
            <option value="">Resolu</option>
          </select>
          <button
            onClick={() => setShowForm(true)}
            type="submit"
            className="text-gray-200 border rounded px-4 py-2 cursor-pointer"
          >
            Ajouter un incident
          </button>
        </div>
        <div className="text-gray-200 mt-4">
          <ul>
            {incidents.length === 0 && <li>Aucun incident</li>}
            {incidents.map(({ id, description, status}) => (
              <li key={id} className="border-b border-gray-700 py-2">
                <p><strong>Description:</strong> {description}</p>
                <p><strong>Status:</strong> {status}</p>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
