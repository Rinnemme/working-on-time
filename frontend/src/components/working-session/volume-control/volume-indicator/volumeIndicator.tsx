import Image from "next/image";
import VolBase from "../../../../../public/base-volume.svg";
import VolRingOne from "../../../../../public/vol-ring-1.svg";
import VolRingTwo from "../../../../../public/vol-ring-2.svg";
import VolRingThree from "../../../../../public/vol-ring-3.svg";
import VolMute from "../../../../../public/vol-x.svg";

export default function VolumeIndicator({ volume }: { volume: number }) {
  return (
    <div className="h-6 min-h-6 w-6 min-w-6 relative">
      <Image
        className="w-full h-full absolute"
        src={VolBase}
        alt="Volume indicator"
      />
      <Image
        className={
          "w-full h-full absolute " + (volume > 0 ? "visible" : "hidden")
        }
        src={VolRingOne}
        alt="Volume indicator"
      />
      <Image
        className={
          "w-full h-full absolute " + (volume > 0.5 ? "visible" : "hidden")
        }
        src={VolRingTwo}
        alt="Volume indicator"
      />
      <Image
        className={
          "w-full h-full absolute " + (volume === 1 ? "visible" : "hidden")
        }
        src={VolRingThree}
        alt="Volume indicator"
      />
      <Image
        className={
          "w-full h-full absolute " + (volume === 0 ? "visible" : "hidden")
        }
        src={VolMute}
        alt="Volume indicator"
      />
    </div>
  );
}
