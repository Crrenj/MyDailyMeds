'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MainContent() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [userMedications, setUserMedications] = useState<any[]>([]);
  const [selectedUserMedicationId, setSelectedUserMedicationId] = useState('');
  const [schedules, setSchedules] = useState<any[]>([]);

  const [medicationId, setMedicationId] = useState(''); // Un ID provenant du medication_catalog
  const [dose, setDose] = useState('');
  const [unit, setUnit] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const queryUserId = searchParams.get('userId');
    if (queryUserId) setUserId(queryUserId);
  }, [searchParams]);

  useEffect(() => {
    if (userId) {
      fetch(`/api/user_medications?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.medications) setUserMedications(data.medications);
        })
        .catch(console.error);
    }
  }, [userId]);

  useEffect(() => {
    if (selectedUserMedicationId) {
      fetch(`/api/schedules?userMedicationId=${selectedUserMedicationId}`)
        .then(res => res.json())
        .then(data => {
          if (data.schedules) setSchedules(data.schedules);
        })
        .catch(console.error);
    } else {
      setSchedules([]);
    }
  }, [selectedUserMedicationId]);

  const handleAddUserMedication = async () => {
    if (!userId || !medicationId) {
      alert('User ID ou Medication ID manquant');
      return;
    }

    const res = await fetch('/api/user_medications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, medicationId }),
    });

    if (res.ok) {
      const data = await res.json();
      setUserMedications([...userMedications, data.user_medication]);
    } else {
      alert('Erreur lors de l\'ajout du médicament utilisateur.');
    }
  };

  const handleAddSchedule = async () => {
    if (!selectedUserMedicationId || !dose || !time) {
      alert('Paramètres manquants pour ajouter un horaire.');
      return;
    }

    const res = await fetch('/api/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMedicationId: selectedUserMedicationId, dose, unit, time }),
    });

    if (res.ok) {
      const data = await res.json();
      setSchedules([...schedules, data.schedule]);
    } else {
      alert('Erreur lors de l\'ajout de l\'horaire.');
    }
  };

  const handleMarkAsTaken = async (scheduleId: string) => {
    const res = await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scheduleId }),
    });

    if (res.ok) {
      alert('Médicament marqué comme pris !');
    } else {
      alert('Erreur lors de la confirmation de prise.');
    }
  };

  return (
    <div className="p-4">
      <h1>Gestion des médicaments</h1>
      {userId && <p>User ID : {userId}</p>}

      <div>
        <h2>Ajouter un médicament à l'utilisateur</h2>
        <input
          placeholder="Medication Catalog ID"
          value={medicationId}
          onChange={(e) => setMedicationId(e.target.value)}
        />
        <button onClick={handleAddUserMedication}>Ajouter</button>
      </div>

      <div>
        <h2>Liste des médicaments de l'utilisateur</h2>
        <ul>
          {userMedications.map(med => (
            <li key={med.id}>
              {med.name} ({med.notes})
              <button onClick={() => setSelectedUserMedicationId(med.id)}>Gérer horaires</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedUserMedicationId && (
        <div>
          <h2>Horaires</h2>
          <input placeholder="Dose" value={dose} onChange={(e) => setDose(e.target.value)} />
          <input placeholder="Unit (ex: mg)" value={unit} onChange={(e) => setUnit(e.target.value)} />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <button onClick={handleAddSchedule}>Ajouter Horaire</button>

          <ul>
            {schedules.map(sch => (
              <li key={sch.id}>
                {sch.dose}{sch.unit && sch.unit} à {sch.time}
                <button onClick={() => handleMarkAsTaken(sch.id)}>Marquer comme pris</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
