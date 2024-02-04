import Details from "@/components/feed/details";
import { Alien } from "@/types/alien";
import ChatIcon from "@mui/icons-material/Chat";
import ClearIcon from "@mui/icons-material/Clear";
import Image from "next/image";
import { useState } from "react";
import data from "../../data/alien.json";

const aliens: Alien[] = data;
const num_aliens = aliens.length;

type CardProps = {
  card: number;
  setCard: (card: number) => void;
  allCards: number[];
  setAllCards: (cards: number[]) => void;
};

const Card = ({ card, setCard, allCards, setAllCards }: CardProps) => {
  // TODO: change mock data
  const alien = aliens[card];
  const [showDetails, setShowDetails] = useState<boolean>(false);

  if (!alien) {
    return null;
  }

  const handleMessage = () => {
    console.log("Message");
  };

  const handleDelete = () => {
    const otherCards = allCards.filter((c) => c !== card);
    let newCard = card + 1;
    while (otherCards.includes(newCard) || newCard >= num_aliens) {
      if (newCard >= num_aliens) {
        newCard = 0;
        continue;
      }
      if (newCard === card) {
        break;
      }
      newCard++;
    }
    setCard(newCard);
    setAllCards([...otherCards, newCard]);
  };

  return (
    <>
      <div className="flex flex-col space-y-10">
        <button
          style={{ borderRadius: "5rem" }}
          className="relative group text-zinc-300"
          onClick={() => setShowDetails(true)}
        >
          <Image
            src={alien.profilePicture as string} // Path to the alien's profile picture
            alt={alien.name + " profile picture"} // Name of the alien as alt text
            width={500}
            height={1200}
            style={{ borderRadius: "5rem" }}
          />
          <div
            style={{ borderRadius: "5rem" }}
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition duration-500"
          ></div>
          <div className="absolute invisible group-hover:visible bottom-12 left-12 p-2 text-left font-cute">
            <h1 className="text-8xl font-bold pb-2">{alien.name}</h1>
            <p className="text-4xl">{alien.species}</p>
            <p className="text-4xl">{alien.origin}</p>
          </div>
          <div className="absolute invisible group-hover:visible bottom-10 right-10 p-2"></div>
        </button>
        <div className="flex items-center justify-center transform hover:scale-120 flex-row space-x-4 text-zinc-50">
          <button
            className="bg-zinc-400 rounded-full p-4 hover:animate-ping"
            onClick={handleDelete}
          >
            <ClearIcon className="text-2xl " />
          </button>
          <button
            className="bg-primary-500 rounded-full p-4"
            onClick={() => handleMessage()}
          >
            <ChatIcon className=" text-2xl" />
          </button>
        </div>
      </div>
      <Details
        alien={alien}
        showDetails={showDetails}
        setShowDetails={setShowDetails}
      />
    </>
  );
};

export default Card;
