import { Alien } from "@/types/alien";
import "@fontsource/cute-font";
import "@fontsource/nanum-brush-script";
import ChatIcon from "@mui/icons-material/Chat";
import { Box, Modal } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AlienStateContext } from "../../components/AlienContext";
import DescItem from "./descItem";

interface detailsProps {
  id: number;
  alien: Alien;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
}

const Details = (props: detailsProps) => {
  const router = useRouter();

  const context = useContext(AlienStateContext);
  if (!context) {
    throw new Error("useAlienState must be used within a AlienStateProvider");
  }
  const { chosenAlien, setChosenAlien } = context;

  const handleMessage = () => {
    setChosenAlien(props.id);
    router.push("/chat");
  };

  return (
    <Modal open={props.showDetails} onClose={() => props.setShowDetails(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "5rem",
        }}
        className="flex flex-row p-10 space-x-4 text-zinc-800 min-w-[70vw] justify-center"
        style={{
          fontFamily: "Cute Font",
          backgroundImage: "url('/galaxy.jpg')",
        }}
      >
        <div className="flex flex-col items-center space-y-4 w-1/2 ">
          <div
            className="flex flex-col items-center bg-zinc-50 p-6 w-full"
            style={{ borderRadius: "2rem" }}
          >
            <div className="w-56 h-56 rounded-full overflow-hidden relative mb-4">
              <Image
                src={props.alien.profilePicture as string} // Path to the alien's profile picture
                alt={props.alien.name + " profile picture"} // Name of the alien as alt text
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h1 className="text-6xl mb-2">{props.alien.name}</h1>
            <h3 className="text-2xl font-semibold">
              {props.alien.occupation} @ {props.alien.currentLocation}
            </h3>
            <hr className="w-2/3 mx-auto border-1 border-zinc-800 my-4" />
            <div className="flex flex-col space-y-2">
              <DescItem
                k={"Species"}
                value={props.alien.species}
                iconsrc={"https://img.icons8.com/color/48/grey.png"}
              />
              <DescItem
                k={"Home"}
                value={props.alien.origin}
                iconsrc={"https://img.icons8.com/color/48/home--v1.png"}
              />
            </div>
          </div>
          <div
            className="flex bg-zinc-50 p-4 w-full min-h-[20vh] justify-center items-center text-3xl"
            style={{ borderRadius: "2rem", fontFamily: "Nanum Brush Script" }}
          >
            <p>{props.alien.shortBio}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4  w-1/2 items-center">
          <div
            className=" bg-zinc-50 p-6 w-full space-y-2"
            style={{ borderRadius: "2rem" }}
          >
            <DescItem
              k={"Age"}
              value={props.alien.age}
              iconsrc={"https://img.icons8.com/color/48/age.png"}
            />
            <DescItem
              k={"Height"}
              value={props.alien.height}
              iconsrc={"https://img.icons8.com/color/48/lengthen.png"}
            />
            <DescItem
              k={"MBTI"}
              value={props.alien.mbti}
              iconsrc={"https://img.icons8.com/color/48/learning.png"}
            />
          </div>
          <div className="flex space-x-4 w-full text-4xl">
            <div
              className="bg-zinc-50 p-6 w-1/2 justify-center items-center flex flex-col space-y-2"
              style={{ borderRadius: "2rem" }}
            >
              <h1 className="text-8xl ">{props.alien.bodyCount}</h1>
              <div className="flex flex-row itmes-center space-x-1">
                <Image
                  src={"https://img.icons8.com/color/48/chinese-peach.png"}
                  alt={"icon for body count"}
                  width={24}
                  height={24}
                />
                <p className="">Body Count</p>
              </div>
            </div>

            <div
              className="bg-zinc-50 p-6 w-1/2 justify-center items-center flex flex-col space-y-2"
              style={{ borderRadius: "2rem" }}
            >
              <h1 className="text-8xl ">{props.alien.numberOfFingers}</h1>
              <div className="flex flex-row itmes-center space-x-1">
               <Image
                  src={"https://img.icons8.com/color/48/hand--v1.png"}
                  alt={"icon for finger count"}
                  width={24}
                  height={24}
                /> 
                <p className="">Finger Count</p>
              </div>
            </div>
          </div>
          <div
            className="bg-zinc-50 p-6 w-full space-y-2"
            style={{ borderRadius: "2rem" }}
          >
            <DescItem
              k={"Visible Spectrum"}
              value={props.alien.visibleSpectrum}
              iconsrc={"https://img.icons8.com/color/48/rainbow--v1.png"}
            />
            <DescItem
              k={"Dimension Compatibility"}
              value={props.alien.dimensionalCompatibility}
              iconsrc={"https://img.icons8.com/color/48/tesseract.png"}
            />
            <DescItem
              k={"Means of Communication"}
              value={props.alien.meansOfCommunication}
              iconsrc={"https://img.icons8.com/color/48/cellular-network.png"}
            />
          </div>
          <div className="pt-8 flex">
            <button
              className="bg-primary-500 rounded-full p-4"
              onClick={() => handleMessage()}
            >
              <ChatIcon className="text-zinc-50 text-2xl" />
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default Details;
