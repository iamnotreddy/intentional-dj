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

  if (seedTracks && seedTracks.length > 0) {
    return (
      <div className="m-4 flex flex-col space-y-2 overflow-y-auto border-pink-200 bg-opacity-70">
        <div className="flex justify-between space-x-2">
          <p className="text-2xl text-white">Queue</p>
          <div className="flex flex-row space-x-4">
            <button
              onClick={() => handleNavStateChange("showSearchWindow")}
              className=" hover:text-green-600"
            >
              <SearchIcon />
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
          <button onClick={() => void fetchRecs()}>
            <div className="w-1/4 rounded-lg border-2   border-[#c9761d] bg-[#d89349] p-2 hover:bg-[#9564a7]">
              Generate Recs
            </div>
          </button>
        </div>

        <div className="flex justify-between space-x-2 ">
          <p className="text-2xl text-white">Recs</p>
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
  }

  return (
    <div className="m-4 flex flex-col space-y-2 overflow-y-auto bg-opacity-70">
      <button onClick={() => handleNavStateChange("showSearchWindow")}>
        <div className="flex flex-row items-center justify-center space-x-4  rounded-lg border-2 border-[#c9761d] bg-[#d89349] p-2 hover:bg-[#debe9b]">
          <p className=" text-center">Add Tracks</p>
          <div className="flex flex-row space-x-4">
            <SearchIcon />
          </div>
        </div>
      </button>
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
    <div className="flex flex-row items-center justify-between space-x-4  rounded-lg border-2 border-[#c9761d] bg-[#d89349] p-2 hover:bg-[#debe9b]">
      <div className="flex flex-row items-center space-x-2">
        <Image
          src={imageUrl}
          alt="albumImage"
          height={75}
          width={75}
          className="rounded-lg"
        />
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
