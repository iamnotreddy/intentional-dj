/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import { SearchWindow } from "./SearchWindow";
import { type SpotifyTrack } from "~/lib/types";

export const MainPage = () => {
  const [seedTracks, setSeedTracks] = useState<SpotifyTrack[]>();

  const handleAddSeedTrack = (track: SpotifyTrack) => {
    setSeedTracks((prev) => {
      if (prev) {
        return [...prev, track];
      }
      return [track];
    });
  };

  // const handleRemoveSeedTrack = (track: SeedTrack) => {
  //   setSeedTracks((prev) => {
  //     if (prev) {
  //       return prev.filter((item) => item !== track);
  //     }
  //     return prev;
  //   });
  // };

  return (
    <div className="flex max-h-screen flex-col space-y-4">
      <p className="text-center font-serif text-4xl">What [mood] are you in?</p>
      <p className="text-center font-serif text-xl">Pick a song</p>
      {!seedTracks && <SearchWindow handleAddSeedTrack={handleAddSeedTrack} />}
      <div className="rounded-xl border-2 border-slate-400 p-2 text-center hover:bg-slate-300">
        <SignOutButton />
      </div>
    </div>
  );
};
