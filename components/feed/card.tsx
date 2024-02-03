import React from "react";
import { Alien } from "@/types/alien";
import data from "../../data/alien.json";
import Image from "next/image";
import styles from "./Card.module.css";
const aliens: Alien[] = data;

const Card = () => {
  const alien = aliens[0];
  console.log(alien.profilePicture);

  return (
    <div
      className={`${styles.card} flex flex-col bg-black items-center justify-center p-2`}
    >
      <div className="">
        <Image
          src={alien.profilePicture as string} // Path to the alien's profile picture
          alt={alien.name} // Name of the alien as alt text
          width={500}
          height={1200}
          className="rounded border-radius-md" // Make the image rounded
        />
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold">{alien.name}</h2>
        <p className="text-gray-200">{alien.species}</p>
        <p className="text-gray-200">{alien.origin}</p>
      </div>
    </div>
  );
};

export default Card;
