import { Alien } from "@/types/alien";
import { Box, Dialog, DialogTitle } from "@mui/material";
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
      maxWidth="lg"
    >
      <Box className="flex flex-row">
        <div>
          <Image
            src={props.alien.profilePicture as string} // Path to the alien's profile picture
            alt={props.alien.name + " profile picture"} // Name of the alien as alt text
            width={400} //TODO: fix width and height
            height={600}
          />
        </div>
        <div className="flex flex-col px-20 pt-4 bg-red-200">
          <DialogTitle>More info about {props.alien.name}</DialogTitle>
          <div className="flex text-left">
            <p>Age: {props.alien.age}</p>
          </div>
        </div>
      </Box>
    </Dialog>
  );
};

export default Details;
