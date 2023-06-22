import { type SpotifyArtist } from "~/pages/api/search";
import { PlusIcon } from "./icons";
import Image from "next/image";

type SearchResultProps = {
  imageUrl: string;
  trackUri: string;
  trackName: string;
  trackArtists: SpotifyArtist[];
  handleAddSeedTrack: (trackUri: string) => void;
};

export const SearchResult = ({
  imageUrl,
  trackUri,
  trackName,
  trackArtists,
  handleAddSeedTrack,
}: SearchResultProps) => {
  return (
    <div className="flex flex-row items-center space-x-4 border-2 border-dashed border-pink-400">
      <Image src={imageUrl} alt="albumImage" height={75} width={75} />
      <div className="flex flex-col space-y-1">
        <p className="text-xl">{trackName}</p>
        <p className="font-bold">{trackArtists[0]?.name}</p>
      </div>
      <button onClick={() => handleAddSeedTrack(trackUri)}>
        <PlusIcon />
      </button>
    </div>
  );
};
