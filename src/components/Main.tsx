/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { SearchWindow } from "./SearchWindow";
import { type ApiResponse } from "~/lib/types";
import { Header } from "./Header";
import { SpotifyPlayer } from "./Player";
import { NavBar } from "./NavBar";
import { useQuery } from "@tanstack/react-query";
import { extractIdsFromUriArray } from "~/lib/helpers";
import { Queue } from "./Queue";

export const MainPage = () => {
  const [seedTracks, setSeedTracks] = useState<Spotify.Track[]>();

  const [navState, setNavState] = useState({
    showSearchWindow: false,
    showQueue: true,
  });

  const { data: tokenData } = useQuery<ApiResponse<string>>(["token"], () => {
    return fetch(`/api/auth/token`).then((res) => res.json());
  });

  const { data: recommendations, refetch: fetchRecs } = useQuery<
    ApiResponse<Spotify.Track[]>
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

  const handleNavStateChange = (target: string) => {
    if (target === "showSearchWindow") {
      setNavState((prevState) => ({
        ...prevState,
        showSearchWindow: !prevState.showSearchWindow,
      }));
    }

    if (target === "showQueue") {
      setNavState((prevState) => ({
        ...prevState,
        showQueue: target === "showQueue",
      }));
    }
  };

  const handleAddSeedTrack = (track: Spotify.Track) => {
    setSeedTracks((prev) => {
      if (prev) {
        // don't allow more then 5 seeds
        return prev.length < 5 ? [...prev, track] : prev;
      }
      return [track];
    });
  };

  const handleRemoveSeedTrack = (track: Spotify.Track) => {
    setSeedTracks((prev) => {
      if (prev) {
        return prev.filter((item) => item !== track);
      }
      return prev;
    });
  };

  const getContainerStyle = (isSearchRendered: boolean) => {
    const opacity = isSearchRendered ? "30" : "70";
    return `flex w-3/5 flex-col overflow-hidden rounded-2xl border-2 border-black bg-gray-200 bg-opacity-${opacity} p-4 backdrop-filter backdrop-blur`;
  };

  const containerStyle = getContainerStyle(navState.showSearchWindow);

  return (
    <div className="relative flex max-h-screen w-full">
      <div className="absolute left-0 top-0 z-20 w-full">
        <Header />
      </div>

      {navState.showSearchWindow && (
        <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform border-2 border-purple-300">
          <SearchWindow
            handleAddSeedTrack={handleAddSeedTrack}
            handleNavStateChange={handleNavStateChange}
          />
        </div>
      )}

      <div
        style={{ width: "100%", height: "80vh" }}
        className="absolute top-24 flex flex-col items-center justify-start space-y-4"
      >
        {navState.showQueue && (
          <div className={containerStyle}>
            <Queue
              seedTracks={seedTracks}
              recTracks={recommendations?.data}
              handleRemoveSeedTrack={handleRemoveSeedTrack}
              handleNavStateChange={handleNavStateChange}
              fetchRecs={fetchRecs}
            />
          </div>
        )}

        <NavBar handleNavStateChange={handleNavStateChange} />
      </div>
      {tokenData?.data && <SpotifyPlayer accessToken={tokenData.data} />}
    </div>
  );
};
