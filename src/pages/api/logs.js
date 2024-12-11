import { supabaseClient } from '@/lib/supabase';

export default async function handler(req, res) {
  const { method } = req;
  
  if (method === 'POST') {
    const { scheduleId } = req.body;
    if (!scheduleId) return res.status(400).json({ error: 'scheduleId manquant' });
    
    const { data, error } = await supabaseClient
      .from('logs')
      .insert({ schedule_id: scheduleId, taken_at: new Date().toISOString(), status: 'taken' })
      .single();

    if (error) return res.status(500).json({ error: error.message });
    
    return res.status(200).json({ log: data });
  }

  return res.status(405).json({ error: 'Méthode non autorisée' });
}
