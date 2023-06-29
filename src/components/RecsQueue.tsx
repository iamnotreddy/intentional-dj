import Image from "next/image";
import { SearchIcon } from "./icons";
import { useEffect } from "react";

type RecsQueueProps = {
  recTracks: Spotify.Track[];
  seedTracks: Spotify.Track[];
};

export const RecsQueue = ({ recTracks, seedTracks }: RecsQueueProps) => {
  useEffect(() => {
    const playTracks = async () => {
      const trackUris = [...seedTracks, ...recTracks]
        .map((track) => track.uri)
        .join(",");

      const requestURL = `/api/playback/play?tracks=${trackUris}`;
      const response = await fetch(requestURL, {
        method: "PUT",
      });

      if (!response.ok) {
        console.error(response);
      }
    };

    void playTracks();
  }, [recTracks, seedTracks]);

  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-center text-xl">Reccomendations</h1>
      {recTracks.map((track) => {
        return <RecsQueueRow key={track.uri} track={track} />;
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

const RecsQueueRow = (props: { track: Spotify.Track }) => {
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
