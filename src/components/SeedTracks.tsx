import { type ApiResponse } from "~/lib/types";
import Image from "next/image";
import { HeartIcon, RefreshIcon, RemoveIcon, SearchIcon } from "./icons";
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
  return (
    <div className="m-4 flex flex-col space-y-2 overflow-y-auto bg-gray-200 bg-opacity-70">
      <div className="flex justify-between space-x-2 border-2 border-red-200">
        <p className="text-2xl ">Seeds</p>
        <div className="flex flex-row space-x-2">
          <button
            className=" hover:text-green-600"
            onClick={() => void fetchRecs()}
          >
            <RefreshIcon />
          </button>
          <button className=" hover:text-green-600">
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="flex max-h-full flex-col space-y-1 overflow-y-auto">
        {seedTracks.map((track) => {
          return (
            <SeedTrackRow
              key={track.uri}
              track={track}
              handleRemoveSeedTrack={handleRemoveSeedTrack}
            />
          );
        })}
      </div>
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
    <div className="flex flex-row items-center justify-between space-x-4 border-2 border-dashed border-pink-400">
      <div className="flex flex-row items-center space-x-2">
        <Image src={imageUrl} alt="albumImage" height={75} width={75} />
        <div className="flex flex-col space-y-1">
          <p className="text-xl">{track.name}</p>
          <p className="font-bold">{track.artists[0]?.name}</p>
        </div>
      </div>
      <div className="flex flex-row">
        <button onClick={() => handleRemoveSeedTrack(track)}>
          <RemoveIcon />
        </button>
        <button onClick={() => handleRemoveSeedTrack(track)}>
          <HeartIcon />
        </button>
      </div>
    </div>
  );
};
