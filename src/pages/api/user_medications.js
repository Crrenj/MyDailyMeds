import { supabaseClient } from '@/lib/supabase';

export default async function handler(req, res) {
  const { method } = req;
  
  if (method === 'GET') {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId requis' });

    // On récupère les user_medications join medication_catalog pour avoir le nom
    const { data, error } = await supabaseClient
      .from('user_medications')
      .select('id, notes, medication_catalog(name, description)')
      .eq('user_id', userId);
      
    if (error) return res.status(500).json({ error: error.message });
    
    // Formater le résultat pour obtenir un array de {id, name, description, notes}
    const medications = data.map(item => ({
      id: item.id,
      name: item.medication_catalog.name,
      description: item.medication_catalog.description,
      notes: item.notes
    }));
    
    return res.status(200).json({ medications });
  }

  if (method === 'POST') {
    const { userId, medicationId, notes } = req.body;
    if (!userId || !medicationId) {
      return res.status(400).json({ error: 'Paramètres manquants (userId, medicationId)' });
    }
    
    const { data, error } = await supabaseClient
      .from('user_medications')
      .insert({ user_id: userId, medication_id: medicationId, notes: notes || '' })
      .single();

    if (error) return res.status(500).json({ error: error.message });
    
    return res.status(200).json({ user_medication: data });
  }

  return res.status(405).json({ error: 'Méthode non autorisée' });
}
