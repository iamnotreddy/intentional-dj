/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { SearchWindow } from "./SearchWindow";
import { type ApiResponse, type SpotifyTrack } from "~/lib/types";
import { SeedTracks } from "./SeedTracks";
import { Header } from "./Header";
import { SpotifyPlayer } from "./Player";
import { NavBar } from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import { RecsQueue } from "./RecsQueue";
import { extractIdsFromUriArray } from "~/lib/helpers";

export const MainPage = () => {
  const [seedTracks, setSeedTracks] = useState<SpotifyTrack[]>();

  const [navState, setNavState] = useState({
    showSearchWindow: true,
    showSeedQueue: false,
    showRecsQueue: false,
    showLikesQueue: false,
  });

  const { data: tokenData } = useQuery<ApiResponse<string>>(["token"], () => {
    return fetch(`/api/auth/token`).then((res) => res.json());
  });

  const { data: recommendations, refetch: fetchRecs } = useQuery<
    ApiResponse<SpotifyTrack[]>
  >(
    ["recs"],
    () => {
      const seedUris = extractIdsFromUriArray(seedTracks ?? []);
      return fetch(`/api/recs?tracks=${seedUris}`).then((res) => res.json());
    },
    {
      enabled: false,
    }
  );

  const getRecsFromSeeds = async () => {
    const trackRecs = await fetchRecs();
    return trackRecs;
  };

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
          <SeedTracks
            seedTracks={seedTracks}
            handleRemoveSeedTrack={handleRemoveSeedTrack}
            getRecsFromSeeds={getRecsFromSeeds}
          />
        )}

        {recommendations && recommendations.data && navState.showRecsQueue && (
          <RecsQueue recTracks={recommendations.data} />
        )}
      </div>
      {tokenData?.data && <SpotifyPlayer accessToken={tokenData?.data} />}
    </div>
  );
};
