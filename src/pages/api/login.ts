import { supabaseClient } from '@/lib/supabase';

export default async function handler(req: { method: string; body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; userId?: any; message?: string; redirect?: string; }): void; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    // Vérification de l'utilisateur sans sécurité renforcée
    const { data: user, error } = await supabaseClient
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password) 
      .single();

    if (!user) {
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    // Configuration d'un cookie simple (optionnel)
    res.setHeader('Set-Cookie', `user=${user.email}; Path=/; HttpOnly`);

    // Retourne le userId récupéré depuis la BD
    res.status(200).json({ 
      userId: user.id, 
      message: 'Connexion réussie', 
      redirect: '/dashboard' 
    });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
