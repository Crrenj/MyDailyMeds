// /pages/api/medications.ts
import { supabaseClient } from '@/lib/supabase';

export default async function handler(req: { method: string; body: { userId: any; medicationName: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; medication?: any; }): void; new(): any; }; }; }) {
  try {
    if (req.method === 'POST') {
      const { userId, medicationName } = req.body;

      console.log('Requête reçue :', req.body);


      if (!userId || !medicationName) {
        return res.status(400).json({ error: 'User ID and medication name are required' });
      }

      // Étape 1 : Rechercher le médicament dans `medication_catalog`
      const { data: medication, error: catalogError } = await supabaseClient
        .from('medication_catalog')
        .select('id, name')
        .eq('name', medicationName)
        .single();

      if (catalogError || !medication) {
        return res.status(404).json({ error: 'Medication not found in the catalog' });
      }

      // Étape 2 : Ajouter le médicament à `user_medications`
      const { data, error: userMedError } = await supabaseClient
        .from('user_medications')
        .insert([
          {
            user_id: userId,
            medication_id: medication.id,
            notes: `Added ${medication.name} to user list`,
          },
        ])
        .select();

      if (userMedError) {
        return res.status(500).json({ error: userMedError.message });
      }

      res.status(201).json({ message: 'Medication added to user list', medication: data[0] });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error('Unexpected server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
