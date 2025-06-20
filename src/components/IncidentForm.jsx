import { useState } from "react";

export default function IncidentForm({ onClose, onAddIncident }) {
  const [incidentMessage, setIncidentMessage] = useState("");
  const [incidentStatus, setIncidentStatus] = useState("ouvert");

  console.log("Message incident:", incidentMessage);
  console.log("Message Status:", incidentStatus);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIncident = {
      id: Date.now(),
      description: incidentMessage,
      status: incidentStatus,
    };

    onAddIncident(newIncident);
  };

  return (
    <div className="fixed inset-0 bg-slate-800/75 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="border border-blue-300 p-8 rounded-lg bg-gray-900 w-full max-w-lg mx-4"
      >
        <div className="w-full flex flex-col space-y-3">
          <h2 className="text-gray-200 text-2xl font-bold mb-3">
            Form Incident
          </h2>
          <textarea
            className="h-24 text-gray-200 border placeholder:text-gray-300 border-white rounded-lg resize-none p-2"
            placeholder="Décrivez l'incident"
            value={incidentMessage}
            onChange={(e) => setIncidentMessage(e.target.value)}
          ></textarea>
          <select
            className="text-gray-200 bg-gray-900 border border-gray-100 rounded p-1"
            onChange={(e) => setIncidentStatus(e.target.value)}
          >
            <option value="ouvert">Ouvert</option>
            <option value="résolu">Résolu</option>
          </select>
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="border border-white text-gray-200 px-4 py-1 cursor-pointer hover:text-red-400 duration-300"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="border border-white text-gray-200 px-4 py-1 cursor-pointer hover:text-green-400 duration-300"
          >
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}
