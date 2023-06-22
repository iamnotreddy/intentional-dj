import { useState } from "react";
import { SearchWindow } from "./SearchWindow";
import { type SpotifyTrack } from "~/lib/types";
import { SeedQueue } from "./SeedQueue";
import { Header } from "./Header";
import { SpotifyPlayer } from "./Player";
import { NavBar } from "./NavBar";

export const MainPage = () => {
  const [seedTracks, setSeedTracks] = useState<SpotifyTrack[]>();

  const [navState, setNavState] = useState({
    showSearchWindow: true,
    showSeedQueue: false,
    showRecsQueue: false,
    showLikesQueue: false,
  });

  const handleNavStateChange = (target: string) => {
    setNavState((prevState) => ({
      ...prevState,
      showSearchWindow: target === "showSearchWindow",
      showSeedQueue: target === "showSeedQueue",
      showRecsQueue: target === "showRecsQueue",
      showLikesQueue: target === "showLikesQueue",
    }));
  };

  const handleAddSeedTrack = (track: SpotifyTrack) => {
    setSeedTracks((prev) => {
      if (prev) {
        // don't allow more then 5 seeds
        return prev.length < 5 ? [...prev, track] : prev;
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
    <div className="relative flex max-h-screen w-full">
      <div className="absolute left-0 top-0 z-20 w-full">
        <Header />
      </div>

      <div
        style={{ width: "100%", height: "80vh" }}
        className="absolute top-24 flex flex-col items-center justify-start space-y-4 "
      >
        <div className="sticky top-0">
          <NavBar handleNavStateChange={handleNavStateChange} />
        </div>

        {navState.showSearchWindow && (
          <SearchWindow handleAddSeedTrack={handleAddSeedTrack} />
        )}

        {seedTracks && navState.showSeedQueue && (
          <SeedQueue
            seedTracks={seedTracks}
            handleRemoveSeedTrack={handleRemoveSeedTrack}
          />
        )}
      </div>
      <SpotifyPlayer />
    </div>
  );
};
