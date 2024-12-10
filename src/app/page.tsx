import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { LampContainer } from "@/components/ui/Lamp";

export default function HomePage() {
  return (
    <div>
      {/* Section avec la lampe */}
      <div>
        <LampContainer>
          <div>
            <h1 className="text-5xl font-bold">
              Bienvenue sur <span className="text-blue-400">Mon Application</span>
            </h1>
          </div>
        </LampContainer>
      </div>

      {/* Nouvelle section avec un gros texte */}
      <div className="flex items-center justify-between px-8 py-16 bg-gray-50">
        <div className="w-1/2">
          <h2 className="text-4xl font-bold text-gray-800">
            Découvrez la simplicité d'utilisation
          </h2>
        </div>
        <div className="w-1/2">
          <p className="text-lg text-gray-600 leading-relaxed">
            Notre application est conçue pour faciliter votre gestion quotidienne, vous aider à rester organisé 
            et à atteindre vos objectifs plus rapidement. Essayez-la aujourd'hui pour voir la différence !
          </p>
        </div>
      </div>

      {/* Section avec BentoGrid */}
      <div className="py-16 bg-gray-100">
        <BentoGrid className="max-w-6xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={
                item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[150px] object-cover rounded-xl"
                  />
                ) : (
                  <Skeleton />
                )
              }
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>

      {/* Section avec InfiniteMovingCards */}
      <div>
        <InfiniteMovingCards
          items={[
            { quote: "Une citation inspirante", name: "Jean Dupont", title: "Utilisateur" },
            { quote: "Un autre commentaire", name: "Marie Curie", title: "Scientifique" },
            { quote: "J'adore cette application", name: "Albert Einstein", title: "Physicien" },
          ]}
          direction="left"
          speed="normal"
          pauseOnHover={true}
          className="my-custom-class"
        />
      </div>

      {/* Section À propos */}
      <div className="py-16 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">À propos de nous</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Nous sommes une équipe passionnée par la création d'applications innovantes pour
            améliorer la gestion quotidienne et simplifier la vie. Notre mission est de fournir
            des outils conviviaux, sécurisés et efficaces qui s'adaptent aux besoins de chacun.
            Rejoignez-nous dans cette aventure et découvrez une nouvelle façon de gérer votre quotidien !
          </p>
        </div>
      </div>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    image: "https://via.placeholder.com/300", // Exemple d'image
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    image: "https://via.placeholder.com/300",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    image: "https://via.placeholder.com/300",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    image: "https://via.placeholder.com/300",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    image: "https://via.placeholder.com/300",
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    image: "https://via.placeholder.com/300",
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    image: "https://via.placeholder.com/300",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
