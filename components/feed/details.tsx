import { Alien } from "@/types/alien";
import { Box, Dialog } from "@mui/material";
import Image from "next/image";

interface detailsProps {
  alien: Alien;
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
}

const Details = (props: detailsProps) => {
  return (
    <Dialog
      open={props.showDetails}
      onClose={() => props.setShowDetails(false)}
      maxWidth="xl"
    >
      <Box className="flex flex-row p-10 space-x-8 bg-red-200">
        <div className="flex flex-col w-1/2 items-center">
          <div className="w-48 h-48 rounded-full overflow-hidden relative mb-8">
            <Image
              src={props.alien.profilePicture as string} // Path to the alien's profile picture
              alt={props.alien.name + " profile picture"} // Name of the alien as alt text
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1 className="flex justify-center text-2xl text-zinc-800">
            {props.alien.name}
          </h1>
          <hr className="w-2/3 mx-auto border-1 border-zinc-800 my-4" />
          <div>
            
          </div>
        </div>

        <div className="flex flex-col w-1/2 pt-4 text-zinc-800 bg-black">
          <div className="flex text-left flex-col">
            <p>Age: {props.alien.age}</p>
          </div>
        </div>
      </Box>
    </Dialog>
  );
};

export default Details;
