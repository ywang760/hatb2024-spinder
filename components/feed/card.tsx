import Details from "@/components/feed/details";
import { Alien } from "@/types/alien";
import ChatIcon from "@mui/icons-material/Chat";
import ClearIcon from "@mui/icons-material/Clear";
import OutboundIcon from "@mui/icons-material/Outbound";
import Image from "next/image";
import { useState, useEffect } from "react";
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
    console.log("Delete", card);
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
    console.log("New card", newCard);
  };

  return (
    <>
      <div className="flex flex-col space-y-10">
        <div
          style={{ borderRadius: "5rem" }}
          className="relative group text-zinc-300"
        >
          <Image
            src={alien.profilePicture as string} // Path to the alien's profile picture
            alt={alien.name + " profile picture"} // Name of the alien as alt text
            width={400}
            height={1200}
            style={{ borderRadius: "5rem" }}
          />
          <div
            style={{ borderRadius: "5rem" }}
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition duration-500"
          ></div>
          <button
            className="absolute invisible group-hover:visible inset-0 flex items-center justify-center flex-col space-y-4"
            onClick={() => setShowDetails(true)}
          >
            <h1 className="text-2xl">Show details</h1>
            <OutboundIcon className="text-4xl" />
          </button>
          <div className="absolute invisible group-hover:visible bottom-12 left-12 p-2 space-y-2">
            <h1 className="text-6xl font-bold pb-2">{alien.name}</h1>
            <p className="">{alien.species}</p>
            {/* TODO: use different fonts to differentiate */}
            <p className="">{alien.origin}</p>
          </div>
          <div className="absolute invisible group-hover:visible bottom-10 right-10 p-2"></div>
        </div>
        <div className="flex items-center justify-center transform hover:scale-120 flex-row space-x-4">
          <button
            className="bg-zinc-400 rounded-full p-4"
            onClick={handleDelete}
          >
            <ClearIcon className="text-white text-2xl " />
          </button>
          <button
            className="bg-red-500 rounded-full p-4"
            onClick={() => handleMessage()}
          >
            <ChatIcon className="text-white text-2xl" />
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
