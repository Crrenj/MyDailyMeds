"use client";

import React, { useState } from "react";

interface Medication {
  name: string;
  taken: boolean;
}

const MainContent = () => {
  const [medications, setMedications] = useState<Medication[]>([]); // Type défini
  const [newMedication, setNewMedication] = useState<string>("");
  const [reminder, setReminder] = useState<string>("");

  const handleAddMedication = async () => {
    if (newMedication) {
      const res = await fetch("/api/medications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newMedication }),
      });

      if (res.ok) {
        const data = await res.json();
        setMedications([...medications, { name: data.name, taken: false }]);
        setNewMedication("");
      } else {
        alert("Erreur lors de l'ajout du médicament.");
      }
    }
  };

  const handleConfirmTaken = async (index: number) => {
    const medication = medications[index];
    const res = await fetch(`/api/medications/${index}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taken: true }),
    });

    if (res.ok) {
      const updatedMedications = medications.map((med, medIndex) =>
        medIndex === index ? { ...med, taken: true } : med
      );
      setMedications(updatedMedications);
    } else {
      alert("Erreur lors de la confirmation.");
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <p>Manage your medications, set reminders, and confirm your intakes.</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Add a Medication</h2>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Enter medication name"
            value={newMedication}
            onChange={(e) => setNewMedication(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-1"
          />
          <button
            onClick={handleAddMedication}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Medications</h2>
        <ul className="mt-2 space-y-2">
          {medications.map((med, index) => (
            <li
              key={index}
              className="p-3 bg-white border border-gray-200 rounded-md flex justify-between items-center shadow-sm"
            >
              <span className={med.taken ? "line-through text-gray-500" : "text-black"}>
                {med.name}
              </span>
              {!med.taken && (
                <button
                  onClick={() => handleConfirmTaken(index)}
                  className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Confirm Taken
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Set a Reminder</h2>
        <div className="flex gap-2 mt-2">
          <input
            type="time"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-1"
          />
          <button
            onClick={() => alert(`Reminder set for ${reminder}`)}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
