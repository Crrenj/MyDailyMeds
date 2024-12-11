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
import { FlipWords } from "./ui/flip-words";

export default function HomePage() {
  return (
    <div>
      {/* Section avec la lampe et phrase d'accroche */}
      <div>
        <LampContainer>
        <div className="text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-100">
            Grâce à My Daily Meds, votre santé rime avec{" "}
              <span className="text-blue-400 inline-block">
                <FlipWords
                  words={["simplicité", "régularité", "tranquillité"]}
                  duration={3000}
                  className="inline text-blue-400"
                />
              </span>
            </h1>
          </div>
        </LampContainer>
      </div>

      {/* Nouvelle section avec un gros texte */}
      <div className="flex items-center justify-between px-8 py-16 bg-gray-100">
        <div className="w-1/2 pr-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Découvrez la simplicité d'utilisation
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Notre application s’adapte à votre rythme de vie. Programmez des 
            alertes pour ne plus jamais oublier une prise de médicament, 
            suivez l’évolution de vos traitements, et accédez à un catalogue 
            complet de médicaments avec des informations claires et fiables.
          </p>
        </div>
        <div className="w-1/2">
          <img 
            src="https://via.placeholder.com/500x300?text=My+Daily+Meds+App" 
            alt="Aperçu de l'application My Daily Meds" 
            className="rounded-xl shadow-md"
          />
        </div>
      </div>

      {/* Section avec BentoGrid - un catalogue de médicaments */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto mb-8 text-center">
          <h3 className="text-3xl font-bold text-gray-800">
            Parcourez notre catalogue de médicaments
          </h3>
          <p className="text-lg text-gray-600 mt-2">
            Trouvez des informations détaillées sur chaque médicament : posologie, effets, contre-indications et plus.
          </p>
        </div>
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

      {/* Titre au-dessus des cartes de témoignages */}
      <h3 className="text-3xl font-bold text-center text-gray-800 my-8">
        Ce que disent nos utilisateurs
      </h3>

      {/* Section avec InfiniteMovingCards - Témoignages */}
      <div>
        <InfiniteMovingCards
          items={[
            { quote: "Grâce à My Daily Meds, je n’oublie plus mes traitements !", name: "Jean Dupont", title: "Utilisateur régulier" },
            { quote: "Une application simple et pratique, j’adore le catalogue et les rappels.", name: "Marie Curie", title: "Scientifique" },
            { quote: "Enfin une solution pour gérer mes médicaments sans stress.", name: "Albert Einstein", title: "Physicien" },
          ]}
          direction="left"
          speed="normal"
          pauseOnHover={true}
          className="my-custom-class"
        />
      </div>

      {/* Section À propos */}
        <div className="py-16 px-8 bg-gray-100">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">À propos de My Daily Meds</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Derrière My Daily Meds, il n’y a pas une grande équipe, mais une personne passionnée, déterminée à améliorer la gestion des médicaments à travers le monde. Mon objectif est simple : faciliter votre quotidien, réduire le gaspillage, et encourager de meilleures habitudes de prise de médicaments.
                    </p>
                </div>

                {/* Section sur le gaspillage de médicaments */}
                <div className="space-y-4">
                    {/* Vous pouvez ajouter une image ici */}
                    <img src="https://via.placeholder.com/600x300?text=Reduction+du+gaspillage" alt="Réduction du gaspillage" className="mx-auto rounded-xl shadow-md"/>
                    <h3 className="text-3xl font-semibold text-gray-800">Réduire le gaspillage de médicaments</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Des milliers de boîtes de médicaments finissent périmées ou inutilisées chaque jour, alors même que des personnes en auraient besoin. En vous aidant à mieux gérer vos traitements, My Daily Meds vise à limiter ce gaspillage. L’idée est de vous permettre de suivre facilement vos posologies, d’anticiper la fin de vos boîtes, et ainsi d’éviter de trop acheter ou de jeter prématurément.
                    </p>
                </div>

                {/* Section sur les antibiotiques et la résistance */}
                <div className="space-y-4">
                    {/* Vous pouvez ajouter une image ici */}
                    <img src="https://via.placeholder.com/600x300?text=Antibiotiques+et+Resistance" alt="Lutte contre la résistance aux antibiotiques" className="mx-auto rounded-xl shadow-md"/>
                    <h3 className="text-3xl font-semibold text-gray-800">Lutter contre la résistance aux antibiotiques</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Un problème majeur de santé publique réside dans l’utilisation incomplète des antibiotiques. Lorsque les traitements ne sont pas suivis jusqu’à leur terme, les bactéries survivantes peuvent développer une résistance, rendant ces médicaments moins efficaces sur le long terme. My Daily Meds vous aide à terminer vos cures d’antibiotiques en vous rappelant chaque prise, afin de préserver la puissance de ces traitements essentiels.
                    </p>
                </div>

                {/* Autres objectifs et vision */}
                <div className="space-y-4">
                    {/* Vous pouvez ajouter une image ici */}
                    {/* <img src="https://via.placeholder.com/600x300?text=Meilleure+Sante" alt="Meilleure santé pour tous" className="mx-auto rounded-xl shadow-md"/> */}
                    <h3 className="text-3xl font-semibold text-gray-800">Une vision d’avenir</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Au-delà de la simple gestion quotidienne, My Daily Meds aspire à éduquer et à informer. En centralisant des informations fiables sur chaque médicament, en facilitant le suivi des traitements et en réduisant le gaspillage, cette plateforme contribue à une meilleure santé pour tous. C’est en changeant nos habitudes, même à petite échelle, que nous pouvons avoir un impact global.
                    </p>
                </div>
                <div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Rejoignez-moi dans cette démarche responsable et soyez acteurs d’une utilisation plus judicieuse des médicaments. Ensemble, construisons un futur où chacun prend soin de sa santé avec intelligence, respect de la planète, et conscience des enjeux de résistance microbienne.
                    </p>
                </div>
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
    title: "Antidouleurs",
    description: "Découvrez notre sélection de médicaments antidouleur efficaces et approuvés.",
    image: "https://via.placeholder.com/300?text=Antidouleurs",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Antibiotiques",
    description: "Informations détaillées sur les antibiotiques pour un traitement approprié.",
    image: "https://via.placeholder.com/300?text=Antibiotiques",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Vitamines & Compléments",
    description: "Renforcez votre organisme avec notre gamme de vitamines et suppléments.",
    image: "https://via.placeholder.com/300?text=Vitamines",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Antiallergiques",
    description: "Soulagez vos allergies avec des médicaments adaptés à vos besoins.",
    image: "https://via.placeholder.com/300?text=Antiallergiques",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Médicaments Chroniques",
    description: "Gérez facilement vos traitements de longue durée et vos rappels.",
    image: "https://via.placeholder.com/300?text=Chroniques",
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Soins Dermatologiques",
    description: "Crèmes, pommades et traitements pour prendre soin de votre peau.",
    image: "https://via.placeholder.com/300?text=Dermatologie",
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Produits de Confort",
    description: "Découvrez notre sélection de produits pour améliorer votre bien-être.",
    image: "https://via.placeholder.com/300?text=Confort",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
