import { supabaseClient } from '@/lib/supabase';

export default async function handler(req: { method: string; body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; redirect?: string; }): void; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Vérifie si l'utilisateur existe avec les bonnes informations
    const { data: user, error } = await supabaseClient
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password) // À sécuriser avec un hachage de mot de passe
      .single();

    if (!user) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // Configure un cookie pour l'utilisateur
    res.setHeader('Set-Cookie', `user=${user.email}; Path=/; HttpOnly`);

    res.status(200).json({ message: 'Connexion réussie', redirect: '/dashboard' });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
