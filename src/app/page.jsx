"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import IncidentForm from "@/components/IncidentForm";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [filterStatus, setFilterStatus] = useState("tous");

  const addIncident = (newIncident) => {
    setIncidents((prev) => [...prev, newIncident]);
  };

  const handleDelete = (id) => {
    setIncidents((prev) => prev.filter((incident) => incident.id !== id));
  };

  const filteredIncidents = incidents.filter((incident) => {
    if (filterStatus === "tous") return true;
    return incident.status === filterStatus;
  });

  return (
    <div className="h-screen bg-blue-950 flex justify-center items-center py-6 overflow-y-auto">
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

      <div className="border rounded-lg border-gray-200 shadow-white shadow-lg p-10 max-w-2xl w-full">
        <h1 className="text-white text-3xl font-bold mb-6">
          Gestion des incidents
        </h1>

        <div className="flex space-x-3 mb-4">
          <select
            className="text-gray-200 border rounded-lg bg-stone-800 p-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="tous">Tous</option>
            <option value="ouvert">Ouvert</option>
            <option value="résolu">Résolu</option>
          </select>
          <button
            onClick={() => setShowForm(true)}
            type="button"
            className="text-gray-200 border rounded px-4 py-2 cursor-pointer hover:bg-white/10"
          >
            Ajouter un incident
          </button>
        </div>

        <div className="text-gray-200">
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <ul>
              {filteredIncidents.length === 0 && (
                <li className="text-gray-400">Aucun incident trouvé</li>
              )}
              {filteredIncidents.map(
                ({ id, description, status, resolvedAt }) => (
                  <li
                    key={id}
                    className="bg-gray-800 rounded-lg p-4 shadow mb-3 border border-gray-700"
                  >
                    <p>
                      <strong>Description:</strong> {description}
                    </p>

                    <div className="flex items-center space-x-2 my-2">
                      <span
                        className={`text-sm font-semibold px-2 py-1 rounded ${
                          status === "résolu"
                            ? "bg-green-500 text-green-100"
                            : "bg-yellow-500 text-yellow-100"
                        }`}
                      >
                        {status.toUpperCase()}
                      </span>
                      <select
                        id={`status-${id}`}
                        value={status}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          setIncidents((prev) =>
                            prev.map((incident) =>
                              incident.id === id
                                ? {
                                    ...incident,
                                    status: newStatus,
                                    resolvedAt:
                                      newStatus === "résolu"
                                        ? new Date().toISOString()
                                        : null,
                                  }
                                : incident
                            )
                          );
                        }}
                        className="bg-gray-800 text-gray-200 border rounded px-2 py-1"
                      >
                        <option value="ouvert">Ouvert</option>
                        <option value="résolu">Résolu</option>
                      </select>
                    </div>

                    {status === "résolu" && resolvedAt && (
                      <p className="text-sm text-gray-400">
                        ✅ Résolu le :{" "}
                        {new Date(resolvedAt).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}

                    <button
                      onClick={() => handleDelete(id)}
                      disabled={status !== "résolu"}
                      className={`my-1 cursor-pointer ${
                        status === "résolu"
                          ? "text-red-400 hover:underline"
                          : "text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      🗑️ Supprimer
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
