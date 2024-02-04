import Chatbox from "@/components/chat/chatbox";
import { AlienStateContext } from "@/components/AlienContext";
import { Alien } from "@/types/alien";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import data from "../data/alien.json";

const Chat = () => {
  const context = useContext(AlienStateContext);
  if (!context) {
    throw new Error("useAlienState must be used within a AlienStateProvider");
  }
  const { chosenAlien, setChosenAlien } = context;
  if (chosenAlien === null) {
    return (
      <div
        className="flex justify-center items-center text-4xl bg-zinc-50 bg-opacity-20 mx-auto my-auto p-20"
        style={{ borderRadius: "5rem", fontFamily: "Nanum Brush Script" }}
      >
        <div className="flex flex-row items-center space-x-6">
          <Image
            src={"https://img.icons8.com/ios/50/high-importance.png"}
            alt={"warning icon"}
            width={60}
            height={60}
          />
          <div>Please select an alien from explore first!</div>
        </div>
      </div>
    );
  }

  const aliens: Alien[] = data; //TODO: fetch from mongodb
  const alien: Alien = aliens[chosenAlien];

  return <Chatbox alien={alien} />;
};

export default Chat;
