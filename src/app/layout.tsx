import { FloatingDock } from "@/components/ui/FloatingDock";

const navItems = [
  { title: "Accueil", icon: <span>🏠</span>, href: "/" },
  { title: "À Propos", icon: <span>ℹ️</span>, href: "/about" },
  { title: "Connexion", icon: <span>🔑</span>, href: "/login" },
  { title: "Inscription", icon: <span>📝</span>, href: "/signup" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <title>Mon Application Publique</title>
      </head>
      <body className="min-h-screen bg-gray-100 flex flex-col">
        {/* Contenu principal */}
        <main className="flex-grow pb-20">{children}</main>

        {/* Footer des crédits */}
        <footer className="bg-gray-200 text-gray-600 text-sm py-4">
          <div className="max-w-4xl mx-auto text-center">
            <p>© {new Date().getFullYear()} Mon Application. Tous droits réservés.</p>
            <p>
              Besoin d'aide ? <a href="/support" className="text-blue-500 hover:underline">Contactez-nous</a>
            </p>
            <p>
              <a href="/privacy-policy" className="text-blue-500 hover:underline">Politique de confidentialité</a> | 
              <a href="/terms" className="text-blue-500 hover:underline"> Conditions d'utilisation</a>
            </p>
          </div>
        </footer>

        {/* Barre de navigation */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50 bg-white shadow-md">
          <div className="inline-block max-w-4xl w-full">
            <FloatingDock
              items={navItems}
              desktopClassName=""
              mobileClassName=""
            />
          </div>
        </div>
      </body>
    </html>
  );
}

