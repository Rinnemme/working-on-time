import { useSelector, useDispatch } from "react-redux";
import { setVolume, muteVolume } from "@/src/store/volumeSlice";
import { AppState } from "@/src/store/store";
import VolumeIndicator from "./volume-indicator/volumeIndicator";

export default function VolumeControl() {
  const dispatch = useDispatch();
  const volume = useSelector((state: AppState) => state.volume);
  const working = useSelector(
    (state: AppState) => state.workingSession.working
  );
  function adjustVolume(number: number) {
    dispatch(setVolume(number));
  }
  function mute() {
    dispatch(muteVolume());
  }

  const audio = new Audio(
    "https://cdn.pixabay.com/download/audio/2023/03/18/audio_9b98a3c314.mp3?filename=game-level-complete-143022.mp3"
  );
  audio.volume = volume;

  return (
    <div className="flex gap-3 items-center">
      <input
        id="default-range"
        type="range"
        defaultValue={volume}
        onChange={(change) => {
          adjustVolume(+change.target.value);
        }}
        onClick={() => audio.play()}
        onTouchEnd={() => audio.play()}
        step="0.1"
        min="0"
        max="1"
        className="w-full h-4 bg-wot-light-gray rounded-lg appearance-none hover:cursor-pointer bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-wot-light-gray [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-wot-rose"
      ></input>
      <VolumeIndicator volume={volume} />
    </div>
  );
}
