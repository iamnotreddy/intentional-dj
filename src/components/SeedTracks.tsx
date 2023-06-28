/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ApiResponse } from "~/lib/types";
import Image from "next/image";
import { RemoveIcon, SearchIcon } from "./icons";
import { type QueryObserverResult } from "@tanstack/react-query";

type SeedQueueProps = {
  seedTracks: Spotify.Track[];
  handleRemoveSeedTrack: (track: Spotify.Track) => void;
  fetchRecs: () => Promise<
    QueryObserverResult<ApiResponse<Spotify.Track[]>, unknown>
  >;
};

export const SeedTracks = ({
  seedTracks,
  handleRemoveSeedTrack,

  fetchRecs,
}: SeedQueueProps) => {
  const handleRefetch = async (): Promise<void> => {
    await fetchRecs();
  };

  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-center text-xl">Seed Queue</h1>
      {seedTracks.map((track) => {
        return (
          <SeedTrackRow
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
      <button
        className="border-2 border-black p-4 hover:bg-green-300"
        onClick={() => void handleRefetch}
      >
        Generate Recs
      </button>
    </div>
  );
};

const SeedTrackRow = (props: {
  track: Spotify.Track;
  handleRemoveSeedTrack: (track: Spotify.Track) => void;
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
