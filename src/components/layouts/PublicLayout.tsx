import { FloatingDock } from "@/components/ui/FloatingDock";

const navItems = [
  { title: "Accueil", icon: <span>🏠</span>, href: "/" },
  { title: "À Propos", icon: <span>ℹ️</span>, href: "/about" },
  { title: "Connexion", icon: <span>🔑</span>, href: "/login" },
  { title: "Inscription", icon: <span>📝</span>, href: "/signup" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
            {children}
        </main>

        {/* Conteneur avec le même fond pour le footer et l'espace supplémentaire */}
        <div className="bg-gray-200">
            <footer className="text-gray-600 text-sm py-4">
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

            {/* Espace supplémentaire sous le footer avec la même couleur */}
            <div className="h-32"></div>
        </div>

        <div className="fixed bottom-0 w-full flex justify-center z-50">
            <div className="bg-white shadow-md rounded-full px-4 py-2 flex items-center space-x-4">
                <FloatingDock
                items={navItems}
                desktopClassName=""
                mobileClassName=""
                />
            </div>
        </div>
    </div>
  );
}
