import { NextResponse } from 'next/server';

export function middleware(req: { cookies: { get: (arg0: string) => any; }; nextUrl: { pathname: string; }; url: string | URL | undefined; }) {
  // Récupère le cookie "user"
  const user = req.cookies.get('user');

  // Vérifie si la route protégée est demandée
  if (!user && req.nextUrl.pathname.startsWith('/dashboard')) {
    // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Autorise l'accès aux autres routes
  return NextResponse.next();
}

export const config = {
  // Applique le middleware uniquement aux routes protégées
  matcher: ['/dashboard/:path*'],
};
