import React from "react";
import { Alien } from "@/types/alien";
import data from "../../data/alien.json";
import Image from "next/image";
import styles from "./Card.module.css";
import OutboundIcon from "@mui/icons-material/Outbound";
import ChatIcon from "@mui/icons-material/Chat";

const aliens: Alien[] = data;

const Card = () => {
  // TODO: change mock data
  const alien = aliens[0];

  const handleShowDetails = () => {
    console.log("Show details");
  };

  const handleMessage = () => {
    console.log("Message");
  };

  return (
    <div className={`${styles.card} relative group text-zinc-300`}>
      <Image
        src={alien.profilePicture as string} // Path to the alien's profile picture
        alt={alien.name + " profile picture"} // Name of the alien as alt text
        width={500}
        height={1200}
        className={`${styles.card} `} // Make the image rounded
      />
      <div
        className={`${styles.card} absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition duration-500`}
      ></div>
      <button
        className="absolute invisible group-hover:visible inset-0 flex items-center justify-center flex-col space-y-4"
        onClick={() => handleShowDetails()}
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
      <div className="absolute invisible group-hover:visible bottom-16 right-16 p-2">
        <button
          className="bg-red-500 rounded-full p-4"
          onClick={() => handleMessage()}
        >
          <ChatIcon className="text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default Card;
