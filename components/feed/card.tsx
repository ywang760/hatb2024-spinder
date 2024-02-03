import Details from "@/components/feed/details";
import { Alien } from "@/types/alien";
import { Cancel } from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat";
import OutboundIcon from "@mui/icons-material/Outbound";
import Image from "next/image";
import { useState } from "react";
import data from "../../data/alien.json";

const aliens: Alien[] = data;

const Card = () => {
  // TODO: change mock data
  const alien = aliens[0];
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleMessage = () => {
    console.log("Message");
  };

  const handleDelete = () => {
    console.log("Delete");
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
          <div className="absolute invisible group-hover:visible bottom-16 right-16 p-2">
            <button
              className="bg-red-500 rounded-full p-4"
              onClick={() => handleMessage()}
            >
              <ChatIcon className="text-4xl" />
            </button>
          </div>
        </div>
        <div className="flex justify-center transform hover:scale-120">
          <Cancel className="text-6xl text-zinc-400" onClick={handleDelete} />
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
