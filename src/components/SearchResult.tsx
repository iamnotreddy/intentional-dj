import { type SpotifyTrack } from "~/lib/types";
import { PlusIcon } from "./icons";
import Image from "next/image";

type SearchResultProps = {
  track: SpotifyTrack;
  handleAddSeedTrack: (track: SpotifyTrack) => void;
};

export const SearchResult = ({
  track,
  handleAddSeedTrack,
}: SearchResultProps) => {
  const imageUrl = track.album.images[1]?.url ?? "";
  return (
    <div className="flex flex-row items-center space-x-4 border-2 border-dashed border-pink-400">
      <Image src={imageUrl} alt="albumImage" height={75} width={75} />
      <div className="flex flex-col space-y-1">
        <p className="text-xl">{track.name}</p>
        <p className="font-bold">{track.artists[0]?.name}</p>
      </div>
      <button onClick={() => handleAddSeedTrack(track)}>
        <PlusIcon />
      </button>
    </div>
  );
};
