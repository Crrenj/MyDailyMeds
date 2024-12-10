import { supabaseClient } from '@/lib/supabase';

export default async function handler(req: { method: string; body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; redirect?: string; }): void; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Vérifie si l'utilisateur existe déjà
    const { data: existingUser } = await supabaseClient
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'Cet utilisateur est déjà enregistré.' });
    }

    // Ajoute un nouvel utilisateur dans la base de données
    const { data, error } = await supabaseClient.from('users').insert([{ email, password }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Configure un cookie pour l'utilisateur
    res.setHeader('Set-Cookie', `user=${email}; Path=/; HttpOnly`);

    res.status(201).json({ message: 'Utilisateur créé avec succès', redirect: '/dashboard' });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
