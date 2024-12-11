import { supabaseClient } from '@/lib/supabase';

export default async function handler(req: { method: string; body: { firstName: any; lastName: any; email: any; password: any; birthday: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; redirect?: string; }): any; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }) {
  try {
    if (req.method === 'POST') {
      const { firstName, lastName, email, password, birthday } = req.body;

      if (!email || !password || !firstName || !lastName || !birthday) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
      }

      // Vérifie si l'utilisateur existe déjà
      const { data: existingUser, error: fetchError } = await supabaseClient
        .from('users')
        .select('id')
        .eq('email', email)
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Erreur de récupération de l\'utilisateur:', fetchError);
        return res.status(500).json({ error: 'Erreur lors de la vérification de l\'utilisateur.' });
      }

      if (existingUser) {
        return res.status(400).json({ error: 'Cet utilisateur est déjà enregistré.' });
      }

      // Ajoute un nouvel utilisateur dans la base de données
      const { error: insertError } = await supabaseClient.from('users').insert([
        {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          birthday,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        console.error('Erreur d\'insertion dans la base de données:', insertError);
        return res.status(500).json({ error: 'Erreur lors de l\'inscription de l\'utilisateur.' });
      }

      // Configure un cookie pour l'utilisateur
      res.setHeader('Set-Cookie', `user=${email}; Path=/; HttpOnly`);
      return res.status(201).json({ message: 'Utilisateur créé avec succès', redirect: '/dashboard' });
    } else {
      return res.status(405).json({ error: 'Méthode non autorisée' });
    }
  } catch (error) {
    console.error('Erreur inattendue:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
}
