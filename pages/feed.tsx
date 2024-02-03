import React, { useState } from "react";
import Card from "../components/feed/card";

const cards = [
  {
    id: 1,
    title: "Card 1",
    description: "Very very very very very very very very long desription 1",
  },
  {
    id: 2,
    title: "Card 2",
    description: "Description 2",
  },
  {
    id: 3,
    title: "Card 3",
    description: "Description 3",
  },
  {
    id: 4,
    title: "Card 4",
    description: "Description 4",
  },
  {
    id: 5,
    title: "Card 5",
    description: "Description 5",
  },
  {
    id: 6,
    title: "Card 6",
    description: "Description 6",
  },
  {
    id: 7,
    title: "Card 7",
    description: "Description 7",
  },
  {
    id: 8,
    title: "Card 8",
    description: "Description 8",
  },
  {
    id: 9,
    title: "Card 9",
    description: "Description 9",
  },
  {
    id: 10,
    title: "Card 10",
    description: "Description 10",
  },
];

const Feed = () => {
  const [card1, setCard1] = useState(0);
  const [card2, setCard2] = useState(1);
  const [card3, setCard3] = useState(2);
  const [nextCard, setNextCard] = useState(3);
  return (
    <div className="h-full flex flex-row items-center mx-10 space-x-10">
      <Card
        id={card1}
        setCard={setCard1}
        nextCard={nextCard}
        setNextCard={setNextCard}
      />
      <Card
        id={card2}
        setCard={setCard2}
        nextCard={nextCard}
        setNextCard={setNextCard}
      />
      <Card
        id={card3}
        setCard={setCard3}
        nextCard={nextCard}
        setNextCard={setNextCard}
      />
    </div>
  );
};

export default Feed;
