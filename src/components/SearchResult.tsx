import { type SpotifyArtist } from "~/pages/api/search";
import { PlusIcon } from "./icons";
import Image from "next/image";

type SearchResultProps = {
  imageUrl: string;
  itemName: string;
  itemArtists: SpotifyArtist[];
};

export const SearchResult = ({
  imageUrl,
  itemName,
  itemArtists,
}: SearchResultProps) => {
  return (
    <div className="flex flex-row items-center space-x-4 border-2 border-dashed border-pink-400">
      <Image src={imageUrl} alt="albumImage" height={75} width={75} />
      <div className="flex flex-col space-y-1">
        <p className="text-xl">{itemName}</p>
        <p className="font-bold">{itemArtists[0]?.name}</p>
      </div>
      <button>
        <PlusIcon />
      </button>
    </div>
  );
};
