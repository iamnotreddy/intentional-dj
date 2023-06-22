/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SignOutButton } from "@clerk/nextjs";
import { useState } from "react";
import { SearchWindow } from "./SearchWindow";

type SeedTrack = {
  trackUri: string;
};

export const MainPage = () => {
  const [seedTracks, setSeedTracks] = useState<SeedTrack[]>();

  const handleAddSeedTrack = (trackUri: string) => {
    setSeedTracks((prev) => {
      if (prev) {
        return [...prev, { trackUri }];
      }
      return [{ trackUri }];
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
      <SearchWindow handleAddSeedTrack={handleAddSeedTrack} />
      <div>{seedTracks && JSON.stringify(seedTracks)}</div>

      <div className="rounded-xl border-2 border-slate-400 p-2 text-center hover:bg-slate-300">
        <SignOutButton />
      </div>
    </div>
  );
};
