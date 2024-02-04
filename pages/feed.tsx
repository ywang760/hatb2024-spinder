import React, { useState } from "react";
import Card from "../components/feed/card";

const Feed = () => {
  const [card1, setCard1] = useState(0);
  const [card2, setCard2] = useState(1);
  const [card3, setCard3] = useState(2);
  const [allCards, setAllCards] = useState([0, 1, 2]);
  return (
    <div className="h-full flex flex-row items-center mx-10 space-x-10">
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
  );
};

export default Feed;
