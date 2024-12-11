// /pages/api/medications/[id].ts
import { supabaseClient } from '@/lib/supabase';

export default async function handler(req: { method: string; query: { id: any; }; body: { taken: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): void; new(): any; }; }; }) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const { taken } = req.body;

    const { error } = await supabaseClient
      .from('user_medications')
      .update({ taken })
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Medication status updated' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
