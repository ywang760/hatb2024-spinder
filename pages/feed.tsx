import { Alien } from "@/types/alien";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState } from "react";
import Card from "../components/feed/card";
import data from "../data/alien.json";
const aliens: Alien[] = data;
const num_aliens = aliens.length;

const Feed = () => {
  const [card1, setCard1] = useState(0);
  const [card2, setCard2] = useState(1);
  const [card3, setCard3] = useState(2);
  const [allCards, setAllCards] = useState([0, 1, 2]);

  const refreshCards = () => {
    // cycle all 3 cards to next available
    let newAllCards = allCards;
    let newCard1 = card1 + 1;
    while (newAllCards.includes(newCard1) || newCard1 >= num_aliens) {
      if (newCard1 >= num_aliens) {
        newCard1 = 0;
        continue;
      }
      if (newCard1 === card1) {
        break;
      }
      newCard1 = newCard1 + 1;
    }
    setCard1(newCard1);
    newAllCards = [newCard1, card2, card3];
    let newCard2 = card2 + 1;
    while (newAllCards.includes(newCard2) || newCard2 >= num_aliens) {
      if (newCard2 >= num_aliens) {
        newCard2 = 0;
        continue;
      }
      if (newCard2 === card2) {
        break;
      }
      newCard2 = newCard2 + 1;
    }
    setCard2(newCard2);
    newAllCards = [newCard1, newCard2, card3];
    let newCard3 = card3 + 1;
    while (newAllCards.includes(newCard3) || newCard3 >= num_aliens) {
      if (newCard3 >= num_aliens) {
        newCard3 = 0;
        continue;
      }
      if (newCard3 === card3) {
        break;
      }
      newCard3 = newCard3 + 1;
    }
    setCard3(newCard3);
    newAllCards = [newCard1, newCard2, newCard3];
    setAllCards(newAllCards);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="flex flex-row items-center mx-10 space-x-10">
        <Card
          card={card1}
          setCard={setCard1}
          allCards={allCards}
          setAllCards={setAllCards}
        />
        <Card
          card={card2}
          setCard={setCard2}
          allCards={allCards}
          setAllCards={setAllCards}
        />
        <Card
          card={card3}
          setCard={setCard3}
          allCards={allCards}
          setAllCards={setAllCards}
        />
      </div>
      <button
        className="fixed bottom-12 right-20 bg-red-600 rounded-full p-3 animate-pulse"
        onClick={refreshCards}
      >
        <RefreshIcon className="text-4xl text-white" />
      </button>
    </div>
  );
};

export default Feed;
