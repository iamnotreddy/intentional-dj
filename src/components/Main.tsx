/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useState } from "react";
import { SearchWindow } from "./SearchWindow";
import { type SpotifyTrack } from "~/lib/types";
import { SeedQueue } from "./SeedQueue";
import { Header } from "./Header";
import { SpotifyPlayer } from "./Player";

export const MainPage = () => {
  const [seedTracks, setSeedTracks] = useState<SpotifyTrack[]>();
  const [showSearchWindow, setShowSearchWindow] = useState(true);

  const handleAddSeedTrack = (track: SpotifyTrack) => {
    setSeedTracks((prev) => {
      if (prev) {
        return [...prev, track];
      }
      return [track];
    });
    setShowSearchWindow(false);
  };

  const handleRemoveSeedTrack = (track: SpotifyTrack) => {
    setSeedTracks((prev) => {
      if (prev) {
        return prev.filter((item) => item !== track);
      }
      return prev;
    });
  };

  return (
    <div className="relative flex max-h-screen w-full">
      <div className="absolute left-0 top-0 z-20 w-full">
        <Header />
      </div>

      <div
        style={{ width: "100%", height: "80vh" }}
        className="absolute top-20 flex flex-col items-center justify-center space-y-4 "
      >
        <p className="text-center font-serif text-4xl">
          What [mood] are you in?
        </p>
        {(!seedTracks || showSearchWindow) && (
          <SearchWindow handleAddSeedTrack={handleAddSeedTrack} />
        )}

        {seedTracks && (
          <SeedQueue
            seedTracks={seedTracks}
            handleRemoveSeedTrack={handleRemoveSeedTrack}
            setShowSearchWindow={setShowSearchWindow}
          />
        )}
      </div>
      <SpotifyPlayer />
    </div>
  );
};
