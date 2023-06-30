import { type ApiResponse } from "~/lib/types";
import Image from "next/image";
import { HeartIcon, RemoveIcon, SearchIcon } from "./icons";
import { type QueryObserverResult } from "@tanstack/react-query";
import { RecsQueueRow } from "./RecsQueue";
import { useEffect } from "react";

type QueueProps = {
  seedTracks: Spotify.Track[] | undefined;
  recTracks: Spotify.Track[] | undefined;
  handleRemoveSeedTrack: (track: Spotify.Track) => void;
  fetchRecs: () => Promise<
    QueryObserverResult<ApiResponse<Spotify.Track[]>, unknown>
  >;
  handleNavStateChange: (target: string) => void;
};

export const Queue = ({
  seedTracks,
  recTracks,
  handleRemoveSeedTrack,
  fetchRecs,
  handleNavStateChange,
}: QueueProps) => {
  useEffect(() => {
    if (seedTracks && recTracks) {
      const playTracks = async () => {
        const trackUris = [...seedTracks, ...recTracks]
          .map((track) => track.uri)
          .join(",");

        const requestURL = `/api/playback/play?tracks=${trackUris}`;
        const response = await fetch(requestURL);

        if (!response.ok) {
          throw Error("invalid request");
        }
      };

      void playTracks();
    }
  }, [recTracks, seedTracks]);

  return (
    <div className="m-4 flex flex-col space-y-2 overflow-y-auto bg-gray-200 bg-opacity-70">
      <div className="flex justify-between space-x-2 border-2 border-red-200">
        <p className="text-2xl ">Queue</p>
        <div className="flex flex-row space-x-4">
          <button
            onClick={() => handleNavStateChange("showSearchWindow")}
            className=" hover:text-green-600"
          >
            <SearchIcon />
          </button>
          <button onClick={() => void fetchRecs()}>
            <div className="rounded-full border-2 border-black bg-slate-400 p-1 hover:bg-green-700">
              Generate
            </div>
          </button>
        </div>
      </div>

      <div className="flex max-h-full flex-col space-y-1">
        {seedTracks &&
          seedTracks.map((track) => {
            return (
              <QueueRow
                key={track.uri}
                track={track}
                handleRemoveSeedTrack={handleRemoveSeedTrack}
              />
            );
          })}
      </div>

      <div className="flex justify-between space-x-2 border-2 border-red-200">
        <p className="text-2xl ">Recs</p>
        <div className="flex flex-row space-x-2"></div>
      </div>

      {recTracks && (
        <div className="flex max-h-full flex-col space-y-1 overflow-y-auto">
          {recTracks.map((track) => {
            return <RecsQueueRow key={track.uri} track={track} />;
          })}
        </div>
      )}
    </div>
  );
};

const QueueRow = (props: {
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
