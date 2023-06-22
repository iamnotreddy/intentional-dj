/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import { SearchWindow } from "./SearchWindow";
import { type SpotifyTrack } from "~/lib/types";
import { SeedQueue } from "./SeedQueue";

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
    <div className="flex max-h-screen flex-col space-y-4">
      <p className="text-center font-serif text-4xl">What [mood] are you in?</p>
      {(!seedTracks || showSearchWindow) && (
        <SearchWindow handleAddSeedTrack={handleAddSeedTrack} />
      )}
      {seedTracks && (
        <SeedQueue
          seedTracks={seedTracks}
          handleRemoveSeedTrack={handleRemoveSeedTrack}
        />
      )}
      <div className="rounded-xl border-2 border-slate-400 p-2 text-center hover:bg-slate-300">
        <SignOutButton />
      </div>
    </div>
  );
};
