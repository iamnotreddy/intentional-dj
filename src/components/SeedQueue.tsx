import { type SpotifyTrack } from "~/lib/types";
import Image from "next/image";
import { RemoveIcon, SearchIcon } from "./icons";

type SeedQueueProps = {
  seedTracks: SpotifyTrack[];
  handleRemoveSeedTrack: (track: SpotifyTrack) => void;
};

export const SeedQueue = ({
  seedTracks,
  handleRemoveSeedTrack,
}: SeedQueueProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-center text-xl">Seed Queue</h1>
      {seedTracks.map((track) => {
        return (
          <SeedQueueRow
            key={track.uri}
            track={track}
            handleRemoveSeedTrack={handleRemoveSeedTrack}
          />
        );
      })}
      {seedTracks.length < 5 && (
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

const SeedQueueRow = (props: {
  track: SpotifyTrack;
  handleRemoveSeedTrack: (track: SpotifyTrack) => void;
}) => {
  const { track, handleRemoveSeedTrack } = props;
  const imageUrl = track.album.images[2]?.url ?? "";
  return (
    <div className="flex flex-row items-center space-x-4 border-2 border-dashed border-pink-400">
      <Image src={imageUrl} alt="albumImage" height={75} width={75} />
      <div className="flex flex-col space-y-1">
        <p className="text-xl">{track.name}</p>
        <p className="font-bold">{track.artists[0]?.name}</p>
      </div>
      <button onClick={() => handleRemoveSeedTrack(track)}>
        <RemoveIcon />
      </button>
    </div>
  );
};
