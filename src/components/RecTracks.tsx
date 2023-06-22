import { type SpotifyTrack } from "~/lib/types";
import Image from "next/image";
import { SearchIcon } from "./icons";

type RecTracksProps = {
  recTracks: SpotifyTrack[];
};

export const RecTracks = ({ recTracks }: RecTracksProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-center text-xl">Reccomendations</h1>
      {recTracks.map((track) => {
        return <RecTrackRow key={track.uri} track={track} />;
      })}
      {recTracks.length < 5 && (
        <div className="flex flex-row items-center space-x-4 border-2 border-dashed border-pink-400 p-4">
          <p>Add Another Track...</p>
          <button>
            <SearchIcon />
          </button>
        </div>
      )}
    </div>
  );
};

const RecTrackRow = (props: { track: SpotifyTrack }) => {
  const { track } = props;
  const imageUrl = track.album.images[2]?.url ?? "";
  return (
    <div className="flex flex-row items-center space-x-4 border-2 border-dashed border-pink-400">
      <Image src={imageUrl} alt="albumImage" height={75} width={75} />
      <div className="flex flex-col space-y-1">
        <p className="text-xl">{track.name}</p>
        <p className="font-bold">{track.artists[0]?.name}</p>
      </div>
    </div>
  );
};
