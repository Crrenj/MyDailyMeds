import { supabaseClient } from '@/lib/supabase';

export default async function handler(req, res) {
  const { method } = req;
  
  if (method === 'GET') {
    const { userMedicationId } = req.query;
    if (!userMedicationId) return res.status(400).json({ error: 'userMedicationId requis' });
    
    const { data, error } = await supabaseClient
      .from('schedules')
      .select('id, dose, unit, time')
      .eq('user_medication_id', userMedicationId);
      
    if (error) return res.status(500).json({ error: error.message });
    
    return res.status(200).json({ schedules: data });
  }

  if (method === 'POST') {
    const { userMedicationId, dose, unit, time } = req.body;
    if (!userMedicationId || !dose || !time) {
      return res.status(400).json({ error: 'Paramètres manquants (userMedicationId, dose, time)' });
    }

    const { data, error } = await supabaseClient
      .from('schedules')
      .insert({ user_medication_id: userMedicationId, dose, unit: unit || '', time })
      .single();
      
    if (error) return res.status(500).json({ error: error.message });
    
    return res.status(200).json({ schedule: data });
  }

  return res.status(405).json({ error: 'Méthode non autorisée' });
}
