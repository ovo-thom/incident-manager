"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import IncidentForm from "@/components/IncidentForm";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="h-screen bg-blue-950 flex justify-center items-center">
      {showForm &&
        createPortal(
          <IncidentForm onClose={() => setShowForm(false)} />,
          document.body
        )}
      <div className="border border-gray-200 shadow-white shadow-lg p-10">
        <h1 className="text-white text-2xl mb-3">
          Tableau de gestion des incidents
        </h1>
        <div className="flex space-x-3">
          <select
            name=""
            id=""
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
      </div>
    </div>
  );
}
