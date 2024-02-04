import Image from "next/image";

interface pps {
  k: string;
  value: string;
  iconsrc: string;
}

const DescItem = (props: pps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-2 items-center">
        <Image
          src={props.iconsrc}
          alt={`icon for ${props.k}`}
          width={24}
          height={24}
        />
        <p className="flex font-bold">{props.k}</p>
      </div>

      <p className="flex pl-6">{props.value}</p>
    </div>
  );
};

export default DescItem;
